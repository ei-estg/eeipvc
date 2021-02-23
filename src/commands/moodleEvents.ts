import { Command } from './Command'
import { getMoodleCalendarEvents } from '../requests/moodle'
import { eiEmbed } from '../defaults/embed'
import moment from 'moment'

export const moodleEventsCommand: Command = {
    name: 'eventos',
    description: 'Eventos do Moodle',

    async run(_) {
        let events = await getMoodleCalendarEvents()
        const eventsEmbed = eiEmbed()

        eventsEmbed.setTitle('Calendário')
        events.forEach((event) =>
            eventsEmbed.addFields({
                name: `${event.name}  ${moment
                    .unix(event.maxTimestamp)
                    .format('DD-MM-YYYY HH:mm')}`,
                value: event.url,
            }),
        )

        return eventsEmbed
    },
}
