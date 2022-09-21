import { REST } from "@discordjs/rest";
import {
  APIApplicationCommandStringOption,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes
} from "discord-api-types/v10";
import { Snowflake } from "discord.js";

export interface DeployCommandsClientConfig {
  client: REST
  appId: Snowflake
}

export const _deleteCommands = async ({client, appId}) => {
  //client.get(Routes.applicationCommands(appId))
  //await client.delete(Routes.applicationCommands(appId))
}

export const deployCommands = async ({client, appId }: DeployCommandsClientConfig, commands: (RESTPostAPIApplicationCommandsJSONBody | APIApplicationCommandStringOption)[]) => {
  await _deleteCommands({ client, appId })
  await client.put(Routes.applicationCommands(appId), {
    body: commands
  })
}
