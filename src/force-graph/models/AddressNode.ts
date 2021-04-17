import { StringIdNode } from "./StringIdNode"

export class AddressNode extends StringIdNode {
    constructor(public address: string, public clusterId: string) {
        super(address)
    }
}