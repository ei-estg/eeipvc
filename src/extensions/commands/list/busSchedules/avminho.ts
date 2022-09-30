import { SlashCommand } from "../../base/SlashCommand";
import { eiEmbed } from '../../../../defaults/embed'
import avminhoData from '../../../../../data/avminho.json'
import { SlashCommandBuilder } from "@discordjs/builders"

interface Option {
  name: string,
  value: number
}

let options: Option[] = []

for(let i in avminhoData){
  options.push({
    name: avminhoData[i].title,
    value: parseInt(i)
  })
}

export const avminhoCommand: SlashCommand = {
  builder: new SlashCommandBuilder()
    .setName('avminho')
    .setDescription('Horários dos autocarros AVMinho')
    .addIntegerOption((option) =>
      option
        .setName('horario')
        .setDescription("Selecione um dos seguintes horários")
        .setRequired(true)
        .addChoices(
        ...options
        )
    ),

  async run() {
    try {
      const avminhoEmbed = eiEmbed()
        .setColor(15872562)
        .setURL("http://www.avminho.pt/horarios")
        .setAuthor({
          name: 'AVMinho',
          iconURL: 'http://www.avminho.pt/linker/img/autocarros/foto_avminho_05.jpg',
        })
        .setThumbnail("http://www.avminho.pt/linker/img/logo_avminho.png")
        .setTitle(avminhoData[9].title)
        .setDescription(avminhoData[9].schedules[0].title)
        .setImage(avminhoData[9].schedules[0].image)

      return avminhoEmbed
    } catch (e) {
      console.error(e)
    }
  },
}
