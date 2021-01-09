import { Command } from './Command'

export const pingCommand: Command = {
    name: 'ping',
    description: 'Comando de teste',
    async run() {
        return 'Pong 🏓'
    },
}
