import { Message } from 'discord.js'
import { Command } from '../Command'

const CONFIG = {
	name: 'ribas',
	description: 'Envia os 3 emojis do Ribeiro em sequência de evolução, CSI style.',
	emojis: [
		'https://imgur.com/AU3VHzp',
		'https://imgur.com/q6jFAic',
		'https://imgur.com/OGDmDMr'
	]
};

export const ribasCommand: Command = {
	name: CONFIG.name,
	description: CONFIG.description,
	async run(message: Message) {
		CONFIG.emojis.forEach(async (emoji) => await message.channel.send(emoji));
		return Promise.resolve(undefined);
	}
}
