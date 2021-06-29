import { Message,MessageAttachment } from 'discord.js'
import { Command } from '../Command'
const fs = require('fs');
export const rodaEsse: Command = {
	name: 'rodaesse',
	description: 'Envia um charuto virtual para os que precisam descomprimir, ou para depois das aalas do Ribeiro.',

	async run(message: Message) {
		const attachment = new MessageAttachment('https://tenor.com/view/weed-the-virtual-joint-smoke-gif-12178837');
		await message.channel.send(attachment)
		
		return undefined
	}
}