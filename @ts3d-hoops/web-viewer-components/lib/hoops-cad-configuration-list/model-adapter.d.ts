import { HTMLTemplateResult, nothing } from 'lit';
import { CadConfigurationData, IModel } from './types';
/**
 * The signature of the callback used by ModelAdapter to create item for the
 * `hoops-cad-configuration-list`
 *
 * @typedef {CadConfigurationListItemFactory}
 */
export type CadConfigurationListItemFactory = (modelAdapter: ModelAdapter, cadConfigurationId: number, active?: boolean) => HTMLTemplateResult | typeof nothing;
/**
 * Create a `hoops-cad-configuration-list-item` to render in the cad configuration list. If cadConfigurationId is not set
 * or is NaN then nothing is displayed.
 *
 * @param {ModelAdapter} modelAdapter The model adapter
 * @param {number} cadConfigurationId The id of the cad configuration to render
 * @param {?boolean} [active] whether the cad configuration is active or not
 * @returns {(HTMLTemplateResult | typeof nothing)} The HTML fragment to display
 */
export declare function defaultItemFactory(modelAdapter: ModelAdapter, cadConfigurationId: number, active?: boolean): HTMLTemplateResult | typeof nothing;
export declare const CadConfigurationRootId = -1;
/**
 * This class serves as a proxy to the Model class. I is used by the HoopsCadConfigurationListElement
 * to communicate with the Model.
 *
 * @class ModelAdapter
 * @typedef {ModelAdapter}
 */
export declare class ModelAdapter {
    /**
     * The Model where the cad configurations will be queried.
     *
     * @type {?IModel}
     */
    model?: IModel;
    /**
     * A function that creates a HTML fragment for a cad configuration.
     *
     * @type {CadConfigurationListItemFactory}
     */
    itemFactory: CadConfigurationListItemFactory;
    /**
     * Get cad configurations from the model and format them to the desired format
     *
     * @returns {CadConfigurationData[]} the cad configurations
     */
    getCadConfigurations(): CadConfigurationData[];
    /**
     * Return the HTML Fragment for a cad configuration.
     * @param cadConfigurationData The id of the cad configuration to render.
     * @param active Whether the cad configuration is active or not.
     * @returns The HTML fragment to render for the node.
     */
    getContent(cadConfigurationData: CadConfigurationData, active: boolean): HTMLTemplateResult | typeof nothing;
}
export default ModelAdapter;
