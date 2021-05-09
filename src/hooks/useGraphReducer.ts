import { Draft } from "immer"
import { createContext } from "react"
import { useImmerReducer, Reducer } from "use-immer"
import { Graph } from "../force-graph/models/Graph"
import { AddressLink } from "../force-graph/models/links/AddressLink"
import { ClusterLink } from "../force-graph/models/links/ClusterLink"
import { InputLink } from "../force-graph/models/links/InputLink"
import { OutputLink } from "../force-graph/models/links/OutputLink"
import { AddressNode } from "../force-graph/models/nodes/AddressNode"
import { ClusterNode } from "../force-graph/models/nodes/ClusterNode"
import { OutputNode } from "../force-graph/models/nodes/OutputNode"
import { TxNode } from "../force-graph/models/nodes/TxNode"

export const GraphContext = createContext<{ graph: Graph, graphDispatch: React.Dispatch<GraphAction> } | undefined>(undefined)

const graphReducer: Reducer<Graph, GraphAction> = (draft, action) => {
    switch (action.type) {
        case 'addTransaction':
            addTransaction(draft, action.node)
            break
        case 'addOutput':
            addOutput(draft, action.node)
            break
        case 'removeTransaction':
            removeTransaction(draft, action.node)
            break
        case 'removeOutput':
            removeOutput(draft, action.node)
            break
    }
}

const addTransaction = (draft: Draft<Graph>, transaction: TxNode): void => {
    if (draft.transactionsByTxid.has(transaction.id)) return
    const existingInputs = draft.txidToInputs.get(transaction.id)
    if (existingInputs) {
        for (const spentOutput of existingInputs) {
            const link = new InputLink({ source: spentOutput, target: transaction })
            console.log("CREATING INPUTLINK", spentOutput, transaction)
            spentOutput.spentByLink = link
            transaction.inputs.add(link)
        }
    }
    const existingOutputs = draft.txidToOutputs.get(transaction.id)
    if (existingOutputs) {
        for (const output of existingOutputs) {
            const link = new OutputLink({ source: transaction, target: output })
            console.log("CREATING OUTPUTLINK")
            output.spentLink = link
            transaction.outputs.add(link)
        }
    }
    draft.transactionsByTxid.set(transaction.id, transaction)
}

const removeTransaction = (draft: Draft<Graph>, transaction: TxNode): void => {
    draft.transactionsByTxid.delete(transaction.id)
    transaction.inputs.forEach(input => {
        delete input.source.spentByLink
    })
    transaction.outputs.forEach(output => {
        delete output.target.spentLink
    })
}

const removeCluster = (draft: Draft<Graph>, cluster: ClusterNode): void => {
    draft.clustersByClusterId.delete(cluster.clusterId)
    for (const addressLink of cluster.addresses) {
        delete addressLink.source.cluster
    }
}

const removeAddress = (draft: Draft<Graph>, address: AddressNode): void => {
    draft.addressesById.delete(address.id)
    if (address.cluster) {
        address.cluster.target.addresses.delete(address.cluster)
        if (address.cluster.target.addresses.size === 0) {
            removeCluster(draft, address.cluster.target)
        }
    }
    for (const outputLink of address.outputs) {
        delete outputLink.source.addressLink
    }
}


