import { Command } from '../Command'
import { getHoroscope } from '../../requests/horoscope'
import { eiEmbed } from '../../defaults/embed'

export const horoscopo: Command = {
    name: 'horoscopo',
    description: 'Horóscopo',
    args: {
        sign: {
            text: 'Signo',
            check: () => true,
        },
    },

    async run(message, args) {
        const horoscope = await getHoroscope(args.sign)

        if (!horoscope) {
            return 'Não foi possível encontrar o signo'
        }
        const embed = eiEmbed()
        embed.setTitle(`Horóscopo de ${horoscope.zodiac}`)
        embed.addFields({
            name: 'Previsão',
            value: horoscope.text,
        })
        embed.setAuthor('Maya', horoscope.image)
        return embed
    },
}
