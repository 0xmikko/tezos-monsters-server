import * as dotenv from "dotenv";
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

  static init() {
    Config.port = parseInt(process.env.PORT || "4000");
    Config.database_url = process.env.DATABASE_URL || "";
    Config.jwt_secret = process.env.JWT_SECRET || "";
    Config.storyPageImagesBucket = process.env.GCP_PICUTRES_BUCKET || "";
  }

  static getGCP() {
    const gcp = process.env.GOOGLE_CP;
    const filename = "./src/config/google.json";
    fs.writeFileSync(filename, gcp || "");
    process.env.GOOGLE_APPLICATION_CREDENTIALS = filename;
  }

  static async validate(): Promise<void> {
    Config.init();
    const errors = await validate(Config);
    if (errors.length > 0)
      throw new Error(`Configuration problems: ${errors.join("\n")}`);
  }
}

dotenv.config();
Config.init();
Config.getGCP();

export default Config;
