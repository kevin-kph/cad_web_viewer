import { P as Point3, b as Plane, M as MarkupItem, L as Line, T as TextBox, E as EndcapType, c as Point2, d as MeshData, e as MeshInstanceData, f as Matrix, C as Color, g as Circle, h as Polyline, B as Button, i as PickConfig, j as SelectionMask } from "../WebViewer.js";
/* empty css        */
import { c as createViewer, O as OperatorInfo } from "../index.js";
class AnnotationRegistry {
  constructor(viewer) {
    this._annotationMap = {};
    this._viewer = viewer;
    this._table = document.getElementById("AnnotationRegistry");
  }
  addAnnotation(markupHandle, annotation) {
    this._annotationMap[markupHandle] = annotation;
    const tr = document.createElement("tr");
    tr.id = markupHandle;
    const handletd = document.createElement("td");
    handletd.innerText = markupHandle;
    tr.appendChild(handletd);
    const nametd = document.createElement("td");
    nametd.id = `${markupHandle}-name`;
    nametd.innerText = annotation.getLabel();
    tr.appendChild(nametd);
    const actionstd = document.createElement("td");
    const renameButton = document.createElement("button");
    renameButton.innerText = "Rename";
    renameButton.onclick = () => {
      this._renameAnnotation(markupHandle);
    };
    actionstd.appendChild(renameButton);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => {
      this._deleteAnnotation(markupHandle);
    };
    actionstd.appendChild(deleteButton);
    tr.appendChild(actionstd);
    this._table.appendChild(tr);
  }
  _renameAnnotation(markupHandle) {
    const annotation = this._annotationMap[markupHandle];
    const newMarkupName = prompt(
      `Enter a new name for ${annotation.getLabel()}`,
      annotation.getLabel()
    );
    if (newMarkupName !== null) {
      annotation.setLabel(newMarkupName);
      this._viewer.markupManager.refreshMarkup(this._viewer.view);
      document.getElementById(`${markupHandle}-name`).innerText = newMarkupName;
    }
  }
  _deleteAnnotation(markupHandle) {
    this._viewer.markupManager.unregisterMarkup(markupHandle, this._viewer.view);
    delete this._annotationMap[markupHandle];
    const element = document.getElementById(markupHandle);
    element.parentElement.removeChild(element);
  }
}
class AnnotationOperatorBase {
  constructor(viewer, annotationRegistry) {
    this._previousAnchorPlaneDragPoint = null;
    this._activeMarkup = null;
    this._viewer = viewer;
    this._annotationRegistry = annotationRegistry;
  }
  _startDraggingAnnotation(annotation, downPosition) {
    this._activeMarkup = annotation;
    this._previousAnchorPlaneDragPoint = this._getDragPointOnAnchorPlane(downPosition);
  }
  _selectAnnotation(selectPoint) {
    const markup = this._viewer.markupManager.pickMarkupItem(selectPoint, this._viewer.view);
    if (markup) {
      this._activeMarkup = markup;
      this._previousAnchorPlaneDragPoint = this._getDragPointOnAnchorPlane(selectPoint);
      return true;
    } else {
      return false;
    }
  }
  onMouseMove(event) {
    if (this._activeMarkup) {
      const currentAnchorPlaneDragPoint = this._getDragPointOnAnchorPlane(event.getPosition());
      let dragDelta;
      if (currentAnchorPlaneDragPoint !== null && this._previousAnchorPlaneDragPoint !== null) {
        dragDelta = Point3.subtract(
          currentAnchorPlaneDragPoint,
          this._previousAnchorPlaneDragPoint
        );
      } else {
        dragDelta = Point3.zero();
      }
      const newAnchorPos = this._activeMarkup.getTextBoxAnchor().add(dragDelta);
      this._activeMarkup.setTextBoxAnchor(newAnchorPos);
      this._previousAnchorPlaneDragPoint = currentAnchorPlaneDragPoint;
      this._viewer.markupManager.refreshMarkup(this._viewer.view);
      event.setHandled(true);
    }
  }
  onMouseUp(event) {
    this._activeMarkup = null;
    this._previousAnchorPlaneDragPoint = null;
  }
  onMouseDown(_event) {
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
  _getDragPointOnAnchorPlane(screenPoint) {
    if (this._activeMarkup === null) {
      return null;
    }
    const anchor = this._activeMarkup.getLeaderLineAnchor();
    const camera = this._viewer.view.getCamera();
    const normal = Point3.subtract(camera.getPosition(), anchor).normalize();
    const anchorPlane = Plane.createFromPointAndNormal(anchor, normal);
    const raycast = this._viewer.view.raycastFromPoint(screenPoint);
    if (raycast === null) {
      return null;
    }
    const intersectionPoint = Point3.zero();
    if (anchorPlane.intersectsRay(raycast, intersectionPoint)) {
      return intersectionPoint;
    } else {
      return null;
    }
  }
}
class AnnotationMarkup extends MarkupItem {
  constructor(viewer, anchorPoint, label) {
    super();
    this._leaderLine = new Line();
    this._textBox = new TextBox();
    this._viewer = viewer;
    this._leaderAnchor = anchorPoint.copy();
    this._textBoxAnchor = anchorPoint.copy();
    this._textBox.setTextString(label);
    this._leaderLine.setStartEndcapType(EndcapType.Arrowhead);
  }
  draw() {
    this._behindView = false;
    const view = this._viewer.view;
    const leaderPoint3d = view.projectPoint(this._leaderAnchor);
    const boxAnchor3d = view.projectPoint(this._textBoxAnchor);
    if (leaderPoint3d.z <= 0) this._behindView = true;
    if (boxAnchor3d.z <= 0) this._behindView = true;
    const leaderPoint2d = Point2.fromPoint3(leaderPoint3d);
    const boxAnchor2d = Point2.fromPoint3(boxAnchor3d);
    this._leaderLine.set(leaderPoint2d, boxAnchor2d);
    this._textBox.setPosition(boxAnchor2d);
    const renderer = this._viewer.markupManager.getRenderer();
    renderer.drawLine(this._leaderLine);
    renderer.drawTextBox(this._textBox);
  }
  hit(point) {
    const measurement = this._viewer.markupManager.getRenderer().measureTextBox(this._textBox);
    const position = this._textBox.getPosition();
    if (point.x < position.x) return false;
    if (point.x > position.x + measurement.x) return false;
    if (point.y < position.y) return false;
    if (point.y > position.y + measurement.y) return false;
    return true;
  }
  getLeaderLineAnchor() {
    return this._leaderAnchor.copy();
  }
  getTextBoxAnchor() {
    return this._textBoxAnchor;
  }
  setTextBoxAnchor(newAnchorPoint) {
    this._textBoxAnchor.assign(newAnchorPoint);
  }
  setLabel(label) {
    this._textBox.setTextString(label);
  }
  getLabel() {
    return this._textBox.getTextString();
  }
}
class IndicationMarkup extends AnnotationMarkup {
  constructor(viewer, label, point) {
    super(viewer, point, label);
    this._meshId = null;
    this._instanceId = null;
    this._points = [];
    this._isFinalized = false;
  }
  _getMinPointCount() {
    throw new Error("Unimplemented");
  }
  _generateGeometry() {
    throw new Error("Unimplemented");
  }
  addPoint(_point, _normal) {
    throw new Error("Unimplemented");
  }
  remove() {
    if (this._instanceId !== null) {
      this._viewer.model.deleteMeshInstances([this._instanceId]);
    }
    if (this._meshId !== null) {
      this._viewer.model.deleteMeshes([this._meshId]);
    }
  }
  draw() {
    this._behindView = false;
    if (!this._isFinalized) {
      const view = this._viewer.view;
      if (this._points.length === 1) {
        const circle = new Circle();
        const point3d = view.projectPoint(this._points[0]);
        circle.set(Point2.fromPoint3(point3d), 2);
        if (point3d.z <= 0) this._behindView = true;
        if (!this._behindView) this._viewer.markupManager.getRenderer().drawCircle(circle);
      } else {
        const polyline = new Polyline();
        for (const point of this._points) {
          const point3d = view.projectPoint(point);
          polyline.pushPoint(Point2.fromPoint3(point3d));
          if (point3d.z <= 0) this._behindView = true;
        }
        if (!this._behindView) this._viewer.markupManager.getRenderer().drawPolyline(polyline);
      }
    } else {
      super.draw();
    }
  }
  finalize() {
    if (this._points.length + 1 >= this._getMinPointCount()) {
      this._generateGeometry();
      this._viewer.markupManager.refreshMarkup(this._viewer.view);
      this._isFinalized = true;
    }
    return this._isFinalized;
  }
}
class PolygonIndication extends IndicationMarkup {
  constructor(viewer, label, point, normal) {
    super(viewer, label, point);
    this._normals = [];
    this.addPoint(point, normal);
  }
  addPoint(point, normal) {
    if (point && normal) {
      this._points.push(point.copy());
      this._normals.push(normal.copy());
    }
  }
  _getMinPointCount() {
    return 3;
  }
  _generateGeometry() {
    const model = this._viewer.model;
    const meshData = new MeshData();
    const vertexData = [];
    const normalData = [];
    for (let i = 2; i < this._points.length; i++) {
      this._pushGeometryPoint(0, vertexData, normalData);
      this._pushGeometryPoint(i - 1, vertexData, normalData);
      this._pushGeometryPoint(i, vertexData, normalData);
    }
    meshData.addFaces(vertexData, normalData);
    return model.createMesh(meshData).then((meshId) => {
      this._meshId = meshId;
      const instanceData = new MeshInstanceData(
        this._meshId,
        new Matrix(),
        this.getLabel(),
        Color.black()
      );
      return model.createMeshInstance(instanceData, void 0, true).then((nodeId) => {
        this._instanceId = nodeId;
      });
    });
  }
  _pushGeometryPoint(index, vertexData, normalData) {
    vertexData.push(this._points[index].x);
    vertexData.push(this._points[index].y);
    vertexData.push(this._points[index].z);
    normalData.push(this._normals[index].x);
    normalData.push(this._normals[index].y);
    normalData.push(this._normals[index].z);
  }
}
class LineIndication extends IndicationMarkup {
  constructor(viewer, label, point) {
    super(viewer, label, point);
    this._points.push(point.copy());
  }
  _getMinPointCount() {
    return 2;
  }
  addPoint(point, _normal) {
    this._points.push(point.copy());
  }
  _generateGeometry() {
    const model = this._viewer.model;
    const meshData = new MeshData();
    const pointList = [];
    for (let i = 1; i < this._points.length; i++) {
      pointList.push(this._points[i - 1].x);
      pointList.push(this._points[i - 1].y);
      pointList.push(this._points[i - 1].z);
      pointList.push(this._points[i].x);
      pointList.push(this._points[i].y);
      pointList.push(this._points[i].z);
    }
    meshData.addPolyline(pointList);
    return model.createMesh(meshData).then((meshId) => {
      this._meshId = meshId;
      const instanceData = new MeshInstanceData(
        meshId,
        new Matrix(),
        this.getLabel(),
        Color.black(),
        Color.black()
      );
      return model.createMeshInstance(instanceData, void 0, true).then((nodeId) => {
        this._instanceId = nodeId;
      });
    });
  }
}
class IndicationOperator extends AnnotationOperatorBase {
  constructor() {
    super(...arguments);
    this._indicationCount = 1;
    this._activeIndication = null;
    this._activeIndicationHandle = null;
    this._indicationMode = 0;
  }
  setIndicationMode(mode) {
    this._indicationMode = mode;
  }
  onMouseDown(event) {
    if (this._selectAnnotation(event.getPosition())) return;
    const button = event.getButton();
    if (button === Button.Left) this._processLeftClick(event);
    else if (button === Button.Right) this._processRightClick();
  }
  onDeactivate() {
    if (this._activeIndicationHandle !== null) {
      this._viewer.markupManager.unregisterMarkup(this._activeIndicationHandle, this._viewer.view);
    }
    this._activeIndication = null;
    this._activeIndicationHandle = null;
  }
  _processRightClick() {
    if (this._activeIndication === null || this._activeIndicationHandle === null) {
      return;
    }
    const finalized = this._activeIndication.finalize();
    if (finalized) {
      this._annotationRegistry.addAnnotation(this._activeIndicationHandle, this._activeIndication);
    } else {
      this._viewer.markupManager.unregisterMarkup(this._activeIndicationHandle, this._viewer.view);
    }
    this._activeIndication = null;
    this._activeIndicationHandle = null;
  }
  _processLeftClick(event) {
    const config = new PickConfig(SelectionMask.Face);
    this._viewer.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
      if (selectionItem.isEntitySelection()) {
        const selectionPosition = this._adjustPoint(selectionItem);
        const markupManager = this._viewer.markupManager;
        if (this._indicationMode === 0) {
          const faceEntity = selectionItem.getFaceEntity();
          if (faceEntity !== null) {
            if (this._activeIndication) {
              this._activeIndication.addPoint(selectionPosition, faceEntity.getNormal());
              markupManager.refreshMarkup(this._viewer.view);
            } else {
              this._activeIndication = new PolygonIndication(
                this._viewer,
                `Indication ${this._indicationCount++}`,
                selectionPosition,
                faceEntity.getNormal()
              );
              this._activeIndicationHandle = markupManager.registerMarkup(
                this._activeIndication,
                this._viewer.view
              );
            }
          }
        } else {
          if (this._activeIndication) {
            this._activeIndication.addPoint(selectionItem.getPosition());
            markupManager.refreshMarkup(this._viewer.view);
          } else {
            this._activeIndication = new LineIndication(
              this._viewer,
              `Indication ${this._indicationCount++}`,
              selectionPosition
            );
            this._activeIndicationHandle = markupManager.registerMarkup(
              this._activeIndication,
              this._viewer.view
            );
          }
        }
      }
    });
  }
  _adjustPoint(selectionItem) {
    const position = selectionItem.getPosition();
    if (selectionItem.isFaceSelection()) {
      const nudge = selectionItem.getFaceEntity().getNormal().scale(0.1);
      position.add(nudge);
    }
    return position;
  }
}
class AnnotationOperator extends AnnotationOperatorBase {
  constructor() {
    super(...arguments);
    this._annotationCount = 1;
  }
  onMouseDown(event) {
    const downPosition = event.getPosition();
    if (!this._selectAnnotation(downPosition)) {
      const config = new PickConfig(SelectionMask.Face);
      this._viewer.view.pickFromPoint(downPosition, config).then((selectionItem) => {
        const selectionPosition = selectionItem.getPosition();
        if (selectionPosition) {
          const annotationMarkup = new AnnotationMarkup(
            this._viewer,
            selectionPosition,
            `Annotation ${this._annotationCount++}`
          );
          const markupHandle = this._viewer.markupManager.registerMarkup(
            annotationMarkup,
            this._viewer.view
          );
          this._annotationRegistry.addAnnotation(markupHandle, annotationMarkup);
          this._startDraggingAnnotation(annotationMarkup, downPosition);
        }
      });
    }
  }
}
class AnnotationExample {
  constructor() {
    this._operators = {};
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._annotationRegistry = new AnnotationRegistry(this._viewer);
      this._initEvents();
      this._initOperators();
      this._viewer.start();
    });
  }
  _initEvents() {
    const customOperatorSelect = document.getElementById(
      "customOperatorSelect"
    );
    customOperatorSelect.onchange = () => {
      this._activateOperator(customOperatorSelect.value);
    };
    const indicationSelector = document.getElementById("indicationSelector");
    indicationSelector.onchange = () => {
      const indicationOperator = this._operators["IndicationOperator"].operator;
      indicationOperator.setIndicationMode(parseInt(indicationSelector.value, 10));
    };
    this._viewer.setCallbacks({
      sceneReady: () => {
        this._viewer.view.setBackfacesVisible(true);
      }
    });
  }
  _activateOperator(operatorName) {
    this._viewer.operatorManager.set(this._operators[operatorName].id, 1);
    const instructions = document.getElementsByClassName("instructions");
    for (let i = 0; i < instructions.length; i++) {
      const element2 = instructions.item(i);
      element2.style.display = "none";
    }
    const element = document.getElementsByName(operatorName).item(0);
    element.style.display = "block";
  }
  _initOperators() {
    const annotationOperator = new AnnotationOperator(this._viewer, this._annotationRegistry);
    const annotationInfo = new OperatorInfo(
      "AnnotationOperator",
      this._viewer.registerCustomOperator(annotationOperator),
      annotationOperator
    );
    this._operators[annotationInfo.name] = annotationInfo;
    const indicationOperator = new IndicationOperator(this._viewer, this._annotationRegistry);
    const indicationInfo = new OperatorInfo(
      "IndicationOperator",
      this._viewer.registerCustomOperator(indicationOperator),
      indicationOperator
    );
    this._operators[indicationInfo.name] = indicationInfo;
    this._viewer.operatorManager.set(annotationInfo.id, 1);
  }
}
window.onload = function() {
  const annotationExample = new AnnotationExample();
  annotationExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
