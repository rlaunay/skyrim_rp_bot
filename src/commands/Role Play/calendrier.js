module.exports.run = (client, message, args) => {
    const channelId = args[1];

    const channel = message.guild.channels.cache.find(chan => chan.id === channelId);

    if (args[0] === "start" && !client.calendar && channel) {
        beginCalendar(client, channel);
        return message.channel.send('Un calendrier a été mis en place.');
    } else if (args[0] === "stop" && client.calendar) {
        stopCalendar(client);
        return message.channel.send('Calendrier stoppé.');
    } else if (args[0] === "info") {
        if (client.calendar) {
            console.log(client.calendar);
            return message.reply('Calendrier actif.');
        } else {
            console.log(client.calendar);
            return message.reply('Aucun calendrier.');
        }
    } else {
        return message.reply(`Un problème est survenu \`${client.prefix}help calendrier\`, pour plus d'informations sur la commande`);
    }
}

module.exports.help = {
    name: "calendrier",
    aliases: [ "calendrier", "cal", "calendar"],
    category: 'role play',
    description: "Affiche la date du RP sur un salon",
    usage: '<start|stop> <id_du_salon_visé>',
    admin: true,
    permissions: [],
    args: true
}

const beginCalendar = (client, chan) => {

    updateDate(chan)

    client.calendar = setInterval(() => {
        const date = new Date();
        const hours = date.getHours();

        if (hours == 00) {
            updateDate(chan);
        }

    }, 60000 * 10);
}

const stopCalendar = (client) => {
    clearInterval(client.calendar);
    client.calendar = null;
}

const updateDate = (chan) => {
    const date = new Date();

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

    const nbr = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();

    chan.setName(`${skyrim_day[day]} ${nbr} ${skyrim_month[month]}`)
                .then(() => console.log('Noice'))
                .catch(console.error);
}