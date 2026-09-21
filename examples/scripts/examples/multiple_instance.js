import { e as MeshInstanceData } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class MultiInstanceExample {
  constructor() {
    this.tX = 100;
    this.tY = 0;
    this.tZ = 0;
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    const element = document.getElementById("instanceButton");
    element.onclick = () => {
      this._multiInstance(this.tX, this.tY, this.tZ);
    };
    const transX = document.getElementById("transX");
    transX.onchange = () => {
      this.tX = parseFloat(transX.value);
    };
    const transY = document.getElementById("transY");
    transY.onchange = () => {
      this.tY = parseFloat(transY.value);
    };
    const transZ = document.getElementById("transZ");
    transZ.onchange = () => {
      this.tZ = parseFloat(transZ.value);
    };
  }
  _gatherChildLeafNodes(startNodes) {
    const model = this._viewer.model;
    const nodes = startNodes.slice();
    const leaves = [];
    for (let i = 0; i < nodes.length; ++i) {
      const node = nodes[i];
      const kids = model.getNodeChildren(node);
      if (kids.length === 0) {
        leaves.push(node);
      }
      for (const kid of kids) {
        nodes.push(kid);
      }
    }
    return leaves;
  }
  _gatherLeafNodeIds() {
    const selectionManager = this._viewer.selectionManager;
    const selectionItems = selectionManager.getResults();
    const selectedNodes = [];
    for (let i = 0; i < selectionItems.length; i++) {
      const selectionItem = selectionItems[i];
      if (selectionItem !== null) {
        const myNodeId = selectionItem.getNodeId();
        selectedNodes.push(myNodeId);
      }
    }
    return this._gatherChildLeafNodes(selectedNodes);
  }
  _multiInstance(translation_X, translation_Y, translation_Z) {
    const model = this._viewer.model;
    const leafNodeIds = this._gatherLeafNodeIds();
    const meshIdPromises = leafNodeIds.map((leafNodeId) => {
      return model.getMeshIds([leafNodeId]);
    });
    Promise.all(meshIdPromises).then((meshIdsByLeafNode) => {
      model.getNodesEffectiveFaceColor(leafNodeIds).then((myFaceColor) => {
        model.getNodesEffectiveLineColor(leafNodeIds).then((myLineColor) => {
          let currentMeshIndex = 0;
          for (let i = 0; i < meshIdsByLeafNode.length; ++i) {
            const myMeshIds = meshIdsByLeafNode[i];
            const myNodeId = leafNodeIds[i];
            const translationMatrix = model.getNodeNetMatrix(myNodeId);
            translationMatrix.m[12] += translation_X;
            translationMatrix.m[13] += translation_Y;
            translationMatrix.m[14] += translation_Z;
            for (let j = 0; j < myMeshIds.length; j++) {
              const myMeshId = myMeshIds[j];
              const myMeshInstanceData = new MeshInstanceData(
                myMeshId,
                translationMatrix,
                null,
                // instance name
                myFaceColor[currentMeshIndex],
                myLineColor[currentMeshIndex]
              );
              model.createMeshInstance(myMeshInstanceData);
              currentMeshIndex++;
            }
          }
        });
      });
    });
  }
}
window.onload = function() {
  const multipleInstance = new MultiInstanceExample();
  multipleInstance.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
