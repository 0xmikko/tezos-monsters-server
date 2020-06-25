import { Service } from "typedi";

import { TypeORMRepository } from "./typeORMRepository";


import { Profile } from "../core/profile";

@Service()
export class ProfilesRepository extends TypeORMRepository<Profile>
  {
  constructor() {
    super(Profile);
  }
}
