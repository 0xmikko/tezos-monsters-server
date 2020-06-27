import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {StoryPage} from "./storyPage";
import {Profile} from "./profile";


@Entity()
export class Session {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @ManyToOne((type) => Profile, (profile) => profile.events)
    profile: Profile;

    @ManyToOne((type) => StoryPage, (storyPage) => storyPage.events)
    storyPage: StoryPage;

    @Column()
    timeSpent: number;

}
