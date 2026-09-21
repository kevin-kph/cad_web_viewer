import { ah as WebViewer, C as Color } from "../WebViewer.js";
import { g as getRendererType, a as requestEndpoint } from "../index.js";
window.onload = function() {
  var rendererType = getRendererType();
  requestEndpoint(rendererType).then(function(endpoint) {
    const viewer = new WebViewer({
      containerId: "viewer",
      endpointUri: endpoint,
      model: "microengine",
      rendererType,
      enginePath: "."
    });
    viewer.setCallbacks({
      sceneReady: function() {
        viewer.view.setBackgroundColor(Color.white(), Color.white());
      }
    });
    viewer.start();
  });
};
