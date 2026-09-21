import { Point2 } from '@ts3d-hoops/common';
import { FaceSelectionItem } from '../../../selection/types';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureFaceFaceAngleMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureFaceFaceAngleMarkup";
    private _faceSelection;
    private _arcArray;
    private _lineGeometryShape;
    private planeIntersectionLine;
    private _pointOnLine;
    private _clickpointOriginal2;
    private _clickpointOriginal1;
    private _plane1;
    private _plane2;
    private _secondPoint;
    private _firstPoint;
    private _textPos;
    private _intermediatePoint;
    private _textAnchorPoint;
    private _angle;
    private _useAuthoredNormals;
    constructor(viewer: IWebViewer);
    private _getNormalAndPositionFromSelection;
    getFirstSelection(): FaceSelectionItem;
    setFirstFace(sr: FaceSelectionItem): Promise<void>;
    setSecondFace(sr: FaceSelectionItem): Promise<boolean>;
    adjust(position: Point2): void;
    _nextStage(): void;
    cleanup(): void;
    update(): void;
    draw(): void;
    /**
     * Sets whether created markup will use authored normals or use selection results to calculate angles
     * @param use
     */
    setUseAuthoredNormals(use: boolean): void;
    /**
     * Gets whether created markup will use authored normals or use selection results to calculate angles
     */
    getUseAuthoredNormals(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasureFaceFaceAngleMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureFaceFaceAngleMarkup;
    getClassName(): string;
}
