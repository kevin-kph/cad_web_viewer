import { M as MarkupItem, l as CircleCollection, m as LineCollection, c as Point2, P as Point3 } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { h as hexToRgb } from "../utils.js";
class BoundingBoxMarkup extends MarkupItem {
  constructor(viewer) {
    super();
    this._box = null;
    this._boxVertices = new CircleCollection();
    this._boxVertexSize = 1;
    this._boxWires = new LineCollection();
    this._viewer = viewer;
  }
  setVertexSize(vertexSize) {
    this._boxVertexSize = vertexSize;
    this._viewer.markupManager.refreshMarkup(this._viewer.view);
  }
  setWireWidth(wireWidth) {
    this._boxWires.setStrokeWidth(wireWidth);
    this._viewer.markupManager.refreshMarkup(this._viewer.view);
  }
  draw() {
    if (!this._box) {
      return;
    }
    this._update();
    const renderer = this._viewer.markupManager.getRenderer();
    renderer.drawCircles(this._boxVertices);
    renderer.drawLines(this._boxWires);
  }
  setBox(box) {
    this._box = box.copy();
  }
  clearBox() {
    this._box = null;
  }
  setBoxColor(color) {
    this._boxVertices.setFillColor(color);
    this._boxVertices.setStrokeColor(color);
    this._boxWires.setStrokeColor(color);
    this._viewer.markupManager.refreshMarkup(this._viewer.view);
  }
  _update() {
    this._boxVertices.clear();
    this._boxWires.clear();
    if (this._box === null) {
      return;
    }
    const view = this._viewer.view;
    const vertices = [];
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.min.x, this._box.max.y, this._box.max.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.max.x, this._box.max.y, this._box.max.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.max.x, this._box.min.y, this._box.max.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.min.x, this._box.min.y, this._box.max.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.min.x, this._box.max.y, this._box.min.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.max.x, this._box.max.y, this._box.min.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.max.x, this._box.min.y, this._box.min.z))
      )
    );
    vertices.push(
      Point2.fromPoint3(
        view.projectPoint(new Point3(this._box.min.x, this._box.min.y, this._box.min.z))
      )
    );
    for (const vertex of vertices) {
      this._boxVertices.addCircle(vertex, this._boxVertexSize);
    }
    this._boxWires.addLine(vertices[0], vertices[1]);
    this._boxWires.addLine(vertices[1], vertices[2]);
    this._boxWires.addLine(vertices[2], vertices[3]);
    this._boxWires.addLine(vertices[3], vertices[0]);
    this._boxWires.addLine(vertices[4], vertices[5]);
    this._boxWires.addLine(vertices[5], vertices[6]);
    this._boxWires.addLine(vertices[6], vertices[7]);
    this._boxWires.addLine(vertices[7], vertices[4]);
    this._boxWires.addLine(vertices[0], vertices[4]);
    this._boxWires.addLine(vertices[1], vertices[5]);
    this._boxWires.addLine(vertices[2], vertices[6]);
    this._boxWires.addLine(vertices[3], vertices[7]);
  }
}
class BoundingBoxExample {
  constructor() {
    this._boundingBoxMarkupHandle = null;
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._boundingBoxMarkup = new BoundingBoxMarkup(this._viewer);
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      selectionArray: (events) => {
        for (const event of events) {
          this._onSelection(event);
        }
      }
    });
    let element = document.getElementById("boxColor");
    element.onchange = () => {
      this._onBoxColorChange();
    };
    element = document.getElementById("pointSize");
    element.onchange = () => {
      this._onPointSizeChange();
    };
    element = document.getElementById("wireWidth");
    element.onchange = () => {
      this._onWireWidthChange();
    };
  }
  _onSelection(event) {
    const markupManager = this._viewer.markupManager;
    const model = this._viewer.model;
    const selection = event.getSelection();
    if (selection.isNodeSelection()) {
      const partId = selection.getNodeId();
      if (model.isNodeLoaded(partId)) {
        model.getNodesBounding([partId]).then((boundingBox) => {
          this._boundingBoxMarkup.setBox(boundingBox);
          this._boundingBoxMarkupHandle = markupManager.registerMarkup(
            this._boundingBoxMarkup,
            this._viewer.view
          );
        });
      }
    } else {
      this._boundingBoxMarkup.clearBox();
      if (this._boundingBoxMarkupHandle !== null) {
        markupManager.unregisterMarkup(this._boundingBoxMarkupHandle, this._viewer.view);
      }
    }
  }
  _onBoxColorChange() {
    const element = document.getElementById("boxColor");
    const color = hexToRgb(element.value);
    this._boundingBoxMarkup.setBoxColor(color);
  }
  _onPointSizeChange() {
    const element = document.getElementById("pointSize");
    this._boundingBoxMarkup.setVertexSize(parseInt(element.value, 10));
  }
  _onWireWidthChange() {
    const element = document.getElementById("wireWidth");
    this._boundingBoxMarkup.setWireWidth(parseInt(element.value, 10));
  }
}
window.onload = function() {
  const boundingBoxExample = new BoundingBoxExample();
  boundingBoxExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
