import { HTMLTemplateResult } from 'lit';
import { IModel, INodePropertyAdapter } from './types';
/**
 * This class serves as a proxy to the Model class. It is used by the NodeProperties
 * to communicate with the Model.
 *
 * @class ModelAdapter
 * @typedef {ModelAdapter}
 */
export declare class NodePropertyAdapter implements INodePropertyAdapter {
    /**
     * The Model where the node will be queried.
     *
     * @type {?IModel}
     */
    model?: IModel;
    /**
     * This callback can be used to format properties before adding them to the DOM
     *
     * @type {?(| ((key: string, value: string) => [HTMLTemplateResult, HTMLTemplateResult])
     *     | undefined)}
     */
    formatProperty?: ((key: string, value: string) => [HTMLTemplateResult, HTMLTemplateResult]) | undefined;
    /**
     * This callback can be used to format user data before adding them to the DOM
     *
     * @type {?(| ((key: string, value: string) => [HTMLTemplateResult, HTMLTemplateResult])
     *     | undefined)}
     */
    formatUserData?: ((key: string, value: string) => [HTMLTemplateResult, HTMLTemplateResult]) | undefined;
    /**
     * Get the name of the node
     *
     * @param {number} nodeId The node to gather information from
     * @returns {string} The name of the node
     */
    getNodeName(nodeId: number): string;
    /**
     * Collects all the properties from a given node
     *
     * @param nodeId The id of the node
     * @returns {Promise<[string, string][]>} A table containing the properties as [name, value]
     * tuples
     */
    getProperties(nodeId: number): Promise<[string, string][]>;
    /**
     * Collects all the user data from a given node
     *
     * @param nodeId The id of the node
     * @returns {Promise<[string, string][]>} A table containing the user data as [name, value]
     * tuples
     */
    getUserData(nodeId: number): Promise<[string, string][]>;
}
export default NodePropertyAdapter;
