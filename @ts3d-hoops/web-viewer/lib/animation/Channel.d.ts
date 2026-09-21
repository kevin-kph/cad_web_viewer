import { Color } from '@ts3d-hoops/common';
import { NodeId } from '../types';
import { ExportContext, ImportContext } from './ImportExport';
import { Sampler } from './Sampler';
import { NodeValues, BatchedCameraValues } from './Values';
export declare enum NodeProperty {
    Translation = 0,
    Rotation = 1,
    Scale = 2,
    Opacity = 3,
    Visibility = 4,
    Color = 5,
    ColorMap = 6
}
export interface ColorPosition {
    color: Color;
    position: number;
}
/**
 * RGB color values are specified in the 0-255 range.
 * Positions are specified in the 0-1 range, pre-sorted in ascending order.
 */
export type ColorMap = ColorPosition[];
export declare class NodeChannel {
    readonly name: string;
    readonly nodeId: NodeId;
    readonly property: NodeProperty;
    readonly sampler: Sampler;
    colorMap: ColorMap | undefined;
    constructor(name: string, nodeId: NodeId, property: NodeProperty, sampler: Sampler);
    /** @hidden */
    _getValue(t: number, values: NodeValues): void;
    private _getColorFromMap;
    /** @hidden */
    _gatherForExport(context: ExportContext): void;
    /** @hidden */
    _export(context: ExportContext): {
        name?: string;
        colorMap?: number;
        nodeId: number;
        property: keyof typeof NodeProperty;
        sampler: number;
    };
    /** @hidden */
    static _import(context: ImportContext, data: ReturnType<NodeChannel['_export']>): NodeChannel;
}
export declare enum CameraProperty {
    Position = 0,
    Target = 1,
    Up = 2,
    Width = 3,
    Height = 4
}
export declare class CameraChannel {
    readonly name: string;
    readonly property: CameraProperty;
    readonly sampler: Sampler;
    /**
     * Do not use directly.  Create via Animation class API.
     * @hidden
     * */
    constructor(name: string, property: CameraProperty, sampler: Sampler);
    /** @hidden */
    _getValue(t: number, values: BatchedCameraValues): void;
    /** @hidden */
    _gatherForExport(context: ExportContext): void;
    /** @hidden */
    _export(context: ExportContext): {
        name?: string;
        property: keyof typeof CameraProperty;
        sampler: number;
    };
    /** @hidden */
    static _import(context: ImportContext, data: ReturnType<CameraChannel['_export']>): CameraChannel;
}
