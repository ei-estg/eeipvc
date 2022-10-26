import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import fetch from 'node-fetch'

export const dadJoke: SlashCommand = {
    name: 'dadjoke',
    description: 'Envia uma dad joke',

    async run() {
        const embed = eiEmbed()
        const data = await fetch(
            'https://jokes.guyliangilsing.me/retrieveJokes.php?type=dadjoke',
        )
        const joke = await data.json()
        embed.setTitle('Dad Jokes')
        embed.addFields({
            name: 'Joke',
            value: `${joke.joke}`,
        })
        return embed
    },
}
