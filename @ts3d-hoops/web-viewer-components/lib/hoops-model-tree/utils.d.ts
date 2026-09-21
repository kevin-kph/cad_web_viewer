import { NodeType } from '@ts3d-hoops/web-viewer';
import { HTMLTemplateResult, nothing } from 'lit';
import { BranchVisibility } from './types';
/**
 * Turn a node type name into the corresponding value in the NodeType enum.
 *
 * @param {string} name of the NodeType
 * @returns {NodeType}
 */
export declare function toNodeType(name: string): NodeType;
/**
 * Formate a NodeType into a string.
 *
 * @param {NodeType} type The type to format.
 * @returns {("Assembly Node" | "Part Instance" | "Part" | "Body Instance" | "Pmi Body" | "View Frame" | "Body" | "Brep Body" | "Tess Body" | "Wire Body" | "Points Body" | "Pmi" | "Cad View" | "Drawing Sheet" | "Unknown")}
 */
export declare function formatNodeType(type: NodeType): "Body" | "Unknown" | "Assembly Node" | "Part Instance" | "Part" | "Body Instance" | "Pmi Body" | "View Frame" | "Brep Body" | "Tess Body" | "Wire Body" | "Points Body" | "Pmi" | "Cad View" | "Drawing Sheet";
/**
 * Provide the icon for a NodeType as an HTML fragment.
 *
 * @param {boolean} isRoot If the node is a root.
 * @param {NodeType} type The type of the node we want the icon for.
 * @returns {(HTMLTemplateResult | typeof nothing)}
 */
export declare function formatNodeTypeIcon(isRoot: boolean, type: NodeType): HTMLTemplateResult | typeof nothing;
/**
 * Provide the icon for the visibility of a node.
 *
 * @param {BranchVisibility} visibility The visibility of the node.
 * @returns {(HTMLTemplateResult | typeof nothing)}
 */
export declare function formatNodeVisibilityIcon(visibility: BranchVisibility): HTMLTemplateResult | typeof nothing;
