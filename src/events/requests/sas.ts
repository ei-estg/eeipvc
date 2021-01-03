import fetch from 'node-fetch'
import { parse } from 'fast-xml-parser'

export interface BusStop {
    id: number
    name: string
    description: string
    address: string
}

export const getBusStops = async () => {
    let req = await fetch(
        'http://apps.sas.ipvc.pt/sas-ws/mobile/getLocaisBus.php',
    )
    let data = await req.json()
    let reData: BusStop[] = []

    data.forEach((v) => {
        reData.push({
            id: v.idlocal,
            name: v.nome,
            description: v.descricao,
            address: v.morada,
        })
    })
    return reData
}

export interface New {
    title: string
    link: string
    description: string
}

export const getNews = async () => {
    let req = await fetch('http://www.ipvc.pt/noticias-rss')
    let text = await req.text()
    let data: New[] = parse(text).rss.channel.item
    return data
}

export interface Meal {
    id: number
    name: string
    englishName: string
    type: string
    englishType: string
    time: string
    englishTime: string
}

export interface Meals {
    [date: string]: Meal[]
}

export const getMeals = async (startDate: string, endDate: string) => {
    let req = await fetch(
        `http://apps.sas.ipvc.pt/sas-ws/mobileV2/obtempordata4.php?datai=${startDate}&dataf=${
            endDate ? endDate : startDate
        }`,
    )
    let data = await req.json()
    let reData: Meals = {}

    Object.values(data.posts).forEach((dayMeals: any) => {
        dayMeals.forEach(({ post: meal }) => {
            if (!reData[meal.Date_Ementa]) {
                reData[meal.Date_Ementa] = []
            }
            reData[meal.Date_Ementa].push({
                id: meal.id_Prato,
                name: meal.nome_Prato,
                englishName: meal.nome_Prato_en,
                type: meal.nome_Tipo,
                englishType: meal.nome_Tipo_en,
                time: meal.altura_AlturaDia,
                englishTime:
                    meal.altura_AlturaDia == 'Almoço' ? 'Lunch' : 'Dinner',
            })
        })
    })

    return reData
}
