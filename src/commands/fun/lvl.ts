import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import users from '../../../data/users.json'
import { Message } from 'discord.js'
export const lvl: Command = {
    name: 'leaderboard',
    description: 'Preço atual da Dogecoin',

    async run(message: Message) {
        const dogecoinEmbed = eiEmbed().setTitle('💪 Vê o teu nivel!')

        dogecoinEmbed.addFields({
            name: 'Nivel atual',
            value: users[message.author.id].level,
            inline: true,
        })
        dogecoinEmbed.addFields({
            name: 'XP',
            value: users[message.author.id].experience,
            inline: true,
        })
        // dogecoinEmbed.setImage('https://i.imgur.com/fxCT4mY.gif')
        dogecoinEmbed.setFooter('Força nisso! 🧨')
        return dogecoinEmbed
    },
}
