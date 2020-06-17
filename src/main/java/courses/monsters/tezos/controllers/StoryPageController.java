package courses.monsters.tezos.controllers;


import courses.monsters.tezos.exceptions.StoryPageNotFoundException;
import courses.monsters.tezos.entities.StoryPage;
import courses.monsters.tezos.payload.ErrorResponse;
import courses.monsters.tezos.repositories.StoryPageRepository;
import courses.monsters.tezos.services.StoryPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/story")
public class StoryPageController {

    @Autowired
    private StoryPageRepository storyPageRepository;

    @Autowired
    private StoryPageService storyPageService;

    @GetMapping("/")
    public Flux<StoryPage> getAllStories(Principal principal) {
        System.out.println(principal.getName());
        return storyPageRepository.findAll(

        );
    }

    @PostMapping("/")
    public Mono<StoryPage> createStories(@Valid StoryPage storyPage) {
        System.out.println("GOT" + storyPage);
        return storyPageRepository.save(storyPage);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<StoryPage>> getStoryById(@PathVariable(value = "id") String storyId) {
        return storyPageRepository.findById(storyId)
                .map(savedStory -> ResponseEntity.ok(savedStory))
                .switchIfEmpty(Mono.error(new StoryPageNotFoundException("ff")));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<StoryPage>> updateStory(@PathVariable(value = "id") String contractId,
                                                       @Valid @RequestBody StoryPage storyPage) {
        return storyPageRepository.findById(contractId)
                .flatMap(existingStory -> {
                    existingStory.setText(storyPage.getText());
                    return storyPageRepository.save(existingStory);
                })
                .map(updateStory -> new ResponseEntity<>(updateStory, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteStory(@PathVariable(value = "id") String storyId) {

        return storyPageRepository.findById(storyId)
                .flatMap(existingStory ->
                        storyPageRepository.delete(existingStory)
                                .then(Mono.just(new ResponseEntity<Void>(HttpStatus.OK)))
                )
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Stories are Sent to the client as Server Sent Events
    @GetMapping(value = "/stream/", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<StoryPage> streamAllStories() {
        return storyPageRepository.findAll();
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public Flux<String> upload(@RequestPart("files") Flux<FilePart> filePartFlux) {
        return storyPageService.getLines(filePartFlux);

    }




    /*
        Exception Handling Examples (These can be put into a @ControllerAdvice to handle exceptions globally)
    */

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity handleDuplicateKeyException(DuplicateKeyException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("A Story with the same text already exists"));
    }

    @ExceptionHandler(StoryPageNotFoundException.class)
    public ResponseEntity handleStoryNotFoundException(StoryPageNotFoundException ex) {
        System.out.println("NOT FOIUND!!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Contract not found"));
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity handleValidationException(WebExchangeBindException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Wrong request"));
    }

}