import fetch from 'node-fetch'
import * as cheerio from "cheerio";
import normalize_string from 'normalize-strings'

const getEmailsWebsite = async () => {
    const req = await fetch('https://www.ipvc.pt/estg/a-escola/corpo-docente/')
    if (req.ok) return await req.text()
    throw Error()
}

interface Teacher {
    fullName: string
    role: string
    email?: string
}


const getTeachersEmails = async () => {
    const emailsHtml = await getEmailsWebsite()
    const $ = cheerio.load(emailsHtml)

    const teachers: Teacher[] = []

    $('.link-005').each((_, el) => {
       teachers.push({
           fullName: $(el).find('.link-005-item-title').text(),
           role: $(el).find('.link-005-item-subtitle').text(),
           email: $(el).find('.link-005-email a').attr('href')?.replace('mailto:', '')
       })
    })

   return teachers
}


export const getMailByTeacherName = async (fullName: string) => {
    const teachers = await getTeachersEmails()
    const nameTokens = normalize_string(fullName.toLowerCase()).split(' ')

    return teachers.filter(({fullName: teacherFullName}) => nameTokens.every(nameInputToken => normalize_string(teacherFullName.toLowerCase()).includes(nameInputToken)))
}

