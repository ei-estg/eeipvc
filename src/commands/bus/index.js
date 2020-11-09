const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')

const { sasEmbed } = require('../../defaults/embed')

module.exports = class BusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'paragens',
            memberName: 'bus-stops',
            group: 'sas',
            description: '🚌 Paragens do BUS Académico',
        })
    }

    static async getBusStops() {
        let req = await fetch(
            'http://apps.sas.ipvc.pt/sas-ws/mobile/getLocaisBus.php'
        )
        return await req.json()
    }

    async run(message) {
        let stops = await BusCommand.getBusStops()
        await message.channel.send({
            embed: BusCommand.createBusStopsEmbed(stops),
        })
    }

    static createBusStopsEmbed(stops) {
        const busStopsEmbed = sasEmbed().setTitle('🚌 Paragens Bus Académico')

        stops.forEach((stop) => {
            busStopsEmbed.addFields({
                name: `${stop['nome']} - ${stop['descricao']}`,
                value: stop['morada'],
            })
        })

        return busStopsEmbed
    }
}
