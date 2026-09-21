import { LitElement } from 'lit';
export type HoopsLayoutSlotName = 'menu-bar' | 'status-bar' | 'panel-left' | 'panel-right' | 'panel-top' | 'panel-bottom' | 'toolbar-left' | 'toolbar-right' | 'toolbar-top' | 'toolbar-bottom' | 'central-widget';
/**
 * Provides a slot-based page layout container for HOOPS web components.
 *
 * @element hoops-layout
 *
 * @slot menu-bar - Slot for the top menu bar
 * @slot status-bar - Slot for the bottom status bar
 * @slot panel-left - Slot for the left side panel
 * @slot panel-right - Slot for the right side panel
 * @slot panel-top - Slot for the top panel
 * @slot panel-bottom - Slot for the bottom panel
 * @slot toolbar-left - Slot for the left toolbar
 * @slot toolbar-right - Slot for the right toolbar
 * @slot toolbar-top - Slot for the top toolbar
 * @slot toolbar-bottom - Slot for the bottom toolbar
 * @slot central-widget - Slot for the central content
 *
 * @cssprop --hoops-layout-width - Width of the layout container
 * @cssprop --hoops-layout-height - Height of the layout container
 *
 * @attribute {boolean} floatingPanels - Renders panel slots in floating mode when enabled
 *
 * @example
 * ```html
 * <hoops-layout floatingPanels>
 *   <div slot="menu-bar">Menu</div>
 *   <div slot="central-widget">Viewer</div>
 * </hoops-layout>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsLayout extends LitElement {
    private static buildFloatablePanelStyle;
    /** @internal */
    static styles: import('lit').CSSResult[];
    slotsShown: Record<string, boolean>;
    floatingPanels?: boolean;
    /**
     * Determines whether a specific slot is visible.
     *
     * @param {HoopsLayoutSlotName} slotName - The name of the slot to check visibility for.
     * @returns {boolean} - Returns `true` if the slot is visible, `false` otherwise.
     */
    isSlotVisible: (slotName: HoopsLayoutSlotName) => boolean;
    /**
     * Mutates the visibility state of a slot.
     *
     * @param {HoopsLayoutSlotName} slotName - The name of the slot to mutate.
     * @param {boolean} shown - The visibility state to set for the slot.
     * @returns {void}
     */
    setSlotVisibility(slotName: HoopsLayoutSlotName, shown: boolean): void;
    /**
     * Hides the specified slot in the Hoops layout.
     *
     * @param {HoopsLayoutSlotName} name - The name of the slot to hide.
     */
    hideSlot: (name: HoopsLayoutSlotName) => void;
    /**
     * Sets the visibility of a layout slot to be shown.
     *
     * @param {HoopsLayoutSlotName} name - The name of the layout slot.
     * @returns {void}
     */
    showSlot: (name: HoopsLayoutSlotName) => void;
    /**
     * Toggles the visibility of a layout slot.
     *
     * @param {HoopsLayoutSlotName} name - The name of the layout slot to toggle.
     * @returns {void}
     */
    toggleSlotVisibility: (name: HoopsLayoutSlotName) => void;
    /**
     * handleSlotChange updates the visibility of the slots according to the number
     * of slotted elements it has, 0 means the slot element should now be hidden
     * @param {Event} e - The event object.
     * @return {void}
     */
    private handleSlotChange;
    /**
     * Build a slot element with the given slotName.
     *
     * @param {HoopsLayoutSlotName} slotName - The name of the slot to be built.
     * @return {Element} The constructed slot element.
     */
    private buildSlotElement;
    /**
     * Builds a panel element.
     *
     * @param {HoopsLayoutSlotName} slotName - The name of the slot for the panel element.
     * @returns {HTMLElement} - The panel element.
     */
    private builPanelElement;
    /** @internal */
    protected render(): unknown;
}
export default HoopsLayout;
