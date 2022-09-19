import { Command, CommandMessage, SlashCommand } from "../Command";

export const pingCommand: SlashCommand = {
    name: 'ping',
    description: 'Comando de teste',

    async run(it) {
        it.reply(`Pong: ${it.client.ws.ping}ms 🏓`)
    },
}
