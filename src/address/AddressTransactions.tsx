import { Fragment, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Index, IndexRange, InfiniteLoader, TableCellProps } from "react-virtualized"
import { useAddressTransactionsQuery } from "../generated/graphql"
import { useGraph } from "../hooks/useGraph"
import { MuiVirtualizedTable } from "../MuiVirtualizedTable"

export function AddressTransactions() {

    const { address, coin } = useParams<{ coin: string, address: string }>()
    const { data, loading, fetchMore } = useAddressTransactionsQuery({ variables: { address: address, coin: coin, limit: 300 } })
    const { graph } = useGraph()
    const loading2 = useRef(false)
    if (!data) return <div>"Loading..."</div>

    const loadMoreRows = async (params: IndexRange): Promise<any> => {
        if (loading || loading2.current) return
        if (!data?.coin?.address) return
        const items = data.coin.address.confirmedTransactions.items
        const last = items[items.length - 1]
        loading2.current = true
        await fetchMore({ variables: { address: address, coin: coin, limit: 300, cursor: { height: last.confirmedTransaction.height, timestamp: last.timestamp, txN: last.confirmedTransaction.txN } } })
        loading2.current = false
        return
    }

    const isRowLoaded = (params: Index): boolean => {
        if (!data?.coin?.address) return false
        return params.index < data.coin.address.confirmedTransactions.items.length
    }

    return <div style={{ flex: "1 1 auto", width: '100%' }}>
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={99999999}
        >
            {({ onRowsRendered, registerChild }) => {

                return <MuiVirtualizedTable
                    registerChild={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowCount={data!.coin!.address.confirmedTransactions.items.length}
                    rowGetter={(info) => {
                        const ct = data!.coin!.address.confirmedTransactions.items[info.index]
                        const graphNode = graph.transactionsByTxid.get(ct.confirmedTransaction.txid)
                        return { txid: ct.confirmedTransaction.txid, time: new Date(ct.timestamp).toLocaleString(), balanceChange: ct.balanceChange, selected: graphNode !== undefined }
                    }}
                    headerHeight={48}
                    rowHeight={48}
                    cellContentRenderer={({ cellData, dataKey }: TableCellProps) => {
                        if (dataKey === 'txid') {
                            return <Link to={'/' + coin + '/transaction/' + cellData} style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>{cellData}</Link>
                        } else if (dataKey === 'balanceChange') {
                            if (cellData < 0) {
                                return <span style={{ color: 'red' }}>{cellData}</span>
                            } else if (cellData > 0) {
                                return <span style={{ color: 'green' }}>{cellData}</span>
                            } else {
                                return <span>{cellData}</span>
                            }
                        } else {
                            return <Fragment>{cellData}</Fragment>
                        }
                    }}
                    columns={[
                        {
                            width: 200,
                            label: 'Time',
                            dataKey: 'time',
                            flexGrow: 0,
                            flexShrink: 1,
                            numeric: false
                        },
                        {
                            width: 400,
                            label: 'Txid',
                            dataKey: 'txid',
                            flexGrow: 1,
                            flexShrink: 1,
                            numeric: false
                        },
                        {
                            width: 200,
                            label: 'Balance change',
                            dataKey: 'balanceChange',
                            flexGrow: 0,
                            flexShrink: 1,
                            numeric: true
                        }
                    ]}
                />
            }}
        </InfiniteLoader>
    </div>
}