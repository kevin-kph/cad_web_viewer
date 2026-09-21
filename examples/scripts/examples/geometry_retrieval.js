import { C as Color, n as EmptyModelName, O as OperatorId, o as OrbitFallbackMode, d as MeshData, F as FaceWinding, e as MeshInstanceData } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class GeometryRetrievalExample {
  constructor() {
    this._faceColor = new Color(64, 64, 255);
    this._lineColor = new Color(64, 255, 64);
    this._pointColor = new Color(255, 64, 64);
    this._inProgress = false;
    this._destMeshId = null;
    this._destNodeId = null;
  }
  start(sourceViewerOptions, destViewerContainerId) {
    Promise.all([
      // create source viewer with requested model
      new Promise((resolve, reject) => {
        createViewer(sourceViewerOptions).then(
          (viewer) => {
            this._sourceViewer = viewer;
            viewer.setCallbacks({ modelStructureReady: resolve });
            viewer.start();
          },
          (error) => {
            reject(error);
          }
        );
      }),
      // create destination viewer with empty model
      new Promise((resolve, reject) => {
        const destinationViewerOptions = {
          containerId: destViewerContainerId,
          model: EmptyModelName
        };
        createViewer(destinationViewerOptions).then(
          (viewer) => {
            this._destViewer = viewer;
            const orbitOperator = viewer.operatorManager.getOperator(OperatorId.Orbit);
            orbitOperator.setOrbitFallbackMode(OrbitFallbackMode.CameraTarget);
            viewer.setCallbacks({ modelStructureReady: resolve });
            viewer.start();
          },
          (error) => {
            reject(error);
          }
        );
      })
    ]).then(() => {
      this._sourceViewer.setCallbacks({
        selectionArray: (events) => {
          if (this._inProgress) {
            return;
          }
          for (const event of events) {
            const selection = event.getSelection();
            if (selection.isNodeSelection()) {
              const model = this._sourceViewer.model;
              const nodeId = selection.getNodeId();
              if (model.isNodeLoaded(nodeId)) {
                model.getNodeMeshData(nodeId).then((data) => {
                  this._onSourceSelection(data);
                });
              }
            }
          }
        }
      });
    });
  }
  _onSourceSelection(sourceData) {
    const destData = new MeshData();
    destData.setManifold(sourceData.isManifold);
    destData.setBackfacesEnabled(sourceData.isTwoSided);
    if (sourceData.winding === "clockwise") {
      destData.setFaceWinding(FaceWinding.Clockwise);
    } else if (sourceData.winding === "counterClockwise") {
      destData.setFaceWinding(FaceWinding.CounterClockwise);
    } else {
      destData.setFaceWinding(FaceWinding.Unknown);
    }
    for (const elementGroup of [sourceData.faces, sourceData.lines, sourceData.points]) {
      for (let elementIndex = 0; elementIndex < elementGroup.elementCount; ++elementIndex) {
        const element = elementGroup.element(elementIndex);
        if (elementGroup === sourceData.lines) {
          let linePositions = [];
          const lineFilters = [
            (v1, v2) => {
              linePositions = [
                v1.position[0],
                v1.position[1],
                v1.position[2],
                v2.position[0],
                v2.position[1],
                v2.position[2]
              ];
            }
          ];
          let lineColors;
          if (elementGroup.hasRGBAs) {
            lineFilters.push((v1, v2) => {
              lineColors = [
                v1.RGBA[0],
                v1.RGBA[1],
                v1.RGBA[2],
                v1.RGBA[3],
                v2.RGBA[0],
                v2.RGBA[1],
                v2.RGBA[2],
                v2.RGBA[3]
              ];
            });
          }
          for (const vertexIter = element.iterate(); !vertexIter.done(); ) {
            const v1 = vertexIter.next();
            const v2 = vertexIter.next();
            for (const lineFilter of lineFilters) {
              lineFilter(v1, v2);
            }
            destData.addPolyline(linePositions, lineColors, element.bits);
          }
        } else {
          let positionIndex = 0;
          const positions = new Float32Array(element.vertexCount * 3);
          const filters = [
            (v) => {
              for (let i = 0; i < 3; ++i) {
                positions[positionIndex++] = v.position[i];
              }
            }
          ];
          let normals;
          if (elementGroup.hasNormals) {
            let normalIndex = 0;
            normals = new Float32Array(element.vertexCount * 3);
            filters.push((v) => {
              for (let i = 0; i < 3; ++i) {
                normals[normalIndex++] = v.normal[i];
              }
            });
          }
          let colors;
          if (elementGroup.hasRGBAs) {
            let colorIndex = 0;
            colors = new Uint8Array(element.vertexCount * 4);
            filters.push((v) => {
              for (let i = 0; i < 4; ++i) {
                colors[colorIndex++] = v.RGBA[i];
              }
            });
          }
          let uvs;
          if (elementGroup.hasUVs) {
            let uvIndex = 0;
            uvs = new Float32Array(element.vertexCount * 2);
            filters.push((v) => {
              for (let i = 0; i < 2; ++i) {
                uvs[uvIndex++] = v.UV[i];
              }
            });
          }
          for (const vertexIter = element.iterate(); !vertexIter.done(); ) {
            const vertex = vertexIter.next();
            for (const filter of filters) {
              filter(vertex);
            }
          }
          if (elementGroup === sourceData.faces) {
            destData.addFaces(positions, normals, colors, uvs, element.bits);
          } else if (elementGroup === sourceData.points) {
            destData.addPoints(positions, colors, element.bits);
          }
        }
      }
    }
    this._destViewer.pauseRendering();
    this._inProgress = true;
    const destModel = this._destViewer.model;
    if (this._destNodeId !== null) {
      destModel.deleteMeshInstances([this._destNodeId]);
    }
    if (this._destMeshId !== null) {
      destModel.deleteMeshes([this._destMeshId]);
    }
    destModel.createMesh(destData).then((meshId) => {
      this._destMeshId = meshId;
      const instanceData = new MeshInstanceData(meshId);
      instanceData.setFaceColor(this._faceColor);
      instanceData.setLineColor(this._lineColor);
      instanceData.setPointColor(this._pointColor);
      return destModel.createMeshInstance(instanceData);
    }).then((nodeId) => {
      this._destNodeId = nodeId;
      return this._destViewer.view.fitWorld(0);
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      this._inProgress = false;
      this._destViewer.resumeRendering();
    });
  }
}
window.onload = function() {
  const geometryRetrievalExample = new GeometryRetrievalExample();
  geometryRetrievalExample.start(
    {
      containerId: "sourceContainer",
      model: "microengine"
    },
    "destContainer"
  );
};
