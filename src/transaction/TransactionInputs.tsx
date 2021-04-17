import { Link, useParams } from "react-router-dom"
import { useTransactionInputsQuery } from "../generated/graphql"
import * as Immutable from 'immutable'
import { TxNode } from "../force-graph/models/TxNode"
import { OutputNode } from "../force-graph/models/OutputNode"
import { IconButton, Tooltip } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
    transactionsByTxid: Immutable.Map<string, TxNode>;
    outputsByOutpoint: Immutable.Map<string, OutputNode>;
    setTransactionsByTxid: React.Dispatch<React.SetStateAction<Immutable.Map<string, TxNode>>>;
    setOutputsByOutpoint: React.Dispatch<React.SetStateAction<Immutable.Map<string, OutputNode>>>;
}


export function TransactionInputs(props: Props) {

    let { coin, txid } = useParams<{ coin: string, txid: string }>()

    const { data, error, loading } = useTransactionInputsQuery({ variables: { coin: coin, txid: txid } })
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
                    data.coin.transaction.inputs.items.map((input, index) => {
                        if (!input.spentOutput) {
                            return <div key={input.coinbase}>Coinbase: {input.coinbase}</div>
                        } else {
                            const outpoint = input.spentOutput.txid + input.spentOutput.n
                            const address: { address: string, clusterId: string } | undefined = input.spentOutput.scriptPubKey.addresses?.length === 1 ? {
                                address: input.spentOutput.scriptPubKey.addresses[0].address,
                                clusterId: input.spentOutput.scriptPubKey.addresses[0].guestimatedWallet.clusterId
                            } : undefined
                            const graphNode = props.outputsByOutpoint.get(outpoint)
                            const addButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                props.setOutputsByOutpoint(props.outputsByOutpoint.set(outpoint, new OutputNode({
                                    txid: input.spentOutput!.txid!,
                                    n: input.spentOutput!.n,
                                    spending_txid: txid,
                                    spending_index: index,
                                    value: input.spentOutput!.value,
                                    address: address
                                })))
                            }

                            const removeButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                props.setOutputsByOutpoint(props.outputsByOutpoint.delete(outpoint))
                            }
                            return <div key={outpoint} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <IconButton component={RouterLink} to={"/" + coin + "/transaction/" + input.spentOutput!.txid} aria-label="spending input">
                                    <ChevronLeftIcon />
                                </IconButton>
                                {input.spentOutput!.scriptPubKey.addresses?.map(address => <Link to={"/" + coin + "/address/" + address.address} key={address.address}>{address.address}</Link>)} ({input.spentOutput!.value})
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
                        }
                    })
                }
            </div>
        }
    } else {
        throw new Error("Loaded query didn't return error or data!")
    }
}