import { LitElement } from 'lit';
/**
 * Provides the settings panel container with graphics, interface, and controls sections.
 * Will use the ServicesRegistry to reset all configurable services to their default values when the reset button is clicked.
 *
 * @element hoops-settings-panel
 *
 * @example
 * ```html
 * <hoops-settings-panel></hoops-settings-panel>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSettingsPanelElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    private resetToDefault;
    /** @internal */
    protected render(): unknown;
}
export default HoopsSettingsPanelElement;
