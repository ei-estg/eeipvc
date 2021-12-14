import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import { fetchGasPrice } from '../../requests/gas'

export const getGasPriceCommand: Command = {
    name: 'combustivel',
    description: 'Preço dos combustíveis na Zona de Viana do Castelo',
    args: {
        type: {
            text: 'Tipo de combustível',
            check: () => true,
        },
    },

    async run(_, { type }) {
        const gasPrices = await fetchGasPrice(type)
        const embed = eiEmbed()
        embed.setTitle('Preço dos combustíveis')
        console.info(gasPrices)

        gasPrices.forEach((gas) => {
            embed.addFields({
                name: gas.resultado.Nome,
                value: gas.resultado.Marca,
            })
            gas.resultado.Combustiveis.forEach((comb) => {
                embed.addFields({
                    name: comb.TipoCombustivel,
                    value: `${comb.Preco}`,
                    inline: true,
                })
            })
        })
        embed.setDescription('Preço Atual: Um roubo')
        return embed
    },
}
