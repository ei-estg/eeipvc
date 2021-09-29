import { Message } from 'discord.js'
import { Command } from '../Command'

export const pisosCommand: Command = {
	name: 'pisos',
	description: 'Envia a planta com as salas de cada piso da ESTG.',

	async run(message: Message) {
		await message.channel.send("Pisos ***1-2-3***. Não te percas novamente :D (Roda o telemovel)")
		await message.channel.send("https://i.imgur.com/8ZkWMat.png")
		await message.channel.send("https://i.imgur.com/ohD8429.png")
		await message.channel.send("https://i.imgur.com/zrrdvcP.png")
		return undefined
	}
}
