package courses.monsters.tezos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.time.Duration;

import reactor.core.publisher.Mono;

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }



}



///**
// * WebSocketHandler that echoes the input with a delay of 2 seconds.
// */
//public class EchoWebSocketHandler implements WebSocketHandler {
//
//    @Override
//    public Mono<Void> handle(WebSocketSession session) {
//        // Use retain() for Reactor Netty
//
//        session.receive().doOnNext(msg -> {
//            String str = msg.retain().getPayloadAsText();
//            System.out.println(str);
//        });
//
//
//
//        return Mono.empty();
//    }
//}