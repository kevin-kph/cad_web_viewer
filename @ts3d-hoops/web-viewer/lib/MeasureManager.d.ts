import { Color } from '@ts3d-hoops/common';
import { MarkupTypeManager } from './MarkupTypeManager';
import { Uuid } from './types';
import { MeasureMarkup } from './operators/markup/measure/MeasureMarkup';
import { IWebViewer } from './core/IWebViewer';
import { ICallbackManager } from './core/ICallbackManager';
/**
 * This class provides an interface to measurement management related functions of the viewer.
 */
export declare class MeasureManager extends MarkupTypeManager {
    private readonly _callbackManager;
    private readonly _markupArray;
    /** @hidden */
    protected readonly _viewer: IWebViewer;
    private readonly _color;
    private readonly _edgeColor;
    get viewer(): IWebViewer;
    /** @hidden */
    constructor(viewer: IWebViewer, callbackManager: ICallbackManager);
    /**
     * Adds a new Measurement to the Measure Manager
     * @param measureItem MeasureMarkup Object that will be added
     */
    addMeasurement(measureItem: MeasureMarkup): Uuid;
    /**
     * Triggers a measurementCreated callback
     * @param measureItem measureItem passed to the callback
     */
    finalizeMeasurement(measureItem: MeasureMarkup): void;
    /**
     * Removes an existing measurement item.
     * @param measureItem the measurement item to remove.
     */
    removeMeasurement(measureItem: MeasureMarkup): void;
    /**
     * Removes all measurement items.
     */
    removeAllMeasurements(): void;
    /**
     * Return an array of measurement items.
     * @returns array of all measurement items.
     */
    getAllMeasurements(): MeasureMarkup[];
    /**
     * Removes the most recently added measurement item.
     */
    removeLastMeasurement(): void;
    /**
     * Sets the current measurement color.
     * @param color the measurement color to set.
     */
    setMeasurementColor(color: Color): void;
    /**
     * Gets the current measurement color.
     * @returns color current measurement color.
     */
    getMeasurementColor(): Color;
    /**
     * Sets the current measurement edge color.
     * @param color the measurement edge color to set.
     */
    setMeasurementEdgeColor(color: Color): void;
    /**
     * Gets the current measurement edge color.
     * @returns color current measurement edge color.
     */
    getMeasurementEdgeColor(): Color;
    /**
     * @returns JSON Array with measurement markup
     */
    exportMarkup(): object[];
    private _handleLoadMeasurement;
    /**
     * Loads JSON markup data
     * @param measurementDataJson Measurement Data object (JSON)
     */
    loadData(measurementDataJson: any[]): Promise<boolean[]>;
}
