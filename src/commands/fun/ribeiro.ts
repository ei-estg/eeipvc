import { Message } from 'discord.js'
import { Command } from '../Command'

export const ribasCommand: Command = {
	name: 'ribas',
	description: 'Envia os 3 emojis do Ribeiro em sequência de evolução, CSI style.',

	async run(message: Message) {
		await message.channel.send("https://imgur.com/AU3VHzp")
		await message.channel.send("https://imgur.com/q6jFAic")
		await message.channel.send("https://imgur.com/OGDmDMr")
		return undefined
	}
}
