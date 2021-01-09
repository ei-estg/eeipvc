import { Command } from './Command'
import { getBusStops } from '../requests/sas'
import { sasEmbed } from '../defaults/embed'

export const busCommand: Command = {
    name: 'paragens',
    description: 'Paragens do BUS Académico',

    async run() {
        try {
            let stops = await getBusStops()
            const busStopsEmbed = sasEmbed().setTitle(
                '🚌 Paragens Bus Académico',
            )

            stops.forEach((stop) => {
                busStopsEmbed.addFields({
                    name: `${stop.name} - ${stop.description}`,
                    value: stop.address,
                })
            })
            return busStopsEmbed
        } catch (e) {
            console.error(e)
        }
    },
}
