import { Message } from 'discord.js'
import { Command } from '../Command'


export const weatherForecastCommand: Command = {
    name: 'meteorologia',
    description: 'Meterologia - Viana do Castelo',
    async run(message: Message) {
        try {
            await message.channel.send('https://zemo-ws.herokuapp.com/viana%20do%20castelo')
        } catch (err) {
            console.error(err)
        }
    },
}
