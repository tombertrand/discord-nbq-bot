import * as dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";
import { EmojiMap } from "./emojis";
import { Runes, Runewords } from "./runes";
import { getBonusDescription } from "./bonus";
import { createClient } from "redis";
import { generateRandomString } from "./utils";
import { RolesMap } from "./roles";
import { getLevel } from "./experience";

const { REDIS_PORT, REDIS_HOST, REDIS_DB_INDEX, REDIS_PASSWORD, BOT_TOKEN } =
  process.env;

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  password: REDIS_PASSWORD,
  database: 0,
});

setImmediate(async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  redisClient.on("connect", () => {
    if (REDIS_DB_INDEX) {
      redisClient.select(parseInt(REDIS_DB_INDEX, 10));
    }
  });

  await redisClient.connect();
});

const client = new Client({
  // intents: 268446720,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const MAX_REPLY_LENGTH = 2000;
const prefix = "!";
const commands = [
  "`!link` Link your Discord account to your (Ba)NanoBrowserQuest account\nThe Bot will DM you a secret key, login into your (Ba)NanoBrowserQuest account and type in the chat `!link SECRET`.",
  "`!me` Show your player stats to other players, this command requires your Discord and (Ba)NanoBrowserQuest accounts to be linked",
  "`!unlink` Unlink your Discord and your (Ba)NanoBrowserQuest account",
  "`!getroles` Refresh the roles assigned to your account.",
  "`!runelist` List the runes by rank and their attribute(s)\nYou can combine runes at the Anvil to get the next rank rune. Below rune rank 18 you need 3 of the same rune, above or equal is 2 runes.",
  "`!runewords [armor|weapon|shield]` List the runewords that can be forged at the Anvil\nTo succesfully forge runewords you need to place the runes in a **non-unique** equipment in the exact order for the correct amount of sockets.",
];

const channels = {
  general: "971429295186665536",
  jungle: "971536705121300490",
  support: "971429767842779146",
  betaChat: "1058466758077468782",
};

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (![channels.support, channels.betaChat].includes(message.channelId)) {
    message.reply(
      `You may only use bot commands in the <#${channels.support}> channel`
    );
    return;
  }

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift()!.toLowerCase();

  if (command === "commands" || command === "help") {
    message.reply(`Commands:\n${commands.join("\n")}`);
  } else if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "runelist" || command === "runes") {
    const reply = Object.entries(EmojiMap)
      .map(([key, value]) => {
        if (!key.startsWith("rune-")) {
          return;
        }

        const rune = key.replace("rune-", "");
        const { rank, attribute } = Runes[rune];
        const description = Object.entries(attribute)
          .map(([bonus, stats]) => `${getBonusDescription(bonus, stats)}`)
          .join(", ");

        return `#${rank} ${rune} ${value}: ${description}`;
      })
      .filter(Boolean)
      .join("\n");

    message.reply(reply);
  } else if (command === "runewords" || command === "runeword") {
    let reply = "";
    let equipmentTypes = Object.keys(Runewords);

    if (args[0] && equipmentTypes.includes(args[0])) {
      equipmentTypes = [args[0]];
    }

    equipmentTypes.map((equipment) => {
      Object.entries(Runewords[equipment]).map(
        ([runes, { name, bonus }]: [string, any]) => {
          const runeEmojis = runes
            .split("-")
            .map((rune) => EmojiMap[`rune-${rune}`]);

          const description = Object.entries(bonus)
            .map(([bonus, stats]) => `${getBonusDescription(bonus, stats)}`)
            .join(", ");

          const line = `**${name}** (${runeEmojis.join("")}): ${description}`;

          if (reply.length + line.length < MAX_REPLY_LENGTH) {
            reply += `${line}\n`;
          } else {
            message.reply(reply.trim());
            reply = `${line}\n`;
          }
        }
      );
    });

    // @ts-ignore
    message.reply(reply.trim());
  } else if (command === "link") {
    const key = `discord:${message.author.id}`;
    const playerName = await redisClient.get(key);

    console.log(`Author ID: ${message.author.id} trying to !link`);

    if (playerName) {
      message.author
        .send(
          `You're Discord account is already linked to ${
            playerName || "Unknown player name"
          }`
        )
        .catch((_error) => {
          message.channel.send(
            `Something went wrong while I tried to send you a DM`
          );
        });
    } else {
      const secret = generateRandomString(6);

      redisClient.set(key, "");
      redisClient.set(`discord_secret:${secret}`, message.author.id);

      message.author
        .send(
          `You're trying to link your Discord account with your (Ba)NanoBrowserQuest account!\nTo do so, login to your player account and type the following command in the game chat box.\n\n\`\`\`!link ${secret}\`\`\`\nIf the secret is correct you'll receive a success message from the Quest Bot on Discord!`
        )
        .catch((_error) => {
          console.log(`Something went wrong while I tried to send you a DM`);

          message.channel.send(
            `Something went wrong while I tried to send you a DM`
          );
        });
    }
  } else if (command === "me") {
    const key = `discord:${message.author.id}`;
    const playerName = await redisClient.get(key);

    if (!playerName) {
      message.reply(
        `Your Discord account is not linked to a (Ba)NanoBrowserQuest account. Use the \`!link\` command.`
      );
    } else {
      message.reply(`Your character is ${playerName}`);
    }

    // @TODO Get level and stats
  } else if (command === "unlink") {
    const key = `discord:${message.author.id}`;
    const playerName = await redisClient.get(key);

    if (!playerName) {
      message.reply(
        `Your Discord account is not linked to a (Ba)NanoBrowserQuest account.`
      );
      return;
    }

    await redisClient.del(key);
    await redisClient.hDel(`u:${playerName}`, "discordId");

    message.member?.roles.remove(Object.values(RolesMap));

    message.reply(
      `Your account has been unlinked from ${playerName}, your roles were also cleared.`
    );
  } else if (command === "getroles") {
    const key = `discord:${message.author.id}`;
    const playerName = await redisClient.get(key);

    if (!playerName) {
      message.reply(
        `Your Discord account is not linked to a (Ba)NanoBrowserQuest account. Use the \`!link\` command.`
      );
      return;
    }

    const player = await redisClient.hGetAll(`u:${playerName}`);

    if (!player) {
      message.reply(`Your (Ba)NanoBrowserQuest account was not found.`);
      return;
    }

    const level = getLevel(parseInt(player.exp));
    const achievement = JSON.parse(player.achievement);
    const isSkeletonKingDefeated = !!achievement[20];
    const isNecromancerDefeated = !!achievement[36];
    const network = player.network;

    const assignedRoleNames = [];
    let oldLevelRole;
    let levelRole;
    let skeletonKingRole;
    let necromancerRole;
    let networkRole;

    // Level
    oldLevelRole = message.member?.roles.cache.find((role) =>
      role.name.startsWith("lv.")
    );
    if (oldLevelRole) {
      message.member?.roles.remove(oldLevelRole);
    }
    levelRole = message.guild?.roles.cache.find(
      (role) => role.name === `lv.${level}`
    );
    if (levelRole) {
      assignedRoleNames.push(levelRole.name);
      message.member?.roles.add(levelRole);
    }

    // Achievement
    if (isSkeletonKingDefeated) {
      skeletonKingRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.skeletonking
      );

      if (skeletonKingRole) {
        assignedRoleNames.push(skeletonKingRole.name);
        message.member?.roles.add(skeletonKingRole);
      }
    }
    if (isNecromancerDefeated) {
      necromancerRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.necromancer
      );

      if (necromancerRole) {
        assignedRoleNames.push(necromancerRole.name);
        message.member?.roles.add(necromancerRole);
      }
    }
    // @TODO Death Angel role!

    // Network
    if (network) {
      networkRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap[network]
      );

      if (networkRole) {
        assignedRoleNames.push(networkRole.name);
        message.member?.roles.add(networkRole);
      }
    }

    if (assignedRoleNames.length) {
      message.reply(
        `You were assigned the following roles: ${assignedRoleNames
          .map((role) => `\`${role}\``)
          .join(", ")}`
      );
    } else {
      message.reply(`No roles was assigned.`);
    }
  }
});

client.login(BOT_TOKEN);
