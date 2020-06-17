package courses.monsters.tezos.entities;

import lombok.Getter;
import lombok.Setter;

public class Answers {
    @Getter @Setter
    private String title;

    @Getter @Setter
    private boolean isCorrect;

    @Getter @Setter
    private String icon;

    @Getter @Setter
    private String answer;


}
