import { OutputNode } from "../nodes/OutputNode"
import { TxNode } from "../nodes/TxNode"
import { LinkType } from "./StringLink"

export class InputLink {
    public readonly type = LinkType.InputLink
    public readonly source: OutputNode
    public readonly target: TxNode
    constructor({ source, target }: { source: OutputNode, target: TxNode }) {
        this.source = source
        this.target = target
    }
}