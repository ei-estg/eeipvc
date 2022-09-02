import { Message, MessageEmbed } from 'discord.js'
import { eiEmbed } from '../defaults/embed'

import { Command } from '../commands/Command'

export const isPrefixChar = (char: string) => {
    const charCode = char.charCodeAt(0)
    return (
        (charCode >= 33 && charCode <= 47) ||
        (charCode >= 58 && charCode <= 64) ||
        (charCode >= 94 && charCode <= 95)
    )
}

export const messageParser = (content: string) => {
    // TODO
    // Optimize parser command function

    let char: string

    let prefixSize = 0
    while ((char = content.charAt(prefixSize)) && isPrefixChar(char)) {
        prefixSize++
    }

    let commandSize = prefixSize
    while (
        (char = content.charAt(commandSize)) != ' ' &&
        content.charAt(commandSize) != ''
    ) {
        commandSize++
    }

    let argsStr = content.slice(commandSize + 1)

    return {
        prefix: content.slice(0, prefixSize),
        command: content.slice(prefixSize, commandSize),
        args: argsStr.length > 0 ? argsStr.split(' ') : [],
    }
}

export class CommandsHandler {
    private prefix = '!'
    private commands: Command[] = []
    private readonly configuration: any

    constructor(configuration: any) {
        this.configuration = configuration
        this.register(this.getHelpCommand())
    }

    private getCommandConfig(command: string) {
        return this.configuration[command]
    }

    private getHelpCommand() {
        const helpEvent: Command = {
            name: 'help',
            alias: ['ajuda'],
            description: 'Lista de comandos',
            run: async () => {
                const helpEmbed = eiEmbed().setTitle('Comandos')

                this.commands.forEach((command) => {
                    if (command.name != 'help')
                        helpEmbed.addFields({
                            name: this.prefix + command.name,
                            value:
                                command.description === ''
                                    ? '\u200b'
                                    : command.description,
                            inline: true,
                        })
                })
                return helpEmbed
            },
        }

        return helpEvent
    }

    register(...commands: Command[]) {
        this.commands.push(...commands)
    }

    static areArgumentsRight(
        commandArgsLength: number,
        allArgsLength: number,
        optionalArgsLength: number,
    ) {
        return (
            commandArgsLength >= allArgsLength - optionalArgsLength &&
            commandArgsLength <= allArgsLength
        )
    }

    onMessage(message: Message) {
        if (message.author.bot) return

        let { prefix, command, args } = messageParser(message.content)
        command = command.toLowerCase()
        if (prefix !== this.prefix) return

        this.commands.forEach(async (event) => {
            if (event.name == command || event.alias?.includes(command)) {
                let eventArgs = {}

                let allArgs = Object.values(event.args || {})
                let optionalArgs = allArgs.filter((arg) => arg.optional)

                if (
                    !CommandsHandler.areArgumentsRight(
                        args.length,
                        allArgs.length,
                        optionalArgs.length,
                    )
                ) {
                    let messageStr = `${prefix}${event.name}`
                    allArgs.forEach((arg) => {
                        let examplePart = arg.example
                            ? ` (e.g. ${arg.example})`
                            : ''
                        messageStr += ` ${arg.optional ? '[' : ''}<${
                            arg.text
                        }${examplePart}>${arg.optional ? ']' : ''}`
                    })
                    return await message.channel.send(
                        `Argumentos incorretos, a sintaxe correta é: \`${messageStr}\``,
                    )
                }

                Object.keys(event.args || []).forEach((arg, idx) => {
                    eventArgs[arg] = args[idx]
                })

                try {
                    event.configuration = this.getCommandConfig(event.name)
                    const r = await event.run(message, eventArgs)
                    if (typeof r == 'string') {
                        await message.channel.send(r)
                    } else if (r instanceof MessageEmbed) {
                        await message.channel.send({ embed: r })
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }
}
