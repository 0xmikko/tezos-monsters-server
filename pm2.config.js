module.exports = {
  apps : [{
    name: "tezos-monsters-server",
    script: "./node_modules/.bin/ts-node",
    args: "-r dotenv/config --project ./tsconfig.json  ./src/index.ts",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
