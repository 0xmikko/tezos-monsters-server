import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { authChecker, currentUserChecker } from "./middleware/authChecker";
import { DefaultErrorHandler } from "./middleware/errorHandler";
import { StoryPagesController } from "./controllers/storyPagesController";
import { morganLogger } from "./middleware/morganLogger";
import * as dbConfig from "./ormconfig";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { Container } from "typedi";
import { SocketRouter } from "./controllers/socketRouter";
import { ProfilesController } from "./controllers/proflieController";
import { AnswersController } from "./controllers/answersController";
import { GameController } from "./controllers/gameController";
import {TestCasesController} from "./controllers/testCaseController";
import {UserControlller} from "./controllers/userController";

export const createApp = async (): Promise<Application> => {
  // Connecting Database
  console.log(dbConfig);
  try {
    // @ts-ignore
    await createConnection(dbConfig as ConnectionOptions);
  } catch (e) {
    console.log("TypeORM connection error: ", e);
    process.abort();
  }

  console.log(process.env);

  const app = express();
  app.use(morganLogger);
  useExpressServer(app, {
    authorizationChecker: authChecker,
    controllers: [StoryPagesController, AnswersController, TestCasesController, UserControlller],
    cors: {
      origin: "*",
    },
    currentUserChecker: currentUserChecker,
    middlewares: [DefaultErrorHandler],
    validation: true,
  });

  // ERROR HANDLER
  // app.use(errorHandler);
  let server = require("http").Server(app);

  // set up socket.io and bind it to our
  // http server.
  let io = require("socket.io").listen(server, {
    origins: "*:*",
    pingTimeout: 50000,
    pingInterval: 50000,
  });
  try {
    const profilesController = Container.get(ProfilesController);
    const gameController = Container.get(GameController);
    const socketRouter = new SocketRouter([profilesController, gameController]);
    socketRouter.connect(io);
  } catch (e) {
    console.log("Cant start socket controllers", e);
  }

  return server;
};
