import { LitElement } from 'lit';
import { ContextWrapper } from './context';
/**
 * Renders a selectable element row inside `hoops-list`.
 *
 * @element hoops-list-element
 *
 * @slot - Slot for custom trailing row content
 *
 * @fires hoops-list-element-click - Emitted when the list element is clicked
 *
 * @attribute {number} key - Unique identifier for the list element
 * @attribute {string} name - Displayed element name
 * @attribute {boolean} selected - Indicates whether the row is selected
 *
 * @example
 * ```html
 * <hoops-list-element key="12" name="Part 12" selected></hoops-list-element>
 * ```
 *
 * @since 2025.7.0
 */
export default class ListElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The context of the hoops-list
     *
     * @type {?ListContext}
     */
    list?: ContextWrapper;
    /**
     * The id of the element in the list.
     *
     * @type {number}
     */
    key: number;
    /**
     * The displayed name of the element in the list.
     *
     * @type {string}
     */
    name: string;
    /**
     * Whether the element is selected or not
     *
     * @type {boolean}
     */
    selected: boolean;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles click on the element.
     *
     * This will stop the propagation of the click and propagate a
     * hoops-list-element-click with information about the clicked element.
     *
     * @fires hoops-list-element-click - Emitted with click metadata for the selected element
     *
     * @param {MouseEvent} event The event that triggered the listener.
     * @returns {void}
     */
    private handleElementClick;
}
