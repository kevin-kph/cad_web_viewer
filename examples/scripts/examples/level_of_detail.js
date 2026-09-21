import { k as NodeType } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { M as ModelTree } from "../modelTree.js";
class LevelOfDetailExample {
  constructor() {
    this._selectedNodeId = null;
  }
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      new ModelTree("modelTree", this._viewer);
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      selectionArray: (selections) => {
        for (const selection of selections) {
          this._onSelection(selection);
        }
      }
    });
    let element = document.getElementById("LOD0");
    element.onclick = () => {
      if (this._selectedNodeId !== null) {
        const model = this._viewer.model;
        model.setMeshLevel([this._selectedNodeId], 0);
      }
    };
    element = document.getElementById("LOD1");
    element.onclick = () => {
      if (this._selectedNodeId !== null) {
        const model = this._viewer.model;
        model.setMeshLevel([this._selectedNodeId], 1);
      }
    };
    element = document.getElementById("LOD2");
    element.onclick = () => {
      if (this._selectedNodeId !== null) {
        const model = this._viewer.model;
        model.setMeshLevel([this._selectedNodeId], 2);
      }
    };
  }
  _onSelection(selectionEvent) {
    const selection = selectionEvent.getSelection();
    if (selection.isNodeSelection()) {
      this._selectedNodeId = selection.getNodeId();
      const model = this._viewer.model;
      if (model.isNodeLoaded(this._selectedNodeId)) {
        if (model.getNodeType(this._selectedNodeId) === NodeType.BodyInstance) {
          const parent = model.getNodeParent(this._selectedNodeId);
          if (parent !== null) {
            this._selectedNodeId = parent;
          }
        }
      }
    }
  }
}
window.onload = function() {
  let initialLevelOfDetail = parseInt(
    window.prompt("Chose initial level of detail\n0: normal\n1: low\n2: extra low", "0"),
    10
  );
  if (isNaN(initialLevelOfDetail) || initialLevelOfDetail < 0 || initialLevelOfDetail > 2) {
    initialLevelOfDetail = 0;
  }
  const levelOfDetailExample = new LevelOfDetailExample();
  levelOfDetailExample.start({
    containerId: "viewerContainer",
    model: "moto",
    defaultMeshLevel: initialLevelOfDetail
  });
};
