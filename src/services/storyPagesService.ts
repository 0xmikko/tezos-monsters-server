import { Container, Inject, Service } from "typedi";
import {
  StoryPage,
  StoryPagesServiceI,
} from "../core/storyPage";
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import { Profile } from "../core/profile";
import { StoryPagesRepository } from "../repository/storyPagesRepository";
import { Storage } from "@google-cloud/storage";
import config from "../config";
import { GoogleStorage } from "../repository/googleStorage";
import {mapDTOtoStoryPage, StoryPageUpdateDTO} from "../payload/storyPage";

@Service()
export class StoryPagesService implements StoryPagesServiceI {
  @Inject("StoryPagesRepository")
  private _repository: StoryPagesRepository;

  retrieve(user: Profile, id: string): Promise<StoryPage | undefined> {
    return this._repository.getFull(id);
  }

  async getPageIdByStep(step: number): Promise<string> {
    const page = await this._repository.getPageByStep(step);
    return page === undefined ? "error" : page.id;
  }

  list(): Promise<StoryPage[] | undefined> {
    return this._repository.list();
  }
  async create(dto: StoryPageUpdateDTO): Promise<StoryPage> {
    const storyPage = new StoryPage();
    mapDTOtoStoryPage(dto, storyPage);
    return this._repository.upsert(storyPage);
  }

  async update(id: string, dto: StoryPageUpdateDTO): Promise<StoryPage> {
    const storyPage = await this._repository.findOne(id);
    if (storyPage === undefined) throw StoryPageNotFoundError;
    mapDTOtoStoryPage(dto, storyPage);
    return this._repository.upsert(storyPage);
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

    return await this._repository.upsert(storyPage);
  }
}
