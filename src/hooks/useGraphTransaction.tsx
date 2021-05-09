import { TxNode } from '../force-graph/models/nodes/TxNode'
import { useGraph } from './useGraph'

export function useGraphTransaction(props: { txid: string }) {
    const { graph, graphDispatch } = useGraph()

    const graphTx = graph.transactionsByTxid.get(props.txid)

    if (!graphTx) {
        return { transaction: graphTx, add: (node: TxNode) => graphDispatch({ type: "removeTransaction", node: node }) }
    } else {
        return {
            transaction: graphTx,
            remove: () => graphDispatch({ type: "removeTransaction", node: graphTx })

        }
    }
}