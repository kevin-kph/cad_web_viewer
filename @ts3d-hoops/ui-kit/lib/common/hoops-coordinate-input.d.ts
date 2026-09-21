import { LitElement, PropertyValues } from 'lit';
/**
 * A custom web component that provides a coordinate input interface with both
 * numeric input and range slider controls for editing coordinate values.
 *
 * This component renders a labeled input control that consists of:
 * - A text label
 * - A numeric input field
 * - A range slider
 *
 * Both input controls are kept in sync and allow users to modify coordinate
 * values either by typing precise values or using the slider for approximate adjustments.
 *
 * @element hoops-coordinate-input
 *
 * @fires hoops-coordinate-changed - Dispatched when the coordinate value changes
 *
 * @attribute {string} label - The display label for this coordinate input (e.g., "X", "Y", "Z")
 * @attribute {number} value - The current numeric value of the coordinate
 * @attribute {number} min - The minimum allowed value for the coordinate
 * @attribute {number} max - The maximum allowed value for the coordinate
 *
 * @example
 * ```html
 * <hoops-coordinate-input
 *   label="X"
 *   value="10.5"
 *   min="0"
 *   max="100">
 * </hoops-coordinate-input>
 *
 * <script>
 *   const element = document.getElementsByTagName('hoops-coordinate-input')[0];
 *   element.addEventListener('hoops-coordinate-changed', (event) => {
 *     console.log(`${event.detail.label}: ${event.detail.value}`);
 *   });
 * </script>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsCoordinateInputElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The display label for this coordinate input (e.g., "X", "Y", "Z").
     * This label appears before the input controls and is also included
     * in the change event details.
     */
    label: string;
    /**
     * The current numeric value of the coordinate.
     * This value is displayed in both the numeric input and range slider,
     * and is formatted to 2 decimal places for display.
     */
    value: number;
    /**
     * The minimum allowed value for the coordinate.
     * This constrains both the numeric input and range slider.
     */
    min: number;
    /**
     * The maximum allowed value for the coordinate.
     * This constrains both the numeric input and range slider.
     */
    max: number;
    private _inputs;
    /**
     * Constructs a new HoopsCoordinateInputElement with default values.
     *
     * Initializes the component with:
     * - Empty label
     * - Value of 0
     * - Min value of 0
     * - Max value of 100
     */
    constructor();
    /**
     * Lifecycle method called when the element's properties change.
     *
     * This override ensures that both input controls (numeric and range)
     * stay synchronized with the current value property. This is necessary
     * because external updates to the value property may not trigger a
     * re-render of the input elements if they already contain the same value.
     *
     * @param changedProperties - Map of changed properties and their previous values
     *
     * @example
     * ```typescript
     * // When value is updated externally, both inputs will reflect the new value
     * element.value = 42.5; // Both numeric input and slider will show 42.50
     * ```
     */
    protected update(changedProperties: PropertyValues): void;
    /**
     * Gets the current value formatted as a string with 2 decimal places.
     *
     * This formatter ensures consistent display across both input controls
     * and provides a standardized precision for coordinate values.
     *
     * @returns The formatted value string (e.g., "10.50", "0.00", "-5.25")
     *
     * @example
     * ```typescript
     * element.value = 10.5;
     * console.log(element.formattedValue); // "10.50"
     *
     * element.value = 0;
     * console.log(element.formattedValue); // "0.00"
     * ```
     */
    private get formattedValue();
    /** @internal */
    protected render(): unknown;
    /**
     * Handles value changes from either the numeric input or range slider.
     *
     * When either input control changes, this method dispatches a custom
     * 'hoops-coordinate-changed' event with the new value and the coordinate
     * label in the event detail.
     *
     * @param value - The new numeric value from the input control
     *
     * @fires hoops-coordinate-changed - Custom event containing the label and new value
     *
     * @internal
     */
    private onChange;
}
