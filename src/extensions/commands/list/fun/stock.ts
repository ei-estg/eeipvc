import { SlashCommand } from '../../base/SlashCommand'
import { getStock, Stock } from '../../../../requests/stock'
import { Message } from 'discord.js'
import { stockEmbed } from '../../../../defaults/embed'
import { SlashCommandBuilder } from '@discordjs/builders'

export const stockCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('stock')
        .setDescription('Preço atual de uma ação')
        .addStringOption((option) =>
            option
                .setName('symbol')
                .setDescription('Simbolo do stock (ex: AAPL)')
                .setRequired(true),
        ),

    async run(it) {
        const symbol = it.options.get('symbol')
        try {
            let stock = await getStock(symbol.value)

            if (!stock) {
                return 'Este stock não existe!. Ex: !stock AAPL'
            }
            // Formatar Numero com virgulas
            let marketCap
            
            if (stock.marketCap) {
                marketCap = stock.marketCap
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
            const embed = stockEmbed().setTitle(`📈 ${stock.longName}`)

            embed.addFields(
                {
                    name: `Último Preço - ${stock.currency}`,
                    value: stock.regularMarketPrice.toString(),
                    inline: true,
                },
                {
                    name: 'Market Cap',
                    value: marketCap ? marketCap : 'N/A',
                    inline: true,
                },
                {
                    name: 'Trailing Price-To-Earnings',
                    value: stock.trailingPE?.toString() || 'N/A',
                    inline: true,
                },
                {
                    name: 'Earnings Per Share (TTM)',
                    value: stock.epsTrailingTwelveMonths?.toString() || 'N/A',
                    inline: true,
                },
                {
                    name: 'Price-To-Book (P/B Ratio)',
                    value: stock.priceToBook?.toString() || 'N/A',
                    inline: true,
                },
                {
                    name: 'Avarage Analyst Rating',
                    value: stock.averageAnalystRating?.toString() || 'N/A',
                    inline: true,
                },
            )

            if (stock.trailingAnnualDividendRate != null) {
                embed.addFields({
                    name: 'Trailing Annual Dividend Yield',
                    value: `${(stock.trailingAnnualDividendYield * 100).toFixed(
                        2,
                    )}%`,
                    inline: true,
                })
            }

            embed.setFooter({
                text: 'To the moon! 🚀',
            })

            return embed
        } catch (err) {
            console.error(err)
        }
    },
}
