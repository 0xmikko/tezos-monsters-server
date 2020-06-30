import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./profile";

export interface UserID {
  id: string;
}

export interface tokenData {
  user_id: string;
  role: string;
  exp: number;
}

export interface TokenPair {
  access: string;
  refresh: string;
}



@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt!: Date;

  @Column({ default: "", unique: true })
  email: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  given_name: string;

  @Column({ default: "" })
  family_name: string;

  @Column({ default: "" })
  role: string;

  @Column({ default: "" })
  avatar_url: string;

  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile

}
