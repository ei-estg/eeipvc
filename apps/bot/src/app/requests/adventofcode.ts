import fetch from 'node-fetch'

interface Participant {
    id: string
    globalScore: number
    localScore: number
    name: string
    stars: number
    lastStarTs: string
}

export const getAoCLeaderboard = async (): Promise<Participant[]> => {
    const req = await fetch(
        'https://adventofcode.com/2021/leaderboard/private/view/661887.json',
        {
            headers: {
                cookie: process.env.AOC_SESSION_COOKIE || '',
            },
        },
    )
    const data: any = await req.json()
    const reData: Participant[] = []

    Object.values(data.members).forEach((member: any) => {
        reData.push({
            lastStarTs: member['lastStarTs'],
            localScore: member['localScore'],
            id: member['id'],
            globalScore: member['global_score'],
            name: member['name'],
            stars: member['stars'],
        })
    })

    return reData
}
