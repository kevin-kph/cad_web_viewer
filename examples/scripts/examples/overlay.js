import { d as MeshData, e as MeshInstanceData, G as Camera, P as Point3, Y as Projection, ap as OverlayAnchor, aq as MeshInstanceCreationFlags, F as FaceWinding, c as Point2, i as PickConfig, j as SelectionMask, V as ViewOrientation } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
const _OverlayPanel = class _OverlayPanel {
  constructor(viewer, element, name) {
    this._viewer = viewer;
    this._element = element;
    this._name = name;
    this._index = _OverlayPanel._overlayIndex++;
    this._init();
  }
  _getChildByClass(panel, className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      let parent = element.parentElement;
      while (parent) {
        if (parent.id === panel.id) return element;
        parent = parent.parentElement;
      }
    }
    return null;
  }
  _init() {
    const panel = document.getElementById("panel-template").cloneNode(true);
    panel.id = `panel-${this._name}`;
    this._element.appendChild(panel);
    const nameElement = this._getChildByClass(panel, "overlay-name");
    nameElement.innerHTML = this._name;
    const enabledElement = this._getChildByClass(panel, "overlay-enabled");
    enabledElement.onchange = () => {
      if (enabledElement.checked) this.enable();
      else this.disable();
    };
    const applyButton = this._getChildByClass(panel, "overlay-apply");
    applyButton.onclick = () => {
      this.apply();
    };
  }
  apply() {
    const anchorElement = this._getChildByClass(
      this._element,
      "overlay-anchor"
    );
    const xPos = this._getChildByClass(this._element, "overlay-x-pos");
    const xUnit = this._getChildByClass(this._element, "overlay-x-unit");
    const yPos = this._getChildByClass(this._element, "overlay-y-pos");
    const yUnit = this._getChildByClass(this._element, "overlay-y-unit");
    const width = this._getChildByClass(this._element, "overlay-width");
    const widthUnit = this._getChildByClass(
      this._element,
      "overlay-width-unit"
    );
    const height = this._getChildByClass(this._element, "overlay-height");
    const heightUnit = this._getChildByClass(
      this._element,
      "overlay-height-unit"
    );
    this._viewer.overlayManager.setViewport(
      this._index,
      parseInt(anchorElement.value, 10),
      parseFloat(xPos.value),
      parseInt(xUnit.value, 10),
      parseFloat(yPos.value),
      parseInt(yUnit.value, 10),
      parseFloat(width.value),
      parseInt(widthUnit.value, 10),
      parseFloat(height.value),
      parseInt(heightUnit.value, 10)
    );
  }
  enable() {
    this.apply();
    this._viewer.overlayManager.setVisibility(this._index, true);
  }
  disable() {
    this._viewer.overlayManager.setVisibility(this._index, false);
  }
};
_OverlayPanel._overlayIndex = 1;
let OverlayPanel = _OverlayPanel;
class TriadPanel extends OverlayPanel {
  constructor(viewer, element, name) {
    super(viewer, element, name);
    this._triadId = 0;
  }
  _init() {
    super._init();
    this._viewer.setCallbacks({
      camera: () => {
        this._onCameraUpdate();
      }
    });
    this._setDefaults();
    this.enable();
    this._createTriad();
  }
  _createTriad() {
    const model = this._viewer.model;
    const meshData = new MeshData();
    meshData.addPolyline(
      [0, 0, 0, 1, 0, 0],
      new Uint8Array([255, 0, 0, 255, 255, 0, 0, 255])
    );
    meshData.addPolyline(
      [0, 0, 0, 0, 1, 0],
      new Uint8Array([0, 255, 0, 255, 0, 255, 0, 255])
    );
    meshData.addPolyline(
      [0, 0, 0, 0, 0, 1],
      new Uint8Array([0, 0, 255, 255, 0, 0, 255, 255])
    );
    model.createMesh(meshData).then((meshId) => {
      const meshInstanceData = new MeshInstanceData(meshId);
      model.createMeshInstance(meshInstanceData).then((instanceId) => {
        this._triadId = instanceId;
        this._viewer.overlayManager.addNodes(this._index, [this._triadId]);
        this._onCameraUpdate();
      });
    });
    const camera = new Camera();
    camera.setPosition(new Point3(0, 0.5, 5));
    camera.setTarget(Point3.zero());
    camera.setUp(new Point3(0, 1, 0));
    camera.setProjection(Projection.Orthographic);
    this._viewer.overlayManager.setCamera(this._index, camera);
  }
  _setDefaults() {
    const anchorElement = this._getChildByClass(
      this._element,
      "overlay-anchor"
    );
    anchorElement.value = OverlayAnchor.LowerLeftCorner.toString();
    const xPos = this._getChildByClass(this._element, "overlay-x-pos");
    xPos.value = "10";
    const yPos = this._getChildByClass(this._element, "overlay-y-pos");
    yPos.value = "10";
    const width = this._getChildByClass(this._element, "overlay-width");
    width.value = "50";
    const height = this._getChildByClass(this._element, "overlay-height");
    height.value = "50";
  }
  _onCameraUpdate() {
    const viewMatrix = this._viewer.view.getViewMatrix();
    viewMatrix.m[3] = 0;
    viewMatrix.m[7] = 0;
    viewMatrix.m[11] = 0;
    viewMatrix.m[12] = 0;
    viewMatrix.m[13] = 0;
    viewMatrix.m[14] = 0;
    viewMatrix.m[15] = 1;
    this._viewer.model.setNodeMatrix(this._triadId, viewMatrix);
  }
}
class CubeOperator {
  constructor(webViewer, overlayId) {
    this._downPoint = null;
    this._viewer = webViewer;
    this._overlayId = overlayId;
  }
  onMouseDown(event) {
    this._downPoint = event.getPosition();
  }
  async onMouseUp(event) {
    const currentPoint = event.getPosition();
    if (this._downPoint != null) {
      const distanceSquared = Point2.subtract(this._downPoint, currentPoint).squaredLength();
      if (distanceSquared < 25) {
        const pickResult = await this._viewer.view.pickFromPoint(
          event.getPosition(),
          new PickConfig(SelectionMask.All)
        );
        if (pickResult != null && pickResult.overlayIndex() === this._overlayId) {
          this._onSelection(pickResult);
        }
      }
    }
    this._downPoint = null;
  }
  _onSelection(selection) {
    if (selection.isFaceSelection()) {
      const faceId = selection.getFaceEntity().getCadFaceIndex();
      const view = this._viewer.view;
      switch (faceId) {
        case 0:
          view.setViewOrientation(ViewOrientation.Back);
          break;
        case 1:
          view.setViewOrientation(ViewOrientation.Front);
          break;
        case 2:
          view.setViewOrientation(ViewOrientation.Bottom);
          break;
        case 3:
          view.setViewOrientation(ViewOrientation.Top);
          break;
        case 4:
          view.setViewOrientation(ViewOrientation.Left);
          break;
        case 5:
          view.setViewOrientation(ViewOrientation.Right);
          break;
      }
    }
  }
  onMouseMove(_event) {
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
}
class CubePanel extends OverlayPanel {
  constructor(viewer, element, name) {
    super(viewer, element, name);
    this._cubeId = 0;
    const operatorId = viewer.operatorManager.registerCustomOperator(
      new CubeOperator(viewer, this._index)
    );
    viewer.operatorManager.push(operatorId);
  }
  _init() {
    super._init();
    this._viewer.setCallbacks({
      camera: () => {
        this._onCameraUpdate();
      }
    });
    this._setDefaults();
    this.enable();
    this._createCube();
  }
  _setDefaults() {
    const anchorElement = this._getChildByClass(
      this._element,
      "overlay-anchor"
    );
    anchorElement.value = OverlayAnchor.UpperRightCorner.toString();
    const xPos = this._getChildByClass(this._element, "overlay-x-pos");
    xPos.value = "10";
    const yPos = this._getChildByClass(this._element, "overlay-y-pos");
    yPos.value = "10";
    const width = this._getChildByClass(this._element, "overlay-width");
    width.value = "100";
    const height = this._getChildByClass(this._element, "overlay-height");
    height.value = "100";
  }
  _onCameraUpdate() {
    const viewMatrix = this._viewer.view.getViewMatrix();
    viewMatrix.m[3] = 0;
    viewMatrix.m[7] = 0;
    viewMatrix.m[11] = 0;
    viewMatrix.m[12] = 0;
    viewMatrix.m[13] = 0;
    viewMatrix.m[14] = 0;
    viewMatrix.m[15] = 1;
    this._viewer.model.setNodeMatrix(this._cubeId, viewMatrix);
  }
  _createCube() {
    const model = this._viewer.model;
    const meshData = this._createCubeMesh();
    model.createMesh(meshData).then((meshId) => {
      const meshInstanceData = new MeshInstanceData(meshId);
      meshInstanceData.setCreationFlags(MeshInstanceCreationFlags.DoNotLight);
      model.createMeshInstance(meshInstanceData).then((instanceId) => {
        this._cubeId = instanceId;
        this._viewer.overlayManager.addNodes(this._index, [this._cubeId]);
        this._onCameraUpdate();
      });
    });
    const camera = new Camera();
    camera.setPosition(new Point3(0, 0, 10));
    camera.setWidth(2);
    camera.setHeight(2);
    camera.setTarget(Point3.zero());
    camera.setUp(new Point3(0, 1, 0));
    camera.setProjection(Projection.Orthographic);
    this._viewer.overlayManager.setCamera(this._index, camera);
  }
  // prettier-ignore
  _createCubeMesh() {
    const meshData = new MeshData();
    meshData.setFaceWinding(FaceWinding.Clockwise);
    meshData.addFaces([
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5
    ], [
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0
    ], new Uint8Array([
      241,
      66,
      244,
      255,
      241,
      66,
      244,
      255,
      241,
      66,
      244,
      255,
      241,
      66,
      244,
      255,
      241,
      66,
      244,
      255,
      241,
      66,
      244,
      255
    ]));
    meshData.addFaces([
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5
    ], [
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0
    ], new Uint8Array([
      51,
      24,
      7,
      255,
      54,
      24,
      7,
      255,
      51,
      24,
      7,
      255,
      51,
      24,
      7,
      255,
      54,
      24,
      7,
      255,
      51,
      24,
      7,
      255
    ]));
    meshData.addFaces([
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5
    ], [
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1
    ], new Uint8Array([
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255,
      0,
      255
    ]));
    meshData.addFaces([
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5
    ], [
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1
    ], new Uint8Array([
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255
    ]));
    meshData.addFaces([
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0.5
    ], [
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0
    ], new Uint8Array([
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      255,
      255,
      255,
      0,
      255
    ]));
    meshData.addFaces([
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0.5
    ], [
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0
    ], new Uint8Array([
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255,
      0,
      0,
      255,
      255
    ]));
    return meshData;
  }
}
class StaticPanel extends OverlayPanel {
  constructor(viewer, element, name) {
    super(viewer, element, name);
  }
  _init() {
    super._init();
    this._setDefaults();
    this.enable();
    this._create();
  }
  _setDefaults() {
    const anchorElement = this._getChildByClass(
      this._element,
      "overlay-anchor"
    );
    anchorElement.value = OverlayAnchor.LowerRightCorner.toString();
    const xPos = this._getChildByClass(this._element, "overlay-x-pos");
    xPos.value = "10";
    const yPos = this._getChildByClass(this._element, "overlay-y-pos");
    yPos.value = "10";
    const width = this._getChildByClass(this._element, "overlay-width");
    width.value = "500";
    const height = this._getChildByClass(this._element, "overlay-height");
    height.value = "30";
  }
  _create() {
    const model = this._viewer.model;
    const meshData = this._createStatic();
    model.createMesh(meshData).then((meshId) => {
      const meshInstanceData = new MeshInstanceData(meshId);
      meshInstanceData.setCreationFlags(MeshInstanceCreationFlags.DoNotLight);
      model.createMeshInstance(meshInstanceData).then((instanceId) => {
        this._viewer.overlayManager.addNodes(this._index, [instanceId]);
      });
    });
    const camera = new Camera();
    camera.setPosition(new Point3(0, 0, 1));
    camera.setWidth(2);
    camera.setHeight(2);
    camera.setTarget(Point3.zero());
    camera.setUp(new Point3(0, 1, 0));
    camera.setProjection(Projection.Orthographic);
    this._viewer.overlayManager.setCamera(this._index, camera);
  }
  // prettier-ignore
  _createStatic() {
    const meshData = new MeshData();
    meshData.setFaceWinding(FaceWinding.Clockwise);
    meshData.addFaces(
      [
        -1,
        0.5,
        0,
        0,
        0.5,
        0,
        -1,
        -0.5,
        0,
        0,
        0.5,
        0,
        0,
        -0.5,
        0,
        -1,
        -0.5,
        0,
        0,
        0.5,
        0,
        1,
        0.5,
        0,
        0,
        -0.5,
        0,
        1,
        0.5,
        0,
        1,
        -0.5,
        0,
        0,
        -0.5,
        0
      ],
      [
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1,
        0,
        0,
        -1
      ],
      new Uint8Array([
        0,
        0,
        255,
        255,
        0,
        255,
        0,
        255,
        0,
        0,
        255,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        255,
        0,
        0,
        255,
        255,
        0,
        255,
        0,
        255,
        255,
        0,
        0,
        255,
        0,
        255,
        0,
        255,
        255,
        0,
        0,
        255,
        255,
        0,
        0,
        255,
        0,
        255,
        0,
        255
      ])
    );
    return meshData;
  }
}
class OverlayExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._viewer.setCallbacks({
        modelStructureReady: () => {
          this._createPanels();
        }
      });
      this._viewer.start();
    });
  }
  _createPanels() {
    new TriadPanel(this._viewer, document.getElementById("triad"), "triad");
    new CubePanel(this._viewer, document.getElementById("cube"), "cube");
    new StaticPanel(
      this._viewer,
      document.getElementById("static"),
      "static"
    );
    this._viewer.resizeCanvas();
  }
}
window.onload = function() {
  const overlayExample = new OverlayExample();
  overlayExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
