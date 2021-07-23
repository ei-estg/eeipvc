import { TextChannel } from 'discord.js'
import { getMinecraftServerData } from '../requests/minecraft'

export const minecraftTimmerHandler = async (channel: TextChannel) => {
    const data = await getMinecraftServerData()

    await channel.edit({
        topic: `Servidor: ${data.host}:${data.port} | Jogadores online: ${data.onlinePlayers}`
    })
}
