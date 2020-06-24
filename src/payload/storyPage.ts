import { IsNotEmpty } from "class-validator";
import { StoryPage } from "../core/storyPage";

export class StoryPageUpdateDTO {
  @IsNotEmpty()
  step: number;

  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  isCodePage: boolean;

  codeRightAnswer: string;

  entrypoint: string;

  parameters: string;

  storage: string;
}

export function mapDTOtoStoryPage(
  dto: StoryPageUpdateDTO,
  storyPage: StoryPage
) {
  storyPage.header = dto.header;
  storyPage.text = dto.text;
  storyPage.step = dto.step;
  storyPage.isCodePage = dto.isCodePage;
  storyPage.codeRightAnswer = dto.codeRightAnswer;
  storyPage.entrypoint = dto.entrypoint;
  storyPage.storage = dto.storage;
}
