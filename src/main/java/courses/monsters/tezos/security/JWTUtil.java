package courses.monsters.tezos.security;

import courses.monsters.tezos.entities.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import courses.monsters.tezos.security.model.TokenPair;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public class JWTUtil {

    @Value("${tezosmonsters.jjwt.secret}")
    private String secret;

    @Value("${tezosmonsters.jjwt.expirationAccess}")
    private String expirationTimeAccessStr;

    @Value("${tezosmonsters.jjwt.expirationRefresh}")
    private String expirationTimeRefreshStr;

    private Long expirationTimeAccess;
    private Long expirationTimeRefresh;


    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationTimeAccess = Long.parseLong(expirationTimeAccessStr);
        this.expirationTimeRefresh = Long.parseLong(expirationTimeRefreshStr);
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public TokenPair generateTokenPair(User user) {
        return new TokenPair(generateToken(user, "access"), generateToken(user, "refresh"));

    }

    public String generateToken(User user, String type) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRoles());
        return doGenerateToken(claims, user.getUsername(), "refresh".equals(type) ? expirationTimeRefresh : expirationTimeAccess);
    }

    private String doGenerateToken(Map<String, Object> claims, String username, Long expirationTime) {

        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTime * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

}
