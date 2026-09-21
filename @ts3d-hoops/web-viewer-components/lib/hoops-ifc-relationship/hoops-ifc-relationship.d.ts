import { LitElement } from 'lit';
import { IIFCRelationshipsService, RelationshipData } from '../services';
/**
 * Provides a component for displaying IFC relationships in BIM models.
 *
 * This component shows hierarchical relationships between IFC elements, allowing users to explore
 * how building components relate to each other. It displays relationship types, element names,
 * and provides navigation to related elements through selection.
 *
 * The component automatically updates when selection changes and provides expandable/collapsible
 * relationship groups with smooth animations (unless disabled).
 *
 * @element hoops-ifc-relationship
 *
 * @cssprop --hoops-separator-color - Color for borders and separators
 * @cssprop --hoops-foreground - Text and icon color
 * @cssprop --hoops-svg-fill-color - Fill color for SVG icons
 * @cssprop --hoops-neutral-background-20 - Background color for hover states
 *
 * @attribute {boolean} no-anim - Disables animations when set
 *
 * @example
 * ```html
 * <hoops-ifc-relationship no-anim></hoops-ifc-relationship>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsIFCRelationshipElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    service: IIFCRelationshipsService;
    /**
     * When true, animations will be disabled for this component
     */
    noAnim: boolean;
    selectionRelationships: RelationshipData[] | undefined;
    expandedRelationships: Record<string, boolean>;
    /**
     * Lifecycle callback when component is first updated.
     *
     * Initializes the IFC relationships service and sets up event listeners
     * for relationship changes based on selection.
     *
     * @returns {void}
     */
    firstUpdated(): void;
    /**
     * Handles IFC relationships changed events from the service.
     *
     * Updates the component's selection relationships state when the IFC relationships
     * service broadcasts changes based on current selection.
     *
     * @internal
     * @param event - Custom event containing the updated relationship data array
     * @returns {void}
     */
    private relationshipsChangedHandler;
    /**
     * Lifecycle callback when component is removed from the DOM.
     *
     * Cleans up event listeners for IFC relationships service to prevent memory leaks.
     *
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Handles click events on relationship element buttons.
     *
     * Selects the corresponding node in the model when a relationship element is clicked,
     * allowing navigation through related IFC elements.
     *
     * @internal
     * @param event - The mouse click event
     * @param relationship - The relationship element information containing node ID
     * @returns {void}
     */
    private handleButtonClick;
    /**
     * Toggles the expanded/collapsed state of a relationship group.
     *
     * Controls the visibility of relationship elements within a specific relationship type,
     * with smooth animations (unless disabled via no-anim attribute).
     *
     * @param relationshipType - The type name of the relationship to toggle
     * @returns {void}
     */
    toggleRelationship(relationshipType: string): void;
    /**
     * Checks whether a relationship group is currently expanded.
     *
     * @param relationshipType - The type name of the relationship to check
     * @returns {boolean} True if the relationship group is expanded, false otherwise
     */
    isRelationshipExpanded(relationshipType: string): boolean;
    /**
     * Renders the appropriate directional icon for relationship types.
     *
     * Creates visual indicators to show the direction of IFC relationships:
     * - 'relating': Shows left arrow (←) indicating this element relates to others
     * - 'related': Shows right arrow (→) indicating this element is related by others
     *
     * @internal
     * @param type - The relationship direction type ('relating' or 'related')
     * @returns {TemplateResult | typeof nothing} HTML template with directional icon or nothing if invalid type
     */
    private renderRelationshipIcon;
    /**
     * Renders a single relationship element as a clickable button.
     *
     * Creates an interactive list item for each related IFC element, including:
     * - Directional icon showing relationship type (relating/related)
     * - Element name and BIM ID for identification
     * - Click handler for element selection and navigation
     * - Disabled state when element lacks required IDs
     *
     * @internal
     * @param relationship - The relationship element information to render
     * @returns {TemplateResult | typeof nothing} HTML template for the relationship item or nothing if invalid
     */
    private renderRelationships;
    /**
     * Renders a complete relationship group with expandable/collapsible functionality.
     *
     * Creates a hierarchical display for a relationship type including:
     * - Expandable header with toggle icon and element count
     * - Collapsible content area with smooth animations (unless disabled)
     * - List of related elements within the relationship type
     * - Proper accessibility attributes for screen readers
     *
     * @internal
     * @param relationshipData - The relationship group data containing type name and elements
     * @returns {TemplateResult | typeof nothing} HTML template for the relationship group or nothing if no elements
     */
    private renderRelationshipData;
    /** @internal */
    protected render(): unknown;
}
