import { Command } from '../Command'
import ServicesSchedule from '../../../data/services-schedule.json'
import { eiEmbed } from '../../defaults/embed'

export const servicesCommand: Command = {
    name: 'servicos',
    alias: ['servicos', 'academicos', 'gac', 'bu', 'si'],
    description: 'Horário dos vários serviços no IPVC',
    async run() {
        const servicesEmbed = eiEmbed().setTitle(
            '⏰ Horários dos Serviços IPVC',
        )

        ServicesSchedule.service.forEach((service) => {
            servicesEmbed.addFields({
                name: `**${service.name}**`,
                value: `\t${service.schedule.join(
                    '',
                )}\n **Contactos**\n \tEmail: ${service.email} \n \tTelefone: ${
                    service.phone
                }`,
            })
        })
        servicesEmbed.setFooter('Poderão ocorrer alterações nos hórarios')
        return servicesEmbed
    },
}
