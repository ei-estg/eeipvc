import { Event } from '../Event'
import { getMeals } from '../requests/sas'
import { sasEmbed } from '../defaults/embed'
import { getISODate } from '../../utils/time'

export const mealsEvent: Event = {
    name: 'ementas',
    description: 'Ementas do SAS',

    args: {
        date: {
            text: 'data',
            check: () => true,
            example: '2020-10-12',
            // TODO
            // Implement checks and help command on different number or wrong arguments
        },
    },

    async run(message, { date = getISODate() }) {
        try {
            let meals = await getMeals(date, date)

            if (!meals[date]) {
                return 'Sem ementas diponíveis para o dia.'
            }

            let lunchMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Lunch',
            )
            const mealsEmbed = sasEmbed()
                .setTitle(`Ementa dia ${date}`)
                .addFields({
                    name: '⠀',
                    value: `🍴 **${lunchMeals[0].time}**`,
                })
            lunchMeals.forEach((meal) => {
                mealsEmbed.addFields({
                    name: meal.type,
                    value:
                        meal.name.charAt(0) + meal.name.slice(1).toLowerCase(),
                })
            })
            return mealsEmbed
        } catch (err) {
            console.error(err)
        }
    },
}
