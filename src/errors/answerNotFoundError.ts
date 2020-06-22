import {HttpError} from "routing-controllers";

export class AnswerNotFoundError extends HttpError {
    constructor() {
        super(404, "Answer not found!");
    }
}
