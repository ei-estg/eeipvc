import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import { fetchWeather } from '../../../../requests/weather'
import weatherTypes from '../../../../../data/weather-type-classe.json'
import { SlashCommandBuilder } from '@discordjs/builders'
import districtIslands from '../../../../../data/distrits-islands.json'

const findType = (type: number) => {
    let returnType
    weatherTypes.data.forEach((element) => {
        if (element.idWeatherType == type) {
            returnType = element.descIdWeatherTypePT
        }
    })
    return returnType
}
const findEmoji = (type: number) => {
    let returnEmoji
    weatherTypes.data.forEach((element) => {
        if (element.idWeatherType == type) {
            returnEmoji = element.weatherEmoji
        }
    })
    return returnEmoji
}

export const getWeatherCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Previsão meterológica para 3 dias')
        .addIntegerOption((option) =>
            option
                .setName('distrito')
                .setDescription('Distrito')
                .setRequired(true),
        ),

    async run(it) {
        const location = it.options.get('distrito').value

        if (
            location === 'japao' ||
            location === 'japan' ||
            location === 'japão'
        ) {
            return 'Vai te foder Bruno, não há paciência'
        }
        const weather = await fetchWeather(location)

        if (weather == null) {
            return 'Não foi possível encontrar a localização. Escreve apenas o distrito.'
        }
        const [day1, day2, day3] = weather.data

        let day1type: string = findType(day1.idWeatherType)
        let day2type: string = findType(day2.idWeatherType)
        let day3type: string = findType(day3.idWeatherType)

        let day1emoji: string = findEmoji(day1.idWeatherType)
        let day2emoji: string = findEmoji(day2.idWeatherType)
        let day3emoji: string = findEmoji(day3.idWeatherType)

        function capitalize(word) {
            const lower = word.toLowerCase()
            return word.charAt(0).toUpperCase() + lower.slice(1)
        }

        const embed = eiEmbed()
        embed.setTitle('Previsão meteorológica para ' + capitalize(location))

        embed.addFields(
            {
                name: 'Hoje',
                value: `${day1emoji}\t ${day1type}\n🌡Temperatura ➜ ${day1.tMin}ºC ~ ${day1.tMax}ºC\n💦Precipitação ➜ ${day1.precipitaProb}%`,
            },
            {
                name: 'Amanhã',
                value: `${day2emoji}\t ${day2type}\n🌡Temperatura ➜ ${day2.tMin}ºC~ ${day2.tMax}ºC\n💦Precipitação ➜ ${day2.precipitaProb}%`,
            },
            {
                name: 'Depois de amanhã',
                value: `${day3emoji}\t ${day3type}\n🌡Temperatura ➜ ${day3.tMin}ºC ~ ${day3.tMax}ºC\n💦Precipitação ➜ ${day3.precipitaProb}%`,
            },
        )
        embed.setFooter({
            text: 'Powered by Engenheiro Rodrigo Sá',
        })
        embed.setColor('#0099ff')
        return embed
    },
}
