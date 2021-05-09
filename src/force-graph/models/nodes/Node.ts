import { NodeObject } from "react-force-graph-2d"
import { StringLink } from "../links/StringLink"
import { AddressNode } from "./AddressNode"
import { ClusterNode } from "./ClusterNode"
import { OutputNode } from "./OutputNode"
import { TxNode } from "./TxNode"

export type StringIdNode = AddressNode | ClusterNode | OutputNode | TxNode

export enum NodeType {
    Transaction,
    Output,
    Address,
    Cluster,
}

export interface GraphNode extends NodeObject {
    readonly id: string
    scale: number
    x: number | undefined
    y: number | undefined
    readonly outLinks: () => Generator<StringLink>
    readonly inLinks: () => Generator<StringLink>
    /*outLinks: StringLink[]
    inLinks: StringLink[]*/
}
/*export abstract class StringIdNode implements NodeObject {
    abstract type: string
    x?: number
    y?: number
    outLinks: StringLink[] = [];
    inLinks: StringLink[] = [];
    scale: number = 1;
    constructor(public readonly id: string) {

    }
}*/