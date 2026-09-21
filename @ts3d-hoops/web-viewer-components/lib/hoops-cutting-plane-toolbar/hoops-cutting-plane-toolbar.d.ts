import { LitElement, PropertyValues } from 'lit';
import { ICuttingService } from '../services';
/**
 * A toolbar component for managing individual cutting plane operations.
 *
 * This component provides a set of action buttons for manipulating a specific
 * cutting plane within a cutting section. It offers functionality to customize,
 * invert, toggle visibility, and remove cutting planes.
 *
 * The toolbar automatically updates when the associated cutting plane changes
 * and only renders if a valid cutting plane exists at the specified indices.
 *
 * @element hoops-cutting-plane-toolbar
 * @fires change - Dispatched when the customize button is clicked
 *
 * @example
 * ```html
 * <hoops-cutting-plane-toolbar
 *   sectionIndex="0"
 *   planeIndex="1"
 *   .service=${cuttingService}
 *   @change=${this.handlePlaneCustomize}>
 * </hoops-cutting-plane-toolbar>
 * ```
 *
 * @example
 * ```typescript
 * // Listen for customize events
 * toolbar.addEventListener('change', (event) => {
 *   console.log('User wants to customize cutting plane');
 *   // Open customization dialog
 * });
 * ```
 */
export declare class HoopsCuttingPlaneToolbarElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The index of the cutting section containing the target cutting plane.
     * Used to identify which section contains the plane to be manipulated.
     *
     * @default -1
     */
    sectionIndex: number;
    /**
     * The index of the cutting plane within the specified cutting section.
     * Used to identify the specific plane to be manipulated by toolbar actions.
     *
     * @default -1
     */
    planeIndex: number;
    /**
     * The cutting service instance that provides cutting plane operations.
     * All toolbar actions are performed through this service interface.
     *
     * @default null
     */
    service: ICuttingService | null;
    /**
     * Constructs a new HoopsCuttingPlaneToolbarElement.
     *
     * Initializes the component with default property values and binds
     * the invalidateToolbar method for proper event handling context.
     */
    constructor();
    /**
     * Event handler that invalidates the toolbar when the associated cutting plane changes.
     *
     * This method listens for cutting plane change events and triggers a re-render
     * if the changed plane matches this toolbar's section and plane indices.
     *
     * @param event - Custom event containing section and plane indices that changed
     * @internal
     */
    private invalidateToolbar;
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting plane change events to keep the
     * toolbar synchronized with the state of its associated cutting plane.
     *
     * @param _changedProperties - Map of changed properties (not used)
     * @internal
     * @override
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lifecycle method called when the element is removed from the DOM.
     *
     * Cleans up event listeners to prevent memory leaks when the toolbar
     * is no longer needed.
     *
     * @internal
     * @override
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles the invert cutting plane button click event.
     *
     * Inverts the cutting plane by negating its normal vector and distance,
     * effectively flipping the plane's orientation to cut from the opposite side.
     *
     * @param event - The mouse click event from the invert button
     * @internal
     */
    private onInvertCuttingPlane;
    /**
     * Handles the toggle visibility button click event.
     *
     * Toggles the visibility of the cutting plane's reference geometry,
     * switching between showing and hiding the visual representation of the plane.
     *
     * @param event - The click event from the toggle visibility button
     * @internal
     */
    private onToggleVisibility;
    /**
     * Handles the remove cutting plane button click event.
     *
     * Removes the cutting plane from its section, permanently deleting it
     * from the cutting configuration. This action cannot be undone.
     *
     * @param event - The click event from the remove button
     * @internal
     */
    private onRemoveCuttingPlane;
}
