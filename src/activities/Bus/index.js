const fetch = require('node-fetch')

const Activity = require('../Activity')
const defaultEmbed = require('../../defaults/embed')

class BusActivity extends Activity {
    constructor(bot) {
        super(bot)

        this.bot.on('message', this.onMessage.bind(this))
    }

    static async getBusStops() {
        let req = await fetch(
            'http://apps.sas.ipvc.pt/sas-ws/mobile/getLocaisBus.php'
        )
        return await req.json()
    }

    async onMessage(msg) {
        const { wasCalled } = this.getCommand('paragens', msg.content)
        if (!wasCalled) return

        let stops = await BusActivity.getBusStops()

        await msg.channel.send({
            embed: BusActivity.createBusStopsEmbed(stops),
        })
    }

    static createBusStopsEmbed(stops) {
        const busStopsEmbed = defaultEmbed.setTitle('🚌 Paragens Bus Académico')

        stops.forEach((stop) => {
            busStopsEmbed.addFields({
                name: `${stop['nome']} - ${stop['descricao']}`,
                value: stop['morada'],
            })
        })

        return busStopsEmbed
    }
}

module.exports = BusActivity
