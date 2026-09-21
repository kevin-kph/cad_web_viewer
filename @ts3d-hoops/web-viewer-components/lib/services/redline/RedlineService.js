import { formatRedlineItem as s, formatRedlineView as n } from "./utils.js";
class p extends EventTarget {
  constructor(e) {
    super(), this.serviceName = "RedlineService", this._markupManager = e, this.redlineCreated = this.redlineCreated.bind(this), this.redlineDeleted = this.redlineDeleted.bind(this), this.viewDeleted = this.viewDeleted.bind(this), this.callbackMap = {
      redlineCreated: this.redlineCreated,
      redlineDeleted: this.redlineDeleted,
      viewDeleted: this.viewDeleted
    }, this._markupManager && this.bind();
  }
  redlineCreated(e) {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    const r = s(e), t = this._markupManager.getMarkupViewKeys().find((i) => {
      const a = this._markupManager.getMarkupView(i);
      return a && a.getMarkup().find((u) => u.uniqueId === e.uniqueId);
    });
    if (!t) {
      console.warn("Markup view not found for the created redline", r);
      return;
    }
    this._markupManager.selectMarkup(e, this._markupManager.viewer.view), this.dispatchEvent(
      new CustomEvent("hoops-redline-created", {
        detail: {
          markupViewId: t,
          markup: r
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  redlineDeleted(e) {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    const r = this._markupManager.getMarkupViewKeys().find((t) => {
      const i = this._markupManager.getMarkupView(t);
      return i && i.getMarkup().find((a) => a.uniqueId === e.uniqueId);
    });
    r && this.dispatchEvent(
      new CustomEvent("hoops-redline-deleted", {
        detail: {
          markupViewId: r,
          markup: s(e)
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  viewDeleted(e) {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    this.dispatchEvent(
      new CustomEvent("hoops-redline-view-deleted", {
        detail: {
          markupViewId: e.getUniqueId()
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  bind() {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    this._markupManager.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    this._markupManager.viewer.unsetCallbacks(this.callbackMap);
  }
  get markupManager() {
    return this._markupManager;
  }
  set markupManager(e) {
    this._markupManager !== e && (this._markupManager && this.unbind(), this._markupManager = e, this.bind(), this.dispatchEvent(
      new CustomEvent("hoops-redline-service-reset", { bubbles: !0, composed: !0 })
    ));
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-redline-service-reset", { bubbles: !0, composed: !0 })
    );
  }
  getRedlineViewKeys() {
    var e;
    return ((e = this._markupManager) == null ? void 0 : e.getMarkupViewKeys()) || [];
  }
  getRedlineViews() {
    var e;
    return ((e = this._markupManager) == null ? void 0 : e.getMarkupViewKeys().map((r) => n(this._markupManager.getMarkupView(r)))) || [];
  }
  getRedlineView(e) {
    var t;
    const r = (t = this._markupManager) == null ? void 0 : t.getMarkupView(e);
    if (r)
      return n(r);
  }
  getActiveViewKey() {
    if (!this._markupManager)
      return;
    const e = this._markupManager.getActiveMarkupView(this._markupManager.viewer.view);
    return e ? e.getUniqueId() : void 0;
  }
  async setActiveView(e) {
    if (!this.markupManager)
      throw new Error("MarkupManager is not set");
    return this.markupManager.activateMarkupViewWithPromise(e, this.markupManager.viewer.view).then((r) => (r && this.dispatchEvent(
      new CustomEvent("hoops-markup-view-activated", {
        detail: {
          markupViewId: e
        },
        bubbles: !0,
        composed: !0
      })
    ), r));
  }
  getActiveView() {
    var t;
    const e = this.getActiveViewKey();
    if (!e)
      return;
    const r = (t = this._markupManager) == null ? void 0 : t.getMarkupView(e);
    return n(r);
  }
  async removeRedlineItem(e, r) {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    const t = this._markupManager.getMarkupView(e);
    if (!t)
      throw new Error(`Redline view with ID ${e} not found`);
    const i = t.getMarkup().find((a) => a.uniqueId === r.id);
    if (!i)
      throw new Error(`Redline item with ID ${r.id} not found in view ${e}`);
    t.removeMarkup(i), t.getMarkup().length === 0 && this.removeRedlineView(e);
  }
  removeRedlineView(e) {
    if (!this._markupManager)
      throw new Error("MarkupManager is not set");
    if (!this._markupManager.getMarkupView(e))
      throw new Error(`Redline view with ID ${e} not found`);
    if (!this._markupManager.deleteMarkupView(e))
      throw new Error(`Failed to remove redline view with ID ${e}`);
  }
}
export {
  p as default
};
