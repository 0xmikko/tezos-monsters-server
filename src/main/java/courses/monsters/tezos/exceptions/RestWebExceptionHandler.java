package courses.monsters.tezos.exceptions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Component
@Order(-2)
class RestWebExceptionHandler implements WebExceptionHandler {

    @Value("classpath:/static/index.html")
    private Resource indexHtml;

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        if (ex instanceof ResponseStatusException &&
                !exchange.getRequest().getPath().toString().startsWith("/api")) {
            DataBufferFactory buffer = exchange.getResponse().bufferFactory();
            Flux<DataBuffer> data = DataBufferUtils.read(indexHtml, buffer, 1024);
            var response = exchange.getResponse();
            response.getHeaders().add("Content-Type", "text/html; charset=UTF-8");
            response.setStatusCode(HttpStatus.OK);
            return response.writeWith(data);

        }
        return Mono.error(ex);
    }
}

