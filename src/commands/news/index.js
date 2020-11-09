const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')
const xmlParser = require('fast-xml-parser')

const defaultEmbed = require('../../defaults/embed')

module.exports = class NewsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'noticias',
            memberName: 'news',
            group: 'sas',
            description: 'Últimas Notícias do IPVC',
        })
    }

    static async getNews() {
        let req = await fetch('http://www.ipvc.pt/noticias-rss')
        let text = await req.text()
        return xmlParser.parse(text)
    }

    async run(message) {
        let news = await NewsCommand.getNews()
        if (news.length > 5) news.slice(0, 5)
        await message.channel.send({
            embed: NewsCommand.createNewsEmbed(news.rss.channel.item),
        })
    }

    static createNewsEmbed(news) {
        const newsEmbed = defaultEmbed().setTitle('📰 Notícias')

        news.forEach((item) => {
            newsEmbed.addFields({
                name: item.title,
                value: item.link,
            })
        })
        return newsEmbed
    }
}
