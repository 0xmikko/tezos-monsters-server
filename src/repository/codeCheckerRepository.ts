import { Service } from "typedi";
import { CodeCheckResultDTO, CodeRequestDTO } from "../payload/code";
import config from "../config";
import axios from "axios";
import {CodeCheckerConnectionError} from "../errors/codeCheckerConnectionError";
import {validate} from "class-validator";

@Service()
export class CodeCheckerRepository {

  static async checkCode(dto: CodeRequestDTO): Promise<CodeCheckResultDTO> {
    const response = await axios.post(config.codeCheckerUrl, dto,
        {
        headers: [{
            'Authorization': `Basic ${config.codeCheckerToken}`
        }]
    });

    if (response === undefined || response.status !== 200) {
        throw CodeCheckerConnectionError;
    }

    const result = response.data as CodeCheckResultDTO;
    const errors = await validate(result);
    if (errors.length >0 ) {
        throw CodeCheckerConnectionError;
    }

    return result;
  }
}
