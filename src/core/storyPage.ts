import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { IsNotEmpty} from 'class-validator'
import { BasicRepositoryI } from "./basic";
import { Answer } from "./answers";
import { Profile } from "./profile";

@Entity()
export class StoryPage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({default: 1})
  step: number;

  @Column({default: ''})
  header: string;

  @Column({default: ''})
  text: string;

  @Column({default: ''})
  image: string;

  @Column({default: false})
  hasQuestions: boolean;

  @Column({default: false})
  isCodePage: boolean

  @OneToMany((type) => Answer, (answer) => answer.storyPage)
  answers: Answer[];
}

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

export interface StoryPagesRepositoryI extends BasicRepositoryI<StoryPage> {}

export interface StoryPagesServiceI {
  retrieve(user: Profile, id: string): Promise<StoryPage | undefined>;
  list(): Promise<StoryPage[] | undefined>;
  update(id: string, dto: StoryPageUpdateDTO): Promise<StoryPage>;
}
