import {
  Column,
  Entity, ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicRepositoryI } from "./basic";
import { StoryPage } from "./storyPage";
import { IsNotEmpty } from "class-validator";
import {AnswerCreateDTO, AnswerUpdateDTO} from "../payload/answers";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({default: 1})
  index: number;

  @Column({default: ''})
  name: string;

  @Column({default: false})
  isCorrect: boolean;

  @Column({default: ''})
  message: string;

  @Column({default: ''})
  icon: string;

  @Column({default: 0})
  reward: number;

  @ManyToOne((type) => StoryPage, (storyPage) => storyPage.answers)
  storyPage: StoryPage;
}

export interface AnswersRepositoryI extends BasicRepositoryI<Answer> {}

export interface AnswersServiceI {
  retrieve(id: string): Promise<Answer | undefined>;
  create(dto: AnswerCreateDTO): Promise<Answer>;
  update(id: string, dto: AnswerUpdateDTO): Promise<Answer>;
  uploadIcon(id: string, path: string, filename: string): Promise<Answer>;
}
