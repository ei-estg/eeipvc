import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import fetch from 'node-fetch'
export const java: Command = {
  name: 'java',
  description: 'Porquê Java?',
  alias: ['cruz'],

  async run() {
    const embed = eiEmbed()
    embed.setTitle('Estou triste')
    embed.addFields({
      name: 'Não chegava ser feio',
      value: `Ainda tenho de levar com esta "Cruz"`,
    })
    embed.setImage("https://media.discordapp.net/attachments/766279230900011028/926830783690317864/received_243714783785739.jpg")
    embed.setColor('#FF0000')
    return embed
  },
}