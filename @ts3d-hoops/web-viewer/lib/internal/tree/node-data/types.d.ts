import { PmiTopoRef, LayerName } from '../../../types';
import { InstanceKey } from '@ts3d-hoops/streamcache';
export declare enum AuthoredLayerId {
}
export interface LayerInfo {
    readonly id: AuthoredLayerId;
    readonly name: LayerName | null;
}
export interface ReferenceOnTopologyInfo {
    readonly bodyInstanceKey: InstanceKey;
    readonly topoItemType: PmiTopoRef;
    readonly itemIndex: number;
}
