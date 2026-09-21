import { isViewServiceConfiguration as a } from "./types.js";
const e = class e extends EventTarget {
  constructor(i) {
    super(), this.serviceName = "ViewService", this._view = i;
  }
  get view() {
    return this._view;
  }
  set view(i) {
    this._view !== i && (this._view = i, this.dispatchEvent(
      new CustomEvent("hoops-view-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  isAxisTriadVisible() {
    var i;
    return ((i = this._view) == null ? void 0 : i.axisTriad.getEnabled()) ?? e.DefaultConfiguration.axisTriadVisible;
  }
  setAxisTriadVisible(i) {
    if (!this._view)
      throw new Error("ViewService: View is not initialized.");
    this._view.axisTriad.getEnabled() !== i && (i ? this._view.axisTriad.enable() : this._view.axisTriad.disable(), this.dispatchEvent(
      new CustomEvent("hoops-view-axis-triad-visibility-changed", {
        detail: { visible: i },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  isNavCubeVisible() {
    var i;
    return ((i = this._view) == null ? void 0 : i.navCube.getEnabled()) ?? e.DefaultConfiguration.navCubeVisible;
  }
  setNavCubeVisible(i) {
    if (!this._view)
      throw new Error("ViewService: View is not initialized.");
    this._view.navCube.getEnabled() !== i && (i ? this._view.navCube.enable() : this._view.navCube.disable(), this.dispatchEvent(
      new CustomEvent("hoops-view-nav-cube-visibility-changed", {
        detail: { visible: i },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  reset() {
    this.dispatchEvent(new CustomEvent("hoops-view-service-reset"));
  }
  async resetConfiguration(i) {
    const t = i ?? e.DefaultConfiguration;
    if (!a(t))
      throw new Error("Invalid configuration object");
    this.setAxisTriadVisible(t.axisTriadVisible), this.setNavCubeVisible(t.navCubeVisible);
  }
};
e.DefaultConfiguration = {
  axisTriadVisible: !0,
  navCubeVisible: !0
};
let s = e;
export {
  s as ViewService,
  s as default
};
