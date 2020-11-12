const { Collection } = require('discord.js');

module.exports = (client, message) => {
	if (!message.content.startsWith(client.prefix) || message.author.bot)
		return;

	const args = message.content.slice(client.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			(cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
		);
	if (!command)
		return message.reply(
			`Commande inconnue, faite \`${client.prefix}help\` pour avoir une liste des commandes existante.`
		);

	if (command.help.admin && !message.member.hasPermission('ADMINISTRATOR'))
		return message.reply(
			"Vous n'avez pas les permissions d'utiliser cette commande."
		);

	if (command.help.args && !args.length) {
		let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

		if (command.help.usage)
			noArgsReply += `\nVoici comment utiliser la commande : \`${client.prefix}${command.help.name} ${command.help.usage}\`.`;

		return message.channel.send(noArgsReply);
	}

	if (!client.cooldowns.has(command.help.name)) {
		client.cooldowns.set(command.help.name, new Collection());
	}

	const timeNow = Date.now();
	const timeStamps = client.cooldowns.get(command.help.name);
	const cdAmount = (command.help.cooldown || 5) * 1000;

	if (timeStamps.has(message.author.id)) {
		const cdExpiration = timeStamps.get(message.author.id) + cdAmount;

		if (timeNow < cdExpiration) {
			const timeLeft = (cdExpiration - timeNow) / 1000;
			return message.reply(
				`Merci d'attendre ${timeLeft.toFixed(
					0
				)} seconde(s) avant de réutiliser cette commande.`
			);
		}
	}

	timeStamps.set(message.author.id, timeNow);
	setTimeout(() => timeStamps.delete(message.author.id), cdAmount);

	command.run(client, message, args);
};
