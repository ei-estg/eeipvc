import { Message } from 'discord.js'
import { eiEmbed } from '../../defaults/embed'
import { Command } from '../Command'

import IPVCUCList from '../../../data/ipvc-uc-list.json'

export const subjectsCommand: Command = {
    name: 'disciplinas',
    description: 'Disciplinas',

    args: {
        year: {
            text: 'ano',
            example: '1',
            check: () => true,
        },
    },

    async run(message: Message, { year }) {
        const semestersEmbed = eiEmbed().setTitle('🔍 Disciplinas')

        let yearObj = IPVCUCList.years.find((y) => y.id == year)
        if (!yearObj) {
            return 'Ano inexistente.'
        }
        semestersEmbed.addFields({
            name: `${yearObj.id}º ano`,
            value: 'Engenharia informática',
        })

        yearObj.halfs.forEach((half) => {
            semestersEmbed.addFields({
                name: '⠀',
                value: `**${half.id}º semestre**`,
            })

            half.uc.forEach((u) => {
                semestersEmbed.addFields({
                    name: `${u.longName} (${u.name})`,
                    value: `${u.workHours
                        .map((h) => `${h.name}: ${h.hours}`)
                        .join(' | ')} | ETC: ${u.etc}`,
                    inline: true,
                })
            })
        })

        return semestersEmbed
    },
}
