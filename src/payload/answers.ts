import { IsNotEmpty } from "class-validator";
import { Answer } from "../core/answer";
import {Column} from "typeorm";

export class AnswerUpdateDTO {
  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  isCorrect: boolean;

  @IsNotEmpty()
  reward: number;


}

export class AnswerCreateDTO extends AnswerUpdateDTO{
  @IsNotEmpty()
  storyId: string;
}

export class PlayerAnswerDTO {
  @IsNotEmpty()
  answer: string
}

export const mapDtoToAnswer = (dto: AnswerUpdateDTO, entity: Answer) => {
  entity.index = dto.index;
  entity.name = dto.name;
  entity.message = dto.message;
  entity.isCorrect = dto.isCorrect;
  entity.reward = dto.reward;
};
