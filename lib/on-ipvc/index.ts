import FormData from 'form-data'
import fetch from 'node-fetch'

import { getSchedule, getScheduleByDate } from './schedule'

export interface CookieHeader {
    Cookie: string[]
}

export type Status = 'REPLACED' | 'CANCELED' | 'NOT_TAUGHT' | 'OTHER'

export interface ScheduleItem {
    start: number
    end: number
    lesson: {
        name: string
        shortName: string
        type: string
        classRoom: string
    }
    id: number
    teacher: string
    status: Status
}

export type Schedule = ScheduleItem[]

class User {
    private readonly cookie: string[]

    constructor(cookie: string[]) {
        this.cookie = cookie
    }

    getCookieHeader(): CookieHeader {
        return {
            Cookie: this.cookie,
        }
    }

    async getSchedule(
        year: string,
        semester: string,
        klass: string,
        week: string,
    ) {
        return await getSchedule(
            this.getCookieHeader(),
            year,
            semester,
            klass,
            parseInt(week),
        )
    }

    async getScheduleByDate(
        scheduleYear: string,
        semester: string,
        klass: string,
        year: string,
        month: string,
        day: string,
    ) {
        return await getScheduleByDate(
            this.getCookieHeader(),
            scheduleYear,
            semester,
            klass,
            year,
            month,
            day,
        )
    }
}

export const login = async (username: string, password: string) => {
    const form = new FormData()
    form.append('on-user', username)
    form.append('on-pass', password)
    form.append('on-auth', 3)

    const res = await fetch('https://on.ipvc.pt/login.php', {
        method: 'post',
        body: form,
    })
    const data = await res.json()

    const headers = res.headers.raw()
    if (data.status === 'OK') return new User(headers['set-cookie'])
    throw 'Invalid Credentials'
}
