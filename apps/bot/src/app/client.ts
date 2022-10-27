import { Client, ClientOptions } from 'discord.js'

import { REST } from '@discordjs/rest'

export class ClientManager {
    readonly restClient: REST
    readonly client: Client

    constructor(public config, options: ClientOptions) {
        this.restClient = new REST({ version: '10' })
        this.client = new Client(options)
    }

    async run(token: string) {
        await this.client.login(token)
        this.restClient.setToken(token)
    }
}
