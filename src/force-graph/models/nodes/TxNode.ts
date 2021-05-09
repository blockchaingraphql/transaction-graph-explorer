import { InputLink } from "../links/InputLink"
import { OutputLink } from "../links/OutputLink"
import { StringLink } from "../links/StringLink"
import { GraphNode, NodeType } from "./Node"



export class TxNode implements GraphNode {
    readonly id: string
    readonly type = NodeType.Transaction
    scale: number = 1
    x: number | undefined
    y: number | undefined

    outputs: Set<OutputLink> = new Set()
    inputs: Set<InputLink> = new Set()

    constructor(txid: string, public coinbase: boolean) {
        this.id = txid
    }

    * inLinks(): Generator<StringLink> {
        for (const input of this.inputs) {
            yield input
        }
    }
    * outLinks(): Generator<StringLink> {
        for (const output of this.outputs) {
            yield output
        }
    }

}