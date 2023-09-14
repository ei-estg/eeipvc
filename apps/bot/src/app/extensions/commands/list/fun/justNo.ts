import { SlashCommand } from '../../base/SlashCommand'

export const justNo: SlashCommand = {
    name: 'turmas',
    description: 'A pergunta que não quer calar',

    async run() {
        return 'https://media.giphy.com/media/daPCSjwus6UR2JxRX1/giphy.gif'
    },
}
