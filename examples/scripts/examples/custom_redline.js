import { R as RedlineItem, P as Point3, q as Polygon, c as Point2, r as RedlineOperator, C as Color } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { V as ViewPanel } from "../ViewPanel.js";
import { p as pointInTriangle2d, a as pointOnLineSegment2d, g as getCameraPlaneIntersectionPoint, h as hexToRgb } from "../utils.js";
const _RedlineTriangle = class _RedlineTriangle extends RedlineItem {
  constructor(viewer) {
    super(viewer);
    this._position = Point3.zero();
    this._sizePosition = Point3.zero();
    this._dragPosition = Point3.zero();
    this._polygon = new Polygon();
    this._polygon.setStrokeWidth(2);
  }
  setPosition(position) {
    this._position.assign(position);
  }
  getPosition() {
    return this._position.copy();
  }
  setSizePosition(position) {
    this._sizePosition.assign(position);
  }
  getSizePosition() {
    return this._sizePosition.copy();
  }
  _update() {
    const view = this._viewer.view;
    const screenPosition = Point2.fromPoint3(view.projectPoint(this._position));
    const screenSizePosition = Point2.fromPoint3(view.projectPoint(this._sizePosition));
    const size = Point2.distance(screenPosition, screenSizePosition);
    const p0 = new Point2(0, -2).scale(size).add(screenPosition);
    const p1 = new Point2(2, 1).scale(size).add(screenPosition);
    const p2 = new Point2(-2, 1).scale(size).add(screenPosition);
    this._polygon.clearPoints();
    this._polygon.pushPoint(p0);
    this._polygon.pushPoint(p1);
    this._polygon.pushPoint(p2);
    this._polygon.pushPoint(p0);
  }
  draw() {
    this._update();
    const renderer = this._viewer.markupManager.getRenderer();
    renderer.drawPolygon(this._polygon);
  }
  // display settings
  setStrokeColor(color) {
    this._polygon.setStrokeColor(color);
  }
  getStrokeColor() {
    return this._polygon.getStrokeColor();
  }
  setFillColor(color) {
    this._polygon.setFillColor(color);
  }
  getFilleColor() {
    return this._polygon.getFillColor();
  }
  setFilled(filled) {
    if (filled) this._polygon.setFillOpacity(1);
    else this._polygon.setFillOpacity(0);
  }
  getFilled() {
    return this._polygon.getFillOpacity() === 1;
  }
  // selection methods
  onSelect() {
    this._polygon.setStrokeWidth(4);
  }
  onDeselect() {
    this._polygon.setStrokeWidth(2);
  }
  hit(position) {
    this._update();
    const points = this._polygon.getPoints();
    if (this.getFilled()) {
      return pointInTriangle2d(position, points[0], points[1], points[2]);
    } else {
      const strokeWidth = this._polygon.getStrokeWidth();
      return pointOnLineSegment2d(position, points[0], points[1], strokeWidth) || pointOnLineSegment2d(position, points[1], points[2], strokeWidth) || pointOnLineSegment2d(position, points[0], points[2], strokeWidth);
    }
  }
  // dragging methods
  onDragStart(screenPosition) {
    const view = this._viewer.view;
    const worldPosition = getCameraPlaneIntersectionPoint(view.getCamera(), screenPosition, view);
    if (worldPosition !== null) {
      this._dragPosition = worldPosition;
    }
    return true;
  }
  onDragMove(position) {
    const view = this._viewer.view;
    const newDragPosition = getCameraPlaneIntersectionPoint(view.getCamera(), position, view);
    if (newDragPosition !== null) {
      const delta = Point3.subtract(newDragPosition, this._dragPosition);
      this._position.add(delta);
      this._sizePosition.add(delta);
      this._dragPosition.assign(newDragPosition);
    }
    return true;
  }
  onDragEnd(position) {
    return false;
  }
  // serialization methods
  getClassName() {
    return _RedlineTriangle.className;
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return {
      position: this._position.toJson(),
      sizePosition: this._sizePosition.toJson(),
      strokeColor: this._polygon.getStrokeColor().toJson(),
      fillColor: this._polygon.getFillColor().toJson(),
      filled: this.getFilled()
    };
  }
  /**
   * Creates a new [[RedlineTriangle]] from an object given by [[toJson]].
   * @param An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(obj, viewer) {
    const redlineTriangle = new _RedlineTriangle(viewer);
    redlineTriangle.setPosition(obj.position);
    redlineTriangle.setSizePosition(obj.sizePosition);
    redlineTriangle.setStrokeColor(obj.strokeColor);
    redlineTriangle.setFillColor(obj.fillColor);
    redlineTriangle.setFilled(obj.filled);
    return redlineTriangle;
  }
};
_RedlineTriangle.className = "Example.RedlineTriangle";
let RedlineTriangle = _RedlineTriangle;
class RedlineTriangleOperator extends RedlineOperator {
  constructor() {
    super(...arguments);
    this._redlineTriangle = null;
    this._previewHandle = null;
    this._defaultStrokeColor = Color.black();
    this._defaultFillColor = Color.black();
    this._defaultFilled = false;
  }
  createRedlineItem(position) {
    const view = this._viewer.view;
    this._redlineTriangle = new RedlineTriangle(this._viewer);
    const cameraPoint = getCameraPlaneIntersectionPoint(view.getCamera(), position, view);
    if (cameraPoint !== null) {
      this._redlineTriangle.setPosition(cameraPoint);
      this._redlineTriangle.setSizePosition(cameraPoint);
    }
    this._redlineTriangle.setStrokeColor(this._defaultStrokeColor);
    this._redlineTriangle.setFillColor(this._defaultFillColor);
    this._redlineTriangle.setFilled(this._defaultFilled);
    this._previewHandle = this._viewer.markupManager.registerMarkup(this._redlineTriangle, view);
    return this._redlineTriangle;
  }
  updateRedlineItem(position) {
    if (this._redlineTriangle) {
      const view = this._viewer.view;
      const cameraPoint = getCameraPlaneIntersectionPoint(view.getCamera(), position, view);
      if (cameraPoint !== null) {
        this._redlineTriangle.setSizePosition(cameraPoint);
        this._viewer.markupManager.refreshMarkup(view);
      }
    }
  }
  finalizeRedlineItem(position) {
    const redlineTriangle = this._redlineTriangle;
    if (this._redlineTriangle !== null) {
      this._redlineTriangle = null;
    }
    if (this._previewHandle !== null) {
      this._viewer.markupManager.unregisterMarkup(this._previewHandle, this._viewer.view);
    }
    return redlineTriangle;
  }
  setDefaultStrokeColor(color) {
    this._defaultStrokeColor.assign(color);
  }
  setDefaultFillColor(color) {
    this._defaultFillColor.assign(color);
  }
  setDefaultFilled(filled) {
    this._defaultFilled = filled;
  }
}
class CustomRedlineExample {
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._viewPanel = new ViewPanel("viewPanel", this._viewer);
      this._redlineTriangleOperator = new RedlineTriangleOperator(this._viewer, this._viewer.view);
      this._bindEvents();
      this._viewer.markupManager.registerMarkupFactory(
        RedlineTriangle.className,
        RedlineTriangle.fromJson
      );
      this._redlineTriangleOperatorId = this._viewer.registerCustomOperator(
        this._redlineTriangleOperator
      );
      return this._viewer.start();
    });
  }
  _activateCustomTriangleOperator() {
    return this._viewer.operatorManager.push(this._redlineTriangleOperatorId);
  }
  _deactivateCustomTriangleOperator() {
    const manager = this._viewer.operatorManager;
    if (manager.peek() === this._redlineTriangleOperatorId) {
      manager.pop();
    }
  }
  _serializeSelectedView() {
    const selectedView = this._viewPanel.getSelectedViewUniqueId();
    if (selectedView) {
      const outputText = document.getElementById("outputText");
      const markupManager = this._viewer.markupManager;
      const markupView = markupManager.getMarkupView(selectedView);
      console.assert(markupView !== null);
      const markupData = {
        views: [markupView.toJson()]
      };
      outputText.value = JSON.stringify(markupData);
    }
  }
  _setDefaultStrokeColor() {
    const defaultColor = document.getElementById("defaultStrokeColor");
    const rgb = hexToRgb(defaultColor.value);
    this._redlineTriangleOperator.setDefaultStrokeColor(rgb);
  }
  _setDefaultFillColor() {
    const defaultColor = document.getElementById("defaultFillColor");
    const rgb = hexToRgb(defaultColor.value);
    this._redlineTriangleOperator.setDefaultFillColor(rgb);
  }
  _setDefaultFilled() {
    const defaultFilled = document.getElementById("defaultFilled");
    this._redlineTriangleOperator.setDefaultFilled(defaultFilled.checked);
  }
  _loadMarkup() {
    const inputText = document.getElementById("inputText");
    const markupManager = this._viewer.markupManager;
    return markupManager.loadMarkupData(inputText.value);
  }
  _bindEvents() {
    let element = document.getElementById("activateCustomTriangleOperator");
    element.onclick = () => {
      this._activateCustomTriangleOperator();
    };
    element = document.getElementById("deactivateCustomTriangleOperator");
    element.onclick = () => {
      this._deactivateCustomTriangleOperator();
    };
    element = document.getElementById("serializeSelected");
    element.onclick = () => {
      this._serializeSelectedView();
    };
    element = document.getElementById("loadMarkup");
    element.onclick = () => {
      this._loadMarkup();
    };
    element = document.getElementById("defaultStrokeColor");
    element.onchange = () => {
      this._setDefaultStrokeColor();
    };
    element = document.getElementById("defaultFillColor");
    element.onchange = () => {
      this._setDefaultFillColor();
    };
    element = document.getElementById("defaultFilled");
    element.onchange = () => {
      this._setDefaultFilled();
    };
  }
}
window.onload = function() {
  const customRedlineExample = new CustomRedlineExample();
  customRedlineExample.start({
    containerId: "viewerContainer",
    serverEndpoint: "SC_CSR_SERVICE_ENDPOINT",
    model: "microengine"
  });
};
