import { Message } from 'discord.js'
import { Command } from '../Command'

export const ribasCommand: Command = {
	name: 'ribas',
	description: 'Envia os 3 emojis do Ribeiro em sequência de evolução, CSI style.',

	async run(message: Message) {
		await message.channel.send("<:ribeiro1:855147832998887426>")
		await message.channel.send("<:ribeiro2:855147873426210816>")
		await message.channel.send("<:ribeiro3:855147982110457877>")
		return undefined
	}
}