import { LitElement } from 'lit';
/**
 * Provides an accordion wrapper for tool groups in the tools panel.
 *
 * @element hoops-tools-group
 *
 * @slot toolbar - Slot for group toolbar actions
 * @slot - Slot for group content
 *
 * @attribute {string} label - Header text displayed for the group
 *
 * @example
 * ```html
 * <hoops-tools-group label="Selection">
 *   <div>Group content</div>
 * </hoops-tools-group>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsGroupElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    label: string;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsGroupElement;
