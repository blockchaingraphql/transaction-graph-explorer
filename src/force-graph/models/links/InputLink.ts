import { OutputNode } from "../nodes/OutputNode"
import { TxNode } from "../nodes/TxNode"

export class InputLink {
    public readonly type: "InputLink" = "InputLink"
    public readonly source: OutputNode
    public readonly target: TxNode
    constructor({ source, target }: { source: OutputNode, target: TxNode }) {
        this.source = source
        this.target = target
    }
}