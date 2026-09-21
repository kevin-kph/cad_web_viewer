import { ar as SnapshotConfig } from "../WebViewer.js";
import { c as createViewer } from "../index.js";
let hwv = null;
const snapButton = document.getElementById("snapshot-button");
window.onload = function() {
  createViewer({
    containerId: "webviewer",
    model: "microengine",
    rendererType: "client"
  }).then(function(viewer) {
    hwv = viewer;
    hwv.setCallbacks({
      sceneReady: function() {
        snapButton.disabled = false;
      }
    });
    hwv.start();
  });
};
function createSnapshot(viewer) {
  viewer.takeSnapshot(new SnapshotConfig(160, 120)).then(function(image) {
    document.getElementById("snapshots").appendChild(image);
  });
}
snapButton.onclick = () => {
  createSnapshot(hwv);
};
