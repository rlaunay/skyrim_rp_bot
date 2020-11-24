if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv');
	dotenv.config();
}

if (
	!process.env.PREFIX ||
	!process.env.TOKEN ||
	!process.env.PRIMARY_COLOR ||
	!process.env.CALENDAR_CHAN
) {
	throw new Error('Invalid bot config !!');
}

export type ConfigBot = {
	token: string;
	prefix: string;
	primaryColor: string;
	calendarChan: string;
};

export const configBot: ConfigBot = {
	token: process.env.TOKEN,
	prefix: process.env.PREFIX,
	primaryColor: process.env.PRIMARY_COLOR,
	calendarChan: process.env.CALENDAR_CHAN,
};

if (
	!process.env.MONGO_NAME ||
	!process.env.MONGO_USER ||
	!process.env.MONGO_PW ||
	!process.env.MONGO_URL
) {
	throw new Error('Invalid Database config !!');
}

const url = process.env.MONGO_URL;

export const mongodb_uri = url
	.replace('{{username}}', process.env.MONGO_USER)
	.replace('{{password}}', process.env.MONGO_PW)
	.replace('{{dbname}}', process.env.MONGO_NAME);
