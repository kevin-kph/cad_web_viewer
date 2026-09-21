import { NodeSelectionItem, Op } from './types';
export declare class NodeCounts {
    none: number;
    face: number;
    line: number;
    point: number;
    part: number;
    update(item: NodeSelectionItem, op: Op): void;
    sum(): number;
}
