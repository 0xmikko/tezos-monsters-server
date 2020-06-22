
import { createApp } from "./app";
import config from "./config";

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});


config
  .validate()
  .then((err) => createApp())
  .then((server) => {
    server.listen(config.port, () =>
      console.log(`Listening on port ${config.port}...`)
    );
  }).catch(e => {
      console.log("Cant start server", e)
});
