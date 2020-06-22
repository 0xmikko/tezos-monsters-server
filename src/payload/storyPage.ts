import {IsNotEmpty} from "class-validator";
import {StoryPage} from "../core/storyPage";

export class StoryPageUpdateDTO {
    @IsNotEmpty()
    step: number;

    @IsNotEmpty()
    header: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    hasQuestions: boolean;

}

export function mapDTOtoStoryPage(dto: StoryPageUpdateDTO, storyPage: StoryPage) {
    storyPage.header = dto.header;
    storyPage.text = dto.text;
    storyPage.step = dto.step;
    storyPage.hasQuestions = dto.hasQuestions;
}
