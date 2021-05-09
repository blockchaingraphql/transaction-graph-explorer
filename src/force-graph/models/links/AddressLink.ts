import { AddressNode } from "../nodes/AddressNode"
import { OutputNode } from "../nodes/OutputNode"
export class AddressLink {
    public readonly type: "AddressLink" = "AddressLink"
    public readonly source: OutputNode
    public readonly target: AddressNode
    constructor({ source, target }: { source: OutputNode, target: AddressNode }) {
        this.source = source
        this.target = target
    }

}