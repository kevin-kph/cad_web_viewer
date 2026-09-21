import { Point2, Point3 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasurePolygonAreaMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasurePolygonAreaMarkup";
    private readonly _initialPoint;
    private readonly _leaderLine;
    private readonly _endpoints;
    private readonly _textboxCorners;
    private readonly _polygon;
    private _plane;
    textPosition: Point3;
    leaderPosition: Point3;
    pointRadius: number;
    constructor(viewer: IWebViewer);
    private _calculateArea;
    /**
     * Adds a point to the point list and updates the calculated polygon area.
     * Only points that are coplanar will be added.
     * Returns a bool representing if the point was accepted or not
     */
    addPoint(point: Point3): boolean;
    getPoints(): Point3[];
    getLast(): Point3 | null;
    finalize(): void;
    setUnitMultiplier(value: number): void;
    isValid(): boolean;
    getMeasurementText(): string;
    /** Calculates the screen position for each point in the polygon */
    private _updateProjectedPoints;
    private _updateTextBoxCorners;
    /** Finds and returns the closest corner of the text box.  Used as the endpoint of the leader line. */
    private _calculateLeaderEndpoint;
    draw(): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasurePolygonAreaMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasurePolygonAreaMarkup;
    /** This measurement only allows clicking on the text box portion of the markup. */
    hit(point: Point2): boolean;
    getClassName(): string;
}
