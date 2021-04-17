import { List, ListItem } from "@material-ui/core"
import { Link, useParams } from "react-router-dom"
import { useAddressOverviewQuery } from "../generated/graphql"

export function AddressOverview() {

    const { address, coin } = useParams<{ coin: string, address: string }>()
    const { data, error, loading } = useAddressOverviewQuery({ variables: { address: address, coin: coin } })
    if (!data) return <div>"Loading..."</div>

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error: {error.message}</div>
    } else if (!data.coin) {
        return <div>Coin {coin} not found</div>
    } else {
        return <div style={{ flex: "1 1 auto", width: '100%' }}>
            <List>
                <ListItem>Wallet: <Link to={"/" + coin + "/wallet/" + data.coin.address.guestimatedWallet.clusterId}>{data.coin?.address.guestimatedWallet.clusterId}</Link></ListItem>
                <ListItem>Unconfirmed tx count: {data.coin.address.unconfirmedTxCount}</ListItem>
            </List>
        </div>
    }
}