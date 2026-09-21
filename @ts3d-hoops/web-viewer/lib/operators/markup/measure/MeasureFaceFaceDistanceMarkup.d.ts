import { Box, Matrix, Point2 } from '@ts3d-hoops/common';
import { Base } from '../../../internal/SubentityProperties';
import { FaceSelectionItem } from '../../../selection/types';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureFaceFaceDistanceMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureFaceFaceDistanceMarkup";
    private _faceSelection;
    private _line1PreviewShape1;
    private _line1PreviewShape2;
    private _line2PreviewShape1;
    private _line2PreviewShape2;
    private _matrix1;
    private _matrix2;
    private _lineGeometryShape;
    private _parallelFaces;
    private _triangulatedDistance;
    private _pointsOnSameRay;
    private _arrowsInvert;
    private _faceData;
    private _distance;
    private _surfaceCenter;
    private _surfaceAxis1;
    private _surfaceAxis2;
    private _cylinderAxisInfinite1;
    private _cylinderAxisInfinite2;
    private _secondPointInitial;
    private _firstPointHelper;
    private _secondPointHelper;
    private _secondPoint;
    private _firstPoint;
    private _textPos;
    constructor(viewer: IWebViewer);
    setUnitMultiplier(value: number): void;
    setFirstFace(sr: FaceSelectionItem, faceProperties: Base, matrix: Matrix, bbox: Box): void;
    getFirstSelection(): FaceSelectionItem | null;
    getFirstFaceData(): Base | null;
    cleanup(): void;
    private createCylinderData;
    setSecondFace(point: Point2, sr: FaceSelectionItem, faceProperties: Base, matrix: Matrix, bbox: Box): Promise<void>;
    adjust(position: Point2): void;
    private _updateArrowsInverted;
    _nextStage(): void;
    /** @hidden */
    update(): void;
    draw(): void;
    private static _serializeFaceProp;
    private static _constructFaceProp;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[MeasureFaceFaceDistanceMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureFaceFaceDistanceMarkup;
    getClassName(): string;
}
