import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import { User } from "../core/user";

@Service()
export class UserRepository extends TypeORMRepository<User> {
  constructor() {
    super(User);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  listFull() {
    return this.repository.find({
      relations: ["profile"],
      order: { createdAt: "DESC" },
    });
  }

  findFull(id: string) {
    return this.repository.createQueryBuilder("user")
        .leftJoinAndSelect("user.profile", "profile")
        .leftJoinAndSelect("profile.events", "event")
        .leftJoinAndSelect("event.storyPage", "storyPage")
        .where("user.id = :id", {id})
        .getOne();
  }
}
