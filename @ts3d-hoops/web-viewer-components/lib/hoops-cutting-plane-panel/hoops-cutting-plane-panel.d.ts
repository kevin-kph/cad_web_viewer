import { LitElement } from 'lit';
/**
 * A top-level panel component that provides a complete cutting planes management interface.
 *
 * This component serves as the main entry point for cutting plane functionality, providing
 * automatic service discovery, dynamic display of cutting sections, and comprehensive event
 * handling for real-time updates.
 *
 * @element hoops-cutting-plane-panel
 *
 * @service {ICuttingService} CuttingService - Service for managing cutting planes and sections
 *
 * @example
 * ```html
 * <hoops-cutting-plane-panel></hoops-cutting-plane-panel>
 *
 * <script>
 *   const panel = document.getElementsByTagName('hoops-cutting-plane-panel')[0];
 *   // Panel automatically discovers and connects to the cutting service
 * </script>
 * ```
 *
 * @since 2026.1.0
 */
export declare class HoopsCuttingPlanePanelElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The cutting service instance discovered automatically during component connection.
     * Provides access to all cutting plane operations and state management.
     *
     * @internal
     */
    private service;
    /**
     * Lifecycle method called when the element is connected to the DOM.
     *
     * Automatically discovers and initializes the cutting service connection.
     *
     * @internal
     */
    connectedCallback(): void;
    /**
     * Lifecycle method called after the first render.
     *
     * Sets up event listeners for cutting service events to keep the panel synchronized.
     *
     * @internal
     */
    firstUpdated(): void;
    /** @internal */
    protected render(): unknown;
}
