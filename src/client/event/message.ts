import Event from './../../types/Event';
import { Collection, Message } from 'discord.js';

export const onMessage: Event = {
	eventName: 'message',
	handler(message: Message) {
		if (!message.content.startsWith(this.prefix) || message.author.bot)
			return;

		const args = message.content.slice(this.prefix.length).split(/ +/);
		const commandName = args.shift()?.toLocaleLowerCase() || '';

		const command =
			this.commands.get(commandName) ||
			this.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) {
			message.reply(
				`Commande inconnue, faite \`${this.prefix}help\` pour avoir une liste des commandes existante.`
			);
			return;
		}

		if (command.admin && !message.member?.hasPermission('ADMINISTRATOR')) {
			message.reply(
				"Vous n'avez pas les permissions d'utiliser cette commande."
			);
			return;
		}

		if (command.args && !args.length) {
			let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

			if (command.usage)
				noArgsReply += `\nVoici comment utiliser la commande : \`${this.prefix}${command.name} ${command.usage}\`.`;

			message.channel.send(noArgsReply);
			return;
		}

		if (!this.cooldowns.has(command.name)) {
			this.cooldowns.set(command.name, new Collection());
		}

		const timeNow = Date.now();
		const timeStamps = this.cooldowns.get(command.name) || new Collection();
		const cdAmount = (command.cooldown || 5) * 1000;

		if (timeStamps && timeStamps.has(message.author.id)) {
			const cdExpiration =
				(timeStamps.get?.(message.author.id) || 0) + cdAmount;

			if (timeNow < cdExpiration) {
				const timeLeft = (cdExpiration - timeNow) / 1000;
				message.reply(
					`Merci d'attendre ${timeLeft.toFixed(
						0
					)} seconde(s) avant de réutiliser cette commande.`
				);
				return;
			}
		}

		timeStamps.set(message.author.id, timeNow);
		setTimeout(() => timeStamps.delete(message.author.id), cdAmount);

		command.execute({
			client: this,
			message,
			args,
		});
	},
};
