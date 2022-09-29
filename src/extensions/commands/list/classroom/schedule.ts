import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import moment from 'moment'
import { login } from '../../../../../lib/on-ipvc'
import { SlashCommandBuilder } from '@discordjs/builders'

moment.locale('pt-pt')

export const scheduleCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('horario')
        .setDescription('Horário de cada turma')
        .addStringOption((option) =>
            option.setName('year').setDescription('Ano'),
        )
        .addStringOption((option) =>
            option.setName('classroom').setDescription('Turma'),
        )

        .addStringOption((option) =>
            option.setName('day').setDescription('Dia'),
        ),

    async run(it) {
        const { options } = it
        let classroom = options.get('classroom')?.value
        let day = options.get('day')?.value
        let year = options.get('year')?.value

        const scheduleEmbed = eiEmbed()

        const memberRoles = (await it.member.fetch())._roles

        if (!year) {
            memberRoles.forEach((role) => {
                this.config.commands.schedule.year.forEach((yearRole) => {
                    if (role.id == yearRole.roleId) {
                        year = yearRole.content
                    }
                })
            })
        }

        if (!classroom) {
            memberRoles.forEach((role) => {
                this.config.commands.schedule['class'].forEach((classRole) => {
                    if (role.id == classRole.roleId) {
                        classroom = classRole.content
                    }
                })
            })
        }
        if (!classroom || !year) {
            return 'Turma ou ano não encontrada para este utilizador.'
        }
        classroom = classroom.toUpperCase()

        scheduleEmbed.setTitle(
            `🔍 Horário da turma ${classroom} do ${year}º ano`,
        )

        const currentDay = moment().format('DD')
        const currentMonth = moment().format('MM')

        let user = await login(
            process.env.ON_AUTH_USERNAME || '',
            process.env.ON_AUTH_PASSWORD || '',
        )

        let schedule = await user.getScheduleByDate(
            '202223',
            'S1',
            `EI-${year}-${classroom}`,
            '2022',
            currentMonth,
            day || currentDay,
        )

        if (!schedule) {
            return 'A combinação turma/ano não existe. Ex: !horario A-2 27'
        }
        if (schedule.length == 0) {
            return 'Sem horário disponível para o dia selecionado.'
        }

        schedule.forEach((item) => {
            let isCanceled = ['REPLACED', 'CANCELED'].includes(item.status)
            let strike = ''
            if (isCanceled) {
                strike = '~~'
            }

            scheduleEmbed.addFields(
                {
                    name: `${item.lesson.name}`,
                    value: `${item.lesson.shortName}${
                        isCanceled ? ' - **Anulada/Substituida 🚫**' : ''
                    }`,
                    inline: true,
                },
                {
                    name: `${strike}🕐 ${moment
                        .unix(item.start)
                        .format('HH:mm')}h às ${moment
                        .unix(item.end)
                        .format('HH:mm')}h${strike}`,
                    value: `${item.lesson.classRoom} | ${item.lesson.type}`,
                    inline: true,
                },
                {
                    name: item.teacher,
                    value: 'ㅤ',
                },
            )
        })
        return scheduleEmbed
    },
}
