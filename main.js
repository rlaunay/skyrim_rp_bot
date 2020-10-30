const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");


const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
});

client.on('message', message => {
    if (message.content === `${PREFIX}salut`) message.channel.send("HEYYYYYY Salut à tous les amis ici le bot Skyrim RP !!!")
});

client.login(TOKEN);