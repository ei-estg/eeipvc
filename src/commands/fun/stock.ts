import { Command } from '../Command'
import { getStock } from '../../requests/stock'
import { Message } from 'discord.js'

export const stockCommand: Command = {
    name: 'stock',
    description: 'Preço atual de uma ação',

    args: {
        symbol: {
            text: 'stock',
            check: () => true,
            example: 'AAPL',
        },
    },


    async run(message, { symbol }) {
        try {
            let stock = await getStock(symbol)
            console.log(stock)

            if (!stock) {
                return message.channel.send('Este stock não existe!. Ex: !stock AAPL')
            }

            return message.channel.send(stock.toString())
        } catch (err) {
            console.error(err)
        }
    },
}