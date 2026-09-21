import { Point3, Matrix, Point2 } from '@ts3d-hoops/common';
import { CircleElement } from '../../../internal/SubentityProperties';
import { MeasureLengthMarkup } from './MeasureLengthMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureCircleEdgeLengthMarkup extends MeasureLengthMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureCircleEdgeLengthMarkupMeasureMarkup";
    private _lineProperties;
    private _circlePoints;
    private _matrix;
    private _radius;
    private _surfaceCenter;
    private _circlePlane;
    private _arrowsInvert;
    constructor(viewer: IWebViewer, lineProperties: CircleElement, matrix: Matrix, unitMultiplier: number);
    private createCircleData;
    setLineGeometry(linePoints: Point3[]): void;
    adjust(position: Point2): void;
    private _updateArrowsInverted;
    update(): void;
    draw(): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasureCircleEdgeLengthMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureCircleEdgeLengthMarkup;
    getClassName(): string;
}
