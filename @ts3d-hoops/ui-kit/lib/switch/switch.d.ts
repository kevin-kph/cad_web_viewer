import { LitElement } from 'lit-element';
/**
 * A switch component.
 *
 * @element hoops-switch
 *
 * @fires change - Emitted when the switch state changes
 *
 * @attribute {boolean} checked - The switch state
 * @attribute {boolean} disabled - Whether or not the switch is disabled
 * @attribute {string} label - The switch label
 *
 * @cssprop {Color} --hoops-accent-foreground-active - The color of the switch when checked
 *
 * @example
 * ```html
 * <hoops-switch checked label="Enable feature"></hoops-switch>
 * <hoops-switch disabled label="Disabled option"></hoops-switch>
 *
 * <script>
 *   const switchElement = document.getElementsByTagName("hoops-switch")[0];
 *   switchElement.addEventListener('change', (event) => {
 *     console.log('Switch state:', switchElement.checked);
 *   });
 * </script>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSwitchElement extends LitElement {
    /** @internal */
    static styles: import('lit-element').CSSResult;
    checked: boolean;
    disabled: boolean;
    /**
     * The label will appear as a tooltip when hovering over the switch (using
     * title attribute). It will also be used as the aria-label for accessibility.
     *
     * @type {string}
     */
    label: string;
    /** @internal */
    protected render(): unknown;
    private _toggle;
}
export default HoopsSwitchElement;
