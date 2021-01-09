import { CronJob } from 'cron'
import { MessageEmbed, TextChannel } from 'discord.js'

interface Timmer {
    cronTime: string
    channel: Promise<TextChannel | undefined> | any
    handler: () => Promise<string | MessageEmbed | undefined>
}

export class TimmerHandler {
    private timmers: Array<Timmer> = []

    addTimmers(...timmers: Timmer[]) {
        this.timmers.push(...timmers)
    }

    startAll() {
        this.timmers.forEach((timmer) =>
            new CronJob(timmer.cronTime, async () => {
                const handler = await timmer.handler()
                const channel = await timmer.channel()
                try {
                    if (typeof handler == 'string') {
                        await channel.send(handler)
                    } else {
                        await channel.send({ embed: handler })
                    }
                } catch (err) {
                    console.error(err)
                }
            }).start(),
        )
    }
}
