import { AddressNode } from "./nodes/AddressNode"
import { ClusterNode } from "./nodes/ClusterNode"
import { OutputNode } from "./nodes/OutputNode"
import { TxNode } from "./nodes/TxNode"

export interface Graph {
    readonly outputsByOutpoint: ReadonlyMap<string, OutputNode>
    readonly transactionsByTxid: ReadonlyMap<string, TxNode>
    readonly addressesById: ReadonlyMap<string, AddressNode>
    readonly clustersByClusterId: ReadonlyMap<string, ClusterNode>
    readonly txidToInputs: ReadonlyMap<string, ReadonlySet<OutputNode>>
    readonly txidToOutputs: ReadonlyMap<string, ReadonlySet<OutputNode>>
}