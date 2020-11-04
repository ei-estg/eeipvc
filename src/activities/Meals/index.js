const fetch = require('node-fetch')

const Activity = require('../Activity')
const defaultEmbed = require('../../defaults/embed')

class MealsActivity extends Activity {
    constructor(config) {
        super(config)

        this.bot.on('message', this.onMessage.bind(this))
    }

    static async getMeals(startDate, endDate) {
        let req = await fetch(
            `http://apps.sas.ipvc.pt/sas-ws/mobileV2/obtempordata4.php?datai=${startDate}&dataf=${
                endDate ? endDate : startDate
            }`
        )
        return await req.json()
    }

    static async getFilteredMeals(date, mealType) {
        let meals = await MealsActivity.getMeals(date, date)
        return meals.posts[date].filter(
            (obj) => obj.post['altura_AlturaDia'] === mealType
        )
    }

    async onMessage(msg) {
        let { wasCalled, args } = this.getCommand('ementas', msg.content)
        if (!wasCalled) return

        let date = new Date().toISOString().split('T')[0]
        let mealType = 'Almoço'

        if (args.length > 0) {
            date = args[0]
        } else if (args.length > 2) {
            mealType = args.length[1]
        }

        let filteredMeals = await MealsActivity.getFilteredMeals(date, mealType)
        if (!filteredMeals) {
            await msg.channel.send(`Sem ementas para o dia ${date}`)
        } else {
            await msg.channel.send({
                embed: MealsActivity.createMealsEmbed(filteredMeals, date),
            })
        }
    }

    static createMealsEmbed(meals, currentDate) {
        return defaultEmbed
            .setTitle(`Ementa dia ${currentDate}`)
            .setAuthor(
                'SAS IPVC',
                'https://cdn.discordapp.com/avatars/771442069432434758/3647fc1e2487d8613ee822918dd362b5.png?size=256'
            )
            .addFields(
                {
                    name: '⠀',
                    value: `🍴 **${meals[0].post['altura_AlturaDia']}**`,
                },
                ...meals.map((obj) => ({
                    name: obj.post['nome_Tipo'],
                    value:
                        obj.post['nome_Prato'].charAt(0) +
                        obj.post['nome_Prato'].slice(1).toLowerCase(),
                }))
            )
    }
}

module.exports = MealsActivity
