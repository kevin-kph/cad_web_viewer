import { D as SelectionType, k as NodeType } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { M as ModelTree } from "../modelTree.js";
import { h as hexToRgb } from "../utils.js";
class SelectionSet {
  constructor(elementId, viewer) {
    this._seletionId = 0;
    this._selectionCache = {};
    this._elementId = elementId;
    this._viewer = viewer;
    const container = document.getElementById(this._elementId);
    const wrapper = document.createElement("div");
    const buttonDiv = document.createElement("div");
    const saveSelection = document.createElement("button");
    saveSelection.innerHTML = "Save Selection";
    saveSelection.onclick = () => {
      this._onSaveSelection();
    };
    const loadSelection = document.createElement("button");
    loadSelection.innerHTML = "Load Selection";
    loadSelection.onclick = () => {
      this._onLoadSelection();
    };
    this._selectionList = document.createElement("select");
    this._selectionList.size = 5;
    this._selectionList.classList.add("example-panel-select-box");
    buttonDiv.appendChild(saveSelection);
    buttonDiv.appendChild(loadSelection);
    wrapper.appendChild(buttonDiv);
    wrapper.appendChild(this._selectionList);
    container.appendChild(wrapper);
  }
  _onSaveSelection() {
    const selectionManager = this._viewer.selectionManager;
    if (selectionManager.size() > 0) {
      const selectionId = this._seletionId++;
      this._selectionCache[selectionId] = selectionManager.exportSelectionData();
      const option = document.createElement("option");
      option.text = `Selection ${this._selectionList.length}`;
      option.value = selectionId.toString();
      this._selectionList.add(option);
    }
  }
  _onLoadSelection() {
    if (this._selectionList.length > 0) {
      const selectionid = parseInt(this._selectionList.value, 10);
      this._viewer.selectionManager.loadSelectionData(this._selectionCache[selectionid]);
    }
  }
}
class SelectionExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      new ModelTree("modelTree", this._viewer);
      new SelectionSet("selectionSets", this._viewer);
      this._resultTable = document.getElementById("resultTable");
      this._initEvents();
      this._viewer.start();
    });
  }
  _initEvents() {
    const selectionManager = this._viewer.selectionManager;
    this._viewer.setCallbacks({
      selectionArray: (selections) => {
        for (const selection of selections) {
          this._onSelection(selection);
        }
      }
    });
    const nodeSelectionHighlightMode = document.getElementById(
      "nodeSelectionHighlightMode"
    );
    nodeSelectionHighlightMode.onchange = () => {
      selectionManager.setNodeSelectionHighlightMode(
        parseInt(nodeSelectionHighlightMode.value, 10)
      );
    };
    const nodeElementSelectionHighlightMode = document.getElementById(
      "nodeElementSelectionHighlightMode"
    );
    nodeElementSelectionHighlightMode.onchange = () => {
      selectionManager.setNodeElementSelectionHighlightMode(
        parseInt(nodeElementSelectionHighlightMode.value, 10)
      );
    };
    const nodeSelectionColor = document.getElementById("nodeSelectionColor");
    nodeSelectionColor.onchange = () => {
      selectionManager.setNodeSelectionColor(hexToRgb(nodeSelectionColor.value));
    };
    const nodeSelectionOutlineColor = document.getElementById(
      "nodeSelectionOutlineColor"
    );
    nodeSelectionOutlineColor.onchange = () => {
      selectionManager.setNodeSelectionOutlineColor(hexToRgb(nodeSelectionOutlineColor.value));
    };
    const nodeElementSelectionColor = document.getElementById(
      "nodeElementSelectionColor"
    );
    nodeElementSelectionColor.onchange = () => {
      selectionManager.setNodeElementSelectionColor(hexToRgb(nodeElementSelectionColor.value));
    };
    const nodeElementSelectionOutlineColor = document.getElementById(
      "nodeElementSelectionOutlineColor"
    );
    nodeElementSelectionOutlineColor.onchange = () => {
      selectionManager.setNodeElementSelectionOutlineColor(
        hexToRgb(nodeElementSelectionOutlineColor.value)
      );
    };
    const highlightPartSelection = document.getElementById(
      "highlightPartSelection"
    );
    highlightPartSelection.onchange = () => {
      selectionManager.setHighlightNodeSelection(highlightPartSelection.checked);
    };
    const highlightFaceElementSelection = document.getElementById(
      "highlightFaceElementSelection"
    );
    highlightFaceElementSelection.onchange = () => {
      selectionManager.setHighlightFaceElementSelection(highlightFaceElementSelection.checked);
    };
    const highlightLineElementSelection = document.getElementById(
      "highlightLineElementSelection"
    );
    highlightLineElementSelection.onchange = () => {
      selectionManager.setHighlightLineElementSelection(highlightLineElementSelection.checked);
    };
  }
  _onSelection(selectionEvent) {
    while (this._resultTable.firstChild) {
      this._resultTable.removeChild(this._resultTable.firstChild);
    }
    const selectionType = selectionEvent.getType();
    this._createResultTableRow("Result", SelectionType[selectionType]);
    let propertiesCreated = false;
    const selection = selectionEvent.getSelection();
    if (selection.isNodeSelection()) {
      let nodeId = selection.getNodeId();
      this._createResultTableRow("NodeId", nodeId.toString());
      if (selection.isNodeEntitySelection()) {
        const position = selection.getPosition();
        this._createResultTableRow("Position", this._formatPoint(position));
      }
      if (selection.isFaceSelection()) {
        const faceNormal = selection.getFaceEntity().getNormal();
        this._createResultTableRow("Face normal", this._formatPoint(faceNormal));
      }
      const model = this._viewer.model;
      if (model.isNodeLoaded(nodeId)) {
        const nodeType = model.getNodeType(nodeId);
        if (nodeType === NodeType.Body || nodeType === NodeType.BodyInstance) {
          const parent = model.getNodeParent(nodeId);
          if (parent !== null) {
            nodeId = parent;
          }
        }
        model.getNodeProperties(nodeId).then((properties) => {
          if (properties) {
            propertiesCreated = true;
            this._createResultTableRow("Properties:", "");
            for (const propertyName of Object.keys(properties)) {
              this._createResultTableRow(propertyName, properties[propertyName]);
            }
          }
        });
      }
    }
    if (!propertiesCreated) {
      this._createResultTableRow("Properties", "null");
    }
  }
  _formatPoint(point) {
    return `x: ${point.x} y: ${point.y} z: ${point.z}`;
  }
  _createResultTableRow(key, value) {
    const tableRow = document.createElement("tr");
    const keyCell = document.createElement("td");
    keyCell.innerHTML = key;
    tableRow.appendChild(keyCell);
    const valueCell = document.createElement("td");
    valueCell.innerHTML = value.toString();
    tableRow.appendChild(valueCell);
    this._resultTable.appendChild(tableRow);
  }
}
window.onload = function() {
  const selectionExample = new SelectionExample();
  selectionExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
