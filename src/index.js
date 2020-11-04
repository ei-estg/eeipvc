require('dotenv').config({ path: '../.env' })

const discord = require('discord.js')

const MealsActivity = require('./activities/Meals')
const NewsActivity = require('./activities/News')
const BusActivity = require('./activities/Bus')

class Bot extends discord.Client {
    constructor(botConfig, options) {
        super(options)
        this.settings = botConfig || {}
        this._commands = []

        this.on('ready', () => {
            console.log('Bot is ready!')
        })
    }

    registerActivity(classRef) {
        this._commands.push(new classRef(this))
    }

    registerActivities(...classRefs) {
        classRefs.forEach((classRef) => this.registerActivity(classRef))
    }
}

let bot = new Bot({
    defaultPrefix: '!',
})

bot.registerActivities(MealsActivity, NewsActivity, BusActivity)

bot.login(process.env.DISCORD_BOT_TOKEN).catch((err) => console.error(err))
