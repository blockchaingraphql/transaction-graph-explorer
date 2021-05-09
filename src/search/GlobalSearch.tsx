import { ApolloClient } from "@apollo/client"
import { useCallback } from "react"
import { SearchNumberDocument, SearchNumberQuery, SearchStringDocument, SearchStringQuery } from '../generated/graphql'
import { Search, SearchResult } from "./Search"

export function GlobalSearch({ client }: { client: ApolloClient<any> }) {

    const search = useCallback(async (query: string) => {
        if (query.length === 0) {
            return []
        }
        const searchedNumber = Number(query)
        if (Number.isFinite(searchedNumber) && searchedNumber >= 0 && Number.isInteger(searchedNumber)) {
            const res = await client.query<SearchNumberQuery>({ query: SearchNumberDocument, variables: { query: searchedNumber } })
            return res.data.coins.flatMap(coin => {
                if (!coin.blockByHeight) {
                    return [] as SearchResult[]
                } else {
                    return [{
                        coin: coin.name, type: "block", info: "#" + searchedNumber, value: coin.blockByHeight.hash
                    }] as SearchResult[]
                }
            })
        } else {
            const res = await client.query<SearchStringQuery>({ query: SearchStringDocument, variables: { query: query } })
            return res.data.coins.flatMap(coin => {
                const results: SearchResult[] = []
                if (coin.transaction) {
                    results.push({ coin: coin.name, type: "transaction", value: coin.transaction.txid })
                }
                if (coin.block) {
                    results.push({ coin: coin.name, type: "block", info: "#" + coin.block.height, value: query })
                }
                if (coin.address.balances.items.length > 0) {
                    results.push({ coin: coin.name, type: "address", value: coin.address.address })
                }
                return results
            })
        }
    }, [client])

    return <Search client={client} search={search} />
}