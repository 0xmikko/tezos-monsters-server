import {HttpError} from "routing-controllers";

export class StoryPageNotFound extends HttpError {
    constructor() {
        super(404, "User not found!");
    }
}
