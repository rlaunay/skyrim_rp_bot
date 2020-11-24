import { Message } from 'discord.js';
import { SkyrimBot } from '../client';

export type CmdParameters = {
	client: SkyrimBot;
	message: Message;
	args: string[];
};

export interface Command {
	name: string;
	aliases: string[];
	category: string;
	description: string;
	usage: string;
	cooldown?: number;
	admin: boolean;
	permissions: any[];
	args: boolean;

	execute(params: CmdParameters): void;
}
