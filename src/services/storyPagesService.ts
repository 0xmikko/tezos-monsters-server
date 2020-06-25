import { Container, Inject, Service } from "typedi";
import {
  StoryPage,
} from "../core/storyPage";
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import { StoryPagesRepository } from "../repository/storyPagesRepository";
import config from "../config";
import { GoogleStorage } from "../repository/googleStorage";
import {mapDTOtoStoryPage, StoryPageUpdateDTO} from "../payload/storyPage";
import {getLogger, Logger} from "log4js";

@Service()
export class StoryPagesService  {

  @Inject()
  private _repository: StoryPagesRepository;

  private _logger: Logger;


  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
  }


  async retrieve(id: string): Promise<StoryPage | undefined> {
    try {
      return await this._repository.getFull(id);
    } catch (e) {
      this._logger.error(e);
      throw StoryPageNotFoundError;
    }
  }

  async getPageByStep(step: number): Promise<string> {
    const page = await this._repository.getPageByStep(step);
    return page === undefined ? "error" : page.id;
  }

  async list(): Promise<StoryPage[] | undefined> {
    try {
      return await this._repository.listOrderedByStep();
    } catch (e) {
      this._logger.error(e);
      throw StoryPageNotFoundError;
    }
  }

  async create(dto: StoryPageUpdateDTO): Promise<StoryPage> {
    const storyPage = new StoryPage();
    mapDTOtoStoryPage(dto, storyPage);
    return this._repository.save(storyPage);
  }

  async update(id: string, dto: StoryPageUpdateDTO): Promise<StoryPage> {
    const storyPage = await this._repository.findOne(id);
    if (storyPage === undefined) throw StoryPageNotFoundError;
    mapDTOtoStoryPage(dto, storyPage);
    return this._repository.save(storyPage);
  }

  async uploadImage(
    id: string,
    path: string,
    filename: string
  ): Promise<StoryPage> {
    const storyPage = await this._repository.findOne(id);
    if (storyPage === undefined) throw StoryPageNotFoundError;

    storyPage.image = await GoogleStorage.uploadImage(
      config.storyPageImagesBucket,
      path,
      filename
    );

    return await this._repository.save(storyPage);
  }
}
