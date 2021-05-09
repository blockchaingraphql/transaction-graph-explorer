import { Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, Paper, Tooltip } from "@material-ui/core"
import { useParams } from "react-router"
import { useTransactionOutputQuery } from "../generated/graphql"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { OutputNode } from "../force-graph/models/nodes/OutputNode"
import { Link } from "react-router-dom"
import { useGraph } from "../hooks/useGraph"


export function TransactionOutput() {
    const { txid, coin, n } = useParams<{ coin: string, txid: string, n: string }>()

    const { graph, graphDispatch } = useGraph()
    const graphNode = graph.outputsByOutpoint.get(txid + n)

    const { data } = useTransactionOutputQuery({ variables: { coin: coin, txid: txid, n: Number.parseInt(n) } })
    const output = data?.coin?.transactionOutput
    if (!output) {
        return <div>Loading</div>
    }
    const address: { address: string, clusterId: string } | undefined = output.scriptPubKey.addresses?.length === 1 ? {
        address: output.scriptPubKey.addresses[0].address,
        clusterId: output.scriptPubKey.addresses[0].guestimatedWallet.clusterId
    } : undefined

    const addButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!output) return
        graphDispatch({
            type: "addOutput", node: new OutputNode({
                txid: output.txid,
                n: output.n,
                value: output.value,
                spending_txid: output.spendingTxid,
                spending_index: output.spendingIndex,
                address: address
            })
        })
    }

    const removeButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (graphNode) graphDispatch({ type: "removeOutput", node: graphNode })
        //props.setOutputsByOutpoint(props.outputsByOutpoint.delete(txid + n))
    }

    return <Card style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
        <CardHeader title="TRANSACTION OUTPUT" subheader={txid + "-" + n} />
        <CardContent style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
            <Paper style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
                <List>
                    <ListItem>
                        Transaction
                        <Link to={"/" + coin + "/transaction/" + output.txid} aria-label="transaction">
                            {output.txid}
                        </Link>
                    </ListItem>
                    <ListItem>
                        Value: {output.value}
                    </ListItem>
                    <ListItem>
                        Spent by:
                        <Link to={"/" + coin + "/transaction/" + output.spendingTxid} aria-label="spending transaction">
                            {output.spendingTxid}
                        </Link>
                    </ListItem>
                    {address && <ListItem>
                        Address
                        <Link to={"/" + coin + "/address/" + address.address} aria-label="address">
                            {address.address}
                        </Link>
                    </ListItem>}
                    {address && <ListItem>
                        Wallet
                        <Link to={"/" + coin + "/wallet/" + address.clusterId} aria-label="wallet">
                            {address.clusterId}
                        </Link>
                    </ListItem>}
                </List>
            </Paper>
        </CardContent>
        <CardActions disableSpacing>
            {!graphNode && <Tooltip title="Add to graph" aria-label="highlight">
                <IconButton aria-label="add to graph" onClick={addButtonClicked}>
                    <AddIcon />
                </IconButton>
            </Tooltip>}
            {graphNode && <Tooltip title="Add to graph" aria-label="highlight">
                <IconButton aria-label="remove from graph" onClick={removeButtonClicked}>
                    <RemoveIcon />
                </IconButton>
            </Tooltip>}
        </CardActions>
    </Card>
}