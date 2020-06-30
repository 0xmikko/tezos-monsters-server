import {Service} from "typedi";
import {TypeORMRepository} from "./typeORMRepository";
import {User} from "../core/user";

@Service()
export class UserRepository extends TypeORMRepository<User> {
    constructor() {
        super(User);
    }

    findByEmail(email :string) {
        return this.repository.findOne({where: {email}});
    }
}
