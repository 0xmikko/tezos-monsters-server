import { IsNotEmpty } from "class-validator";

export class CodeGoogleAuth {
  @IsNotEmpty()
  code: string;

}

export class RefreshRequest {
  @IsNotEmpty()
  refresh: string;
}
