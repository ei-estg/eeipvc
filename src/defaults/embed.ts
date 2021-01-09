import { MessageEmbed } from 'discord.js'

export const sasEmbed = () =>
    new MessageEmbed()
        .setColor(16777215)
        .setAuthor(
            'SAS IPVC',
            'https://cdn.discordapp.com/avatars/771442069432434758/3647fc1e2487d8613ee822918dd362b5.png?size=256',
        )

export const eiEmbed = () =>
    new MessageEmbed()
        .setColor(15903794)
        .setAuthor(
            'EI',
            'https://cdn.discordapp.com/avatars/771442069432434758/6a9fda17eb8851bdfe7719ad3b4d367b.png?size=256',
        )
