import { SlashCommand } from "../../base/SlashCommand";
import { eiEmbed } from '../../../../defaults/embed'
import { fetchGasPrice } from '../../../../requests/gas'
import { SlashCommandBuilder } from "@discordjs/builders";

export const getGasPriceCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
      .setName('combustivel')
      .setDescription('Preço dos combustíveis na Zona de Viana do Castelo')
      .addStringOption(option =>
      option.setName('tipo').setDescription('Tipo de combustivel').setRequired(true)),

    async run(it) {
        const type = it.options.get('tipo').value

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
