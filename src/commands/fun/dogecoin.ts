import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import fetch from 'node-fetch'

export const dogecoin: Command = {
    name: 'dogecoin',
    description: 'Preço atual da Dogecoin',

    async run() {
        const dogecoinEmbed = eiEmbed().setTitle('📈 Preço atual da Dogecoin')
        let req = await fetch(
            'https://rest.coinapi.io/v1/exchangerate/DOGE/EUR',
            {
                headers: {
                    'X-CoinAPI-Key': <string>process.env.COINAPI_KEY,
                },
            },
        )
        let data = await req.json()
        dogecoinEmbed.addFields({
            name: 'EUR',
            value: data.rate.toFixed(4),
            inline: true,
        })
        dogecoinEmbed.addFields({
            name: 'USD',
            value: data.src_side_base[1].rate.toFixed(4),
            inline: true,
        })
        dogecoinEmbed.setImage('https://i.imgur.com/fxCT4mY.gif')
        dogecoinEmbed.setFooter({
            text: 'To the moon! 🚀'
        })
        return dogecoinEmbed
    },
}
