import { ActivityType, ActivityOptions, ClientPresenceStatus } from "discord.js";

interface IPresenceData {
    activities: ActivityOptions[];
    status: ClientPresenceStatus[];
    interval: number;
}

export const devs: string[] = JSON.parse(process.env.OWNERS ?? "[]");
export const guildsToRegister = JSON.parse(process.env.GUILD_REGISTER ?? "[]");
export const prefix = process.env.PREFIX!;
export const presenceData: IPresenceData = {
    activities: [
        { name: "Hentai", type: ActivityType.Watching }
    ],
    status: ["online"] as ClientPresenceStatus[],
    interval: 60000
};

if (typeof process.env.PREFIX !== "string") throw new Error("CONFIG_PREFIX must be a string");

