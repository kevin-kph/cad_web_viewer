import { Point3, Point2 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasurePointPointDistanceMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasurePointPointDistanceMarkup";
    private _firstPointShape;
    private _secondPointShape;
    private _arrowsInvert;
    private initCircle;
    constructor(viewer: IWebViewer);
    setUnitMultiplier(value: number): void;
    setFirstPointPosition(position: Point3): void;
    setSecondPointPosition(position: Point3): void;
    _getStage(): number;
    finalize(): void;
    getFirstPointPosition(): Point3;
    getSecondPointPosition(): Point3;
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
     * Creates a new [[MeasurePointPointDistanceMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasurePointPointDistanceMarkup;
    getClassName(): string;
    /**
     * Returns whether the measurement markup is valid.
     */
    isMarkupValid(): boolean;
}
