import { Client, TextChannel } from 'discord.js'

import { CommandHandler } from './handlers/commands'
import { TimmerHandler } from './handlers/timmers'
import { ReactHandler } from './handlers/reacts'

import { busEvent } from './events/commands/bus'
import { newsEvent } from './events/commands/news'
import { mealsEvent } from './events/commands/meals'
import { getISODate } from './utils/time'

import botConfig from './botConfig.json'

class BotClient extends Client {
    public commandHandler = new CommandHandler()
    public timmerHandler = new TimmerHandler()
    public reactHandler = new ReactHandler()

    login(token?: string): Promise<string> {
        let login = super.login(token)

        // Commands
        this.on('message', this.commandHandler.handle.bind(this.commandHandler))

        // CronJobs
        this.on('ready', () => {
            this.timmerHandler.startAll()
        })

        // Reactions
        this.on(
            'messageReactionAdd',
            this.reactHandler.handleAdd.bind(this.reactHandler),
        )
        this.on(
            'messageReactionRemove',
            this.reactHandler.handleRemove.bind(this.reactHandler),
        )

        return login
    }
}

const bot = new BotClient({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

bot.on('ready', async () => {
    const guild = await bot.guilds.fetch(botConfig.guild.id)
    bot.user?.setActivity(`${guild.memberCount} pessoas.`, { type: 'WATCHING' })
})

// Commands
bot.commandHandler.addCommand(busEvent, newsEvent, mealsEvent)

// CronJobs
bot.timmerHandler.addTimmers({
    cronTime: botConfig.timmers.meals.cronTime,
    channel: async () => {
        const guild = await bot.guilds.fetch(botConfig.guild.id)
        return guild.channels.cache.get(
            botConfig.timmers.meals.channelId,
        ) as TextChannel
    },
    handler: mealsEvent.run(undefined, { date: getISODate() }),
})

// Reactions
bot.reactHandler.giveRole(...botConfig.reacts)

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
