import { BaseInteraction, ClientApplication, Embed, EmbedBuilder, Message } from "discord.js";

import { Command, SlashCommand, SlashCommandExecution } from "../commands/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { deployCommands } from "../rest/deploy-commands";

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

interface RESTProps {
    restClient: REST
    clientApp: ClientApplication
}

interface SlashCommandInitialized {
    data: SlashCommandBuilder
    execute: SlashCommandExecution
}

export class CommandsHandler {
    private prefix = '!'
    private slashCommands: SlashCommandInitialized[] = []
    private vanillaCommands: Command[] = []
    private props!: RESTProps

    constructor(private configuration: any) {
    }

    setProps(props: RESTProps) {
        this.props = props
    }

    private getCommandConfig(command: string) {
        return this.configuration[command]
    }

    private _registerSlashCommand({name, description, run}: SlashCommand) {
        this.slashCommands.push({
            data: new SlashCommandBuilder()
              .setName(name)
              .setDescription(description),
            execute: run
        })
    }

    private _registerVanillaCommand(command: Command) {
        this.vanillaCommands.push(command)
    }

    registerSlashCommands(...commands: SlashCommand[]) {
        commands.forEach(command => this._registerSlashCommand(command))
    }

    registerVanillaCommands(...commands: Command[]) {
        commands.forEach(command => this._registerVanillaCommand(command))
    }



    get interactionReadyCommandsJSONData() {
        return this.slashCommands.map(command => command.data.toJSON())
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

    async onReady() {
        await deployCommands({
                client: this.props.restClient,
                appId: this.props.clientApp.id,
            },
          this.interactionReadyCommandsJSONData
        )
    }

    async onInteractionCreate(interaction: BaseInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const calledCommand = this.slashCommands.find(command => command.data.name == interaction.commandName)
        if (!calledCommand) return;

        const ret = await calledCommand.execute(interaction)
        if (ret instanceof EmbedBuilder) {
            await interaction.reply({
                embeds: [ret]
            })
        }
    }

    onMessage(message: Message) {
        if (message.author.bot) return

        let { prefix, command, args } = messageParser(message.content)
        command = command.toLowerCase()
        if (prefix !== this.prefix) return

        this.vanillaCommands.forEach(async (event) => {
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
                    } else if (r instanceof Embed) {
                        await message.channel.send({ embeds: [r]})
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }
}
