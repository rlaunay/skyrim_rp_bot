import { CharacterService } from '../../services/character.service';
import { CmdParameters, Command } from '../../types/Command';
import { isUserMention } from '../../utils/users';

export class NewCharacters implements Command {
	name = 'new-characters';
	aliases = ['new-characters', 'créer-personnage', 'nc', 'cp'];
	category = 'gestion_personnages';
	description = 'Permet de créer un personnage à un utilisateur discord';
	usage = '<discord_tag> <nom_personnage>';
	admin = true;
	permissions = [];
	args = true;

	characterService = new CharacterService();

	async execute({ client, message, args }: CmdParameters) {
		if (args.length !== 2 || !isUserMention(args[0])) {
			message.reply(
				'Arguments incorrects' +
					`\nVoici comment utiliser la commande : \`${client.prefix}${this.name} ${this.usage}\`.`
			);
			return;
		}

		const userMention = message.mentions.members?.first();
		if (!userMention) {
			message.reply('Utilisateur non ixistant');
			return;
		}

		try {
			const result = await this.characterService.createNewCharacter(
				args[1],
				userMention.id,
				userMention.user.tag
			);

			message.reply(
				`Le personnage : ${result.name} à été ajouté à l'utilisateur ${result.username}`
			);
		} catch (error) {
			message.reply(error.message);
			return;
		}
	}
}
