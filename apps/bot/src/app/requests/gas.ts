import fetch, { Request, Response } from 'node-fetch'

export const fetchGasPrice = async (type: string): Promise<any> => {
    const url =
        'https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/ListarDadosPostos?idsTiposComb=1120%2C3400%2C3205%2C3405%2C3201%2C2101&idMarca=&idTipoPosto=&idDistrito=16&idsMunicipios=242'
    const response = await fetch(url)
    const postos = await response.json()
    const postoID = postos.resultado.map((posto) => posto.Id)

    const requestPosto: Array<Promise<Response>> = []
    postoID.forEach((id) => {
        requestPosto.push(
            fetch(
                `https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/GetDadosPosto?id=${id}`,
            ),
        )
    })

    const res = await Promise.all(requestPosto)

    const resposta: Array<any> = []
    for await (const r of res) {
        const data = await r.json()
        resposta.push(data)
    }
    return resposta
}
