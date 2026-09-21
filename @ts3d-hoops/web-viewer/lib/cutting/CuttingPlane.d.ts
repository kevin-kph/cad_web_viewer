import { Matrix, Plane, Point3, Color } from '@ts3d-hoops/common';
import { MeshData } from '../MeshData';
import { MeshId } from '@ts3d-hoops/streamcache';
import { NodeId } from '../types';
import { CuttingPlaneData } from './types';
export declare class CuttingPlane implements CuttingPlaneData {
    plane: Plane;
    referenceGeometry: Point3[] | null;
    meshId: MeshId | null;
    instanceNodeId: NodeId | null;
    color: Color;
    lineColor: Color;
    opacity: number;
    matrix: Matrix;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): CuttingPlaneData;
    fromJson(json: object): void;
    getMatrix(): Matrix;
    setMatrix(matrix: Matrix): void;
    setReferenceGeometry(referenceGeometry: Point3[] | null): void;
    getReferenceGeometry(): Point3[] | null;
    createMeshData(): MeshData | null;
}
