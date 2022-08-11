import {
    Client,
    MessageReaction,
    PartialUser,
    Snowflake,
    TextChannel,
    User,
} from 'discord.js'
import { BotClient } from '../client'

interface FileReacts {
    [channelId: string]: FileReactsMessages
}

interface FileReactsMessages {
    [messageId: string]: FileReactsMessageReact | FileReactsMessageReact[]
}

interface FileReactsMessageReact {
    emoji: string
    emojiId?: Snowflake
    roleId: Snowflake
    group?: string
}

interface React {
    channelId: Snowflake
    messageId: Snowflake
    emoji: string
    emojiId?: string
    roleId: Snowflake
    group?: string
}

export class ReactsHandler {
    public reacts: Array<React> = []

    giveRoles(react: FileReacts) {
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

    async onReady(bot: BotClient) {
        let tasks: Array<Promise<void>> = []
        for (const react of bot.handlers.reacts.reacts) {
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
        reaction: MessageReaction,
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
                        roleId: r.roleId,
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    async onReactAdd(reaction: MessageReaction, user: User | PartialUser) {
        if (user.bot) return
        let check
        try {
            if ((check = await this.handleCheck(reaction, user))) {
                let { guildMember, roleId } = check
                await guildMember?.roles.add(roleId)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async onReactionRemove(
        reaction: MessageReaction,
        user: User | PartialUser,
    ) {
        let check
        try {
            if ((check = await this.handleCheck(reaction, user))) {
                let { guildMember, roleId } = check
                await guildMember?.roles.remove(roleId)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
