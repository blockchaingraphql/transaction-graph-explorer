import { useCallback, useEffect, useRef, useState } from "react"
import { OutputNode } from "./force-graph/models/OutputNode"
import { TxNode } from "./force-graph/models/TxNode"
import { AddressNode } from "./force-graph/models/AddressNode"
import TransactionForceGraph from "./force-graph/TransactionForceGraph"
import { Transaction } from "./transaction/Transaction"
import { ApolloClient, ApolloConsumer } from '@apollo/client'
import * as Immutable from 'immutable'
import { Block } from "./block/Block"
import { Address } from "./address/Address"
import { GlobalSearch } from "./search/GlobalSearch"
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
import { ClusterNode } from "./force-graph/models/ClusterNode"

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

    const classes = useStyles()

    const [outputsByOutpoint, setOutputsByOutpoint] = useState<Immutable.Map<string, OutputNode>>(Immutable.Map())//useReducer((state: Immutable.Map<string, OutputNode>, action: Immutable.Map<string, OutputNode>) => action, Immutable.Map<string, OutputNode>());

    const [transactionsByTxid, setTransactionsByTxid] = useState<Immutable.Map<string, TxNode>>(Immutable.Map())

    let { coin } = useParams<{ coin: string }>()

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
            //expandOutput(node);
        }
    }, [])

    const clusterClicked = useCallback(async (node: ClusterNode, event: MouseEvent) => {
        if (event.button === 0) {//Left click
            history.push("/" + coin + "/wallet/" + node.clusterId)
        }
    }, [coin, history])

    let match = useRouteMatch()

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
                        <GlobalSearch client={client} />
                    }
                </ApolloConsumer>
            </div>
            <Switch>
                <Route path={`${match.path}/transaction/:txid`}>
                    <Transaction
                        transactionsByTxid={transactionsByTxid}
                        outputsByOutpoint={outputsByOutpoint}
                        setTransactionsByTxid={setTransactionsByTxid}
                        setOutputsByOutpoint={setOutputsByOutpoint} />
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
                transactionsByTxid={transactionsByTxid}
                outputsByOutpoint={outputsByOutpoint}
                transactionClicked={transactionClicked}
                outputClicked={outputClicked}
                addressClicked={addressClicked}
                clusterClicked={clusterClicked}
                width={graphDimensions.width}
                height={graphDimensions.height}
            />}
        </div>
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