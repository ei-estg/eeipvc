import {SlashCommand} from '../../base/SlashCommand'
import {eiEmbed} from '../../../../defaults/embed'
import {getAoCLeaderboard} from '../../../../requests/adventofcode'
import {shortify} from '../../../../utils/string'
import {SlashCommandBuilder} from '@discordjs/builders'
import {CommandInteraction} from 'discord.js'

const getMedal = (pos: number) =>
    ({
        '1': '🥇',
        '2': '🥈',
        '3': '🥉',
    }[pos] || `${pos}ª`)

export const adventOfCodeCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('aoc')
        .setDescription('Advent of Code leaderboard')
        .addIntegerOption((option) =>
            option
                .setRequired(true)
                .setName('ano')
                .setDescription('Ano Referente ao Advent of Code')
                .addChoices(
                    {name: '2021', value: 2021},
                    {name: '2022', value: 2022},
                    {name: '2023', value: 2023},
                ),
        ),

    async run(it: CommandInteraction) {
        const yearOptionValue = it.options.get('ano')?.value
        const year = yearOptionValue
            ? +yearOptionValue
            : new Date().getFullYear()

        const embed = eiEmbed()
        const aocData = await getAoCLeaderboard(year)
        embed.setTitle('Advent of Code leaderboard')
        embed.setDescription(
            `**Ano:** ${year}\r\n**Link:** ${aocData.url}\r\nㅤ`,
        )
        console.log(aocData.data)

        aocData.data
            .sort((a, b) => {
                return a.localScore >= b.localScore ? -1 : 1
            })
            .slice(0, 21)
            .forEach((participant, pos) => {
                if (!participant.name) return
                const participantFirstPartPadded = shortify(
                    participant.name,
                    25,
                )

                embed.addFields({
                    name: `${getMedal(pos + 1)} posição`,
                    value: `${participantFirstPartPadded}\r\n⭐ ${participant.stars} | ${participant.localScore}`,
                    inline: true,
                })
            })
        embed.setURL(aocData.url)

        return embed
    },
}
