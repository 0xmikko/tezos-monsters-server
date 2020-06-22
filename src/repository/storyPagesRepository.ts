import { Service } from "typedi";
import { getManager } from "typeorm";

import { StoryPage, StoryPagesRepositoryI } from "../core/storyPage";
import { TypeORMRepository } from "./typeORMRepository";

@Service("StoryPagesRepository")
export class StoryPagesRepository extends TypeORMRepository<StoryPage>
  implements StoryPagesRepositoryI {
  constructor() {
    super(StoryPage);
  }

  getPageByStep(step: number): Promise<StoryPage | undefined> {
    return this.repository.findOne({ where: { step } });
  }

  listFull(userID: string): Promise<StoryPage[] | undefined> {
    return getManager()
      .getRepository<StoryPage>(StoryPage)
      .find({ where: { ownerID: userID } });
  }
}
