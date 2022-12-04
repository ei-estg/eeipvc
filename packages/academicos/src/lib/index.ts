import { URLSearchParams } from 'url'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

const BASE_URL = 'https://academicos.ipvc.pt/netpa'

const extractCookie = (headers: string[] | undefined) => {
    const cookies: string[] = []
    if (!headers) return ''
    headers.forEach((header) => cookies.push(header.split(';')[0]))
    return cookies.join('; ').slice(0, -1)
}

const getUserAgent = () =>
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'

type UserType = 'Aluno' | string

export interface Course {
    readonly id: number
    readonly name: string
}

export interface User {
    school: string
    course: Course
    fullName: string
    number: number
    type: UserType
}

export const login = async (
    username: string,
    password: string,
): Promise<User> => {
    const loginReq = await fetch(`${BASE_URL}/ajax?stage=loginstage`, {
        method: 'post',
        body: new URLSearchParams({
            _formsubmitstage: 'loginstage',
            _formsubmitname: 'login',
            ajax_mode: 'true',
            _user: username,
            _pass: password,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': getUserAgent(),
        },
    })
    const loginData: any = await loginReq.json()
    if (!loginData.success) throw 'Invalid credentials'

    const pageRequest = await fetch(`${BASE_URL}/page?stage=difhomestage`, {
        headers: {
            Cookie: extractCookie(loginReq.headers.raw()['set-cookie']),
            'User-Agent': getUserAgent(),
        },
    })

    const pageData = await pageRequest.text()
    const $ = cheerio.load(pageData)

    const data: string[] = []
    $('.perfilAreaContent ul li').each((i, v) => {
        data.push((v.firstChild as any).data)
    })

    const [school, typeAndNumumber, name, course] = data
    const [type, number] = typeAndNumumber.split(' Nº ')

    const tmp = course.split(']')
    const courseId = tmp[0].slice(1)
    const courseName = tmp[1].slice(1)

    return {
        school,
        type,
        fullName: name,
        number: parseInt(number),
        course: {
            id: parseInt(courseId),
            name: courseName,
        },
    }
}
