import { Inject, Service } from "typedi";
import { Profile } from "../core/profile";
import { ProfilesRepository } from "../repository/profilesRepository";
import { SocketUpdate } from "../core/operations";
import { StoryPagesService } from "./storyPagesService";
import { PlayerAnswerDTO } from "../payload/answers";
import { ProfileNotFoundError } from "../errors/profileErrors";
import { AnswersService } from "./answersService";
import {
  CodeCheckerRequest,
  CodeCheckResultDTO,
  CodeRequestDTO,
  CodeRightAnswer,
} from "../payload/code";
import { CodeCheckerRepository } from "../repository/codeCheckerRepository";
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import { StoryPagesRepository } from "../repository/storyPagesRepository";
import { AnswerFromIlligalStepError } from "../errors/answers";
import { AnswersRepository } from "../repository/answersRepository";
import {StoryPage} from "../core/storyPage";

@Service()
export class GameService {
  @Inject()
  private _profilesRepository: ProfilesRepository;

  @Inject()
  private _storyPageRepository: StoryPagesRepository;

  @Inject()
  private _answersRepository: AnswersRepository;

  private _updateQueue: SocketUpdate[] = [];


  async getCurrentPage(userId: string) : Promise<StoryPage> {
    const profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) throw ProfileNotFoundError;

    if (profile.isStepSolved) {
      profile.currentStep++;
      profile.isStepSolved = false;
      this._profilesRepository.save(profile);
    }

    const storyPage = await this._storyPageRepository.getPageByStep(profile.currentStep);
    if (storyPage === undefined) throw StoryPageNotFoundError;
    return storyPage;
  }

  async proceedAnswer(userId: string, dto: PlayerAnswerDTO): Promise<Profile> {
    const profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) throw ProfileNotFoundError;
    if (profile.isStepSolved) return profile;

    const answer = await this._answersRepository.getFull(dto.answer);
    if (answer?.storyPage.step !== profile.currentStep)
      throw AnswerFromIlligalStepError;
    if (answer.isCorrect) {
      profile.isStepSolved = true;
      profile.gold += answer.reward;
      await this._profilesRepository.save(profile);
    }

    return profile;
  }

  async proceedCodeAnswer(
    userId: string,
    dto: CodeRequestDTO
  ): Promise<CodeCheckResultDTO> {
    const profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) throw ProfileNotFoundError;

    const storyPage = await this._storyPageRepository.getPageByStep(
      profile.currentStep
    );
    if (storyPage === undefined) throw StoryPageNotFoundError;
    const codeCheckerRequest = new CodeCheckerRequest(dto, storyPage);

    const checkResult = await CodeCheckerRepository.checkCode(dto);
    console.log(checkResult);

    if (!checkResult.error) {
      profile.isStepSolved = true;
      this._profilesRepository.save(profile);
    }
    return checkResult;
  }

  async showMeAnswer(userId: string): Promise<CodeRightAnswer> {
    const profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) throw ProfileNotFoundError;

    const storyPage = await this._storyPageRepository.getPageByStep(
      profile.currentStep
    );
    if (storyPage === undefined) throw StoryPageNotFoundError;

    profile.gold -= 200; // ToDo: reward (!)
    await this._profilesRepository.save(profile);

    return new CodeRightAnswer(storyPage);
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
