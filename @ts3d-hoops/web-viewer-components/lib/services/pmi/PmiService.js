import { Color as o } from "@ts3d-hoops/web-viewer";
import { isPmiServiceConfiguration as s } from "./types.js";
const t = class t extends EventTarget {
  constructor() {
    super(), this.serviceName = "PmiService", this._viewer = void 0, this.callbackMap = {}, this.callbackMap = {
      firstModelLoaded: () => {
        this.reset();
      },
      subtreeLoaded: () => {
        this.reset();
      },
      modelSwitched: () => {
        this.reset();
      }
    };
  }
  unbind() {
    this._viewer && this._viewer.unsetCallbacks(this.callbackMap);
  }
  bind() {
    this._viewer && this._viewer.setCallbacks(this.callbackMap);
  }
  async resetConfiguration(e) {
    const i = e ?? t.DefaultConfig;
    if (!s(i))
      throw new Error("Invalid configuration object");
    this.setPmiColor(i.color), await this.setPmiColorOverride(i.isColorOverride);
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-pmi-service-reset", { bubbles: !0, composed: !0 })
    );
  }
  get viewer() {
    return this._viewer;
  }
  set viewer(e) {
    this._viewer !== e && (this.unbind(), this._viewer = e, this.bind(), this.reset());
  }
  getPmiColor() {
    return this.viewer ? this.viewer.model.getPmiColor().toHexString() : t.DefaultConfig.color;
  }
  setPmiColor(e) {
    if (!this.viewer)
      throw new Error("Viewer is not set");
    e !== this.getPmiColor() && (this.viewer.model.setPmiColor(o.fromHexString(e)), this.dispatchEvent(
      new CustomEvent("hoops-pmi-color-changed", { detail: e, bubbles: !0, composed: !0 })
    ));
  }
  getPmiColorOverride() {
    return this.viewer ? this.viewer.model.getPmiColorOverride() : t.DefaultConfig.isColorOverride;
  }
  async setPmiColorOverride(e, i) {
    if (!this.viewer)
      throw new Error("Viewer is not set");
    await this.viewer.model.setPmiColorOverride(e, i), this.dispatchEvent(
      new CustomEvent("hoops-pmi-color-override-changed", {
        detail: { enableOverride: e, rootId: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
t.DefaultConfig = {
  color: "#000000",
  isColorOverride: !0
};
let r = t;
export {
  r as default
};
