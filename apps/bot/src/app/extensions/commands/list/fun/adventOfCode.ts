import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import { getAoCLeaderboard } from '../../../../requests/adventofcode'
import { shortify } from '../../../../utils/string'
import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

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
            option.setName('ano').setDescription('Ano da leaderboard'),
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

        aocData.data
            .sort((a, b) => {
                return a.localScore >= b.localScore ? -1 : 1
            })
            .slice(0, 21)
            .forEach((participant, pos) => {
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
