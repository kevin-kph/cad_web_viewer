import { OperatorId as o } from "@ts3d-hoops/web-viewer";
import { isCameraServiceConfiguration as s } from "./types.js";
import { toServiceProjectionMode as a, toWebViewerProjectionMode as n, toServiceOrbitFallbackMode as b, toWebViewerOrbitFallbackMode as c } from "./utils.js";
const t = class t extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "CameraService";
  }
  get webViewer() {
    return this._webViewer;
  }
  set webViewer(e) {
    this._webViewer !== e && (this._webViewer = e, this.reset());
  }
  getProjectionMode() {
    return this._webViewer ? a(this._webViewer.view.getProjectionMode()) : t.DefaultConfig.projectionMode;
  }
  setProjectionMode(e) {
    if (!this._webViewer)
      throw new Error("WebViewer is not set");
    e !== this.getProjectionMode() && (this._webViewer.view.setProjectionMode(n(e)), this.dispatchEvent(
      new CustomEvent("hoops-projection-mode-changed", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOrbitFallbackMode() {
    if (!this._webViewer)
      return t.DefaultConfig.orbitFallbackMode;
    const e = this._webViewer.operatorManager.getOperator(o.Orbit);
    return b(e.getOrbitFallbackMode());
  }
  setOrbitFallbackMode(e) {
    if (!this._webViewer)
      throw new Error("WebViewer is not set");
    if (e === this.getOrbitFallbackMode())
      return;
    this._webViewer.operatorManager.getOperator(o.Orbit).setOrbitFallbackMode(c(e)), this.dispatchEvent(
      new CustomEvent("hoops-orbit-fallback-mode-changed", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  async resetConfiguration(e) {
    if (!this._webViewer)
      throw new Error("WebViewer is not set");
    const r = e ?? t.DefaultConfig;
    if (!s(r))
      throw new Error("Invalid camera configuration object");
    this.setProjectionMode(r.projectionMode), this.setOrbitFallbackMode(r.orbitFallbackMode);
  }
  async reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-camera-service-reset", { bubbles: !0, composed: !0 })
    );
  }
};
t.DefaultConfig = {
  projectionMode: "Orthographic",
  orbitFallbackMode: "Model Center"
};
let i = t;
export {
  i as default
};
