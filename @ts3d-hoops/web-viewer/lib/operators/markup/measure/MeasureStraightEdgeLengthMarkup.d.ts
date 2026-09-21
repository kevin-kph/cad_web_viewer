import { Matrix, Point2, Point3 } from '@ts3d-hoops/common';
import { LineElement, OtherEdgeElement } from '../../../internal/SubentityProperties';
import { MeasureLengthMarkup } from './MeasureLengthMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureStraightEdgeLengthMarkup extends MeasureLengthMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureStraightEdgeLengthMarkup";
    private _lineProperties;
    private _matrix;
    private _worldSpaceLength;
    private _arrowsInvert;
    /** @hidden */
    constructor(viewer: IWebViewer, lineProperties: LineElement | OtherEdgeElement | null, matrix: Matrix, unitMultiplier: number);
    /** @hidden */
    setLineGeometry(linePoints: Point3[]): void;
    /** @hidden */
    adjust(position: Point2): void;
    private _updateArrowsInverted;
    /** @hidden */
    update(): void;
    /** @hidden */
    draw(): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasureStraightEdgeLengthMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureStraightEdgeLengthMarkup;
    getClassName(): string;
}
