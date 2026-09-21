import { LitElement, PropertyValues } from 'lit';
/**
 * A custom element representing a tree item in a hierarchical structure.
 * It supports expansion and selection states, and can contain child elements.
 *
 * This component emits custom events for expansion (hoops-tree-item-expand)
 * and selection (hoops-tree-item-select) changes, allowing parent components
 * to respond to user interactions such as expanding/collapsing items
 * and selecting items.
 *
 * It is a very simple component that does not hold much logic. It is only responsible for rendering
 * the item label, icon, and children, and handling user interactions (expansion & selection).
 * it is meant to be used as a building block for trees without having to figure out how it works
 * internally.
 *
 * @element hoops-tree-item
 *
 * @fires hoops-tree-item-expand - Fired when the item is expanded or collapsed.
 * @fires hoops-tree-item-select - Fired when the item is selected or deselected.
 *
 * @slot - The default slot for the item label.
 * @slot icon - A named slot for an icon to be displayed next to the item label.
 * @slot children - A named slot for child elements, which will be displayed when the item is expanded.
 *
 * @csspart tree-item - The main container for the tree item.
 * @csspart expand-icon - The icon used to indicate expansion or collapse of the item.
 * @csspart children - The container for child elements, which can be expanded or collapsed.
 * @cssproperty --hoops-svg-accent-color - The accent color used for selected items.
 *
 * @since 2025.8.0
 */
export declare class HoopsTreeItemElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    expanded: boolean;
    selected: boolean;
    leaf: boolean;
    noAnim: boolean;
    hidden: boolean;
    constructor();
    protected willUpdate(_: PropertyValues): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsTreeItemElement;
