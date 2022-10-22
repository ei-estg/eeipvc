import fetch from 'node-fetch'
import districts from '../../assets/data/distrits-islands.json'

export const fetchWeather = async (location: number): Promise<any> => {
    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${location}`
    const response = await fetch(url)
    return await response.json()
}
