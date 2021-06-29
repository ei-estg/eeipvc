import { Message } from 'discord.js'
import { Command } from '../Command'

export const rodaEsse: Command = {
	name: 'rodaesse',
	description: 'Envia um charuto virtual para os que precisam descomprimir, ou para depois das aualas do Ribeiro.',

	async run(message: Message) {
		await message.channel.send( ['../../data/joint.mp4'])
		
		return undefined
	}
}