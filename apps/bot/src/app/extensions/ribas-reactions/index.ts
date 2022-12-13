import { BaseExtension } from '../base/BaseExtension'
import { ClientManager } from '../../client'
import { Message } from 'discord.js'

export class RibeiroReact<T> extends BaseExtension<T> {
    constructor(manager: ClientManager) {
        super(manager)
        const { client } = manager
        client.on('messageCreate', this.ribasEmoji.bind(this))
    }

    async ribasEmoji(message: Message) {
        const possibleCombinations = ['ribeiro', 'ribas', 'nosso lider']
        if (possibleCombinations.includes(message.content.toLowerCase())) {
            const emojis = [
                '🇷',
                '🇮',
                '🇧',
                '🇦',
                '🇸',
                '🐐',
                ':ribeiro3:855147982110457877',
            ]
            emojis.forEach(async (emoji) => await message.react(emoji))
        }
    }
    //TODO: Gozar com o André @sousa-andre
    // foi o andré que disse para meter este comentário aqui
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected _setup() {}
}
