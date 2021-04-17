import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import 'fontsource-roboto'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AddressClusterAddressesArgs, AddressClusterTransactionsArgs, AddressConfirmedTransactionsArgs, BlockTransactionsArgs, PaginatedAddressResponse, PaginatedAddressTransactionResponse, PaginatedClusterTransactionResponse, PaginatedConfirmedTransactionResponse, TypedTypePolicies } from "./generated/graphql"


const typePolicies: TypedTypePolicies = {
    Query: {
        fields: {
            coins: {
                keyArgs: false
            },
            coin: {
                keyArgs: ['name']
            }
        }
    },
    Coin: {
        keyFields: ['name'],
        fields: {
            blocks: {
                keyArgs: false
            },
            address: {
                keyArgs: ['address']
            },
            transaction: {
                keyArgs: ['txid']
            }
        }

    },
    Address: {
        keyFields: ['address', 'coin', ['name'] as any],
        fields: {
            confirmedTransactions: {
                keyArgs: false,
                merge: (existing: PaginatedAddressTransactionResponse | undefined, incoming: PaginatedAddressTransactionResponse, options) => {
                    const args: AddressConfirmedTransactionsArgs | null = options.args
                    if (existing) {
                        if (args?.cursor) {
                            const cursor = args.cursor
                            const previous = existing.items[existing.items.length - 1]

                            if (cursor.timestamp === previous.timestamp && cursor.txN === previous.txN) {
                                return {
                                    ...incoming, items: [...existing.items, ...incoming.items]
                                }
                            }

                        }
                    }
                    return incoming
                }
            },
            balances: {
                keyArgs: false
            },
        }
    },
    AddressCluster: {
        keyFields: false,
        merge: true,
        fields: {
            addresses: {
                keyArgs: false,
                merge: (existing: PaginatedAddressResponse | undefined, incoming: PaginatedAddressResponse, options) => {
                    const args: AddressClusterAddressesArgs | null = options.args
                    if (existing) {
                        if (args?.cursor) {
                            const cursor = args.cursor
                            const previous = existing.items[existing.items.length - 1]
                            if (cursor.address === options.readField("address", previous)) {
                                return {
                                    ...incoming, items: [...existing.items, ...incoming.items]
                                }
                            }
                        }
                    }
                    return incoming
                }
            },
            transactions: {
                keyArgs: false,
                merge: (existing: PaginatedClusterTransactionResponse | undefined, incoming: PaginatedClusterTransactionResponse, options) => {
                    const args: AddressClusterTransactionsArgs | null = options.args
                    if (existing) {
                        if (args?.cursor) {
                            const cursor = args.cursor
                            const previous = existing.items[existing.items.length - 1]
                            if (cursor.timestamp === options.readField("timestamp", previous) && cursor.txN === options.readField("txN", previous.confirmedTransaction)) {
                                return {
                                    ...incoming, items: [...existing.items, ...incoming.items]
                                }
                            }
                        }
                    }
                    return incoming
                }
            }
        }
    },
    BlockHash: {
        keyFields: ['height', 'coin', ['name'] as any]
    },
    Block: {
        keyFields: ['hash', 'coin', ['name'] as any],
        fields: {
            transactions: {
                keyArgs: false,
                merge: (existing: PaginatedConfirmedTransactionResponse | undefined, incoming: PaginatedConfirmedTransactionResponse, options) => {
                    const args: BlockTransactionsArgs | null = options.args
                    if (existing) {
                        if (args?.cursor) {
                            const cursor = args.cursor
                            const previous = existing.items[existing.items.length - 1]
                            if (cursor.txN === options.readField("txN", previous)) {
                                return {
                                    ...incoming, items: [...existing.items, ...incoming.items]
                                }
                            } else {
                            }

                        } else {
                        }
                    } else {
                    }
                    return incoming
                }
            }
        }
    },
    Transaction: {
        keyFields: ['txid', 'coin', ['name'] as any]
    },
    ConfirmedTransaction: {
        keyFields: ['height', 'txN', 'coin', ['name'] as any]
    }
}

const client = new ApolloClient({
    uri: 'https://blockchaingraphql.com',
    cache: new InMemoryCache({
        typePolicies: typePolicies
    })
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
