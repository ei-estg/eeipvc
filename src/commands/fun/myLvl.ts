import { Message } from 'discord.js'
import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import userss from '../../../data/data.json'
const fs = require('fs')
const path = require('path')

export const myLvl: Command = {
    name: 'lvl',
    description: 'Level! Confere o teu nivel',

    async run(message: Message) {
        const embed = eiEmbed()
        embed.setTitle('Nivel atual')
        const users = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../../data', 'data.json'),
                'utf8',
            ),
        )

        embed.addFields({
            name: 'Nome',
            value: users[message.author.id].name,
            inline: true,
        })

        embed.addFields({
            name: 'XP',
            inline: true,
            value: users[message.author.id].experience,
        })

        embed.addFields({
            name: 'Level',
            inline: true,
            value: users[message.author.id].level,
        })

        // dogecoinEmbed.setImage('https://i.imgur.com/fxCT4mY.gif')
        embed.setFooter('Força nisso! 🧨')
        return embed
    },
}
