import { HoopsCoordinateInputElement } from '@ts3d-hoops/ui-kit/common';
import { LitElement, PropertyValues } from 'lit';
import { ICuttingService } from '../services';
/**
 * A comprehensive editor component for modifying cutting plane properties.
 *
 * This component provides a full interface for editing all aspects of a cutting plane,
 * including geometric properties (normal vector and distance), visual properties
 * (colors and opacity), and real-time preview updates.
 *
 * Key features:
 * - Coordinate inputs for plane normal vector (x, y, z) and distance (d)
 * - Color pickers for face color and border color
 * - Opacity slider for transparency control
 * - Real-time updates with debounced service calls
 * - Automatic synchronization with cutting plane changes
 * - Conditional rendering based on cutting plane existence
 *
 * @element hoops-cutting-plane-editor
 *
 * @example
 * ```html
 * <hoops-cutting-plane-editor
 *   sectionIndex="0"
 *   planeIndex="1"
 *   .service=${cuttingService}>
 * </hoops-cutting-plane-editor>
 * ```
 *
 * @example
 * ```typescript
 * // Create and configure editor
 * const editor = document.createElement('hoops-cutting-plane-editor');
 * editor.sectionIndex = 0;
 * editor.planeIndex = 1;
 * editor.service = cuttingService;
 * container.appendChild(editor);
 * ```
 */
export declare class HoopsCuttingPlaneEditorElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The index of the cutting section containing the target cutting plane.
     * Used to identify which section contains the plane to be edited.
     *
     * @default 0
     */
    sectionIndex: number;
    /**
     * The index of the cutting plane within the specified cutting section.
     * Used to identify the specific plane to be edited.
     *
     * @default 0
     */
    planeIndex: number;
    /**
     * The cutting service instance that provides cutting plane operations.
     * All editor operations are performed through this service interface.
     * When undefined, the editor renders nothing.
     *
     * @default undefined
     */
    service?: ICuttingService;
    /**
     * Query selector for all coordinate input elements within the editor.
     * Used for batch operations like requesting updates when the plane changes.
     */
    coordinateInputs: Array<HoopsCoordinateInputElement>;
    /**
     * Timeout handle for debouncing rapid changes to prevent excessive service calls.
     * Ensures that multiple rapid changes are batched into a single update operation.
     *
     * @internal
     */
    private debouncer;
    /**
     * Constructs a new HoopsCuttingPlaneEditorElement.
     *
     * Initializes the component with default property values and binds
     * the invalidateEditor method for proper event handling context.
     */
    constructor();
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting plane change events to keep the
     * editor synchronized with the state of its associated cutting plane.
     * Also triggers an initial update to ensure the UI reflects current state.
     *
     * @param _changedProperties - Map of changed properties (not used)
     * @internal
     */
    firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lifecycle method called when the element is removed from the DOM.
     *
     * Cleans up event listeners to prevent memory leaks when the editor
     * is no longer needed.
     *
     * @internal
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles debounced updates to the cutting plane.
     *
     * Implements a debouncing mechanism to prevent excessive service calls
     * when the user makes rapid changes. Updates are delayed by 500ms and
     * any new changes reset the timer.
     *
     * @param cuttingPlane - The modified cutting plane to apply to the service
     * @internal
     */
    private onChange;
    /**
     * Event handler that invalidates the editor when the associated cutting plane changes.
     *
     * This method listens for cutting plane change events and triggers a re-render
     * if the changed plane matches this editor's section and plane indices.
     * Also updates all coordinate input elements to reflect the new values.
     *
     * @param event - Custom event containing section and plane indices that changed
     * @internal
     */
    private invalidateEditor;
    /**
     * Updates a specific axis or distance property of the cutting plane.
     *
     * Modifies either the normal vector components (x, y, z) or the distance (d)
     * of the cutting plane and triggers a debounced update to the service.
     *
     * @param axis - The plane property to update ('x', 'y', 'z' for normal vector, 'd' for distance)
     * @param value - The new value for the specified property
     * @internal
     */
    private updatePlane;
    /**
     * Converts an HTML color string to a HOOPS Web Viewer color object.
     *
     * Parses various HTML color formats (hex, rgb, etc.) and converts them
     * to the IColor interface used by the HOOPS Web Viewer. Returns black
     * as a fallback if the color string cannot be parsed.
     *
     * @param color - HTML color string (e.g., "#ff0000", "rgb(255,0,0)", "red")
     * @returns IColor object with RGB values, or black (0,0,0) if parsing fails
     * @internal
     */
    private htmlToHwvColor;
}
export default HoopsCuttingPlaneEditorElement;
