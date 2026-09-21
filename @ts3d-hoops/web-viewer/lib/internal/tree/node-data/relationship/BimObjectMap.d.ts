import { BimObject } from './types';
export declare class BimObjectMap extends Map<string, BimObject> {
    computeHashKey(bimObject: BimObject): string;
    add(bimObject: BimObject): void;
    addMany(...bimObjects: BimObject[]): void;
}
