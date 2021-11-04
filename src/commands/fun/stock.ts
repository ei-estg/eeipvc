import { Command } from '../Command'
import { getStock } from '../../requests/stock'
import { Message } from 'discord.js'
import { stockEmbed } from '../../defaults/embed'

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
            // Formatar Numero com virgulas
            var marketCap = stock.marketCap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            const embed = stockEmbed().setTitle(`📈 ${stock.longName}`)
            
            embed.addFields({
                name: `Último Preço - ${stock.currency}`,
                value: stock.regularMarketPrice,
                inline: true,
            })
            embed.addFields({
                name: 'Market Cap',
                value: marketCap,
                inline: true,
            })
            embed.setFooter('To the moon! 🚀')

            return embed
        } catch (err) {
            console.error(err)
        }
    },
}

const formatNumber = (num: number): string => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}