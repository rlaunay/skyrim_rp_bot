module.exports.run = (client, message, args) => {
	const start = Date.now();
	message.channel.send('Pong').then((res) => {
		res.edit(`Pong : **${Date.now() - start} ms**`);
	});
};

module.exports.help = {
	name: 'ping',
	aliases: ['ping'],
	category: 'divers',
	description: 'Renvoie pong!',
	usage: '',
	cooldown: 10,
	admin: false,
	permissions: [],
	args: false,
};
