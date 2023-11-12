import {
    MessageReaction,
    PartialMessageReaction,
    PartialUser,
    TextChannel,
    User,
} from 'discord.js'
import { ClientManager } from '../../client'
import { BaseExtension } from '../base/BaseExtension'
import ReactionsList from './reactions-list.json'
import { FileReacts, React } from './types/reacts'

export class ReactsHandler<T> extends BaseExtension<T> {
    public reacts: Array<React> = []

    constructor(manager: ClientManager) {
        super(manager)

        const { client } = manager

        client.on('messageReactionAdd', this.reactionAdded.bind(this))
        client.on('messageReactionRemove', this.reactionRemoved.bind(this))
    }

    private _giveRoles(react: FileReacts) {
        Object.entries(react).forEach(([channelId, channel]) => {
            Object.entries(channel).forEach(([messageId, options]) => {
                if (!(options instanceof Array)) {
                    options = [options]
                }
                this.reacts.push(
                    ...options.map((option) => ({
                        channelId: channelId,
                        messageId: messageId,
                        emoji: option.emoji,
                        emojiId: option.emojiId,
                        roleId: option.roleId,
                        group: option.group,
                    })),
                )
            })
        })
    }

    protected async _setup() {
        const { client: bot } = this._manager

        const tasks: Array<Promise<void>> = []
        for (const react of this.reacts) {
            const task = async () => {
                const channel = (await bot.channels.fetch(
                    react.channelId,
                )) as TextChannel
                const message = await channel.messages.fetch(react.messageId)

                await message.react(react.emojiId || react.emoji)
            }
            tasks.push(task())
        }
        await Promise.all(tasks)
    }

    private async handleCheck(
        reaction: MessageReaction | PartialMessageReaction,
        user: User | PartialUser,
    ) {
        if (reaction.partial) {
            try {
                await reaction.fetch()
            } catch (err) {
                console.error(err)
            }
        }
        for (const r of this.reacts) {
            try {
                if (
                    r.messageId == reaction.message.id &&
                    r.emoji == reaction.emoji.name
                ) {
                    return {
                        guildMember:
                            await reaction.message.guild?.members.fetch(
                                user.id,
                            ),
                        roleId:
                            reaction.message.guild?.roles.cache.find(
                                (role) => role.id == r.roleId,
                            )?.id ||
                            (await reaction.message.guild?.roles
                                .fetch(r.roleId)
                                .then((role) => role?.id)),
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    async reactionAdded(
        reaction: MessageReaction | PartialMessageReaction,
        user: User | PartialUser,
    ) {
        if (user.bot) return
        let check
        try {
            if ((check = await this.handleCheck(reaction, user))) {
                const { guildMember, roleId } = check
                await guildMember?.roles.add(roleId)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async reactionRemoved(
        reaction: MessageReaction | PartialMessageReaction,
        user: User | PartialUser,
    ) {
        let check
        try {
            if ((check = await this.handleCheck(reaction, user))) {
                const { guildMember, roleId } = check
                await guildMember?.roles.remove(roleId)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
