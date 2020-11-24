import { Command } from '../../types/Command';

export class Characters implements Command {
	name = 'characters';
	aliases = ['characters', 'personnages', 'char', 'perso'];
	category = 'gestion_personnages';
	description = 'Permet de lister les personnages du joueur mentionné';
	usage = '<discord_tag>';
	admin = false;
	permissions = [];
	args = true;

	execute() {}
}
