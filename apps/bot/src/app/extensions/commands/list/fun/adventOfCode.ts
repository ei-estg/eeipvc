import { SlashCommand } from '../../base/SlashCommand'
import { eiEmbed } from '../../../../defaults/embed'
import { getAoCLeaderboard } from '../../../../requests/adventofcode'

export const adventOfCodeCommand: SlashCommand = {
    name: 'aoc',
    description: 'Advent of Code leaderboard',
    async run() {
        const embed = eiEmbed()
        const aocData = await getAoCLeaderboard()
        embed.setTitle('Advent of Code Leaderboard')

        aocData
            .sort((a, b) => {
                return a.stars >= b.stars ? -1 : 1
            })
            .forEach((participant) => {
                embed.addFields({
                    name: participant.name,
                    value: `⭐ ${participant.stars}`,
                })
            })

        return embed
    },
}
