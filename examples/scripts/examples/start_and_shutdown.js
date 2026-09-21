import { ah as WebViewer, C as Color, af as RendererType } from "../WebViewer.js";
/* empty css        */
import { a as requestEndpoint } from "../index.js";
class ViewerPanel {
  constructor(parentElement, name, instance, rendererType, endpoint) {
    this._parentElement = parentElement;
    this._panel = document.createElement("div");
    this._panel.classList.add("example-viewer-panel");
    const title = document.createElement("div");
    const text = document.createElement("span");
    text.innerHTML = name;
    title.appendChild(text);
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = () => {
      this._onRemoveClick();
    };
    title.appendChild(removeButton);
    this._panel.appendChild(title);
    this._viewerContainer = document.createElement("div");
    this._viewerContainer.classList.add("example-canvas-tiny");
    this._panel.appendChild(this._viewerContainer);
    this._parentElement.appendChild(this._panel);
    this._viewer = new WebViewer({
      container: this._viewerContainer,
      model: instance,
      endpointUri: endpoint,
      rendererType,
      enginePath: WebViewer.defaultEnginePath
    });
    this._viewer.setCallbacks({
      sceneReady: () => {
        this._viewer.view.setBackgroundColor(Color.white(), Color.white());
      }
    });
    this._viewer.start();
  }
  _onRemoveClick() {
    this._parentElement.removeChild(this._panel);
    if (this._viewer !== void 0) {
      this._viewer.shutdown();
      delete this._viewer;
    }
  }
}
class StartAndShutdownExample {
  constructor() {
    this._panelCount = 0;
  }
  start() {
    this._bindEvents();
  }
  _bindEvents() {
    const createNewViewer = document.getElementById("createNewViewer");
    if (!createNewViewer) {
      return;
    }
    createNewViewer.onclick = () => {
      this._onCreateNewViewer();
    };
  }
  _onCreateNewViewer() {
    const rendererSelect = document.getElementById("rendererSelect");
    const rendererType = parseInt(rendererSelect.value, 10);
    const instanceSelect = document.getElementById("instanceSelect");
    requestEndpoint(rendererType).then((endpoint) => {
      this._makeViewPanel(rendererType, instanceSelect.value, endpoint);
    });
  }
  _makeViewPanel(rendererType, instance, endpoint) {
    const viewerElm = document.getElementById("viewers");
    if (!viewerElm) {
      return;
    }
    let panelName = `Viewer ${++this._panelCount}`;
    panelName += rendererType === RendererType.Client ? " (CSR)" : " (SSR)";
    return new ViewerPanel(viewerElm, panelName, instance, rendererType, endpoint);
  }
}
const startAndShutdownExample = new StartAndShutdownExample();
window.onload = function() {
  startAndShutdownExample.start();
};
