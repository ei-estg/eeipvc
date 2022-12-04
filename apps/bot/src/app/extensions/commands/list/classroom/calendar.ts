import { SlashCommand } from "../../base/SlashCommand";
import IPVCCalendar from '../../../../../assets/data/ipvc-calendar.json'
import { eiEmbed } from '../../../../defaults/embed'
import { normalize } from '../../../../utils/string'

export const calendarCommand: SlashCommand = {
    name: 'calendario',
    description: 'Calendário IPVC',
    async run() {
        const calendarEmbed = eiEmbed().setTitle('📅 Calendário')

        IPVCCalendar.half.forEach((half) => {
            calendarEmbed.addFields({
                name: '⠀',
                value: `**${half.id}º Semestre** (de ${half.begin} a ${half.end})`,
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
