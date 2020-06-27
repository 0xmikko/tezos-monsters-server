import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {GameEvent} from "./gameEvent";

@Entity()
export class Profile {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @Column({default: 'Warrior'})
    name: string;

    @Column({default: 0})
    gold: number;

    @Column({default: 0})
    shares: number;

    @Column({default: ''})
    tezosAddress: string;

    @Column({default: 1})
    currentStep: number;

    @Column({default: false})
    isStepSolved: boolean;

    @Column({default: 0})
    screenTime: number;

    @OneToMany((type) => GameEvent, (gameEvent) => gameEvent.profile)
    events: GameEvent[];

    // ToDo: move to payload
    currentPage: string;
}
