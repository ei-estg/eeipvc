import { Command } from '../Command'
import { GuildChannel, Message } from 'discord.js'

export const answerCommand: Command = {
    name: 'responde',
    alias: ['desgracado', 'desgraçado', 'sacrificado'],
    description: 'Seleciona uma pessoa aleatóriamente para responder',
    args: {
        shift: {
            text: 'turno',
            check: () => true,
        },
    },
    async run(message: Message, { shift }) {
        let roles = await (message.channel as GuildChannel).guild.roles.fetch()
        let role = await (
            message.channel as GuildChannel
        ).guild.roles.cache.find(
            (role) => role.name == 'Turma ' + shift.toUpperCase(),
        )
        if (!role) return 'Turma não existe'
        if (!role.members) return 'Sem utilizadores encontrados'
        return `${role.members.random()} é a tua vez de responder :D`
    },
}
