import { IsNotEmpty } from "class-validator";
import { StoryPage } from "../core/storyPage";
import {TestCase} from "../core/testCase";

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

  constructor(dto: CodeRequestDTO, testCase: TestCase) {
    this.code = dto.code;
    this.syntax = "pascaligo";
    this.entrypoint = testCase.entrypoint;
    this.parameters = testCase.parameters;
    this.storage = testCase.storage;
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
