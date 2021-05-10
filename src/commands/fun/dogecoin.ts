import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'

export const dogecoin: Command = {
  name: 'dogecoin',
  description: 'Preço atual da Dogecoin',

  async run() {
    const dogecoinEmbed = eiEmbed().setTitle('📈 Preço atual da Dogecoin')

    dogecoinEmbed.addFields({
      name: "Dogecoin 🐕",
      value: "To the moon! 🚀",
    })

    return dogecoinEmbed
  }
}