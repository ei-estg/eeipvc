import fetch from 'node-fetch'

interface Participant {
    id: string
    globalScore: number
    localScore: number
    name: string
    stars: number
    lastStarTs: string
}

export const getAoCLeaderboard = async (
    year: number,
): Promise<{ url: string; data: Participant[] }> => {
    const LEADERBOARD_ID = 661887
    const leaderboardUrl = `https://adventofcode.com/${year}/leaderboard/private/view/${LEADERBOARD_ID}`

    const req = await fetch(`${leaderboardUrl}.json`, {
        headers: {
            cookie: process.env.AOC_SESSION_COOKIE || '',
        },
    })
    const data: any = await req.json()
    const reData: Participant[] = []

    Object.values(data.members).forEach((member: any) => {
        reData.push({
            lastStarTs: member['last_star_ts'],
            localScore: member['local_score'],
            id: member['id'],
            globalScore: member['global_score'],
            name: member['name'],
            stars: member['stars'],
        })
    })

    return {
        url: leaderboardUrl,
        data: reData,
    }
}
