import { Point3, Point2 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../../markup/redline/RedlineItem';
import { MarkupRenderer } from '../../../markup/MarkupRenderer';
import { IView } from '../../../core/IView';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class RedlinePolyline extends RedlineItem {
    static readonly className = "Communicator.Markup.Redline.RedlinePolyline";
    private _points;
    private _polylineShape;
    private _previousDragPlanePosition;
    constructor(viewer: IWebViewer);
    addPoint(point: Point3): void;
    getPoints(): Point3[];
    private _update;
    draw(renderer: MarkupRenderer, view: IView): void;
    hit(point: Point2, view: IView): boolean;
    hitWithTolerance(point: Point2, view: IView, pickTolerance: number): boolean;
    onSelect(): void;
    onDeselect(): void;
    getClassName(): string;
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
     * Creates a new [[RedlinePolyline]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): RedlinePolyline;
}
