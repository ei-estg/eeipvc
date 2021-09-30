import { Message } from 'discord.js'
import { Command } from '../Command'
const path = require('path')

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
//"https://i.imgur.com/8ZkWMat.png"
    async run(message: Message, { floor }) {
        if (floor > 0 && floor <= 3) {
            await message.channel.send(
                `Piso ***${floor}***. Não te percas novamente :D (Roda o telemovel)`,
            )
            if (floor == 1) {
                await message.channel.send({
                    files: [
                        {
                            attachment: path.resolve('assets/floor_1_blueprint.png'),
                            name: 'floor1.jpg',
                        },
                    ],
                })
            } else if (floor == 2) {
                await message.channel.send('https://i.imgur.com/ohD8429.png')
            } else {
                await message.channel.send('https://i.imgur.com/zrrdvcP.png')
            }
        } else {
            await message.channel.send('Piso inexistente. Ex: !piso 1-2-3')
        }
        return undefined
    },
}
