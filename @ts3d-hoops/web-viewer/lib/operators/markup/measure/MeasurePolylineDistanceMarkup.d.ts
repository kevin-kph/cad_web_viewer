import { Point2, Point3 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasurePolylineDistanceMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasurePolylineDistanceMarkup";
    private readonly _polyline;
    private readonly _initialPoint;
    private readonly _leaderLine;
    private readonly _endpoints;
    private readonly _textboxCorners;
    textPosition: Point3;
    leaderPosition: Point3;
    isLoop: boolean;
    pointRadius: number;
    constructor(viewer: IWebViewer);
    /** Adds a point to the pointlist and updates the calculated polyline distance */
    addPoint(point: Point3): void;
    getPoints(): Point3[];
    getlast(): Point3 | null;
    finalize(): void;
    setUnitMultiplier(value: number): void;
    isValid(): boolean;
    getMeasurementText(): string;
    /** Calculates the screen position for each point in the polyline */
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
     * Creates a new [[MeasurePolylineDistanceMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasurePolylineDistanceMarkup;
    /** This measurement only allows clicking on the text box portion of the markup. */
    hit(point: Point2): boolean;
    getClassName(): string;
}
