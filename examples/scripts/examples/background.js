import { C as Color, A as AntiAliasingMode } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { h as hexToRgb } from "../utils.js";
class BackgroundExample {
  constructor() {
    this._backgroundTop = Color.white();
    this._backgroundBottom = Color.white();
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._bindEvents();
      this._viewer.setCallbacks({
        sceneReady: () => {
          this._updateBackgroundColor();
        }
      });
      this._viewer.start();
    });
  }
  _bindEvents() {
    document.getElementById("anti_aliasing").onclick = () => {
      const antiAliasing = document.getElementById("anti_aliasing");
      const mode = antiAliasing.checked ? AntiAliasingMode.SMAA : AntiAliasingMode.None;
      this._viewer.view.setAntiAliasingMode(mode);
    };
    const backgroundColorTop = document.getElementById("background_color_top");
    const backgroundColorBottom = document.getElementById(
      "background_color_bottom"
    );
    document.getElementById("set_color_top").onclick = () => {
      this._backgroundTop = hexToRgb(backgroundColorTop.value);
      this._updateBackgroundColor();
    };
    document.getElementById("set_color_bottom").onclick = () => {
      this._backgroundBottom = hexToRgb(backgroundColorBottom.value);
      this._updateBackgroundColor();
    };
    document.getElementById("set_color_transparent_top").onclick = () => {
      this._backgroundTop = null;
      this._updateBackgroundColor();
    };
    document.getElementById("set_color_transparent_bottom").onclick = () => {
      this._backgroundBottom = null;
      this._updateBackgroundColor();
    };
  }
  _updateBackgroundColor() {
    this._viewer.view.setBackgroundColor(this._backgroundTop, this._backgroundBottom);
  }
}
window.onload = function() {
  const backgroundExample = new BackgroundExample();
  backgroundExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
