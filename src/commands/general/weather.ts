import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import { fetchWeather } from '../../requests/weather'
import weatherTypes from '../../../data/weather-type-classe.json'

export const getWeatherCommand: Command = {
  name: 'meteo',
  description: 'Previsão meterológica par 3 dias',
  args: {
    location: {
      text: 'Distrito',
      check: () => true,
    },
  },

  async run(_, { location }) {
    const weather = await fetchWeather(location)
    const day1 = weather.data[0];
    const day2 = weather.data[1];
    const day3 = weather.data[2];
    console.log("dia1", day1)
    console.log("dia2",day2)
    console.log("dia3", day3)
    let day1type
    console.log(weatherTypes.data)
    weatherTypes.data.forEach(element => {
      if (element.idWeatherType == day1.idWeatherType) {
        day1type = element.descIdWeatherTypePT
      }
    });
    let day2type
    weatherTypes.data.forEach(element => {
      if (element.idWeatherType == day2.idWeatherType) {
        day2type = element.descIdWeatherTypePT
      }
    });
   let day3type
    weatherTypes.data.forEach(element => {
      if (element.idWeatherType == day3.idWeatherType) {
        day3type = element.descIdWeatherTypePT
      }
    });

    function capitalize(word) {
      const lower = word.toLowerCase();
      return word.charAt(0).toUpperCase() + lower.slice(1);
    }
    const embed = eiEmbed()
    embed.setTitle('Previsão meterológica para ' + capitalize(location))

    embed.addField('Hoje', `${day1type}\nTemperatura ➜ ${day1.tMin}ºC ~ ${day1.tMax}ºC`)
    embed.addField('Amanhã', `${day2type}\nTemperatura ➜ ${day2.tMin}ºC~ ${day2.tMax}ºC`)
    embed.addField('Depois de amanhã', `${day3type}\nTemperatura ➜ ${day3.tMin}ºC ~ ${day3.tMax}ºC`)
    return embed
  },
}
