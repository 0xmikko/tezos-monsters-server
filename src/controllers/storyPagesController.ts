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
import { StoryPagesServiceI, StoryPageUpdateDTO } from "../core/storyPage";
import { StoryPageNotFound } from "../errors/storyPageNotFound";
import { Profile } from "../core/profile";

import { configure, getLogger, Logger } from "log4js";
import { Container, Inject } from "typedi";
import { StoryPagesService } from "../services/storyPagesService";
import multer from "multer";
import { Request } from "express";
import * as path from "path";
import { User } from "../core/user";
import { ProfileService } from "../services/profileService";

@JsonController("/api/stories")
export class StoryPagesController {
  @Inject()
  private _service: StoryPagesService;

  @Inject("profiles.service")
  private _profileService: ProfileService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(StoryPagesService);
    this._profileService = Container.get("profiles.service");
  }

  @Get("/")
  async list() {
    this._logger.debug("List request");
    return this._service.list();
  }

  @Get("/:id")
  @OnUndefined(StoryPageNotFound)
  async retrieve(
    @CurrentUser({ required: true }) user: User,
    @Param("id") id: string
  ) {
    const profile = await this._profileService.retrieve(user.id);
    if (profile === undefined) throw "UserNotFound";
    return await this._service.retrieve(profile, id);
  }

  @Post("/")
  @Authorized("ADMIN")
  create(@Body() dto: StoryPageUpdateDTO) {
    return this._service.create(dto);
  }

  @Post("/upload/:id")
  // @Authorized("ADMIN")
  async upload(
    @Param("id") id: string,
    @UploadedFiles("file", {
      options: {
        storage: multer.diskStorage({
          destination: (req: any, file: any, cb: any) => {
            cb(null, __dirname + "../../../temp");
          },
          filename: (req: Request, file: Express.Multer.File, cb: any) => {
            cb(null, Date.now().toString() + path.extname(file.originalname));
          },
        }),
        fileFilter: (req: any, file: any, cb: any) => {
          cb(null, true);
        },
        limits: {
          fieldNameSize: 255,
          fileSize: 1024 * 1024 * 100,
        },
      },
    })
    files: Array<Express.Multer.File>
  ) {
    this._logger.debug(files);

    return await this._service.uploadImage(
      id,
      files[0].path,
      files[0].filename
    );
  }

  @Put("/:id")
  @Authorized("ADMIN")
  update(@Param("id") id: string, @Body() dto: StoryPageUpdateDTO) {
    return this._service.update(id, dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return "Removing user...";
  }
}
