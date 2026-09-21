import "../WebViewer.js";
import { c as createViewer } from "../index.js";
let hwv = null;
const svgButton = document.getElementById("svg-button");
window.onload = function() {
  createViewer({
    containerId: "webviewer",
    model: "microengine",
    rendererType: "client"
  }).then(function(viewer) {
    hwv = viewer;
    hwv.setCallbacks({
      sceneReady: function() {
        svgButton.disabled = false;
      }
    });
    hwv.start();
  });
};
//! [svg_create]
function createSvg(viewer) {
  svgButton.innerText = "...";
  svgButton.disabled = true;
  viewer.exportToSvg({ svgXmlPrologEnabled: false }).then(function(svgString) {
    document.getElementById("display-svg").innerHTML = svgString;
    svgButton.innerText = "Create SVG ->";
    svgButton.disabled = false;
  });
}
//! [svg_create]
svgButton.onclick = () => {
  createSvg(hwv);
};
