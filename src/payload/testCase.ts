import { IsNotEmpty } from "class-validator";
import { StoryPage } from "../core/storyPage";
import {TestCase} from "../core/testCase";

export class TestCaseUpdateDTO {
  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  entrypoint: string;

  @IsNotEmpty()
  parameters: string;

  @IsNotEmpty()
  storage: string;

  @IsNotEmpty()
  expected: string;
}

export class TestCaseCreateDTO extends TestCaseUpdateDTO{
  @IsNotEmpty()
  storyId: string;
}

export function mapDtoToTestCase(
  dto: TestCaseUpdateDTO,
  testCase: TestCase
) {
  testCase.index = dto.index;
  testCase.name = dto.name;
  testCase.entrypoint = dto.entrypoint;
  testCase.parameters = dto.parameters;
  testCase.storage = dto.storage;
  testCase.expected = dto.expected;
}
