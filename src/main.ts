// Sapphire Plugins
import "@sapphire/plugin-editable-commands/register";
import "dotenv/config";
import { BucketScope, SapphireClient, LogLevel } from "@sapphire/framework";
import process from "node:process";
import { devs, prefix } from "./config.js";
import { GatewayIntentBits } from "discord.js";

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    loadMessageCommandListeners: true,
    fetchPrefix: () => prefix,
    defaultCooldown: {
        delay: 10_000,
        filteredUsers: devs,
        limit: 2,
        scope: BucketScope.Channel
    },
    logger: {
        level: LogLevel.Debug
    }
});

process.on("unhandledRejection", e => {
    client.logger.error(e);
});

process.on("uncaughtException", e => {
    client.logger.fatal(e);
    process.exit(1);
});

client.login(process.env.DISCORD_TOKEN).catch(e => client.logger.error(e));