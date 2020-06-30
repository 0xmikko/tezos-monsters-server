import { Container, Inject, Service } from "typedi";
import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import { ProfilesRepository } from "../repository/profilesRepository";
import { tokenData, TokenPair, User } from "../core/user";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/userRepository";
import { TokenExpiredError, UserNotFoundError } from "../errors/users";
import { UnknownInternalError } from "../errors/unknown";
import {Profile} from "../core/profile";

@Service()
export class UserService {
  @Inject()
  private _repository: UserRepository;

  @Inject()
  private _profileRepository: ProfilesRepository;

  getGoogleAuthRedirect(): string {
    const oauth2Client = new google.auth.OAuth2(
      config.authGoogleClientID,
      config.authGoogleClientSecret,
        process.env.NODE_ENV === "development"
        ? config.authGoogleDevRedirectUrl
        : config.authGoogleProdRedirectUrl
    );

    console.log(oauth2Client);

    const scopes = [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes,
    });

    return url;
  }

  async loginGoogle(code: string): Promise<TokenPair> {
    const oauth2 = google.oauth2("v2");

    const oauth2Client = new google.auth.OAuth2(
      config.authGoogleClientID,
      config.authGoogleClientSecret,
      process.env.NODE_ENV === "development"
        ? config.authGoogleDevRedirectUrl
        : config.authGoogleProdRedirectUrl
    );
    try {
      const token = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(token.tokens);

      google.options({ auth: oauth2Client });

      // Do the magic
      const res = await oauth2.userinfo.v2.me.get({});
      console.log("RESDATA", res.data);

      if (!res.data.id || !res.data.email) throw UserNotFoundError;

      let user = await this._repository.findByEmail(res.data.email);
      if (user === undefined) {
        user = new User();
        user.id = uuidv4();
        user.email = res.data.email;
        user.name = res.data.name || "";
        user.family_name = res.data.family_name || "";
        user.given_name = res.data.given_name || "";
        user.avatar_url = res.data.picture || "";
        user.role = "user";

        const profile = new Profile();
        profile.id = user.id;

        user.profile = await this._profileRepository.save(profile);
        user = await this._repository.save(user);
      }

      return this.generateTokenPair(user.id, user.role);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    try {
      const data: tokenData = jwt.verify(
        refreshToken,
        config.jwt_secret
      ) as tokenData;
      if (Date.now() > data.exp * 1000) throw TokenExpiredError;

      const user = await this._repository.findOne(data.user_id);
      if (user === undefined) throw UserNotFoundError;

      return this.generateTokenPair(data.user_id, user.role);
    } catch (e) {
      if (e !== TokenExpiredError && e !== UserNotFoundError) {
        console.log(e);
        throw UnknownInternalError;
      }
      throw e;
    }
  }

  private generateTokenPair(user_id: string, role: string): TokenPair {
    const HOUR = 3600; // Hour in seconds

    const accessExp = Date.now() / 1000 + HOUR / 2;
    const accessData: tokenData = { user_id, role, exp: accessExp };
    const access = jwt.sign(accessData, config.jwt_secret);

    const refreshExp = Date.now() / 1000 + 30 * HOUR;
    const refreshData: tokenData = { user_id, role, exp: refreshExp };
    const refresh = jwt.sign(refreshData, config.jwt_secret);
    return {
      access,
      refresh,
    };
  }
}
