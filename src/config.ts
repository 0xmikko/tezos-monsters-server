import fs from "fs";
import { validate, IsNotEmpty } from "class-validator";

export class Config {
  static port: number;

  @IsNotEmpty()
  static database_url: string;

  @IsNotEmpty()
  static jwt_secret: string;

  @IsNotEmpty()
  static storyPageImagesBucket: string;

  @IsNotEmpty()
  static codeCheckerUrl: string;

  @IsNotEmpty()
  static codeCheckerToken: string;

  @IsNotEmpty()
  static authGoogleClientID: string;

  @IsNotEmpty()
  static authGoogleClientSecret: string;

  @IsNotEmpty()
  static authGoogleDevRedirectUrl: string;

  @IsNotEmpty()
  static authGoogleProdRedirectUrl: string;

  static init() {
    Config.port = parseInt(process.env.PORT || "4000");
    Config.database_url = process.env.DATABASE_URL || "";
    Config.jwt_secret = process.env.JWT_SECRET || "";
    Config.storyPageImagesBucket = process.env.GCP_PICUTRES_BUCKET || "";
    Config.codeCheckerUrl = process.env.CODE_CHECKER_URL || "";
    Config.codeCheckerToken = process.env.CODE_CHECKER_TOKEN || "";
    Config.authGoogleClientID = process.env.AUTH_GOOGLE_CLIENT_ID || "";
    Config.authGoogleClientSecret = process.env.AUTH_GOOGLE_SECRET || "";
    Config.authGoogleDevRedirectUrl = process.env.AUTH_GOOGLE_DEV_REDIRECT_URL|| "";
    Config.authGoogleProdRedirectUrl = process.env.AUTH_GOOGLE_PROD_REDIRECT_URL|| "";
  }

  static getGCP() {
    const gcp = process.env.GOOGLE_CP;
    const filename = "./src/config/google.json";
    fs.writeFileSync(filename, gcp || "");
    process.env.GOOGLE_APPLICATION_CREDENTIALS = filename;
  }

  static async validate(): Promise<void> {
    console.log("Loading configuration...")
    Config.init();
    const errors = await validate(Config);
    if (errors.length > 0)
      throw new Error(`Configuration problems: ${errors.join("\n")}`);
  }
}

Config.init();
Config.getGCP();

export default Config;
