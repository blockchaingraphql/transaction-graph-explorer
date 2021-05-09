import { ClusterNode } from "./ClusterNode"
import { GraphNode, NodeType } from "./Node"
import { StringLink } from "../links/StringLink"
import { ClusterLink } from "../links/ClusterLink"
import { AddressLink } from "../links/AddressLink"

export class AddressNode implements GraphNode {
    readonly id: string
    readonly type = NodeType.Address//"address" = "address"
    scale: number = 1
    x: number | undefined
    y: number | undefined

    cluster?: ClusterLink
    outputs: Set<AddressLink> = new Set()
    constructor(public address: string, public clusterNode: ClusterNode) {
        this.id = address
        //super(address)
    }
    * inLinks(): Generator<StringLink> {
        for (const output of this.outputs) {
            yield output
        }
    }
    * outLinks(): Generator<StringLink> {
        if (this.cluster) yield this.cluster
    }
}