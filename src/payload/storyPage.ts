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

  contractName: string;

  initialCode: string;

  codeRightAnswer: string;

  entrypoint: string;

  parameters: string;

  storage: string;

  expected: string;
}

export function mapDTOtoStoryPage(
  dto: StoryPageUpdateDTO,
  storyPage: StoryPage
) {
  storyPage.header = dto.header;
  storyPage.text = dto.text;
  storyPage.step = dto.step;
  storyPage.isCodePage = dto.isCodePage;
  storyPage.contractName = dto.contractName;
  storyPage.initialCode = dto.initialCode;
  storyPage.codeRightAnswer = dto.codeRightAnswer;
  storyPage.entrypoint = dto.entrypoint;
  storyPage.parameters = dto.parameters;
  storyPage.storage = dto.storage;
  storyPage.expected = dto.expected;
}
