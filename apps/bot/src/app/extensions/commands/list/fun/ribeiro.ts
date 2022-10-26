import { SlashCommand } from '../../base/SlashCommand'

export const ribasCommand: SlashCommand = {
    name: 'ribas',
    description:
        'Envia os 3 emojis do Ribeiro em sequência de evolução, CSI style.',

    async run(it) {
        const emojis = [
            'https://imgur.com/q6jFAic',
            'https://imgur.com/OGDmDMr',
            'https://imgur.com/AU3VHzp',
        ]

        await it.reply(emojis.pop())
        for (const emoji of emojis) {
            await it.followUp(emoji)
        }
    },
}
