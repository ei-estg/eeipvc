import { BaseInteraction, EmbedBuilder } from 'discord.js'

import { SlashCommand } from './base/SlashCommand'
import { SlashCommandBuilder } from '@discordjs/builders'
import { deployCommands } from '../../rest/deploy-commands'
import { ClientManager } from '../../client'
import { BaseExtension } from '../base/BaseExtension'
import { getCommandFilesPath } from '../../utils/file'

export class CommandsExtension<T> extends BaseExtension<T> {
    private slashCommands: SlashCommand[] = []

    constructor(_manager: ClientManager) {
        super(_manager)

        const { client } = _manager

        client.on('interactionCreate', this._interactionCreate.bind(this))
    }

    protected async _setup() {
        const { client, restClient } = this._manager
        const clientApp = await client.application!

        await deployCommands(
            {
                client: restClient,
                appId: clientApp.id,
            },
            this.interactionReadyCommandsJSONData,
        )
    }

    async _interactionCreate(interaction: BaseInteraction) {
        if (!interaction.isChatInputCommand()) return

        const calledCommand = this.slashCommands.find(
            (command) => command.builder!.name == interaction.commandName,
        )
        if (!calledCommand) return

        const ret = await calledCommand.run(interaction)
        if (ret instanceof EmbedBuilder) {
            await interaction.reply({
                embeds: [ret],
            })
        } else if (typeof ret == 'string') {
            await interaction.reply(ret)
        } else {
            console.log(ret)
        }
    }

    private _registerSlashCommand(slashCommand: SlashCommand) {
        slashCommand.builder =
            slashCommand.builder ||
            new SlashCommandBuilder()
                .setName(slashCommand.name!)
                .setDescription(slashCommand.description!)
        slashCommand.config = this._manager.config
        this.slashCommands.push(slashCommand)
    }

    registerSlashCommands(...commands: SlashCommand[]) {
        commands.forEach((command) => this._registerSlashCommand(command))
    }

    registerSlashCommandsAutomatically() {
        getCommandFilesPath().forEach((commandFilePath) => {
            const command = require(commandFilePath)
            Object.values(command).forEach((exportedCommand) => {
                if (exportedCommand instanceof SlashCommand)
                    this._registerSlashCommand(exportedCommand)
            })
        })
    }

    get interactionReadyCommandsJSONData() {
        return (
            this.slashCommands.map((command) => command.builder!.toJSON()) || []
        )
    }
}
