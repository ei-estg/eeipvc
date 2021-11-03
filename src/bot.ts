import { TextChannel } from 'discord.js'
import { busCommand } from './commands/sas/bus'
import { newsCommand } from './commands/campus/news'
import { mealsCommand } from './commands/sas/meals'
import { pingCommand } from './commands/general/ping'
import { calendarCommand } from './commands/classroom/calendar'
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
import { pisoCommand } from './commands/classroom/piso'
import { ribasCommand } from './commands/fun/ribeiro'
import { rodaEsse } from './commands/fun/rodaesse'
import { roastCoder } from './commands/fun/roastCoder'
import { servicesCommand } from './commands/classroom/servicesSchedule'
import { dadJoke } from './commands/fun/dadJokes'

import botConfig from './botConfig.json'
import { BotClient } from './client'
import { answerCommand } from './commands/fun/answer'
import { onlyfansCommand } from './commands/fun/onlyfans'
import { dogecoin } from './commands/fun/dogecoin'
import { verifyCommand } from './commands/security/verify'
import moment from 'moment'
import { moviesTimmerHander } from './private/movies_timmer_handler'
import { minecraftCommand } from './commands/fun/minecraft'
import { minecraftTimmerHandler } from './private/minecraft_timmer_handler'
import { instagramTimerHandler } from './private/instagram_timer_handler'
const fs = require('fs')
import 'dotenv/config'
const path = require('path')
const bot = new BotClient(botConfig, {
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
})

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
    subjectsCommand,
    playCommand,
    stopCommand,
    pauseCommand,
    resumeCommand,
    covidPortugalCommand,
    moodleEventsCommand,
    scheduleCommand,
    examsCommand,
    answerCommand,
    onlyfansCommand,
    dogecoin,
    ribasCommand,
    rodaEsse,
    roastCoder,
    verifyCommand,
    minecraftCommand,
    pisoCommand,
    dadJoke,
    servicesCommand,
)
const updateData = (users, user) => {
    console.log('add')
    if (!users[user.id]) {
        users[user.id] = {}
        users[user.id].experience = 0
        users[user.id].level = 1
    }
}
const addExperience = (users, user, exp) => {
    users[user.id].experience += exp
}

const levelUp = async (users, user, channel, message) => {
    const experience = users[user.id].experience
    const lvlStart = users[user.id].level
    const lvlEnd = Math.floor(experience ** (1 / 4))
    console.log(lvlStart, lvlEnd)

    if (lvlStart < lvlEnd) {
        users[user.id].level = lvlEnd
        await message.channel.send(`${user} reached a new level ${lvlEnd} 🎉`)
    }
}

bot.on('guildMemberAdd', async (member: any) => {
    const channel = member.guild.channels.cache.find(
        (channel) => channel.id == '766278332500803610',
    )
    const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf8'),
    )
    updateData(users, member)
    fs.writeFileSync(
        path.join(__dirname, '../data', 'users.json'),
        JSON.stringify(users),
        'utf-8',
    )
    channel.send(
        `Boas ${
            member.user
        }. Dá uma olhadela nas salas ${member.guild.channels.cache
            .get('779437283966189618')
            .toString()} e ${member.guild.channels.cache
            .get('779491420079259659')
            .toString()} para ficares a conhecer as regras e ainda acederes a diferentes áreas do servidor.`,
    )
})

bot.on('message', async (message) => {
    try {
        if (message.author.id !== '771442069432434758') {
            const users = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, '../data', 'users.json'),
                    'utf8',
                ),
            )

            updateData(users, message.author)
            addExperience(users, message.author, 5)
            levelUp(users, message.author, message.channel, message)
            fs.writeFileSync(
                path.join(__dirname, '../data', 'users.json'),
                JSON.stringify(users),
                'utf-8',
            )
        }
    } catch (error) {
        console.log(error)
    }
})

bot.on('guildMemberRemove', async (member: any) => {
    const channel = member.guild.channels.cache.find(
        (channel) => channel.id == '766278332500803610',
    )
    channel.send(
        `${member.user} abandonou a nossa jangada ⛵️. Seguimos com ${guildMembersCount} marujos <:FeelsBadMan:766306313663283241> `,
    )
})

const getChannelById = async (guildId: string, channelId: string) => {
    const guild = await bot.guilds.fetch(guildId)
    return guild.channels.cache.get(channelId) as TextChannel
}

// CronJobs
bot.handlers.timers.register({
    cronTime: botConfig.timmers.meals.cronTime,
    channel: () =>
        getChannelById(botConfig.guild.id, botConfig.timmers.meals.channelId),
    handler: () =>
        mealsCommand.run(undefined, {
            date: moment().add(1, 'day').format('YYYY-MM-DD'),
        }),
})

bot.handlers.timers.register({
    cronTime: botConfig.timmers.cineplace.cronTime,
    channel: () =>
        getChannelById(
            botConfig.guild.id,
            botConfig.timmers.cineplace.channelId,
        ),
    handler: async () => {
        return moviesTimmerHander(
            await getChannelById(
                botConfig.guild.id,
                botConfig.timmers.cineplace.channelId,
            ),
        )
    },
})

bot.handlers.timers.register({
    cronTime: botConfig.timmers.minecraft.cronTime,
    channel: () =>
        getChannelById(
            botConfig.guild.id,
            botConfig.timmers.minecraft.channelId,
        ),
    handler: async () => {
        return minecraftTimmerHandler(
            await getChannelById(
                botConfig.guild.id,
                botConfig.timmers.minecraft.channelId,
            ),
        )
    },
})

bot.handlers.timers.register({
    cronTime: botConfig.timmers.vitenoipvc.cronTime,
    channel: () =>
        getChannelById(
            botConfig.guild.id,
            botConfig.timmers.vitenoipvc.channelId,
        ),
    handler: async () => {
        return instagramTimerHandler(
            await getChannelById(
                botConfig.guild.id,
                botConfig.timmers.vitenoipvc.channelId,
            ),
            botConfig.timmers.vitenoipvc.instagramAccount,
        )
    },
})

// Reactions
bot.handlers.reacts.giveRoles(botConfig.reacts)

bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
