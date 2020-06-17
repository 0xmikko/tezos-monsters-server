package courses.monsters.tezos.controllers;

import courses.monsters.tezos.services.MonsterFactoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.io.IOException;

@RestController
@RequestMapping("/api/monsters")
public class MonsterFactoryController {

    @Autowired
    private MonsterFactoryService monsterFactoryService;

    @GetMapping(value = "/{id}/", produces = MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody
    byte[] getMonster(@PathVariable(value = "id") int id,

                      @RequestParam(value = "hat_id") int hat_id,
                      @RequestParam(value = "eyes_id") int eyes_id,
                      @RequestParam(value = "nose_id") int nose_id,
                      @RequestParam(value = "mouth_id") int mouth_id,

                      @RequestParam(value = "hat_x") int hat_x,
                      @RequestParam(value = "hat_y") int hat_y,

                      @RequestParam(value = "eyes_x") int eyes_x,
                      @RequestParam(value = "eyes_y") int eyes_y,

                      @RequestParam(value = "nose_x") int nose_x,
                      @RequestParam(value = "nose_y") int nose_y,
                      
                      @RequestParam(value = "mouth_x") int mouth_x,
                      @RequestParam(value = "mouth_y") int mouth_y

    ) throws IOException {
        return monsterFactoryService.getImage(id, hat_id, eyes_id, nose_id, mouth_id,
                hat_x, hat_y, eyes_x, eyes_y, nose_x, nose_y, mouth_x, mouth_y);
    }


}
