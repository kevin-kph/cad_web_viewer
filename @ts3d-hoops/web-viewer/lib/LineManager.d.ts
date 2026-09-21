import { MarkupTypeManager } from './MarkupTypeManager';
import { ICallbackManager } from './core/ICallbackManager';
import { IWebViewer } from './core/IWebViewer';
import { LineMarkup } from './markup/line/LineMarkup';
/**
 * This class provides an interface to 3D line management related functions of the viewer.
 */
export declare class LineManager extends MarkupTypeManager {
    private readonly _viewer;
    private readonly _callbackManager;
    private readonly _markupArray;
    /** @hidden */
    constructor(viewer: IWebViewer, callbackManager: ICallbackManager);
    /**
     * Adds a new Line to the Line Manager
     * @param lineItem LineMarkup Object that will be added
     */
    addLine(lineItem: LineMarkup): Promise<void>;
    /**
     * Removes an existing line item.
     * @param lineItem the line item to remove.
     */
    removeLine(lineItem: LineMarkup): Promise<void>;
    /**
     * Removes all line items.
     */
    removeAllLines(): Promise<void>;
    /**
     * Return an array of line items.
     * @returns array of all line items.
     */
    getAllLines(): LineMarkup[];
    /**
     * Removes the most recently added line item.
     */
    removeLastLine(): Promise<void>;
    /**
     * Gets a line markup item associated with a node id.
     * @param id
     */
    getLineByNodeId(id: number): LineMarkup | null;
    /**
     * @returns JSON Array with line markup
     */
    exportMarkup(): object[];
    private _handleLoadLine;
    /**
     * Loads JSON markup data
     * @param lineDataJson Input markup data in Json representation
     * @returns Load status
     */
    loadData(lineDataJson: any[]): Promise<boolean[]>;
}
