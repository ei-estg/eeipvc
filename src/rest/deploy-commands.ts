import { REST } from "@discordjs/rest";
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v10";
import { Snowflake } from "discord.js";

export interface DeployCommandsClientConfig {
  client: REST
  appId: Snowflake
}

export const deployCommands = async ({client, appId }: DeployCommandsClientConfig, commands: RESTPostAPIApplicationCommandsJSONBody[]) => {
  await client.put(Routes.applicationCommands(appId), {
    body: commands
  })
}
