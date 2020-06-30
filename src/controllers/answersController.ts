import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  UploadedFiles,
  Req,
} from "routing-controllers";
import { AnswerNotFoundError } from "../errors/answers";

import { configure, getLogger, Logger } from "log4js";
import { Container, Inject } from "typedi";
import { AnswersService } from "../services/answersService";
import { UserID } from "../core/user";
import { AnswerCreateDTO, AnswerUpdateDTO } from "../payload/answers";
import { fileUploadOptions } from "../config/multer";

@JsonController("/api/answers")
export class AnswersController {
  @Inject()
  private _service: AnswersService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(AnswersService);
  }

  @Get("/:id")
  @OnUndefined(AnswerNotFoundError)
  @Authorized("ADMIN")
  async retrieve(
    @CurrentUser({ required: true }) user: UserID,
    @Param("id") id: string
  ) {
    return await this._service.retrieve(id);
  }

  @Post("/")
  @Authorized("ADMIN")
  create(@Body() dto: AnswerCreateDTO) {
    return this._service.create(dto);
  }

  @Post("/upload/:id")
  @Authorized("ADMIN")
  async upload(
    @Param("id") id: string,
    @UploadedFiles("file", fileUploadOptions)
    files: Array<Express.Multer.File>
  ) {
    this._logger.debug(files);

    return await this._service.uploadIcon(id, files[0].path, files[0].filename);
  }

  @Put("/:id")
  @Authorized("ADMIN")
  update(@Param("id") id: string, @Body() dto: AnswerUpdateDTO) {
    return this._service.update(id, dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return "Removing user...";
  }
}
