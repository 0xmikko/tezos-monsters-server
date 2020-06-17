package courses.monsters.tezos.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "monsters")
public class MonsterPart {

    public MonsterPart(int body, String part, int id) {
        switch (part) {
            case "h":
                create(body, part, id, 40, 0);
                break;
            case "e":
                create(body, part, id, 40, 64);
                break;
            case "n":
                create(body, part, id, 40, 82);
                break;
            case "m":
                create(body, part, id, 40, 90);
                break;
        }

    }

    public MonsterPart(int body, String part, int id, int x, int y) {
        create(body, part, id, x, y);
    }

    private void create(int body, String part, int id, int x, int y) {
        this.body = body;
        this.part = part;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    @Getter
    @Setter
    private int body;

    @Getter
    @Setter
    private String part;

    @Getter
    @Setter
    private int id = 1;

    @Getter
    @Setter
    private int x = 0;

    @Getter
    @Setter
    private int y = 0;

}