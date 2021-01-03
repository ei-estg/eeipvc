import { Event } from '../Event'
import { getNews } from '../requests/sas'
import { sasEmbed } from '../defaults/embed'

export const newsEvent: Event = {
    name: 'noticias',
    description: 'As últimas noticias do IPVC',

    async run() {
        try {
            let news = await getNews()
            if (news.length > 5) news.slice(0, 5)

            const newsEmbed = sasEmbed().setTitle('📰 Notícias')
            news.forEach((item) => {
                newsEmbed.addFields({
                    name: item.title,
                    value: item.link,
                })
            })
            return newsEmbed
        } catch (e) {
            console.error(e)
        }
    },
}
