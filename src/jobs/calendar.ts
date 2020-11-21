import { VoiceChannel } from 'discord.js';
import { SkyrimBot } from '../client';

const CronJob = require('cron').CronJob;

export const calendar = async (client: SkyrimBot) => {
	try {
		const channel = await client.channels.fetch(client.calendarChannel);

		if (channel instanceof VoiceChannel) {
			const job = new CronJob({
				cronTime: '0 5 1 * * *',
				onTick: () => void updateChan(channel),
				timeZone: 'Europe/Paris',
				runOnInit: true,
			});
			job.start();
		} else {
			throw new Error('Calendar channel id must be a voice channel');
		}
	} catch (e) {
		console.log(e);
	}
};

const updateChan = async (chan: VoiceChannel) => {
	const date = new Date();

	const skyrim_day = [
		'Sundas',
		'Morndas',
		'Tirdas',
		'Middas',
		'Turdas',
		'Fredas',
		'Loredas',
	];

	const skyrim_month = [
		'Primétoile',
		'Clairciel',
		'Semailles',
		'Ondepluie',
		'Plantaisons',
		"Mi-l'an",
		'Hautzénith',
		'Vifazur',
		'Âtrefeu',
		'Soufflegivre',
		'Sombreciel',
		'Soirétoile',
	];

	const nbr = date.getDate();
	const day = date.getDay();
	const month = date.getMonth();

	console.log(
		`Date mise à jour: ${skyrim_day[day]} ${nbr} ${skyrim_month[month]}`
	);

	try {
		await chan.edit({
			name: `${skyrim_day[day]} ${nbr} ${skyrim_month[month]}`,
		});
	} catch (e) {
		console.error(e);
	}
};
