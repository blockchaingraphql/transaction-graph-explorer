import { ApolloClient } from "@apollo/client"
import { useCallback } from "react"
import { CoinSearchNumberDocument, CoinSearchNumberQuery, CoinSearchStringDocument, CoinSearchStringQuery } from '../generated/graphql'
import { Search, SearchResult } from "./Search"

export function CoinSearch({ coin, client }: { coin: String, client: ApolloClient<any> }) {

    const search = useCallback(async (query: string) => {
        if (query.length === 0) {
            return []
        }
        const searchedNumber = Number(query)
        if (Number.isFinite(searchedNumber) && searchedNumber >= 0 && Number.isInteger(searchedNumber)) {
            let res = await client.query<CoinSearchNumberQuery>({ query: CoinSearchNumberDocument, variables: { coin: coin, query: searchedNumber } })
            const block = res.data.coin?.blockByHeight
            if (!block) {
                return []
            } else {
                return [{ coin: block.coin.name, type: "block", info: "#" + searchedNumber, value: block.hash }]
            }
        } else {
            let res = await client.query<CoinSearchStringQuery>({ query: CoinSearchStringDocument, variables: { coin: coin, query: query } })
            const results: SearchResult[] = []
            const coinRes = res.data.coin
            if (!coinRes) return results
            if (coinRes.transaction) {
                results.push({ coin: coinRes.name, type: "transaction", value: coinRes.transaction.txid })
            }
            if (coinRes.block) {
                results.push({ coin: coinRes.name, type: "block", info: "#" + coinRes.block.height, value: query })
            }
            if (coinRes.address.balances.items.length > 0) {
                results.push({ coin: coinRes.name, type: "address", value: coinRes.address.address })
            }
            return results
        }
    }, [client, coin])

    return <Search client={client} search={search} />
}