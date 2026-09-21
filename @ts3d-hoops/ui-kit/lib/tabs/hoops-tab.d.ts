import { LitElement } from 'lit';
/**
 * A single tab panel component to be used within `hoops-tabs`.
 *
 * This component represents a single tab with its label and content.
 * It should always be used as a child of `hoops-tabs`.
 *
 * @element hoops-tab
 *
 * @slot - Default slot for the tab panel content
 *
 * @attribute {string} label - The label text displayed in the tab header
 * @attribute {string} value - Optional value identifier for the tab
 * @attribute {string} icon - Optional icon to display in the tab header
 * @attribute {boolean} disabled - Whether the tab is disabled
 *
 * @example
 * ```html
 * <hoops-tab label="Settings" value="settings">
 *   <div>Settings content here</div>
 * </hoops-tab>
 * ```
 *
 * @since 2026.1.0
 */
export declare class HoopsTabElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The label text displayed in the tab header.
     *
     * @default ''
     */
    label: string;
    /**
     * Optional value identifier for the tab.
     * Can be used with `selectByValue()` on the parent `hoops-tabs`.
     *
     * @default undefined
     */
    value?: string;
    /**
     * Optional icon to display before the label in the tab header.
     *
     * @default undefined
     */
    icon?: string;
    /**
     * Whether the tab is disabled and cannot be selected.
     *
     * @default false
     */
    disabled: boolean;
    /** @internal */
    protected render(): unknown;
}
