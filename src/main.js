const { Client, Collection } = require('discord.js');
const { loadEvents, loadCommands } = require('./utils/loader');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const client = new Client();
client.prefix = process.env.PREFIX;
['commands', 'cooldowns'].map((x) => (client[x] = new Collection()));

loadEvents(client);
loadCommands(client);

client.login(process.env.TOKEN);
