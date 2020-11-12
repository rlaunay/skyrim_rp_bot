const { calendar } = require('./../../utils/calendar');

module.exports = (client) => {
	console.log(`Logged in as ${client.user.tag} !`);
	client.user.setActivity(` - ${client.prefix}help`);

	calendar(client, process.env.CALENDAR_CHAN);
};
