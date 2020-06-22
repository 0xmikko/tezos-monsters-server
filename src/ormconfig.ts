import config from "./config";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  url: config.database_url,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
  entities: [
    // 'build/core/*.js',
    "src/core/*.ts",
  ],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/core",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
};

module.exports = dbConfig;
