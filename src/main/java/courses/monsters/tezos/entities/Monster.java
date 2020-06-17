package courses.monsters.tezos.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Data
public class Monster {

    public Monster(int body_id, int hat_id, int eyes_id, int nose_id, int mouth_id,
             int hat_x, int hat_y,
             int eyes_x, int eyes_y,
             int nose_x, int nose_y,
             int mouth_x, int mouth_y){

        this.body_id = body_id;
        this.parts = new HashMap<>();
        parts.put("hat", new MonsterPart(body_id, "hat", hat_id, hat_x, hat_y));
        parts.put("eyes", new MonsterPart(body_id, "eyes", eyes_id, eyes_x, eyes_y));
        parts.put("nose", new MonsterPart(body_id, "nose", nose_id, nose_x, nose_y));
        parts.put("mouth", new MonsterPart(body_id, "mouth", mouth_id, mouth_x, mouth_y));

    }

    @Getter @Setter
    private int body_id;

    @Getter @Setter
    private Map<String, MonsterPart> parts;

}

