const { readdirSync } = require("fs");

const loadCommands = (client, dir = "/commands") => {
    readdirSync(`./src${dir}`).map(dirs => {
        const commands = readdirSync(`./src${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        console.log(`${dirs} :`)

        commands.map(file => {
            const getFileName = require(`..${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`   - Commande chargée: ${getFileName.help.name}`);
        })
    })
}

const loadEvents = (client, dir = "/events") => {
    readdirSync(`./src${dir}`).map(dirs => {
        const events = readdirSync(`./src${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        console.log(`${dirs} :`)

        events.map(eventFile => {
            const event = require(`..${dir}/${dirs}/${eventFile}`);
            const eventName = eventFile.split('.')[0];

            client.on(eventName, event.bind(null, client));
            console.log(`Evenement chargé: ${eventName}`);
        })
    })
}

module.exports = {
    loadEvents,
    loadCommands
}