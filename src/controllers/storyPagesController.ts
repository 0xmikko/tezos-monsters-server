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
import { StoryPageNotFoundError } from "../errors/storyPageNotFoundError";
import { configure, getLogger, Logger } from "log4js";
import {Container, Inject, Service} from "typedi";
import { StoryPagesService } from "../services/storyPagesService";
import { UserID } from "../core/user";
import { ProfileService } from "../services/profileService";
import { StoryPageUpdateDTO } from "../payload/storyPage";
import { fileUploadOptions } from "../config/multer";
import {ProfileNotFoundError} from "../errors/profileErrors";

@JsonController("/api/stories")
@Service()
export class StoryPagesController {
  @Inject()
  private _service: StoryPagesService;

  @Inject()
  private _profileService: ProfileService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(StoryPagesService);
    this._profileService = Container.get(ProfileService);
  }

  @Get("/")
  async list() {
    this._logger.debug("List request");
    return this._service.list();
  }


  @Get("/current")
  @OnUndefined(StoryPageNotFoundError)
  async getCurrentPage(
      @CurrentUser({ required: true }) user: UserID,
  ) {
    const profile = await this._profileService.retrieve(user.id);
    if (profile === undefined) throw ProfileNotFoundError;
    return await this._service.retrieve(profile.currentPage);
  }

  @Get("/editor/:id")
  @OnUndefined(StoryPageNotFoundError)
  @Authorized("ADMIN")
  async retrieve(
    @CurrentUser({ required: true }) user: UserID,
    @Param("id") id: string
  ) {
    return await this._service.retrieve(id);
  }

  @Post("/")
  @Authorized("ADMIN")
  create(@Body() dto: StoryPageUpdateDTO) {
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
