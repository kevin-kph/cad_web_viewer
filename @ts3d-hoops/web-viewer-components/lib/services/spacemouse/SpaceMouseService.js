class t extends EventTarget {
  constructor() {
    super(...arguments), this.serviceName = "SpaceMouseService";
  }
  get spaceMouseOperator() {
    return this._spaceMouseOperator;
  }
  set spaceMouseOperator(e) {
    this._spaceMouseOperator !== e && (this._spaceMouseOperator = e);
  }
  connect() {
    if (!this._spaceMouseOperator)
      throw new Error("SpaceMouseOperator is not initialized");
    this._spaceMouseOperator.connect(), this.dispatchEvent(
      new CustomEvent("hoops-spacemouse-connected", {
        bubbles: !0,
        composed: !0
      })
    );
  }
}
export {
  t as default
};
