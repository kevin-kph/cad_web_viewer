import { LitElement as b, html as p, css as h } from "lit";
import { property as i, customElement as m } from "lit/decorators.js";
import { WebViewer as v, RendererType as c, StreamingMode as a } from "@ts3d-hoops/web-viewer";
import { consume as E } from "@lit/context";
import "./context-manager/index.js";
import { contextManagerContext as w } from "./context-manager/context-manager.js";
var C = Object.defineProperty, g = Object.getOwnPropertyDescriptor, s = (t, e, o, d) => {
  for (var r = d > 1 ? void 0 : d ? g(e, o) : e, u = t.length - 1, l; u >= 0; u--)
    (l = t[u]) && (r = (d ? l(e, o, r) : l(r)) || r);
  return d && r && C(e, o, r), r;
};
let n = class extends b {
  /**
   * Creates a new WebViewerComponent instance.
   * Initializes the component and binds event handlers.
   * @internal
   */
  constructor() {
    super(), this.modelStructureReady = !1, this.empty = !1, this.usePointerEvents = !1, this.disableAutomaticBackgroundSheets = !1, this.disableAutomaticFloorplanOverlay = !1, this.calculateDefaultViewAxes = !1, this.disableAutomaticFitWorld = !1, this.enableShatteredModelUiViews = !1, this.hwv = null, this.handleResize = this.handleResize.bind(this);
  }
  /**
   * Handles window resize events by updating the viewer canvas dimensions.
   * @returns {void}
   * @internal
   */
  handleResize() {
    var t;
    this.modelStructureReady && ((t = this.hwv) == null || t.resizeCanvas());
  }
  /**
   * Handles viewer initialization completion.
   * Sets up context manager, dispatches ready event, and binds viewer events.
   * @returns {void}
   * @internal
   */
  handleReady() {
    if (!this.hwv)
      return;
    this.contextManager && (this.contextManager.webViewer = this.hwv);
    const t = new CustomEvent("hwvReady", {
      bubbles: !0,
      composed: !0,
      detail: this.hwv
    });
    this.dispatchEvent(t), this.bindEvents(this.hwv);
  }
  /**
   * Lifecycle callback invoked after the component's first update.
   * Creates and initializes the WebViewer instance with configured properties.
   * @param _changedProperties - Map of changed properties (unused)
   * @returns {void}
   * @internal
   */
  firstUpdated(t) {
    var e;
    super.firstUpdated(t), this.container = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".web-viewer"), this.hwv = new v({
      container: this.container,
      endpointUri: this.endpointUri,
      model: this.model,
      sessionToken: this.sessionToken,
      rendererType: this.rendererType,
      empty: this.empty,
      usePointerEvents: this.usePointerEvents,
      streamingMode: this.streamingMode,
      memoryLimit: this.memoryLimit,
      boundingPreviewMode: this.boundingPreviewMode,
      defaultMeshLevel: this.defaultMeshLevel,
      streamCutoffScale: this.streamCutoffScale,
      disableAutomaticBackgroundSheets: this.disableAutomaticBackgroundSheets,
      disableAutomaticFloorplanOverlay: this.disableAutomaticFloorplanOverlay,
      calculateDefaultViewAxes: this.calculateDefaultViewAxes,
      disableAutomaticFitWorld: this.disableAutomaticFitWorld,
      enableShatteredModelUiViews: this.enableShatteredModelUiViews,
      enginePath: this.enginePath,
      defaultMetallicFactor: this.defaultMetallicFactor,
      defaultRoughnessFactor: this.defaultRoughnessFactor
    }), this.hwv.start(), this.handleReady();
  }
  /**
   * Lifecycle callback invoked when the component is added to the DOM.
   * Sets up window resize event listeners for responsive canvas sizing.
   * @returns {void}
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this.handleResize);
  }
  /**
   * Lifecycle callback invoked when the component is removed from the DOM.
   * Cleans up event listeners and shuts down the WebViewer instance.
   * @returns {void}
   * @internal
   */
  disconnectedCallback() {
    var t;
    window.removeEventListener("resize", this.handleResize), (t = this.hwv) == null || t.shutdown(), super.disconnectedCallback();
  }
  /**
   * Gets the underlying WebViewer instance.
   * Provides access to the full HOOPS Web Viewer API for advanced operations.
   * @returns {WebViewer | null} The WebViewer instance or null if not initialized
   */
  get viewer() {
    return this.hwv;
  }
  /**
   * Renders the component template.
   * Creates the container div that will host the WebViewer canvas and slots.
   * @returns {TemplateResult} The component's HTML template
   * @internal
   */
  render() {
    return p`<div class="web-viewer"></div>`;
  }
  /**
   * Binds WebViewer events to custom events for component communication.
   * Creates event listeners that forward viewer events as custom DOM events.
   * @param hwv - The WebViewer instance to bind events from
   * @returns {void}
   * @internal
   */
  bindEvents(t) {
    t.setCallbacks({
      addCuttingSection: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvAddCuttingSection",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                cuttingSection: e
              }
            }
          )
        );
      },
      assemblyTreeReady: () => {
        this.dispatchEvent(
          new CustomEvent("hwvAssemblyTreeReady", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      bcfLoaded: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvBcfLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              id: e,
              filename: o
            }
          })
        );
      },
      bcfRemoved: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvBcfRemoved", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              id: e
            }
          })
        );
      },
      beginInteraction: () => {
        this.dispatchEvent(
          new CustomEvent("hwvBeginInteraction", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      // XXX: This should probably pass in a reference of the operator in question.
      cadViewCreated: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvCadViewCreated",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                cadViewId: e,
                cadViewName: o
              }
            }
          )
        );
      },
      camera: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvCamera", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              camera: e
            }
          })
        );
      },
      cappingIdle: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvCappingIdle",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                isIdle: e,
                cappedInstanceCount: o
              }
            }
          )
        );
      },
      configurationActivated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvConfigurationActivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              nodeId: e
            }
          })
        );
      },
      contextMenu: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvContextMenu",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                position: e,
                modifiers: o
              }
            }
          )
        );
      },
      cuttingPlaneDragStart: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDragStart", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              cuttingSection: e,
              planeIndex: o
            }
          })
        );
      },
      cuttingPlaneDrag: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDrag", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              cuttingSection: e,
              planeIndex: o
            }
          })
        );
      },
      cuttingPlaneDragEnd: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDragEnd", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              cuttingSection: e,
              planeIndex: o
            }
          })
        );
      },
      cuttingSectionsLoaded: () => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingSectionsLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      endInteraction: () => {
        this.dispatchEvent(
          new CustomEvent("hwvEndInteraction", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      // XXX: This should probably pass in a reference of the operator in question.
      explode: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvExplode", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              magnitude: e
            }
          })
        );
      },
      firstModelLoaded: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvFirstModelLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              modelRootIds: e,
              isHwf: o
            }
          })
        );
      },
      frameDrawn: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvFrameDrawn",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                camera: e,
                visiblePoints: o
              }
            }
          )
        );
      },
      handleEventStart: (e, o, d) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEventStart", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              eventType: e,
              nodeIds: o,
              initialMatrices: d
            }
          })
        );
      },
      handleEvent: (e, o, d, r) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEvent", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              eventType: e,
              nodeIds: o,
              initialMatrices: d,
              newMatrices: r
            }
          })
        );
      },
      handleEventEnd: (e, o, d, r) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEventEnd", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              eventType: e,
              nodeIds: o,
              initialMatrices: d,
              newMatrices: r
            }
          })
        );
      },
      hwfParseComplete: () => {
        this.dispatchEvent(
          new CustomEvent("hwvHwfParseComplete", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      incrementalSelectionBatchBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionBatchBegin", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      incrementalSelectionBatchEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionBatchEnd", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      incrementalSelectionEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionEnd", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      info: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvInfo", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              infoType: e,
              message: o
            }
          })
        );
      },
      lineCreated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineCreated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              line: e
            }
          })
        );
      },
      lineDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineDeleted", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              line: e
            }
          })
        );
      },
      lineLoaded: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              line: e
            }
          })
        );
      },
      measurementBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementBegin", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      measurementCreated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementCreated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      measurementDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementDeleted", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      measurementHidden: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementHidden", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      measurementLoaded: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      measurementShown: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementShown", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      measurementValueSet: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementValueSet", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              measurement: e
            }
          })
        );
      },
      missingModel: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvMissingModel", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              modelPath: e
            }
          })
        );
      },
      modelLoadBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvModelLoadBegin", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      modelLoadFailure: (e, o, d) => {
        this.dispatchEvent(
          new CustomEvent("hwvModelLoadFailure", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              modelName: e,
              reason: o,
              error: d
            }
          })
        );
      },
      modelStructureHeaderParsed: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvModelStructureHeaderParsed",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                filename: e,
                fileType: o
              }
            }
          )
        );
      },
      modelStructureReady: () => {
        this.modelStructureReady = !0, this.dispatchEvent(
          new CustomEvent("hwvModelStructureReady", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      modelSwitched: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvModelSwitched",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                clearOnly: e,
                modelRootIds: o
              }
            }
          )
        );
      },
      modelSwitchStart: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvModelSwitchStart", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              clearOnly: e
            }
          })
        );
      },
      noteTextCreated: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextCreated",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                noteText: e
              }
            }
          )
        );
      },
      noteTextDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextDeleted",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                noteText: e
              }
            }
          )
        );
      },
      noteTextUpdated: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextUpdated",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                noteText: e
              }
            }
          )
        );
      },
      noteTextHidden: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextHidden",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                noteText: e
              }
            }
          )
        );
      },
      noteTextShown: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextShown",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                noteText: e
              }
            }
          )
        );
      },
      overlayViewportSet: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvOverlayViewportSet", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              overlayIndex: e
            }
          })
        );
      },
      redlineCreated: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineCreated",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                redlineMarkup: e
              }
            }
          )
        );
      },
      redlineDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineDeleted",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                redlineMarkup: e
              }
            }
          )
        );
      },
      redlineUpdated: (e) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineUpdated",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                redlineMarkup: e
              }
            }
          )
        );
      },
      removeCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hwvRemoveCuttingSection", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      sceneReady: () => {
        this.dispatchEvent(
          new CustomEvent("hwvSceneReady", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      selectionArray: (e, o) => {
        this.dispatchEvent(
          new CustomEvent("hwvSelectionArray", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              selectionEvents: e,
              removed: o
            }
          })
        );
      },
      sheetActivated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvSheetActivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              nodeId: e
            }
          })
        );
      },
      sheetDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvSheetDeactivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      streamingActivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvStreamingActivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      streamingDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvStreamingDeactivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      subtreeDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvSubtreeDeleted", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              modelRootIds: e
            }
          })
        );
      },
      subtreeLoaded: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvSubtreeLoaded",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                modelRootIds: e,
                source: o
              }
            }
          )
        );
      },
      timeout: () => {
        this.dispatchEvent(
          new CustomEvent("hwvTimeout", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      timeoutWarning: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvTimeoutWarning", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              minutesRemaining: e
            }
          })
        );
      },
      transitionBegin: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvTransitionBegin", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              duration: e
            }
          })
        );
      },
      transitionEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvTransitionEnd", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      viewAxes: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvViewAxes",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                frontVector: e,
                upVector: o
              }
            }
          )
        );
      },
      viewCreated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewCreated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              view: e
            }
          })
        );
      },
      viewDeactivated: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewDeactivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              view: e
            }
          })
        );
      },
      viewDeleted: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewDeleted", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              view: e
            }
          })
        );
      },
      viewLoaded: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewLoaded", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              view: e
            }
          })
        );
      },
      viewOrientation: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewOrientation", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              orientation: e
            }
          })
        );
      },
      visibilityChanged: (e, o) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvVisibilityChanged",
            {
              bubbles: !0,
              composed: !0,
              detail: {
                hwv: t,
                shownBodyIds: e,
                hiddenBodyIds: o
              }
            }
          )
        );
      },
      walkOperatorActivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWalkOperatorActivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      walkOperatorDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWalkOperatorDeactivated", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      webGlContextLost: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWebGlContextLost", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      websocketConnectionClosed: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWebsocketConnectionClosed", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t
            }
          })
        );
      },
      XHRonerror: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonerror", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              errorEvent: e
            }
          })
        );
      },
      XHRonloadend: (e, o, d) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonloadend", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              progressEvent: e,
              status: o,
              uri: d
            }
          })
        );
      },
      XHRonprogress: (e) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonprogress", {
            bubbles: !0,
            composed: !0,
            detail: {
              hwv: t,
              progressEvent: e
            }
          })
        );
      }
    });
  }
};
n.styles = [
  h`
      :host {
        display: block;
      }
      .web-viewer {
        position: relative;
        min-width: 300px;
        min-height: 300px;
        height: 100%;
      }

      .webviewer-canvas:focus {
        outline: none;
      }

      .noteTextElement {
        position: absolute;
        width: 250px;
        height: 160px;
        z-index: 2;
        background: rgba(180, 180, 180, 0.8);
        border-radius: 5px;
        border: 1px solid black;
        pointer-events: auto;
      }

      .noteTextElement:after,
      .noteTextElement:before {
        border: solid rgba(224, 24, 24, 0);
        content: ' ';
        height: 0;
        left: -20px;
        position: absolute;
        width: 0;
      }

      .noteTextElement:after {
        border-width: 11px;
        border-right-color: rgba(190, 190, 190, 1);
        top: 13px;
        left: -21px;
      }

      .noteTextElement:before {
        border-width: 12px;
        border-right-color: #000;
        top: 12px;
        left: -24px;
      }

      .noteTextElement textArea {
        margin: 5px;
        width: 200px;
        height: 142px;
        z-index: 2;
        resize: none;
      }

      .noteTextElement .noteButton {
        position: absolute;
        left: 220px;
        width: 20px;
        height: 20px;
        border: 1px solid black;
      }

      .noteTextElement .noteButton.color.blue {
        background-color: blue;
      }

      .noteTextElement .noteButton.color.red {
        background-color: red;
      }

      .noteTextElement .noteButton.color.green {
        background-color: rgba(0, 255, 0, 1);
      }

      .noteTextElement .noteButton.color.white {
        background-color: white;
      }

      .noteTextElement .noteButton.color.black {
        background-color: black;
      }

      .noteTextElement .noteButton.trash {
        background: url(images/ui-icons_444444_256x240.png) no-repeat top left;
        display: block;
        background-position: -176px -96px;
      }
    `
];
s([
  E({ context: w })
], n.prototype, "contextManager", 2);
s([
  i({
    type: String
  })
], n.prototype, "endpointUri", 2);
s([
  i({
    type: String
  })
], n.prototype, "model", 2);
s([
  i({
    type: String
  })
], n.prototype, "sessionToken", 2);
s([
  i({
    type: String,
    converter: (t) => (t == null ? void 0 : t.toLowerCase()) === "server" ? c.Server : c.Client
  })
], n.prototype, "rendererType", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "empty", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "usePointerEvents", 2);
s([
  i({
    type: String,
    converter: (t) => {
      switch (t == null ? void 0 : t.toLowerCase()) {
        case "all":
          return a.All;
        case "ondemand":
          return a.OnDemand;
        case "interactive":
          return a.Interactive;
        default:
          return a.Default;
      }
    }
  })
], n.prototype, "streamingMode", 2);
s([
  i({
    type: Number
  })
], n.prototype, "memoryLimit", 2);
s([
  i({
    type: String,
    converter: (t) => {
      switch (t == null ? void 0 : t.toLowerCase()) {
        case "all":
          return a.All;
        case "ondemand":
          return a.OnDemand;
        case "interactive":
          return a.Interactive;
        default:
          return a.Default;
      }
    }
  })
], n.prototype, "boundingPreviewMode", 2);
s([
  i({
    type: Number
  })
], n.prototype, "defaultMeshLevel", 2);
s([
  i({
    type: Number
  })
], n.prototype, "streamCutoffScale", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "disableAutomaticBackgroundSheets", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "disableAutomaticFloorplanOverlay", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "calculateDefaultViewAxes", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "disableAutomaticFitWorld", 2);
s([
  i({
    type: Boolean
  })
], n.prototype, "enableShatteredModelUiViews", 2);
s([
  i({
    type: String
  })
], n.prototype, "enginePath", 2);
s([
  i({
    type: Number
  })
], n.prototype, "defaultMetallicFactor", 2);
s([
  i({
    type: Number
  })
], n.prototype, "defaultRoughnessFactor", 2);
n = s([
  m("hoops-web-viewer")
], n);
const T = n;
export {
  n as WebViewerComponent,
  T as default
};
