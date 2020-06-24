import { Service } from "typedi";
import { getManager } from "typeorm";

import { StoryPage, StoryPagesRepositoryI } from "../core/storyPage";
import { TypeORMRepository } from "./typeORMRepository";
import {Answer, AnswersRepositoryI} from "../core/answer";

@Service()
export class AnswersRepository extends TypeORMRepository<Answer>
  implements AnswersRepositoryI {
  constructor() {
    super(Answer);
  }


  getFull(id : string) :  Promise<Answer | undefined> {
    return this.repository.findOne(id, { relations: ['storyPage'] });
  }

}
