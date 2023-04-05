import { ApplyOptions } from '@sapphire/decorators';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { ChannelType, Presence } from 'discord.js';
import { presenceData } from "../config";

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
		this.doPresence();
	}

	private formatString(text: string): string {
        return text
            .replace(/{users.size}/g, (this.container.client.users.cache.size - 1).toString())
            .replace(/{textChannels.size}/g, this.container.client.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size.toString())
            .replace(/{guilds.size}/g, this.container.client.guilds.cache.size.toString())
            .replace(/{username}/g, this.container.client.user!.username)
            .replace(/{voiceChannels.size}/g, this.container.client.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size.toString());
    }

	private setPresence(random: boolean): Presence {
        const activityNumber = random ? Math.floor(Math.random() * presenceData.activities.length) : 0;
        const statusNumber = random ? Math.floor(Math.random() * presenceData.status.length) : 0;
        const activity = presenceData.activities.map(a => Object.assign(a, { name: this.formatString(a.name!) }))[activityNumber];

        return this.container.client.user!.setPresence({
            activities: [activity],
            status: presenceData.status[statusNumber]
        });
    }

	private doPresence(): Presence | undefined {
        try {
            return this.setPresence(false);
        } catch (e: any) {
            if ((e as Error).message !== "Shards are still being spawned.") this.container.client.logger.error(e);
            return undefined;
        } finally {
            setInterval(() => this.setPresence(true), presenceData.interval);
        }
    }

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
