import { OperatorId as o, SelectionMask as s, Color as r } from "@ts3d-hoops/web-viewer";
import { isSelectionServiceConfiguration as l } from "./types.js";
const i = class i extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "SelectionService";
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(e) {
    this._webviewer !== e && (this._webviewer = e, this.dispatchEvent(
      new CustomEvent("hoops-selection-service-reset", { bubbles: !0, composed: !0 })
    ));
  }
  getEnableFaceLineSelection() {
    return this._webviewer ? this._webviewer.selectionManager.getHighlightFaceElementSelection() && this._webviewer.selectionManager.getHighlightLineElementSelection() : i.DefaultConfiguration.faceLineSelectionEnabled;
  }
  async setEnableFaceLineSelection(e) {
    if (!this._webviewer)
      return Promise.reject(new Error("Webviewer not set"));
    await this._webviewer.selectionManager.setHighlightFaceElementSelection(
      e
    ), await this._webviewer.selectionManager.setHighlightLineElementSelection(
      e
    ), this.dispatchEvent(
      new CustomEvent("hoops-enable-face-line-selection-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  getHonorsSceneVisibility() {
    return this._webviewer ? this._webviewer.operatorManager.getOperator(o.Select).getPickConfig().forceEffectiveSceneVisibilityMask == s.None : i.DefaultConfiguration.honorsSceneVisibility;
  }
  setHonorsSceneVisibility(e) {
    if (!this._webviewer)
      throw new Error("Webviewer not set");
    const t = e ? s.None : s.All, n = this._webviewer.operatorManager.getOperator(o.Select), a = n.getPickConfig();
    a.forceEffectiveSceneVisibilityMask = t, n.setPickConfig(a), this._webviewer.operatorManager.getOperator(
      o.AreaSelect
    ).setForceEffectiveSceneVisibilityMask(t), this._webviewer.operatorManager.getOperator(
      o.RayDrillSelect
    ).setForceEffectiveSceneVisibilityMask(
      t
    ), this.dispatchEvent(
      new CustomEvent("hoops-honors-scene-visibility-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  getBodyColor() {
    return this._webviewer ? this._webviewer.selectionManager.getNodeSelectionColor().toHexString() : i.DefaultConfiguration.bodyColor;
  }
  async setBodyColor(e) {
    if (!this._webviewer)
      throw new Error("Webviewer not set");
    await this._webviewer.selectionManager.setNodeSelectionColor(r.fromHexString(e)), await this._webviewer.selectionManager.setNodeSelectionOutlineColor(r.fromHexString(e)), this.dispatchEvent(
      new CustomEvent("hoops-body-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  getFaceAndLineColor() {
    return this._webviewer ? this._webviewer.selectionManager.getNodeElementSelectionColor().toHexString() : i.DefaultConfiguration.faceAndLineColor;
  }
  async setFaceAndLineColor(e) {
    if (!this._webviewer)
      throw new Error("Webviewer not set");
    await this._webviewer.selectionManager.setNodeElementSelectionColor(r.fromHexString(e)), await this._webviewer.selectionManager.setNodeElementSelectionOutlineColor(
      r.fromHexString(e)
    ), this.dispatchEvent(
      new CustomEvent("hoops-face-and-line-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  async resetConfiguration(e) {
    const t = e ?? i.DefaultConfiguration;
    if (!l(t))
      throw new Error("Invalid configuration object");
    if (!this._webviewer)
      throw new Error("Webviewer not set");
    this.setEnableFaceLineSelection(t.faceLineSelectionEnabled), this.setHonorsSceneVisibility(t.honorsSceneVisibility), this.setBodyColor(t.bodyColor), this.setFaceAndLineColor(t.faceAndLineColor);
  }
};
i.DefaultConfiguration = {
  faceLineSelectionEnabled: !0,
  honorsSceneVisibility: !0,
  bodyColor: "#ffff00",
  faceAndLineColor: "#ff0000"
};
let c = i;
export {
  c as default
};
