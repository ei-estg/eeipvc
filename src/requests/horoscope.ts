import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export interface Prediction {
    text: string
    image: string
    zodiac: string
}

export const getHoroscope = async (
    sign: String,
): Promise<Prediction | null> => {
    const url = `https://lifestyle.sapo.pt/astral/previsoes/maya?signo=${sign}`
    const response = await fetch(url)
    if (!response) {
        return null
    }
    const data = await response.text()

    if (!data) {
        return null
    }
    const $ = cheerio.load(data)
    const text = $('#diaria .horoscope-text p').last().text()
    const image = 'https:' + $('.predictor-image img').attr('src')
    const signo = $('#diaria h4').first().text().split('-')[0].trim()
    return {
        text: text,
        image: image,
        zodiac: signo,
    }
}
