import * as dotenv from "dotenv";
dotenv.config();

const redis = require("redis");
const chunk = require("lodash/chunk");

const {Sentry}= require("./sentry") 


const {
  NBQ_REDIS_PORT,
  NBQ_REDIS_HOST,
  NBQ_REDIS_PASSWORD,
  NBQ_REDIS_DB_INDEX,
} = process.env;

const client = redis.createClient(NBQ_REDIS_PORT, NBQ_REDIS_HOST, {
  password: NBQ_REDIS_PASSWORD,
});

// client.connect();

client.on("connect",async function () {
  client.select(NBQ_REDIS_DB_INDEX); // NBQ DB
  console.log("Connected to Redis");

  await getNanoBrowserQuestItemScan();
});

client.on("error", function (err:Error) {
  Sentry.captureException(err);
});

const getNanoBrowserQuestItemScan = async () => {
  let res;
  console.log('~~~1')
  try {
    const PER_PAGES = 500;
    client.keys("u:*", async (_err: Error, players:any[]) => {

      const playersChunks = chunk(players, PER_PAGES);

      for (let i = 0; i < playersChunks.length; i++) {

        const rawPlayerData = await Promise.all(
          playersChunks[i].map(
            (player:any) =>
              new Promise((resolve) => {
                client.hmget(
                  player,
                  "inventory",
                  "stash",

                  (_err:Error, reply:any[]) => {
                    const rAwInventory = reply[0];
                    const rawStash = reply[1];

                    try {
                      const inventory = JSON.parse(rAwInventory);
                      const stash = JSON.parse(rawStash);

                      const someBarInventory = inventory &&inventory.some(
                        (item: string | number) =>
                          typeof item === "string" && (
        
                          (item.startsWith("bargold") ||
                          item.startsWith("stonesocketblessed"))
                      ))
                      const someBarStash = stash && stash.some(
                        (item: string | number) =>
                         
                            typeof item === "string" && (
        
                              (item.startsWith("bargold") ||
                              item.startsWith("stonesocketblessed"))
                      ))

                      if (someBarInventory) {
                        console.log("someBarInventoryplayer", player);
                      }

                      if (someBarStash) {
                        console.log("someBarStash", player);
                      }

                      resolve(true)
                    } catch (err) {
                      console.log("~~~err", err);
                    }
                  }
                );
              })
          )
        );
      }
    });
  } catch (err) {
    console.log("Error", err);
    Sentry.captureException(err, { extra: { res } }); 
  }
};
