import { createContext as v, provide as b } from "@lit/context";
import { LitElement as V, html as g } from "lit";
import { customElement as m } from "lit/decorators.js";
import { OperatorId as t } from "@ts3d-hoops/web-viewer";
import { CameraOperatorPosition as M, ActiveToolOperatorPosition as n, redlineModes as l } from "./types.js";
import "../hoops-service-registry/index.js";
import "../services/index.js";
import { getService as r } from "../services/serviceRegistry.js";
var S = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, p = (e, o, w, i) => {
  for (var a = i > 1 ? void 0 : i ? _(o, w) : o, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (a = (i ? h(o, w, a) : h(a)) || a);
  return i && a && S(o, w, a), a;
};
const d = v(
  Symbol("hoops-context-manager-context")
), u = v(Symbol("hoops-web-viewer-context")), f = v(
  Symbol("hoops-web-viewer-state-context")
);
let s = class extends V {
  constructor() {
    super(...arguments), this.webviewerState = {
      drawMode: "Wireframe",
      topCameraOperator: t.Navigate,
      toolOperator: t.None
    }, this.contextManager = this;
  }
  /**
   * Gets the current WebViewer instance.
   *
   * @returns {WebViewer | undefined} The current WebViewer instance or undefined if not set
   */
  get webViewer() {
    return this._webViewer;
  }
  /**
   * Sets the WebViewer instance and initializes all associated services.
   * When set, automatically configures service dependencies and refreshes operator states.
   *
   * @param value - The WebViewer instance to set
   * @returns {void}
   */
  set webViewer(e) {
    var i;
    if (this._webViewer = e, !this._webViewer)
      return;
    const o = this._webViewer.view.getDrawModeName();
    this.dispatchDrawMode(o), this.refreshCameraOperator(), this.refreshToolOperator(), r("MeasurementService").measureManager = this._webViewer.measureManager, r("BcfService").webViewer = this._webViewer, r("RedlineService").markupManager = (i = this._webViewer) == null ? void 0 : i.markupManager, r("NoteTextService").noteTextManager = this._webViewer.noteTextManager, r("RenderOptionsService").webViewer = this._webViewer, r("IFCRelationshipsService").selectionManager = this._webViewer.selectionManager, r("ViewService").view = this._webViewer.view, r("FloorplanService").floorplanManager = this._webViewer.view.floorplanManager, r("PmiService").viewer = this._webViewer, r("SelectionService").webViewer = this._webViewer, r("CuttingService").cuttingManager = this._webViewer.cuttingManager, r("CameraService").webViewer = this._webViewer, r("SheetService").sheetManager = this._webViewer.sheetManager;
    const w = r("WalkOperatorService");
    w.walkModeOperator = this._webViewer.view.operatorManager.getOperator(
      t.WalkMode
    ), r("ExplodeService").webViewer = this._webViewer, r("SpaceMouseService").spaceMouseOperator = this._webViewer.view.operatorManager.getOperator(
      t.SpaceMouse
    ), r("MaterialService").viewer = this._webViewer, r("LogService").webViewer = this._webViewer;
  }
  /**
   * Updates the web viewer state with the specified draw mode.
   * Dispatches state change to all consuming components via context.
   *
   * @internal
   * @param drawMode - The new draw mode to set in the state
   * @returns {void}
   */
  dispatchDrawMode(e) {
    this.webviewerState = {
      ...this.webviewerState,
      drawMode: e
    };
  }
  /**
   * Sets the draw mode for the web viewer and updates the context state.
   * Changes how 3D models are rendered (wireframe, shaded, etc.).
   *
   * @param drawMode - The draw mode to apply to the web viewer
   * @returns {void}
   */
  setDrawMode(e) {
    this._webViewer && (this._webViewer.view.setDrawMode(e), this.dispatchDrawMode(e));
  }
  /**
   * Resets the web viewer and all associated services to their initial state.
   * Clears all active operations, handles, and resets service states.
   *
   * @returns {Promise<void>} Promise that resolves when reset is complete
   */
  async reset() {
    if (this.webViewer) {
      if (await this.webViewer.reset(), !this.webViewer.sheetManager.isDrawingSheetActive()) {
        this.webViewer.noteTextManager.setIsolateActive(!1), await this.webViewer.noteTextManager.updatePinVisibility();
        const e = this.webViewer.view.operatorManager.getOperator(t.Handle);
        e !== null && e.removeHandles && await e.removeHandles();
      }
      r("RedlineService").reset(), r("NoteTextService").reset(), r("ViewService").reset(), r("FloorplanService").reset(), r("CameraService").reset(), r("WalkOperatorService").reset(), r("ExplodeService").reset();
    }
  }
  /**
   * Updates the web viewer state with the specified camera operator.
   * Dispatches camera operator change to all consuming components via context.
   *
   * @internal
   * @param cameraOp - The camera operator ID to set in the state
   * @returns {void}
   */
  dispatchCameraOperator(e) {
    this.webviewerState = {
      ...this.webviewerState,
      topCameraOperator: e
    };
  }
  /**
   * Updates the web viewer state with the specified tool operator.
   * Dispatches tool operator change to all consuming components via context.
   *
   * @internal
   * @param redlineOperator - The tool operator ID to set in the state
   * @returns {void}
   */
  dispatchToolOperator(e) {
    this.webviewerState = {
      ...this.webviewerState,
      toolOperator: e
    };
  }
  /**
   * Refreshes the camera operator state from the web viewer and updates the context.
   * Synchronizes the context state with the current camera operator.
   *
   * @returns {void}
   */
  refreshCameraOperator() {
    if (this._webViewer) {
      const e = this._webViewer.view.operatorManager.get(M);
      this.dispatchCameraOperator(e);
    }
  }
  /**
   * Refreshes the tool operator state from the web viewer and updates the context.
   * Synchronizes the context state with the current active tool operator.
   *
   * @returns {void}
   */
  refreshToolOperator() {
    if (this._webViewer) {
      const e = this._webViewer.view.operatorManager.get(n);
      this.dispatchToolOperator(e);
    }
  }
  /**
   * Sets the active redline operator for drawing markup annotations.
   * Validates the operator ID against supported redline modes before setting.
   *
   * @param redlineOperatorId - The redline operator ID to activate
   * @returns {void}
   */
  setRedlineOperator(e) {
    if (!l.includes(e)) {
      console.error("Invalid redline operator ID:", e);
      return;
    }
    this.activeToolOperator = e;
  }
  /**
   * Checks if a redline operator is currently active.
   * Returns true if any redline drawing mode is currently enabled.
   *
   * @returns {boolean} True if a redline operator is active, false otherwise
   */
  isRedlineOperatorActive() {
    return this._webViewer ? l.includes(
      this._webViewer.view.operatorManager.get(
        n
      )
    ) : !1;
  }
  /**
   * Gets the currently active tool operator.
   * Returns the operator ID if a tool is active, undefined otherwise.
   *
   * @returns {OperatorId | undefined} The active tool operator ID or undefined if none is active
   */
  get activeToolOperator() {
    if (!this._webViewer)
      return;
    const e = this._webViewer.view.operatorManager.get(n);
    if (!(e === t.Invalid || e === t.None))
      return e;
  }
  /**
   * Sets the active tool operator and updates the context state.
   * Activates the specified operator in the web viewer's operator manager and
   * synchronizes the context state to notify all consuming components.
   *
   * @param value - The operator ID to set as active, or undefined to clear
   * @returns {void}
   */
  set activeToolOperator(e) {
    if (!this._webViewer) {
      console.error("Cannot set operator: WebViewer not initialized");
      return;
    }
    this._webViewer.view.operatorManager.set(e ?? t.None, n), this.refreshToolOperator();
  }
  /**
   * Returns the element itself as the render root instead of creating a shadow DOM.
   * This ensures the context provider doesn't interfere with application styling.
   *
   * @internal
   * @returns {Element} The element itself
   */
  createRenderRoot() {
    return this;
  }
  /** @internal */
  render() {
    return g``;
  }
};
p([
  b({ context: f })
], s.prototype, "webviewerState", 2);
p([
  b({ context: d })
], s.prototype, "contextManager", 2);
p([
  b({ context: u })
], s.prototype, "_webViewer", 2);
s = p([
  m("hoops-web-viewer-context-manager")
], s);
export {
  s as WebViewerContextManager,
  d as contextManagerContext,
  s as default,
  u as webViewerContext,
  f as webViewerStateContext
};
