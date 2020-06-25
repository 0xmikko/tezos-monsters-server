import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import { TestCase } from "../core/testCase";

@Service()
export class TestCasesRepository extends TypeORMRepository<TestCase> {
  constructor() {
    super(TestCase);
  }

  getFull(id: string): Promise<TestCase | undefined> {
    return this.repository.findOne(id, { relations: ["storyPage"] });
  }
}
