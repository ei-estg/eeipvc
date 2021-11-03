import fetch from 'node-fetch'

export interface Stock {
    symbol: string
    displayName: string
    regularMarketPrice: string
}

export const getStock = async (stockTicker: string) => {

      let req = await fetch(
        'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
     {
        method: 'GET',
        params: {symbols: stockTicker, lang: 'EN', region: 'ES'},
        headers: {
          'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
          'x-rapidapi-key': '2ffdf1e29emsh56e8402b31fb1d1p13dec8jsn7c752aa7499b'
        }
    })

    let response = await req.json()
    let reData: Stock[] = []

    response.data.quoteResponse.result[0].forEach((v) => {
        reData.push({
            symbol: v.symbol,
            displayName: v.displayName,
            regularMarketPrice: v.regularMarketPrice,
        })
    })
    return reData
}