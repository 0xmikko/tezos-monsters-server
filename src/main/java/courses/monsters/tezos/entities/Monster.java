package courses.monsters.tezos.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "monsters")
public class Monster {

    @Id
    private String id;

    @Getter @Setter
    private MonsterPart body;

    @Getter @Setter
    private MonsterPart eyes;

    @Getter @Setter
    private MonsterPart mouth;

    @Getter @Setter
    private MonsterPart nose;

}

@Data
class MonsterPart{
    @Getter @Setter
    private int x = 0;

    @Getter @Setter
    private int y = 0;

}