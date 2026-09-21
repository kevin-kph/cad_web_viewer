import { Util as n, DefaultTransitionDuration as l } from "@ts3d-hoops/web-viewer";
function c(r, e, t) {
  const s = r.sheetManager.getActiveSheetId();
  if (s !== null) {
    const a = e.getNodeParent(s), o = e.getNodeChildren(a);
    n.filterInPlace(t, (h) => {
      let i = h;
      for (; i !== null; ) {
        if (i === s)
          return !0;
        if (o.indexOf(i) !== -1)
          return !1;
        i = e.getNodeParent(i);
      }
      return !0;
    });
  }
}
class _ {
  constructor(e, t) {
    this._camera = null, this._deselectOnIsolate = !0, this._deselectOnZoom = !0, this._isolateStatus = !1, this._viewer = e, this._model = t, this._viewer.setCallbacks({
      modelSwitched: () => {
        this._camera = null;
      }
    });
  }
  _setCamera(e) {
    this._camera === null && (this._camera = e);
  }
  setDeselectOnIsolate(e) {
    this._deselectOnIsolate = e;
  }
  getIsolateStatus() {
    return this._isolateStatus;
  }
  isolateNodes(e, t = null) {
    const s = this._viewer.view;
    this._setCamera(s.getCamera()), c(this._viewer, this._model, e);
    const a = s.isolateNodes(
      e,
      l,
      !this._viewer.sheetManager.isDrawingSheetActive(),
      t
    );
    return this._deselectOnIsolate && this._viewer.selectionManager.clear(), this._isolateStatus = !0, a;
  }
  fitNodes(e) {
    const t = this._viewer.view;
    this._setCamera(t.getCamera());
    const s = t.fitNodes(e);
    return this._deselectOnZoom && this._viewer.selectionManager.clear(), s;
  }
  showAll() {
    const e = this._model;
    if (this._viewer.sheetManager.isDrawingSheetActive()) {
      const t = this._viewer.sheetManager.getActiveSheetId();
      return t !== null ? this.isolateNodes([t]) : Promise.resolve();
    } else {
      const t = [];
      if (e.isDrawing()) {
        const s = this._viewer.sheetManager.get3DNodes();
        t.push(this.isolateNodes(s));
      } else t.push(e.resetNodesVisibility());
      return this._camera !== null && (this._viewer.view.setCamera(this._camera, l), this._camera = null), this._isolateStatus = !1, t.push(this._updatePinVisibility()), n.waitForAll(t);
    }
  }
  _updatePinVisibility() {
    return this._viewer.noteTextManager.setIsolateActive(this._isolateStatus), this._viewer.noteTextManager.updatePinVisibility();
  }
}
export {
  _ as IsolateZoomHelper,
  c as _filterActiveSheetNodeIds
};
