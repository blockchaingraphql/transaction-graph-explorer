import { useParams } from "react-router-dom"
import { useTransactionOutputsQuery } from "../generated/graphql"
import * as Immutable from 'immutable'
import { TxNode } from "../force-graph/models/TxNode"
import { OutputNode } from "../force-graph/models/OutputNode"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { IconButton, Tooltip } from "@material-ui/core"
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom'

interface Props {
    transactionsByTxid: Immutable.Map<string, TxNode>;
    outputsByOutpoint: Immutable.Map<string, OutputNode>;
    setTransactionsByTxid: React.Dispatch<React.SetStateAction<Immutable.Map<string, TxNode>>>;
    setOutputsByOutpoint: React.Dispatch<React.SetStateAction<Immutable.Map<string, OutputNode>>>;
}


export function TransactionOutputs(props: Props) {
    let { coin, txid } = useParams<{ coin: string, txid: string }>()
    const { data, error, loading } = useTransactionOutputsQuery({ variables: { coin: coin, txid: txid } })
    if (error) {
        return <div>Error: {error.message}</div>
    } else if (loading) {
        return <div>Loading...</div>
    } else if (data) {
        if (!data.coin) {
            return <div>Can't find coin {coin}</div>
        } else if (!data.coin.transaction) {
            return <div>Can't find transaction {txid}</div>
        } else {
            return <div>
                {
                    data.coin.transaction.outputs.items.map((output, index) => {
                        const address: { address: string, clusterId: string } | undefined = output.scriptPubKey.addresses?.length === 1 ? {
                            address: output.scriptPubKey.addresses[0].address,
                            clusterId: output.scriptPubKey.addresses[0].guestimatedWallet.clusterId
                        } : undefined
                        const outpoint = txid + output.n
                        const graphNode = props.outputsByOutpoint.get(outpoint)
                        const addButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            props.setOutputsByOutpoint(props.outputsByOutpoint.set(outpoint, new OutputNode({
                                txid: txid,
                                n: output.n,
                                spending_txid: output.spendingInput?.spendingTxid ?? null,
                                spending_index: output.spendingInput?.spendingIndex ?? null,
                                value: output.value,
                                address: address
                            })))
                        }

                        const removeButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            props.setOutputsByOutpoint(props.outputsByOutpoint.delete(outpoint))
                        }
                        return <div key={outpoint} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                            {output.scriptPubKey.addresses?.map(address => <Link key={address.address} to={"/" + coin + "/address/" + address.address}>{address.address}</Link>)} ({output.value})

                            {output.spendingInput &&
                                <IconButton component={Link} to={"/" + coin + "/transaction/" + output.spendingInput.spendingTxid} aria-label="spending input">
                                    <ChevronRightIcon />
                                </IconButton>}
                            {!output.spendingInput &&
                                <IconButton aria-label="spending input" disabled>
                                    <ChevronRightIcon />
                                </IconButton>}
                            <div style={{ flexGrow: 1 }}></div>
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
                        </div>
                    })
                }
            </div>
        }
    } else {
        throw new Error("Loaded query didn't return error or data!")
    }
}