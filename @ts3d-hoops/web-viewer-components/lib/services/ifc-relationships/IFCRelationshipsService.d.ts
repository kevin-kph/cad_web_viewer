import { CallbackMap, NodeId, Selection } from '@ts3d-hoops/web-viewer';
import { IIFCRelationshipsService, RelationshipData } from './types';
/**
 * Service for managing IFC element relationships
 * - Get relationships for any BIM element with agglomerated elements
 * - Auto-emit relationships for selected elements
 */
export default class IFCRelationshipsService extends EventTarget implements IIFCRelationshipsService {
    readonly serviceName: "IFCRelationshipsService";
    get viewer(): import('@ts3d-hoops/web-viewer').IWebViewer | undefined;
    _selectionManager?: Selection.SelectionManager;
    callbackMap: CallbackMap;
    constructor(selectionManager?: Selection.SelectionManager);
    set selectionManager(selectionManager: Selection.SelectionManager);
    _selectionRelationships: RelationshipData[];
    get selectionRelationships(): RelationshipData[];
    set selectionRelationships(relationships: RelationshipData[]);
    /**
     * Handles selection changes and emits relationship data
     * @fires hoops-selection-ifc-relationships-changed
     */
    private handleSelectionArray;
    /**
     * Extracts relationships from a selection item
     */
    private getNodeRelationships;
    /**
     * Get all relationships for a BIM element
     * @returns Array of relationship data with agglomerated elements containing both relateds and relatings
     */
    private getBimElementRelationships;
    /**
     * Converts BIM IDs to element info with names and connection status
     */
    private _processBimIds;
    /**
     * Converts relationship type enum to human-readable string
     */
    private _getRelationshipTypeName;
    /**
     * Binds service to selection manager for auto-emit functionality
     */
    private bind;
    selectNode(nodeId: NodeId): void;
}
