import { CommandMessage, SlashCommand } from '../../base/SlashCommand'

export const pingCommand: SlashCommand = {
    name: 'ping',
    description: 'Comando de teste',

    async run(it) {
        it.reply(`Pong: ${it.client.ws.ping}ms 🏓`)
    },
}
