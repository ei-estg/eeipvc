import { Command } from '../Command'
import { eiEmbed } from '../../defaults/embed'
import { getAoCLeaderboard } from '../../requests/adventofcode'


export const AdventOfCodeCommand: Command = {
    description: '',
    name: 'aoc',
    alias: [
        'advent-of-code',
        'aoc-leaderboard',
    ],
    async run() {
        const embed = eiEmbed()
        const aocData = await getAoCLeaderboard()
        embed.setTitle(
            'Advent of Code Leaderboard',
        )
        
        aocData.sort((a,b) => {
           return a.stars >= b.stars ? -1 : 1
        }).forEach((participant) => {
           embed.addFields({
               name: participant.name,
               value: `⭐ ${participant.stars}`
           })
        })

        return embed
    },

}
