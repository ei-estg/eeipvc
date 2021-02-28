import { Command } from '../Command'
import IPVCCalendar from '../../../data/ipvc-calendar.json'
import { eiEmbed } from '../../defaults/embed'
import { normalize } from '../../utils/string'

export const calendarCommand: Command = {
    name: 'calendario',
    description: 'Calendário IPVC',
    async run() {
        const calendarEmbed = eiEmbed().setTitle('📅 Calendário')

        IPVCCalendar.half.forEach((half) => {
            calendarEmbed.addFields({
                name: '⠀',
                value: `**${half.id}º Sementre** (de ${half.begin} a ${half.end})`,
            })

            half.interruptions.forEach((int) => {
                calendarEmbed.addFields({
                    name: normalize(int.type),
                    value: `de ${int.begin} a ${int.end}`,
                })
            })
        })
        return calendarEmbed
    },
}
