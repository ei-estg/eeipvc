import { BaseExtension } from '../base/BaseExtension'
import { ClientManager } from '../../client'
import { ActivityType, GuildMember, PartialGuildMember } from "discord.js";

export class GuildExtension<T> extends BaseExtension<T> {
    private _membersCount: number = 0

    constructor(manager: ClientManager) {
        super(manager)

        const { client } = manager
        client.on('guildMemberAdd', this._memberJoined.bind(this))
        client.on('guildMemberRemove', this._memberLeft.bind(this))
    }

    private incrementMembersCount() {
        this._membersCount++
    }

    private decrementMembersCount() {
        this._membersCount--
    }

    protected async _setup() {
        const guildId = this._manager.config.guild.id
        console.log(guildId)
        const guild = await this._manager.client.guilds.fetch(guildId)
        const members = await guild.members.fetch()
        this._membersCount = members.size
        await this._updateStatus()
    }

    private async _updateStatus() {
        await this._manager.client.user?.setActivity(
            `all ${this._membersCount} members`,
            {
                type: ActivityType.Listening,
            },
        )
    }

    private async _memberJoined(member: GuildMember) {
        this.incrementMembersCount()
        await this._updateStatus()
        const channel = await member.guild.channels.fetch('766278332500803610')
        let string = ''
        if (this._membersCount % 100 === 0) {
            string = `És o membro nº**${this._membersCount}** a ingressar no servidor, parabéns! <:poggies:917745075948228618>🎉🎉`
        }
        if (channel && channel.isTextBased()) {
            channel.send(
                `Boas ${member.user}! Sê bem-vindo ao discord de Engenharia Informática do IPVC 👋\n${string}`,
            )
        }
    }

    private async _memberLeft(member: GuildMember | PartialGuildMember) {
        this.decrementMembersCount()
        await this._updateStatus()

        const channel = await member.guild.channels.fetch('766278332500803610')
        if (channel && channel.isTextBased()) {
            channel.send(
                `${member.user}, '${member.displayName}' abandonou a nossa jangada ⛵️. Seguimos com ${this._membersCount} marujos <:FeelsBadMan:766306313663283241>`,
            )
        }
    }
}
