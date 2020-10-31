const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();;
}


const client = new Client();
client.prefix = process.env.PREFIX;
["commands", "cooldowns"].map(x => client[x] = new Collection());

const loadCommands = (dir = "/commands") => {
    readdirSync(`./src${dir}`).map(dirs => {
        const commands = readdirSync(`./src${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        console.log(`${dirs} :`)

        commands.map(file => {
            const getFileName = require(`.${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`   - Commande chargée: ${getFileName.help.name}`);
        })
    })
}

loadCommands();

client.on('message', message => {

    if (!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    const isAuthorized = message.member.roles.cache.find(role => command.help.permissions.includes(role.id)) || message.member.hasPermission('ADMINISTRATOR');
    if (!isAuthorized && command.help.admin) return message.reply('Vous n\'avez les permissions d\'utiliser cette commande');

    if (command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${client.prefix}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }

    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const timeStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (timeStamps.has(message.author.id)) {
        const cdExpiration = timeStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpiration) {
            const timeLeft = (cdExpiration - timeNow) / 1000;
            return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de réutilisé cette commande`);
        }
    }

    timeStamps.set(message.author.id, timeNow);
    setTimeout(() => timeStamps.delete(message.author.id), cdAmount)

    command.run(client, message, args);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
    client.user.setActivity(` - ${client.prefix}help`);
});
client.login(process.env.TOKEN);