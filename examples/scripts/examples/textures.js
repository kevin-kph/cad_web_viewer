import { y as ImageFormat, D as SelectionType, w as TextureModifier } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class TexturesExample {
  constructor() {
    this._selectedNode = null;
    this._bricksImageId = null;
    this._nebulaImageId = null;
    this._texturedImageId = null;
  }
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._initEvents();
      this._viewer.start();
    });
  }
  _loadImage(filename) {
    const p = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(`GET`, filename, true);
      request.responseType = `arraybuffer`;
      request.onload = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(request);
          }
        }
      };
      request.onerror = function(event) {
        reject(event);
      };
      request.send();
    });
    return p.then((request) => {
      const imageOptions = {
        format: ImageFormat.Png,
        data: new Uint8Array(request.response)
      };
      return this._viewer.model.createImage(imageOptions);
    });
  }
  _initEvents() {
    this._viewer.setCallbacks({
      selectionArray: (selectionEvents, removed) => {
        this._onSelection(selectionEvents, removed);
      }
    });
    this._viewer.setCallbacks({
      sceneReady: () => {
        this._viewer.view.setBackfacesVisible(true);
        const buttons = document.getElementById("textureButtons");
        if (buttons !== null) {
          buttons.style.display = "block";
        }
        this._loadImage("images/textures/bricks.png").then((imageId) => {
          this._bricksImageId = imageId;
        });
        this._loadImage("images/textures/nebula.png").then((imageId) => {
          this._nebulaImageId = imageId;
        });
        this._loadImage("images/textures/textured.png").then((imageId) => {
          this._texturedImageId = imageId;
        });
      }
    });
    const nebulaButton = document.getElementById("nebulaButton");
    if (nebulaButton !== null) {
      nebulaButton.onclick = () => {
        if (this._nebulaImageId !== null) {
          this._setMaterialForFace(this._nebulaImageId);
        }
      };
    }
    const bricksButton = document.getElementById("bricksButton");
    if (bricksButton !== null) {
      bricksButton.onclick = () => {
        if (this._bricksImageId !== null) {
          this._setMaterialForFace(this._bricksImageId);
        }
      };
    }
    const texturedButton = document.getElementById("texturedButton");
    if (texturedButton !== null) {
      texturedButton.onclick = () => {
        if (this._texturedImageId !== null) {
          this._setMaterialForFace(this._texturedImageId);
        }
      };
    }
  }
  _onSelection(selectionEvents, removed) {
    if (removed) {
      return;
    }
    const selectionItems = selectionEvents.map((event) => event.getSelection());
    const selectionIdElement = document.getElementById("selectedId");
    if (!selectionIdElement) {
      return;
    }
    const innerText = [];
    for (const selectionItem of selectionItems) {
      if (selectionItem.getSelectionType() === SelectionType.None) {
        innerText.push("none");
        this._selectedNode = null;
      } else {
        this._selectedNode = selectionItem.getNodeId();
        if (this._selectedNode !== null) {
          innerText.push(this._selectedNode.toString());
        }
      }
    }
    selectionIdElement.innerText = innerText.join(" ");
  }
  _setMaterialForFace(imageId) {
    if (this._selectedNode !== null) {
      this._viewer.model.setNodesTexture([this._selectedNode], {
        imageId,
        modifiers: TextureModifier.Decal
      });
    }
  }
}
window.onload = function() {
  const example = new TexturesExample();
  example.start({
    containerId: "viewerContainer",
    model: "texture_example"
  });
};
