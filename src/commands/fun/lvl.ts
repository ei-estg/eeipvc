import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import userss from '../../../data/data.json'
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
                path.join(__dirname, '../../../data', 'data.json'),
                'utf8',
            ),
        )
        let string = '```ml\n'
        Object.entries(users).sort(
            (a: any, b: any) => b.experience - a.experience,
        )
        let counter = 0
        Object.entries(users).forEach((user: any) => {
            counter++
            if (user[1].name && counter < 10) {
                string =
                    string +
                    `${user[1].name} - ${user[1].level} - ${user[1].experience} \n`
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
