import { LitElement, PropertyValues } from 'lit';
import { ICuttingService } from '../services/cutting/types';
/**
 * A comprehensive cutting plane component that combines display, editing, and management capabilities.
 *
 * This component provides a complete interface for a single cutting plane, including:
 * - Collapsible accordion display with plane identification
 * - Integrated toolbar for quick actions (invert, visibility, remove)
 * - Expandable editor for detailed property modification
 * - Automatic service discovery and synchronization
 * - Real-time updates when cutting plane properties change
 *
 * The component uses an accordion layout where the header shows the plane name and toolbar,
 * and the content area contains the detailed editor. The editor visibility is controlled
 * by the toolbar's customize button.
 *
 * @element hoops-cutting-plane
 *
 * @example
 * ```html
 * <hoops-cutting-plane
 *   sectionIndex="0"
 *   planeIndex="1"
 *   .service=${cuttingService}>
 * </hoops-cutting-plane>
 * ```
 *
 * @example
 * ```typescript
 * // Create and configure cutting plane component
 * const planeComponent = document.createElement('hoops-cutting-plane');
 * planeComponent.sectionIndex = 0;
 * planeComponent.planeIndex = 1;
 * planeComponent.service = cuttingService;
 * container.appendChild(planeComponent);
 * ```
 *
 * @example
 * ```html
 * <!-- Multiple cutting planes in a list -->
 * <div class="cutting-planes-list">
 *   <hoops-cutting-plane sectionIndex="0" planeIndex="0"></hoops-cutting-plane>
 *   <hoops-cutting-plane sectionIndex="0" planeIndex="1"></hoops-cutting-plane>
 *   <hoops-cutting-plane sectionIndex="1" planeIndex="0"></hoops-cutting-plane>
 * </div>
 * ```
 */
export declare class HoopsCuttingPlaneElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Internal state controlling whether the detailed editor is currently visible.
     * Toggled by the toolbar's customize button to expand/collapse the editor.
     *
     * @default false
     * @private
     */
    private showEditor;
    /**
     * The index of the cutting plane within the specified cutting section.
     * Used to identify the specific plane to display and manage.
     *
     * @default -1
     */
    planeIndex: number;
    /**
     * The index of the cutting section containing the target cutting plane.
     * Used to identify which section contains the plane to display.
     *
     * @default -1
     */
    sectionIndex: number;
    /**
     * The cutting service instance that provides cutting plane operations.
     * When not provided, the component will attempt to auto-discover the service.
     * If no service is available, the component renders nothing.
     *
     * @default undefined
     */
    service?: ICuttingService;
    /**
     * Constructs a new HoopsCuttingPlaneElement.
     *
     * Initializes the component with default property values and binds
     * the invalidateCuttingPlane method for proper event handling context.
     */
    constructor();
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting plane change events to keep the
     * component synchronized with the state of its associated cutting plane.
     *
     * @param _changedProperties - Map of changed properties (not used)
     * @protected
     * @override
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lifecycle method called when the element is removed from the DOM.
     *
     * Cleans up event listeners to prevent memory leaks when the component
     * is no longer needed.
     *
     * @override
     */
    disconnectedCallback(): void;
    /**
     * Event handler that invalidates the component when the associated cutting plane changes.
     *
     * This method listens for cutting plane change events and triggers a re-render
     * if the changed plane matches this component's section and plane indices.
     *
     * @param event - Custom event containing section and plane indices that changed
     * @private
     */
    private invalidateCuttingPlane;
    /** @internal */
    protected render(): unknown;
}
