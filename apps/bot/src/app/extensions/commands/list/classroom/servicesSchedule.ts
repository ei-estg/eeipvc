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
        console.log(serviceObj)
        if (!serviceObj) {
            return 'Serviço inexistente.'
        }
        const embed = eiEmbed()
        embed.setTitle(`Horário de ${serviceObj.name}`)
        embed.addFields(
            {
                name: 'Horário',
                value: serviceObj.schedule.join(''),
            },
            {
                name: 'Telefone',
                value: serviceObj.phone,
            },
            {
                name: 'Email',
                value: serviceObj.email,
            },
        )
        embed.setFooter({
            text: '⚠️ Horário sujeito a alterações ⚠️',
        })

        return embed
    },
}
