import { OutputNode } from "../nodes/OutputNode"
import { TxNode } from "../nodes/TxNode"
import { LinkType } from "./StringLink"

export class OutputLink {
    public readonly type = LinkType.OutputLink
    public readonly source: TxNode
    public readonly target: OutputNode
    constructor({ source, target }: { source: TxNode, target: OutputNode }) {
        this.source = source
        this.target = target
    }

}