import { calendar_v3, google } from 'googleapis'
import * as path from 'path'

const CREDENTIALS_FILE_PATH = path.join(
    __dirname,
    '..',
    'estg-calendar-9307321fecf2.json',
)

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
})

const calendar = google.calendar({
    version: 'v3',
    auth,
})

export const getCalendarEvents = async (): Promise<
    calendar_v3.Schema$Event[] | undefined
> => {
    const events = await calendar.events.list({
        calendarId: 'nq38046oesam5n3oqigm2esrus@group.calendar.google.com',
    })
    return events.data.items?.slice(1)
}
