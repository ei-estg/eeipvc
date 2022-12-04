import FormData from 'form-data'
import fetch from 'node-fetch'
import moment from 'moment'
import { CookieHeader, Schedule } from '../index'

const parseSchedulesHtmlContent = (content: string) => {
    const match = content.match(/events_data\s=\s(.+);/gm)
    if (!match) return null

    const data = match[0].replace('events_data = ', '')
    return eval(data)
}

export const getSchedule = async (
    login: any,
    year: string,
    semester: string,
    klass: string,
    week: number,
) => {
    const form = new FormData()
    form.append('param_anoletivoH', year)
    form.append('param_semestreH', semester)
    form.append('param_turmaH', klass)
    form.append('param_semanaH', week)
    form.append('emissorH', 'consultageral')

    const res = await fetch(
        'https://on.ipvc.pt/v1/modulos/atividadeletiva/horario_source_v3.php',
        {
            method: 'post',
            headers: login,
            body: form,
        },
    )

    const html = await res.text()
    const parsedContent = parseSchedulesHtmlContent(html)

    if (!parsedContent) return null

    const reParsedContent: Schedule = []

    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:SS'

    parsedContent.forEach((item: any) => {
        const classRoom = item.title.split(' - ')[1]
        let id, className, classShortName, __, classType, temp

        if (item.datauc.includes('|')) {
            ;[id, className, temp] = item.datauc.split(' | ')
            ;[classShortName, __, classType] = temp.split(' - ')
        } else {
            ;[id, className, classShortName, __, classType] =
                item.datauc.split('-')
        }

        reParsedContent.push({
            start: moment(item.datadatainicio, DATE_FORMAT).unix(),
            end: moment(item.datadatafim, DATE_FORMAT).unix(),
            lesson: {
                name: className,
                shortName: classShortName,
                type: classType,
                classRoom,
            },
            id: parseFloat(id),
            teacher: item.datadocentes
                .replace(/<.+; /, '')
                .replace('</div>', ''),
            status:
                item.color === '#7f5555'
                    ? 'REPLACED'
                    : ['#ff0000', '#f4b7b7', '#f0a0a0'].includes(item.color)
                    ? 'CANCELED'
                    : item.color === '#f0a0a0'
                    ? 'NOT_TAUGHT'
                    : 'OTHER',
        })
    })

    return reParsedContent
}

export const getScheduleByDate = async (
    login: CookieHeader,
    scheduleYear: string,
    semester: string,
    klass: string,
    year: string,
    month: string,
    day: string,
) => {
    const STATIC_DATE = 403
    const staticMomentTime = moment({
        year: 2022,
        day: 12,
        month: 8,
    })

    const requestTime = moment({
        year: parseInt(year),
        day: parseInt(day),
        month: parseInt(month) - 1,
    })

    const scheduleWeek = requestTime.diff(staticMomentTime, 'weeks')
    const weekSchedule = await getSchedule(
        login,
        scheduleYear,
        semester,
        klass,
        STATIC_DATE + scheduleWeek,
    )
    if (!weekSchedule) {
        return null
    }

    return weekSchedule.filter(
        (item) =>
            moment.unix(item.start).format('DD-MM-YYYY') ===
            `${day}-${month}-${year}`,
    )
}
