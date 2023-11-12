import fetch from 'node-fetch'

interface Counties {
    total: number
    north: number
    center: number
    alentejo: number
    algarve: number
    acores: number
    madeira: number
    foreign?: number
}

interface CountiesConfirmed extends Counties {
    new: number
}

interface CovidEntry {
    confirmed: CountiesConfirmed
    recovered: number
    deaths: number
}

export const getCovidInPortugalForDate = async (date1: string) => {
    const req = await fetch(
        `https://covid19-api.vost.pt/Requests/get_entry/${date1}`,
    )
    if (!req.ok) return null

    const data = await req.json()
    const key: number = parseInt(Object.keys(data.data)[0])

    const reData: CovidEntry = {
        confirmed: {
            total: data['confirmados'][key],
            new: data['confirmados_novos'][key],
            north: data['confirmados_arsnorte'][key],
            center: data['confirmados_arscentro'][key],
            alentejo: data['confirmados_arsalentejo'][key],
            algarve: data['confirmados_arsalgarve'][key],
            acores: data['confirmados_acores'][key],
            madeira: data['confirmados_madeira'][key],
        },
        recovered: data['recuperados'][key],
        deaths: data['obitos'][key],
    }

    return reData
}
