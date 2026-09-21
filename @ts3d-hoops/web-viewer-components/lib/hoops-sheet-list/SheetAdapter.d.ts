import { HTMLTemplateResult, nothing } from 'lit';
import { ListContext } from '@ts3d-hoops/ui-kit/list';
import { IModel } from './types';
/**
 * Proxy between the sheet list component and the Model. Provides the list
 * context that the `hoops-list` ui-kit component expects.
 *
 * @class SheetAdapter
 */
export declare class SheetAdapter implements ListContext {
    /**
     * The model used to retrieve sheet data.
     *
     * @type {IModel | undefined}
     */
    model?: IModel;
    /**
     * A map of sheet node IDs to their display names.
     *
     * @type {Map<number, string>}
     */
    elementsData: Map<number, string>;
    /**
     * Sheets are sorted by name.
     */
    sortedByValue: boolean;
    /**
     * Returns the HTML fragment for a given sheet entry.
     *
     * @param _context - The list context (unused)
     * @param id - The sheet node id
     * @param selected - Whether the node is currently selected
     * @returns The HTML fragment to render for the node
     */
    getContent(_context: ListContext, id: number, selected?: boolean): HTMLTemplateResult | typeof nothing;
}
