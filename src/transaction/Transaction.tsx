import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Tab, Tabs, Tooltip, Typography } from "@material-ui/core"
import { useParams } from "react-router"
import { useTransactionById2Query } from "../generated/graphql"
import { TxNode } from "../force-graph/models/TxNode"
import { OutputNode } from "../force-graph/models/OutputNode"
import * as Immutable from 'immutable'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { TransactionInputs } from "./TransactionInputs"
import { TransactionOutputs } from "./TransactionOutputs"
import { useState } from "react"
import { AutoSizer, Dimensions, Size } from "react-virtualized"

interface Props {
    transactionsByTxid: Immutable.Map<string, TxNode>
    outputsByOutpoint: Immutable.Map<string, OutputNode>
    setTransactionsByTxid: React.Dispatch<React.SetStateAction<Immutable.Map<string, TxNode>>>
    setOutputsByOutpoint: React.Dispatch<React.SetStateAction<Immutable.Map<string, OutputNode>>>
}


function TabPanel(props: { children: any, index: number, value: any }) {
    const { children, value, index, ...other } = props

    return (
        <div
            style={{ overflow: "auto" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    )
}


function TransactionCardContent(props: Props) {
    let { coin, txid } = useParams<{ coin: string, txid: string }>()
    const [tabIndex, setTabIndex] = useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue)
    }

    const { data, error, loading } = useTransactionById2Query({ variables: { txid: txid, coin: coin } })
    if (data) {
        if (data.coin) {
            if (data.coin.transaction) {
                return <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
                    <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example" style={{ flex: "0 1 auto" }}>
                        <Tab label={data.coin?.transaction?.inputCount + " inputs"} />
                        <Tab label={data.coin?.transaction?.outputCount + " outputs"} />
                    </Tabs>
                    <div style={{ flex: "1 1 auto" }} id="lol">
                        <AutoSizer onResize={(size: Size) => {
                        }} disableWidth>
                            {({ height, width }: Dimensions) => (
                                <div style={{ height: height, width: "100%", overflow: 'auto' }}>
                                    <TabPanel value={tabIndex} index={0}>
                                        <TransactionInputs {...props} />
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        <TransactionOutputs {...props} />
                                    </TabPanel>
                                </div>
                            )}
                        </AutoSizer>
                    </div>
                </div>
            } else {
                return <div>Transaction {txid} not found</div>
            }
        } else {
            return <div>Coin {coin} not found</div>
        }
    } else {
        if (loading) {
            return <div>Loading...</div>
        } else if (error) {
            return <div>Error: {error}</div>
        } else {
            throw new Error("Loaded query didn't return error or data!")
        }
    }
}

export function Transaction(props: Props) {
    let { txid } = useParams<{ coin: string, txid: string }>()
    //const txNode: TxNode = new TxNode(txid, false);
    const graphNode = props.transactionsByTxid.get(txid)


    const addButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.setTransactionsByTxid(props.transactionsByTxid.set(txid, new TxNode(txid, false)))
    }

    const removeButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.setTransactionsByTxid(props.transactionsByTxid.delete(txid))
    }

    return <Card style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
        <CardHeader title="TRANSACTION" subheader={txid} />
        <CardContent style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
            <Paper style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
                <TransactionCardContent {...props} />
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