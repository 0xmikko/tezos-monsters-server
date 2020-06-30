module.exports = {
  apps : [{
    name: "tezos-monsters-server",
    script: "./node_modules/.bin/ts-node",
    args: "--project ./tsconfig.json  ./src/index.ts",
    node_args: "-r dotenv/config",
    instances: "2",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
