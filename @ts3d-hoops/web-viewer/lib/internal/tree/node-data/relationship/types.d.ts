import { BimId } from '../../../../types';
export declare enum BimStatus {
    Undefined = 0,
    Unconnected = 1,
    Connected = 2
}
/** Structure of an IFC relationship*/
export interface BimRelationship {
    related: BimObject[];
    relating: BimObject[];
}
/** One part of the relationships*/
export interface BimObject {
    category: BimStatus;
    id: BimId;
    name: string;
}
