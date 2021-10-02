import { Message, MessageAttachment } from 'discord.js'

import { Command } from '../Command'

export const rodaEsse: Command = {
    name: 'rodaesse',
    description:
        'Envia um charuto virtual para os que precisam descomprimir.',

    async run(message: Message) {
        const urlPool = [
            'https://media0.giphy.com/media/UfjQ4GvNMHlf1lBhOW/giphy.gif',
            'https://64.media.tumblr.com/tumblr_ly5tbgg9yj1qert2ho1_500.gif',
            'https://thumbs.gfycat.com/SomeTanAfricanpiedkingfisher-small.gif',
            'https://66.media.tumblr.com/521a199d71761032d3d6526b173063a7/tumblr_ooef1eyDxa1u521p1o1_500.gif',
            'https://64.media.tumblr.com/6dd173b742bb0381d0bbbfdcc716da2c/0160cdbc56d519f9-b8/s400x600/a93639e5d3e4497787f874b3bf6d35788dd5b41f.gif',
            'https://64.media.tumblr.com/5bcf00a47daf396dc4c2831bc570e361/c7d90793f78490ac-4c/s400x600/0542026f14ae3d0b76ed70f1dd8e485af2b5aa60.gif',
            'https://c.tenor.com/kHxFsNtIQBYAAAAM/got-weed-happy.gif',
            'https://c.tenor.com/DU0O001vBSYAAAAM/chris-tucker-smoke.gif',
            'https://c.tenor.com/YtC70TuDxekAAAAM/vader-darth.gif',
            'https://c.tenor.com/qUVaVQTNxCQAAAAM/steven-colbert-baguette.gif',
            'https://c.tenor.com/GGsZ7_cG2bAAAAAM/smoke-cigarettes.gif',
            'https://c.tenor.com/8LSToAJJFSsAAAAM/smoke-weed.gif',
            'https://c.tenor.com/hqpfoL3c5WwAAAAM/puss-pass.gif',
            'https://cdn.discordapp.com/attachments/853981264355786762/893126689410924544/Screenshot_20210930_142612.jpg'
        ]
        const attachment = new MessageAttachment(
            urlPool[Math.floor(Math.random() * urlPool.length)],
        )
        await message.channel.send(attachment)

        return undefined
    },
}
