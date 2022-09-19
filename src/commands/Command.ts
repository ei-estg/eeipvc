import {
    Channel,
    ChatInputCommandInteraction,
    Client,
    CommandInteraction,
    Message, Embed, EmbedBuilder
} from "discord.js";

export interface EventArgument {
    text: string
    example?: string
    optional?: boolean

    parse?(data: any): any

    check(content: string): boolean
}

type CommandMessageExecutionReturn = Promise<EmbedBuilder | string | undefined | void> | AsyncGenerator<EmbedBuilder | string | undefined> | void;
export type CommandMessage = (message: Message, args?: any,) => CommandMessageExecutionReturn
export type SlashCommandExecution = (ChatInputCommandInteraction) => CommandMessageExecutionReturn


export interface BaseCommand {
    name: string
    description: string
    alias?: string[]
}


export interface Command extends BaseCommand {
    alias?: string[]
    configuration?: any

    args?: {
        [key: string]: EventArgument
    }

    run: CommandMessage
}

export interface SlashCommand extends BaseCommand {
    run: SlashCommandExecution
}
