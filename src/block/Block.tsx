import Paper from '@material-ui/core/Paper'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { useParams } from 'react-router'
import { useBlockQuery } from '../generated/graphql'
import { MuiVirtualizedTable } from '../MuiVirtualizedTable'
import { Index, IndexRange, InfiniteLoader, TableCellProps } from 'react-virtualized'
import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'

export function Block() {

    const { hash, coin } = useParams<{ coin: string, hash: string }>()
    const { data, loading, fetchMore } = useBlockQuery({ variables: { hash: hash, coin: coin, limit: 100 } })

    const loading2 = useRef(false)

    const loadMoreRows = async (params: IndexRange): Promise<any> => {
        if (loading || loading2.current) return
        if (!data?.coin?.block) return
        const items = data.coin.block.transactions.items
        const last = items[items.length - 1]
        loading2.current = true
        await fetchMore({ variables: { hash: hash, coin: coin, limit: 100, cursor: { txN: last.txN } } })
        loading2.current = false
    }

    const isRowLoaded = (params: Index): boolean => {
        if (!data?.coin?.block) return false
        return params.index < data.coin.block.transactions.items.length
    }

    return <Card style={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader title="BLOCK" subheader={hash} />
        <CardContent style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
            <h3>Transactions</h3>
            <Paper style={{ flex: "1 1 auto", width: '100%' }}>
                {
                    data?.coin?.block?.transactions.items &&
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={99999999}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <MuiVirtualizedTable
                                registerChild={registerChild}
                                onRowsRendered={onRowsRendered}
                                rowCount={data!.coin!.block!.transactions.items.length}
                                rowGetter={(info) => {
                                    const ct = data!.coin!.block!.transactions.items[info.index]
                                    return { txid: ct.txid, inputCount: ct.transaction.inputCount, outputCount: ct.transaction.outputCount, fee: ct.transaction.fee }
                                }}
                                headerHeight={48}
                                rowHeight={48}
                                cellContentRenderer={({ cellData, dataKey }: TableCellProps) => {
                                    if (dataKey === 'txid') {
                                        return <Link to={'/' + coin + '/transaction/' + cellData} style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>{cellData}</Link>
                                    } else {
                                        return <Fragment>{cellData}</Fragment>
                                    }
                                }}
                                columns={[
                                    {
                                        width: 400,
                                        label: 'Txid',
                                        dataKey: 'txid',
                                        flexGrow: 1,
                                        flexShrink: 1,
                                        numeric: false
                                    },
                                    {
                                        width: 100,
                                        label: 'Input count',
                                        dataKey: 'inputCount',
                                        flexGrow: 0,
                                        flexShrink: 1,
                                        numeric: true
                                    },
                                    {
                                        width: 100,
                                        label: 'Output count',
                                        dataKey: 'outputCount',
                                        flexGrow: 0,
                                        flexShrink: 1,
                                        numeric: true
                                    },
                                    {
                                        width: 150,
                                        label: 'Fee',
                                        dataKey: 'fee',
                                        flexGrow: 0,
                                        flexShrink: 1,
                                        numeric: true
                                    }
                                ]}
                            />
                        )}
                    </InfiniteLoader>
                }
            </Paper>
        </CardContent>
    </Card>
}