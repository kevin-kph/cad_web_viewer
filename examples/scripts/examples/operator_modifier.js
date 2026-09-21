import { O as OperatorId, ao as OperatorBase } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class OperatorModifierExample {
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._operatorManager = this._viewer.operatorManager;
      this._bindEvents();
      this._viewer.start();
      this.updateOperatorModifier("orbit", OperatorId.Orbit);
      this.updateOperatorModifier("pan", OperatorId.Pan);
      this.updateOperatorModifier("zoom", OperatorId.Zoom);
    });
  }
  _bindEvents() {
    let element = document.getElementById("orbit-button");
    element.onchange = () => {
      this.updateOperatorModifier("orbit", OperatorId.Orbit);
    };
    element = document.getElementById("orbit-modifier");
    element.onchange = () => {
      this.updateOperatorModifier("orbit", OperatorId.Orbit);
    };
    element = document.getElementById("pan-button");
    element.onchange = () => {
      this.updateOperatorModifier("pan", OperatorId.Pan);
    };
    element = document.getElementById("pan-modifier");
    element.onchange = () => {
      this.updateOperatorModifier("pan", OperatorId.Pan);
    };
    element = document.getElementById("zoom-button");
    element.onchange = () => {
      this.updateOperatorModifier("zoom", OperatorId.Zoom);
    };
    element = document.getElementById("zoom-modifier");
    element.onchange = () => {
      this.updateOperatorModifier("zoom", OperatorId.Zoom);
    };
  }
  updateOperatorModifier(elementId, operatorId) {
    const operator = this._operatorManager.getOperator(operatorId);
    if (operator instanceof OperatorBase) {
      const buttonElem = document.getElementById(`${elementId}-button`);
      const modifierElem = document.getElementById(`${elementId}-modifier`);
      const button = parseInt(buttonElem.value, 10);
      const modifier = parseInt(modifierElem.value, 10);
      operator.setMapping(button, modifier);
    }
  }
}
window.onload = function() {
  const operatorModifier = new OperatorModifierExample();
  operatorModifier.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
