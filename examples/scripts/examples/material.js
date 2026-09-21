import { ak as SelectionHighlightMode } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { M as ModelTree } from "../modelTree.js";
import { h as hexToRgb } from "../utils.js";
class MaterialExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      new ModelTree("modelTree", this._viewer);
      const selection = this._viewer.selectionManager;
      selection.setHighlightFaceElementSelection(false);
      selection.setHighlightLineElementSelection(false);
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      sceneReady: () => {
        const selection = this._viewer.selectionManager;
        selection.setNodeSelectionHighlightMode(SelectionHighlightMode.OutlineOnly);
      },
      selectionArray: (selectionEvents) => {
        for (const selectionEvent of selectionEvents) {
          this._onSelectionUpdated(selectionEvent);
        }
      }
    });
    let element = document.getElementById("setPartsColor");
    element.onchange = () => {
      this._onSetPartsColor();
    };
    element = document.getElementById("setPartsLineColor");
    element.onchange = () => {
      this._onSetPartsLineColor();
    };
    element = document.getElementById("setPartsColors");
    element.onclick = () => {
      this._onSetPartsColors();
    };
    element = document.getElementById("resetPartsColor");
    element.onclick = () => {
      this._onResetPartsColor();
    };
    element = document.getElementById("setPartsOpacity");
    element.onchange = () => {
      this._onSetPartsOpacity();
    };
    element = document.getElementById("setPartsOpacities");
    element.onclick = () => {
      this._onSetPartsOpacities();
    };
    element = document.getElementById("resetNodesOpacity");
    element.onclick = () => {
      this._onResetNodesOpacity();
    };
    element = document.getElementById("resetModelOpacity");
    element.onclick = () => {
      this._onResetModelOpacity();
    };
    element = document.getElementById("setPartsVisibilityOn");
    element.onclick = () => {
      this._onSetPartsVisibility(true);
    };
    element = document.getElementById("setPartsVisibilityOff");
    element.onclick = () => {
      this._onSetPartsVisibility(false);
    };
    element = document.getElementById("setPartsVisibilities");
    element.onclick = () => {
      this._onSetPartsVisibilities();
    };
    element = document.getElementById("resetPartsVisibility");
    element.onclick = () => {
      this._onResetPartsVisibility();
    };
  }
  _onSetPartsColor() {
    const partIds = this._getSelectedPartIds();
    const input = document.getElementById("setPartsColor");
    const color = hexToRgb(input.value);
    this._viewer.model.setNodesFaceColor(partIds, color);
  }
  _onSetPartsLineColor() {
    const partIds = this._getSelectedPartIds();
    const input = document.getElementById("setPartsLineColor");
    const color = hexToRgb(input.value);
    this._viewer.model.setNodesLineColor(partIds, color);
  }
  _onSetPartsColors() {
    const items = document.getElementsByClassName("part-color-input");
    const colorMap = {};
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const color = hexToRgb(element.value);
      const idStr = element.dataset["uniqueId"];
      if (idStr !== void 0) {
        const id = parseInt(idStr, 10);
        colorMap[id] = color;
      }
    }
    this._viewer.model.setNodesColors(colorMap);
  }
  _onSetPartsOpacities() {
    const items = document.getElementsByClassName("part-opacity-input");
    const numberMap = {};
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const opacity = parseFloat(element.value);
      const idStr = element.dataset["uniqueId"];
      if (idStr !== void 0) {
        const id = parseInt(idStr, 10);
        numberMap[id] = opacity;
      }
    }
    this._viewer.model.setNodesOpacities(numberMap);
  }
  _onResetPartsColor() {
    this._viewer.model.resetNodesColor();
  }
  _getSelectedPartIds() {
    const partIds = [];
    this._viewer.selectionManager.each((selectionItem) => {
      partIds.push(selectionItem.getNodeId());
    });
    return partIds;
  }
  _onResetNodesOpacity() {
    const partIds = this._getSelectedPartIds();
    if (partIds.length > 0) this._viewer.model.resetNodesOpacity(partIds);
  }
  _onSetPartsOpacity() {
    const element = document.getElementById("setPartsOpacity");
    const opacity = parseFloat(element.value);
    const partIds = this._getSelectedPartIds();
    if (partIds.length > 0) this._viewer.model.setNodesOpacity(partIds, opacity);
  }
  _onResetModelOpacity() {
    this._viewer.model.resetModelOpacity();
  }
  _onSetPartsVisibility(visible) {
    const partIds = this._getSelectedPartIds();
    if (partIds.length > 0) this._viewer.model.setNodesVisibility(partIds, visible);
  }
  _onSetPartsVisibilities() {
    const items = document.getElementsByClassName("part-visibility-input");
    const boolMap = {};
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const idStr = element.dataset["uniqueId"];
      if (idStr !== void 0) {
        const id = parseInt(idStr, 10);
        boolMap[id] = element.checked;
      }
    }
    this._viewer.model.setNodesVisibilities(boolMap);
  }
  _onResetPartsVisibility() {
    this._viewer.model.resetNodesVisibility();
  }
  _onSelectionUpdated(selectionEvent) {
    this._updateSelectedPartsList();
    this._updateSelectedPartsTable();
  }
  _updateSelectedPartsList() {
    const model = this._viewer.model;
    const results = this._viewer.selectionManager.getResults();
    const texts = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const nodeId = result.getNodeId();
      if (model.isNodeLoaded(nodeId)) {
        const parentId = model.getNodeParent(nodeId);
        if (parentId !== null) {
          texts.push(`${model.getNodeName(parentId)}`);
        } else {
          texts.push(`${model.getNodeName(nodeId)}`);
        }
      }
    }
    const selectionText = `Selected Parts: ${texts.join(", ")}`;
    const selectedPartsNames = document.getElementById("selectedPartsNames");
    selectedPartsNames.innerHTML = selectionText;
  }
  _updateSelectedPartsTable() {
    const results = this._viewer.selectionManager.getResults();
    const tableHeader = document.getElementById("selectedPartsTableHeader");
    const selectedPartEntries = document.getElementsByClassName("selected-part-entry");
    while (selectedPartEntries.length) {
      const element = selectedPartEntries.item(0);
      if (element.parentElement !== null) {
        element.parentElement.removeChild(element);
      }
    }
    const model = this._viewer.model;
    for (const result of results) {
      const id = result.getNodeId();
      const tr = document.createElement("tr");
      tr.classList.add("selected-part-entry");
      const nameCell = document.createElement("td");
      nameCell.innerHTML = model.getNodeName(id) || "unnamed";
      tr.appendChild(nameCell);
      const colorCell = document.createElement("td");
      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.dataset["uniqueId"] = id.toString();
      colorInput.classList.add("part-color-input");
      colorCell.appendChild(colorInput);
      tr.appendChild(colorCell);
      const transparencyCell = document.createElement("td");
      const numberInput = document.createElement("input");
      numberInput.dataset["uniqueId"] = id.toString();
      numberInput.classList.add("part-opacity-input");
      numberInput.type = "number";
      numberInput.min = "0.0";
      numberInput.max = "1.0";
      numberInput.step = "0.1";
      numberInput.value = "1.0";
      transparencyCell.appendChild(numberInput);
      tr.appendChild(transparencyCell);
      const visibilityCell = document.createElement("td");
      const visibilityInput = document.createElement("input");
      visibilityInput.dataset["uniqueId"] = id.toString();
      visibilityInput.classList.add("part-visibility-input");
      visibilityInput.type = "checkbox";
      visibilityInput.checked = true;
      visibilityCell.appendChild(visibilityInput);
      tr.appendChild(visibilityCell);
      tableHeader.insertAdjacentElement("afterend", tr);
    }
  }
}
window.onload = function() {
  const materialExample = new MaterialExample();
  materialExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
