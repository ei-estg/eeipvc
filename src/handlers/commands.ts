import { Message, MessageEmbed } from 'discord.js'

import { Event } from '../events/Event'

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

export class CommandHandler {
    private prefix = '!'
    private commands: Event[] = []

    addCommand(...commands: Event[]) {
        this.commands.push(...commands)
    }

    handle(message: Message) {
        if (message.author.bot) return ;

        const { prefix, command, args } = messageParser(message.content)
        if (prefix !== this.prefix) return

        this.commands.forEach(async (event) => {
            if (event.name == command || event.alias?.includes(command)) {
                let eventArgs = {}

                if (
                    event.args &&
                    args.length != Object.keys(event.args).length
                ) {
                    let messageStr = `${prefix}${event.name}`
                    Object.values(event.args).forEach(arg => {
                        let examplePart =  arg.example ? ` (e.g. ${arg.example})` : ''
                        messageStr += ` ${arg.optional ? '[' :''}<${arg.text}${examplePart}>${arg.optional ? ']' :''}`
                    })
                    return await message.channel.send(`Argumentos incorretos, a sintaxe correta é: \`${messageStr}\``)
                }

                Object.keys(event.args || []).forEach((arg, idx) => {
                    eventArgs[arg] = args[idx]
                })

                try {
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
