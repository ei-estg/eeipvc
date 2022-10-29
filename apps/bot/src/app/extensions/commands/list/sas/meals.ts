import { SlashCommand } from '../../base/SlashCommand'
import { getMealsNew } from '../../../../requests/sas'
import { sasEmbed } from '../../../../defaults/embed'
import { getISODate } from '../../../../utils/time'
import { normalize } from '../../../../utils/string'
import { SlashCommandBuilder } from '@discordjs/builders'

export const mealsCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('ementas')
        .setDescription('Ementas para a cantina da ESTG')
        .addStringOption((option) =>
            option
                .setName('data')
                .setDescription('Dia da ementa. Exemplo: 2022-12-01'),
        ),

    async run(it) {
        const date = it.options.get('data')?.value || getISODate()

        if (date == 'gabs') {
            return '<:pepesneakyevil:958133599679443014>'
        }
        try {
            let meals = await getMealsNew(date)

            if (!meals) {
                return 'Erro desconhecido'
            }

            if (!meals[date]) {
                return 'Sem ementas diponíveis para o dia.'
            }

            let lunchMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Lunch',
            )
            let dinnerMeals = meals[date].filter(
                (meal) => meal.englishTime == 'Dinner',
            )
            const mealsEmbed = sasEmbed()
                .setTitle(`Ementa dia ${date}`)
                .addFields({
                    name: '\u200B',
                    value: `🍴 **${lunchMeals[0].time}**`,
                })
            lunchMeals.forEach((meal) => {
                let name = `${meal.type} - ${meal.price?.toFixed(2) ?? '--'}€`
                let value = normalize(meal.name)

                if (!meal.available) {
                    name = `~~${name}~~`
                    value = normalize(`~~${meal.name}~~`)
                }

                mealsEmbed.addFields({ name, value })
            })
            mealsEmbed.addFields({
                name: '\u200B',
                value: `🍴 **${dinnerMeals[0].time}**`,
            })
            dinnerMeals.forEach((meal) => {
                let name = `${meal.type} - ${meal.price?.toFixed(2) ?? '--'}€`
                let value = normalize(meal.name)

                if (!meal.available) {
                    name = `~~${name}~~`
                    value = normalize(`~~${meal.name}~~`)
                }

                mealsEmbed.addFields({ name, value })
            })
            return mealsEmbed
        } catch (err) {
            console.error(err)
        }
    },
}
