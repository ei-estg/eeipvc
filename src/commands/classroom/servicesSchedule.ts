import { Command } from '../Command'
import ServicesSchedule from '../../../data/services-schedule.json'
import { eiEmbed } from '../../defaults/embed'

export const servicesCommand: Command = {
    name: 'servicos',
    alias: ['servicos'],
    description: 'Horário dos vários serviços no IPVC',
    async run() {
        const servicesEmbed = eiEmbed().setTitle(
            '⏰ Horários dos Serviços IPVC',
        )

        ServicesSchedule.service.forEach((service) => {
            servicesEmbed.addFields({
                name: `**${service.name}**`,
                value: `service.schedule \n email: ${service.email} \n telefone: ${service.phone}`,
            })
        })
        servicesEmbed.setFooter('Poderá ocorrer alterações nos hórarios')
        return servicesEmbed
    },
}
