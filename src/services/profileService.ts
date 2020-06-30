import { Inject, Service } from "typedi";
import { Profile } from "../core/profile";
import { ProfilesRepository } from "../repository/profilesRepository";
import { SocketUpdate } from "../core/operations";
import { StoryPagesService } from "./storyPagesService";
import {CantUpdateScreenTimeError, ProfileNotFoundError} from "../errors/profileErrors";

@Service()
export class ProfileService {
  @Inject()
  private _repository: ProfilesRepository;

  @Inject()
  private _storyService: StoryPagesService;

  private _updateQueue: SocketUpdate[] = [];

  async retrieve(id: string): Promise<Profile | undefined> {
    let profile = await this._repository.findOne(id);
    if (profile === undefined) {
      profile = new Profile();
      profile.id = id;
      await this._repository.save(profile);
    }

    profile.currentPage = await this._storyService.getPageByStep(
      profile.currentStep
    );

    return profile;
  }

  async nextStoryPage(id: string): Promise<Profile | undefined> {
    let profile = await this._repository.findOne(id);
    if (profile === undefined) throw ProfileNotFoundError;
    profile.currentStep++;
    profile.currentPage = await this._storyService.getPageByStep(
      profile.currentStep
    );
    profile.isStepSolved = false;
    return profile;
  }

  async updateScreenTime(userId: string, time: number) {
    const profile = await this._repository.findOne(userId);
    if (profile === undefined) throw CantUpdateScreenTimeError;


  }


  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }



}
