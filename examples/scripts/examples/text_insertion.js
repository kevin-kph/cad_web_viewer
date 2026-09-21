import { b as Plane, B as Button, P as Point3, y as ImageFormat, aq as MeshInstanceCreationFlags, f as Matrix, d as MeshData, F as FaceWinding, e as MeshInstanceData, C as Color, i as PickConfig, j as SelectionMask } from "../WebViewer.js";
/* empty css        */
import { h as hexToRgb } from "../utils.js";
import { c as createViewer } from "../index.js";
class ArrayPngImage {
  constructor(buffer, w, h) {
    this.buffer = buffer;
    this.width = w;
    this.height = h;
  }
}
function createTextCanvas(textSettings) {
  const ctx = document.createElement("canvas").getContext("2d");
  if (ctx === null) throw new Error("Unable to create canvas element");
  const borderPad = Math.max(Math.round(textSettings.textFontSize / 2), 1);
  const height = textSettings.textFontSize + borderPad;
  const fontSpec = `${textSettings.textFontSize}px ${textSettings.textFont}`;
  const maxCanvasWidth = 2048;
  ctx.font = fontSpec;
  const textMetrics = ctx.measureText(textSettings.text);
  const width = Math.min(Math.round(textMetrics.width + borderPad + 0.5), maxCanvasWidth);
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  if (textSettings.transparentBackground) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  } else {
    ctx.fillStyle = textSettings.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  ctx.font = fontSpec;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textSettings.textColor;
  ctx.fillText(textSettings.text, width / 2, height / 2);
  return ctx.canvas;
}
async function canvasToPngArray(canvas) {
  const blob = await new Promise((resolve) => {
    canvas.toBlob((blob2) => {
      resolve(blob2);
    }, "text/png");
  });
  if (blob === null) {
    throw new Error("canvas.toBlob() failed");
  }
  const pngArray = await new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(new Uint8Array(fr.result));
    };
    fr.readAsArrayBuffer(blob);
  });
  return pngArray;
}
async function createPngImageFromText(textSettings) {
  const canvas = createTextCanvas(textSettings);
  const buffer = await canvasToPngArray(createTextCanvas(textSettings));
  const image = new ArrayPngImage(buffer, canvas.width, canvas.height);
  return image;
}
class TextBoxItem {
  constructor(boxId, leaderLineId, sourcePosition, boxMatrix, width, height, worldHeight, isScreenOriented, isSuppressCameraScale) {
    this.boxId = 0;
    this.leaderLineId = 0;
    this.sourcePosition = new Point3(0, 0, 0);
    this.boxPosition = new Point3(0, 0, 0);
    this.boxMatrix = new Matrix();
    this.width = 0;
    this.height = 0;
    this.worldHeight = 0;
    this.isScreenOriented = false;
    this.isSuppressCameraScale = false;
    this.boxId = boxId;
    this.leaderLineId = leaderLineId;
    this.sourcePosition = sourcePosition;
    this.boxMatrix = boxMatrix;
    this.width = width;
    this.height = height;
    this.worldHeight = worldHeight;
    this.isScreenOriented = isScreenOriented;
    this.isSuppressCameraScale = isSuppressCameraScale;
  }
}
class TextSettings {
  constructor() {
    this.text = "";
    this.textFontSize = 64;
    this.textFontDisplaySize = 64;
    this.textColor = "#FFFFFF";
    this.textFont = "monospace";
    this.showBorder = true;
    this.borderColor = "#FFFFFF";
    this.screenOriented = true;
    this.useMipmaps = false;
    this.suppressCameraScale = true;
    this.transparentBackground = true;
    this.backgroundColor = "#FFFFFF";
  }
}
class TextInsertionOperator {
  constructor(viewer) {
    this._textSettings = new TextSettings();
    this._selecting = false;
    this._selectMovePlane = new Plane();
    this._viewer = viewer;
    this._selectTextBox = null;
    this._textBoxes = /* @__PURE__ */ new Map();
    this._viewer.setCallbacks({
      camera: () => {
        this._onCameraChanged();
      }
    });
  }
  async clearAll() {
    this._textBoxes.forEach(async (textBox, boxNodeId) => {
      await this._viewer.model.deleteNode(boxNodeId);
      await this._viewer.model.deleteNode(textBox.leaderLineId);
    });
  }
  setInsertionText(insertionText) {
    this._textSettings.text = insertionText;
  }
  setTextFontSize(size) {
    this._textSettings.textFontSize = size;
  }
  setTextFontDisplaySize(size) {
    this._textSettings.textFontDisplaySize = size;
  }
  setTextColor(color) {
    this._textSettings.textColor = color;
  }
  setTextFont(font) {
    this._textSettings.textFont = font;
  }
  setScreenOriented(isScreenOriented) {
    this._textSettings.screenOriented = isScreenOriented;
  }
  setUseMipmaps(isUseMipmaps) {
    this._textSettings.useMipmaps = isUseMipmaps;
  }
  setSuppressCameraScale(isSuppressCameraScale) {
    this._textSettings.suppressCameraScale = isSuppressCameraScale;
  }
  setShowBorder(drawIt) {
    this._textSettings.showBorder = drawIt;
  }
  setBorderColor(color) {
    this._textSettings.borderColor = color;
  }
  setBackgroundColor(color) {
    this._textSettings.backgroundColor = color;
  }
  setTransparentBackground(xp) {
    this._textSettings.transparentBackground = xp;
  }
  /**
   * Initiate a selection, and either start the creation or moving of an existing text box.
   */
  onMouseDown(event) {
    if (event.getButton() === Button.Left) {
      this._startSelection(event);
    }
  }
  /**
   * Either move the selected text box, or allow the rotation
   */
  onMouseMove(event) {
    if (this._selecting) {
      event.setHandled(true);
      if (this._selectTextBox !== null) {
        const newBoxPosition = this._getPositionOnSelectPlane(event.getPosition());
        if (newBoxPosition !== null) {
          this._moveTextBoxTo(this._selectTextBox, newBoxPosition);
        }
      }
    }
  }
  /**
   * Clear out the selection/move state
   */
  onMouseUp(event) {
    if (this._selecting) {
      event.setHandled(true);
      this._selecting = false;
      this._selectTextBox = null;
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
  /**
   *  Calculates a height for the text box based on the model extents
   */
  async _calculateTextBoxHeight(suppressCameraScale) {
    const textScreenHeight = this._textSettings.textFontDisplaySize;
    const viewerHeight = this._viewer.view.getCanvasSize().y;
    let textWorldHeight;
    if (suppressCameraScale) {
      textWorldHeight = textScreenHeight / viewerHeight;
    } else {
      const modelBounding = await this._viewer.model.getModelBounding(true, false);
      const worldHeight = modelBounding.max.y - modelBounding.min.y;
      textWorldHeight = 1.1 * worldHeight * textScreenHeight / viewerHeight;
    }
    return textWorldHeight;
  }
  /**
   * Starts the selection/insertion process.
   */
  async _startSelection(event) {
    const faceSelection = await this._getFaceSelection(event.getPosition());
    if (faceSelection === null) return;
    const viewRay = this._viewer.view.raycastFromPoint(event.getPosition());
    if (viewRay === null) return;
    this._selecting = true;
    const textBox = this._textBoxes.get(faceSelection.getNodeId());
    if (textBox === void 0) {
      const modelBounding = await this._viewer.model.getModelBounding(true, true);
      const modelExtent = modelBounding.extents().length();
      const pulledCloserPosition = Point3.add(
        faceSelection.getPosition(),
        viewRay.direction.copy().scale(-modelExtent * 0.2)
      );
      this._selectMovePlane = Plane.createFromPointAndNormal(
        pulledCloserPosition,
        viewRay.direction
      );
      this._selectTextBox = await this._createTextBoxForFace(
        this._textSettings,
        pulledCloserPosition,
        faceSelection
      );
    } else {
      this._selectMovePlane = Plane.createFromPointAndNormal(
        faceSelection.getPosition(),
        viewRay.direction
      );
      this._selectTextBox = textBox;
    }
  }
  /**
   * Get the 3D position on the select plane based from the 2D screen position.
   * @param screenPosition
   */
  _getPositionOnSelectPlane(screenPosition) {
    const viewRay = this._viewer.view.raycastFromPoint(screenPosition);
    if (viewRay !== null) {
      return this._selectMovePlane.rayIntersection(viewRay);
    }
    return null;
  }
  /**
   * This will create an image out of the given text settings and attach it to the selected
   * face via a leader line.
   */
  async _createTextBoxForFace(textSettings, initialBoxPosition, faceSelection) {
    const pngImage = await createPngImageFromText(textSettings);
    const thumbnailBuffer = new Uint8Array([0, 0, 0, 0]);
    const thumbnailOptions = {
      format: ImageFormat.Rgba32,
      data: thumbnailBuffer,
      width: 1,
      height: 1
    };
    const imageOptions = {
      format: ImageFormat.Png,
      data: pngImage.buffer,
      width: pngImage.width,
      height: pngImage.height
    };
    const imageId = await this._viewer.model.createImage(imageOptions, thumbnailOptions);
    const sourcePosition = faceSelection.getPosition();
    const textBoxItem = await this._createTextBoxItem(
      sourcePosition,
      textSettings,
      pngImage.width,
      pngImage.height
    );
    this._moveTextBoxTo(textBoxItem, initialBoxPosition);
    this._textBoxes.set(textBoxItem.boxId, textBoxItem);
    await this._viewer.model.setNodesTexture([textBoxItem.boxId], {
      imageId,
      mipMapping: textSettings.useMipmaps
    });
    await this._viewer.model.setNodesVisibility([textBoxItem.boxId], true);
    return textBoxItem;
  }
  /**
   *  Creates a text box quad suitable for texturing and sized to the given width/height.
   *  The quad will be created with a height of 1.0, and a with to match the aspect
   *  ratio of the image.
   *
   *  Also creates a leader line mesh instance which is just a mesh with a single line
   *  from 0,0,0 to 1,1,1 that can later be scaled as needed.
   */
  async _createTextBoxItem(sourcePosition, textSettings, imageWidth, imageHeight) {
    const aspectRatio = imageWidth / imageHeight;
    const width = 0.5 * aspectRatio;
    const height = 0.5;
    const boxVertices = [
      -width,
      -height,
      0,
      width,
      -height,
      0,
      -width,
      height,
      0,
      width,
      -height,
      0,
      width,
      height,
      0,
      -width,
      height,
      0
    ];
    const boxUvs = [
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1
    ];
    let boxCreationFlags = MeshInstanceCreationFlags.Invisible | MeshInstanceCreationFlags.DoNotLight | MeshInstanceCreationFlags.ExcludeBounding;
    const scaleMatrix = new Matrix();
    const textWorldHeight = await this._calculateTextBoxHeight(textSettings.suppressCameraScale);
    scaleMatrix.setScaleComponent(textWorldHeight, textWorldHeight, 1);
    if (textSettings.suppressCameraScale) {
      boxCreationFlags |= MeshInstanceCreationFlags.SuppressCameraScale;
    }
    let boxMatrix;
    if (textSettings.screenOriented) {
      boxCreationFlags |= MeshInstanceCreationFlags.ScreenOriented;
      boxMatrix = scaleMatrix;
    } else {
      const viewMatrixInv = this._viewer.view.getViewMatrix().inverseAndDeterminant()[0];
      if (viewMatrixInv === null) throw new Error("Invalid camera matrix");
      viewMatrixInv.m[12] = 0;
      viewMatrixInv.m[13] = 0;
      viewMatrixInv.m[14] = 0;
      viewMatrixInv.m[15] = 1;
      boxMatrix = Matrix.multiply(scaleMatrix, viewMatrixInv);
    }
    const boxMeshData = new MeshData();
    boxMeshData.setFaceWinding(FaceWinding.Clockwise);
    boxMeshData.setBackfacesEnabled(true);
    boxMeshData.addFaces(boxVertices, void 0, void 0, boxUvs);
    let boxBorderLineColor = null;
    if (textSettings.showBorder) {
      const lineVertices = [
        -width,
        -height,
        0,
        -width,
        height,
        0,
        width,
        height,
        0,
        width,
        -height,
        0,
        -width,
        -height,
        0
      ];
      boxMeshData.addPolyline(lineVertices, void 0);
      boxBorderLineColor = hexToRgb(textSettings.borderColor);
    }
    const boxMeshId = await this._viewer.model.createMesh(boxMeshData);
    const boxMeshInstanceData = new MeshInstanceData(
      boxMeshId,
      boxMatrix,
      "user-text",
      null,
      boxBorderLineColor,
      null,
      boxCreationFlags
    );
    const boxNodeId = await this._viewer.model.createMeshInstance(boxMeshInstanceData);
    const leaderLineVertices = [0, 0, 0, 1, 1, 1];
    const leaderMeshData = new MeshData();
    leaderMeshData.addPolyline(leaderLineVertices);
    const leaderMeshId = await this._viewer.model.createMesh(leaderMeshData);
    const leaderMeshInstanceData = new MeshInstanceData(leaderMeshId);
    leaderMeshInstanceData.setCreationFlags(MeshInstanceCreationFlags.ExcludeBounding);
    leaderMeshInstanceData.setLineColor(Color.black());
    const leaderInstanceId = await this._viewer.model.createMeshInstance(leaderMeshInstanceData);
    return new TextBoxItem(
      boxNodeId,
      leaderInstanceId,
      sourcePosition,
      boxMatrix,
      width,
      height,
      textWorldHeight,
      textSettings.screenOriented,
      textSettings.suppressCameraScale
    );
  }
  /**
   *  Called when the view changes. This will update leader lines as needed
   */
  async _onCameraChanged() {
    this._textBoxes.forEach((textBox) => {
      if (textBox.isScreenOriented) {
        this._updateLeaderLine(textBox);
      }
    });
  }
  /**
   * This will update the leader line so that it's connected to the text box. It handles
   * a screen oriented or not, and suppress scale or not.
   */
  async _updateLeaderLine(textBox) {
    const width = textBox.width;
    const height = textBox.height;
    const boxPosition = textBox.boxPosition;
    let connectPoint;
    if (textBox.isSuppressCameraScale) {
      connectPoint = boxPosition;
    } else {
      let finalMatrix;
      if (textBox.isScreenOriented) {
        const camInfo = this._viewer.view.getViewMatrix().inverseAndDeterminant();
        const cameraMatrixInv = camInfo[0];
        if (cameraMatrixInv === null) return;
        cameraMatrixInv.m[12] = 0;
        cameraMatrixInv.m[13] = 0;
        cameraMatrixInv.m[14] = 0;
        cameraMatrixInv.m[15] = 1;
        const boxMatrix = new Matrix();
        boxMatrix.setTranslationComponent(boxPosition.x, boxPosition.y, boxPosition.z);
        boxMatrix.setScaleComponent(textBox.worldHeight, textBox.worldHeight, textBox.worldHeight);
        finalMatrix = Matrix.multiply(cameraMatrixInv, boxMatrix);
      } else {
        const boxMatrix = this._viewer.model.getNodeMatrix(textBox.boxId);
        finalMatrix = boxMatrix;
      }
      const sourceBoxCorners = [
        new Point3(-width, -height, 0),
        new Point3(width, -height, 0),
        new Point3(width, height, 0),
        new Point3(-width, height, 0)
      ];
      const boxCorners = new Array();
      finalMatrix.transformArray(sourceBoxCorners, boxCorners);
      connectPoint = boxCorners[0];
      let shortest = Point3.subtract(boxCorners[0], textBox.sourcePosition).squaredLength();
      for (let i = 1; i < 4; ++i) {
        const distance = Point3.subtract(boxCorners[i], textBox.sourcePosition).squaredLength();
        if (distance < shortest) {
          shortest = distance;
          connectPoint = boxCorners[i];
        }
      }
    }
    const lineMatrix = new Matrix();
    const lineVec = Point3.subtract(connectPoint, textBox.sourcePosition);
    lineMatrix.setScaleComponent(lineVec.x, lineVec.y, lineVec.z);
    lineMatrix.setTranslationComponent(
      textBox.sourcePosition.x,
      textBox.sourcePosition.y,
      textBox.sourcePosition.z
    );
    await this._viewer.model.setNodeMatrix(textBox.leaderLineId, lineMatrix);
  }
  /**
   *  Moves the give text box to the new world-space position. This will update the leader line as well
   */
  async _moveTextBoxTo(textBox, newPosition) {
    const moveMatrix = new Matrix();
    moveMatrix.setTranslationComponent(newPosition.x, newPosition.y, newPosition.z);
    const finalMatrix = Matrix.multiply(textBox.boxMatrix, moveMatrix);
    await this._viewer.model.setNodeMatrix(textBox.boxId, finalMatrix);
    textBox.boxPosition = newPosition;
    this._updateLeaderLine(textBox);
  }
  /**
   * Get the selected face information from the given 2D screen location.  Only returns a non-null face selection when
   * all the selection parameters are valid.
   */
  async _getFaceSelection(screenPoint) {
    const config = new PickConfig(SelectionMask.Face);
    const selectionItem = await this._viewer.view.pickFromPoint(screenPoint, config);
    if (selectionItem === null || !!selectionItem.overlayIndex() || selectionItem.getFaceEntity() === null || selectionItem.getNodeId() === null || selectionItem.getPosition() === null) {
      return null;
    }
    return selectionItem;
  }
}
class TextInsertionExample {
  /**
   * This example uses the HTMLCanvas.toBlob() function, which is not supported
   * in Internet Explorer or Edge. This function provides a low-performance
   * equivalent in the form of a polyfill, and would be needed in any Partner
   * code that wanted to use the HTMLCanvas techniques presented in this example.
   *
   * This code is from:
   *   https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
   * and modified only slightly for Typescript.
   */
  polyfillHTMLCanvasToBlob() {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function(callback, type, quality) {
          const dataURL = this.toDataURL(type, quality).split(",")[1];
          setTimeout(function() {
            const binStr = atob(dataURL), len = binStr.length, arr = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || "image/png" }));
          });
        }
      });
    }
  }
  start(viewerOptions) {
    this.polyfillHTMLCanvasToBlob();
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._initOperator();
      this._viewer.start();
    });
  }
  _initOperator() {
    this._textInsertionOperator = new TextInsertionOperator(this._viewer);
    const operatorId = this._viewer.registerCustomOperator(this._textInsertionOperator);
    this._viewer.operatorManager.set(operatorId, 1);
    const textBoxText = document.getElementById("textBoxText");
    this._textInsertionOperator.setInsertionText(textBoxText.value);
    textBoxText.onchange = () => {
      this._textInsertionOperator.setInsertionText(textBoxText.value);
    };
    const textBoxTextColor = document.getElementById("textBoxTextColor");
    this._textInsertionOperator.setTextColor(textBoxTextColor.value);
    textBoxTextColor.onchange = () => {
      this._textInsertionOperator.setTextColor(textBoxTextColor.value);
    };
    const textBoxTextFontSize = document.getElementById("textBoxTextFontSize");
    this._textInsertionOperator.setTextFontSize(parseInt(textBoxTextFontSize.value, 10));
    textBoxTextFontSize.onchange = () => {
      this._textInsertionOperator.setTextFontSize(parseInt(textBoxTextFontSize.value, 10));
    };
    const textBoxTextFontDisplaySize = document.getElementById(
      "textBoxTextFontDisplaySize"
    );
    this._textInsertionOperator.setTextFontDisplaySize(
      parseInt(textBoxTextFontDisplaySize.value, 10)
    );
    textBoxTextFontDisplaySize.onchange = () => {
      this._textInsertionOperator.setTextFontDisplaySize(
        parseInt(textBoxTextFontDisplaySize.value, 10)
      );
    };
    const textBoxTextFont = document.getElementById("textBoxTextFont");
    this._textInsertionOperator.setTextFont(textBoxTextFont.value);
    textBoxTextFont.onchange = () => {
      this._textInsertionOperator.setTextFont(textBoxTextFont.value);
    };
    const textBoxBorderLine = document.getElementById("textBoxBorderLine");
    this._textInsertionOperator.setShowBorder(textBoxBorderLine.checked);
    textBoxBorderLine.onchange = () => {
      this._textInsertionOperator.setShowBorder(textBoxBorderLine.checked);
    };
    const textBoxBorderColor = document.getElementById("textBoxBorderColor");
    this._textInsertionOperator.setBorderColor(textBoxBorderColor.value);
    textBoxBorderColor.onchange = () => {
      this._textInsertionOperator.setBorderColor(textBoxBorderColor.value);
    };
    const textBoxScreenOriented = document.getElementById(
      "textBoxScreenOriented"
    );
    this._textInsertionOperator.setScreenOriented(textBoxScreenOriented.checked);
    textBoxScreenOriented.onchange = () => {
      this._textInsertionOperator.setScreenOriented(textBoxScreenOriented.checked);
    };
    const textBoxUseMipmaps = document.getElementById("textBoxUseMipmaps");
    textBoxUseMipmaps.checked = false;
    this._textInsertionOperator.setUseMipmaps(textBoxUseMipmaps.checked);
    textBoxUseMipmaps.onchange = () => {
      this._textInsertionOperator.setUseMipmaps(textBoxUseMipmaps.checked);
    };
    const textBoxSuppressCameraScale = document.getElementById(
      "textBoxSuppressCameraScale"
    );
    textBoxSuppressCameraScale.checked = false;
    this._textInsertionOperator.setSuppressCameraScale(textBoxSuppressCameraScale.checked);
    textBoxSuppressCameraScale.onchange = () => {
      this._textInsertionOperator.setSuppressCameraScale(textBoxSuppressCameraScale.checked);
    };
    const textBoxBackgroundTransparent = document.getElementById(
      "textBoxBackgroundTransparent"
    );
    textBoxBackgroundTransparent.checked = false;
    this._textInsertionOperator.setTransparentBackground(textBoxBackgroundTransparent.checked);
    textBoxBackgroundTransparent.onchange = () => {
      this._textInsertionOperator.setTransparentBackground(textBoxBackgroundTransparent.checked);
    };
    const textBoxBackgroundColor = document.getElementById(
      "textBoxBackgroundColor"
    );
    this._textInsertionOperator.setBackgroundColor(textBoxBackgroundColor.value);
    textBoxBackgroundColor.onchange = () => {
      this._textInsertionOperator.setBackgroundColor(textBoxBackgroundColor.value);
    };
    const textBoxClearAll = document.getElementById("textBoxClearAll");
    textBoxClearAll.onclick = () => {
      this._textInsertionOperator.clearAll();
    };
  }
}
window.onload = function() {
  const textInsertionExample = new TextInsertionExample();
  textInsertionExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
