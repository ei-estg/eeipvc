import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'

export const onlyfansCommand: Command = {
    name: 'onlyfans',
    description: 'Onlyfans',

    args: {
        day: {
            text: 'dia',
            optional: true,
            check: () => true,
        },
    },

    async run(_, { day }) {
        return eiEmbed()
            .setTitle(`Onlyfans`)
            .setDescription(
                `Subscreve o meu [onlyfans](https://onlyfans.com/bot_ei '')`,
            )
            .setImage('https://media1.tenor.com/images/e855b2e04d85071ffec096ad48d56dc1/tenor.gif')
            .setFooter('Donate me, quero comprar mais dynos', '');
    },
}
