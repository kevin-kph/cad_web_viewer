import { LitElement } from 'lit';
/**
 * A node element representing a single sheet entry in the sheet list.
 *
 * @element hoops-sheet-list-node
 *
 * @attribute {number} nodeId - The sheet node id in the model
 * @attribute {string} nodeName - Display name of the sheet
 *
 * @example
 * ```html
 * <hoops-sheet-list-node nodeId="42" nodeName="Sheet 1"></hoops-sheet-list-node>
 * ```
 *
 * @since 2026.3.0
 */
export declare class SheetListNode extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The sheet node id.
     *
     * @type {number}
     */
    nodeId: number;
    /**
     * The display name of the sheet.
     *
     * @type {string}
     */
    nodeName: string;
    /** @internal */
    protected render(): unknown;
    /**
     * Whether the node is visually selected.
     *
     * @type {boolean}
     */
    selected: boolean;
}
