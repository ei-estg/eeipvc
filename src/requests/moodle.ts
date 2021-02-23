import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

const fetchMoodle = (wsFunction: string) => {
    const domain = 'https://elearning.ipvc.pt/ipvc2020'
    const apiGateway = '/webservice/rest/server.php?'

    return fetch(
        domain +
            apiGateway +
            new URLSearchParams({
                wstoken: process.env.MOODLE_AUTH_TOKEN,
                wsfunction: wsFunction,
                moodlewsrestformat: 'json',
            }).toString(),
    )
}

interface MoodleCalendarEvent {
    id: number
    name: string
    url: string
    maxTimestamp: number
    course: MoodleCourse
}

interface MoodleCourse {
    id: number
    name: string
    shortName: string
}

export const getMoodleCalendarEvents = async () => {
    let req = await fetchMoodle('core_calendar_get_calendar_upcoming_view')

    let data = await req.json()
    let reData: MoodleCalendarEvent[] = []

    data.events.forEach((event) =>
        reData.push({
            id: event.id,
            name: event.name,
            url: event.url,
            maxTimestamp: event.timestart,
            course: {
                id: event.course.id,
                shortName: event.course.shortname,
                name: event.course.fullname,
            },
        }),
    )
    return reData
}
