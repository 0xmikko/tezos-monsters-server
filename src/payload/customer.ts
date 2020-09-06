import { IsNotEmpty } from "class-validator";
import { Customer } from "../core/storyPage";
import {Column} from "typeorm";

export class StoryPageUpdateDTO {
  @IsNotEmpty()
  step: number;

  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  isCodePage: boolean;

  @Column({ default: false })
  isMonsterPage: boolean;

  contractName: string;

  initialCode: string;

  codeRightAnswer: string;
}

export function mapDTOtoStoryPage(
  dto: StoryPageUpdateDTO,
  storyPage: Customer
) {
  storyPage.header = dto.header;
  storyPage.text = dto.text;
  storyPage.step = dto.step;
  storyPage.isCodePage = dto.isCodePage;
  storyPage.isMonsterPage = dto.isMonsterPage;
  storyPage.contractName = dto.contractName;
  storyPage.initialCode = dto.initialCode;
  storyPage.codeRightAnswer = dto.codeRightAnswer;

}
