import {
  Body,
  Get,
  JsonController,
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

@JsonController("/auth")
export class UserControlller {
  private _service: UserService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(UserService);
  }

  @Get("/login/google/")
  @Redirect("https://google.com/")
  async redirect(@Req() req: Request, @Res() res: Response) {
    this._logger.debug("List request");
    return this._service.getGoogleAuthRedirect();
  }

  @Post("/google/done/")
  async loginGoogle(@Body() codeRequest: CodeGoogleAuth) {
    const tokenPair = await this._service.loginGoogle(codeRequest.code);
    return tokenPair;
  }

  @Post("/token/refresh")
  async refresh(@Body() refreshRequest: RefreshRequest) {
    const result = await this._service.refresh(refreshRequest.refresh);
    return result;
  }
}
