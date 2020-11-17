import { Client, Collection } from 'discord.js';
import { ConfigBot } from './../config/config';

import * as events from './event';
import * as commands from './../commands';
import { Command } from '../types/Command';

export class SkyrimBot extends Client {
	categoryList: string[] = [];
	commands: Collection<string, Command> = new Collection();
	cooldowns: Collection<
		string,
		Collection<string, number>
	> = new Collection();

	constructor(private config: ConfigBot) {
		super();
	}

	public get prefix(): string {
		return this.config.prefix;
	}

	public get primaryColor(): string {
		return '#' + this.config.primaryColor;
	}

	public get calendarChannel(): string {
		return this.config.calendarChan;
	}

	private loadCommands() {
		for (const [categoryName, commandCatergory] of Object.entries(
			commands
		)) {
			this.categoryList.push(categoryName);
			console.log(`${categoryName} :`);
			for (const [commandName, CommandClass] of Object.entries(
				commandCatergory
			)) {
				this.commands.set(
					commandName.toLowerCase(),
					new CommandClass()
				);
				console.log(`   - Commande chargée: ${commandName}`);
			}
		}
	}

	private loadEvents() {
		for (const event of Object.values(events)) {
			this.on(event.eventName, event.handler.bind(this));
		}
	}

	start() {
		this.loadCommands();
		this.loadEvents();
		this.login(this.config.token);
	}
}
