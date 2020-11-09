const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')
const { CronJob } = require('cron')
const moment = require('moment')

const { sasEmbed } = require('../../defaults/embed')

const MEAL_TYPES = {
    LUNCH: 'Almoço',
    DINNER: 'Jantar',
}

const getCurrentDate = () => moment().format('DD-MM-YYYY')

const convertToMachineFormat = (date) =>
    moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')

const convertToHumanFormat = (date) =>
    moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')

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
                    default: getCurrentDate(),
                },
                {
                    key: 'mealType',
                    type: 'string',
                    prompt: 'Qual o tipo da refeição?',
                    oneOf: ['Almoço', 'Jantar'],
                    default: MEAL_TYPES.LUNCH,
                },
            ],
        })

        const announcement = async () => {
            let currDate = moment()
            let day = convertToMachineFormat(currDate)

            let meals = await MealsCommand.getFilteredMeals(
                day,
                currDate.format('H') === '9'
                    ? MEAL_TYPES.LUNCH
                    : MEAL_TYPES.DINNER
            )
            let mealsEmbed = MealsCommand.createMealsEmbed(
                meals,
                convertToHumanFormat(day)
            )
            client.channels.cache
                .get('772155762239471657')
                .send({ embed: mealsEmbed })
        }
        client.once('ready', () =>
            new CronJob('45 9,18 * * *', announcement).start()
        )
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

    async run(message, { day, mealType }) {
        let machineDay = convertToMachineFormat(day)

        let filteredMeals = await MealsCommand.getFilteredMeals(
            machineDay,
            mealType
        )
        if (!filteredMeals) {
            await message.channel.send(
                `Sem ementas para o dia ${convertToHumanFormat(machineDay)}`
            )
        } else {
            await message.channel.send({
                embed: MealsCommand.createMealsEmbed(
                    filteredMeals,
                    convertToHumanFormat(machineDay)
                ),
            })
        }
    }

    static createMealsEmbed(meals, currentDate) {
        return sasEmbed()
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
