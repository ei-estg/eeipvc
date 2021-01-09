import { Client, TextChannel } from 'discord.js'

import { CommandHandler } from './handlers/commands'
import { TimmerHandler } from './handlers/timmers'
import { ReactHandler } from './handlers/reacts'

import { busCommand } from './commands/bus'
import { newsCommand } from './commands/news'
import { mealsCommand } from './commands/meals'
import { pingCommand } from './commands/ping'
import { calendarCommand } from './commands/calendar'
import { subjectsCommand } from './commands/subjects'

import botConfig from './botConfig.json'

export class BotClient extends Client {
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
    // Status update
    const statusUpdate = async () => {
        const guild = await bot.guilds.fetch(botConfig.guild.id)
        bot.user?.setActivity(`Membros: ${guild.memberCount}`, {
            type: 'CUSTOM_STATUS',
        })
    }
    await statusUpdate()
    setInterval(statusUpdate, 15 * 60 * 1000)
})

// Commands
bot.commandHandler.addCommand(
    busCommand,
    newsCommand,
    mealsCommand,
    pingCommand,
    calendarCommand,
    subjectsCommand,
)

// CronJobs
bot.timmerHandler.addTimmers({
    cronTime: botConfig.timmers.meals.cronTime,
    channel: async () => {
        const guild = await bot.guilds.fetch(botConfig.guild.id)
        return guild.channels.cache.get(
            botConfig.timmers.meals.channelId,
        ) as TextChannel
    },
    handler: () => mealsCommand.run(undefined, {}),
})

// Reactions
bot.reactHandler.giveRole(botConfig.reacts)

// Add first reactions
bot.on('ready', async () => {
    let tasks: Array<Promise<void>> = []
    for (const react of bot.reactHandler.reacts) {
        const task = async () => {
            const channel = (await bot.channels.fetch(
                react.channelId,
            )) as TextChannel
            const message = await channel.messages.fetch(react.messageId)

            await message.react(react.emojiId || react.emoji)
        }
        tasks.push(task())
    }
    await Promise.all(tasks)
})

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
