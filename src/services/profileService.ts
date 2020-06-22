import { Inject, Service } from "typedi";
import { Profile, ProfileServiceI, ProfilesRepositoryI } from "../core/profile";
import { ProfilesRepository } from "../repository/profilesRepository";
import { SocketUpdate } from "../core/operations";
import { StoryPagesService } from "./storyPagesService";

@Service("profiles.service")
export class ProfileService implements ProfileServiceI {
  @Inject("profiles.repository")
  private _repository: ProfilesRepository;

  @Inject()
  private _storyService: StoryPagesService;

  private _updateQueue: SocketUpdate[] = [];

  async retrieve(id: string): Promise<Profile | undefined> {
    let profile = await this._repository.findOne(id);
    if (profile === undefined) {
      profile = new Profile();
      profile.id = id;
      return await this._repository.upsert(profile);
    }

    profile.currentPage = await this._storyService.getPageIdByStep(
      profile.currentStep
    );

    return profile;
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
