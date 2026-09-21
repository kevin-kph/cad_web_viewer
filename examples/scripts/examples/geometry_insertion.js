import { C as Color, c as Point2, K as KeyCode, i as PickConfig, j as SelectionMask, f as Matrix, e as MeshInstanceData, d as MeshData, F as FaceWinding, n as EmptyModelName, G as Camera } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { h as hexToRgb } from "../utils.js";
var GeometryOperatorMode = /* @__PURE__ */ ((GeometryOperatorMode2) => {
  GeometryOperatorMode2[GeometryOperatorMode2["Insert"] = 0] = "Insert";
  GeometryOperatorMode2[GeometryOperatorMode2["Select"] = 1] = "Select";
  return GeometryOperatorMode2;
})(GeometryOperatorMode || {});
class GeometryInsertionOperator {
  constructor(viewer) {
    this._geometryStyle = 0;
    this._geometryColor = Color.green();
    this._lineColor = Color.green();
    this._pointColor = Color.green();
    this._geometrySize = 1;
    this._cubeCount = 1;
    this._operatorMode = 0;
    this._cubeMeshes = [];
    this._isActivated = false;
    this._ptDown = Point2.zero();
    this._geometryMap = {};
    this._viewer = viewer;
  }
  setGeometryOperatorMode(operatorMode) {
    this._operatorMode = operatorMode;
  }
  getGeometryOperatorMode() {
    return this._operatorMode;
  }
  setGeometrySize(geometrySize) {
    this._geometrySize = geometrySize;
  }
  setGeometryColor(geometryColor) {
    this._geometryColor.assign(geometryColor);
  }
  setLineColor(lineColor) {
    this._lineColor.assign(lineColor);
  }
  setPointColor(pointColor) {
    this._pointColor.assign(pointColor);
  }
  setGeometryStyle(geometryStyle) {
    this._geometryStyle = geometryStyle;
  }
  onActivate() {
    if (!this._isActivated) {
      this._initOperator();
      this._isActivated = true;
    }
  }
  onMouseDown(event) {
    this._ptDown.assign(event.getPosition());
  }
  onMouseUp(event) {
    const position = event.getPosition();
    if (position.equals(this._ptDown)) {
      if (this._operatorMode === 0) this._insertModeMouseUp(event);
      else this._selectModeMouseUp(event);
    }
  }
  onKeyUp(event) {
    if (this._operatorMode === 1 && (event.getKeyCode() === KeyCode.Delete || event.getKeyCode() === KeyCode.Backspace)) {
      const partIds = [];
      const selection = this._viewer.selectionManager;
      selection.each((selectionItem) => {
        partIds.push(selectionItem.getNodeId());
      });
      if (partIds.length > 0) {
        this._viewer.model.deleteMeshInstances(partIds).then(() => {
          selection.clear();
        });
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
  onDeactivate() {
  }
  onViewOrientationChange() {
  }
  stopInteraction() {
  }
  _insertModeMouseUp(event) {
    const config = new PickConfig(SelectionMask.All);
    this._viewer.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
      if (selectionItem.isEntitySelection()) {
        this._insertGeometry(selectionItem.getPosition());
      }
    });
  }
  _selectModeMouseUp(event) {
    const config = new PickConfig(SelectionMask.All);
    this._viewer.view.pickFromPoint(event.getPosition(), config).then((selection) => {
      if (selection.isNodeSelection()) {
        const nodeId = selection.getNodeId();
        if (this._geometryMap.hasOwnProperty(nodeId.toString())) {
          if (event.shiftDown()) this._viewer.selectionManager.add(selection);
          else this._viewer.selectionManager.set(selection);
        } else {
          this._viewer.selectionManager.clear();
        }
      } else {
        this._viewer.selectionManager.clear();
      }
    });
  }
  _insertGeometry(position) {
    const matrix = new Matrix();
    matrix.setTranslationComponent(position.x, position.y, position.z);
    matrix.setScaleComponent(this._geometrySize, this._geometrySize, this._geometrySize);
    const meshInstanceData = new MeshInstanceData(
      this._cubeMeshes[this._geometryStyle],
      matrix,
      `cube${this._cubeCount}`,
      this._geometryColor,
      this._lineColor,
      this._pointColor
    );
    this._viewer.model.createMeshInstance(meshInstanceData).then((nodeId) => {
      this._geometryMap[nodeId] = null;
      ++this._cubeCount;
    });
  }
  _createCubeMesh() {
    const meshData = new MeshData();
    meshData.setFaceWinding(FaceWinding.Clockwise);
    const vertices = [
      //front
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0,
      0.5,
      -0.5,
      0,
      0.5,
      //back
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0,
      -0.5,
      0.5,
      0,
      -0.5,
      //top
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
      0.5,
      //bottom
      -0.5,
      0,
      -0.5,
      0.5,
      0,
      0.5,
      0.5,
      0,
      -0.5,
      -0.5,
      0,
      -0.5,
      -0.5,
      0,
      0.5,
      0.5,
      0,
      0.5,
      //left
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0,
      0.5,
      -0.5,
      0,
      -0.5,
      //right
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0,
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0,
      -0.5,
      0.5,
      0,
      0.5
    ];
    const normals = [
      //front
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
      1,
      //back
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
      //top
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
      0,
      //bottom
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
      //left
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
      //right
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
    ];
    const points = [
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0,
      0.5,
      -0.5,
      0,
      0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0,
      -0.5,
      -0.5,
      0,
      -0.5
    ];
    const polylines = [
      [
        -0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        0,
        0.5,
        -0.5,
        0,
        0.5,
        -0.5,
        0.5,
        0.5
      ],
      [
        0.5,
        0.5,
        0.5,
        0.5,
        0.5,
        -0.5,
        0.5,
        0,
        -0.5,
        0.5,
        0,
        0.5,
        0.5,
        0.5,
        0.5
      ],
      [
        -0.5,
        0.5,
        -0.5,
        0.5,
        0.5,
        -0.5,
        0.5,
        0,
        -0.5,
        -0.5,
        0,
        -0.5,
        -0.5,
        0.5,
        -0.5
      ],
      [
        -0.5,
        0.5,
        0.5,
        -0.5,
        0.5,
        -0.5,
        -0.5,
        0,
        -0.5,
        -0.5,
        0,
        0.5,
        -0.5,
        0.5,
        0.5
      ]
    ];
    meshData.addFaces(vertices, normals);
    for (let i = 0; i < polylines.length; i++) meshData.addPolyline(polylines[i]);
    this._viewer.model.createMesh(meshData).then((meshId) => {
      this._cubeMeshes[
        0
        /* FacesAndLines */
      ] = meshId;
    });
    meshData.clear();
    meshData.addFaces(vertices, normals);
    this._viewer.model.createMesh(meshData).then((meshId) => {
      this._cubeMeshes[
        1
        /* FacesOnly */
      ] = meshId;
    });
    meshData.clear();
    for (let i = 0; i < polylines.length; i++) meshData.addPolyline(polylines[i]);
    this._viewer.model.createMesh(meshData).then((meshId) => {
      this._cubeMeshes[
        2
        /* LinesOnly */
      ] = meshId;
    });
    meshData.clear();
    meshData.addPoints(points);
    this._viewer.model.createMesh(meshData).then((meshId) => {
      this._cubeMeshes[
        3
        /* Points */
      ] = meshId;
    });
  }
  _initOperator() {
    this._createCubeMesh();
  }
}
class GeometryInsertionExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._geometryInsertionOperator = new GeometryInsertionOperator(this._viewer);
      this._geometryInsertionOperatorId = this._viewer.registerCustomOperator(
        this._geometryInsertionOperator
      );
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      modelStructureReady: () => {
        this._createGroundPlane();
        this._viewer.view.setBackfacesVisible(true);
        this._viewer.operatorManager.set(this._geometryInsertionOperatorId, 1);
        this._setDefaultCamera();
      }
    });
    const geometrySize = document.getElementById("geometrySize");
    geometrySize.onchange = () => {
      this._geometryInsertionOperator.setGeometrySize(parseFloat(geometrySize.value));
    };
    const geometryColor = document.getElementById("geometryColor");
    geometryColor.onchange = () => {
      this._geometryInsertionOperator.setGeometryColor(hexToRgb(geometryColor.value));
    };
    const lineColor = document.getElementById("lineColor");
    lineColor.onchange = () => {
      this._geometryInsertionOperator.setLineColor(hexToRgb(lineColor.value));
    };
    const pointColor = document.getElementById("pointColor");
    pointColor.onchange = () => {
      this._geometryInsertionOperator.setPointColor(hexToRgb(pointColor.value));
    };
    const geometryStyle = document.getElementById("geometryStyle");
    geometryStyle.onchange = () => {
      this._geometryInsertionOperator.setGeometryStyle(parseInt(geometryStyle.value, 10));
    };
    const operatorMode = document.getElementById("operatorMode");
    operatorMode.onchange = () => {
      this._geometryInsertionOperator.setGeometryOperatorMode(parseInt(operatorMode.value, 10));
      this._updateOperatorInfo();
      this._viewer.focusInput(true);
    };
  }
  _createGroundPlane() {
    const vertices = [
      -10,
      0,
      -10,
      10,
      0,
      -10,
      -10,
      0,
      10,
      10,
      0,
      -10,
      10,
      0,
      10,
      -10,
      0,
      10
    ];
    const normals = [
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
    ];
    const meshData = new MeshData();
    meshData.setFaceWinding(FaceWinding.Clockwise);
    meshData.setBackfacesEnabled(true);
    meshData.addFaces(vertices, normals);
    return this._viewer.model.createMesh(meshData).then((meshId) => {
      const meshInstanceData = new MeshInstanceData(
        meshId,
        new Matrix(),
        "ground_plane",
        new Color(100, 100, 100)
      );
      return this._viewer.model.createMeshInstance(meshInstanceData);
    });
  }
  _updateOperatorInfo() {
    this._setVisibilityForClass("operator-div", false);
    const geometryOperatorMode = this._geometryInsertionOperator.getGeometryOperatorMode();
    switch (geometryOperatorMode) {
      case GeometryOperatorMode.Insert:
        this._setVisibilityForClass("mode-insert", true);
        break;
      case GeometryOperatorMode.Select:
        this._setVisibilityForClass("mode-select", true);
        break;
    }
  }
  _setVisibilityForClass(classname, visibility) {
    const divCollection = document.getElementsByClassName(classname);
    for (let i = 0; i < divCollection.length; i++) {
      const element = divCollection.item(i);
      if (visibility) element.style.display = "block";
      else element.style.display = "none";
    }
  }
  _setDefaultCamera() {
    const camera = Camera.fromJson({
      position: {
        x: -52.28544191222306,
        y: 30.375034352867626,
        z: -43.30020720545756
      },
      target: {
        x: 0,
        y: 0,
        z: 0
      },
      up: {
        x: 0.2925608607258902,
        y: 0.9122622698500181,
        z: 0.2866804733137907
      },
      width: 29.749132671538106,
      height: 29.749132671538106,
      projection: 0,
      nearLimit: 0.01,
      className: "Camera"
    });
    this._viewer.view.setCamera(camera);
  }
}
window.onload = function() {
  const geometryInsertionExample = new GeometryInsertionExample();
  geometryInsertionExample.start({
    containerId: "viewerContainer",
    model: EmptyModelName
  });
};
