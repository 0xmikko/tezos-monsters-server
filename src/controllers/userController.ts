import {
  Authorized,
  Body, CurrentUser,
  Get,
  JsonController, OnUndefined, Param,
  Post,
  Redirect,
  Req,
  Res,
} from "routing-controllers";
import { configure, getLogger, Logger } from "log4js";
import { Container, Inject, Service } from "typedi";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import { CodeGoogleAuth, RefreshRequest } from "../payload/users";
import {AnswerNotFoundError} from "../errors/answers";
import {UserID} from "../core/user";
import {UserNotFoundError} from "../errors/users";

@JsonController()
export class UserController {
  private _service: UserService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(UserService);
  }

  @Get("/api/users/")
  @Authorized("ADMIN")
  async list() {
    return await this._service.list();
  }

  @Get("/api/users/:id")
  @OnUndefined(UserNotFoundError)
  @Authorized("ADMIN")
  async retrieve(
      @Param("id") id: string
  ) {
    return await this._service.retrieve(id);
  }


  @Get("/auth/login/google/")
  @Redirect("https://google.com/")
  async redirect(@Req() req: Request, @Res() res: Response) {
    this._logger.debug("List request");
    return this._service.getGoogleAuthRedirect();
  }

  @Post("/auth/google/done/")
  async loginGoogle(@Body() codeRequest: CodeGoogleAuth) {
    const tokenPair = await this._service.loginGoogle(codeRequest.code);
    return tokenPair;
  }

  @Post("/auth/token/refresh")
  async refresh(@Body() refreshRequest: RefreshRequest) {
    const result = await this._service.refresh(refreshRequest.refresh);
    return result;
  }
}
