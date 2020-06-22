import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { BasicRepositoryI } from "./basic";
import {StoryPage} from "./storyPage";


@Entity()
export class Answer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    index: number;

    @Column()
    name: string;

    @Column()
    isCorrect: boolean;

    @Column()
    message: string;

    @Column()
    icon: string;

    @OneToMany(type => StoryPage,  storyPage => storyPage.answers)
    storyPage: StoryPage;

}

class AnswerUpdateDTO {

}

export interface AnswersRepositoryI extends BasicRepositoryI<Answer> {}

export interface AnswersServiceI {
    get(userID: string): Promise<Answer>;
    list(): Promise<Answer[] | undefined>;
    update(userId: string, dto: AnswerUpdateDTO): Promise<Answer>;
}
