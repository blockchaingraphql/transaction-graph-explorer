import { Fragment, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Index, IndexRange, InfiniteLoader, TableCellProps } from "react-virtualized"
import { useWalletAddressesQuery } from "../generated/graphql"
import { MuiVirtualizedTable } from "../MuiVirtualizedTable"

export function WalletAddresses() {

    const { address, coin } = useParams<{ coin: string, address: string }>()
    const { data, loading, fetchMore } = useWalletAddressesQuery({ variables: { address: address, coin: coin, limit: 300 } })
    const loading2 = useRef(false)
    if (!data) return <div>"Loading..."</div>

    const loadMoreRows = async (params: IndexRange): Promise<any> => {
        if (loading || loading2.current) return
        if (!data?.coin?.address) return
        const items = data.coin.address.guestimatedWallet.addresses.items
        const last = items[items.length - 1]
        loading2.current = true
        await fetchMore({ variables: { address: address, coin: coin, limit: 300, cursor: { address: last.address } } })
        loading2.current = false
        return
    }

    const isRowLoaded = (params: Index): boolean => {
        if (!data?.coin?.address) return false
        return params.index < data.coin.address.guestimatedWallet.addresses.items.length
    }

    return <div style={{ flex: "1 1 auto", width: '100%' }}>
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={99999999}
        >
            {({ onRowsRendered, registerChild }) => {
                return <MuiVirtualizedTable
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowCount={data!.coin!.address.guestimatedWallet.addresses.items.length}
                    rowGetter={(info) => {
                        const ct = data!.coin!.address.guestimatedWallet.addresses.items[info.index]
                        return { address: ct.address }
                    }}
                    headerHeight={48}
                    rowHeight={48}
                    cellContentRenderer={({ cellData, dataKey }: TableCellProps) => {
                        if (dataKey === 'address') {
                            return <Link to={'/' + coin + '/address/' + cellData} style={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }}>{cellData}</Link>
                        } else {
                            return <Fragment>{cellData}</Fragment>
                        }
                    }}
                    columns={[
                        {
                            width: 200,
                            label: 'Address',
                            dataKey: 'address',
                            flexGrow: 1,
                            flexShrink: 1,
                            numeric: false
                        }
                    ]}
                />
            }}
        </InfiniteLoader>
    </div>
}