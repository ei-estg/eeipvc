require('dotenv').config({ path: '../.env' })

const { CommandoClient } = require('discord.js-commando')
const path = require('path')

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '548590163127959557',
})

client.once('ready', () => {
    console.log('Bot is ready')
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['sas', 'SAS IPVC'],
        ['on', 'ON IPVC'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(process.env.DISCORD_BOT_TOKEN).catch((err) => console.error(err))
