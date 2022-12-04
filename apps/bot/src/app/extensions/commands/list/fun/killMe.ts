import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import fetch from 'node-fetch'

export const php: SlashCommand = {
    name: 'php',
    description: 'Mata-te só',
    alias: ['joomla', 'wordpress', 'drupal'],

    async run() {
        const embed = eiEmbed()
        embed.setTitle('Are you dumb?')
        embed.addFields({
            name: 'PHP DEVELOPER?',
            value: `Get a life <:MonkaGun:779681578816765952>`,
        })
        embed.setColor('#FF0000')
        embed.setThumbnail(
            'https://whydoesitsuck.com/why-does-php-suck/thumbnail.png',
        )
        return embed
    },
}
