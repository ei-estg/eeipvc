import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'

export const onlyfansCommand: SlashCommand = {
    name: 'onlyfans',
    description: 'Onlyfans',

    async run() {
        return eiEmbed()
            .setTitle(`Onlyfans`)
            .setDescription(
                `Subscreve o meu [onlyfans](https://onlyfans.com/bot_ei '')`,
            )
            .setImage(
                'https://media1.tenor.com/images/e855b2e04d85071ffec096ad48d56dc1/tenor.gif',
            )
            .setFooter({
                text: 'Donate me, quero comprar mais dynos',
            })
    },
}
