import {HttpError} from "routing-controllers";

export class AnswerNotFoundError extends HttpError {
    constructor() {
        super(404, "Answer not found!");
    }
}

export class AnswerFromIlligalStepError extends HttpError {
    constructor() {
        super(403, "Answer from illigal step forbidden!");
    }
}
