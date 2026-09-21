class a extends EventTarget {
  constructor(e) {
    super(), this.serviceName = "MaterialService", this.selectedNodeIds = [], this._viewer = e, this.callbackMap = {
      selectionArray: () => {
        var t;
        this.selectedNodeIds = ((t = this._viewer) == null ? void 0 : t.selectionManager.getResults().map((i) => i.getNodeId())) || [], this.dispatchEvent(
          new CustomEvent("hoops-material-selection-change", {
            bubbles: !0,
            composed: !0
          })
        );
      }
    }, this._viewer && this.bind();
  }
  bind() {
    if (!this._viewer)
      throw new Error("Viewer not set");
    this._viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._viewer)
      throw new Error("Viewer not set");
    this._viewer.unsetCallbacks(this.callbackMap);
  }
  get viewer() {
    return this._viewer;
  }
  set viewer(e) {
    this._viewer !== e && (this._viewer && this.unbind(), this._viewer = e, this._viewer && this.bind(), this.dispatchEvent(
      new CustomEvent("hoops-model-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getSelectedNodeIds() {
    return this.selectedNodeIds;
  }
  async getMeshDescription(e) {
    return this._viewer ? await this._viewer.model.getNodeMeshData(e) : void 0;
  }
  async getMaterialDescription(e) {
    if (!this._viewer)
      return;
    const t = await this._viewer.model.getNodesMaterial([e]);
    return t != null && t.length ? t[0] : void 0;
  }
  async setNodesShader(e, t, i, s) {
    if (!this._viewer)
      throw new Error("Viewer not set");
    return this._viewer.model.setNodesShader(e, t, i, s);
  }
}
export {
  a as MaterialService,
  a as default
};
