import { Command } from '../Command'
import { getStock } from '../../requests/stock'
import { Message } from 'discord.js'
import { eiEmbed } from '../../defaults/embed'

export const stockCommand: Command = {
    name: 'stock',
    description: 'Preço atual de uma ação',

    args: {
        symbol: {
            text: 'symbol',
            check: () => true,
            example: 'AAPL',
        },
    },

    async run(message: Message, { symbol }): Promise<any> {
        try {
            let stock = await getStock(symbol)
            if (!stock) {
                return message.channel.send(
                    'Este stock não existe!. Ex: !stock AAPL',
                )
            }
            const stockEmbed = eiEmbed().setTitle("📈 "+stock.longName));
            stockEmbed.addFields({
                name: `Último Preço - ${stock.currency}`,
                value: stock.regularMarketPrice,
                inline: true
            })
            stockEmbed.addFields({
                name: 'Market Cap',
                value: stock.marketCap,
                inline: true
            })
            stockEmbed.setFooter('To the moon! 🚀')

            return stockEmbed;
        } catch (err) {
            console.error(err)
        }
    },
}
