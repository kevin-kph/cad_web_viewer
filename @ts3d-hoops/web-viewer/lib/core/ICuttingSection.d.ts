import { Color, IColor, Matrix, Plane, Point3 } from '@ts3d-hoops/common';
import { NodeId } from '../types';
import { CuttingPlane } from '../cutting';
export interface ICuttingSection {
    activate(): Promise<void>;
    addPlane(plane: Plane, referenceGeometry: Point3[] | null, options?: {
        color?: IColor;
        lineColor?: IColor;
        opacity?: number;
    }): Promise<boolean>;
    applyPlaneOpacity(index: number, opacity?: number): void;
    clear(): Promise<void>;
    deactivate(): Promise<void>;
    fromJson(json: object): Promise<void>;
    getCount(): number;
    getCuttingPlanes(): CuttingPlane[];
    getNodeId(index: number): NodeId | null;
    getPlane(index: number): Plane | null;
    getPlaneColor(index: number): Color | undefined;
    getPlaneIndexByNodeId(id: NodeId): number | null;
    getPlaneLineColor(index: number): Color | undefined;
    getPlaneOpacity(index: number): number | undefined;
    getReferenceGeometry(index: number): Point3[] | null;
    isActive(): boolean;
    removePlane(index: number): Promise<void>;
    resetPlanesOpacity(): void;
    setColor(color: Color): Promise<void>;
    setOpacity(opacity: number): void;
    setPlane(index: number, plane: Plane, referenceGeometry: Point3[] | null, options?: {
        color?: IColor;
        lineColor?: IColor;
        opacity?: number;
    }): Promise<void>;
    setPlaneColor(index: number, color: Color): void;
    setPlaneLineColor(index: number, color: Color): void;
    setPlaneOpacity(index: number, opacity: number): void;
    toJson(): object;
    updatePlane(index: number, plane: Plane, geometryMatrix: Matrix, finalizePosition: boolean, resetTranslation: boolean): Promise<void>;
    _getInstanceNodeIds(): NodeId[];
}
