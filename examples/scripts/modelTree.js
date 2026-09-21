import { c as Point2 } from "./WebViewer.js";
class ModelTree {
  constructor(elementId, viewer) {
    this._size = new Point2(250, 300);
    this._elementId = elementId;
    this._viewer = viewer;
    const containerElement = document.getElementById(this._elementId);
    containerElement.style.width = `${this._size.x}px`;
    containerElement.style.height = `${this._size.y}px`;
    const heading = document.createElement("div");
    heading.classList.add("example-div-block");
    heading.innerHTML = "Model Tree:";
    containerElement.appendChild(heading);
    const navBox = document.createElement("div");
    navBox.classList.add("example-div-block");
    containerElement.appendChild(navBox);
    this._treeSelect = document.createElement("select");
    this._treeSelect.onchange = () => {
      this._onTreeSelectChange();
    };
    navBox.appendChild(this._treeSelect);
    this._childrenElement = document.createElement("ul");
    this._childrenElement.style.listStyleType = "none";
    this._childrenElement.style.fontSize = "12px";
    containerElement.appendChild(this._childrenElement);
    this._viewer.setCallbacks({
      modelStructureReady: () => {
        this.viewNode(this._viewer.model.getAbsoluteRootNode());
      },
      selectionArray: (selectionEvents) => {
        for (const selectionEvent of selectionEvents) {
          const selection = selectionEvent.getSelection();
          if (selection.isNodeSelection()) {
            const nodeId = selection.getNodeId();
            const model = this._viewer.model;
            if (model.isNodeLoaded(nodeId)) {
              this.viewNode(nodeId);
            }
          }
        }
      }
    });
  }
  _onTreeSelectChange() {
    let selectedId = null;
    let currentChild = this._treeSelect.firstChild;
    while (currentChild) {
      if (currentChild.selected) {
        selectedId = parseInt(currentChild.value, 10);
        break;
      }
      currentChild = currentChild.nextSibling;
    }
    this.viewNode(selectedId);
  }
  viewNode(nodeId) {
    if (nodeId !== null) {
      const model = this._viewer.model;
      const children = model.getNodeChildren(nodeId);
      if (children.length > 0) {
        this._clearElements();
        this._fillSelect(nodeId);
        this._treeSelect.value = nodeId.toString();
        this._fillChildren(nodeId);
      } else {
        this.viewNode(model.getNodeParent(nodeId));
      }
    }
  }
  clearContent() {
    this._clearElements();
  }
  _clearElements() {
    while (this._treeSelect.firstChild) {
      this._treeSelect.removeChild(this._treeSelect.firstChild);
    }
    while (this._childrenElement.firstChild) {
      this._childrenElement.removeChild(this._childrenElement.firstChild);
    }
  }
  _fillSelect(nodeId) {
    const parent = this._viewer.model.getNodeParent(nodeId);
    if (parent === null) {
      this._addSelectNode(nodeId, 0);
      return 0;
    } else {
      const level = this._fillSelect(parent) + 1;
      this._addSelectNode(nodeId, level);
      return level;
    }
  }
  _addSelectNode(nodeId, level) {
    let name = "";
    for (let i = 0; i < level; i++) {
      name += ".";
    }
    const option = document.createElement("option");
    option.value = nodeId.toString();
    option.text = name + this._viewer.model.getNodeName(nodeId);
    this._treeSelect.appendChild(option);
  }
  _fillChildren(nodeId) {
    const children = this._viewer.model.getNodeChildren(nodeId);
    for (const child of children) {
      this._addChildRow(child);
    }
  }
  _addChildRow(nodeId) {
    const listItem = document.createElement("li");
    listItem.innerHTML = this._viewer.model.getNodeName(nodeId) || "unnamed";
    listItem.dataset["partId"] = nodeId.toString();
    listItem.style.cursor = "pointer";
    listItem.style.padding = "2px";
    const selection = this._viewer.selectionManager.getLast();
    if (selection && nodeId === selection.getNodeId()) {
      listItem.style.fontWeight = "bold";
    }
    listItem.onclick = () => {
      this._listItemClick(nodeId);
    };
    this._childrenElement.appendChild(listItem);
  }
  _listItemClick(nodeId) {
    this._viewer.selectPart(nodeId);
  }
}
export {
  ModelTree as M
};
