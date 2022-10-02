import { eiEmbed } from '../../../../defaults/embed'
import { fetchGasPrice } from '../../../../requests/gas'
import { SlashCommand } from "../../base/SlashCommand";
import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";

export const getGasPriceCommand: SlashCommand = {
  builder: new SlashCommandBuilder()
    .setName('combustivel')
    .setDescription('Preço dos combustíveis na Zona de Viana do Castelo'),

  run: async function(it) {
    const gasPrices = await fetchGasPrice()

    let embeds: EmbedBuilder[] = []

    let numberOfFields: number[] = []
    let count = 0;
    let embedIndex = 0;

    function createEmbed() {
      let embed = eiEmbed()
        .setTitle("Preço dos combustíveis")
        .setDescription("Preço Atual: Um roubo")

      embeds.push(embed)
    }

    for (let gas of gasPrices) {
      numberOfFields.push(1 + gas.resultado.Combustiveis.length)
    }

    createEmbed()

    for (let gas of gasPrices) {
      if (count + numberOfFields[gasPrices.indexOf(gas)] > 25) {
        createEmbed()
        embedIndex++
        count = 0
      }

      embeds[embedIndex].addFields({
        name: gas.resultado.Nome,
        value: gas.resultado.Marca,
      })

      for(let comb of gas.resultado.Combustiveis){
        embeds[embedIndex].addFields({
          name: comb.TipoCombustivel,
          value: `${comb.Preco}`,
          inline: true,
        })

        count++
      }

      count++
    }


    it.reply({ embeds: embeds })
  }
}
