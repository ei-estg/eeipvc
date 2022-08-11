import { Command } from '../Command'
import { getMoodleCalendarEvents } from '../../requests/moodle'
import { eiEmbed } from '../../defaults/embed'
import moment from 'moment'

moment.locale('pt-pt')

export const moodleEventsCommand: Command = {
    name: 'eventos',
    description: 'Eventos do Moodle',

    async run(_) {
        let events = await getMoodleCalendarEvents()
        const eventsEmbed = eiEmbed()

        eventsEmbed.setDescription(
            `🕐 **Atualizado às ${moment().format('HH:mm')}**`,
        )

        eventsEmbed.setTitle('Eventos Moodle')
        events.forEach((event) =>
            eventsEmbed.addFields(
                {
                    name: `${event.name}`,
                    value: `🕐 ${moment
                        .unix(event.maxTimestamp)
                        .format('DD-MM-YYYY HH:mm')}`,
                    inline: true,
                },
                {
                    name: `📅 **${moment.unix(event.maxTimestamp).fromNow()}**`,
                    value: `🌐 [Aceder ao Moodle](${event.url})`,
                    inline: true,
                },
                {
                    name: `💻 ${event.course.name}`,
                    value: '⠀',
                },
            ),
        )
        return eventsEmbed
    },
}
