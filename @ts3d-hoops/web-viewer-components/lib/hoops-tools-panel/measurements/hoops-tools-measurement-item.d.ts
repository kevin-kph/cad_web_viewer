import { LitElement, TemplateResult } from 'lit';
import { Operators } from '@ts3d-hoops/web-viewer';
/**
 * Displays a single measurement item with its value, icon, and remove functionality.
 *
 * This component renders measurement data in a compact, user-friendly format within the measurement list.
 *
 * Features:
 * - Automatic icon selection based on measurement type
 * - Formatted measurement value display
 * - Interactive remove button with confirmation
 * - Tooltip with full measurement details
 * - Error handling for invalid or corrupted measurement data
 * - Support for multiple measurement types (Point-to-Point, Face-to-Face, Angle, Edge Length)
 *
 * The component uses a configuration map to determine the appropriate icon and labels
 * for each measurement type, making it easy to extend with new measurement types.
 *
 * @element hoops-tools-measurement-item
 *
 * @fires hoops-measurement-remove-command - Dispatched when the remove button is clicked
 *
 * @attribute {MeasureMarkup} measurement - The measurement object to display
 *
 * @example
 * ```html
 * <hoops-tools-measurement-item></hoops-tools-measurement-item>
 *
 * <script>
 *   const item = document.getElementsByTagName('hoops-tools-measurement-item')[0];
 *   item.measurement = measurementObject;
 *   item.addEventListener('hoops-measurement-remove-command', (event) => {
 *     console.log('Remove measurement:', event.detail.measurement);
 *   });
 * </script>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsMeasurementItemElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    measurement?: Operators.Markup.Measure.MeasureMarkup;
    getMeasureMarkupLabel(markup: Operators.Markup.Measure.MeasureMarkup): string;
    getMeasureMarkupIcon(markup: Operators.Markup.Measure.MeasureMarkup): TemplateResult;
    getMeasureMarkupValue(markup: Operators.Markup.Measure.MeasureMarkup): string;
    dispatchRemoval(measurement: Operators.Markup.Measure.MeasureMarkup): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsMeasurementItemElement;
