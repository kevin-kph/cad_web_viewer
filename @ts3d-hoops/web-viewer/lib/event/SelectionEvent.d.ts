import { SelectionItem } from '../selection';
import { SelectionType } from '../types';
export declare class NodeSelectionEvent {
    private _selection;
    /**
     * Creates a new NodeSelectionEvent
     * @hidden
     */
    constructor(selection: SelectionItem);
    /**
     * Gets the result of the selection operator.
     * @returns the result of the selection
     */
    getType(): SelectionType;
    /**
     * Gets the selection object.
     * @returns Selection object containing detailed information about the selection
     */
    getSelection(): SelectionItem;
    /**
     * Creates a no-selection event.
     * @returns Selection event with result set to none.
     * @hidden
     */
    static _createNull(): NodeSelectionEvent;
}
