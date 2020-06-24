import { IsNotEmpty } from "class-validator";
import { StoryPage } from "../core/storyPage";

export class CodeRequestDTO {
  @IsNotEmpty()
  code: string;
}

export class CodeCheckerRequest {
  code: string;
  syntax: string;
  entrypoint: string;
  parameters: string;
  storage: string;

  constructor(dto: CodeRequestDTO, storyPage: StoryPage) {
    this.code = dto.code;
    this.syntax = "pascaligo";
    this.entrypoint = storyPage.entrypoint;
    this.parameters = storyPage.parameters;
    this.storage = storyPage.storage;
  }
}

export class CodeCheckResultDTO {
  @IsNotEmpty()
  result: string;

  @IsNotEmpty()
  error: boolean;
}

export class CodeRightAnswer {
  code: string;

  constructor(storyPage: StoryPage) {
    this.code = storyPage.codeRightAnswer;
  }
}
