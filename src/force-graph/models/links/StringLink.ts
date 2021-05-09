import { AddressLink } from "./AddressLink"
import { ClusterLink } from "./ClusterLink"
import { InputLink } from "./InputLink"
import { OutputLink } from "./OutputLink"

export type StringLink = AddressLink | ClusterLink | InputLink | OutputLink

/*export abstract class StringLink implements LinkObject {
    public static readonly type: string = "asd"
    public readonly source: StringIdNode
    public readonly target: StringIdNode

    constructor({ source, target }: { source: StringIdNode, target: StringIdNode }) {
        this.source = source
        this.target = target
    }
}*/