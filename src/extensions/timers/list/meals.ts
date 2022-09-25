import { TimerCallable } from '../base/TimerCallable'
import moment from 'moment'

export const mealsTimer: TimerCallable = {
    timerNames: ['meals'],

    async run(channel) {
        const nextDay = moment().add(1, 'day').format('YYYY-MM-DD')
    },
}
