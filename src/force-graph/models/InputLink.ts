import { OutputNode } from "./OutputNode"
import { StringLink } from "./StringLink"
import { TxNode } from "./TxNode"

export class InputLink extends StringLink {
    public readonly source: OutputNode;
    public readonly target: TxNode
    constructor({ source, target }: { source: OutputNode, target: TxNode }) {
        super({ source: source, target: target })
        this.source = source
        this.target = target
    }
}