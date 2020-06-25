import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./answer";
import {TestCase} from "./testCase";

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

  @Column({ default: false })
  isMonsterPage: boolean;

  @Column({ default: "" })
  contractName: string;

  @Column({ default: "" })
  initialCode: string;

  @Column({ default: "" })
  codeRightAnswer : string;

  @OneToMany((type) => Answer, (answer) => answer.storyPage)
  answers: Answer[];

  @OneToMany((type) => TestCase, (testCase) => testCase.storyPage)
  testCases: TestCase[];
}
