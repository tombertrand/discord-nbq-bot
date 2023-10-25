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
// import { getPurchaseTotal } from "./purchase";

const { REDIS_PORT, REDIS_HOST, REDIS_DB_INDEX, REDIS_PASSWORD, BOT_TOKEN } =
  process.env;

//@ts-ignore
let redisClient: any;
setImmediate(async () => {
  redisClient = await createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    password: REDIS_PASSWORD,
    database: 0,
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  redisClient.on("connect", async () => {
    if (REDIS_DB_INDEX) {
      //@ts-ignore
      redisClient.select(parseInt(REDIS_DB_INDEX, 10));
    }
  });
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

const ADMINS = [
  "running-coder",
  "oldschooler",
  "Baikie",
  // "Phet",
  // "CallMeCas", 
  "HeroOfNano",
  "Dyllux",
  "Bella",
  "CelioSevii",
  "xDulfinz",
  "bruin",
];

const MAX_REPLY_LENGTH = 2000;
const prefix = "!";

const getCommands = (isAdmin = false) => {
  const commands = [
    "`!link` Link your Discord account to your (Ba)NanoBrowserQuest account\nThe Bot will DM you a secret key, login into your (Ba)NanoBrowserQuest account and type in the chat `!link SECRET`.",
    "`!me` Show your player stats to other players, this command requires your Discord and (Ba)NanoBrowserQuest accounts to be linked",
    "`!unlink` Unlink your Discord and your (Ba)NanoBrowserQuest account",
    "`!getroles` Refresh the roles assigned to your account.",
    "`!runelist` List the runes by rank and their attribute(s)\nYou can combine runes at the Anvil to get the next rank rune. Below rune rank 18 you need 3 of the same rune, above or equal is 2 runes.",
    "`!runewords [helm|armor|weapon|shield]` List the runewords that can be forged at the Anvil\nTo succesfully forge runewords you need to place the runes in a **non-unique** equipment in the exact order for the correct amount of sockets.",
    "`!admins` List the game admins",
  ].concat(
    isAdmin
      ? [
          "`!unban [playername]` Admin only, immadiate effect",
          "`!chatunban [playername]` Admin only, will take 5 minutes to take effect",
          "`!chatban [playername]` Admin only, will take 5 minutes to take effect",
          "`!reason [playername]` Admin only, give out the reason why player was banned",
        ]
      : []
  );

  return commands;
};

const channels = {
  general: "971429295186665536",
  jungle: "971536705121300490",
  support: "971429767842779146",
  betaChat: "1058466758077468782",
  moderatorSupport: "1149048949928370326",
};

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (
    ![channels.support, channels.betaChat, channels.moderatorSupport].includes(
      message.channelId
    )
  ) {
    message.reply(
      `You may only use bot commands in the <#${channels.support}> channel`
    );
    return;
  }

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift()!.toLowerCase();

  if (command === "commands" || command === "help") {
    const key = `discord:${message.author.id}`;
    const playerName = await redisClient.get(key);

    const isAdmin = playerName ? ADMINS.includes(playerName) : false;

    message.reply(`Commands:\n${getCommands(isAdmin).join("\n")}`);
  } else if (["unban", "chatunban", "chatban", "reason"].includes(command)) {
    const key = `discord:${message.author.id}`;
    const adminPlayerName = await redisClient.get(key);

    const isAdmin = adminPlayerName && ADMINS.includes(adminPlayerName);

    const bannedPlayerName = args.join(" ");

    if (!isAdmin) {
      message.reply(
        `Only admins can unban players, reach out to an admin and ask to revise your ban`
      );
      return;
    } else if (!bannedPlayerName) {
      message.reply(`missing player name to unban`);
      return;
    }

    let isPlayerBanned = false;
    let isPlayerChatBanned = !!(await redisClient.hExists(
      `chatBan`,
      bannedPlayerName
    ));
    let banDetails;
    if (command === "chatban") {
      if (isPlayerChatBanned) {
        message.reply(`${bannedPlayerName} is already chat banned`);
      } else {
        await redisClient.hSet(
          `chatBan`,
          bannedPlayerName,
          JSON.stringify({
            message: "manual chat ban from Discord",
            admin: adminPlayerName,
          })
        );
        message.reply(`${bannedPlayerName} is now chat banned`);
        return;
      }
      return;
    } else if (command === "reason") {
      isPlayerBanned = !!(await redisClient.exists(`ban:${bannedPlayerName}`));

      if (isPlayerBanned) {
        banDetails = await redisClient.hGetAll(`ban:${bannedPlayerName}`);

        const { timestamp, reason, message: banMessage, admin } = banDetails;

        if (banDetails) {
          message.reply(
            [
              bannedPlayerName ? `Player: ${bannedPlayerName} is banned` : "",
              admin ? `by admin: ${admin}` : "",
              timestamp ? `until: ${new Date(Number(timestamp))}` : "",
              reason ? `reason: ${reason}` : "",
              banMessage ? `message: ${banMessage.replace("@", "")}` : "",
            ].join("\n")
          );

          return;
        }
      }

      if (!isPlayerBanned && !banDetails && !isPlayerChatBanned) {
        message.reply(`${bannedPlayerName} is not banned`);
        return;
      }

      if (isPlayerChatBanned) {
        const chatbanDetails = await redisClient.hGet(
          "chatBan",
          bannedPlayerName
        );

        if (chatbanDetails) {
          try {
            const { message: chatBanMessage } = JSON.parse(chatbanDetails);

            message.reply(
              bannedPlayerName && chatBanMessage
                ? `Player: ${bannedPlayerName} is chat banned for saying "${chatBanMessage}"`
                : ""
            );
          } catch (err) {}
        }
        return;
      }
    } else if (command === "chatunban" && isPlayerChatBanned) {
      await redisClient.hDel("chatBan", bannedPlayerName);

      message.reply(
        `${bannedPlayerName} was unbanned from chat (5 mins delay)`
      );
      return;
    } else if (command === "unban") {
      isPlayerBanned = !!(await redisClient.exists(`ban:${bannedPlayerName}`));

      const ipbans = await redisClient.keys("ipban:*");

      ipbans?.map(async (ipKey: string) => {
        const player = await redisClient.hGet(ipKey, "player");

        if (player === bannedPlayerName) {
          redisClient.del(ipKey);
          message.reply(`${bannedPlayerName} IP ban is now lifted`);
        }
      });

      if (isPlayerBanned) {
        await redisClient.del(`ban:${bannedPlayerName}`);
        message.reply(`${bannedPlayerName} was unbanned`);
      } else {
        message.reply(`${bannedPlayerName} is not banned`);
        return;
      }
    }
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
    let equipmentType = args[0];
    if (equipmentType === "helmet") {
      equipmentType = "helm";
    }

    if (args[0]) {
      if (equipmentTypes.includes(equipmentType)) {
        equipmentTypes = [equipmentType];
      } else {
        equipmentTypes = [];
        reply = `${args[0]} is not a valid item type, use one of the following:[helm|armor|weapon|shield]`;
      }
    }

    equipmentTypes?.map((equipment) => {
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
  } else if (command === "admins") {
    message.reply(`The game admins are ${ADMINS.join(", ")}.`);
    return;
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

    const isCowKingDefeated = !!achievement[41];
    const isSpiderQueenDefeated = !!achievement[53];
    const isGoreFiendDefeated = !!achievement[59];
    const isGrimoireFound = !!achievement[77];
    const isAzraelDefeated = !!achievement[69];
    const network = player.network;

    const assignedRoleNames = [];
    let oldLevelRole;
    let levelRole;
    let skeletonKingRole;
    let necromancerRole;
    let cowKingRole;
    let goreFiendRole;
    let spiderQueenRole;
    let azraelRole;
    let grimoireRole;
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

    if (isCowKingDefeated) {
      cowKingRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.cowKing
      );

      if (cowKingRole) {
        assignedRoleNames.push(cowKingRole.name);
        message.member?.roles.add(cowKingRole);
      }
    }
    if (isAzraelDefeated) {
      azraelRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.azrael
      );

      if (azraelRole) {
        assignedRoleNames.push(azraelRole.name);
        message.member?.roles.add(azraelRole);
      }
    }
    if (isGrimoireFound) {
      grimoireRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.grimoire
      );

      if (grimoireRole) {
        assignedRoleNames.push(grimoireRole.name);
        message.member?.roles.add(grimoireRole);
      }
    }
    if (isGoreFiendDefeated) {
      goreFiendRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.goreFiend
      );

      if (goreFiendRole) {
        assignedRoleNames.push(goreFiendRole.name);
        message.member?.roles.add(goreFiendRole);
      }
    }
    if (isSpiderQueenDefeated) {
      spiderQueenRole = message.guild?.roles.cache.find(
        (role) => role.id === RolesMap.spiderQueen
      );

      if (spiderQueenRole) {
        assignedRoleNames.push(spiderQueenRole.name);
        message.member?.roles.add(spiderQueenRole);
      }
    }
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
