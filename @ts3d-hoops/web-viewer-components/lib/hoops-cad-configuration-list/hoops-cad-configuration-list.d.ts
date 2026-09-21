import { LitElement } from 'lit';
import { ModelAdapter } from './model-adapter';
import { IModel } from './types';
export type * from './custom-events.d.ts';
/**
 * Provides a selectable list of CAD configurations for 3D model viewing.
 *
 * This web component displays available CAD configurations from a model and allows users
 * to select different configurations. It automatically integrates with the model adapter
 * to fetch configuration data and provides click interaction for configuration switching.
 *
 * @element hoops-cad-configuration-list
 *
 * @fires hoops-cad-configuration-list-click - Emitted when a CAD configuration is clicked, includes configuration ID and mouse event details
 *
 * @attribute {number} active - The ID of the currently active CAD configuration
 *
 * @example
 * ```html
 * <hoops-cad-configuration-list active="1"></hoops-cad-configuration-list>
 *
 * <script>
 *   document.getElementsByTagName('hoops-cad-configuration-list')[0].modelAdapter = adapter;
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsCadConfigurationListElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Gets or sets the 3D model containing CAD configurations.
     *
     * This is a convenience accessor for the modelAdapter's model property.
     * Setting a new model will reset the component state and reload configuration data.
     *
     * @returns {IModel | undefined} The current model, or undefined if no model adapter is set
     * @throws {Error} When attempting to set a model without a configured model adapter
     */
    get model(): IModel | undefined;
    /**
     * @param model - The model to set
     * @returns {void}
     */
    set model(model: IModel | undefined);
    /**
     * Model adapter used to proxy the web viewer model and allow customization of the CAD configuration list.
     *
     * Reassigning the modelAdapter will trigger an update of the component.
     *
     * @default new ModelAdapter()
     */
    modelAdapter?: ModelAdapter;
    /**
     * The ID of the currently active CAD configuration.
     *
     * When set, highlights the corresponding configuration in the list.
     * Set to undefined if no active configuration is selected.
     *
     * @default undefined
     */
    active?: number;
    /**
     * Internal data for the configuration list
     * Undefined means the data is not cached from the model yet.
     *
     * @type {CadConfigurationData[]}
     */
    private cadConfigurationData?;
    /**
     * Resets the component state by clearing the cached configuration data and active selection.
     * Called when the model or model adapter changes to ensure fresh data loading.
     *
     * @internal
     * @returns {void}
     */
    private reset;
    /**
     * Generates HTML template results for all CAD configuration items.
     * Loads configuration data from model adapter if not cached, then maps each
     * configuration to a clickable list item element.
     *
     * @internal
     * @returns {HTMLTemplateResult[]} Array of HTML templates for configuration list items
     */
    private getCadConfigurationHtmlElements;
    /**
     * Handles click events on CAD configuration list items.
     * Stops event propagation and dispatches a custom event with configuration details.
     *
     * @internal
     * @param event - The mouse click event
     * @param cadConfigurationId - ID of the clicked CAD configuration
     * @returns {void}
     */
    private handleClick;
    /** @internal */
    protected render(): unknown;
}
export default HoopsCadConfigurationListElement;
