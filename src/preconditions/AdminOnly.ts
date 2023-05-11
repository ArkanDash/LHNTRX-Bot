import { ApplyOptions } from "@sapphire/decorators";
import { Precondition, PreconditionOptions, PreconditionResult } from "@sapphire/framework";
import { GuildMember, Interaction, Message } from "discord.js";
import { Roles } from "../constants";

@ApplyOptions<PreconditionOptions>({
    name: "AdminOnly"
})

export class AdminOnly extends Precondition {
    public messageRun(message: Message): PreconditionResult {
        const member = message.guild?.members.cache.get(message.author.id);
        return this.isAdmin(member);
    }

    public chatInputRun(interaction: Interaction): PreconditionResult {
        const member = interaction.guild?.members.cache.get(interaction.user.id);
        return this.isAdmin(member);
    }

    private isAdmin(user: GuildMember | undefined): PreconditionResult {
        //if (!user) return this.error({ message: `Only ${Roles.map((role) => `<@&${role}>`).join(' or ')} can do this` });
        //return user.roles.cache.some((role) => Roles.includes(role.id)) ? this.ok() : this.error({ message: `Only ${Roles.map((role) => `<@&${role}>`).join(' or ')} can do this` });
        if (!user) return this.error({ message: `Only <&${Roles.ADMIN}> can do this` });
        return user.roles.cache.has(Roles.ADMIN) ? this.ok() : this.error({ message: `Only <&${Roles.ADMIN}> can do this` });
    }
}