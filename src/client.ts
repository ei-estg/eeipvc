import { Client, ClientOptions } from 'discord.js'

import { CommandsHandler } from './handlers/commands'
import { TimersHandler } from './handlers/timers'
import { ReactsHandler } from './handlers/reacts'

export class BotClient extends Client {
    private config: any
    public handlers: { [key: string]: any }

    constructor(botConfig: any, options?: ClientOptions) {
        super(options)

        this.config = botConfig
        this.handlers = {
            commands: new CommandsHandler(this.config.commands),
            timers: new TimersHandler(),
            reacts: new ReactsHandler(),
        }
    }

    login(token?: string): Promise<string> {
        let login = super.login(token)

        // Commands
        this.on(
            'message',
            this.handlers.commands.onMessage.bind(this.handlers.commands),
        )

        // CronJobs
        this.on('ready', () => {
            this.handlers.timers.onReady()
        })

        // Reactions
        this.on(
            'messageReactionAdd',
            this.handlers.reacts.onReactAdd.bind(this.handlers.reacts),
        )
        this.on(
            'messageReactionRemove',
            this.handlers.reacts.onReactionRemove.bind(this.handlers.reacts),
        )
        this.on('ready', () => this.handlers.reacts.onReady(this))

        return login
    }
}
