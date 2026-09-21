import { Point3, Point2 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../../markup/redline/RedlineItem';
import { MarkupRenderer } from '../../../markup/MarkupRenderer';
import { IView } from '../../../core/IView';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class RedlineText extends RedlineItem {
    static readonly className = "Communicator.Markup.Redline.RedlineText";
    private _position;
    private _size;
    private _text;
    private _redlineTextElements;
    private static defaultText;
    private _previousDragPlanePosition;
    private _callbacks;
    constructor(viewer: IWebViewer, text?: string);
    setPosition(point: Point3): void;
    getPosition(): Point3;
    setSize(size: Point2): void;
    getSize(): Point2;
    setText(text: string): void;
    getText(): string;
    private registerCallback;
    private unregisterCallback;
    private createTextElement;
    draw(_renderer: MarkupRenderer, view: IView): void;
    hit(point: Point2, view: IView): boolean;
    hitWithTolerance(point: Point2, view: IView, pickTolerance: number): boolean;
    getClassName(): string;
    onSelect(view: IView): void;
    onDeselect(): void;
    isValid(): boolean;
    remove(view: IView | null): void;
    onDragStart(position: Point2, view: IView): boolean;
    onDragMove(position: Point2, view: IView): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[RedlineText]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): RedlineText;
}
