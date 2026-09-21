import { Bcf as c, createUuid as p } from "@ts3d-hoops/web-viewer";
class b extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "BcfService";
  }
  get webViewer() {
    return this._webViewer;
  }
  set webViewer(e) {
    this._webViewer !== e && (this.clearTopicMarkupAutoDeactivate(), this._webViewer = e, this.dispatchEvent(new CustomEvent("hoops-bcf-service-reset", { bubbles: !0, composed: !0 })));
  }
  /** {@inheritDoc IBcfService.getBCFMap} */
  getBCFMap() {
    var e;
    return ((e = this._webViewer) == null ? void 0 : e.BCFManager.getBCFMap()) ?? /* @__PURE__ */ new Map();
  }
  /** {@inheritDoc IBcfService.getBCFData} */
  getBCFData(e) {
    return this._webViewer ? this._webViewer.BCFManager.getBCFData(e) : null;
  }
  /** {@inheritDoc IBcfService.createBCFData} */
  createBCFData(e) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    return this._webViewer.BCFManager.createBCFData(e);
  }
  /** {@inheritDoc IBcfService.addBCFFromBuffer} */
  async addBCFFromBuffer(e, i) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    await this._webViewer.BCFManager.addBCFFromBuffer(e, i);
  }
  /** {@inheritDoc IBcfService.removeBCFData} */
  removeBCFData(e) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    this._webViewer.BCFManager.removeBCFData(e);
  }
  /** {@inheritDoc IBcfService.createTopic} */
  createTopic(e, i) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    return new c.BCFTopic(
      e.getId(),
      e.getFilename(),
      i,
      this._webViewer
    );
  }
  /**
   * Creates a fully initialized BCF topic: markup, title, viewpoint, snapshot, and registers it on the BCF data.
   *
   * @param bcfData - The BCF data set to add the topic to.
   * @param title - The human-readable topic title.
   * @param captureView - The active markup view to capture in the topic viewpoint, or null/undefined.
   * @returns The fully initialized BCF topic.
   */
  async setupTopic(e, i, a) {
    const r = p(), t = this.createTopic(e, r), s = t.addMarkup("markup.bcf", null);
    s.setTopicTitle(i), s.setTopicId(r);
    const n = "viewpoint.bcfv", o = await this.createViewpoint(n, a);
    t.setViewpoint(n, o);
    const w = await this.captureSnapshotPng();
    return w && t.addSnapshot("snapshot.png", w), e.addTopic(r, t), t;
  }
  /**
   * Creates a comment on a BCF topic, including its viewpoint and snapshot.
   *
   * @param topic - The BCF topic to add the comment to.
   * @param text - The comment text.
   * @param captureView - The active markup view to capture in the comment viewpoint, or null/undefined.
   * @returns An object containing the new comment's ID.
   */
  async addTopicComment(e, i, a) {
    const r = e.getMarkup();
    if (!r)
      throw new Error("BcfService: Topic has no markup.");
    const t = p(), s = `${t}.bcfv`, n = `${t}.png`, o = await this.createViewpoint(s, a);
    e.setViewpoint(s, o);
    const w = await this.captureSnapshotPng();
    return w && e.addSnapshot(n, w), r.addViewpoint(t, s, n), { commentId: r.addComment(/* @__PURE__ */ new Date(), "User", i, t).getId() };
  }
  /** {@inheritDoc IBcfService.getMarkupViewForBcfCapture} */
  getMarkupViewForBcfCapture() {
    if (!this._webViewer)
      return null;
    const e = this._webViewer.markupManager, i = e.getActiveMarkupView(this._webViewer.view);
    if (i)
      return i;
    const a = e.getMarkupViewKeys();
    for (let r = a.length - 1; r >= 0; r--) {
      const t = e.getMarkupView(a[r]);
      if (t && t.getMarkup().length > 0)
        return t;
    }
    return null;
  }
  /** {@inheritDoc IBcfService.createViewpoint} */
  async createViewpoint(e, i) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    return await c.BCFViewpoint.createViewpoint(
      this._webViewer,
      e,
      i
    );
  }
  /**
   * Captures the current viewer state as a PNG image using `WebViewer.takeSnapshot()`.
   *
   * @returns PNG bytes of the snapshot, or null if capture fails or viewer is not initialized.
   */
  async captureSnapshotPng() {
    if (!this._webViewer)
      return null;
    try {
      const i = (await this._webViewer.takeSnapshot()).src, a = ";base64,", r = i.indexOf(a);
      if (r < 0)
        return null;
      const t = window.atob(i.substring(r + a.length)), s = new Uint8Array(t.length);
      for (let n = 0; n < t.length; n++)
        s[n] = t.charCodeAt(n);
      return s;
    } catch {
      return null;
    }
  }
  /** {@inheritDoc IBcfService.activateTopicAndRestoreMarkup} */
  async activateTopicAndRestoreMarkup(e, i) {
    if (!this._webViewer)
      throw new Error("BcfService: WebViewer is not initialized.");
    this.clearTopicMarkupAutoDeactivate();
    const r = e.getViewpointMap().values().next().value;
    r && await r.activate(), i && (await this._webViewer.lineManager.removeAllLines(), await this._webViewer.markupManager.activateMarkupViewWithPromise(
      i,
      this._webViewer.view,
      0
    ), this._armTopicMarkupAutoDeactivate(i));
  }
  /**
   * Clears currently active topic markup overlays from the viewer.
   *
   * This centralizes direct markup-manager interactions behind the service API.
   */
  async clearActiveTopicMarkup() {
    this._webViewer && (await this._webViewer.lineManager.removeAllLines(), await this._webViewer.markupManager._setActiveMarkupView(this._webViewer.view, null));
  }
  /** {@inheritDoc IBcfService.clearTopicMarkupAutoDeactivate} */
  clearTopicMarkupAutoDeactivate() {
    this._webViewer && this._topicMarkupCameraCallbacks && this._webViewer.unsetCallbacks(this._topicMarkupCameraCallbacks), this._topicMarkupCameraCallbacks = void 0;
  }
  _armTopicMarkupAutoDeactivate(e) {
    if (!this._webViewer)
      return;
    this.clearTopicMarkupAutoDeactivate();
    const i = this._webViewer.view.getCamera(), a = {
      camera: (r) => {
        if (!this._webViewer)
          return;
        const t = this._webViewer.markupManager.getActiveMarkupView(this._webViewer.view);
        if ((t == null ? void 0 : t.getUniqueId()) !== e) {
          this.clearTopicMarkupAutoDeactivate();
          return;
        }
        r.equals(i) || (this.clearTopicMarkupAutoDeactivate(), this._webViewer.view.setCamera(r, 0));
      }
    };
    this._topicMarkupCameraCallbacks = a, this._webViewer.setCallbacks(a);
  }
}
export {
  b as default
};
