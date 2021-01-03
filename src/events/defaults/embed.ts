import { MessageEmbed } from 'discord.js'

export const sasEmbed = () =>
    new MessageEmbed()
        .setColor(16777215)
        .setAuthor(
            'SAS IPVC',
            'https://cdn.discordapp.com/avatars/771442069432434758/3647fc1e2487d8613ee822918dd362b5.png?size=256',
        )

export const onEmbed = () =>
    new MessageEmbed()
        .setColor(2126508)
        .setAuthor(
            'ON IPVC',
            'https://on.ipvc.pt/oncore/internal/images/favicon/favicon-32x32.png',
        )
