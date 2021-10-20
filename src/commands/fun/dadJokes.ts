import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import fetch from 'node-fetch'
export const dadJoke: Command = {
    name: 'dadjoke',
    description: 'Envia uma dad joke',

    async run() {
        const embed = eiEmbed()
        console.log('hey')
        const data = await fetch(
            'https://jokes.guyliangilsing.me/retrieveJokes.php?type=dadjoke',
        )
        const joke = await data.json()
        console.log(joke.joke)
        embed.setTitle('Dad Jokes')
        embed.addFields({
            name: 'Joke',
            value: `${joke.joke}`,
        })
        return embed
    },
}
