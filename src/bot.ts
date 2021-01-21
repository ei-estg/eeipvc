import { TextChannel } from 'discord.js'

import { busCommand } from './commands/bus'
import { newsCommand } from './commands/news'
import { mealsCommand } from './commands/meals'
import { pingCommand } from './commands/ping'
import { calendarCommand } from './commands/calendar'
import { covidCommand } from './commands/covid'
import { subjectsCommand } from './commands/subjects'

import botConfig from './botConfig.json'
import { BotClient } from './client'

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
bot.handlers.commands.register(
    busCommand,
    newsCommand,
    mealsCommand,
    pingCommand,
    calendarCommand,
    covidCommand,
    subjectsCommand,
)

// CronJobs
bot.handlers.timers.register({
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
bot.handlers.reacts.giveRoles(botConfig.reacts)

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
