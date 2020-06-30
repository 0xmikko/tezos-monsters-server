import {HttpError} from "routing-controllers";

export class UnknownInternalError extends HttpError {
    constructor() {
        super(500, "Unknown internal error");
    }
}

