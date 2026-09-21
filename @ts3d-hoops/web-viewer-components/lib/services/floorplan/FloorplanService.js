import { isFloorplanServiceConfiguration as l } from "./types.js";
import { FloorplanOrientation as r, Floorplan as t, Color as e } from "@ts3d-hoops/web-viewer";
const n = class n extends EventTarget {
  constructor(a) {
    super(), this.serviceName = "FloorplanService", this._floorplanManager = a;
  }
  get floorplanManager() {
    return this._floorplanManager;
  }
  set floorplanManager(a) {
    this._floorplanManager = a, this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  isActive() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.isActive()) ?? !1;
  }
  async setActive(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.isActive() !== a && (a ? await this._floorplanManager.activate() : await this._floorplanManager.deactivate(), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-activation-changed", {
        detail: { active: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  isTrackCameraEnabled() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().trackCameraEnabled) ?? !1;
  }
  async setTrackCameraEnabled(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.isTrackCameraEnabled() !== a && (await this._floorplanManager.setTrackCameraEnabled(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-track-camera-changed", {
        detail: { enabled: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOrientation() {
    var o;
    switch ((o = this._floorplanManager) == null ? void 0 : o.getConfiguration().floorplanOrientation) {
      case r.NorthUp:
        return "North Up";
      case r.AvatarUp:
        return "Avatar Up";
      default:
        return "North Up";
    }
  }
  async setOrientation(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    let o;
    switch (a) {
      case "North Up":
        o = r.NorthUp;
        break;
      case "Avatar Up":
        o = r.AvatarUp;
        break;
      default:
        throw new Error(`Unknown orientation: ${a}`);
    }
    await this._floorplanManager.setFloorplanOrientation(o), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-orientation-changed", {
        detail: { orientation: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getAutoActivationMode() {
    var o;
    switch ((o = this._floorplanManager) == null ? void 0 : o.getConfiguration().autoActivate) {
      case t.FloorplanAutoActivation.Bim:
        return "Bim";
      case t.FloorplanAutoActivation.BimWalk:
        return "Bim + Walk";
      case t.FloorplanAutoActivation.Never:
        return "Never";
      default:
        return "Bim";
    }
  }
  async setAutoActivationMode(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    let o;
    switch (a) {
      case "Bim":
        o = t.FloorplanAutoActivation.Bim;
        break;
      case "Bim + Walk":
        o = t.FloorplanAutoActivation.BimWalk;
        break;
      case "Never":
        o = t.FloorplanAutoActivation.Never;
        break;
      default:
        throw new Error(`Unknown auto activation mode: ${a}`);
    }
    await this._floorplanManager.setAutoActivate(o), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-auto-activation-changed", {
        detail: { mode: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getOverlayFeetPerPixel() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().overlayFeetPerPixel) ?? 0;
  }
  async setOverlayFeetPerPixel(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.getOverlayFeetPerPixel() !== a && (await this._floorplanManager.setOverlayFeetPerPixel(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-feet-per-pixel-changed", {
        detail: { feetPerPixel: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOverlayZoomLevel() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().zoomLevel) ?? 1;
  }
  async setOverlayZoomLevel(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.getOverlayZoomLevel() !== a && (await this._floorplanManager.setZoomLevel(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-zoom-level-changed", {
        detail: { zoomLevel: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOverlayBackgroundOpacity() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().backgroundOpacity) ?? 1;
  }
  async setOverlayBackgroundOpacity(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.getOverlayBackgroundOpacity() !== a && (await this._floorplanManager.setBackgroundOpacity(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-background-opacity-changed", {
        detail: { opacity: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOverlayBorderOpacity() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().borderOpacity) ?? 1;
  }
  async setOverlayBorderOpacity(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.getOverlayBorderOpacity() !== a && (await this._floorplanManager.setBorderOpacity(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-border-opacity-changed", {
        detail: { opacity: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getOverlayAvatarOpacity() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().avatarOpacity) ?? 1;
  }
  async setOverlayAvatarOpacity(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    this.getOverlayAvatarOpacity() !== a && (await this._floorplanManager.setAvatarOpacity(a), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-avatar-opacity-changed", {
        detail: { opacity: a },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getFloorplanBackgroundColor() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().backgroundColor.toHexString()) || "#ffffff";
  }
  async setFloorplanBackgroundColor(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    await this._floorplanManager.setBackgroundColor(e.fromHexString(a)), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-background-color-changed", {
        detail: { color: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getFloorplanBorderColor() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().borderColor.toHexString()) || "#ffffff";
  }
  async setFloorplanBorderColor(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    await this._floorplanManager.setBorderColor(e.fromHexString(a)), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-border-color-changed", {
        detail: { color: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getFloorplanAvatarColor() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().avatarColor.toHexString()) || "#ffffff";
  }
  async setFloorplanAvatarColor(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    await this._floorplanManager.setAvatarColor(e.fromHexString(a)), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-avatar-color-changed", {
        detail: { color: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getFloorplanAvatarOutlineColor() {
    var a;
    return ((a = this._floorplanManager) == null ? void 0 : a.getConfiguration().avatarOutlineColor.toHexString()) || "#ffffff";
  }
  async setFloorplanAvatarOutlineColor(a) {
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    await this._floorplanManager.setAvatarOutlineColor(e.fromHexString(a)), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-avatar-outline-color-changed", {
        detail: { color: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  async resetConfiguration(a) {
    const o = a ?? n.DefaultConfig;
    if (!l(o))
      throw new Error("Invalid floorplan configuration object");
    if (!this._floorplanManager)
      throw new Error("FloorplanManager is not initialized");
    await this.setActive(o.floorplanActive), await this.setTrackCameraEnabled(o.trackCamera), await this.setOrientation(o.orientation), await this.setAutoActivationMode(o.autoActivationMode), await this.setOverlayFeetPerPixel(o.overlayFeetPerPixel), await this.setOverlayZoomLevel(o.overlayZoomLevel), await this.setOverlayBackgroundOpacity(o.overlayBackgroundOpacity), await this.setOverlayBorderOpacity(o.overlayBorderOpacity), await this.setOverlayAvatarOpacity(o.overlayAvatarOpacity), await this.setFloorplanBackgroundColor(o.floorplanBackgroundColor), await this.setFloorplanBorderColor(o.floorplanBorderColor), await this.setFloorplanAvatarColor(o.floorplanAvatarColor), await this.setFloorplanAvatarOutlineColor(o.floorplanAvatarOutlineColor), this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        detail: {},
        bubbles: !0,
        composed: !0
      })
    );
  }
  async reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        detail: {},
        bubbles: !0,
        composed: !0
      })
    );
  }
};
n.DefaultConfig = {
  floorplanActive: !1,
  trackCamera: !1,
  orientation: "North Up",
  autoActivationMode: "Bim + Walk",
  overlayFeetPerPixel: 0.1,
  overlayZoomLevel: 1,
  overlayBackgroundOpacity: 0.25,
  overlayBorderOpacity: 1,
  overlayAvatarOpacity: 1,
  floorplanBackgroundColor: "#ffffff",
  floorplanBorderColor: "#000000",
  floorplanAvatarColor: "#ff00ff",
  floorplanAvatarOutlineColor: "#000000"
};
let i = n;
export {
  i as FloorplanService,
  i as default
};
