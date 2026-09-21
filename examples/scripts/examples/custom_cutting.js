import { i as PickConfig, j as SelectionMask, O as OperatorId, B as Button, P as Point3, f as Matrix, b as Plane, C as Color, H as HandleEventType } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class CustomCuttingOperator {
  constructor(viewer, planeUpdated) {
    this._pickConfig = new PickConfig(SelectionMask.Face);
    this._activeCuttingPlane = null;
    this._handleSelected = false;
    this._dragging = false;
    this._dragCount = 0;
    this._handleEventPromise = Promise.resolve();
    this._viewer = viewer;
    this._handleOperator = this._viewer.operatorManager.getOperator(OperatorId.Handle);
    this._planeUpdated = planeUpdated;
    const handleEventStartFunction = () => {
      this._handleSelected = true;
    };
    const handleEventFunction = (eventType, nodeIds, initialMatrices, newMatrices) => {
      this._viewer.cuttingManager.delayCapping();
      this._handleEventPromise = this._handleEventPromise.then(() => {
        return this._onHandleEvent(eventType, nodeIds, initialMatrices, newMatrices, false);
      });
    };
    const handleEventEndFunction = (eventType, nodeIds, initialMatrices, newMatrices) => {
      this._handleEventPromise = this._handleEventPromise.then(() => {
        return this._onHandleEvent(eventType, nodeIds, initialMatrices, newMatrices, true).then(
          () => {
            const newPlane = this._getActivePlane();
            if (newPlane !== null) {
              this._activeCuttingPlane = newPlane.copy();
            } else {
              this._activeCuttingPlane = null;
            }
            this._handleSelected = false;
          }
        );
      });
    };
    const updateHandlePosition = (cuttingSection, cuttingEventEnd2) => {
      if (cuttingSection !== this._viewer.cuttingManager.getCuttingSection(0) || this._activeCuttingPlane === null) {
        return;
      }
      const newPlane = cuttingSection.getPlane(0);
      if (newPlane === null) {
        return;
      }
      this._planeUpdated(newPlane);
      this._updateHandlePosition(this._activeCuttingPlane.copy(), newPlane.copy(), cuttingEventEnd2);
      if (cuttingEventEnd2) {
        this._activeCuttingPlane = newPlane.copy();
      }
    };
    const cuttingEvent = (cuttingSection) => {
      updateHandlePosition(cuttingSection, false);
    };
    const cuttingEventEnd = (cuttingSection) => {
      updateHandlePosition(cuttingSection, true);
    };
    this._viewer.setCallbacks({
      handleEventStart: handleEventStartFunction,
      handleEvent: handleEventFunction,
      handleEventEnd: handleEventEndFunction,
      cuttingPlaneDrag: cuttingEvent,
      cuttingPlaneDragEnd: cuttingEventEnd
    });
  }
  onMouseDown() {
    this._dragging = true;
    this._dragCount = 0;
  }
  onMouseMove() {
    if (this._dragging) {
      ++this._dragCount;
    }
  }
  onMouseUp(event) {
    this._dragging = false;
    if (this._dragCount > 5) {
      return;
    }
    if (event.getButton() === Button.Right) {
      this._removeCuttingPlane();
    } else if (event.getButton() === Button.Left) {
      this._addCuttingPlane(event);
    }
  }
  onMousewheel(_event) {
  }
  onTouchStart(_event) {
  }
  onTouchMove(_event) {
  }
  onTouchEnd(_event) {
  }
  onKeyDown(_event) {
  }
  onKeyUp(_event) {
  }
  onDeactivate() {
  }
  onActivate() {
  }
  onViewOrientationChange() {
  }
  stopInteraction() {
  }
  _getActivePlane() {
    const cuttingManager = this._viewer.cuttingManager;
    const cuttingSection = cuttingManager.getCuttingSection(0);
    return cuttingSection.getPlane(0);
  }
  async _updateHandlePosition(previousPlane, newPlane, resetInitialPosition) {
    if (this._handleSelected) {
      return;
    }
    const newDistance = previousPlane.d - newPlane.d;
    const c = newPlane.getCoefficients();
    const newTranslation = new Point3(c[0], c[1], c[2]).scale(newDistance);
    this._handleOperator.updatePosition(newTranslation, new Matrix(), resetInitialPosition);
  }
  async _removeCuttingPlane() {
    this._planeUpdated(null);
    this._activeCuttingPlane = null;
    await Promise.all([
      this._viewer.cuttingManager.clearAllCuttingSections(),
      this._handleOperator.removeHandles()
    ]);
  }
  async _addCuttingPlane(event) {
    if (this._activeCuttingPlane !== null) {
      return;
    }
    const selectionItem = await this._viewer.view.pickFromPoint(
      event.getPosition(),
      this._pickConfig
    );
    const position = selectionItem.getPosition();
    const faceEntity = selectionItem.getFaceEntity();
    if (position !== null && faceEntity !== null) {
      const normal = faceEntity.getNormal();
      const box = await this._viewer.model.getModelBounding(true, false);
      const plane = Plane.createFromPointAndNormal(position, normal);
      this._activeCuttingPlane = plane.copy();
      this._planeUpdated(plane.copy());
      const cuttingManager = this._viewer.cuttingManager;
      const cuttingSection = cuttingManager.getCuttingSection(0);
      const referenceGeometry = cuttingManager.createReferenceGeometryFromFaceNormal(
        normal.copy(),
        position.copy(),
        box.copy()
      );
      await Promise.all([
        cuttingSection.addPlane(plane, referenceGeometry),
        cuttingSection.activate()
      ]);
      const nodeId = cuttingSection.getNodeId(0);
      if (nodeId !== null) {
        this._addHandles(position, normal, nodeId);
      }
    }
  }
  _addHandles(position, normal, nodeId) {
    let axis1 = Point3.cross(normal, new Point3(1, 0, 0));
    if (axis1.squaredLength() < 1e-3) {
      axis1 = Point3.cross(normal, new Point3(0, 1, 0));
    }
    const axis2 = Point3.cross(normal, axis1);
    this._handleOperator.addAxisRotationHandle(position, axis1, Color.red());
    this._handleOperator.addAxisRotationHandle(position, axis2, Color.blue());
    this._handleOperator.addAxisTranslationHandle(position, normal, Color.red());
    this._handleOperator.setNodeIds([nodeId]);
    this._handleOperator.showHandles();
  }
  async _onHandleEvent(eventType, _nodeIds, initialMatrices, newMatrices, handleEventEnd) {
    const handlePosition = this._handleOperator.getPosition();
    if (this._activeCuttingPlane === null || handlePosition === null) {
      return Promise.resolve();
    }
    if (eventType === HandleEventType.Translate && newMatrices.length > 0) {
      this._onHandleTranslate(this._activeCuttingPlane.copy(), newMatrices[0].copy());
    }
    if (eventType === HandleEventType.Rotate && newMatrices.length > 0) {
      this._onHandleRotate(
        this._activeCuttingPlane.copy(),
        handlePosition.copy(),
        initialMatrices[0].copy(),
        newMatrices[0].copy(),
        handleEventEnd
      );
    }
  }
  async _onHandleTranslate(plane, newMatrix) {
    const cuttingSection = this._viewer.cuttingManager.getCuttingSection(0);
    const newPos = new Point3(newMatrix.m[12], newMatrix.m[13], newMatrix.m[14]);
    cuttingSection.updatePlane(
      0,
      Plane.createFromPointAndNormal(newPos, plane.normal),
      newMatrix,
      true,
      true
    );
  }
  async _onHandleRotate(plane, handlePosition, initialMatrix, newMatrix, handleEventEnd) {
    const newPlaneMatrix = newMatrix.copy();
    const axisNormal = plane.normal.copy();
    initialMatrix.setTranslationComponent(0, 0, 0);
    initialMatrix = initialMatrix.inverseAndDeterminant()[0];
    newMatrix.setTranslationComponent(0, 0, 0);
    const rotationMatrix = Matrix.multiply(initialMatrix, newMatrix);
    const newNormal = rotationMatrix.transform(axisNormal);
    const newPlane = new Plane().setFromPointAndNormal(handlePosition, newNormal);
    const cuttingSection = this._viewer.cuttingManager.getCuttingSection(0);
    if (cuttingSection === null) {
      return;
    }
    await cuttingSection.updatePlane(0, newPlane, newPlaneMatrix, handleEventEnd, true);
  }
}
class CustomCuttingExample {
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._initEvents();
      this._viewer.start();
    });
  }
  _initEvents() {
    const operatorManager = this._viewer.operatorManager;
    const operatorId = operatorManager.registerCustomOperator(
      new CustomCuttingOperator(this._viewer, (plane) => {
        CustomCuttingExample.updateValues(plane);
      })
    );
    operatorManager.push(operatorId);
  }
  static updateValues(plane) {
    let x = "-";
    let y = "-";
    let z = "-";
    let d = "-";
    if (plane !== null) {
      const c = plane.getCoefficients();
      x = `${c[0] * -c[3]}`;
      y = `${c[1] * -c[3]}`;
      z = `${c[2] * -c[3]}`;
      d = `${c[3]}`;
    }
    document.getElementById("planeInfo").innerHTML = `x: ${x}<br />
                 y: ${y}<br />
                 z: ${z}<br />
                 d: ${d}`;
  }
}
window.onload = function() {
  const customCuttingExample = new CustomCuttingExample();
  customCuttingExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
