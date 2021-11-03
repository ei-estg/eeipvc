import { Command } from '../Command'
import { getStock } from '../../requests/stock'

export const stock: Command = {
    name: 'stock',
    description: 'Preço atual de uma ação',

    args: {
        symbol: {
            text: 'symbol',
            check: () => true,
            optional: true,
            example: 'AAPL',
        },
    },


    async run(message, { symbol }) {
        try {
            let stock = await getStock(symbol)
            console.log(stock)

            if (!stock) {
                return 'Este stock não existe!'
            }

            return stock
        } catch (err) {
            console.error(err)
        }
    },
}