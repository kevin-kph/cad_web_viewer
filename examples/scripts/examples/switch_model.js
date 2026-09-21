import "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class SwitchModelExample {
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._bindEvents();
      this._viewer.start();
    });
  }
  _bindEvents() {
    let element = document.getElementById("switchToArboleda");
    element.onclick = () => {
      this._viewer.model.switchToModel("arboleda");
    };
    element = document.getElementById("switchToBnc");
    element.onclick = () => {
      this._viewer.model.switchToModel("bnc");
    };
    element = document.getElementById("switchToLandinggear");
    element.onclick = () => {
      this._viewer.model.switchToModel("landinggear");
    };
    element = document.getElementById("switchToMicroEngine");
    element.onclick = () => {
      this._viewer.model.switchToModel("microengine");
    };
    element = document.getElementById("switchToMountainHome");
    element.onclick = () => {
      this._viewer.model.switchToModel("MountainHome");
    };
  }
}
window.onload = function() {
  const switchModelExample = new SwitchModelExample();
  switchModelExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
