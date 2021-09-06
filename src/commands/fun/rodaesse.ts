import { Message,MessageAttachment } from 'discord.js'

import { Command } from '../Command'

export const rodaEsse: Command = {
	name: 'rodaesse',
	description: 'Envia um charuto virtual para os que precisam descomprimir, ou para depois das aulas do Ribeiro.',

	async run(message: Message) {

		const urlPool=["https://media0.giphy.com/media/UfjQ4GvNMHlf1lBhOW/giphy.gif",
		'https://64.media.tumblr.com/tumblr_ly5tbgg9yj1qert2ho1_500.gif',
		'https://thumbs.gfycat.com/SomeTanAfricanpiedkingfisher-small.gif',
		'https://66.media.tumblr.com/521a199d71761032d3d6526b173063a7/tumblr_ooef1eyDxa1u521p1o1_500.gif',
		'https://64.media.tumblr.com/6dd173b742bb0381d0bbbfdcc716da2c/0160cdbc56d519f9-b8/s400x600/a93639e5d3e4497787f874b3bf6d35788dd5b41f.gif',
		'https://64.media.tumblr.com/5bcf00a47daf396dc4c2831bc570e361/c7d90793f78490ac-4c/s400x600/0542026f14ae3d0b76ed70f1dd8e485af2b5aa60.gif']
		const attachment = new MessageAttachment(urlPool[Math.floor(Math.random() * urlPool.length)]);
		await message.channel.send(attachment)
		
		return undefined
	}
}
