import { Message } from 'discord.js'
import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import ytdl from 'ytdl-core'

let currSong: any
let queue: string[] = []

export const playCommand: Command = {
    name: 'play',
    description: 'Reproduz uma música',
    args: {
        musicLink: {
            text: 'link',
            check: () => true,
        },
    },
    async run(message: Message, { musicLink }) {
        if (!message.member)
            return 'Precisas de estar num canal de voz para utilizar este comando!'
        let channel = message.member.voice.channel

        if (!channel) return 'Erro! Enviaste uma mensagem privada!'
        let connection = await channel.join()
        if (queue.length > 1) {
            queue.push(musicLink)
            return "Música adicionada à queue"
        }
        queue.push(musicLink)
        currSong = await connection.play(
          ytdl(queue[0], { filter: 'audio', requestOptions: { headers: { cookie: process.env.YTDL_COOKIE } } }),
        )
        currSong.on('finish', () => {
            queue.shift()
            connection.play(
              ytdl(queue[0], { filter: 'audio', requestOptions: { headers: { cookie: process.env.YTDL_COOKIE } } }),
            )
        })


        const songInfo = await ytdl.getInfo(musicLink);
        const song = {
            title: songInfo.videoDetails.title,
            artist:  songInfo.videoDetails.media.artist,
            thumbnails: songInfo.videoDetails.thumbnails
        };

        const playEmbed = eiEmbed()
        playEmbed.setThumbnail(song.thumbnails[0].url)
        playEmbed.addFields({
            name: "A reproduzir ",
            value: song.title
        })
        playEmbed.addFields({
            name: "Artista ",
            value: song.artist ? song.artist : 'Desconhecido'
        })
        return playEmbed
    },
}

export const stopCommand: Command = {
    name: 'stop',
    description: 'Para a reprodução da música',
    async run(message: Message) {
        if (!message.member)
            return 'Precisas de estar num canal de voz para utilizar este comando!'
        let channel = message.member.voice.channel
        if (!channel) return 'Erro! Enviaste uma mensagem privada!'
        let connection = await channel.leave()
        return 'Reprodução terminada'
    },
}

export const pauseCommand: Command = {
    name: 'pause',
    description: 'Pausa a reprodução da música',
    async run(message: Message) {
        currSong.pause()
        return 'Música pausada'
    },
}

export const resumeCommand: Command = {
    name: 'resume',
    description: 'Continua reprodução da música',
    async run(message: Message) {
        currSong.resume()
        return 'Música retomada'
    },
}
