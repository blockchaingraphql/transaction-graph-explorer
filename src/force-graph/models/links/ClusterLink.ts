import { AddressNode } from "../nodes/AddressNode"
import { ClusterNode } from "../nodes/ClusterNode"

export class ClusterLink {
    public readonly type: "ClusterLink" = "ClusterLink"
    public readonly source: AddressNode
    public readonly target: ClusterNode
    constructor({ source, target }: { source: AddressNode, target: ClusterNode }) {
        this.source = source
        this.target = target
    }
}