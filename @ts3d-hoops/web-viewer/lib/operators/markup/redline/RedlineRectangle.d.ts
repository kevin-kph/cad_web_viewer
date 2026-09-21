import { Point2, Point3 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../../markup/redline/RedlineItem';
import { Uuid } from '../../../types';
import { MarkupRenderer } from '../../../markup/MarkupRenderer';
import { IView } from '../../../core/IView';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class RedlineRectangle extends RedlineItem {
    static readonly className = "Communicator.Markup.Redline.RedlineRectangle";
    private _point1;
    private _point2;
    private _rectangleShape;
    private static _validSizeTolerance;
    private _previousDragPlanePosition;
    constructor(viewer: IWebViewer);
    setPoint1(point1: Point3): void;
    getPoint1(): Point3;
    setPoint2(point2: Point3): void;
    getPoint2(): Point3;
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
     * Creates a new [[RedlineRectangle]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): RedlineRectangle;
    getClassName(): string;
}
