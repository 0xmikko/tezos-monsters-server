import { IsNotEmpty } from "class-validator";
import { Answer } from "../core/answer";

export class AnswerUpdateDTO {
  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  message: string;
}

export class AnswerCreateDTO extends AnswerUpdateDTO{
  @IsNotEmpty()
  storyId: string;
}

export const mapDtoToAnswer = (dto: AnswerUpdateDTO, entity: Answer) => {
  entity.index = dto.index;
  entity.name = dto.name;
  entity.message = dto.message;
};
