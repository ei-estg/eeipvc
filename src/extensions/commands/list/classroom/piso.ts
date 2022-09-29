import { SlashCommand } from "../../base/SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import path from "path";

export const pisoCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
      .setName('piso')
      .setDescription('Envia a planta com as salas de cada piso da ESTG.')
      .addStringOption(option =>
        option
          .setName('piso')
          .setDescription('Nº do piso')
          .setRequired(true)
          .setChoices({
            name: 'Piso 1',
            value: '1'
          }, {
            name: 'Piso 2',
            value: '2'
          }, {
            name: 'Piso 3',
            value: '3'
          }),
      ),

    async run(it) {
      const floorNumber = it.options.get('piso').value

      await it.reply(
          `Piso ***${floorNumber}***. Não te percas novamente :D (Roda o telemóvel)`,
      )

      await it.followUp({
        files: [
          {
            attachment: path.resolve(
              `assets/floor_${floorNumber}_blueprint.png`,
            ),
            name: `floor${floorNumber}.png`,
          },
        ],
      })
    }
}
//Old imgs floor 1: https://i.imgur.com/8ZkWMat.png floor 2: https://i.imgur.com/ohD8429.png floor 3: https://i.imgur.com/zrrdvcP.png
