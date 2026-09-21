import { LitElement } from 'lit';
import { ContextWrapper } from './context';
import { TreeEntryData } from './types';
/**
 * Provides a tree view component for displaying hierarchical data structures.
 *
 * @element hoops-tree
 *
 * @example
 * ```html
 * <hoops-tree></hoops-tree>
 *
 * <script>
 *   const tree = document.getElementsByTagName("hoops-tree")[0];
 *   tree.tree = {
 *     context: {
 *       expandedIcon: '▼',
 *       collapsedIcon: '▶',
 *       getRoot: () => 0,
 *       getChildren: (key) => key === 0 ? [1, 2] : [],
 *       getContent: (key) => `Node ${key}`,
 *       isSelected: (key) => tree.selected.includes(key)
 *     }
 *   };
 *   tree.selected = [1];
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export default class Tree extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Holds all tree node data needed for rendering the hierarchy.
     * Maps node keys to TreeEntryData. Reassign to trigger updates.
     *
     * @default {}
     */
    entries: Record<number, TreeEntryData>;
    /**
     * Array of selected node keys. Reassign to trigger updates.
     *
     * @default []
     */
    selected: number[];
    /**
     * Context wrapper providing tree data access methods. Reassign to trigger updates.
     */
    tree: ContextWrapper;
    /**
     * Triggers a re-render by reassigning entries.
     *
     * @returns void
     */
    updateEntries(): void;
    /**
     * Triggers a re-render by reassigning tree context.
     *
     * @returns void
     */
    updateContext(): void;
    /**
     * Triggers a re-render by reassigning selected entries.
     *
     * @returns void
     */
    updateSelected(): void;
    /**
     * Loads and registers child nodes for a parent node.
     *
     * @param parent - The parent node entry
     * @returns void
     */
    loadChildrenData(parent: TreeEntryData): void;
    /**
     * Expands all nodes along the specified path.
     *
     * @param nodePath - Array of node keys representing the path to expand
     * @returns void
     * @throws Error when a node in the path is not found
     */
    expandPath(nodePath: number[]): void;
    /**
     * Refreshes node data from context. No-op if node is not loaded.
     *
     * @param nodeKey - The key of the node to refresh
     * @returns void
     */
    refreshNodeData(nodeKey: number): void;
    /**
     * Removes a node and all its children from the tree. No-op if node is not loaded.
     *
     * @param nodeKey - The key of the node to remove
     * @returns void
     */
    removeNode(nodeKey: number): void;
    /**
     * Resets the tree to its initial state, clearing all entries and selections.
     *
     * @returns void
     */
    resetTree(): void;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles node expansion events and loads children on demand.
     *
     * @internal
     * @param event - The tree node expand event
     */
    private handleNodeExpanded;
    /**
     * Recursively generates HTML template for a node and its loaded children.
     *
     * @internal
     * @param nodeData - Optional node entry data
     * @returns HTML template for the node or nothing if node is not loaded
     */
    private getNode;
    /**
     * Gets or creates the root node entry data.
     *
     * @internal
     * @param rootKey - The key for the root node
     * @returns The root node entry data
     */
    private getRootNodeData;
}
