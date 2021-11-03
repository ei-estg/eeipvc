import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import userss from '../../../data/bd.json'
import { Message } from 'discord.js'
const fs = require('fs')
const path = require('path')
export const lvl: Command = {
    name: 'lead',
    description:
        'Leaderboard! Confere o nivel do pessoal, será que consegues chegar ao topo?',

    async run() {
        const embed = eiEmbed()
        embed.setTitle('Leaderboard')
        const users = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../../data', 'bd.json'),
                'utf8',
            ),
        )
        let string = '```ml\n'
        Object.entries(users).forEach((user: any) => {
            const newUser = user.sort((a: any, b: any) => {
                return a.experience - b.experience
            })
            console.log(newUser)
            for (let i = 0; i < 10; i++) {
                if (newUser[i].name) {
                    string =
                        string +
                        `${newUser[i].name} - ${newUser[i].level} - ${newUser[i].experience} \n`
                }
            }
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
