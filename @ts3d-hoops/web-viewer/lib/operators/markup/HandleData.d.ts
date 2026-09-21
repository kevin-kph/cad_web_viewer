import { Point3, Matrix } from '@ts3d-hoops/common';
import { NodeId, HandleType } from '../../types';
/** @hidden */
export declare class HandleData {
    constructor(position: Point3, vector: Point3 | null, matrix: Matrix, nodeId: NodeId, handleType: HandleType, groupId: number);
    position: Point3;
    translation: Point3;
    vector: Point3 | null;
    matrix: Matrix;
    nodeId: NodeId;
    handleType: HandleType;
    groupId: number;
}
