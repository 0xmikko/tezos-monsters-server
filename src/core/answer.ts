import {
  Column,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StoryPage } from "./storyPage";
import {AnswerCreateDTO, AnswerUpdateDTO} from "../payload/answers";
import {GameEvent} from "./gameEvent";

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

  @OneToMany((type) => GameEvent, (gameEvent) => gameEvent.answer)
  events: GameEvent[];
}

