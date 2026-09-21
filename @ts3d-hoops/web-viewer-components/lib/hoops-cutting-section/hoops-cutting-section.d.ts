import { LitElement, PropertyValues } from 'lit';
import { ICuttingService } from '../services';
/**
 * A comprehensive cutting section component that manages multiple cutting planes as a group.
 *
 * This component provides a complete interface for a cutting section, which is a collection
 * of cutting planes that work together. It includes:
 * - Collapsible accordion display with section labeling
 * - Integrated toolbar for section-wide operations (add planes, visibility, clear, activate)
 * - Dynamic list of cutting plane components within the section
 * - Automatic expansion when new planes are added
 * - Real-time synchronization with cutting service events
 *
 * The component uses an accordion layout where the header shows the section name and toolbar,
 * and the content area contains a dynamic list of cutting plane components. The section
 * automatically expands when planes are added to provide immediate visual feedback.
 *
 * @element hoops-cutting-section
 *
 * @slot header - Slot for the section header content displaying the section label
 * @slot toolbar - Slot for the section toolbar with operation buttons (add, visibility, clear, activate)
 * @slot content - Slot for the cutting plane components within this section
 *
 * @cssprop --hoops-neutral-background-20 - Background color for the content area
 *
 * @attribute {number} sectionIndex - The index of the cutting section to display
 * @attribute {string} label - The display label shown in the accordion header
 *
 * @example
 * ```html
 * <hoops-cutting-section sectionIndex="0" label="Primary Section"></hoops-cutting-section>
 *
 * <script>
 *   const section = document.getElementsByTagName('hoops-cutting-section')[0];
 *   section.service = cuttingService;
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsCuttingSectionElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The index of the cutting section to display and manage.
     * Used to identify which section's data and operations this component handles.
     *
     * @default 0
     */
    sectionIndex: number;
    /**
     * The display label for the cutting section shown in the accordion header.
     * Provides a human-readable name for the section to help users identify
     * different sections in multi-section scenarios.
     *
     * @default ""
     */
    label: string;
    /**
     * The cutting service instance that provides cutting section operations.
     * All section and plane operations are performed through this service interface.
     * When undefined, the component renders nothing.
     *
     * @default undefined
     */
    service?: ICuttingService;
    /**
     * Internal state controlling whether the accordion section is currently expanded.
     * Automatically set to true when new cutting planes are added to provide
     * immediate visual feedback to the user.
     *
     * @default false
     * @internal
     */
    expanded: boolean;
    /**
     * Constructs a new HoopsCuttingSectionElement.
     *
     * Initializes the component with default property values and binds
     * event handler methods for proper context preservation.
     */
    constructor();
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting service events to keep the
     * section synchronized with the service state.
     *
     * @param _changedProperties - Map of changed properties
     * @internal
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * Lifecycle method called when the element is removed from the DOM.
     *
     * Cleans up all event listeners to prevent memory leaks.
     *
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Event handler that invalidates the section when it changes.
     *
     * @param event - Custom event containing the section index that changed
     * @internal
     */
    private invalidateSection;
    /**
     * Event handler that handles cutting plane addition events.
     *
     * Automatically expands the accordion section when a new plane is added to provide
     * immediate visual feedback to the user.
     *
     * @param event - Custom event containing the section index where a plane was added
     * @internal
     */
    private handleCuttingPlaneAdded;
    /** @internal */
    protected render(): unknown;
}
