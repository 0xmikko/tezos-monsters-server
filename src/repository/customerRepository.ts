import { Service } from "typedi";
import { Customer } from "../core/storyPage";
import { TypeORMRepository } from "./typeORMRepository";

@Service()
export class StoryPagesRepository extends TypeORMRepository<Customer>
   {
  constructor() {
    super(Customer);
  }

  getPageByStep(step: number): Promise<Customer | undefined> {
    return this.repository.findOne({ where: { step }, relations: ['answers', 'testCases'] });
  }

  getFull(id : string) :  Promise<Customer | undefined> {
    return this.repository.findOne(id, { relations: ['answers', 'testCases'] });
  }

  listOrderedByStep() : Promise<Customer[] | undefined> {
    return this.repository.find({order: {step: "ASC"}});
  }
}
