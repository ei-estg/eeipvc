import {
    Channel,
    ChatInputCommandInteraction,
    Client,
    CommandInteraction,
    Message,
    Embed,
    EmbedBuilder,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders/dist/interactions/slashCommands/options/string'

type CommandMessageExecutionReturn =
    | Promise<EmbedBuilder | string | undefined | void>
    | AsyncGenerator<EmbedBuilder | string | undefined>
    | void
    | string
export type CommandMessage = (
    message: Message,
    args?: any,
) => CommandMessageExecutionReturn
export type SlashCommandExecution = (
    ChatInputCommandInteraction,
) => CommandMessageExecutionReturn

export abstract class SlashCommand {
    name?: string
    description?: string
    alias?: string[]

    builder?:
        | SlashCommandBuilder
        | SlashCommandStringOption
        | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>

    abstract run: SlashCommandExecution

    protected constructor(public config?: any) {}
}
