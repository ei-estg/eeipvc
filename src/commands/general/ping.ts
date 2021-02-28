import { Message } from 'discord.js'
import { Command } from '../Command'

export const pingCommand: Command = {
    name: 'ping',
    description: 'Comando de teste',
    async run(message: Message) {
        return `Pong: ${message.client.ws.ping}ms 🏓`
    },
}
