import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StoryPage} from "./storyPage";

@Entity()
export class Artifact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

}
