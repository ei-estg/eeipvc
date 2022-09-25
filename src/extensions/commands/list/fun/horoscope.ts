import { SlashCommand } from '../../base/SlashCommand'
import { getHoroscope } from '../../../../requests/horoscope'
import { eiEmbed } from '../../../../defaults/embed'
import { SlashCommandBuilder } from '@discordjs/builders'
import horoscope from '../../../../../data/horoscope.json'

class CommandBuild {}

export const horoscopeCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('horoscopo')
        .setDescription('Verifica o teu horóscopo')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('signo')
                .setDescription('Exemplo: aquario/carneiro/capricornio')
                .setChoices(...horoscope.signos),
        ),

    async run(it) {
        const sign = it.options.get('signo').value
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
