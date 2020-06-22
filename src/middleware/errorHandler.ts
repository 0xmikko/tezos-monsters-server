import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { NextFunction, Request, Response } from "express";

@Middleware({ type: "after" })
export class DefaultErrorHandler implements ExpressErrorMiddlewareInterface {

  error( err: Error,
         req: Request,
         res: Response,
         next: NextFunction) {
    console.log("do something...", err);
    if (err.name === "UnauthorizedError") {
      res.status(401).send("invalid token...");
    }

    if (err.name === 'AccessDeniedError') {
      res.status(403).send("Forbidden!...");
      return
    }
    next();
  }

}
