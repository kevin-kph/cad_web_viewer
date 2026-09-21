import { k as NodeType, f as Matrix } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { M as ModelTree } from "../modelTree.js";
class AssemblyBuildingExample {
  constructor() {
    this._selectedNodeId = null;
    this._moveStep = 3;
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._modelTree = new ModelTree("modelTree", this._viewer);
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      firstModelLoaded: () => {
        this._modelTree.viewNode(this._viewer.model.getAbsoluteRootNode());
      },
      selectionArray: (selections) => {
        for (const selection of selections) {
          this._onSelection(selection);
        }
      }
    });
    let element = document.getElementById("loadMicroEngine");
    element.onclick = () => {
      const model = this._viewer.model;
      const nodeId = this._selectedNodeId === null ? model.getAbsoluteRootNode() : this._selectedNodeId;
      model.loadSubtreeFromModel(nodeId, "microengine").then(() => {
        this._modelTree.viewNode(nodeId);
      });
    };
    element = document.getElementById("createEmptyNode");
    element.onclick = () => {
      const model = this._viewer.model;
      const nodeId = this._selectedNodeId === null ? model.getAbsoluteRootNode() : this._selectedNodeId;
      model.createNode(nodeId, "node");
      this._modelTree.viewNode(nodeId);
    };
    element = document.getElementById("ShiftX-");
    element.onclick = () => {
      this._translate(-this._moveStep, 0, 0);
    };
    element = document.getElementById("ShiftX+");
    element.onclick = () => {
      this._translate(this._moveStep, 0, 0);
    };
    element = document.getElementById("ShiftY-");
    element.onclick = () => {
      this._translate(0, -this._moveStep, 0);
    };
    element = document.getElementById("ShiftY+");
    element.onclick = () => {
      this._translate(0, this._moveStep, 0);
    };
    element = document.getElementById("ShiftZ-");
    element.onclick = () => {
      this._translate(0, 0, -this._moveStep);
    };
    element = document.getElementById("ShiftZ+");
    element.onclick = () => {
      this._translate(0, 0, this._moveStep);
    };
    element = document.getElementById("clearScene");
    element.onclick = () => {
      this._viewer.model.clear();
      this._selectedNodeId = null;
      this._modelTree.clearContent();
    };
  }
  _onSelection(selectionEvent) {
    const selection = selectionEvent.getSelection();
    if (selection.isNodeSelection()) {
      const model = this._viewer.model;
      const nodeId = selection.getNodeId();
      if (model.isNodeLoaded(nodeId)) {
        this._selectedNodeId = nodeId;
        if (model.getNodeType(this._selectedNodeId) === NodeType.BodyInstance) {
          const parent = model.getNodeParent(this._selectedNodeId);
          if (parent !== null) {
            this._selectedNodeId = parent;
          }
        }
      }
    }
  }
  _translate(x, y, z) {
    if (this._selectedNodeId !== null) {
      const model = this._viewer.model;
      const translationMatrix = new Matrix();
      translationMatrix.setTranslationComponent(x, y, z);
      const nodeMatrix = model.getNodeMatrix(this._selectedNodeId);
      model.setNodeMatrix(this._selectedNodeId, Matrix.multiply(nodeMatrix, translationMatrix));
    }
  }
}
window.onload = function() {
  const assemblyBuildingExample = new AssemblyBuildingExample();
  assemblyBuildingExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
