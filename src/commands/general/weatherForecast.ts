import { Message, MessageAttachment } from 'discord.js'
import { Command } from '../Command'


export const weatherForecastCommand: Command = {
    name: 'meteo',
    description: 'Meterologia',

    args: {
        locality: {
            text: 'locality',
            check: () => true,
            example: 'london',
        },
    },       

    async run(message: Message, { locality }): Promise<any> {
        try {
            await message.channel.send(encodeURI(`https://zemo-ws.herokuapp.com/${locality.replaceAll('-',' ')}`))
        } catch (err) {
            console.error(err)
        }
    },
}
