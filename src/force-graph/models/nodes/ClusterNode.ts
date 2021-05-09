import { ClusterLink } from "../links/ClusterLink"
import { StringLink } from "../links/StringLink"
import { GraphNode, NodeType } from "./Node"

export class ClusterNode implements GraphNode {
    get id(): string {
        return "X" + this.clusterId
    }
    readonly type = NodeType.Cluster
    scale: number = 1
    x: number | undefined
    y: number | undefined

    addresses: Set<ClusterLink> = new Set()
    constructor(public clusterId: string) {
        //this.id = "X" + clusterId
    }
    * inLinks(): Generator<StringLink> {
        for (const address of this.addresses) {
            yield address
        }
    }
    * outLinks(): Generator<StringLink> {
    }
}