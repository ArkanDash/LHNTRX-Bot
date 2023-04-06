import { ActivityOptions, ClientPresenceStatus } from "discord.js";

export interface IPresenceData {
    activities: ActivityOptions[];
    status: ClientPresenceStatus[];
    interval: number;
}

declare module "@sapphire/framework" {
    export interface Preconditions {
        ownerOnly: never;
        AdminOnly: never;
    }
}