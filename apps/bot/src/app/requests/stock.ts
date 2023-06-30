import fetch from 'node-fetch'

export interface Stock {
    symbol: string
    displayName: string
    regularMarketPrice: string
}

export const getStock = async (stockTicker: string) => {
    let req = await fetch(
        `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=${stockTicker}`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'stock-data-yahoo-finance-alternative.p.rapidapi.com',
                'x-rapidapi-key':
                    '2ffdf1e29emsh56e8402b31fb1d1p13dec8jsn7c752aa7499b',
            },
        },
    )

    let response = await req.json()
    console.log(response.quoteResponse.result[0])
    return await response.quoteResponse.result[0]
}
