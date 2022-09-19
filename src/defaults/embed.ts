import { EmbedBuilder } from 'discord.js'

export const sasEmbed = () =>
    new EmbedBuilder()
        .setColor(16777215)
        .setAuthor({
                name: 'SAS IPVC',
                iconURL: 'https://cdn.discordapp.com/attachments/795686232700878858/840518374801932288/untitled.png?size=256\''
        })


export const eiEmbed = () =>
    new EmbedBuilder()
        .setColor(15903794)
        .setAuthor({
                name: 'EI',
                iconURL: 'https://cdn.discordapp.com/avatars/771442069432434758/6a9fda17eb8851bdfe7719ad3b4d367b.png?size=256',
        })

export const stockEmbed = () =>
    new EmbedBuilder()
        .setColor(15903794)
        .setAuthor({
                name: 'STONKS',
                iconURL: 'https://styles.redditmedia.com/t5_3nimn/styles/communityIcon_cho9chd8ug431.jpg',
        })
