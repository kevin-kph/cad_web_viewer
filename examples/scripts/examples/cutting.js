import { p as Axis, f as Matrix, b as Plane, P as Point3 } from "../WebViewer.js";
/* empty css        */
import { r as removeAllChildren, c as createViewer } from "../index.js";
import { h as hexToRgb } from "../utils.js";
class CuttingSectionBox {
  constructor(viewer, parentElement, cuttingSection, sectionIndex) {
    this._viewer = viewer;
    this._parentElement = parentElement;
    this._cuttingSection = cuttingSection;
    this._sectionIndex = sectionIndex;
    const sectionContainer = document.createElement("div");
    sectionContainer.classList.add("cuttingSectionBox");
    const sectionHeader = document.createElement("h3");
    sectionHeader.innerHTML = `Cutting Section ${this._sectionIndex}`;
    sectionContainer.appendChild(sectionHeader);
    const controlBox = document.createElement("div");
    const enabledLabel = document.createElement("span");
    enabledLabel.innerHTML = "Enabled: ";
    controlBox.appendChild(enabledLabel);
    this._enabledCheckbox = document.createElement("input");
    this._enabledCheckbox.classList.add("enableCheckbox");
    this._enabledCheckbox.type = "checkbox";
    this._enabledCheckbox.onchange = () => {
      this._onEnabledBoxClick(this._enabledCheckbox);
    };
    controlBox.appendChild(this._enabledCheckbox);
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear";
    clearButton.onclick = () => {
      this._onClearCuttingSection();
    };
    controlBox.appendChild(clearButton);
    sectionContainer.appendChild(controlBox);
    const buttonBox = document.createElement("div");
    buttonBox.appendChild(this._createAddPlaneButton("Add YZ Plane", Axis.X));
    buttonBox.appendChild(this._createAddPlaneButton("Add XZ Plane", Axis.Y));
    buttonBox.appendChild(this._createAddPlaneButton("Add XY Plane", Axis.Z));
    sectionContainer.appendChild(buttonBox);
    this._cuttingPlaneContainer = document.createElement("div");
    sectionContainer.appendChild(this._cuttingPlaneContainer);
    this._parentElement.appendChild(sectionContainer);
  }
  getCuttingSection() {
    return this._cuttingSection;
  }
  _onClearCuttingSection() {
    this._enabledCheckbox.checked = false;
    this._cuttingSection.clear();
    removeAllChildren(this._cuttingPlaneContainer);
  }
  _onUpdatePlane(index, value) {
    const plane = this._cuttingSection.getPlane(index);
    if (plane !== null) {
      plane.d = value;
      this._cuttingSection.updatePlane(index, plane, new Matrix(), false, false);
    }
  }
  _createAddPlaneButton(name, axis) {
    const addButton = document.createElement("button");
    addButton.innerHTML = name;
    addButton.onclick = () => {
      this._onAddPlane(axis);
    };
    return addButton;
  }
  _createCuttingRow(plane, min, max) {
    const cuttingRow = document.createElement("div");
    cuttingRow.appendChild(
      document.createTextNode(
        `nx: ${plane.normal.x} ny: ${plane.normal.y} nz: ${plane.normal.z} d: ${plane.d}`
      )
    );
    const planeDistanceInput = document.createElement("input");
    planeDistanceInput.type = "number";
    planeDistanceInput.value = `${plane.d}`;
    planeDistanceInput.step = `${(max - min) / 30}`;
    const index = this._cuttingSection.getCount() - 1;
    planeDistanceInput.onchange = () => {
      this._onUpdatePlane(index, parseFloat(planeDistanceInput.value));
    };
    cuttingRow.appendChild(planeDistanceInput);
    return cuttingRow;
  }
  _onAddPlane(axis) {
    this._viewer.model.getModelBounding(true, false).then((bounding) => {
      let plane = new Plane();
      const referenceGeometry = [];
      let min;
      let max;
      switch (axis) {
        case Axis.X:
          plane.normal.set(1, 0, 0);
          plane.d = -bounding.max.x / 2;
          max = bounding.max.x;
          min = bounding.min.x;
          referenceGeometry.push(new Point3(0, bounding.max.y, bounding.min.z));
          referenceGeometry.push(new Point3(0, bounding.max.y, bounding.max.z));
          referenceGeometry.push(new Point3(0, bounding.min.y, bounding.max.z));
          referenceGeometry.push(new Point3(0, bounding.min.y, bounding.min.z));
          break;
        case Axis.Y:
          plane.normal.set(0, 1, 0);
          plane.d = -bounding.max.y / 2;
          max = bounding.max.y;
          min = bounding.min.y;
          referenceGeometry.push(new Point3(bounding.min.x, 0, bounding.min.z));
          referenceGeometry.push(new Point3(bounding.max.x, 0, bounding.min.z));
          referenceGeometry.push(new Point3(bounding.max.x, 0, bounding.max.z));
          referenceGeometry.push(new Point3(bounding.min.x, 0, bounding.max.z));
          break;
        case Axis.Z:
          plane = new Plane();
          plane.normal.set(0, 0, 1);
          plane.d = -bounding.max.z / 2;
          max = bounding.max.z;
          min = bounding.min.z;
          referenceGeometry.push(new Point3(bounding.min.x, bounding.max.y, 0));
          referenceGeometry.push(new Point3(bounding.max.x, bounding.max.y, 0));
          referenceGeometry.push(new Point3(bounding.max.x, bounding.min.y, 0));
          referenceGeometry.push(new Point3(bounding.min.x, bounding.min.y, 0));
          break;
        default:
          return;
      }
      this._cuttingSection.addPlane(plane, referenceGeometry).then((success) => {
        if (success) {
          this._cuttingPlaneContainer.appendChild(this._createCuttingRow(plane, min, max));
        }
      });
      this._activate();
    });
  }
  _activate() {
    if (!this._cuttingSection.isActive()) {
      if (this._cuttingSection.getCount() > 0) {
        this._cuttingSection.activate();
        this._enabledCheckbox.checked = true;
      } else {
        const textarea = document.getElementById("log");
        textarea.value += "A cutting Section must have a plane inserted before it can be activated\n";
        this._enabledCheckbox.checked = false;
      }
    }
  }
  _onEnabledBoxClick(enabledBox) {
    if (enabledBox.checked) {
      this._activate();
    } else {
      this._cuttingSection.deactivate();
    }
  }
}
class CuttingExample {
  constructor() {
    this._cuttingSections = [];
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._initEvents();
      this._viewer.start();
    });
  }
  _initEvents() {
    this._viewer.setCallbacks({
      modelStructureReady: () => {
        this._onModelStructureReady();
      }
    });
  }
  _onModelStructureReady() {
    const cuttingManager = this._viewer.cuttingManager;
    const numCuttingSections = cuttingManager.getCuttingSectionCount();
    const cuttingSectionTable = document.getElementById("cuttingSections");
    if (!cuttingSectionTable) {
      return;
    }
    let currentRow;
    for (let i = 0; i < numCuttingSections; i++) {
      if (i % 2 === 0) {
        currentRow = document.createElement("tr");
        cuttingSectionTable.appendChild(currentRow);
      }
      const tableCell = document.createElement("td");
      const section = cuttingManager.getCuttingSection(i);
      if (!section) {
        continue;
      }
      this._cuttingSections.push(
        new CuttingSectionBox(this._viewer, tableCell, section, i + 1)
      );
      currentRow.appendChild(tableCell);
    }
    this._initControls();
  }
  _initControls() {
    const cuttingManager = this._viewer.cuttingManager;
    const enableSelection = document.getElementById("enableSelection");
    enableSelection.onchange = () => {
      cuttingManager.setStandinGeometryPickable(enableSelection.checked);
    };
    const enableCapping = document.getElementById("enableCapping");
    enableCapping.onchange = () => {
      cuttingManager.setCappingGeometryVisibility(enableCapping.checked);
    };
    const cappingFaceColor = document.getElementById("cappingFaceColor");
    cappingFaceColor.onchange = () => {
      cuttingManager.setCappingFaceColor(hexToRgb(cappingFaceColor.value));
    };
    const cappingLineColor = document.getElementById("cappingLineColor");
    cappingLineColor.onchange = () => {
      cuttingManager.setCappingLineColor(hexToRgb(cappingLineColor.value));
    };
  }
}
window.onload = function() {
  const cuttingExample = new CuttingExample();
  cuttingExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
