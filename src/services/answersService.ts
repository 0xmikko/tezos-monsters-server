import { Inject, Service } from "typedi";
import { Answer, AnswersServiceI } from "../core/answer";
import { AnswerNotFoundError } from "../errors/answerNotFoundError";
import { AnswersRepository } from "../repository/answersRepository";
import config from "../config";
import { StoryPagesRepository } from "../repository/storyPagesRepository";
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import {
  AnswerCreateDTO,
  AnswerUpdateDTO,
  mapDtoToAnswer,
} from "../payload/answers";
import { GoogleStorage } from "../repository/googleStorage";
import {getLogger, Logger} from "log4js";

@Service()
export class AnswersService implements AnswersServiceI {

  @Inject()
  private _repository: AnswersRepository;

  @Inject()
  private _storyRepository: StoryPagesRepository;

  private _logger: Logger;


  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
  }

  retrieve(id: string): Promise<Answer | undefined> {

    return this._repository.findOne(id);
  }

  async create(dto: AnswerCreateDTO): Promise<Answer> {
    const storyPage = await this._storyRepository.findOne(dto.storyId);
    if (storyPage === undefined) throw StoryPageNotFoundError;

    const answer = new Answer();
    mapDtoToAnswer(dto, answer);
    answer.storyPage = storyPage;

    this._logger.debug(answer)
    this._logger.debug(storyPage)

    return this._repository.upsert(answer);
  }

  async update(id: string, dto: AnswerUpdateDTO): Promise<Answer> {
    const answer = await this._repository.findOne(id);
    if (answer === undefined) throw AnswerNotFoundError;
    mapDtoToAnswer(dto, answer);
    return this._repository.upsert(answer);
  }

  async uploadIcon(
    id: string,
    path: string,
    filename: string
  ): Promise<Answer> {
    const answer = await this._repository.findOne(id);
    if (answer === undefined) throw AnswerNotFoundError;

    answer.icon = await GoogleStorage.uploadImage(
      config.storyPageImagesBucket,
      path,
      filename
    );

    return await this._repository.upsert(answer);
  }
}
