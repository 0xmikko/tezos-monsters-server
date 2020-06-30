import {HttpError} from "routing-controllers";

export class UserNotFoundError extends HttpError {
    constructor() {
        super(404, "Answer not found!");
    }
}

export class TokenExpiredError extends HttpError {
    constructor() {
        super(401, "Your token is expired");
    }
}
