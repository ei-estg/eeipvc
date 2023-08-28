import { GatewayIntentBits, Partials } from 'discord.js'
import { busCommand } from './app/extensions/commands/list/sas/bus'
import { pingCommand } from './app/extensions/commands/list/general/ping'
import { pisoCommand } from './app/extensions/commands/list/classroom/piso'
import { ribasCommand } from './app/extensions/commands/list/fun/ribeiro'
import { rodaEsse } from './app/extensions/commands/list/fun/rodaesse'
import { roastCoder } from './app/extensions/commands/list/fun/roastCoder'
import { servicesCommand } from './app/extensions/commands/list/classroom/servicesSchedule'
import { dadJoke } from './app/extensions/commands/list/fun/dadJokes'
import botConfig from './app/botConfig.json'
import { ClientManager } from './app/client'
import { onlyfansCommand } from './app/extensions/commands/list/fun/onlyfans'
import { php } from './app/extensions/commands/list/fun/killMe'
import { java } from './app/extensions/commands/list/fun/java'
import { etron } from './app/extensions/commands/list/fun/bestcar'

import * as dotenv from 'dotenv'
import { CommandsExtension } from './app/extensions/commands'
import { GuildExtension } from './app/extensions/guild'
import { ReactsHandler } from './app/extensions/reacts'
import { scheduleCommand } from './app/extensions/commands/list/classroom/schedule'
import { mealsCommand } from './app/extensions/commands/list/sas/meals'

import { horoscopeCommand } from './app/extensions/commands/list/fun/horoscope'
import { stockCommand } from './app/extensions/commands/list/fun/stock'
import { getWeatherCommand } from './app/extensions/commands/list/general/weather'
import { TimersExtension } from './app/extensions/timers'
import { mealsTimer } from './app/extensions/timers/list/meals'
import { emailCommand } from './app/extensions/commands/list/classroom/mail'
import { environmentSchema } from './config/environment.schema'
import { adventOfCodeCommand } from './app/extensions/commands/list/fun/adventOfCode'
import { onedriveCommand } from './app/extensions/commands/list/classroom/onedrive'
import { RibeiroReact } from './app/extensions/ribas-reactions'
import { calendarCommand } from './app/extensions/commands/list/classroom/calendar'

dotenv.config({
    path: '../../.env',
})

const config = environmentSchema.validate(process.env)

if (config.error)
    throw new Error(
        config.error.details.map((detail) => detail.message).join('\n'),
    )

const main = new ClientManager(botConfig, {
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.User,
    ],
})

const [commands, reacts, guild, timer] = [
    new CommandsExtension(main),
    new ReactsHandler(main),
    new GuildExtension(main),
    new TimersExtension(main),
    new RibeiroReact(main),
]

commands.registerSlashCommands(
    pingCommand,
    php,
    etron,
    onlyfansCommand,
    ribasCommand,
    rodaEsse,
    roastCoder,
    dadJoke,
    servicesCommand,
    java,
    pisoCommand,
    busCommand,
    scheduleCommand,
    mealsCommand,
    horoscopeCommand,
    stockCommand,
    getWeatherCommand,
    emailCommand,
    adventOfCodeCommand,
    onedriveCommand,
    calendarCommand,
)

commands.registerSlashCommandsAutomatically()

timer.register(mealsTimer)

timer.start()

main.run(config.value.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
