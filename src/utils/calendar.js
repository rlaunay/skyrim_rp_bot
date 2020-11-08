const CronJob = require("cron").CronJob;

module.exports = async (client, channelId) => {
    try {
        const channel = await client.channels.fetch(channelId);

        const job = new CronJob('0 0 * * *', updateChan(channel))
        job.start();
    } catch(e) {
        console.log(e)
    }
}


const updateChan = (chan) => {
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