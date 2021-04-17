import { StringIdNode } from "./StringIdNode"

export class ClusterNode extends StringIdNode {
    constructor(public clusterId: string) {
        super("C" + clusterId)
    }
}