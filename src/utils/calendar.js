const CronJob = require("cron").CronJob;

module.exports.calendar = async (client, channelId) => {
    try {
        const channel = await client.channels.fetch(channelId);

        const job = new CronJob({
            cronTime: '0 0 * * *', 
            onTick: () => void updateChan(channel), 
            timeZone: 'Europe/Paris',
            runOnInit: true
        });
        job.start();
    } catch(e) {
        console.log(e)
    }
}


const updateChan = async (chan) => {
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

    try {
        await chan.edit({ 
            name: `${skyrim_day[day]} ${nbr} ${skyrim_month[month]}` 
        });
    } catch(e) {
        console.error(e);
    }
}