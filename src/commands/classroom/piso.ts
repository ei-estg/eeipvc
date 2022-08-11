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
    async run(message: Message, { floor }) {
        if (floor > 0 && floor <= 3) {
            await message.channel.send(
                `Piso ***${floor}***. Não te percas novamente :D (Roda o telemóvel)`,
            )
            if (floor == 1) {
                await message.channel.send({
                    files: [
                        {
                            attachment: path.resolve(
                                'assets/floor_1_blueprint.png',
                            ),
                            name: 'floor1.png',
                        },
                    ],
                })
            } else if (floor == 2) {
                await message.channel.send({
                    files: [
                        {
                            attachment: path.resolve(
                                'assets/floor_2_blueprint.png',
                            ),
                            name: 'floor2.png',
                        },
                    ],
                })
            } else {
                await message.channel.send({
                    files: [
                        {
                            attachment: path.resolve(
                                'assets/floor_3_blueprint.png',
                            ),
                            name: 'floor3.png',
                        },
                    ],
                })
            }
        } else {
            await message.channel.send('Piso inexistente. Ex: !piso 1')
        }
        return undefined
    },
}
//Old imgs floor 1: https://i.imgur.com/8ZkWMat.png floor 2: https://i.imgur.com/ohD8429.png floor 3: https://i.imgur.com/zrrdvcP.png
