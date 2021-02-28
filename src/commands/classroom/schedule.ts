import { Message } from 'discord.js'
import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import moment from 'moment'
import { login } from 'on-ipvc'

moment.locale('pt-pt')

export const scheduleCommand: Command = {
    name: 'schedule',
    alias: ['horario'],
    description: 'Horário de cada turma',

    args: {
        classroom: {
            text: 'turma',
            example: 'A',
            check: () => true,
            optional: true,
        },
        day: {
            text: 'dia',
            example: '25',
            check: () => true,
            optional: true,
        },
    },

    async run(message: Message, { classroom, day }) {
        const scheduleEmbed = eiEmbed()

        if (!classroom) {
            message.member?.roles.cache.forEach((role) => {
                this.configuration['class'].forEach((classRole) => {
                    if (role.id == classRole.roleId) {
                        classroom = classRole.content
                    }
                })
            })
        }
        if (!classroom) {
            return 'Turma não encontrada para este utilizador.'
        }

        scheduleEmbed.setTitle(`🔍 Horário da turma ${classroom}`)

        const currentDay = moment().format('DD')
        const currentMonth = moment().format('MM')

        let user = await login(
            process.env.ON_AUTH_USERNAME,
            process.env.ON_AUTH_PASSWORD,
        )

        let schedule: any

        if (day) {
            schedule = await user.getScheduleByDate(
                '202021',
                'S2',
                `EI-1-${classroom}`,
                '2021',
                currentMonth,
                day,
            )
        } else {
            schedule = await user.getScheduleByDate(
                '202021',
                'S2',
                `EI-1-${classroom}`,
                '2021',
                currentMonth,
                currentDay,
            )
        }

        if (schedule.length == 0) {
            return 'Sem horário disponível para o dia selecionado.'
        } else {
            schedule.forEach((item) =>
                scheduleEmbed.addFields(
                    {
                        name: `${item.lesson.name}`,
                        value: `${item.lesson.shortName}`,
                        inline: true,
                    },
                    {
                        name: `🕐 ${moment
                            .unix(item.start)
                            .format('HH:mm')}h às ${moment
                            .unix(item.end)
                            .format('HH:mm')}h`,
                        value: `${item.lesson.classRoom} | ${item.lesson.type}`,
                        inline: true,
                    },
                    {
                        name: `${item.teacher}`,
                        value: '⠀',
                    },
                ),
            )
            return scheduleEmbed
        }
    },
}
