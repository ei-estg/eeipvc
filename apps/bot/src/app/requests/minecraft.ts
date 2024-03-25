import minecraft from 'minecraft-server-util'

export const getMinecraftServerData = () => minecraft.status('fabric.capaz.dev').then((response: any) => response).catch(() => 'O servidor está offline.')
