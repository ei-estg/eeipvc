import { CronJob } from 'cron'
import { MessageEmbed, TextChannel } from 'discord.js'

interface Timmer {
    cronTime: string
    channel: Promise<TextChannel | undefined> | any
    handler: () => Promise<string | MessageEmbed | undefined>
}

export class TimersHandler {
    private timer: Array<Timmer> = []

    register(...timers: Timmer[]) {
        this.timer.push(...timers)
    }

    onReady() {
        this.timer.forEach((timmer) =>
            new CronJob(timmer.cronTime, async () => {
                const handler = await timmer.handler()
                const channel = await timmer.channel()
                try {
                    if (typeof handler == 'string') {
                        await channel.send(handler)
                    } else if (handler instanceof MessageEmbed) {
                        await channel.send({ embed: handler })
                    }
                } catch (err) {
                    console.error(err)
                }
            }).start(),
        )
    }
}
