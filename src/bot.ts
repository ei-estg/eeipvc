import { TextChannel } from 'discord.js'
import { busCommand } from './commands/sas/bus'
import { newsCommand } from './commands/campus/news'
import { mealsCommand } from './commands/sas/meals'
import { pingCommand } from './commands/general/ping'
import { calendarCommand } from './commands/classroom/calendar'
import { covidCommand } from './commands/campus/covid'
import { subjectsCommand } from './commands/classroom/subjects'
import {
    playCommand,
    stopCommand,
    pauseCommand,
    resumeCommand,
} from './commands/fun/music'
import { covidPortugalCommand } from './commands/general/covidPortugal'
import { moodleEventsCommand } from './commands/classroom/moodleEvents'
import { scheduleCommand } from './commands/classroom/schedule'


import botConfig from './botConfig.json'
import { BotClient } from './client'

const bot = new BotClient(botConfig, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

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
    playCommand,
    stopCommand,
    pauseCommand,
    resumeCommand,
    covidPortugalCommand,
    moodleEventsCommand,
    scheduleCommand
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
