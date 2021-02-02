import { Message } from 'discord.js'
import { Command } from './Command'
import { eiEmbed } from '../defaults/embed'
import ytdl from 'ytdl-core'

let currSong: any

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

        currSong = await connection.play(
            ytdl(musicLink, { filter: 'audioonly' }),
        )
        currSong.on('finish', () => connection.disconnect())

        const songInfo = await ytdl.getInfo(musicLink);
        const song = {
            title: songInfo.videoDetails.title,
            artist:  songInfo.videoDetails.media.artist,
            thumbnails: songInfo.videoDetails.thumbnails
        };
        console.log(songInfo.videoDetails)

        const playEmbed = eiEmbed()
        playEmbed.setThumbnail(song.thumbnails[0].url)
        playEmbed.addFields({
            name: "A reproduzir ",
            value: song.title
        })
        playEmbed.addFields({
            name: "Artista ",
            value: song.artist
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