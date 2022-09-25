import { TextChannel } from 'discord.js'

export interface TimerRegistry {
    name: string
    cronTime: string
    channelId: string
}

export abstract class TimerCallable {
    abstract timerNames: string[]
    abstract run: (_) => void
}
