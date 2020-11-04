const fetch = require('node-fetch')
const xmlParser = require('fast-xml-parser')

const Activity = require('../Activity')
const defaultEmbed = require('../../defaults/embed')

class NewsActivity extends Activity {
    constructor(bot) {
        super(bot)

        this.bot.on('message', this.onMessage.bind(this))
    }

    static async getNews() {
        let req = await fetch('http://www.ipvc.pt/noticias-rss')
        let text = await req.text()
        return xmlParser.parse(text)
    }

    async onMessage(msg) {
        const { wasCalled } = this.getCommand('noticias', msg.content)
        if (!wasCalled) return

        let news = await NewsActivity.getNews()
        await msg.channel.send({
            embed: NewsActivity.createNewsEmbed(news.rss.channel.item),
        })
    }

    static createNewsEmbed(news) {
        const newsEmbed = defaultEmbed.setTitle('📰 Notícias')

        news.forEach((item) => {
            newsEmbed.addFields({
                name: item.title,
                value: item.link,
            })
        })
        return newsEmbed
    }
}

module.exports = NewsActivity
