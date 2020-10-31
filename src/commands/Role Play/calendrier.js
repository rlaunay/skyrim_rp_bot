module.exports.run = (client, message, args) => {
    const channelId = args[1];

    const channel = message.guild.channels.cache.find(chan => chan.id === channelId);
    if (!channel || args[0] !== "start" && args[0] !== "stop") return message.reply(`Commande non valide \`${client.prefix}help <nom_de_la_commande>\` pour plus d'info`); 

    if (args[0] === "start") {
        beginCalendar(channel);
    } else if (args[0] === "stop") {
        stopCalendar();
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

let calendar;

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

const beginCalendar = (chan) => {
    const firstDate = new Date();
    updateDate(firstDate, chan);

    calendar = setInterval(() => {
        const date = new Date();
        if (00 === date.getHours()) {
            updateDate(date, chan);
        }
    }, 60000);
}

const updateDate = (date, chan) => {
    const nbr = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    chan.setName(`${skyrim_day[day]} ${nbr} ${skyrim_month[month]}`);
}

const stopCalendar = () => {
    clearInterval(calendar);
}