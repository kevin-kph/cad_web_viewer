import { Box } from '@ts3d-hoops/common';
import { NodeId } from '../types';
/** Per-floor information.
 * @hidden */
export declare class FloorInfo {
    readonly bounds: Box;
    readonly floorNode: NodeId;
    readonly slabNodes: NodeId[];
    readonly spaceNodes: NodeId[];
    readonly floorplanMeshCreationNodes: NodeId[];
    floorplanNode: NodeId | null;
    constructor(floorNode: NodeId, bounds: Box, slabNodes: NodeId[], spaceNodes: NodeId[], floorplanMeshCreationNodes: NodeId[]);
}
