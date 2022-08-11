import fetch from 'node-fetch'
import districts from '../../data/distrits-islands.json'

export const fetchWeather = async (location: String): Promise<any> => {
    let number: number = -1
    districts.data.forEach((district) => {
        if (
            district.local.split(' ')[0].toLowerCase() ===
            location.toLowerCase()
        ) {
            number = district.globalIdLocal
        }
    })
    if (number === -1) return null

    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${number}`
    const response = await fetch(url)
    return await response.json()
}
