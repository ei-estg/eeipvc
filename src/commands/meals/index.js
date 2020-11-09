const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')

const defaultEmbed = require('../../defaults/embed')

module.exports = class MealsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ementas',
            autoAliases: true,
            memberName: 'meals',
            group: 'sas',
            description: 'Ementas',
            args: [
                {
                    key: 'day',
                    type: 'string',
                    prompt: 'Qual é o dia para pesquisar?',
                    default: new Date().toISOString().split('T')[0],
                },
                {
                    key: 'time',
                    type: 'string',
                    prompt: 'Qual o tipo da refeição?',
                    default: 'Almoço',
                },
            ],
        })
    }

    static async getMeals(startDate, endDate) {
        let req = await fetch(
            `http://apps.sas.ipvc.pt/sas-ws/mobileV2/obtempordata4.php?datai=${startDate}&dataf=${
                endDate ? endDate : startDate
            }`
        )
        return await req.json()
    }

    static async getFilteredMeals(date, time) {
        let meals = await MealsCommand.getMeals(date, date)
        if (!(date in meals.posts)) return
        return meals.posts[date].filter(
            (obj) => obj.post['altura_AlturaDia'] === time
        )
    }

    async run(message, { day, time }) {
        console.log(time)
        let filteredMeals = await MealsCommand.getFilteredMeals(day, time)
        if (!filteredMeals) {
            await message.channel.send(`Sem ementas para o dia ${day}`)
        } else {
            await message.channel.send({
                embed: MealsCommand.createMealsEmbed(filteredMeals, day),
            })
        }
    }

    static createMealsEmbed(meals, currentDate) {
        return defaultEmbed()
            .setTitle(`Ementa dia ${currentDate}`)
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
