import { Color as s } from "@ts3d-hoops/web-viewer";
import { isMeasurementServiceConfiguration as n } from "./types.js";
const r = class r extends EventTarget {
  constructor(e) {
    super(), this.serviceName = "MeasurementService", this.callbackMap = {}, this.callbackToEvent = (t) => () => {
      this._measureManager && this.dispatchEvent(
        new CustomEvent(t, {
          bubbles: !0,
          composed: !0,
          detail: {
            measurements: this.measurements
          }
        })
      );
    }, this._measureManager = e, this.callbackMap = {
      measurementCreated: this.callbackToEvent("hoops-measurement-updated").bind(this),
      measurementDeleted: this.callbackToEvent("hoops-measurement-updated").bind(this)
    }, this._measureManager && this.bind();
  }
  unbind() {
    this._measureManager && this._measureManager.viewer.setCallbacks({});
  }
  bind() {
    if (!this._measureManager)
      throw new Error("MarkupManager is not set");
    this._measureManager.viewer.setCallbacks(this.callbackMap);
  }
  removeMeasurement(e) {
    var t;
    (t = this._measureManager) == null || t.removeMeasurement(e);
  }
  get measurements() {
    return this._measureManager ? this._measureManager.getAllMeasurements() || [] : [];
  }
  get measureManager() {
    return this._measureManager;
  }
  set measureManager(e) {
    this._measureManager !== e && (this.unbind(), this._measureManager = e, this.bind());
  }
  getMeasurementColor() {
    return this._measureManager ? this._measureManager.getMeasurementColor().toHexString() : r.DefaultConfig.color;
  }
  setMeasurementColor(e) {
    if (!this._measureManager)
      throw new Error("MeasureManager is not set");
    this._measureManager.setMeasurementColor(s.fromHexString(e)), this.dispatchEvent(
      new CustomEvent("hoops-measurement-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  async resetConfiguration(e) {
    if (!this._measureManager)
      throw new Error("MeasureManager is not set");
    const t = e ?? r.DefaultConfig;
    if (!n(t))
      throw new Error("Invalid configuration object");
    this._measureManager.removeAllMeasurements(), this.setMeasurementColor(t.color), this.dispatchEvent(
      new CustomEvent("hoops-measurement-reset", {
        bubbles: !0,
        composed: !0,
        detail: {
          measurements: this.measurements
        }
      })
    );
  }
};
r.DefaultConfig = {
  color: "#000000"
};
let a = r;
export {
  a as default
};
