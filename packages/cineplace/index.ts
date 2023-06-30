import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import moment from 'moment'

export enum Cinema {
    EstacaoViana = 20,
}

export const BASE_URL = 'https://cineplace.pt/wp-admin/admin-ajax.php'

const getUserAgent = () =>
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'

export class Movie {
    constructor(
        public name: string,
        public imageUrl: string,
        public times: string[],
        public dateTimes: DateTime[],
    ) {}
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
        const req = await fetch(
            `${BASE_URL}?action=get_movies&cinema_id=${cinema}&date=${formattedDate}`,
            {
                headers: {
                    'User-Agent': getUserAgent(),
                },
            },
        )

        const data = await req.json()

        console.log(
            `request url: ${BASE_URL}?action=get_movies&cinema_id=${cinema}&date=${formattedDate}`,
        )
        console.log(`request data: ${data}`)

        if (data.times.length < 1) {
            console.warn('Movies data: ', data)
            return movies
        }
        const $ = cheerio.load(data.contents)

        $('.movie').each((i, movieElement: any) => {
            const movieName = $(movieElement).find('h5').text()
            // @ts-ignore
            const movieBackgroundTag = $(movieElement)
                .find('.movie-cover')
                .attr().style
            const movieImageUrl = movieBackgroundTag.substring(
                22,
                movieBackgroundTag.length - 1,
            )
            const times: string[] = $(movieElement)
                .find(
                    '.movie-cover .movie-session-times .movie-times .movie-time',
                )
                .map((i, e) => $(e).text().trim())
                .toArray()

            let movie: Movie
            const dateTimeData: DateTime = {
                date: formattedDate,
                times,
            }
            if ((movie = movies.find((movie) => movie.name == movieName))) {
                movie.dateTimes.push(dateTimeData)
            } else {
                movies.push(
                    new Movie(movieName, movieImageUrl, times, [dateTimeData]),
                )
            }

            date.add({ day: 1 })
        })
    }
}
