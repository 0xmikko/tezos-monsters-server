import {HttpError} from "routing-controllers";
import {CodeRequestDTO} from "../payload/code";

export class WrongCodeReviewRequestError extends HttpError {
    constructor(dto: CodeRequestDTO) {
        console.log("Wrong request", dto);
        super(400, "Wrong code review request!");
    }
}
