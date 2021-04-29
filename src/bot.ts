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
import { examsCommand } from './commands/classroom/exams'

import botConfig from './botConfig.json'
import { BotClient } from './client'
import { answerCommand } from './commands/fun/answer'

const bot = new BotClient(botConfig, { partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'] })

let guildMembersCount = 0

const updateStatus = async () => {
    await bot.user?.setActivity(`all ${guildMembersCount} members`, {
        type: 'LISTENING',
    })
}

bot.on('ready', async () => {
    const guild = await bot.guilds.fetch(botConfig.guild.id)
    guildMembersCount = guild.memberCount
    await updateStatus()
})

bot.on('guildMemberAdd', async () => {
    guildMembersCount++
    await updateStatus()

})

bot.on('guildMemberRemove', async () => {
    console.log('bye')
    guildMembersCount--
    await updateStatus()
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
    scheduleCommand,
    examsCommand,
    answerCommand
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
