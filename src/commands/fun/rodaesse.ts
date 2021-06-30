import { Message,MessageAttachment } from 'discord.js'

import { Command } from '../Command'
const fs = require('fs');
export const rodaEsse: Command = {
	name: 'rodaesse',
	description: 'Envia um charuto virtual para os que precisam descomprimir, ou para depois das aulas do Ribeiro.',

	async run(message: Message) {

		const urlPool=["https://media0.giphy.com/media/UfjQ4GvNMHlf1lBhOW/giphy.gif",
		'https://64.media.tumblr.com/tumblr_ly5tbgg9yj1qert2ho1_500.gif',
		'https://thumbs.gfycat.com/SomeTanAfricanpiedkingfisher-small.gif',
	'https://66.media.tumblr.com/521a199d71761032d3d6526b173063a7/tumblr_ooef1eyDxa1u521p1o1_500.gif']
		const attachment = new MessageAttachment(urlPool[Math.floor(Math.random() * urlPool.length)]);
		await message.channel.send(attachment)
		
		return undefined
	}
}