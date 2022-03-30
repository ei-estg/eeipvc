import fetch from 'node-fetch'
import { parse } from 'fast-xml-parser'
import moment from 'moment'

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
    price?: number
    stockQuantity?: number
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

export const getMealsNew = async (date: string) => {
    const webReq = await fetch(
        'https://sasocial.sas.ipvc.pt/api/authorization/authorize/device-type/WEB',
        {
            method: 'POST',
            body: JSON.stringify({}),
        },
    )

    const authorizationToken = (await webReq.json()).data[0].token
    const cookie = webReq.headers
        .raw()
        ['set-cookie'][0].split('=')[1]
        .split(';')[0]

    const headerState = {
        cookie: `refreshTokenWEB=${cookie}`,
        authorization: `Bearer ${authorizationToken}`,
    }

    const validateReq = await fetch(
        'https://sasocial.sas.ipvc.pt/api/authorization/authorize/validate-token',
        {
            method: 'POST',
            headers: headerState,
        },
    )

    const loginReq = await fetch(
        'https://sasocial.sas.ipvc.pt/api/authorization/authorize/device-type/WEB',
        {
            method: 'POST',
            body: JSON.stringify({
                email: `${process.env.ON_AUTH_USERNAME}@ipvc.pt`,
                password: process.env.ON_AUTH_PASSWORD,
            }),
            headers: headerState,
        },
    )
    const webReqData = await loginReq.json()
    if (webReqData.errors.length > 0) return null
    const token = webReqData.data[0].token

    const req = await fetch(
        `https://sasocial.sas.ipvc.pt/api/alimentation/menu/service/1/menus/${date}/lunch?withRelated=taxes,file`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    let data = await req.json()

    let reData: Meals = {}
    data.data.forEach((innerMeal) => {
        // time change
        innerMeal.date = moment(innerMeal.date).add(1, 'h').toISOString()

        const date = innerMeal.date.split('T')[0]
        if (!reData[date]) {
            reData[date] = []
        }
        reData[innerMeal.date.split('T')[0]].push({
            id: innerMeal.id,
            englishName:
                innerMeal.translations.length > 1
                    ? innerMeal.translations[1].name
                    : '---',
            name: innerMeal.translations[0].name,
            time: innerMeal.meal == 'lunch' ? 'Almoço' : 'Jantar',
            englishTime: innerMeal.meal == 'lunch' ? 'Lunch' : 'Dinner',
            englishType:
                innerMeal.dish_type_translation.length > 1
                    ? innerMeal.dish_type_translation[1].name
                    : '---',
            type: innerMeal.dish_type_translation[0].name,
            price: innerMeal.prices.find(
                (price) =>
                    price.description == 'Preço Aluno' && price.meal == 'lunch',
            ).price,
            stockQuantity: innerMeal.stockQuantity,
        })
    })
    return reData
}
