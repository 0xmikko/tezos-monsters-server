import { Service } from "typedi";
import { StoryPage } from "../core/storyPage";
import { TypeORMRepository } from "./typeORMRepository";

@Service()
export class StoryPagesRepository extends TypeORMRepository<StoryPage>
   {
  constructor() {
    super(StoryPage);
  }

  getPageByStep(step: number): Promise<StoryPage | undefined> {
    return this.repository.findOne({ where: { step }, relations: ['answers'] });
  }

  getFull(id : string) :  Promise<StoryPage | undefined> {
    return this.repository.findOne(id, { relations: ['answers'] });
  }

  listOrderedByStep() : Promise<StoryPage[] | undefined> {
    return this.repository.find({order: {step: "ASC"}});
  }
}
