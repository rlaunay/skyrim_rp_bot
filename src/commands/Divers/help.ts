import { MessageEmbed } from 'discord.js';
import { Command, CmdParameters } from '../../types/Command';

export class Help implements Command {
	readonly name = 'help';
	readonly aliases = ['help', 'aide'];
	readonly category = 'divers';
	readonly description =
		'Renvoie une liste des commandes ou les informations sur une seule.';
	readonly usage = '<nom_de_commande>';
	readonly args = false;
	admin = false;
	permissions = [];

	execute({ client, message, args }: CmdParameters) {
		if (!args.length) {
			const embed = new MessageEmbed()
				.setColor(client.primaryColor)
				.addField(
					'Liste des commandes',
					`Une liste de toutes les sous-catégories disponibles et leurs commandes. 
                \nPour plus d'informations sur une commande, écrire \`${client.prefix}help <nom_de_commande>\`.`
				);

			client.categoryList.map((category) => {
				embed.addField(
					`${category.replace('_', ' ')}`,
					`${client.commands
						.filter(
							(cmd) => cmd.category === category.toLowerCase()
						)
						.map((cmd) => cmd.name)
						.join(', ')}`
				);
			});

			message.channel.send(embed);
		} else {
			const command =
				client.commands.get(args[0]) ||
				client.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(args[0])
				);
			if (!command) {
				message.reply(
					`Commande inconnue, faites \`${client.prefix}help\` pour avoir une liste des commandes existante.`
				);
				return;
			}

			const embed = new MessageEmbed()
				.setColor(client.primaryColor)
				.setTitle(`\`${command.name}\``)
				.addField(
					'Description',
					`${command.description} (cd: ${command.cooldown || 5} secs)`
				)
				.addField(
					'Utilisation',
					command.usage
						? `\`${client.prefix}${command.name} ${command.usage}\``
						: `\`${client.prefix}${command.name}\``,
					true
				);

			if (command.aliases.length > 1)
				embed.addField('Alias', `${command.aliases.join(', ')}`, true);

			message.channel.send(embed);
		}
	}
}
