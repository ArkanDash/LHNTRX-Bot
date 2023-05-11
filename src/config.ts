import { ActivityType, ClientPresenceStatus } from "discord.js";
import { IPresenceData } from "./typings";
export const devs: string[] = JSON.parse(process.env.CONFIG_OWNERS ?? "[]");
export const guildsToRegister = JSON.parse(process.env.CONFIG_GUILD_TO_REGISTER ?? "[]");
export const prefix = process.env.CONFIG_PREFIX!;
//export const characterAIChar = process.env.CONFIG_CHARACTER!
//export const characterAIToken = process.env.CHARACTER_TOKEN!
export const presenceData: IPresenceData = {
    activities: [
        { name: "Youtube", type: ActivityType.Watching }
    ],
    status: ["online"] as ClientPresenceStatus[],
    interval: 60000
};

if (typeof process.env.CONFIG_PREFIX !== "string") throw new Error("CONFIG_PREFIX must be a string");
//if (typeof process.env.CONFIG_CHARACTER !== "string") throw new Error("CONFIG_CHARACTER must be a string");
//if (typeof process.env.CHARACTER_TOKEN !== "string") throw new Error("CHARACTER_TOKEN must be a string");