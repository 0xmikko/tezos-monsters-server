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
import { StoryPage } from "../core/storyPage";
import { GameEventRepository } from "../repository/gameEventRepository";
import { GameEvent } from "../core/gameEvent";
import { v4 as uuidv4 } from "uuid";

@Service()
export class GameService {
  @Inject()
  private _profilesRepository: ProfilesRepository;

  @Inject()
  private _storyPageRepository: StoryPagesRepository;

  @Inject()
  private _answersRepository: AnswersRepository;

  @Inject()
  private _gameEventRepository: GameEventRepository;

  private _updateQueue: SocketUpdate[] = [];

  async getCurrentPage(userId: string): Promise<StoryPage> {
    let profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) {
      profile = new Profile();
      profile.id = userId;
      await this._profilesRepository.save(profile);
    }

    if (profile.isStepSolved) {
      profile.currentStep++;
      profile.isStepSolved = false;
      await this._profilesRepository.save(profile);
    }

    const storyPage = await this._storyPageRepository.getPageByStep(
      profile.currentStep
    );
    if (storyPage === undefined) throw StoryPageNotFoundError;
    return storyPage;
  }

  async proceedAnswer(userId: string, dto: PlayerAnswerDTO): Promise<Profile> {
    return new Promise<Profile>(async (resolve) => {
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

      resolve(profile);

      // Writing event after sending info to client
      console.log("EVENT WRITING");
      try {
        const event = new GameEvent();
        event.id = uuidv4();
        event.type = "QUIZ_ANSWER_SUBMITTED";
        event.answer = answer;
        event.result = answer.isCorrect;
        event.storyPage = answer.storyPage;
        event.profile = profile;
        await this._gameEventRepository.save(event);
      } catch (e) {
        console.log(e);
      }
    });
  }

  proceedCodeAnswer(
    userId: string,
    dto: CodeRequestDTO
  ): Promise<CodeCheckResultDTO> {
    return new Promise<CodeCheckResultDTO>(async (resolve) => {
      const profile = await this._profilesRepository.findOne(userId);
      if (profile === undefined) throw ProfileNotFoundError;

      const storyPage = await this._storyPageRepository.getPageByStep(
        profile.currentStep
      );
      if (storyPage === undefined) throw StoryPageNotFoundError;

      let checkResult: CodeCheckResultDTO | undefined;

      const testCases = storyPage.testCases.sort((t1, t2) =>
        t1.index > t2.index ? 1 : -1
      );

      for (let i = 0; i < testCases.length; i++) {
        const currentTestCase = testCases[i];
        checkResult = await CodeCheckerRepository.checkCode(
          new CodeCheckerRequest(dto, currentTestCase)
        );
        console.log(checkResult);

        if (checkResult.error) {
          checkResult.result =
            `Error happened during test #${i} of ${testCases.length}\n` +
            checkResult.result;
          resolve(checkResult);
          const event = new GameEvent();
          event.id = uuidv4();
          event.type = "CODE_SUBMITTED";
          event.storyPage = storyPage;
          event.profile = profile;
          event.codeSubmitted = dto.code;
          event.result = !checkResult.error;
          event.review = checkResult.result;
          await this._gameEventRepository.save(event);
          return
        }
      }
      profile.isStepSolved = true;
      await this._profilesRepository.save(profile);

      if (checkResult === undefined) throw "Error during tests";

      resolve(checkResult);
      const event = new GameEvent();
      event.id = uuidv4();
      event.type = "CODE_SUBMITTED";
      event.storyPage = storyPage;
      event.profile = profile;
      event.codeSubmitted = dto.code;
      event.result = !checkResult.error;
      event.review = checkResult.result;
      await this._gameEventRepository.save(event);
    });
  }

  async showMeAnswer(userId: string): Promise<StoryPage> {
    const profile = await this._profilesRepository.findOne(userId);
    if (profile === undefined) throw ProfileNotFoundError;

    const storyPage = await this._storyPageRepository.getPageByStep(
      profile.currentStep
    );
    if (storyPage === undefined) throw StoryPageNotFoundError;

    profile.gold -= 10000; // ToDo: reward (!)
    await this._profilesRepository.save(profile);

    storyPage.initialCode = storyPage.codeRightAnswer

    return storyPage;
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
