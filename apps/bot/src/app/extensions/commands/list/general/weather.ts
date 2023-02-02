import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import { fetchWeather } from '../../../../requests/weather'
import weatherTypes from '../../../../../assets/data/weather-type-classe.json'
import { SlashCommandBuilder } from '@discordjs/builders'
import districtIslands from '../../../../../assets/data/distrits-islands.json'

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

const findLocationName = (idLocation: string) => {
    let location = ''
    districtIslands.data.forEach((local) => {
        if (local.globalIdLocal === +idLocation) {
            location = local.local
        }
    })
    return location
}

export const getWeatherCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Previsão meterológica para 3 dias')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('distrito')
                .setDescription('Exemplo: aquario/carneiro/capricornio')
                .setChoices(
                    ...districtIslands.data.map((location) => {
                        return {
                            name: location.local,
                            value: location.globalIdLocal.toString(),
                        }
                    }),
                ),
        ),

    async run(it) {
        const locationID = it.options.get('distrito').value

        const locationName = findLocationName(locationID)

        if (
            locationID === 'japao' ||
            locationID === 'japan' ||
            locationID === 'japão'
        ) {
            return 'Vai te foder Bruno, não há paciência.'
        }
        const weather = await fetchWeather(locationID)

        if (weather == null) {
            return 'Não existe previsão disponível.'
        }
        const [day1, day2, day3] = weather.data

        const day1type: string = findType(day1.idWeatherType)
        const day2type: string = findType(day2.idWeatherType)
        const day3type: string = findType(day3.idWeatherType)

        const day1emoji: string = findEmoji(day1.idWeatherType)
        const day2emoji: string = findEmoji(day2.idWeatherType)
        const day3emoji: string = findEmoji(day3.idWeatherType)

        const embed = eiEmbed()
        embed.setTitle(`Previsão meterológica para ${locationName}`)

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
