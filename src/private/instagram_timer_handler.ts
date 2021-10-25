import { eiEmbed } from '../defaults/embed'
import { TextChannel } from 'discord.js'

const ig = require('instagram-scraping')

export const instagramTimerHandler = async (
    channel: TextChannel,
    accountUsername: string,
) => {
    try {
        const userPage = await ig.scrapeUserPage(accountUsername)

        const messages = await channel.messages.fetch()
        const botMessages = messages.filter((msg) => msg.author.bot)
        const numberOfPosts = botMessages.size
        console.log('nOp', numberOfPosts)

        if (numberOfPosts < userPage.medias.length) {
            const diff = userPage.medias.length - numberOfPosts

            const promises: Promise<any>[] = []
            for (let i = diff - 1; i >= 0; i--) {
                const embed = eiEmbed()

                embed.setTitle(userPage.user.full_name)
                embed.setThumbnail(userPage.user.profile_pic_url)
                embed.setImage(userPage.medias[i].node.display_url)
                if (userPage.medias[i].node.location) {
                    embed.setFooter(userPage.medias[i].node.location.name)
                }

                promises.push(
                    channel.send({
                        embed,
                    }),
                )
            }
            await Promise.all(promises)


        }
    }
    catch (error) {
        // console.log("error in insta " + error)
    }
}
