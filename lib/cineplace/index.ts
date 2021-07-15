import fetch from 'node-fetch'
import cheerio, { NodeWithChildren } from 'cheerio'
import moment from 'moment'

export enum Cinema {EstacaoViana = 20}

export const BASE_URL = 'https://cineplace.pt/wp-admin/admin-ajax.php'


export class Movie {
    constructor(public name: string, public imageUrl: string, public times: string[], public dateTimes: DateTime[]) {
    }
}

export interface DateTime {
    date: string
    times: string[]
}


export const getMoviesByLocation = async (cinema: Cinema): Promise<Movie[]> => {
    let date = moment()
    const movies: any = []

    while (true) {
        const formattedDate = date.format('YYYY-MM-DD')
        const req = await fetch(`${BASE_URL}?action=get_movies&cinema_id=${cinema}&date=${formattedDate}`)

        const data = await req.json()
        if (data.times.length < 1) return movies
        const $ = cheerio.load(data.contents)

        $('.movie').each((i, movieElement: NodeWithChildren) => {
            const movieName = $(movieElement).find('h5').text()
            const movieBackgroundTag = $(movieElement).find('.movie-cover').attr().style
            const movieImageUrl = movieBackgroundTag.substring(22, movieBackgroundTag.length - 1)
            const times: string[] = $(movieElement).find('.movie-cover .movie-session-times .movie-times .movie-time').map((i, e) =>
                $(e).text().trim(),
            ).toArray()

            let movie: Movie;
            const dateTimeData: DateTime = {
                date: formattedDate,
                times
            }
            if ((movie = movies.find(movie => movie.name == movieName))) {
                movie.dateTimes.push(dateTimeData)
            } else {
                movies.push(new Movie(movieName, movieImageUrl, times, [dateTimeData]))
            }

            date.add({ day: 1 })
        })
    }
}
