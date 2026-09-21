import { LitElement, PropertyValues } from 'lit';
/**
 * A tab container component that manages multiple tab panels.
 *
 * This component provides a tabbed interface where users can switch between different content panels.
 * It handles keyboard navigation, ARIA attributes, and tab selection state management.
 *
 * Key features:
 * - Automatic tab panel management via slotted `hoops-tab` elements
 * - Keyboard navigation with arrow keys (Left/Right for horizontal, Up/Down for vertical)
 * - Home and End key support for first/last tab navigation
 * - ARIA-compliant accessibility with proper roles and attributes
 * - Customizable tab positioning (top, bottom, left, right)
 * - CSS custom properties for theming
 * - Support for disabled tabs
 * - Selection by index or by value
 *
 * @element hoops-tabs
 *
 * @slot - Default slot for `hoops-tab` child elements
 *
 * @cssprop --hoops-tabs-header-background - Background color of the tab header area
 * @cssprop --hoops-tabs-header-border-color - Border color of the tab header
 * @cssprop --hoops-tabs-active-indicator-color - Color of the active tab indicator line
 * @cssprop --hoops-tabs-active-indicator-height - Height/width of the active tab indicator
 * @cssprop --hoops-tabs-gap - Gap between tabs
 *
 * @fires hoops-tabs-change - Emitted when the selected tab changes. Detail contains selectedIndex and selectedValue.
 *
 * @attribute {number} selectedIndex - The index of the currently selected tab (default: 0)
 * @attribute {'top' | 'bottom' | 'left' | 'right'} position - Position of the tab headers relative to content (default: 'top')
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <hoops-tabs selectedIndex="0">
 *   <hoops-tab label="Settings" value="settings" icon="⚙️">
 *     <div>Settings content here</div>
 *   </hoops-tab>
 *   <hoops-tab label="Profile" value="profile" icon="👤">
 *     <div>Profile content here</div>
 *   </hoops-tab>
 * </hoops-tabs>
 *
 * <!-- With disabled tab -->
 * <hoops-tabs>
 *   <hoops-tab label="Tab 1">Content 1</hoops-tab>
 *   <hoops-tab label="Tab 2" disabled>Disabled tab</hoops-tab>
 *   <hoops-tab label="Tab 3">Content 3</hoops-tab>
 * </hoops-tabs>
 *
 * <!-- Position variants -->
 * <hoops-tabs position="left">
 *   <hoops-tab label="Left Tab 1">Content</hoops-tab>
 *   <hoops-tab label="Left Tab 2">Content</hoops-tab>
 * </hoops-tabs>
 *
 * <script>
 *   const tabs = document.getElementsByTagName("hoops-tabs")[0];
 *
 *   // Listen for tab changes
 *   tabs.addEventListener("hoops-tabs-change", (e) => {
 *     console.log("Selected tab index:", e.detail.selectedIndex);
 *     console.log("Selected tab value:", e.detail.selectedValue);
 *   });
 *
 *   // Programmatically select tab by value
 *   tabs.selectByValue("profile");
 * </script>
 * ```
 *
 * @since 2026.1.0
 */
export declare class HoopsTabsElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The index of the currently selected tab.
     *
     * @default 0
     */
    selectedIndex: number;
    /**
     * Position of the tab headers relative to the content.
     *
     * @default 'top'
     */
    position: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Slotted tab elements.
     * @internal
     */
    private _tabs;
    /**
     * Internal state tracking tab metadata for rendering.
     * @internal
     */
    private _tabsMetadata;
    connectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    /**
     * Updates the metadata array from slotted tabs.
     * @internal
     */
    private _updateTabsMetadata;
    /**
     * Updates the visibility of tab panels based on selected index.
     * @internal
     */
    private _updateTabVisibility;
    /**
     * Handles slot changes to update tab metadata.
     * @internal
     */
    private _handleSlotChange;
    /**
     * Handles tab button click.
     *
     * @param index - Index of the clicked tab
     * @internal
     */
    private _handleTabClick;
    /**
     * Handles keyboard navigation between tabs.
     *
     * @param event - Keyboard event
     * @param currentIndex - Current tab index
     * @internal
     */
    private _handleKeyDown;
    /**
     * Finds the previous enabled tab index.
     *
     * @param currentIndex - Current tab index
     * @returns Previous enabled tab index or current index if none found
     * @internal
     */
    private _findPreviousEnabledTab;
    /**
     * Finds the next enabled tab index.
     *
     * @param currentIndex - Current tab index
     * @returns Next enabled tab index or current index if none found
     * @internal
     */
    private _findNextEnabledTab;
    /**
     * Finds the first enabled tab index.
     *
     * @returns First enabled tab index or 0 if none found
     * @internal
     */
    private _findFirstEnabledTab;
    /**
     * Finds the last enabled tab index.
     *
     * @returns Last enabled tab index or last index if none found
     * @internal
     */
    private _findLastEnabledTab;
    /**
     * Focuses a tab button by index.
     *
     * @param index - Tab index to focus
     * @internal
     */
    private _focusTab;
    /**
     * Selects a tab by index and dispatches change event.
     *
     * @param index - Tab index to select
     * @internal
     */
    private _selectTab;
    /**
     * Selects a tab by its value property.
     *
     * @param value - The value of the tab to select
     */
    selectByValue(value: string): void;
    /**
     * Renders the component.
     *
     * @returns The template result
     * @internal
     */
    render(): import('lit').TemplateResult<1>;
}
