import { Color as o } from "@ts3d-hoops/web-viewer";
import { isSheetServiceConfiguration as s } from "./types.js";
const r = class r extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "SheetService", this._sheetManager = void 0;
  }
  get sheetManager() {
    return this._sheetManager;
  }
  set sheetManager(e) {
    this._sheetManager !== e && (this._sheetManager = e, this.dispatchEvent(
      new CustomEvent("hoops-sheet-service-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getSheetBackgroundColor() {
    return this.sheetManager ? this.sheetManager.getSheetBackgroundColor().toHexString() : r.DefaultConfiguration.backgroundColor;
  }
  getSheetColor() {
    return this.sheetManager ? this.sheetManager.getSheetColor().toHexString() : r.DefaultConfiguration.sheetColor;
  }
  getSheetShadowColor() {
    return this.sheetManager ? this.sheetManager.getSheetShadowColor().toHexString() : r.DefaultConfiguration.sheetShadowColor;
  }
  async setSheetColors(e, t, a) {
    if (!this.sheetManager)
      throw new Error("SheetManager is not set");
    await this.sheetManager.setSheetColors(
      o.fromHexString(e),
      o.fromHexString(t),
      o.fromHexString(a)
    ), this.dispatchEvent(
      new CustomEvent("hoops-sheet-colors-changed", {
        detail: {
          backgroundColor: e,
          sheetColor: t,
          sheetShadowColor: a
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getBackgroundSheetEnabled() {
    return this.sheetManager ? this.sheetManager.getBackgroundSheetEnabled() : !1;
  }
  async setBackgroundSheetEnabled(e) {
    if (!this.sheetManager)
      throw new Error("SheetManager is not set");
    await this.sheetManager.setBackgroundSheetEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-background-sheet-enabled-changed", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  async resetConfiguration(e) {
    const t = e ?? r.DefaultConfiguration;
    if (!this.sheetManager)
      throw new Error("SheetManager is not set");
    if (!s(t))
      throw new Error("Invalid configuration object");
    await this.setSheetColors(t.backgroundColor, t.sheetColor, t.sheetShadowColor), await this.setBackgroundSheetEnabled(t.backgroundSheetEnabled);
  }
};
r.DefaultConfiguration = {
  backgroundColor: "#b4b4b4",
  sheetColor: "#ffffff",
  sheetShadowColor: "#4b4b4b",
  backgroundSheetEnabled: !1
};
let n = r;
export {
  n as default
};
