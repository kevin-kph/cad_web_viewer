import { LitElement } from 'lit';
import { INodePropertyAdapter } from './types';
/**
 * A web component that displays properties and user data for a selected node in a tabular format.
 *
 * The component fetches and renders node information including the node name, ID, properties,
 * and associated user data in organized tables.
 *
 * @element hoops-node-properties
 *
 * @cssprop --hoops-node-properties-table-border - Border style for property tables
 * @cssprop --hoops-node-properties-header-padding - Padding for table headers
 *
 * @attribute {number} nodeId - The ID of the node to display properties for
 *
 * @example
 * ```html
 * <hoops-node-properties nodeId="12345"></hoops-node-properties>
 * ```
 *
 * @since 2025.7.0
 */
export declare class NodeProperties extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The ID of the node to display properties for.
     *
     * @default Number.NaN
     */
    nodeId: number;
    /**
     * The adapter instance used to fetch node data.
     *
     * Can be customized by providing any object implementing the INodePropertyAdapter interface.
     *
     * @default new NodePropertyAdapter()
     */
    node: INodePropertyAdapter;
    /** @internal */
    private loadDataTask;
    /**
     * Generates a table HTML template to display property data in a two-column format.
     *
     * @param rows - Array of key-value pairs to display in the table
     * @param formatter - Optional function to format the value column content
     * @returns HTML template for the table or nothing if rows array is empty
     *
     * @internal
     */
    private generateTable;
    /** @internal */
    protected render(): unknown;
}
export default NodeProperties;
