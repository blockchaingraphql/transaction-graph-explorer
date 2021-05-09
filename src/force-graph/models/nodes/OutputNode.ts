import { AddressLink } from "../links/AddressLink"
import { InputLink } from "../links/InputLink"
import { OutputLink } from "../links/OutputLink"
import { StringLink } from "../links/StringLink"
import { GraphNode } from "./Node"

export class OutputNode implements GraphNode {
    readonly id: string
    readonly type: "output" = "output"
    scale: number = 1
    x: number | undefined
    y: number | undefined
    public txid: string
    public n: number
    public value: number
    public address?: { address: string, clusterId: string }
    public spending_txid: string | null
    public spending_index: number | null

    addressLink?: AddressLink
    spentByLink?: InputLink
    spentLink?: OutputLink

    constructor(
        e:
            { txid: string, n: number, value: number, address?: { address: string, clusterId: string }, spending_txid: string | null, spending_index: number | null }) {
        this.id = e.txid + e.n
        this.txid = e.txid
        this.n = e.n
        this.value = e.value
        this.address = e.address
        this.spending_txid = e.spending_txid
        this.spending_index = e.spending_index
    }


    * inLinks(): Generator<StringLink> {
        if (this.spentLink) yield this.spentLink
    }
    * outLinks(): Generator<StringLink> {
        if (this.spentByLink) yield this.spentByLink
        if (this.spentLink) yield this.spentLink
        if (this.addressLink) yield this.addressLink
    }

}