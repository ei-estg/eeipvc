import { TimerCallable } from '../base/TimerCallable'
import moment from 'moment'
import { getMealsEmbed } from '../../commands/list/sas/meals'

export const mealsTimer: TimerCallable = {
    timerNames: ['meals'],

    async run(channel) {
        const nextDay = moment().add(1, 'day').format('YYYY-MM-DD')
        const meals = await getMealsEmbed(nextDay)
        if (typeof meals === 'string') {
            return channel.send(meals)
        } else {
            return channel.send({ embeds: [meals] })
        }
    },
}
