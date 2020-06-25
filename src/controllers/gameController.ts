/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {
  SocketController,
  socketListeners,
  SocketWithToken,
} from "./socketRouter";
import { SocketUpdate } from "../core/operations";
import { Inject, Service } from "typedi";
import { ProfileService } from "../services/profileService";
import { PlayerAnswerDTO } from "../payload/answers";
import { CodeRequestDTO } from "../payload/code";
import { GameService } from "../services/gameService";
import { validate } from "class-validator";
import { WrongCodeReviewRequestError } from "../errors/gameErrors";

@Service()
export class GameController implements SocketController {
  @Inject()
  private _service: GameService;

  @Inject()
  private _profileService: ProfileService;

  private _namespace = "game";

  get namespace(): string {
    return this._namespace;
  }

  getListeners(socket: SocketWithToken, userId: string): socketListeners {
    return {
      getCurrentPage: async (payload: void, opHash: string) => {
        try {
          const updatedProfile = await this._profileService.retrieve(userId);
          socket.emit("profile:updateDetails", updatedProfile);

          const storyPage = await this._service.getCurrentPage(userId);
          socket.emit("game:currentPage", storyPage);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      checkQuizAnswer: async (dto: PlayerAnswerDTO, opHash: string) => {
        console.log(dto);
        try {
          const error = await validate(dto);
          // ToDo: think about need to have separate exception for wrong req
          if (error.length > 0) throw WrongCodeReviewRequestError;

          const updatedProfile = await this._service.proceedAnswer(userId, dto);
          socket.emit("profile:updateDetails", updatedProfile);

          const storyPage = await this._service.getCurrentPage(userId);
          socket.emit("game:currentPage", storyPage);


          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      checkCodeAnswer: async (dto: CodeRequestDTO, opHash: string) => {
        // ToDo: Add validation
        console.log(dto);
        try {
          const error = await validate(dto);
          if (error.length > 0) throw WrongCodeReviewRequestError;

          const codeReviewResult = await this._service.proceedCodeAnswer(
            userId,
            dto
          );

          socket.emit(this._namespace + ":codeReviewResult", codeReviewResult);

          const updatedProfile = await this._profileService.retrieve(userId);
          socket.emit("profile:updateDetails", updatedProfile);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      showMeAnswer: async (dto: string, opHash) => {
        try {
          const codeShowMeAnswer = await this._service.showMeAnswer(userId);
          socket.emit(this._namespace + ":codeReviewResult", codeShowMeAnswer);

          const profile = await this._profileService.retrieve(userId);
          socket.emit("profile:updateDetails", profile);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },
    };
  }

  update(): SocketUpdate[] {
    return this._service.getUpdateQueue();
  }
}
