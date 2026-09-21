import { Point3, Point2 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../../markup/redline/RedlineItem';
import { Uuid } from '../../../types';
import { MarkupRenderer } from '../../../markup';
import { IView } from '../../../core/IView';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class RedlineCircle extends RedlineItem {
    static readonly className = "Communicator.Markup.Redline.RedlineCircle";
    private _centerPt;
    private _radiusPt;
    private _circleShape;
    private static _validRadiusTolerance;
    private _previousDragPlanePosition;
    constructor(viewer: IWebViewer);
    setCenter(center: Point3): void;
    getCenter(): Point3;
    setRadiusPoint(radiusPoint: Point3): void;
    getRadiusPoint(): Point3;
    getUniqueId(): Uuid;
    private _update;
    draw(renderer: MarkupRenderer, view: IView): void;
    hit(point: Point2, view: IView): boolean;
    hitWithTolerance(point: Point2, view: IView, pickTolerance: number): boolean;
    onSelect(): void;
    onDeselect(): void;
    isValid(): boolean;
    onDragStart(position: Point2, view: IView): boolean;
    onDragMove(position: Point2, view: IView): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[RedlineCircle]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): RedlineCircle;
    getClassName(): string;
}
