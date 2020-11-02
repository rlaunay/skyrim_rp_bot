const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

const categoryList = readdirSync('./src/commands');

module.exports.run = (client, message, args) => {
    if (!args.length) {
        const embed = new MessageEmbed()
            .setColor("#2ecc71")
            .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes. 
            \nPour plus d'informations sur une commande, écrire \`${client.prefix}help <nom_de_commande>\`.`);
        
        categoryList.map(category => {
            embed.addField(
                `${category}`,
                `${client.commands.filter(cmd => cmd.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
            )
        })

        message.channel.send(embed);
    } else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        if (!command) return message.reply(`Commande inconnue, faite \`${client.prefix}help\` pour avoir une liste des commandes existante.`);

        const embed = new MessageEmbed()
            .setColor("#2ecc71")
            .setTitle(`\`${command.help.name}\``)
            .addField("Description", `${command.help.description} (cd: ${command.help.cooldown || 5} secs)`)
            .addField("Utilisation", command.help.usage ? `${client.prefix}${command.help.name} ${command.help.usage}` : `${client.prefix}${command.help.name}`, true);
        
        if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);

        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "help",
    aliases: ["help"],
    category: 'divers',
    description: "Renvoie une liste des commandes ou les informations sur une seule.",
    usage: '<nom_de_commande>',
    admin: false,
    permissions: [],
    args: false
}