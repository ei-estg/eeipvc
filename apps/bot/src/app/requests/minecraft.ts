import minecraft from 'minecraft-server-util'

export const getMinecraftServerData = () => minecraft.status('fabric.capaz.dev', { port: 25565 }).then((response: any) => response).catch(() => 'O servidor está offline.')
