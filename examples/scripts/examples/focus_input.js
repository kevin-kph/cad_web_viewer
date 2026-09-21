import "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class ExampleKeyListener {
  constructor(textarea) {
    this._textarea = textarea;
  }
  onMouseDown(_event) {
  }
  onMouseUp(_event) {
  }
  onMouseMove(_event) {
  }
  onMousewheel(_event) {
  }
  onTouchStart(_event) {
  }
  onTouchMove(_event) {
  }
  onTouchEnd(_event) {
  }
  onDeactivate() {
  }
  onActivate() {
  }
  onViewOrientationChange() {
  }
  stopInteraction() {
  }
  onKeyDown(event) {
    this._logMessage(`Key Down: ${event.getKeyCode()}`);
  }
  onKeyUp(event) {
    this._logMessage(`Key Up: ${event.getKeyCode()}`);
  }
  _logMessage(message) {
    this._textarea.value += `${(/* @__PURE__ */ new Date()).toLocaleTimeString()}: ${message}
`;
    this._textarea.scrollTop = this._textarea.scrollHeight;
  }
}
class FocusInputExample {
  start(viewerOptions1, viewerOptions2) {
    const viewer1Ready = createViewer(viewerOptions1).then((viewer1) => {
      this._viewer1 = viewer1;
      const textarea1 = document.getElementById("log1Text");
      const keyListener1 = new ExampleKeyListener(textarea1);
      const keyListener1Id = this._viewer1.registerCustomOperator(keyListener1);
      this._viewer1.operatorManager.set(keyListener1Id, 1);
    });
    const viewer2Ready = createViewer(viewerOptions2).then((viewer2) => {
      this._viewer2 = viewer2;
      const textarea2 = document.getElementById("log2Text");
      const keyListener2 = new ExampleKeyListener(textarea2);
      const keyListener2Id = this._viewer2.registerCustomOperator(keyListener2);
      this._viewer2.operatorManager.set(keyListener2Id, 1);
    });
    return Promise.all([viewer1Ready, viewer2Ready]).then(() => {
      this._bindEvents();
      this._viewer1.start();
      this._viewer2.start();
    });
  }
  _bindEvents() {
    let element = document.getElementById("focusViewer1");
    element.onclick = () => {
      this._viewer1.focusInput(true);
    };
    element = document.getElementById("focusViewer2");
    element.onclick = () => {
      this._viewer2.focusInput(true);
    };
    element = document.getElementById("blurViewer1");
    element.onclick = () => {
      this._viewer1.focusInput(false);
    };
    element = document.getElementById("blurViewer2");
    element.onclick = () => {
      this._viewer2.focusInput(false);
    };
    element = document.getElementById("clearLog1");
    element.onclick = () => {
      const textarea = document.getElementById("log1Text");
      textarea.value = "";
    };
    element = document.getElementById("clearLog2");
    element.onclick = () => {
      const textarea = document.getElementById("log2Text");
      textarea.value = "";
    };
  }
}
window.onload = function() {
  const focusInputExample = new FocusInputExample();
  focusInputExample.start(
    {
      containerId: "viewerContainer1",
      model: "microengine"
    },
    {
      containerId: "viewerContainer2",
      model: "microengine"
    }
  );
};
