import { ActivityType, ClientPresenceStatus } from "discord.js";
import { IPresenceData } from "./typings";
export const devs: string[] = JSON.parse(process.env.OWNERS ?? "[]");
export const guildsToRegister = JSON.parse(process.env.GUILD_REGISTER ?? "[]");
export const prefix = process.env.PREFIX!;
export const presenceData: IPresenceData = {
    activities: [
        { name: "Youtube", type: ActivityType.Watching }
    ],
    status: ["online"] as ClientPresenceStatus[],
    interval: 60000
};

if (typeof process.env.PREFIX !== "string") throw new Error("CONFIG_PREFIX must be a string");

