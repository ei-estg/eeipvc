import { Command } from '../Command'
import { getStock, Stock } from '../../requests/stock'
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

            embed.addFields(
                {
                name: `Último Preço - ${stock.currency}`,
                value: stock.regularMarketPrice,
                inline: true,
                }, 
                {
                name: 'Market Cap',
                value: marketCap,
                inline: true,
                },
                {
                name: "Trailing Price-To-Earnings",
                value: stock.trailingPE,
                inline: true,
                }, 
                {            
                name: 'Earnings Per Share (TTM)',
                value: stock.epsTrailingTwelveMonths,
                inline: true,
                }, 
                {
                name: "Price-To-Book (P/B Ratio)",
                value: stock.priceToBook,
                inline: true
                },
                {
                name: "Avarage Analyst Rating",
                value: stock.averageAnalystRating,
                inline: true,
                })

                if(stock.trailingAnnualDividendRate != null) {
                    embed.addFields(
                    {
                        name: 'Trailing Annual Dividend Yield',
                        value: `${stock.trailingAnnualDividendYield * 100}%`,
                        inline: true,
                    })
                }

            embed.setFooter('To the moon! 🚀')

            return embed
        } catch (err) {
            console.error(err)
        }
    },
}
