import { BaseExtension } from "../base/BaseExtension";
import { ClientManager } from "../../client";
import { ActivityType } from "discord.js";

export class GuildExtension<T> extends BaseExtension<T> {
  private _membersCount: number = 0

  constructor(manager: ClientManager) {
    super(manager);

    const { client } = manager

    client.on("guildMemberAdd", this._memberJoined)
    client.on("guildMemberRemove", this._memberLeft)
  }

  private incrementMembersCount() {
    this._membersCount++
  }

  private decrementMembersCount() {
    this._membersCount--
  }

  protected async _setup() {
    const guildId = this._manager.config.guild.id
    const guild = await this._manager.client.guilds.fetch(guildId)
    this._membersCount = guild.memberCount
  }

  private async updateStatus () {
    await this._manager.client.user?.setActivity(`all ${this._membersCount} members`, {
      type: ActivityType.Listening
    });
  };

  private async _memberJoined(member: any) {
    this.incrementMembersCount()
    await this.updateStatus()

    const channel = member.guild.channels.cache.find(
      (channel) => channel.id == "766278332500803610"
    );
    let string = "";
    if (this._membersCount === 300) {
      string = "Parabéns és o membro nº300 a ingressar no servidor.";
    }
    channel.send(
      `${string}Boas ${
        member.user
      }. Dá uma olhadela nas salas ${member.guild.channels.cache
        .get("779437283966189618")
        .toString()} e ${member.guild.channels.cache
        .get("779491420079259659")
        .toString()} para ficares a conhecer as regras e ainda acederes a diferentes áreas do servidor.`
    );
  }

  private async _memberLeft(member: any) {
    this.decrementMembersCount()
    await this.updateStatus()

    const channel = member.guild.channels.cache.find(
      (channel) => channel.id == "766278332500803610"
    );

    channel.send(
      `${member.user}, '${member.displayName}' abandonou a nossa jangada ⛵️. Seguimos com ${this._membersCount} marujos <:FeelsBadMan:766306313663283241> `
    );
  }
}
