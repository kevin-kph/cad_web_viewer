import { WalkMode as o } from "@ts3d-hoops/web-viewer";
import { isWalkOperatorServiceConfiguration as i } from "./types.js";
import { walkModeToString as l, stringToWalkMode as d } from "./utils.js";
const r = class r extends EventTarget {
  constructor(e) {
    var t, a;
    super(), this.serviceName = "WalkOperatorService", this._walkModeOperator = e == null ? void 0 : e.walkModeOperator, this._mouseWalkOperator = (e == null ? void 0 : e.mouseWalkOperator) ?? ((t = e == null ? void 0 : e.walkModeOperator) == null ? void 0 : t.walkOperator), this._keyboardWalkOperator = (e == null ? void 0 : e.keyboardWalkOperator) ?? ((a = e == null ? void 0 : e.walkModeOperator) == null ? void 0 : a.keyboardWalkOperator), this.callbackMap = {
      firstModelLoaded: async () => {
        this._keyboardWalkOperator && this._keyboardWalkOperator.getWalkSpeed() <= 0 && (await this._keyboardWalkOperator.resetDefaultWalkSpeeds(), this.dispatchEvent(
          new CustomEvent("hoops-keyboard-walk-operator-reset", {
            bubbles: !0,
            composed: !0
          })
        )), this._mouseWalkOperator && this._mouseWalkOperator.getWalkSpeed() <= 0 && (await this._mouseWalkOperator.resetDefaultWalkSpeeds(), this.dispatchEvent(
          new CustomEvent("hoops-mouse-walk-operator-reset", {
            bubbles: !0,
            composed: !0
          })
        ));
      }
    }, this._walkModeOperator && this.bind();
  }
  get walkModeOperator() {
    return this._walkModeOperator;
  }
  set walkModeOperator(e) {
    this._walkModeOperator !== e && (this._walkModeOperator && this.unbind(), this._walkModeOperator = e, this.mouseWalkOperator = e == null ? void 0 : e.walkOperator, this.keyboardWalkOperator = e == null ? void 0 : e.keyboardWalkOperator, this.bind(), this.dispatchEvent(
      new CustomEvent("hoops-walk-mode-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  get mouseWalkOperator() {
    return this._mouseWalkOperator;
  }
  set mouseWalkOperator(e) {
    this._mouseWalkOperator !== e && (this._mouseWalkOperator = e, this.dispatchEvent(
      new CustomEvent("hoops-mouse-walk-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  get keyboardWalkOperator() {
    return this._keyboardWalkOperator;
  }
  set keyboardWalkOperator(e) {
    this._keyboardWalkOperator !== e && (this._keyboardWalkOperator = e, this.dispatchEvent(
      new CustomEvent("hoops-keyboard-walk-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    ));
  }
  getWalkMode() {
    var e;
    return l(((e = this._walkModeOperator) == null ? void 0 : e.getWalkMode()) ?? o.Mouse);
  }
  async setWalkMode(e) {
    if (!this._walkModeOperator)
      throw new Error("WalkModeOperator is not initialized");
    await this._walkModeOperator.setWalkMode(d(e)), this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-mode-changed", {
        detail: { mode: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getRotationSpeed() {
    return !this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator ? 0 : (this._walkModeOperator.getWalkMode() === o.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator).getRotationSpeed();
  }
  setRotationSpeed(e) {
    if (!this._walkModeOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.setRotationSpeed(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-rotation-speed-changed", {
        detail: { speed: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getWalkSpeed() {
    return !this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator ? 0 : (this._walkModeOperator.getWalkMode() === o.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator).getWalkSpeed();
  }
  setWalkSpeed(e) {
    if (!this._walkModeOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.setWalkSpeed(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-speed-changed", {
        detail: { speed: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getElevationSpeed() {
    return !this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator ? 0 : (this._walkModeOperator.getWalkMode() === o.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator).getElevationSpeed();
  }
  setElevationSpeed(e) {
    if (!this._walkModeOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.setElevationSpeed(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-elevation-speed-changed", {
        detail: { speed: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getFieldOfView() {
    return !this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator ? 0 : (this._walkModeOperator.getWalkMode() === o.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator).getViewAngle();
  }
  setFieldOfView(e) {
    if (!this._walkModeOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.setViewAngle(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-field-of-view-changed", {
        detail: { fov: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  isMouseLookEnabled() {
    var e;
    return ((e = this._keyboardWalkOperator) == null ? void 0 : e.getMouseLookEnabled()) ?? !1;
  }
  setMouseLookEnabled(e) {
    if (!this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    this._keyboardWalkOperator.setMouseLookEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-mouse-look-enabled-changed", {
        detail: { enabled: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  getMouseLookSpeed() {
    var e;
    return ((e = this._keyboardWalkOperator) == null ? void 0 : e.getMouseLookSpeed()) ?? 0;
  }
  setMouseLookSpeed(e) {
    if (!this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    this._keyboardWalkOperator.setMouseLookSpeed(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-mouse-look-speed-changed", {
        detail: { speed: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  isCollisionDetectionEnabled() {
    return !this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator ? !1 : (this._walkModeOperator.getWalkMode() === o.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator).getBimModeEnabled();
  }
  async setCollisionDetectionEnabled(e) {
    if (!this._walkModeOperator)
      throw new Error("Walk Operators are not initialized");
    await this._walkModeOperator.setBimModeEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-operators-collision-detection-changed", {
        detail: { enabled: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  reset() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    this._mouseWalkOperator.resetDefaultWalkSpeeds(), this._keyboardWalkOperator.resetDefaultWalkSpeeds(), this.dispatchEvent(
      new CustomEvent("hoops-walk-mode-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new CustomEvent("hoops-mouse-walk-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new CustomEvent("hoops-keyboard-walk-operator-reset", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  async resetConfiguration(e) {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    const t = e ?? r.DefaultConfiguration;
    if (!i(t))
      throw new Error("Invalid configuration object");
    await this._mouseWalkOperator.resetDefaultWalkSpeeds(), await this._keyboardWalkOperator.resetDefaultWalkSpeeds(), await this.setWalkMode(t.walkMode), t.rotationSpeed !== void 0 && this.setRotationSpeed(t.rotationSpeed), t.walkSpeed !== void 0 && this.setWalkSpeed(t.walkSpeed), t.elevationSpeed !== void 0 && this.setElevationSpeed(t.elevationSpeed), t.fieldOfView !== void 0 && this.setFieldOfView(t.fieldOfView), this.setMouseLookEnabled(t.mouseLookEnabled), t.mouseLookSpeed !== void 0 && this.setMouseLookSpeed(t.mouseLookSpeed), this.setCollisionDetectionEnabled(t.collisionDetectionEnabled);
  }
  bind() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator)
      throw new Error("Walk Operators are not initialized");
    this._walkModeOperator.viewer.unsetCallbacks(this.callbackMap);
  }
};
r.DefaultConfiguration = {
  walkMode: "Mouse",
  mouseLookEnabled: !0,
  collisionDetectionEnabled: !1
};
let s = r;
export {
  s as WalkOperatorService,
  s as default
};
