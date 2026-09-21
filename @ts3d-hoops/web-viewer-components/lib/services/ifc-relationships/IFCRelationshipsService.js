import { RelationshipType as a } from "@ts3d-hoops/web-viewer";
class d extends EventTarget {
  constructor(e) {
    super(), this.serviceName = "IFCRelationshipsService", this._selectionRelationships = [], this.getNodeRelationships = (i) => {
      var n;
      const t = i.getNodeId(), s = (n = this._selectionManager) == null ? void 0 : n.viewer.model.getBimIdFromNode(t);
      return s ? this.getBimElementRelationships(t, s) : [];
    }, this._selectionManager = e, this.callbackMap = {
      selectionArray: this.handleSelectionArray.bind(this)
    }, this._selectionManager && this.bind();
  }
  get viewer() {
    var e;
    return (e = this._selectionManager) == null ? void 0 : e.viewer;
  }
  set selectionManager(e) {
    this._selectionManager = e, this._selectionManager && this.bind();
  }
  get selectionRelationships() {
    return this._selectionRelationships;
  }
  set selectionRelationships(e) {
    this._selectionRelationships = e, this.dispatchEvent(
      new CustomEvent("hoops-selection-ifc-relationships-changed", {
        detail: this.selectionRelationships
      })
    );
  }
  /**
   * Handles selection changes and emits relationship data
   * @fires hoops-selection-ifc-relationships-changed
   */
  handleSelectionArray(e) {
    this.selectionRelationships = e.map((i) => i.getSelection()).map(this.getNodeRelationships).flat();
  }
  /**
   * Get all relationships for a BIM element
   * @returns Array of relationship data with agglomerated elements containing both relateds and relatings
   */
  getBimElementRelationships(e, i) {
    if (!this.viewer)
      return console.warn("WebViewer not available in IFCRelationshipsService"), [];
    const t = this.viewer.model.getRelationshipTypesFromBimId(e, i), s = [];
    for (const n of t) {
      const l = this.viewer.model.getBimIdConnectedElements(e, i, n), r = this._processBimIds(e, l.relateds), c = this._processBimIds(e, l.relatings);
      s.push({
        type: n,
        typeName: this._getRelationshipTypeName(n),
        elements: [
          ...r.map((o) => ({ ...o, role: "related" })),
          ...c.map((o) => ({ ...o, role: "relating" }))
        ]
      });
    }
    return s;
  }
  /**
   * Converts BIM IDs to element info with names and connection status
   */
  _processBimIds(e, i) {
    return this.viewer ? i.map((t) => {
      if (!this.viewer)
        return {
          bimId: t,
          name: t,
          connected: !1,
          nodeId: void 0
        };
      const s = this.viewer.model.getBimInfoFromBimId(e, t), n = this.viewer.model.getNodeIdFromBimId(e, t);
      return {
        bimId: t,
        name: s.name,
        connected: s.connected,
        nodeId: n || void 0
      };
    }) : [];
  }
  /**
   * Converts relationship type enum to human-readable string
   */
  _getRelationshipTypeName(e) {
    return {
      [a.ContainedInSpatialStructure]: "Contained In Spatial Structure",
      [a.Aggregates]: "Aggregates",
      [a.VoidsElement]: "Voids Element",
      [a.FillsElement]: "Fills Element",
      [a.SpaceBoundary]: "Space Boundary",
      [a.ConnectsPathElements]: "Connects Path Elements",
      [a.Undefined]: "Undefined"
    }[e] || "Unknown";
  }
  /**
   * Binds service to selection manager for auto-emit functionality
   */
  bind() {
    if (!this._selectionManager) {
      console.warn("SelectionManager not available in IFCRelationshipsService");
      return;
    }
    this._selectionManager.viewer.setCallbacks(this.callbackMap), this.selectionRelationships = this._selectionManager.getResults().map(this.getNodeRelationships).flat();
  }
  selectNode(e) {
    if (!this._selectionManager)
      throw new Error("SelectionManager not available in IFCRelationshipsService");
    this._selectionManager.selectNode(e);
  }
}
export {
  d as default
};
