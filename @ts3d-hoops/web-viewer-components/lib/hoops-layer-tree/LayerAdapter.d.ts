import { HTMLTemplateResult, nothing } from 'lit';
import { ListContext } from '@ts3d-hoops/ui-kit/list';
import { ILayersContainer, LayerTreeElementFactory } from './types';
import { NodeId } from '@ts3d-hoops/web-viewer';
/**
 * Create a `layer-tree-element` to render in the layer list. If layerId is not set
 * or is NaN then nothing is displayed.
 *
 * @param {ILayersContainer} layer The model that contains the layers
 * @param {number} layerId The id of the layer to render
 * @param {boolean} selected whether the layer is selected or not
 * @param {boolean[]} selectedNodes which nodes in the layer sublist are selected
 * @returns {(HTMLTemplateResult | typeof nothing)} The HTML fragment to display
 */
export declare function defaultLayerElementFactory(listContext: ListContext, layersContainer: ILayersContainer, layerId: number, selected?: boolean, selectedNodes?: number[]): HTMLTemplateResult | typeof nothing;
export declare function getSanitizedLayerName(layerName: string | null | undefined, layerId: number, authoredId?: number | null): string;
/**
 * Don't add BodyInstance nodes for BIM models.
 *
 * Drawing files (both 2D and 3D) should use the BodyInstance nodes,
 * as each BodyInstance might be in a different layer.
 *
 * isDrawing will be false for 3D DWG files, so also check that the file
 * is not a DWG file before substituting the BodyInstance for the parent.
 *
 * @param layersContainer - The container that provides access to layer-related operations, which should be a Model object.
 * @param nodeId - The ID of the node to be adjusted.
 * @returns The adjusted node ID. If the model is not a drawing, the file type is not DWG,
 *          and the node type is a BodyInstance, the function returns the parent node ID
 *          if it exists; otherwise, it returns the original node ID.
 */
export declare function getAdjustedNodeId(layersContainer: ILayersContainer, nodeId: number): number;
/**
 * This class serves as a proxy to the Model class. I is used by the LayerTree
 * to communicate with the Model.
 *
 * @class LayerAdapter
 * @typedef {LayerAdapter}
 */
export default class LayerAdapter implements ListContext {
    /**
     * The object that contains layers, for the webviewer this will be our Model object
     *
     * @type {?ILayersContainer}
     */
    layersContainer?: ILayersContainer;
    /**
     * When true, the children hierarchy within layers is not computed.
     * This effectively shows leaf body nodes directly in each layer.
     *
     * @type {boolean}
     */
    alwaysShowLeafNodes: boolean;
    /**
     * A map that holds the node names associated to their id's
     * @type {Map<NodeId, string>}
     */
    nodeIdsToNodeNames: Map<NodeId, string>;
    /**
     * A map that holds the layer names and the collection of
     * node ids that belong to the layer
     * @type {Map<string, Set<NodeId>>}
     */
    layerNamesToNodeIds: Map<string, Set<NodeId>>;
    /**
     * A function that creates a HTML fragment for a given layer.
     *
     * @type {LayerTreeElementFactory}
     */
    layerFactory: LayerTreeElementFactory;
    /**
     * This structure hold custom data for the layers inside the context to make it
     * reactive.
     *
     * You can use this variable to record property for your custom layer list elements
     *
     * The data are recorded as a literal object using the layer ids as keys and
     * anything as value.
     *
     * @type {Record<number, unknown>}
     */
    layersData: Record<number, unknown>;
    elementsData: Map<number, string>;
    /**
     * The icon drawn when a layer is expanded.
     *
     * @type {HTMLTemplateResult}
     */
    expandedIcon: import('lit').TemplateResult<1>;
    /**
     * The icon drawn when a layer is collapsed.
     *
     * @type {HTMLTemplateResult}
     */
    collapsedIcon: import('lit').TemplateResult<1>;
    /**
     * Layer list is not sorted by layer id
     */
    sortedByValue: boolean;
    /**
     * Return the HTML Fragment for a node.
     * @param id The id of the node to render.
     * @param selected Whether the node is selected or not.
     * @returns The HTML fragment to render for the node.
     */
    getContent(_: ListContext, id: number, selected?: boolean, selectedNodes?: number[]): HTMLTemplateResult | typeof nothing;
}
