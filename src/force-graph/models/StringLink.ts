import { LinkObject } from "react-force-graph-2d"
import { StringIdNode } from "./StringIdNode"

export class StringLink implements LinkObject {
    public readonly source: StringIdNode;
    public readonly target: StringIdNode
    constructor({ source, target }: { source: StringIdNode, target: StringIdNode }) {
        this.source = source
        this.target = target
    }
}