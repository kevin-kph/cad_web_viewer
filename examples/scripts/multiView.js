import { am as DrawModeNames, an as nodeDrawModeFromName, ah as WebViewer, p as Axis, b as Plane, P as Point3 } from "./WebViewer.js";
class ViewPanel {
  constructor(parentElement, viewElement, viewer, view) {
    this._drawModeIndex = DrawModeNames.indexOf("WireframeOnShaded");
    this._viewer = viewer;
    this._view = view;
    this._parentElement = parentElement;
    this._element = document.createElement("div");
    this._element.id = `view-panel-${view.id}`;
    this._element.appendChild(viewElement);
    this._parentElement.appendChild(this._element);
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove view";
    removeButton.onclick = () => {
      this._onRemoveClick();
    };
    this._element.appendChild(removeButton);
    const drawModeButton = document.createElement("button");
    drawModeButton.innerHTML = "Cycle draw mode";
    drawModeButton.onclick = () => {
      this._cycleDrawMode();
    };
    this._element.appendChild(drawModeButton);
  }
  getViewIndex() {
    return this._view.id;
  }
  _onRemoveClick() {
    if (this._view.id === 0) {
      return;
    }
    this._viewer.removeView(this._view);
    this._parentElement.removeChild(this._element);
  }
  get _drawMode() {
    return nodeDrawModeFromName(DrawModeNames[this._drawModeIndex]);
  }
  _cycleDrawMode() {
    const len = DrawModeNames.length;
    this._drawModeIndex = (this._drawModeIndex + 1) % len;
    this._view.setDrawMode(this._drawMode);
  }
}
class MultiViewExample {
  constructor() {
    this._viewCount = 1;
    const viewerContainer = document.getElementById("view-0");
    this._viewer = new WebViewer({
      container: viewerContainer,
      endpointUri: "microengine.scs",
      enginePath: WebViewer.defaultEnginePath
    });
    this._viewPanels = /* @__PURE__ */ new Map();
  }
  start() {
    this._bindEvents();
    this._viewer.start();
  }
  _bindEvents() {
    const createNewViewer = document.getElementById("createNewView");
    const toggleCuttingPlane = document.getElementById("toggleCuttingPlane");
    const hidePart = document.getElementById("hidePart");
    const showAllParts = document.getElementById("showAllParts");
    createNewViewer.onclick = () => {
      this._onCreateNewView();
    };
    toggleCuttingPlane.onclick = () => {
      this._toggleCuttingPlane();
    };
    hidePart.onclick = () => {
      this._hideSelected();
    };
    showAllParts.onclick = () => {
      this._showAll();
    };
  }
  async _onCreateNewView() {
    const panel = await this._makeViewPanel();
    if (panel === void 0) {
      return;
    }
    const viewIndex = panel.getViewIndex();
    this._viewPanels.set(viewIndex, panel);
  }
  async _toggleCuttingPlane() {
    if (this._viewer.cuttingManager.getActiveCuttingSectionCount() > 0) {
      this._viewer.cuttingManager.deactivateAllCuttingSections();
      return;
    }
    const bounding = await this._viewer.model.getModelBounding(true, true);
    const axis = Axis.X;
    const position = bounding.center();
    const referenceGeometry = this._viewer.cuttingManager.createReferenceGeometryFromAxis(
      axis,
      bounding
    );
    const plane = Plane.createFromPointAndNormal(position, new Point3(1, 0, 0));
    const cuttingSection = this._viewer.cuttingManager.getCuttingSection(0);
    cuttingSection.addPlane(plane, referenceGeometry);
    await cuttingSection.activate();
  }
  _hideSelected() {
    const selectionResults = this._viewer.selectionManager.getResults();
    const nodesSet = /* @__PURE__ */ new Set();
    for (const result of selectionResults) {
      nodesSet.add(result.getNodeId());
    }
    this._viewer.model.setNodesVisibility(Array.from(nodesSet), false);
  }
  _showAll() {
    this._viewer.model.setNodesVisibility([this._viewer.model.getAbsoluteRootNode()], true);
  }
  async _makeViewPanel() {
    const viewerList = document.getElementById("viewers");
    if (!viewerList) {
      return;
    }
    const viewElem = document.createElement("div");
    viewElem.id = `view-${this._viewCount++}`;
    viewElem.classList.add("hwv-view");
    viewerList.appendChild(viewElem);
    const view = await this._viewer.addView({
      container: viewElem
    });
    return new ViewPanel(viewerList, viewElem, this._viewer, view);
  }
}
const multiViewExample = new MultiViewExample();
window.onload = function() {
  multiViewExample.start();
};
export {
  MultiViewExample as M
};
