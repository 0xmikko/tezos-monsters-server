import {HttpError} from "routing-controllers";

export class TestCaseNotFoundError extends HttpError {
    constructor() {
        super(404, "TestCase not found!");
    }
}

