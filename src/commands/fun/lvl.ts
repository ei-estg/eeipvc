import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import userss from '../../../data/users.json'
import { Message } from 'discord.js'
const fs = require('fs')
const path = require('path')
export const lvl: Command = {
    name: 'leaderboard',
    description:
        'Leaderboard! Confere o nivel do pessoal, será que consegues chegar ao topo?',

    async run() {
        const embed = eiEmbed()
        embed.setTitle('Leaderboard')
        const users = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../../data', 'data.json'),
                'utf8',
            ),
        )
        let string = '```ml\n'
        Object.entries(users).forEach((user: any) => {
            user.forEach((element) => {
                if (element.name) {
                    string =
                        string +
                        `${element.name} - ${element.level} - ${element.experience} \n`
                }
            })
        })
        string = string + '```'
        embed.addFields({
            name: 'Nome    Nivel \tXP',
            value: string,
        })

        // dogecoinEmbed.setImage('https://i.imgur.com/fxCT4mY.gif')
        embed.setFooter('Força nisso! 🧨')
        return embed
    },
}
