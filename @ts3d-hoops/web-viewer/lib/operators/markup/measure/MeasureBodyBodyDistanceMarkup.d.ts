import { Point2 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './MeasureMarkup';
import { NodeId } from '../../../types';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureBodyBodyDistanceMarkup extends MeasureMarkup {
    static readonly className = "Communicator.Markup.Measure.MeasureBodyBodyDistanceMarkup";
    private _firstNode;
    private _firstPointShape;
    private _secondPointShape;
    private _arrowsInvert;
    private _measurePoint1;
    private _measurePoint2;
    private _leaderPoint1;
    private _leaderPoint2;
    private _textPoint;
    private initCircle;
    constructor(viewer: IWebViewer);
    setUnitMultiplier(value: number): void;
    setFirstNode(node: NodeId): void;
    getFirstNode(): NodeId | null;
    setSecondNode(node: NodeId): Promise<void>;
    _getStage(): number;
    finalize(): void;
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
     * Creates a new [[MeasureBodyBodyDistanceMarkup]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): MeasureBodyBodyDistanceMarkup;
    getClassName(): string;
}
