import {HttpError} from "routing-controllers";

export class StoryPageNotFoundError extends HttpError {
    constructor() {
        super(404, "StoryPage not found!");
    }
}
