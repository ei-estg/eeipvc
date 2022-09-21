import { SlashCommand } from '../../base/SlashCommand'
import { getStock, Stock } from '../../../../requests/stock'
import { Message } from 'discord.js'
import { stockEmbed } from '../../../../defaults/embed'
import { SlashCommandBuilder } from "@discordjs/builders";

export const stockCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
      .setName('stock')
      .setDescription('Preço atual de uma ação')
      .addStringOption(option =>
        option.setName('symbol')
          .setDescription('Simbolo do stock')
          .setRequired(true)
      ),


    async run(it) {
        const symbol = it.options.get('symbol')
        try {
            let stock = await getStock(symbol)

            if (!stock) {
                return 'Este stock não existe!. Ex: !stock AAPL'
            }
            // Formatar Numero com virgulas
            var marketCap = stock.marketCap
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
                    name: 'Trailing Price-To-Earnings',
                    value: stock.trailingPE,
                    inline: true,
                },
                {
                    name: 'Earnings Per Share (TTM)',
                    value: stock.epsTrailingTwelveMonths,
                    inline: true,
                },
                {
                    name: 'Price-To-Book (P/B Ratio)',
                    value: stock.priceToBook,
                    inline: true,
                },
                {
                    name: 'Avarage Analyst Rating',
                    value: stock.averageAnalystRating,
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
                text: 'To the moon! 🚀'
            })

            return embed
        } catch (err) {
            console.error(err)
        }
    },
}
