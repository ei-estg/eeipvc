import { Message } from 'discord.js'
import { SlashCommand } from '../../base/SlashCommand'

export const weatherForecastCommand: SlashCommand = {
    name: 'meteorologia',
    description: 'Meterologia - Viana do Castelo',
    async run(message: Message) {
        try {
            await message.channel.send(
                'https://zemo-ws.herokuapp.com/viana%20do%20castelo',
            )
        } catch (err) {
            console.error(err)
        }
        return undefined
    },
}
