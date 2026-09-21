import { LitElement } from 'lit';
import { SheetAdapter } from './SheetAdapter';
import { IModel } from './types';
import { List } from '@ts3d-hoops/ui-kit/list';
export type * from './custom-events.d.ts';
/**
 * Displays a flat list of drawing sheets from the model. Clicking a sheet node
 * fires an event that consumers can use to activate the corresponding sheet.
 *
 * @element hoops-sheet-list
 *
 * @fires hoops-sheet-list-node-click - Emitted when a sheet node is clicked
 *
 * @example
 * ```html
 * <hoops-sheet-list></hoops-sheet-list>
 *
 * <script>
 *   const el = document.getElementsByTagName('hoops-sheet-list')[0];
 *   el.model = modelInstance;
 *   el.addEventListener('hoops-sheet-list-node-click', (e) => console.log(e.detail));
 * </script>
 * ```
 *
 * @since 2026.3.0
 */
export declare class HoopsSheetListElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /** @internal */
    private listRef;
    /**
     * Gets the internal list component element.
     *
     * @returns {List | undefined} The list element instance or undefined if not initialised
     */
    get listElement(): List | undefined;
    /**
     * Gets the currently selected sheet nodes.
     *
     * @returns {number[]} Array of selected node IDs
     */
    get selected(): number[];
    /**
     * Sets the currently selected sheet nodes.
     *
     * @param value - Array of node IDs to select
     * @returns {void}
     * @throws {Error} When setting selected nodes before list initialisation
     */
    set selected(value: number[]);
    /**
     * Convenience accessor for the model on the underlying adapter.
     *
     * @returns {IModel | undefined} The current model instance or undefined
     */
    get model(): IModel | undefined;
    /**
     * Sets the model instance for sheet data. Setting a new model refreshes the list.
     *
     * @param model - The model instance to set
     * @returns {void}
     * @throws {Error} When setting model before adapter initialisation
     */
    set model(model: IModel | undefined);
    /**
     * Gets the sheet adapter managing list data.
     *
     * @returns {SheetAdapter | undefined} The current sheet adapter or undefined
     */
    get sheetAdapter(): SheetAdapter | undefined;
    /**
     * Sets the sheet adapter managing list data.
     * Populates `elementsData` from the adapter's model before assigning.
     *
     * @param value - The sheet adapter to set
     * @returns {void}
     * @throws {Error} When setting adapter before list initialisation
     */
    set sheetAdapter(value: SheetAdapter);
    /**
     * Selects or deselects sheet nodes.
     *
     * @param nodeIds - Array of node IDs to select or deselect
     * @param selected - Whether to select (true) or deselect (false) the nodes
     * @returns {void}
     * @throws {Error} When list element is not initialised
     */
    selectNodes(nodeIds: number[], selected: boolean): void;
    /**
     * Handles list element click events and re-dispatches them as
     * `hoops-sheet-list-node-click`.
     *
     * @internal
     * @param event - The list element click event
     * @returns {void}
     */
    private onSheetNodeClicked;
    /** @internal */
    protected render(): unknown;
}
export default HoopsSheetListElement;
