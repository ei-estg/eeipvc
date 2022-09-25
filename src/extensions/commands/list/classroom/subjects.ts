import { Message } from 'discord.js'
import { eiEmbed } from '../../../../defaults/embed'
import { SlashCommand } from '../../base/SlashCommand'

import IPVCUCList from '../../../../../data/ipvc-uc-list.json'
import { SlashCommandBuilder } from "@discordjs/builders";

export const subjectsCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
      .setName('disciplinas')
      .setDescription('Disciplinas a lecionar durante o decorrer do curso')
      .addIntegerOption(option =>
        option.setName('ano')
          .setDescription('Ano letivo')
          .setRequired(true)
          .setMaxValue(3)
          .setMinValue(1)
        ),


    async run(it) {
        const year = it.options.get('year').value

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
