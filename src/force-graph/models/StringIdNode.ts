import { NodeObject } from "react-force-graph-2d"
import { StringLink } from "./StringLink"

export class StringIdNode implements NodeObject {
    x?: number;
    y?: number;
    outLinks: StringLink[] = [];
    inLinks: StringLink[] = [];
    scale: number = 1;
    constructor(public readonly id: string) {

    }
}