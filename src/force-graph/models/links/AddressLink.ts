import { AddressNode } from "../nodes/AddressNode"
import { OutputNode } from "../nodes/OutputNode"
import { LinkType } from "./StringLink"
export class AddressLink {
    public readonly type = LinkType.AddressLink
    public readonly source: OutputNode
    public readonly target: AddressNode
    constructor({ source, target }: { source: OutputNode, target: AddressNode }) {
        this.source = source
        this.target = target
    }

}