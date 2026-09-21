import { ah as WebViewer, C as Color } from "../WebViewer.js";
/* empty css        */
import { g as getRendererType, a as requestEndpoint } from "../index.js";
import { M as ModelTree } from "../modelTree.js";
class StreamingModesExample {
  constructor() {
    this._viewer = null;
  }
  start() {
    document.getElementById("modeSelectButton").onclick = () => {
      this._onSelectStreamingMode();
    };
    for (let i = 1; i <= 12; i++) {
      this._bindLoadNodeMethod(`loadStory${i}`, `Story ${i}`);
    }
    const otherFloors = ["Foundation", "Parking 1", "Parking 2", "Building Skin"];
    for (let i = 0; i < otherFloors.length; i++) {
      const name = otherFloors[i];
      this._bindLoadNodeMethod(name, name);
    }
  }
  _bindLoadNodeMethod(id, nodeName) {
    document.getElementById(id).onclick = () => {
      this._loadNodesByName(nodeName);
    };
  }
  _onSelectStreamingMode() {
    const radioButtons = document.getElementsByName("streamingMode");
    let streamingMode = 1;
    for (let i = 0, length = radioButtons.length; i < length; i++) {
      const radioButton = radioButtons[i];
      if (radioButton.checked) {
        streamingMode = parseInt(radioButton.value, 10);
        break;
      }
    }
    this._startViewer(streamingMode);
  }
  _loadNodesByName(name) {
    if (this._viewer === null) {
      return;
    }
    const nodes = [];
    const model = this._viewer.model;
    const root = model.getAbsoluteRootNode();
    this._findNodes(root, model, name, nodes);
    if (nodes.length > 0) model.requestNodes(nodes);
  }
  _findNodes(node, model, name, nodes) {
    const nodeName = model.getNodeName(node);
    if (nodeName === name) {
      nodes.push(node);
      return;
    } else {
      const children = model.getNodeChildren(node);
      if (!children) return;
      for (let i = 0; i < children.length; i++) {
        this._findNodes(children[i], model, name, nodes);
      }
    }
  }
  _startViewer(streamingMode) {
    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("viewer").style.display = "block";
    const rendererType = getRendererType();
    requestEndpoint(rendererType).then((endpoint) => {
      this._viewer = new WebViewer({
        containerId: "viewerContainer",
        endpointUri: endpoint,
        model: "arboleda",
        streamingMode,
        rendererType: getRendererType(),
        enginePath: WebViewer.defaultEnginePath
      });
      this._viewer.setCallbacks({
        sceneReady: () => {
          this._viewer.view.setBackgroundColor(Color.white(), Color.white());
        },
        modelStructureReady: () => {
          this._onModelStructureReady(streamingMode);
        }
      });
      new ModelTree("modelTree", this._viewer);
      this._viewer.start();
    });
  }
  _onModelStructureReady(streamingMode) {
    const element = document.getElementById(`streamingMode-${streamingMode}`);
    if (element) element.style.display = "block";
  }
}
window.onload = function() {
  const streamingModesExample = new StreamingModesExample();
  streamingModesExample.start();
};
