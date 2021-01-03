import { MessageReaction, PartialUser, Snowflake, User } from 'discord.js'

interface React {
    messageId: Snowflake
    emoji: string
    roleId: Snowflake
}

export class ReactHandler {
    private reacts: Array<React> = []

    giveRole(...react: React[]) {
        this.reacts.push(...react)
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
