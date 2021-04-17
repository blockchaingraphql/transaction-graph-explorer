import { List, ListItem } from "@material-ui/core"
import { Link, useParams } from "react-router-dom"
import { useWalletQuery } from "../generated/graphql"

export function WalletOverview() {

    const { address, coin } = useParams<{ coin: string, address: string }>()
    const { data, error, loading } = useWalletQuery({ variables: { address: address, coin: coin } })
    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error: {error.message}</div>
    } else if (!data) {
        throw new Error("Loaded query didn't return error or data!")
    } else if (!data.coin) {
        return <div>Coin {coin} not found</div>
    } else {
        return <div style={{ flex: "1 1 auto", width: '100%' }}>
            <List>
                <ListItem>Wallet id: <Link to={"/" + coin + "/wallet/" + data.coin.address.guestimatedWallet.clusterId}>{data.coin.address.guestimatedWallet.clusterId}</Link></ListItem>
                <ListItem>Balance: {data.coin.address.guestimatedWallet.details?.balance ?? 'N/A'}</ListItem>
            </List>
        </div>
    }
}