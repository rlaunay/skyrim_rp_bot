module.exports.run = (client, message, args) => {
    message.delete();
    message.channel.send(args.join(" "));
}

module.exports.help = {
    name: "say",
    description: "Répète le message d'un utilisateur",
    usage: '<votre message>',
    args: true
}