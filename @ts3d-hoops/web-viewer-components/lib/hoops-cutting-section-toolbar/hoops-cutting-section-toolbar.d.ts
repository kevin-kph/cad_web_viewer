import { LitElement, PropertyValues } from 'lit';
import { ICuttingService } from '../services';
/**
 * A comprehensive toolbar component for managing cutting section operations.
 *
 * This component provides a complete interface for cutting section management, including:
 * - Dropdown menu for creating cutting planes with various orientation presets
 * - Support for axis-aligned planes (X, Y, Z axes)
 * - Face-based plane creation using selected geometry
 * - Custom plane creation with arbitrary orientation
 * - Section-wide operations (visibility toggle, clear, activate/deactivate)
 * - Visual feedback for section state and capacity limits
 *
 * The toolbar automatically updates when cutting sections change and provides
 * intuitive controls for both novice and advanced users.
 *
 * @element hoops-cutting-section-toolbar
 *
 * @example
 * ```html
 * <hoops-cutting-section-toolbar
 *   sectionIndex="0"
 *   .service=${cuttingService}>
 * </hoops-cutting-section-toolbar>
 * ```
 *
 * @example
 * ```typescript
 * // Create and configure section toolbar
 * const toolbar = document.createElement('hoops-cutting-section-toolbar');
 * toolbar.sectionIndex = 0;
 * toolbar.service = cuttingService;
 * container.appendChild(toolbar);
 * ```
 *
 * @example
 * ```html
 * <!-- Toolbar with all sections -->
 * <div class="cutting-sections">
 *   <hoops-cutting-section-toolbar sectionIndex="0" .service=${service}></hoops-cutting-section-toolbar>
 *   <hoops-cutting-section-toolbar sectionIndex="1" .service=${service}></hoops-cutting-section-toolbar>
 * </div>
 * ```
 */
export declare class HoopsCuttingSectionToolbarElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The index of the cutting section to manage with this toolbar.
     * Used to identify which section's operations this toolbar controls.
     *
     * @default -1
     */
    sectionIndex: number;
    /**
     * The cutting service instance that provides cutting section operations.
     * All toolbar operations are performed through this service interface.
     * When undefined, the toolbar renders nothing.
     *
     * @default undefined
     */
    service?: ICuttingService;
    /**
     * Query selector for the dropdown menu element used for plane creation options.
     * Used to programmatically control dropdown visibility after plane creation.
     *
     * @internal
     */
    private _dropdown?;
    /**
     * Constructs a new HoopsCuttingSectionToolbarElement.
     *
     * Initializes the component with default property values and binds
     * the invalidateToolbar method for proper event handling context.
     */
    constructor();
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting section and face selection change events
     * to keep the toolbar synchronized with the current state of the cutting section
     * and user selections.
     *
     * @param _changedProperties - Map of changed properties (not used)
     * @internal
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lifecycle method called when the element is removed from the DOM.
     *
     * Cleans up event listeners to prevent memory leaks when the toolbar
     * is no longer needed.
     *
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Event handler that invalidates the toolbar when the associated cutting section changes.
     *
     * This method listens for cutting section and face selection change events and triggers
     * a re-render if the changed section matches this toolbar's section index or if the
     * event affects face selection state.
     *
     * @param event - Custom event containing section index or general selection changes
     * @internal
     */
    private invalidateToolbar;
    /**
     * Hides the dropdown menu after a plane creation operation.
     *
     * This method programmatically closes the dropdown to provide better user experience
     * after plane creation, preventing the menu from staying open unnecessarily.
     *
     * @internal
     */
    private hideDropdown;
    /** @internal */
    protected render(): unknown;
}
