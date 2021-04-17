import { OutputNode } from "./OutputNode"
import { StringLink } from "./StringLink"
import { TxNode } from "./TxNode"

export class OutputLink extends StringLink {
    public readonly source: TxNode;
    public readonly target: OutputNode
    constructor({ source, target }: { source: TxNode, target: OutputNode }) {
        super({ source: source, target: target })
        this.source = source
        this.target = target
    }
}