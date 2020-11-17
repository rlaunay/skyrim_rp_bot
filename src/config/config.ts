import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

if (
	!process.env.PREFIX ||
	!process.env.TOKEN ||
	!process.env.PRIMARY_COLOR ||
	!process.env.CALENDAR_CHAN
) {
	throw new Error('Invalid config bot !!');
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
