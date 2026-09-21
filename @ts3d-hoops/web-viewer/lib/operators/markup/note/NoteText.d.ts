import { Point3, Point2, Color } from '@ts3d-hoops/common';
import { NoteTextManager } from './NoteTextManager';
import { MarkupItem } from '../../../markup/MarkupItem';
import { NodeId, PartId, Uuid } from '../../../types';
import { IView } from '../../../core/IView';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class NoteText extends MarkupItem {
    static className: string;
    private _viewer;
    private _noteTextManager;
    private _noteElementId;
    private _sphereInstanceId?;
    private _stemInstanceId?;
    private _position;
    private _selectionPosition;
    private _selectionNormal;
    private _partId;
    private _pinBoundingBox?;
    private _text;
    private _color;
    private _sphereRadius;
    private _deleted;
    private _active;
    private _callbacks;
    constructor(viewer: IWebViewer, noteTextManager: NoteTextManager, selectionPosition: Point3, selectionNormal: Point3, partId: PartId);
    private _init;
    private _matchPartVisibility;
    updatePosition(): Promise<void>;
    private _restore;
    restore(): Promise<void>;
    getText(): string;
    setText(text: string): void;
    saveTextValue(): void;
    draw(): Promise<void>;
    hit(point: Point2, view: IView): boolean;
    hitWithTolerance(point: Point2, _view: IView, pickTolerance: number): boolean;
    getClassName(): string;
    getUniqueId(): Uuid;
    getSphereInstanceId(): NodeId | undefined;
    getStemInstanceId(): NodeId | undefined;
    onSelect(): void;
    onDeselect(): void;
    hide(): void;
    private _show;
    show(): void;
    remove(view: IView | null): Promise<void>;
    getRemoved(): boolean;
    setColor(color: Color): Promise<void>;
    getColor(): Color;
    getPartId(): PartId;
    private _updateColor;
    private _createPinTransformationMatrix;
    private _createPinStemInstance;
    private _createPinSphereInstance;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    private static _fromJson;
    /**
     * Creates a new [[NoteText]] from an object given by [[toJson]].
     * @param An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(obj: any, viewer: IWebViewer, noteTextManager: NoteTextManager): Promise<NoteText | null>;
}
