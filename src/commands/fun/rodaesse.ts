import { Message,MessageAttachment } from 'discord.js'
import { Command } from '../Command'
const fs = require('fs');
export const rodaEsse: Command = {
	name: 'rodaesse',
	description: 'Envia um charuto virtual para os que precisam descomprimir, ou para depois das aalas do Ribeiro.',

	async run(message: Message) {
		const attachment = new MessageAttachment('https://64.media.tumblr.com/tumblr_ly5tbgg9yj1qert2ho1_500.gif');
		await message.channel.send(attachment)
		
		return undefined
	}
}