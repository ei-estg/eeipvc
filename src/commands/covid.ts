import { Message } from 'discord.js'
import { Command } from './Command'
import IPVCCovidCases from '../../data/ipvc-covid-cases.json'
import { eiEmbed } from '../defaults/embed'

export const covidCommand: Command = {
    name: 'covid',
    description: 'Contagem de casos de COVID-19 no IPVC',

    args: {
        school: {
            text: 'escola',
            optional: true,
            check: () => true
        },
    },

    async run(message: Message, { school }) {
        console.log(school)
        const cases = IPVCCovidCases.covidCases
        const currentReport = cases[cases.length - 1]
        const previousReport = cases[cases.length - 2]

        const covidEmbed = eiEmbed().setTitle('📈 COVID-19 Status')
        covidEmbed.setFooter(`Ultima atualização ${currentReport.date}`)

        let percentage: number
        let totalCount = 0
        currentReport.counts.forEach((count, i) => {
            if (!school || count.zone == school) {

                totalCount += count.count

                percentage =
                    previousReport.counts[i].count != 0
                        ? ((count.count - previousReport.counts[i].count) /
                        previousReport.counts[i].count) *
                        100
                        : 100
                covidEmbed.addFields({
                    name: `${(percentage == 0
                        ? '🟡'
                        : percentage > 0
                            ? '🔴'
                            : '🟢')} ${count.zone} → ${count.count} casos ativos`,
                    value: `${
                        count.count - previousReport.counts[i].count
                    } novos casos* | ${percentage >= 0 ? '+' : '-'}${Math.abs(
                        percentage,
                    ).toFixed(2)}%*`,
                })
            }
        })

        covidEmbed.addFields({
            name: 'Total de casos na comunidade',
            value: '⚠️ ' + `**${totalCount}** casos`,
        })

        return covidEmbed
    },
}
