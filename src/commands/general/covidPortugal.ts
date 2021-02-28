import { Command } from '../Command'
import { getCovidInPortugalForDate } from '../../requests/utils'
import { eiEmbed } from '../../defaults/embed'
import moment from 'moment'

const DATE_FORMAT = 'DD-MM-YYYY'

export const covidPortugalCommand: Command = {
    name: 'covid-pt',
    description: 'COVID-19 em portugal',

    args: {
        day: {
            text: 'dia',
            optional: true,
            check: () => true,
        },
    },

    async run(_, { day = moment().format(DATE_FORMAT) }) {
        let covidData = await getCovidInPortugalForDate(day)
        let covidDataPreviousDay = await getCovidInPortugalForDate(
            moment(day, DATE_FORMAT).subtract(1, 'day').format(DATE_FORMAT),
        )

        if (!covidData || !covidDataPreviousDay)
            return `Sem dados para o dia ${day}`

        let increaseDif =
            covidDataPreviousDay.confirmed.new - covidData.confirmed.new
        let increasePercentage = (increaseDif / covidData.confirmed.new) * 100

        return eiEmbed()
            .setTitle(`🇵🇹 Covid Portugal`)
            .setDescription(
                `Balanço ${increaseDif < 0 ? '**positivo**' : '**negativo**'} ${
                    covidData.confirmed.new
                } → ${
                    covidDataPreviousDay.confirmed.new
                } (${increasePercentage.toFixed(2)}%)`,
            )
            .addFields(
                {
                    name: 'Confirmados Norte',
                    value: `${covidData.confirmed.north} (+${
                        covidData.confirmed.north -
                        covidDataPreviousDay.confirmed.north
                    })`,
                },
                {
                    name: 'Confirmados Centro',
                    value: `${covidData.confirmed.center} (+${
                        covidData.confirmed.center -
                        covidDataPreviousDay.confirmed.center
                    })`,
                },
                {
                    name: 'Confirmados Alentejo',
                    value: `${covidData.confirmed.alentejo} (+${
                        covidData.confirmed.alentejo -
                        covidDataPreviousDay.confirmed.alentejo
                    })`,
                },
                {
                    name: 'Total Confirmados',
                    value: `${covidData.confirmed.total} (+${covidData.confirmed.new}) `,
                },
                {
                    name: 'Total Recuperados',
                    value: `${covidData.recovered} (+${
                        covidData.recovered - covidDataPreviousDay.recovered
                    })`,
                },
                {
                    name: 'Total Obitos',
                    value: `${covidData.deaths} (+${
                        covidData.deaths - covidDataPreviousDay.deaths
                    })`,
                },
            )
    },
}
