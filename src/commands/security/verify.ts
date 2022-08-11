import { Message } from 'discord.js'
import { login } from '../../../lib/academicos-ipvc'
import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'

export const verifyCommand: Command = {
    name: 'verify',
    alias: ['verificar'],
    args: {
        username: {
            text: 'Nome do utilizador',
            check: () => true,
        },
        password: {
            text: 'Password do utilizador',
            check: () => true,
        },
    },
    description: 'Verificar utilizador.',
    async run(message: Message, { username, password }) {
        if (message.channel.type != 'dm') {
            return 'Este comando apenas pode ser usado em privado'
        }
        const embed = eiEmbed()

        try {
            var user = await login(username, password)
        } catch (err) {
            return 'Falha ao iniciar sessão'
        }
        embed.addFields(
            {
                name: 'Utilizador',
                value: `${user.fullName} (nº${user.number}) | ${user.type}`,
            },
            {
                name: 'Curso',
                value: `[${user.course.id}] ${user.course.name}`,
            },
            {
                name: 'Escola',
                value: user.school,
            },
        )

        if (user.type != 'Aluno') return 'O utilizador não é um aluno'
        if (user.course.id != 9119)
            return 'O aluno não pertence ao curso de engenharia informática'

        const { guildId, roleId } = this.configuration

        const guild = await message.client.guilds.fetch(guildId)
        const role = await guild.roles.fetch(roleId)

        if (!role) return
        const guildMember = await guild.members.fetch(message.channel.recipient)

        guildMember.roles?.add(role)

        return embed
    },
}
