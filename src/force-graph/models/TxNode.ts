import { StringIdNode } from "./StringIdNode"
import { StringLink } from "./StringLink"

export class TxNode extends StringIdNode {

    outLinks: StringLink[] = [];
    inLinks: StringLink[] = [];

    constructor(txid: string, public coinbase: boolean) {
        super(txid)
    }

}