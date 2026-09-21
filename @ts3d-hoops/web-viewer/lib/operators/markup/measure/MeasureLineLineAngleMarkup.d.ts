import { Point3 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './MeasureMarkup';
import { Polyline } from '../../../markup/shapes/Polyline';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureLineLineAngleMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureLineLineAngleMarkup";
    private _anchorLinePoint;
    private _firstLinePoint;
    private _secondLinePoint;
    private _selectionPosition;
    private _lineGeometryShape;
    constructor(viewer: IWebViewer);
    addPoint(position: Point3): boolean;
    setSelectionPosition(selectionPosition: Point3 | null): void;
    getLineGeometryShape(): Polyline;
    private _drawPreviewLine;
    private _drawAngleMarkup;
    draw(): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasurePointPointDistanceMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureLineLineAngleMarkup;
    getClassName(): string;
}
