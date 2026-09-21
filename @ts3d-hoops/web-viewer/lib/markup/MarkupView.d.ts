import { Color } from '@ts3d-hoops/common';
import { Camera } from '../Camera';
import { NodeId, SheetId, Uuid } from '../types';
import { MarkupItem } from './MarkupItem';
import { IWebViewer } from '../core/IWebViewer';
/** @hidden */
export declare class _MarkupViewConstruction {
    constructor(markupView: MarkupView, itemResults: boolean[]);
    markupView: MarkupView;
    itemResults: boolean[];
}
export declare class MarkupView {
    private _uniqueId;
    private _name;
    private _camera;
    private _explodeMagnitude;
    private _cuttingPlaneData;
    private _lineVisibility;
    private _faceVisibility;
    private _markupItems;
    private _sheetId;
    private _colorMap;
    private _snapshotImage;
    private _defaultVisibility;
    private _visibilityExceptions;
    /** @hidden */
    constructor(uniqueId: Uuid, name: string, camera: Camera, explodeMagnitude: number, cuttingPlaneData: object, sheetId?: SheetId | null);
    /**
     * Gets the camera of this view
     * @returns the camera of this view
     */
    getCamera(): Camera;
    /**
     * Gets the sheet id for this view
     * @returns the id of the sheet for this view. If no view was active at the time of creation this function will return null.
     */
    getSheetId(): SheetId | null;
    /**
     * Gets the unique identifier of this view
     * @returns unique identifier of this view
     */
    getUniqueId(): Uuid;
    /**
     * Gets the name of this view
     * @returns name of this view
     */
    getName(): string;
    /**
     * Sets the name for this view
     * @param name name to set
     */
    setName(name: string): void;
    /**
     * Gets line visibility setting for this view
     * @returns line visibility setting for this view
     */
    getLineVisibility(): boolean;
    /**
     * Sets line visibility for this view
     * @param lineVisibility line visibility setting for this view
     */
    setLineVisibility(lineVisibility: boolean): void;
    /**
     * Gets face visibility setting for this view
     * @returns face visibility setting for this view
     */
    getFaceVisibility(): boolean;
    /**
     * Sets face visibility for this view
     * @param faceVisibility face visibility setting for this view
     */
    setFaceVisibility(faceVisibility: boolean): void;
    /**
     * Adds a markup item to this view
     * @param markupItem the markup to be added to this view.
     */
    addMarkupItem(markupItem: MarkupItem): void;
    /**
     * Gets an array of markup items associated with this view
     * @returns {boolean} face visibility setting for this view
     */
    getMarkup(): MarkupItem[];
    /**
     * Removes a markup item from the view
     * @param item the markup to be removed from this view.
     * @returns result of the removal operation
     */
    removeMarkup(item: MarkupItem): boolean;
    /**
     * @returns a JSON object with the cutting plane data associated with this view
     */
    getCuttingPlaneData(): object;
    /**
     * Takes a JSON cutting plane data object and associates it with this view
     * @param cuttingPlaneData
     */
    setCuttingPlaneData(cuttingPlaneData: object): void;
    /**
     * @returns the explode value associated with this view
     */
    getExplodeMagnitude(): number;
    /**
     * Takes an explode magnitude and associates it with this view
     */
    setExplodeMagnitude(explodeMagnitude: number): void;
    /**
     * @returns A color map associating NodeIds to Colors.
     */
    getColorMap(): Map<NodeId, Color>;
    /**
     * Takes a color map associating NodeIds to Colors and associates it with this view.
     * @param colorMap
     */
    setColorMap(colorMap: Map<NodeId, Color>): void;
    getDefaultVisibility(): boolean;
    setDefaultVisibility(defaultVisibility: boolean): void;
    getVisibilityExceptions(): Set<NodeId>;
    setVisibilityExceptions(nodeIds: Set<NodeId>): void;
    getSnapshotImage(): HTMLImageElement | null;
    setSnapshotImage(image: HTMLImageElement): void;
    private _handleLoadMarkupItem;
    /** @hidden */
    static _fromJson(objData: any, viewer: IWebViewer): Promise<_MarkupViewConstruction>;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
}
