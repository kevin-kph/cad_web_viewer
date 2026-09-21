import { LitElement } from 'lit';
import { StyleInfo } from 'lit-html/directives/style-map.js';
/**
 * A customizable dropdown menu component with flexible positioning and keyboard navigation.
 *
 * Provides a trigger element that opens a floating panel with menu content, supporting
 * various positioning options and accessibility features.
 *
 * @element hoops-dropdown
 *
 * @slot - Default slot for the dropdown trigger element (button, icon, etc.)
 * @slot dropdown-popup - Content to display in the dropdown panel
 *
 * @cssprop --hoops-dropdown-z-index - Z-index for the dropdown panel
 * @cssprop --hoops-dropdown-background-color - Background color of the dropdown panel
 * @cssprop --hoops-dropdown-menu-border-color - Border color of the dropdown panel
 * @cssprop --hoops-dropdown-menu-radius - Border radius of the dropdown panel
 * @cssprop --hoops-dropdown-menu-border-size - Border width of the dropdown panel
 * @cssprop --hoops-dropdown-menu-border-style - Border style of the dropdown panel
 * @cssprop --hoops-dropdown-box-shadow - Box shadow for the dropdown panel
 * @cssprop --hoops-dropdown-gap - Gap between trigger and dropdown panel
 *
 * @fires hoops-dropdown-opened - Emitted when the dropdown is opened
 * @fires hoops-dropdown-closed - Emitted when the dropdown is closed
 *
 * @attribute {boolean} preventCloseOnClickInside - Prevents closing when clicking inside dropdown
 * @attribute {'bottom' | 'top' | 'right' | 'left'} position - Position of dropdown relative to trigger
 * @attribute {'bottom' | 'top' | 'right' | 'left'} anchor - Anchor point for dropdown alignment
 * @attribute {string} focusableSelector - CSS selector for focusable elements
 * @attribute {boolean} disabled - Whether the dropdown is disabled
 *
 * @example
 * ```html
 * <hoops-dropdown position="bottom" anchor="left">
 *   <button>Menu</button>
 *   <div slot="dropdown-popup">
 *     <button>Option 1</button>
 *     <button>Option 2</button>
 *   </div>
 * </hoops-dropdown>
 * ```
 *
 * @since 2025.7.0
 */
export default class DropdownMenu extends LitElement {
    /** @internal */
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Prevents the dropdown from closing when clicking inside the dropdown panel.
     *
     * @default false
     */
    preventCloseOnClickInside: boolean;
    /**
     * Controls whether the dropdown menu is currently visible.
     *
     * @internal
     */
    menuShown: boolean;
    /**
     * Position of the dropdown relative to the trigger element.
     *
     * @default 'bottom'
     */
    position: 'bottom' | 'top' | 'right' | 'left';
    /**
     * Anchor point for dropdown alignment relative to the trigger element.
     *
     * @default undefined
     */
    anchor?: 'bottom' | 'top' | 'right' | 'left';
    /**
     * CSS selector for elements that should be focusable within the dropdown.
     *
     * By default this includes <a>, <button>, <input>, <textarea>, <select>, <details> elements,
     * as well as elements with a non-negative tabindex attribute.
     * CSS selector for elements that should be focusable within the dropdown.
     *
     * @default 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
     */
    focusableSelector: string;
    /**
     * Elements assigned to the dropdown-popup slot.
     *
     * @internal
     */
    dropdownSlot?: Array<HTMLElement>;
    /**
     * Elements assigned to the default slot (trigger elements).
     *
     * @internal
     */
    defaultSlot?: Array<HTMLElement>;
    /**
     * Whether the dropdown is disabled and non-interactive.
     *
     * @default false
     */
    disabled: boolean;
    constructor();
    /**
     * Focuses on the first item in the dropdown list of focusable elements.
     *
     * @return {void}
     */
    private focusFirstDropdownItem;
    /**
     * Retrieves the focusable children within the dropdown slot element.
     *
     * @return {NodeListOf<HTMLElement> | undefined} A list of HTMLElements representing the focusable children
     */
    get focusableDropdownChildren(): NodeListOf<HTMLElement> | undefined;
    /**
     * Returns the positional styles for a dropdown based on the current position.
     * The styles include properties such as 'left', 'right', 'top', 'bottom' and 'margin'.
     *
     * @returns {StyleInfo} Object representing the positional styles for the dropdown
     */
    get dropdownPositionalStyles(): StyleInfo;
    /**
     * Toggles the dropdown menu visibility based on the current state.
     *
     * @param {PointerEvent} event - The pointer event triggering the dropdown toggle.
     *
     * @return {Promise<void>}
     */
    toggleDropdown(event: PointerEvent): Promise<void>;
    /** @internal */
    protected render(): unknown;
}
