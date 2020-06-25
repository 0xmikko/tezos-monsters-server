import {
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StoryPage } from "./storyPage";
import {AnswerCreateDTO, AnswerUpdateDTO} from "../payload/answers";

@Entity()
export class TestCase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({default: 1})
  index: number;

  @Column({default: ''})
  name: string;

  @Column({ default: "" })
  entrypoint: string;

  @Column({ default: "" })
  parameters: string;

  @Column({ default: "" })
  storage: string;

  @Column({ default: "" })
  expected: string;

  @ManyToOne((type) => StoryPage, (storyPage) => storyPage.testCases)
  storyPage: StoryPage;
}

