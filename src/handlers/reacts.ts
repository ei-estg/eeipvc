import { MessageReaction, PartialUser, Snowflake, User } from 'discord.js'

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

export class ReactHandler {
    public reacts: Array<React> = []

    giveRole(react: FileReacts) {
        Object.entries(react).forEach(([channelId, channel]) => {
            Object.entries(channel).forEach(([messageId, options]) => {
                if (!(options instanceof Array)) {
                    options = [options]
                }
                this.reacts.push(...options.map(option => ({
                    channelId: channelId,
                    messageId: messageId,
                    emoji: option.emoji,
                    emojiId: option.emojiId,
                    roleId: option.roleId,
                    group: option.group
                })))
            })
        })
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
                        guildMember: await reaction.message.guild?.members.fetch(
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

    async handleAdd(reaction: MessageReaction, user: User | PartialUser) {
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

    async handleRemove(reaction: MessageReaction, user: User | PartialUser) {
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
