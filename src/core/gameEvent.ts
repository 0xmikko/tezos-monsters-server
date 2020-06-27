import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {StoryPage} from "./storyPage";
import {Answer} from "./answer";
import {Profile} from "./profile";

type EventType =
    'CODE_SUBMITTED' |
    'QUIZ_ANSWER_SUBMITTED';


@Entity()
export class GameEvent {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @Column()
    type: EventType;

    @ManyToOne((type) => Profile, (profile) => profile.events)
    profile: Profile;

    @ManyToOne((type) => StoryPage, (storyPage) => storyPage.events)
    storyPage: StoryPage;

    @ManyToOne((type) => Answer, (answer) => answer.events)
    answer: Answer;

    @Column()
    codeSubmitted: string;

    @Column()
    result: boolean;

    @Column()
    review: boolean;
}
