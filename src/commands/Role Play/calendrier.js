module.exports.run = (client, message, args) => {
    const channelId = args[1];

    const channel = message.guild.channels.cache.find(chan => chan.id === channelId);

    if (args[0] === "start") {
        beginCalendar(client, channel);
        return message.channel.send('Un calendrier à été mis en place');
    } else if (args[0] === "stop") {
        stopCalendar(client);
        return message.channel.send('Calendrier stopper');
    } else if (args[0] === "info") {
        if (client.calendar) {
            console.log(client.calendar);
            return message.reply('Calendrier actif');
        } else {
            console.log(client.calendar);
            return message.reply('Aucun calendrier');
        }
    }
}

module.exports.help = {
    name: "calendrier",
    aliases: [ "calendrier", "cal", "calendar"],
    category: 'role play',
    description: "Affcihe la date du jour correspondant au RP sur un salon",
    usage: '<start | stop> <id du salon visé>',
    admin: true,
    permissions: [],
    args: true
}

const skyrim_day = [
    'Sundas',
    'Morndas',
    'Tirdas',
    'Middas',
    'Turdas',
    'Fredas',
    'Loredas'
]

const skyrim_month = [
    'Primétoile',
    'Clairciel',
    'Semailles',
    'Ondepluie',
    'Plantaisons',
    'Mi-l\'an',
    'Hautzénith',
    'Vifazur',
    'Âtrefeu',
    'Soufflegivre',
    'Sombreciel',
    'Soirétoile'
]

const beginCalendar = (client, chan) => {
    client.calendar = setInterval(() => updateDate(new Date(), chan), 60000);
}

const updateDate = (date, chan) => {
    const nbr = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    chan.setName(`${skyrim_day[day]} ${nbr} ${skyrim_month[month]}`);
}

const stopCalendar = (client) => {
    clearInterval(client.calendar);
    client.calendar = null;
}