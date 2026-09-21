import { O as OperatorId, a2 as DefaultTransitionDuration, V as ViewOrientation } from "./WebViewer.js";
class OperatorPanel {
  constructor(elementId, viewer) {
    this._elementId = elementId;
    this._viewer = viewer;
    this._createElements();
  }
  getSelectedActiveOperatorId() {
    return this._getSelectedOperatorId(this._activeOperatorSelect);
  }
  getSelectedCameraOperatorId() {
    return this._getSelectedOperatorId(this._cameraOperatorSelect);
  }
  _createElements() {
    const containerElement = document.getElementById(this._elementId);
    let heading = document.createElement("div");
    heading.classList.add("example-div-block");
    heading.innerHTML = "Camera Operator:";
    containerElement.appendChild(heading);
    this._createCameraOperatorSelect();
    containerElement.appendChild(this._cameraOperatorSelect);
    heading = document.createElement("div");
    heading.classList.add("example-div-block");
    heading.innerHTML = "Active Operator:";
    containerElement.appendChild(heading);
    this._activeOperatorSelect = this._createActiveOperatorSelect();
    containerElement.appendChild(this._activeOperatorSelect);
  }
  _createActiveOperatorSelect() {
    this._activeOperatorSelect = document.createElement("select");
    this._activeOperatorSelect.size = 5;
    this._activeOperatorSelect.classList.add("example-panel-select-box");
    this._activeOperatorSelect.appendChild(this._createOperatorOption("None", OperatorId.None));
    this._activeOperatorSelect.appendChild(this._createOperatorOption("Select", OperatorId.Select));
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("RedlineCircle", OperatorId.RedlineCircle)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("RedlineText", OperatorId.RedlineText)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("RedlineRectangle", OperatorId.RedlineRectangle)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("RedlinePolyline", OperatorId.RedlinePolyline)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("MeasureEdgeLength", OperatorId.MeasureEdgeLength)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("MeasureFaceFaceAngle", OperatorId.MeasureFaceFaceAngle)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("MeasureFaceFaceDistance", OperatorId.MeasureFaceFaceDistance)
    );
    this._activeOperatorSelect.appendChild(
      this._createOperatorOption("MeasurePointPointDistance", OperatorId.MeasurePointPointDistance)
    );
    this._activeOperatorSelect.onclick = () => {
      const operatorId = this._getSelectedOperatorId(this._activeOperatorSelect);
      if (operatorId !== null) this._viewer.operatorManager.set(operatorId, 1);
    };
    return this._activeOperatorSelect;
  }
  _createCameraOperatorSelect() {
    this._cameraOperatorSelect = document.createElement("select");
    this._cameraOperatorSelect.size = 5;
    this._cameraOperatorSelect.classList.add("example-panel-select-box");
    this._cameraOperatorSelect.appendChild(
      this._createOperatorOption("Navigate", OperatorId.Navigate)
    );
    this._cameraOperatorSelect.appendChild(this._createOperatorOption("Walk", OperatorId.Walk));
    this._cameraOperatorSelect.appendChild(
      this._createOperatorOption("Turntable", OperatorId.Turntable)
    );
    this._cameraOperatorSelect.onclick = () => {
      const operatorId = this._getSelectedOperatorId(this._cameraOperatorSelect);
      if (operatorId) this._viewer.operatorManager.set(operatorId, 0);
    };
    return this._cameraOperatorSelect;
  }
  _createOperatorOption(name, value) {
    const option = document.createElement("option");
    option.text = name;
    option.value = value.toString();
    return option;
  }
  _getSelectedOperatorId(select) {
    let currentChild = select.firstChild;
    while (currentChild) {
      if (currentChild.selected) {
        return parseInt(currentChild.value, 10);
      }
      currentChild = currentChild.nextSibling;
    }
    return null;
  }
}
class ViewOrientationBar {
  constructor(elementId, viewer) {
    this._transitionDuration = DefaultTransitionDuration;
    this._elementId = elementId;
    this._viewer = viewer;
    this._createElements();
  }
  _createElements() {
    const containerElement = document.getElementById(this._elementId);
    let label = document.createElement("span");
    label.innerHTML = "View Orientation: ";
    containerElement.appendChild(label);
    containerElement.appendChild(this._createButton("Front", ViewOrientation.Front));
    containerElement.appendChild(this._createButton("Back", ViewOrientation.Back));
    containerElement.appendChild(this._createButton("Left", ViewOrientation.Left));
    containerElement.appendChild(this._createButton("Right", ViewOrientation.Right));
    containerElement.appendChild(this._createButton("Top", ViewOrientation.Top));
    containerElement.appendChild(this._createButton("Bottom", ViewOrientation.Bottom));
    containerElement.appendChild(this._createButton("Iso", ViewOrientation.Iso));
    label = document.createElement("span");
    label.innerHTML = "Duration: ";
    containerElement.appendChild(label);
    const durationControl = document.createElement("input");
    durationControl.id = "durationControl";
    durationControl.type = "number";
    durationControl.min = "0";
    durationControl.value = this._transitionDuration.toString();
    durationControl.step = "1";
    containerElement.appendChild(durationControl);
    durationControl.onchange = () => {
      this._transitionDuration = parseInt(durationControl.value, 10);
    };
  }
  _createButton(name, orientation) {
    const button = document.createElement("button");
    button.innerHTML = name;
    button.onclick = () => {
      this._viewer.view.setViewOrientation(orientation, this._transitionDuration);
    };
    return button;
  }
}
export {
  OperatorPanel as O,
  ViewOrientationBar as V
};
