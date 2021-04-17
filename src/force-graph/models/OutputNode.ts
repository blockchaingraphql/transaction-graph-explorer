import { StringIdNode } from "./StringIdNode"

export class OutputNode extends StringIdNode {
    public txid: string;
    public n: number;
    public value: number;
    public address?: { address: string, clusterId: string };
    public spending_txid: string | null;
    public spending_index: number | null;

    constructor(
        e:
            { txid: string, n: number, value: number, address?: { address: string, clusterId: string }, spending_txid: string | null, spending_index: number | null }) {
        super(e.txid + e.n)
        this.txid = e.txid
        this.n = e.n
        this.value = e.value
        this.address = e.address
        this.spending_txid = e.spending_txid
        this.spending_index = e.spending_index
    }

}