import { Plane, Point3 } from '@ts3d-hoops/common';
import { NodeId } from '../types';
import { ICuttingSection } from '../core';
/** @hidden */
export declare class CuttingPlaneOperatorContext {
    constructor(cuttingSection: ICuttingSection, node: NodeId, cuttingPlaneIndex: number, cuttingPlane: Plane, selectionPosition: Point3);
    readonly section: ICuttingSection;
    readonly selectionPosition: Point3;
    readonly node: number;
    readonly plane: Plane;
    readonly planeIndex: number;
    readonly origPlaneD: number;
}
