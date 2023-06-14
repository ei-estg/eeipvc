import { SlashCommand } from '../../base/SlashCommand'
import { SlashCommandBuilder } from '@discordjs/builders'
import ServicesSchedule from '../../../../../assets/data/services-schedule.json'
import { eiEmbed } from '../../../../defaults/embed'

export const servicesCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('servicos')
        .setDescription('Horário de cada serviço do IPVC')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('servico')
                .setDescription('Serviço do IPVC')
                .setChoices(
                    ...ServicesSchedule.service.map((service) => ({
                        name: service.name,
                        value: service.value,
                    })),
                ),
        ),

    async run(it) {
        const service = it.options.get('servico').value
        const serviceObj = ServicesSchedule.service.find(
            (s) => s.value == service,
        )
        if (!serviceObj) {
            return 'Serviço inexistente.'
        }
        const fields = [
            {
                name: 'Horário',
                value: serviceObj.schedule.join(''),
            },
            {
                name: 'Horário excepcional',
                value: serviceObj.exceptionalSchedule?.join('') || 'Nenhum',
            },
            {
                name: 'Paragens Lectivas',
                value: serviceObj.breaks?.join('') || 'Nenhuma',
            },
            {
                name: 'Excepções',
                value: serviceObj.exceptions || 'Nenhuma',
            },
            {
                name: 'Telefone',
                value: serviceObj.phone,
            },
            {
                name: 'Email',
                value: serviceObj.email,
            },
        ]

        const embed = eiEmbed()
        embed.setTitle(`Horário de ${serviceObj.name}`)
        embed.addFields(...fields)
        embed.setFooter({
            text: `⚠️ Horário sujeito a alterações ⚠️ | 📅 Atualizado em ${serviceObj.updated_at} 📅`,
        })

        return embed
    },
}
