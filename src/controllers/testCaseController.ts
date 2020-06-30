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
import { TestCaseNotFoundError } from "../errors/testCases";

import { configure, getLogger, Logger } from "log4js";
import { Container, Inject } from "typedi";
import { TestCasesService } from "../services/testCasesService";
import { UserID } from "../core/user";
import { TestCaseCreateDTO, TestCaseUpdateDTO } from "../payload/testCase";
import { fileUploadOptions } from "../config/multer";

@JsonController("/api/testcases")
export class TestCasesController {
  @Inject()
  private _service: TestCasesService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(TestCasesService);
  }

  @Get("/:id")
  @OnUndefined(TestCaseNotFoundError)
  @Authorized("ADMIN")
  async retrieve(
    @CurrentUser({ required: true }) user: UserID,
    @Param("id") id: string
  ) {
    return await this._service.retrieve(id);
  }

  @Post("/")
  @Authorized("ADMIN")
  create(@Body() dto: TestCaseCreateDTO) {
    return this._service.create(dto);
  }

  @Put("/:id")
  @Authorized("ADMIN")
  update(@Param("id") id: string, @Body() dto: TestCaseUpdateDTO) {
    return this._service.update(id, dto);
  }
}
