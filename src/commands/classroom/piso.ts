import { Message } from 'discord.js'
import { Command } from '../Command'

export const pisoCommand: Command = {
    name: 'piso',
    description: 'Envia a planta com as salas de cada piso da ESTG.',
    args: {
        floor: {
            text: 'piso',
            example: '1',
            check: () => true,
        },
    },

    async run(message: Message, { floor }) {
        await message.channel.send(`Piso ***${floor}***. Não te percas novamente :D (Roda o telemovel)`)
        if (floor == 1) {
            await message.channel.send("https://i.imgur.com/8ZkWMat.png")
        }
        else if (floor == 2) {
        await message.channel.send("https://i.imgur.com/ohD8429.png")
        }
        else if (floor == 3) {
        await message.channel.send("https://i.imgur.com/zrrdvcP.png")
        }
        else {
            await message.channel.send("Comando inválido. Ex: !piso 2")
        }

        return undefined
    }
}
