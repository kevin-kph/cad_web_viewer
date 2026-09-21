import { LitElement } from 'lit';
import { ContextWrapper } from './context';
/**
 * Provides a list view component for displaying sortable elements.
 *
 * @element hoops-list
 *
 * @example
 * ```html
 * <hoops-list></hoops-list>
 *
 * <script>
 *   const list = document.getElementsByTagName("hoops-list")[0];
 *   list.list = {
 *     context: {
 *       elementsData: new Map([[1, 'Item A'], [2, 'Item B']]),
 *       sortedByValue: true,
 *       getContent: (context, key, selected) => `${key}: ${context.elementsData.get(key)}`
 *     }
 *   };
 *   list.selected = [1];
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export default class List extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Array of selected element keys. Reassign to trigger updates.
     *
     * @default []
     */
    selected: number[];
    /**
     * Context wrapper providing list data access methods. Reassign to trigger updates.
     */
    list: ContextWrapper;
    /**
     * Triggers a re-render by reassigning list context.
     *
     * @returns void
     */
    updateContext(): void;
    /**
     * Triggers a re-render by reassigning selected elements.
     *
     * @returns void
     */
    updateSelected(): void;
    /** @internal */
    protected render(): unknown;
    /**
     * Generates HTML template for a list element.
     *
     * @internal
     * @param elementKey - The element's unique key
     * @param selected - Whether the element is selected
     * @returns HTML template for the element
     */
    private getElementHtml;
}
