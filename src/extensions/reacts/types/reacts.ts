import { Snowflake } from 'discord.js'

export interface FileReacts {
    [channelId: string]: FileReactsMessages
}

interface FileReactsMessages {
    [messageId: string]: FileReactsMessageReact | FileReactsMessageReact[]
}

interface FileReactsMessageReact {
    emoji: string
    emojiId?: Snowflake
    roleId: Snowflake
    group?: string
}

export interface React {
    channelId: Snowflake
    messageId: Snowflake
    emoji: string
    emojiId?: string
    roleId: Snowflake
    group?: string
}
