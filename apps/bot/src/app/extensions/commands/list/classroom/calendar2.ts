import { SlashCommand } from '../../base/SlashCommand'
import { getCalendarEvents } from '@geei/calendar'
import { eiEmbed } from '../../../../defaults/embed'

export const calendar2Command: SlashCommand = {
    name: 'calendario2',
    description: 'Calendário de Frequências e Exames',

    async run() {
        const calendarEmbed = eiEmbed().setTitle('📅 Calendário')

        const events = await getCalendarEvents()

        events.forEach((event) =>
            calendarEmbed.addFields({
                name: event.summary || 'Evento',
                value: event.start.date || event.start.dateTime,
            }),
        )

        return calendarEmbed
    },
}
