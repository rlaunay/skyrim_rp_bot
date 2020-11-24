import Charactere from '../models/character.model';

export class CharacterService {
	async createNewCharacter(
		name: string,
		discordId: string,
		username: string
	) {
		const newCharacter = new Charactere({
			name,
			discordId,
			username,
			gold: 1000,
		});
		try {
			const result = await newCharacter.save();
			return { name: result.name, username: result.username };
		} catch (error) {
			console.log(error);
			throw new Error('Création de personnage échouer');
		}
	}
}
