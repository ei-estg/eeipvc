const { MessageEmbed } = require('discord.js')

let embed = () =>
    new MessageEmbed()
        .setColor(16777215)
        .setAuthor(
            'SAS IPVC',
            'https://cdn.discordapp.com/avatars/771442069432434758/3647fc1e2487d8613ee822918dd362b5.png?size=256'
        )

module.exports = embed
