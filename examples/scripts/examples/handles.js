import { C as Color, O as OperatorId, P as Point3 } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { h as hexToRgb } from "../utils.js";
class HandlesExample {
  constructor() {
    this._axisTranslationColor = Color.red();
    this._axisRotationColor = Color.red();
  }
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._bindEvents();
      this._viewer.start();
      this._handleOperator = this._viewer.operatorManager.getOperator(OperatorId.Handle);
    });
  }
  _bindEvents() {
    document.getElementById("axis-translation").onclick = () => {
      const selectionItem = this._viewer.selectionManager.getResult(0);
      if (selectionItem !== null) {
        const nodeId = selectionItem.getNodeId();
        const faceEntity = selectionItem.getFaceEntity();
        const lineEntity = selectionItem.getLineEntity();
        if (faceEntity !== null) {
          const position = faceEntity.getPosition();
          const axis = faceEntity.getNormal();
          this._addAxisTranslationHandle(position, axis, [nodeId], this._axisTranslationColor);
        } else if (lineEntity !== null) {
          const points = lineEntity.getPoints();
          if (points.length === 2) {
            const axis = Point3.subtract(points[1], points[0]);
            const length = axis.length();
            const position = points[0].copy().add(axis.normalize().scale(length / 2));
            this._addAxisTranslationHandle(position, axis, [nodeId], this._axisTranslationColor);
            this._addAxisTranslationHandle(
              position,
              axis.copy().scale(-1),
              [nodeId],
              this._axisTranslationColor
            );
          }
        }
      }
    };
    document.getElementById("axis-rotation").onclick = () => {
      const selectionItem = this._viewer.selectionManager.getResult(0);
      if (selectionItem !== null) {
        const nodeId = selectionItem.getNodeId();
        const faceEntity = selectionItem.getFaceEntity();
        const lineEntity = selectionItem.getLineEntity();
        if (faceEntity !== null) {
          const position = faceEntity.getBounding().center();
          const axis = faceEntity.getNormal();
          this._addAxisRotationHandle(position, axis, [nodeId], this._axisRotationColor);
        } else if (lineEntity !== null) {
          const points = lineEntity.getPoints();
          if (points.length === 2) {
            const axis = Point3.subtract(points[1], points[0]);
            const length = axis.length();
            const position = points[0].copy().add(axis.normalize().scale(length / 2));
            this._addAxisRotationHandle(position, axis, [nodeId], this._axisRotationColor);
          }
        }
      }
    };
    document.getElementById("default-handles").onclick = () => {
      const selectionItem = this._viewer.selectionManager.getResult(0);
      if (selectionItem !== null) {
        const position = selectionItem.getPosition();
        if (position !== null) {
          position.add(this._handleOperator.getTranslation());
          this._handleOperator.addHandles([selectionItem.getNodeId()], position);
        }
      }
    };
    const axisRotationColor = document.getElementById("axis-rotation-color");
    const axisTranslationColor = document.getElementById(
      "axis-translation-color"
    );
    document.getElementById("axis-translation-color").onchange = () => {
      this._axisTranslationColor = hexToRgb(axisTranslationColor.value);
    };
    document.getElementById("axis-rotation-color").onchange = () => {
      this._axisRotationColor = hexToRgb(axisRotationColor.value);
    };
    document.getElementById("reset-model").onclick = () => {
      this._handleOperator.removeHandles();
      this._viewer.reset();
    };
  }
  _addAxisTranslationHandle(position, axis, nodeIds, color) {
    if (!color) {
      color = Color.red();
    }
    this._handleOperator.addAxisTranslationHandle(
      position.copy().add(this._handleOperator.getTranslation()),
      axis,
      color
    );
    this._handleOperator.setNodeIds(nodeIds);
    this._handleOperator.showHandles();
  }
  _addAxisRotationHandle(position, axis, nodeIds, color) {
    if (!color) {
      color = Color.red();
    }
    this._handleOperator.addAxisRotationHandle(
      position.copy().add(this._handleOperator.getTranslation()),
      axis,
      color
    );
    this._handleOperator.setNodeIds(nodeIds);
    this._handleOperator.showHandles();
  }
}
window.onload = function() {
  const handlesExample = new HandlesExample();
  handlesExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
