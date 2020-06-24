import {HttpError} from "routing-controllers";

export class CodeCheckerConnectionError extends HttpError {
    constructor() {
        super(404, "StoryPage not found!");
    }
}
