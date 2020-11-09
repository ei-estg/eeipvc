const { Command } = require('discord.js-commando')
const { login } = require('on-ipvc')
const { onEmbed } = require('../../defaults/embed')

module.exports = class SchedulesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'horarios',
            memberName: 'schedule',
            group: 'on',
            description: 'Horários das turmas',
            args: [
                {
                    key: 'username',
                    type: 'string',
                    prompt: 'Qual é o nome de utilizador?',
                },
                {
                    key: 'password',
                    type: 'string',
                    prompt: 'Qual é a password?',
                },
                {
                    key: 'year',
                    type: 'integer',
                    prompt: 'Qual é o ano letivo? (e.g. 202021)',
                },
                {
                    key: 'semester',
                    type: 'string',
                    default: 'S1',
                    prompt: 'Qual é o semestre? (e.g. S1)',
                },
                {
                    key: 'klass',
                    type: 'string',
                    prompt: 'Qual é a turma? (e.g. EI-1-C)',
                },
                {
                    key: 'week',
                    type: 'integer',
                    default: '311',
                    prompt: 'Qual é a semana?',
                },
            ],
        })
    }
    async run(message, { username, password, year, semester, klass, week }) {
        const schedulesEmbed = onEmbed().setTitle('📅 Horário')

        let user = await login(username, password)
        if (!user) {
            return await message.channel.send(
                'Credenciais de utilizador incorretas.'
            )
        }

        let data = await user.getSchedule(year, semester, klass, week)

        data.forEach((block) => {
            schedulesEmbed.addField(
                block.title,
                `das ${block.datadatainicio} até às ${block.datadatafim}`
            )
        })

        await message.channel.send({ embed: schedulesEmbed })
    }
}
