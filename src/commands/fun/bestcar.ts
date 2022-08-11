import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import fetch from 'node-fetch'

export const etron: Command = {
    name: 'etron',
    description: 'O carro da Inês',
    alias: ['audi'],

    async run() {
        const embed = eiEmbed()
        embed.setTitle('Eu e a minha beibi bu')
        embed.setImage('https://i.imgur.com/7g09ZIw.jpeg')
        embed.setColor('#FF0000')
        return embed
    },
}
