import {HttpError} from "routing-controllers";

export class ProfileNotFoundError extends HttpError {
    constructor() {
        super(404, "Profile not found!");
    }
}

export class CantUpdateScreenTimeError extends HttpError {
    constructor() {
        super(404, "Profile not found!");
    }
}
