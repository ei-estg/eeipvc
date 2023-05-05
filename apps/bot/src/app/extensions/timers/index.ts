import { CronJob } from 'cron'
import { BaseExtension } from '../base/BaseExtension'
import { ClientManager } from '../../client'
import { TimerCallable, TimerRegistry } from './base/TimerCallable'
import TimersList from './timers-list.json'

export class TimersExtension<T> extends BaseExtension<T> {
    private readonly timers: TimerRegistry[] = []
    private timersCallable: TimerCallable[] = []

    constructor(manager: ClientManager) {
        super(manager)

        this.timers = TimersList
    }

    register(...timers: TimerCallable[]) {
        this.timersCallable.push(...timers)
    }

    private getCallablesForTimerName(timerName: string) {
        return this.timersCallable.filter((timerCallable) =>
            timerCallable.timerNames.includes(timerName),
        )
    }

    private runCallablesForTimerName(timer: TimerRegistry) {
        const callables = this.getCallablesForTimerName(timer.name)

        callables.forEach(async (callable) => {
            const channel = await this._manager.client.channels.fetch(
                timer.channelId,
            )


            if (!channel) throw new Error('channel was not found for timer')
            callable.run(channel)
        })
    }

    protected _setup() {}

    protected _setupLater() {
        this.timers.forEach((timer) =>
            new CronJob(timer.cronTime, async () => {
                this.runCallablesForTimerName(timer)
            }).start(),
        )
    }

    public start() {
        this._manager.client.on('ready', this._setupLater.bind(this))
    }
}
