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
      optional: true     
    }    
  },

  async run(message: Message, {year}) {
    const examsEmbed = eiEmbed().setTitle('📚 Datas de exames e frequências')

    if (!year) {
      message.member?.roles.cache.forEach((role) => {
        this.configuration.year.forEach((yearRole) => {
            if (role.id == yearRole.roleId) {
                year = yearRole.content
            }
        })
      })
    }      
   
    if (year){
      let data = ExamsDates..find((value) => value.name == subject.toUpperCase())

      if (!data) {
        return 'Não foi encontrada a disciplina pretendida!'
      } else {
        
        examsEmbed.addFields({
          name: "🎓 Disciplina",
          value: data.fullname,
        })
    
        if (data.frequencies){
          examsEmbed.addFields({
            name: "📋 Frequências",
            value: data.frequencies
          })
        }

        if (data.work){
          examsEmbed.addFields({
            name: "📁 Trabalhos",
            value: data.work,
          })
        }

        /*
        if (data.exams){
          examsEmbed.addFields({
            name: "📘 Exames",
            value: data.exams,
          })
        }

        if (data.resource){
          examsEmbed.addFields({
            name: "🆘 Recurso",
            value: data.resource,
          })
        }
        */
        examsEmbed.setFooter("🚨 As datas apresentadas requerem confirmação!")
        return examsEmbed
      }
    } 
    ExamsDates.data.forEach(value => {

      examsEmbed.addFields({
        name: "🎓 Disciplina",
        value: value.fullname
      })

      if (value.frequencies){
        examsEmbed.addFields({
          name: "📋 Frequências",
          value: value.frequencies
        })
      }

      if (value.work){
        examsEmbed.addFields({
          name: "📁 Trabalhos",
          value: value.work
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
      examsEmbed.addFields({
        name: "‏‏‎🏳️ " + value.name,
        value: "〰️"
      })
    })

    examsEmbed.setFooter("🚨 As datas apresentadas requerem confirmação!")
    return examsEmbed
  }
}
