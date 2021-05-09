import { AddressNode } from "../nodes/AddressNode"
import { ClusterNode } from "../nodes/ClusterNode"
import { LinkType } from "./StringLink"

export class ClusterLink {
    public readonly type = LinkType.ClusterLink
    public readonly source: AddressNode
    public readonly target: ClusterNode
    constructor({ source, target }: { source: AddressNode, target: ClusterNode }) {
        this.source = source
        this.target = target
    }
}