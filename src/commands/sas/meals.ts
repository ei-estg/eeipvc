import { Command } from '../Command'
import { getMealsNew } from '../../requests/sas'
import { sasEmbed } from '../../defaults/embed'
import { getISODate } from '../../utils/time'
import { normalize } from '../../utils/string'

export const mealsCommand: Command = {
    name: 'ementas',
    description: 'Ementas do SAS',

    args: {
        date: {
            text: 'data',
            check: () => true,
            optional: true,
            example: '2020-10-12',
            // TODO
            // Implement checks and help command on different number or wrong arguments
        },
    },

    async run(message, { date = getISODate() }) {
        if (date == 'gabs') {
            return '<:pepesneakyevil:958133599679443014>'
        }
        try {
            let meals = await getMealsNew(date)

            if (!meals) {
                return 'Erro desconhecido'
            }

            if (!meals[date]) {
                return 'Sem ementas diponíveis para o dia.'
            }

            let lunchMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Lunch',
            )
            let dinnerMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Dinner',
            )
            const mealsEmbed = sasEmbed()
                .setTitle(`Ementa dia ${date}`)
                .addFields({
                    name: 'Almoço',
                    value: `🍴 **${lunchMeals[0].time}**`,
                })
            lunchMeals.forEach((meal) => {
                mealsEmbed.addFields({
                    name: `${meal.type} - ${meal.price?.toFixed(2) ?? '--'}€`,
                    value: normalize(meal.name),
                })
            })
            mealsEmbed.addFields({
                name: 'Jantar',
                value: `🍴 **${dinnerMeals[0].time}**`,
            })
            dinnerMeals.forEach((meal) => {
                mealsEmbed.addFields({
                    name: `${meal.type} - ${meal.price?.toFixed(2) ?? '--'}€`,
                    value: normalize(meal.name),
                })
            })
            return mealsEmbed
        } catch (err) {
            console.error(err)
        }
    },
}
