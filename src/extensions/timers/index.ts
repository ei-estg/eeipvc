import { CronJob } from 'cron'
import { Embed, EmbedBuilder, TextChannel } from "discord.js";
import { BaseExtension } from "../base/BaseExtension";
import { ClientManager } from "../../client";

interface Timer {
    cronTime: string
    channel: Promise<TextChannel | undefined> | any
    handler: () => Promise<string | Embed | undefined>
}

export class TimersHandler<T> extends BaseExtension<T> {
  constructor(manager: ClientManager) {
    super(manager)

    const { client } = manager
    client.on('ready', this._setup)
  }
    private timer: Array<Timer> = []

    register(...timers: Timer[]) {
        this.timer.push(...timers)
    }

    protected _setup() {
        this.timer.forEach((timer) =>
            new CronJob(timer.cronTime, async () => {
                const handler = await timer.handler()
                const channel = await timer.channel()
                try {
                    if (typeof handler == 'string') {
                        await channel.send(handler)
                    } else if (handler instanceof EmbedBuilder) {
                        await channel.send({ embed: handler })
                    }
                } catch (err) {
                    console.error(err)
                }
            }).start(),
        )
    }
}
