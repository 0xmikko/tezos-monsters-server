import { Inject, Service } from "typedi";
import { TestCase } from "../core/testCase";
import { TestCaseNotFoundError } from "../errors/testCases";
import { TestCasesRepository } from "../repository/testCasesRepository";
import { StoryPagesRepository } from "../repository/storyPagesRepository";
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import {
  TestCaseCreateDTO,
  TestCaseUpdateDTO,
  mapDtoToTestCase,
} from "../payload/testCase";
import { getLogger, Logger } from "log4js";

@Service()
export class TestCasesService {
  @Inject()
  private _repository: TestCasesRepository;

  @Inject()
  private _storyRepository: StoryPagesRepository;

  private _logger: Logger;

  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
  }

  async retrieve(id: string): Promise<TestCase | undefined> {
    return this._repository.getFull(id);
  }

  async create(dto: TestCaseCreateDTO): Promise<TestCase> {
    const storyPage = await this._storyRepository.findOne(dto.storyId);
    if (storyPage === undefined) throw StoryPageNotFoundError;

    const testCase = new TestCase();
    mapDtoToTestCase(dto, testCase);
    testCase.storyPage = storyPage;

    this._logger.debug(testCase);
    this._logger.debug(storyPage);


    return this._repository.save(testCase);
  }

  async update(id: string, dto: TestCaseUpdateDTO): Promise<TestCase> {
    const testCase = await this._repository.findOne(id);
    if (testCase === undefined) throw TestCaseNotFoundError;
    mapDtoToTestCase(dto, testCase);
    return this._repository.save(testCase);
  }
}
