import e from "react";
import { createComponent as t } from "@lit/react";
import { RendererType as s, StreamingMode as o } from "@ts3d-hoops/web-viewer";
import { WebViewerComponent as d, WebViewerContextManager as v, HoopsServiceRegistryElement as p, HoopsModelTreeButtonElement as w, HoopsLayersButtonElement as m, HoopsSheetsButtonElement as g, HoopsViewsButtonElement as C, HoopsTypesButtonElement as u, HoopsPropertiesButtonElement as H, HoopsCadConfigurationButtonElement as S, HoopsSettingsButtonElement as b, HoopsHomeButtonElement as E, HoopsSnapshotButtonElement as y, HoopsDrawmodeButtonElement as B, HoopsRedlinesButtonElement as N, HoopsCameraOperatorButtonElement as T, HoopsCameraButtonElement as f, HoopsExplodeButtonElement as M, HoopsToolsButtonElement as L, HoopsToolsPanelElement as R, HoopsSettingsPanelElement as V, HoopsModelTreeElement as D, HoopsIFCRelationshipElement as P, HoopsLayerTreeElement as x, HoopsViewTreeElement as k, HoopsSheetListElement as I, HoopsTypesTreeElement as A, HoopsCadConfigurationListElement as W, InfoButton as O, HoopsContextMenuElement as F, HoopsCuttingPlaneEditorElement as X, HoopsCuttingPlaneToolbarElement as G, HoopsCuttingPlaneElement as U, HoopsCuttingPlanePanelElement as $, HoopsCuttingSectionElement as j, HoopsCuttingSectionToolbarElement as q, HoopsBcfPanelElement as z } from "@ts3d-hoops/web-viewer-components";
const J = t({
  tagName: "hoops-web-viewer",
  elementClass: d,
  react: e,
  events: {
    hwvReady: "hwvReady",
    hwvAddCuttingSection: "hwvAddCuttingSection",
    hwvAssemblyTreeReady: "hwvAssemblyTreeReady",
    hwvBcfLoaded: "hwvBcfLoaded",
    hwvBcfRemoved: "hwvBcfRemoved",
    hwvBeginInteraction: "hwvBeginInteraction",
    hwvCamera: "hwvCamera",
    hwvConfigurationActivated: "hwvConfigurationActivated",
    hwvCuttingSectionsLoaded: "hwvCuttingSectionsLoaded",
    hwvEndInteraction: "hwvEndInteraction",
    hwvExplode: "hwvExplode",
    hwvHwfParseComplete: "hwvHwfParseComplete",
    hwvIncrementalSelectionBatchBegin: "hwvIncrementalSelectionBatchBegin",
    hwvIncrementalSelectionBatchEnd: "hwvIncrementalSelectionBatchEnd",
    hwvIncrementalSelectionEnd: "hwvIncrementalSelectionEnd",
    hwvInfo: "hwvInfo",
    hwvLineCreated: "hwvLineCreated",
    hwvLineDeleted: "hwvLineDeleted",
    hwvLineLoaded: "hwvLineLoaded",
    hwvMeasurementBegin: "hwvMeasurementBegin",
    hwvMissingModel: "hwvMissingModel",
    hwvModelLoadBegin: "hwvModelLoadBegin",
    hwvModelStructureReady: "hwvModelStructureReady",
    hwvModelSwitchStart: "hwvModelSwitchStart",
    hwvOverlayViewportSet: "hwvOverlayViewportSet",
    hwvRemoveCuttingSection: "hwvRemoveCuttingSection",
    hwvSceneReady: "hwvSceneReady",
    hwvSheetActivated: "hwvSheetActivated",
    hwvSheetDeactivated: "hwvSheetDeactivated",
    hwvStreamingActivated: "hwvStreamingActivated",
    hwvStreamingDeactivated: "hwvStreamingDeactivated",
    hwvSubtreeDeleted: "hwvSubtreeDeleted",
    hwvTimeout: "hwvTimeout",
    hwvTimeoutWarning: "hwvTimeoutWarning",
    hwvTransitionBegin: "hwvTransitionBegin",
    hwvTransitionEnd: "hwvTransitionEnd",
    hwvViewCreated: "hwvViewCreated",
    hwvViewDeactivated: "hwvViewDeactivated",
    hwvViewDeleted: "hwvViewDeleted",
    hwvViewLoaded: "hwvViewLoaded",
    hwvViewOrientation: "hwvViewOrientation",
    hwvWalkOperatorActivated: "hwvWalkOperatorActivated",
    hwvWalkOperatorDeactivated: "hwvWalkOperatorDeactivated",
    hwvWebGlContextLost: "hwvWebGlContextLost",
    hwvWebsocketConnectionClosed: "hwvWebsocketConnectionClosed",
    hwvXHRonerror: "hwvXHRonerror",
    hwvXHRonprogress: "hwvXHRonprogress",
    hwvCadViewCreated: "hwvCadViewCreated",
    hwvCappingIdle: "hwvCappingIdle",
    hwvContextMenu: "hwvContextMenu",
    hwvCuttingPlaneDragStart: "hwvCuttingPlaneDragStart",
    hwvCuttingPlaneDrag: "hwvCuttingPlaneDrag",
    hwvCuttingPlaneDragEnd: "hwvCuttingPlaneDragEnd",
    hwvFirstModelLoaded: "hwvFirstModelLoaded",
    hwvFrameDrawn: "hwvFrameDrawn",
    hwvHandleEventStart: "hwvHandleEventStart",
    hwvHandleEvent: "hwvHandleEvent",
    hwvHandleEventEnd: "hwvHandleEventEnd",
    hwvMeasurementCreated: "hwvMeasurementCreated",
    hwvMeasurementDeleted: "hwvMeasurementDeleted",
    hwvMeasurementHidden: "hwvMeasurementHidden",
    hwvMeasurementLoaded: "hwvMeasurementLoaded",
    hwvMeasurementShown: "hwvMeasurementShown",
    hwvMeasurementValueSet: "hwvMeasurementValueSet",
    hwvModelLoadFailure: "hwvModelLoadFailure",
    hwvModelStructureHeaderParsed: "hwvModelStructureHeaderParsed",
    hwvModelSwitched: "hwvModelSwitched",
    hwvNoteTextCreated: "hwvNoteTextCreated",
    hwvNoteTextHidden: "hwvNoteTextHidden",
    hwvNoteTextShown: "hwvNoteTextShown",
    hwvRedlineCreated: "hwvRedlineCreated",
    hwvRedlineDeleted: "hwvRedlineDeleted",
    hwvRedlineUpdated: "hwvRedlineUpdated",
    hwvSelectionArray: "hwvSelectionArray",
    hwvSubtreeLoaded: "hwvSubtreeLoaded",
    hwvViewAxes: "hwvViewAxes",
    hwvVisibilityChanged: "hwvVisibilityChanged",
    hwvXHRonloadend: "hwvXHRonloadend"
  }
}), K = e.forwardRef((r, l) => {
  const { rendererType: n, streamingMode: a, ...i } = r, h = typeof n == "string" ? n.toLowerCase() === "server" ? s.Server : s.Client : n, c = typeof a == "string" ? (() => {
    switch (a.toLowerCase()) {
      case "all":
        return o.All;
      case "ondemand":
        return o.OnDemand;
      case "interactive":
        return o.Interactive;
      case "default":
        return o.Default;
      default:
        return o.Default;
    }
  })() : a;
  return e.createElement(J, {
    ref: l,
    rendererType: h,
    streamingMode: c,
    ...i
  });
});
K.displayName = "WebViewerComponent";
const ee = t({
  tagName: "hoops-web-viewer-context-manager",
  elementClass: v,
  react: e
}), te = t({
  tagName: "hoops-service-registry",
  elementClass: p,
  react: e
}), oe = t({
  tagName: "hoops-toolbar-model-tree",
  elementClass: w,
  react: e
}), ne = t({
  tagName: "hoops-toolbar-layers",
  elementClass: m,
  react: e
}), ae = t({
  tagName: "hoops-toolbar-sheets",
  elementClass: g,
  react: e
}), se = t({
  tagName: "hoops-toolbar-views",
  elementClass: C,
  react: e
}), re = t({
  tagName: "hoops-toolbar-types",
  elementClass: u,
  react: e
}), le = t({
  tagName: "hoops-toolbar-properties",
  elementClass: H,
  react: e
}), ie = t({
  tagName: "hoops-toolbar-cad-configuration",
  elementClass: S,
  react: e
}), he = t({
  tagName: "hoops-toolbar-settings",
  elementClass: b,
  react: e
}), ce = t({
  tagName: "hoops-toolbar-home",
  elementClass: E,
  react: e
}), de = t({
  tagName: "hoops-toolbar-snapshot",
  elementClass: y,
  react: e
}), ve = t({
  tagName: "hoops-toolbar-drawmode",
  elementClass: B,
  react: e
}), pe = t({
  tagName: "hoops-toolbar-redlines",
  elementClass: N,
  react: e
}), we = t({
  tagName: "hoops-toolbar-camera-operator",
  elementClass: T,
  react: e
}), me = t({
  tagName: "hoops-toolbar-camera",
  elementClass: f,
  react: e
}), ge = t({
  tagName: "hoops-toolbar-explode",
  elementClass: M,
  react: e
}), Ce = t({
  tagName: "hoops-toolbar-tools",
  elementClass: L,
  react: e
}), ue = t({
  tagName: "hoops-tools-panel",
  elementClass: R,
  react: e
}), He = t({
  tagName: "hoops-settings-panel",
  elementClass: V,
  react: e
}), Se = t({
  tagName: "hoops-model-tree",
  elementClass: D,
  react: e,
  events: {
    modelTreeNodeVisibilityChange: "hoops-model-tree-node-visibility-change",
    modelTreeNodeClick: "hoops-model-tree-node-click"
  }
}), be = t({
  tagName: "hoops-ifc-relationship",
  elementClass: P,
  react: e
}), Ee = t({
  tagName: "hoops-layer-tree",
  elementClass: x,
  react: e,
  events: {
    layerClick: "hoops-layer-tree-element-click",
    layerTreeNodeClick: "hoops-layer-tree-node-selected",
    layerTreeVisibilityChanged: "hoops-layer-tree-visibility-changed"
  }
}), ye = t({
  tagName: "hoops-view-tree",
  elementClass: k,
  react: e,
  events: {
    viewTreeNodeClick: "hoops-view-tree-node-click"
  }
}), Be = t({
  tagName: "hoops-sheet-list",
  elementClass: I,
  react: e,
  events: {
    sheetListNodeClick: "hoops-sheet-list-node-click"
  }
}), Ne = t({
  tagName: "hoops-types-tree",
  elementClass: A,
  react: e,
  events: {
    typesTreeNodeClick: "hoops-types-tree-node-click",
    typesTreeTypeNodeClick: "hoops-types-tree-type-node-click",
    typesTreeNodeVisibilityChange: "hoops-types-tree-node-visibility-change"
  }
}), Te = t({
  tagName: "hoops-cad-configuration-list",
  elementClass: W,
  react: e,
  events: {
    cadConfigurationListClick: "hoops-cad-configuration-list-click"
  }
}), fe = t({
  tagName: "hoops-info-button",
  elementClass: O,
  react: e
}), Me = t({
  tagName: "hoops-context-menu",
  elementClass: F,
  react: e,
  events: {
    contextMenuItemClicked: "context-menu-item-clicked"
  }
}), Le = t({
  tagName: "hoops-cutting-plane-editor",
  elementClass: X,
  react: e,
  events: {
    onChange: "change"
  }
}), Re = t({
  tagName: "hoops-cutting-plane-toolbar",
  elementClass: G,
  react: e,
  events: {
    onChange: "change"
  }
}), Ve = t({
  tagName: "hoops-cutting-plane",
  elementClass: U,
  react: e,
  events: {
    onChange: "change"
  }
}), De = t({
  tagName: "hoops-cutting-plane-panel",
  elementClass: $,
  react: e,
  events: {
    onChange: "change"
  }
}), Pe = t({
  tagName: "hoops-cutting-section",
  elementClass: j,
  react: e,
  events: {
    onChange: "change"
  }
}), xe = t({
  tagName: "hoops-cutting-section-toolbar",
  elementClass: q,
  react: e,
  events: {
    onChange: "change"
  }
}), ke = t({
  tagName: "hoops-bcf-panel",
  elementClass: z,
  react: e,
  events: {
    bcfCreated: "hoops-bcf-panel-bcf-created",
    bcfImported: "hoops-bcf-panel-bcf-imported",
    topicCreated: "hoops-bcf-panel-topic-created",
    topicRemoved: "hoops-bcf-panel-topic-removed",
    topicClicked: "hoops-bcf-panel-topic-clicked",
    commentCreated: "hoops-bcf-panel-comment-created",
    commentRemoved: "hoops-bcf-panel-comment-removed"
  }
});
export {
  ke as HoopsBcfPanel,
  ie as HoopsCadConfigurationButton,
  Te as HoopsCadConfigurationList,
  me as HoopsCameraButton,
  we as HoopsCameraOperatorButton,
  Me as HoopsContextMenu,
  Ve as HoopsCuttingPlane,
  Le as HoopsCuttingPlaneEditor,
  De as HoopsCuttingPlanePanel,
  Re as HoopsCuttingPlaneToolbar,
  Pe as HoopsCuttingSection,
  xe as HoopsCuttingSectionToolbar,
  ve as HoopsDrawmodeButton,
  ge as HoopsExplodeButton,
  ce as HoopsHomeButton,
  be as HoopsIFCRelationship,
  fe as HoopsInfoButton,
  Ee as HoopsLayerTree,
  ne as HoopsLayersButton,
  Se as HoopsModelTree,
  oe as HoopsModelTreeButton,
  le as HoopsPropertiesButton,
  pe as HoopsRedlinesButton,
  te as HoopsServiceRegistry,
  he as HoopsSettingsButton,
  He as HoopsSettingsPanel,
  Be as HoopsSheetList,
  ae as HoopsSheetsButton,
  de as HoopsSnapshotButton,
  Ce as HoopsToolsButton,
  ue as HoopsToolsPanel,
  re as HoopsTypesButton,
  Ne as HoopsTypesTree,
  ye as HoopsViewTree,
  se as HoopsViewsButton,
  ee as HoopsWebviewerContextManager,
  K as WebViewerComponent
};
