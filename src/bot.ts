import { GatewayIntentBits, Partials } from 'discord.js'
import { busCommand } from './extensions/commands/list/sas/bus'
import { pingCommand } from './extensions/commands/list/general/ping'
import { pisoCommand } from './extensions/commands/list/classroom/piso'
import { ribasCommand } from './extensions/commands/list/fun/ribeiro'
import { rodaEsse } from './extensions/commands/list/fun/rodaesse'
import { roastCoder } from './extensions/commands/list/fun/roastCoder'
import { servicesCommand } from './extensions/commands/list/classroom/servicesSchedule'
import { dadJoke } from './extensions/commands/list/fun/dadJokes'
import botConfig from './botConfig.json'
import { ClientManager } from './client'
import { onlyfansCommand } from './extensions/commands/list/fun/onlyfans'
import { php } from './extensions/commands/list/fun/killMe'
import { java } from './extensions/commands/list/fun/java'
import { etron } from './extensions/commands/list/fun/bestcar'
import { avminhoCommand} from "./extensions/commands/list/busSchedules/avminho"

import 'dotenv/config'
import { CommandsExtension } from './extensions/commands'
import { GuildExtension } from './extensions/guild'
import { ReactsHandler } from './extensions/reacts'
import { scheduleCommand } from './extensions/commands/list/classroom/schedule'
import { mealsCommand } from './extensions/commands/list/sas/meals'

import { horoscopeCommand } from './extensions/commands/list/fun/horoscope'
import { stockCommand } from './extensions/commands/list/fun/stock'
import { getWeatherCommand } from './extensions/commands/list/general/weather'
import { TimersExtension } from './extensions/timers'
import { mealsTimer } from './extensions/timers/list/meals'

const bot = new ClientManager(botConfig, {
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
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
    new CommandsExtension(bot),
    new ReactsHandler(bot),
    new GuildExtension(bot),
    new TimersExtension(bot),
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
    avminhoCommand
)

commands.registerSlashCommandsAutomatically()

timer.register(mealsTimer)

timer.start()

bot.run(process.env.DISCORD_BOT_TOKEN!)
    .then(() => console.log('Bot running'))
    .catch((err) => console.error(err))
