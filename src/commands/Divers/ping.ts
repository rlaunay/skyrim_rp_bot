import { Command, CmdParameters } from '../../types/Command';

export class Ping implements Command {
	readonly name = 'ping';
	readonly aliases = ['ping'];
	readonly category = 'divers';
	readonly description = 'Renvoie pong!';
	readonly usage = '';
	readonly cooldown = 10;
	readonly args = false;
	admin = false;
	permissions = [];

	execute({ message }: CmdParameters) {
		const start = Date.now();
		message.channel.send('Pong').then((res) => {
			res.edit(`Pong : **${Date.now() - start} ms**`);
		});
	}
}
