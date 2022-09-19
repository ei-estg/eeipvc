import { Cinema, getMoviesByLocation } from '../../lib/cineplace'
import { eiEmbed } from '../defaults/embed'
import { TextChannel } from 'discord.js'
import moment from 'moment'

export const moviesTimmerHander = async (channel: TextChannel) => {
    try {
        const messages = await channel.messages.fetch()

        messages.forEach((message) => message.delete())

        const movies = await getMoviesByLocation(Cinema.EstacaoViana)
        movies.forEach((movie) => {
            const embed = eiEmbed()
            embed.setThumbnail(movie.imageUrl)
            embed.setTitle(movie.name)
            embed.addFields([{
                name: 'Horários',
                value: movie.dateTimes.map(
                    (dateTime) =>
                        `${moment(dateTime.date, 'YYYY-MM-DD').format(
                            'DD MMM',
                        )} - ${dateTime.times.join(' | ')}`,
                ).join(' '),
            }])
            channel.send({ embeds: [embed] })
        })

        const currentMomentTime = moment()
        await channel.edit({
            topic: `Filmes a serem exibidos no Cineplace - Estação Viana. Atualizado no dia ${currentMomentTime.format(
                'DD-MM-YYYY',
            )} às ${currentMomentTime.format('HH:mm')}`,
        })
        console.log(currentMomentTime)
    } catch (error) {}
}
