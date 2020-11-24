import { model, Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
	name: string;
	discordId: string;
	username: string;
	gold: number;
}

const characterSchema = new Schema({
	name: { type: String, required: true },
	discordId: { type: String, required: true },
	username: { type: String, required: true },
	gold: { type: Number, required: true },
});

export default model<ICharacter>('Character', characterSchema);
