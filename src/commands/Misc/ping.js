module.exports.run = (client, message, args) => {
    const start = Date.now();
    message.channel.send('Pong').then((res) => {
        res.edit(`Pong : **${Date.now() - start} ms**`);
    });
}

module.exports.help = {
    name: "ping",
    description: "Renvoie pong!",
    args: false
}