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
        try {
            let meals = await getMealsNew(date)
            console.log(meals)

            if (!meals) {
                return 'Erro desconhecido'
            }

            if (!meals[date]) {
                return 'Sem ementas diponíveis para o dia.'
            }

            let lunchMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Lunch',
            )
            const mealsEmbed = sasEmbed()
                .setTitle(`Ementa dia ${date} - Almoço`)
                .addFields({
                    name: '⠀',
                    value: `🍴 **${lunchMeals[0].time}**`,
                })
            lunchMeals.forEach((meal) => {
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
