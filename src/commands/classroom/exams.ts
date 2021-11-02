import { Command } from '../Command'
import { Message } from 'discord.js'
import { eiEmbed } from '../../defaults/embed'

import ExamsDates from '../../../data/exams-dates.json'

export const examsCommand: Command = {
    name: 'exams',
    alias: ['exames', 'testes', 'frequencias'],
    description: 'Datas de exames e frequências',

    args: {
        year: {
            text: 'ano',
            example: '1',
            check: () => true,
            optional: true,
        },
    },

    async run(message: Message, { year = 0 }) {
        const years = [
            '779478593641250836',
            '779478680702287922',
            '779478818552414268',
        ]
        const dic = {
            '1': '779478593641250836',
            '2': '779478680702287922',
            '3': '779478818552414268',
        }
        const semester = 1
        const examsEmbed = eiEmbed().setTitle(
            '📚 Datas de exames e frequências',
        )

        let newYear
        if (year === 0) {
            message.member?.roles.cache.forEach((role) => {
                years.forEach((yearRole) => {
                    if (role.id === yearRole) {
                        newYear = yearRole
                    }
                })
            })
        } else {
            newYear = dic[year]
        }

        let data = ExamsDates[newYear]

        if (!data) {
            return 'Não foi encontrada o ano pretendido!'
        }
        ExamsDates[newYear].semesters[semester].subjects.forEach((value) => {
            examsEmbed.addFields({
                name: '🎓 Disciplina ➜ ' + value.name,
                value: value.fullname,
            })

           if (value.frequencies && !value.work) {
                examsEmbed.addFields({
                    name: '📋 Frequências',
                    value: value.frequencies + '\n〰️',
                })
            }
            
            if (value.frequencies) {
              examsEmbed.addFields({
                  name: '📋 Frequências',
                  value: value.frequencies,
              })
          }

            if (value.work) {
                examsEmbed.addFields({
                    name: '📁 Trabalhos',
                    value: value.work + '\n〰️',
                })
            }
            /*
          if (value.exams){
            examsEmbed.addFields({
              name: "📘 Exames",
              value: value.exams
            })
          }
    
          if (value.resource){
            examsEmbed.addFields({
              name: "🆘 Recurso",
              value: value.resource
            })
          }
          */
         })

        examsEmbed.setFooter('🚨 As datas apresentadas requerem confirmação!')
        return examsEmbed
    },
}
