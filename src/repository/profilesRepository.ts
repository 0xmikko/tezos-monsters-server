import { Service } from "typedi";

import { TypeORMRepository } from "./typeORMRepository";


import { Profile, ProfilesRepositoryI } from "../core/profile";

@Service("profiles.repository")
export class ProfilesRepository extends TypeORMRepository<Profile>
  implements ProfilesRepositoryI {
  constructor() {
    super(Profile);
  }
}