const addOutput = (draft: Draft<Graph>, output: OutputNode): void => {
    if (draft.outputsByOutpoint.has(output.id)) return
    if (output.address) {
        const existingCluster = draft.clustersByClusterId.get(output.address.clusterId)
        if (!existingCluster) {//Create cluster and address
            const newCluster = new ClusterNode(output.address.clusterId)
            draft.clustersByClusterId.set(newCluster.clusterId, newCluster)
            const newAddress = new AddressNode(output.address.address, newCluster)
            draft.addressesById.set(newAddress.id, newAddress)
            const clusterLink = new ClusterLink({ source: newAddress, target: newCluster })
            newCluster.addresses.add(clusterLink)
            newAddress.cluster = clusterLink
            const addressLink = new AddressLink({ source: output, target: newAddress })
            newAddress.outputs.add(addressLink)
            output.addressLink = addressLink
        } else {
            console.log("CLUSTER EXISTS")
            const existingAddress = draft.addressesById.get(output.address.address)
            if (!existingAddress) {//Create address
                console.log("CREATING ADDRESS")
                const newAddress = new AddressNode(output.address.address, existingCluster)
                draft.addressesById.set(output.address.address, newAddress)
                const clusterLink = new ClusterLink({ source: newAddress, target: existingCluster })
                existingCluster.addresses.add(clusterLink)
                newAddress.cluster = clusterLink
                const addressLink = new AddressLink({ source: output, target: newAddress })
                output.addressLink = addressLink
                newAddress.outputs.add(addressLink)
            } else {//Link to existing address
                const addressLink = new AddressLink({ source: output, target: existingAddress })
                output.addressLink = addressLink
                existingAddress.outputs.add(addressLink)
            }
        }

    }
    if (output.spending_txid) {
        let txidIdToInputs = draft.txidToInputs.get(output.spending_txid)
        if (!txidIdToInputs) {
            txidIdToInputs = new Set()
            draft.txidToInputs.set(output.spending_txid, txidIdToInputs)
        }
        console.log("ADDING INPUT FOR " + output.spending_txid)
        txidIdToInputs.add(output)
        const existingSpendingTransaction = draft.transactionsByTxid.get(output.spending_txid)//Add link
        if (existingSpendingTransaction) {
            const inputLink = new InputLink({ source: output, target: existingSpendingTransaction })
            existingSpendingTransaction.inputs.add(inputLink)
            output.spentByLink = inputLink
        }
    }
    let txidToOutputs = draft.txidToOutputs.get(output.txid)
    if (!txidToOutputs) {
        txidToOutputs = new Set()
        draft.txidToOutputs.set(output.txid, txidToOutputs)
    }
    console.log("ADDING OUTPUT FOR " + output.txid)
    txidToOutputs.add(output)
    const existingTransaction = draft.transactionsByTxid.get(output.txid)
    if (existingTransaction) {
        const outputLink = new OutputLink({ source: existingTransaction, target: output })
        existingTransaction.outputs.add(outputLink)
        output.spentLink = outputLink
    }
    draft.outputsByOutpoint.set(output.id, output)
}

const removeOutput = (draft: Draft<Graph>, output: OutputNode): void => {
    draft.outputsByOutpoint.delete(output.id)
    if (output.spending_txid) {
        let txidIdToInputs = draft.txidToInputs.get(output.spending_txid)!
        console.log("DELETING INPUT OF " + output.spending_txid)
        if (txidIdToInputs.size > 1) {
            txidIdToInputs.delete(output)
        } else {
            draft.txidToInputs.delete(output.spending_txid)
        }
    }
    if (output.txid) {
        let txidIdToOutputs = draft.txidToOutputs.get(output.txid)!
        console.log("DELETING OUTPUT OF " + output.txid)
        if (txidIdToOutputs.size > 1) {
            txidIdToOutputs.delete(output)
        } else {
            draft.txidToOutputs.delete(output.txid)
        }
    }
    if (output.spentByLink) {
        output.spentByLink.target.inputs.delete(output.spentByLink)
    }
    if (output.spentLink) {
        output.spentLink.source.outputs.delete(output.spentLink)
    }
    if (output.addressLink) {
        output.addressLink.target.outputs.delete(output.addressLink)
        if (output.addressLink.target.outputs.size === 0) {//Delete address
            removeAddress(draft, output.addressLink.target)
        }
    }

    //Delete inLinks, outLink, if output then delete address and cluster if they have no other connections
}


interface AddTransactionAction {
    type: "addTransaction"
    node: TxNode
}

interface AddOutputAction {
    type: "addOutput"
    node: OutputNode
}

interface RemoveTransactionAction {
    type: "removeTransaction"
    node: TxNode
}

interface RemoveOutputAction {
    type: "removeOutput"
    node: OutputNode
}

export type GraphAction = AddTransactionAction | AddOutputAction | RemoveTransactionAction | RemoveOutputAction

const emptyGraph: Graph = {
    outputsByOutpoint: new Map(),
    transactionsByTxid: new Map(),
    addressesById: new Map(),
    clustersByClusterId: new Map(),
    txidToInputs: new Map(),
    txidToOutputs: new Map()
}

export function useGraphReducer() {
    return useImmerReducer(graphReducer, emptyGraph)
}