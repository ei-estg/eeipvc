import { SlashCommand } from '../../base/SlashCommand'
import { getHoroscope } from '../../../../requests/horoscope'
import { eiEmbed } from '../../../../defaults/embed'
import { SlashCommandBuilder } from '@discordjs/builders'

class CommandBuild {}

export const horoscopo: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName(_.t('horoscope.name'))
        .setDescription(_.t('horoscope.description'))
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('animal')
                .setDescription('escolhe o teu animal'),
        ),

    data: {
      name: 

      builder() {

      }
    },

    async run(it) {
        const sign = it.options.get('animal').value
        const horoscope = await getHoroscope(sign)

        if (!horoscope) {
            return 'Não foi possível encontrar o signo'
        }
        const embed = eiEmbed()
        embed.setTitle(`Horóscopo de ${horoscope.zodiac}`)
        embed.addFields({
            name: 'Previsão',
            value: horoscope.text,
        })
        embed.setAuthor({
            name: 'Maya',
            iconURL: horoscope.image,
        })
        return embed
    },
}
