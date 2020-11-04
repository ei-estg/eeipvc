class Activity {
    constructor(bot) {
        this.bot = bot
    }

    parseCommand(message, prefix) {
        if (!prefix) prefix = this.bot.settings.defaultPrefix
        let [command, ...args] = message.slice(1).split(' ')

        return {
            command:
                message.charAt(0) === prefix ? command.toLowerCase() : null,
            args,
        }
    }

    getCommand(name, messageContent) {
        const { command, args } = this.parseCommand(messageContent)

        return {
            args,
            wasCalled: command === name,
        }
    }
}

module.exports = Activity
