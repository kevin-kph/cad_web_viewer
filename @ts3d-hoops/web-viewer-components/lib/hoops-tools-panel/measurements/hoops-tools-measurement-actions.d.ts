import { LitElement } from 'lit';
import { OperatorId } from '@ts3d-hoops/web-viewer';
/**
 * Provides measurement tool selection buttons for the Hoops Tools Panel.
 *
 * This component displays interactive buttons for different measurement tools including
 * point-to-point distance, face-to-face distance, face angle, and edge length measurements.
 *
 * It is a dumb component that dispatches operator IDs on selection, with no knowledge of the webviewer.
 * The component highlights the currently active measurement tool based on the activeToolOperator property.
 *
 * @element hoops-tools-measurement-actions
 *
 * @fires measurement-tool-selected - Dispatched when a measurement tool button is clicked
 *
 * @attribute {OperatorId} activeToolOperator - The currently active measurement tool operator
 *
 * @example
 * ```html
 * <hoops-tools-measurement-actions></hoops-tools-measurement-actions>
 *
 * <script>
 *   const actions = document.getElementsByTagName('hoops-tools-measurement-actions')[0];
 *   actions.activeToolOperator = OperatorId.MeasurePointPointDistance;
 *   actions.addEventListener('measurement-tool-selected', (event) => {
 *     console.log('Tool selected:', event.detail.operator);
 *   });
 * </script>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsMeasurementActionsElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    activeToolOperator?: OperatorId;
    selectMeasurementTool(operator: OperatorId): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsMeasurementActionsElement;
