import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicRepositoryI } from "./basic";
import { Answer } from "./answer";
import { Profile } from "./profile";
import { StoryPageUpdateDTO } from "../payload/storyPage";

@Entity()
export class StoryPage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 1 })
  step: number;

  @Column({ default: "" })
  header: string;

  @Column({ default: "" })
  text: string;

  @Column({ default: "" })
  image: string;

  @Column({ default: false })
  isCodePage: boolean;

  @Column({ default: "" })
  contractName: string;

  @Column({ default: "" })
  initialCode: string;

  @Column({ default: "" })
  codeRightAnswer : string;

  @Column({ default: "" })
  entrypoint: string;

  @Column({ default: "" })
  parameters: string;

  @Column({ default: "" })
  storage: string;

  @Column({ default: "" })
  expected: string;

  @OneToMany((type) => Answer, (answer) => answer.storyPage)
  answers: Answer[];
}

export interface StoryPagesRepositoryI extends BasicRepositoryI<StoryPage> {}

export interface StoryPagesServiceI {
  retrieve(id: string): Promise<StoryPage | undefined>;
  list(): Promise<StoryPage[] | undefined>;
  update(id: string, dto: StoryPageUpdateDTO): Promise<StoryPage>;
}
