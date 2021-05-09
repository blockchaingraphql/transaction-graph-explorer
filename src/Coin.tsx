import React, { useCallback, useEffect, useRef, useState } from "react"
import { OutputNode } from "./force-graph/models/nodes/OutputNode"
import { TxNode } from "./force-graph/models/nodes/TxNode"
import { AddressNode } from "./force-graph/models/nodes/AddressNode"
import TransactionForceGraph from "./force-graph/TransactionForceGraph"
import { Transaction } from "./transaction/Transaction"
import { ApolloClient, ApolloConsumer } from '@apollo/client'
import { Block } from "./block/Block"
import { Address } from "./address/Address"
import { Breadcrumbs, Link, makeStyles } from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home'
import {
    Switch,
    Route,
    useParams,
    useRouteMatch,
    useHistory,
    Link as RouterLink
} from "react-router-dom"
import { Wallet } from "./wallet/Wallet"
import { ClusterNode } from "./force-graph/models/nodes/ClusterNode"
import { CoinSearch } from "./search/CoinSearch"
import { TransactionOutput } from "./transaction-output/TransactionOutput"
import { GraphContext, useGraphReducer } from "./hooks/useGraphReducer"

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    }
}))


export function Coin({ client }: { client?: ApolloClient<object> }) {

    const [graph, graphDispatch] = useGraphReducer()

    const classes = useStyles()

    const { coin } = useParams<{ coin: string }>()

    const history = useHistory()
    const transactionClicked = useCallback((tx: TxNode, event: MouseEvent) => {
        if (event.button === 0) {//Left click
            history.push("/" + coin + "/transaction/" + tx.id)
            //expandTransaction(tx);
        }
    }, [coin, history])


    const addressClicked = useCallback(async (node: AddressNode, event: MouseEvent) => {
        if (event.button === 0) {//Left click
            history.push("/" + coin + "/address/" + node.address)
        }
    }, [coin, history])



    const outputClicked = useCallback(async (node: OutputNode, event: MouseEvent) => {
        if (event.button === 0) {//Left click
            history.push("/" + coin + "/output/" + node.txid + "-" + node.n)
            //expandOutput(node);
        }
    }, [coin, history])

    const clusterClicked = useCallback(async (node: ClusterNode, event: MouseEvent) => {
        if (event.button === 0) {//Left click
            history.push("/" + coin + "/wallet/" + node.clusterId)
        }
    }, [coin, history])

    const match = useRouteMatch()

    const cRef = useRef<HTMLDivElement>(null)

    const [graphDimensions, setGraphDimensions] = useState<{ width: number, height: number } | undefined>(cRef.current === null ? undefined : { width: cRef.current.clientWidth, height: cRef.current.clientHeight })

    useEffect(() => {
        const interval = setInterval(() => {
            if (cRef.current) {
                if (cRef.current.clientWidth !== graphDimensions?.width || cRef.current.clientHeight !== graphDimensions?.height) {
                    setGraphDimensions({ width: cRef.current.clientWidth, height: cRef.current.clientHeight })
                }
            }
        }, 100)
        return () => {
            clearInterval(interval)
        }
    }, [graphDimensions, setGraphDimensions])

    return <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <GraphContext.Provider value={{ graph: graph, graphDispatch: graphDispatch }}>
            <div style={{ flex: "0 1 auto", height: "100%", width: "50%", resize: "horizontal", overflow: "auto", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "row" }}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ flex: "1 0 auto", display: "flex", marginRight: "1ch" }}>
                        <Link
                            component={RouterLink}
                            color="inherit"
                            href={"/"}
                            to={"/"}
                            className={classes.link}
                        >
                            <HomeIcon className={classes.icon} />
                        </Link>
                        <Link
                            component={RouterLink}
                            color="inherit"
                            href={"/" + coin}
                            to={"/" + coin}
                            className={classes.link}
                        >
                            {coin}
                        </Link>
                    </Breadcrumbs>
                    <ApolloConsumer>
                        {(client: ApolloClient<object>) =>
                            <CoinSearch client={client} coin={coin} />
                        }
                    </ApolloConsumer>
                </div>
                <Switch>
                    <Route path={`${match.path}/transaction/:txid`}>
                        <Transaction
                        //outputsByOutpoint={outputsByOutpoint}
                        //setTransactionsByTxid={setTransactionsByTxid}
                        //setOutputsByOutpoint={setOutputsByOutpoint} 
                        />
                    </Route>
                    <Route path={`${match.path}/output/:txid-:n`}>
                        <TransactionOutput />
                    </Route>
                    <Route path={`${match.path}/block/:hash`}>
                        <Block />
                    </Route>
                    <Route path={`${match.path}/address/:address`}>
                        <Address />
                    </Route>
                    <Route path={`${match.path}/wallet/:address`}>
                        <Wallet />
                    </Route>
                    <Route path={match.path}>
                        <h3>{coin.replace("_", " ")}</h3>
                        <div>Blocks..</div>
                        <div>Unconfirmed transactions..</div>
                    </Route>
                </Switch>
            </div>
            <div style={{ flex: "1 1 0", height: "100%", backgroundColor: "blue", overflow: 'hidden' }} ref={cRef}>
                {graphDimensions && <TransactionForceGraph
                    /*transactionsByTxid={transactionsByTxid}
                    outputsByOutpoint={outputsByOutpoint}
                    addressesById={outputAddressesAndClusters.updatedAddresses}
                    clustersById={outputAddressesAndClusters.updatedClusters}*/
                    transactionClicked={transactionClicked}
                    outputClicked={outputClicked}
                    addressClicked={addressClicked}
                    clusterClicked={clusterClicked}
                    width={graphDimensions.width}
                    height={graphDimensions.height}
                />}
            </div>
        </GraphContext.Provider>
    </div>
}

function wrapper() {
    return <ApolloConsumer>
        {client =>
            <Coin client={client} />
        }
    </ApolloConsumer>
}

export default wrapper