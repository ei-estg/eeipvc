import { TimerCallable } from '../base/TimerCallable'

export const test: TimerCallable = {
    timerNames: ['testar'],

    async run(channel) {
        console.log('testar chron')
        channel.send('test')
    },
}
