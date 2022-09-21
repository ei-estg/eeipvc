import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import { getMinecraftServerData } from '../../../../requests/minecraft'

export const minecraftCommand: SlashCommand = {
    name: 'minecraft',
    description: 'Verifica o estado atual do servidor de minecraft',

    async run() {
        const embed = eiEmbed()
        const data = await getMinecraftServerData()
        embed.setTitle('Servidor Minecraft')
        embed.addFields(
            {
                name: 'Servidor',
                value: `${data.host}:${data.port}`,
            },
            {
                name: 'Utilizadores',
                value: `Online: ${data.onlinePlayers}`,
            },
        )
        return embed
    },
}
