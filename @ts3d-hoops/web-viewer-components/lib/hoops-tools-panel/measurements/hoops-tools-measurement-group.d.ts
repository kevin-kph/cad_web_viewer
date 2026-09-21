import { LitElement } from 'lit';
/**
 * A web component that displays and manages a group of measurement tools and measurements.
 *
 * This component provides:
 * - A measurement tools panel with action buttons
 * - A scrollable list of existing measurements
 *
 * @element hoops-tools-measurement-group
 *
 * @example
 * ```html
 * <hoops-tools-measurement-group></hoops-tools-measurement-group>
 * ```
 */
export declare class HoopsToolsMeasurementGroupElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Event handler for measurement updates.
     * Triggers a re-render of the component when measurements change.
     *
     * @returns {void}
     */
    handleMeasurementUpdate: () => void;
    private contextManager?;
    private service;
    connectedCallback(): void;
    private webviewerState?;
    /**
     * Lifecycle method called when the component is disconnected from the DOM.
     * Cleans up event listeners to prevent memory leaks.
     *
     * @override
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Handles measurement tool selection events.
     * Sets the active tool operator in the context manager when a measurement tool is selected.
     *
     * @param {MeasurementToolSelectedEvent} event - The measurement tool selection event
     * @returns {void}
     */
    handleMeasurementToolSelection(event: CustomEventMap['measurement-tool-selected']): void;
    /**
     * Handles measurement removal commands.
     * Removes the specified measurement from the measurement service.
     *
     * @param {MeasurementRemoveCommand} event - The measurement remove command event
     * @returns {void}
     */
    handleMeasurementRemoveCommand(event: CustomEventMap['hoops-measurement-remove-command']): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsMeasurementGroupElement;
