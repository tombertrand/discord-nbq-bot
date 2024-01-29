import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";
const chunk = require("lodash/chunk");

const { Sentry } = require("./sentry");
const { REDIS_PORT, REDIS_HOST, REDIS_DB_INDEX, REDIS_PASSWORD } = process.env;

let redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  password: REDIS_PASSWORD,
  database: REDIS_DB_INDEX || 0,
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
  Sentry.captureException(err);
});

async function getNanoBrowserQuestPlayerScan() {
  try {
    const PER_PAGES = 500;
    const players = await redisClient.keys("u:*");
    console.log("~players", players);
    const playersChunks = chunk(players, PER_PAGES);

    for (const chunk of playersChunks) {
      const rawPlayerData = await Promise.all(
        chunk.map(async (player) => {
          const [
            rawInventory,
            rawStash,
            exp,
            expansion1,
            expansion2,
            migrations,
          ] = await redisClient.hmGet(
            player,
            "inventory",
            "stash",
            "exp",
            "expansion1",
            "expansion2",
            "migrations"
          );

          const playersWithLowExp = {};
          if (exp <= 100 || !migrations || !expansion1) {
            playersWithLowExp[player.name] = exp;
          }

          console.log("~~~~playersWithLowExp", playersWithLowExp);
        })
      );
    }
  } catch (err) {
    console.error("Error", err);
    Sentry.captureException(err);
  }
}

async function main() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
    await getNanoBrowserQuestPlayerScan();
  } catch (err) {
    console.error("Error connecting to Redis", err);
    Sentry.captureException(err);
  }
}

main();
