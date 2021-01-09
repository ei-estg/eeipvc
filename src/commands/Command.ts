import { Message, PermissionFlags, MessageEmbed } from 'discord.js'

export interface EventArgument {
    text: string
    example?: string
    optional?: boolean

    parse?(data: any): any

    check(content: string): boolean
}

export interface Command {
    name: string
    alias?: string[]
    description: string
    permissions?: PermissionFlags[]

    args?: {
        [key: string]: EventArgument
    }

    run(
        message?: Message,
        args?: any,
    ): Promise<MessageEmbed | string | undefined>
}
