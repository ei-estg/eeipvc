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
        if (
            message.content.includes('ribas') ||
            message.content.includes('ribeiro')
        ) {
            await message.react('🇷')
            await message.react('🇮')
            await message.react('🇧')
            await message.react('🇪')
            await message.react('🇮')
            await message.react('🇷')
            await message.react('🇴')
        }
    }
    //TODO: Gozar com o André @sousa-andre
    // foi o andré que disse para meter este comentário aqui
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected _setup() {}
}
