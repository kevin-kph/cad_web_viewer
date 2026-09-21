import { ar as SnapshotConfig } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { O as OperatorPanel, V as ViewOrientationBar } from "../viewOrientationBar.js";
const PreviewWidth = 128;
class SnapshotExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      new OperatorPanel("operatorPanel", this._viewer);
      new ViewOrientationBar("viewOrientationBar", this._viewer);
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    document.getElementById("createViewButton").addEventListener(
      "click",
      () => {
        this._createNewView();
      },
      false
    );
  }
  _createNewView() {
    const canvasSize = this._viewer.view.getCanvasSize();
    const previewHeight = PreviewWidth * canvasSize.y / canvasSize.x;
    const config = new SnapshotConfig(PreviewWidth, previewHeight);
    this._viewer.takeSnapshot(config).then((image) => {
      const markupManager = this._viewer.markupManager;
      const markupView = markupManager.getActiveMarkupView(this._viewer.view);
      const viewId = markupView ? markupView.getUniqueId() : markupManager.createMarkupView(this._viewer.view);
      const div = document.createElement("div");
      div.classList.add("viewBox");
      div.appendChild(image);
      image.addEventListener("click", () => {
        markupManager.activateMarkupViewWithPromise(viewId, this._viewer.view);
      });
      document.getElementById("views").appendChild(div);
    });
  }
}
window.onload = function() {
  const eventsExample = new SnapshotExample();
  eventsExample.start({
    containerId: "exampleContainer",
    model: "microengine"
  });
};
