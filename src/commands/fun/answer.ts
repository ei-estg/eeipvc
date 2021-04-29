import { Command} from '../Command'
import { GuildChannel, Message } from 'discord.js'

export const answerCommand: Command = {
    name: 'responde',
    alias: [
        'desgracado',
        'desgraçado',
        'sacrificado'
    ],
    description: 'Seleciona uma pessoa aleatóriamente para responder ao Professor Doutor e Engenheiro Vitor',
    args: {
        shift: {
            text: 'turno',
            check: () => true
        }
    },
    async run(message: Message, { shift }) {
        let role = (message.channel as GuildChannel).guild.roles.cache.find(role => role.name == 'Turma ' + shift)
        if (!role) return 'Turma não existe'
        return `${role.members.random()} é a tua vez de responder :D`

    },
}