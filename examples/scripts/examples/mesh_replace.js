import { d as MeshData, F as FaceWinding } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class MeshReplaceExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    this._viewer.setCallbacks({
      modelStructureReady: () => {
        this._squareMeshData = this._createSquareMeshData();
        this._circleMeshData = this._createCircleMeshData(20, 10);
        this._viewer.view.setBackfacesVisible(true);
        document.getElementById("replaceWithCircle").onclick = () => {
          this._replaceSelectedMeshData(this._circleMeshData);
        };
        document.getElementById("replaceWithSquare").onclick = () => {
          this._replaceSelectedMeshData(this._squareMeshData);
        };
      }
    });
  }
  _replaceSelectedMeshData(meshData) {
    const selectionItem = this._viewer.selectionManager.getResult(0);
    if (selectionItem !== null) {
      const id = selectionItem.getNodeId();
      this._viewer.model.getMeshIds([id]).then((meshIds) => {
        this._viewer.model.replaceMesh(meshIds[0], meshData);
      });
    }
  }
  _createSquareMeshData() {
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
    return meshData;
  }
  _createCircleMeshData(pointCount, radius) {
    if (pointCount < 3) pointCount = 3;
    const pointCountPlus1 = pointCount + 1;
    const deltaAngle = 2 * Math.PI / pointCount;
    const vertices = [];
    for (let i = 0, angle = 0; i < pointCountPlus1; ++i, angle += deltaAngle) {
      vertices.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    const faces = [];
    for (let i = 2; i < vertices.length; ++i) {
      Array.prototype.push.apply(faces, vertices[0]);
      Array.prototype.push.apply(faces, vertices[i - 1]);
      Array.prototype.push.apply(faces, vertices[i]);
    }
    const lines = [], points = [];
    for (let i = 0; i < vertices.length; ++i) {
      Array.prototype.push.apply(lines, vertices[i]);
      Array.prototype.push.apply(points, vertices[i]);
    }
    Array.prototype.push.apply(lines, vertices[0]);
    const meshData = new MeshData();
    meshData.addFaces(faces);
    meshData.addPolyline(lines);
    meshData.addPoints(points);
    meshData.setBackfacesEnabled(true);
    return meshData;
  }
}
window.onload = function() {
  const meshReplaceExample = new MeshReplaceExample();
  meshReplaceExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
