package courses.monsters.tezos.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Document(collection = "story")
public class StoryPage {

    @Id
    private int id;


    @NotNull
    @NotBlank
    @Getter
    @Setter
    private String header;

    @NotNull
    @NotBlank
    @Getter
    @Setter
    private String text;

    @NotNull
    @NotBlank
    @Getter
    @Setter
    private String image;

    @NotNull
    @Getter
    @Setter
    private boolean hasQuestions;

    @Getter
    @Setter
    private Answers[] answers;


}