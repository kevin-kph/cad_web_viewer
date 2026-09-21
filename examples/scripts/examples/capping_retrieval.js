import { C as Color, n as EmptyModelName, O as OperatorId, o as OrbitFallbackMode, p as Axis, b as Plane, P as Point3, V as ViewOrientation, d as MeshData, F as FaceWinding, e as MeshInstanceData } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class CappingRetrievalExample {
  constructor() {
    this._faceColor = new Color(64, 64, 255);
    this._lineColor = new Color(64, 255, 64);
    this._pointColor = new Color(255, 64, 64);
    this._destMeshIds = [];
    this._destNodeIds = [];
  }
  async start(sourceViewerOptions, destViewerContainerId) {
    this._sourceViewer = await createViewer(sourceViewerOptions);
    this._sourceViewer.start();
    const destinationViewerOptions = {
      containerId: destViewerContainerId,
      model: EmptyModelName
    };
    this._destViewer = await createViewer(destinationViewerOptions);
    const orbitOperator = this._destViewer.operatorManager.getOperator(OperatorId.Orbit);
    orbitOperator.setOrbitFallbackMode(OrbitFallbackMode.CameraTarget);
    this._destViewer.start();
    this._sourceViewer.setCallbacks({
      cappingIdle: async (isIdle) => {
        if (isIdle) {
          await this._updateDestModel();
        }
      },
      modelStructureReady: async () => {
        await this._sourceViewer.waitForIdle();
        const bounding = await this._sourceViewer.model.getModelBounding(true, true);
        const axis = Axis.X;
        const position = bounding.center();
        const referenceGeometry = this._sourceViewer.cuttingManager.createReferenceGeometryFromAxis(
          axis,
          bounding
        );
        const plane = Plane.createFromPointAndNormal(position, new Point3(1, 0, 0));
        const cuttingSection = this._sourceViewer.cuttingManager.getCuttingSection(0);
        cuttingSection.addPlane(plane, referenceGeometry);
        await cuttingSection.activate();
        await this._sourceViewer.cuttingManager.enableCappingIdleCallback(true);
      }
    });
  }
  async _updateDestModel() {
    const destModel = this._destViewer.model;
    const cappedNodes = await this._sourceViewer.cuttingManager.getNodesWithCapping();
    const cappingData = [];
    for (const node of cappedNodes) {
      const cappingDatum = await this._getCappingData(node);
      cappingData.push(cappingDatum);
    }
    if (this._destNodeIds.length !== 0) {
      destModel.deleteMeshInstances(this._destNodeIds);
      this._destNodeIds = [];
    }
    if (this._destMeshIds.length !== 0) {
      destModel.deleteMeshes(this._destMeshIds);
      this._destMeshIds = [];
    }
    this._destViewer.pauseRendering();
    const addMeshPromises = cappingData.map(
      (cappingDatum) => this._addMeshToDest(cappingDatum.meshData, cappingDatum.matrix)
    );
    this._destViewer.resumeRendering();
    this._destViewer.view.setBackfacesVisible(true);
    this._destViewer.view.setViewOrientation(ViewOrientation.Front, 0);
    await Promise.all(addMeshPromises);
    this._destViewer.view.fitWorld();
  }
  async _getCappingData(node) {
    const model = this._sourceViewer.model;
    const geom = await model.getNodeCappingMeshData(node);
    const mat = model.getNodeNetMatrix(node);
    return {
      meshData: geom,
      matrix: mat
    };
  }
  async _addMeshToDest(sourceData, sourceMatrix) {
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
          const lineFormatters = [
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
            lineFormatters.push((v1, v2) => {
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
            for (const lineFilter of lineFormatters) {
              lineFilter(v1, v2);
            }
            destData.addPolyline(linePositions, lineColors, element.bits);
          }
        } else {
          let positionIndex = 0;
          const positions = new Float32Array(element.vertexCount * 3);
          const formatters = [
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
            formatters.push((v) => {
              for (let i = 0; i < 3; ++i) {
                normals[normalIndex++] = v.normal[i];
              }
            });
          }
          let colors;
          if (elementGroup.hasRGBAs) {
            let colorIndex = 0;
            colors = new Uint8Array(element.vertexCount * 4);
            formatters.push((v) => {
              for (let i = 0; i < 4; ++i) {
                colors[colorIndex++] = v.RGBA[i];
              }
            });
          }
          let uvs;
          if (elementGroup.hasUVs) {
            let uvIndex = 0;
            uvs = new Float32Array(element.vertexCount * 2);
            formatters.push((v) => {
              for (let i = 0; i < 2; ++i) {
                uvs[uvIndex++] = v.UV[i];
              }
            });
          }
          for (const vertexIter = element.iterate(); !vertexIter.done(); ) {
            const vertex = vertexIter.next();
            for (const filter of formatters) {
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
    const destModel = this._destViewer.model;
    const meshId = await destModel.createMesh(destData);
    this._destMeshIds.push(meshId);
    const instanceData = new MeshInstanceData(meshId);
    instanceData.setFaceColor(this._faceColor);
    instanceData.setLineColor(this._lineColor);
    instanceData.setPointColor(this._pointColor);
    instanceData.setMatrix(sourceMatrix);
    const nodeId = await destModel.createMeshInstance(instanceData);
    this._destNodeIds.push(nodeId);
  }
}
window.onload = function() {
  const cappingRetrievalExample = new CappingRetrievalExample();
  cappingRetrievalExample.start(
    {
      containerId: "sourceContainer",
      model: "microengine"
    },
    "destContainer"
  );
};
