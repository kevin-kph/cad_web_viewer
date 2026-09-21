import { Point3 as r } from "@ts3d-hoops/web-viewer";
class w extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "ExplodeService";
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(e) {
    this._webviewer !== e && (this._webviewer = e, this.reset());
  }
  /**
   * Resets the explode service, clearing any active operations.
   */
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-explode-service-reset", { bubbles: !0, composed: !0 })
    );
  }
  /**
   * Starts an explode operation. This will cancel any currently active explode operation.
   * @param nodeIds an array of node Ids for the parts that should be exploded. If this parameter is omitted or is an empty array, the entire model will be considered for explosion.
   * @param explosionVector the vector to use for the center of the explosion.
   * @returns a promise that resolves when this operation is complete.
   */
  async start(e, t) {
    if (!this._webviewer)
      return Promise.reject(new Error("Webviewer not set"));
    await this._webviewer.explodeManager.start(
      e,
      t ? new r(t.x, t.y, t.z) : void 0
    ), this.dispatchEvent(
      new CustomEvent("hoops-explode-started", {
        bubbles: !0,
        composed: !0,
        detail: { nodeIds: e, explosionVector: t }
      })
    );
  }
  /**
   * Sets the explosion magnitude if there is an active explosion operation.
   * A value of 1.0 indicates that the distance between a part's exploded center, and exploded center will be double.
   * @param magnitude the magnitude for the explosion.
   * @returns a promise that resolves when this operation is complete.
   */
  async setMagnitude(e) {
    if (!this._webviewer)
      return Promise.reject(new Error("Webviewer not set"));
    await this._webviewer.explodeManager.setMagnitude(e), this.dispatchEvent(
      new CustomEvent("hoops-explode-magnitude-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  /**
   * Terminates any active explode operation.
   * @returns a promise that resolves when this operation is complete.
   */
  async stop() {
    if (!this._webviewer)
      return Promise.reject(new Error("Webviewer not set"));
    await this._webviewer.explodeManager.stop(), this.dispatchEvent(
      new CustomEvent("hoops-explode-stopped", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Gets the current explode magnitude. This will always return 0 when there is no active explode operation.
   * @returns the current explode magnitude.
   */
  getMagnitude() {
    return this._webviewer ? this._webviewer.explodeManager.getMagnitude() : 0;
  }
  /**
   * Indicates whether there is a currently active explode operation.
   * @returns boolean value indicating if there is an active explode operation.
   */
  getActive() {
    return this._webviewer ? this._webviewer.explodeManager.getActive() : !1;
  }
}
export {
  w as default
};
