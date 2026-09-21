import { z as InfoType, D as SelectionType } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
import { V as ViewPanel } from "../ViewPanel.js";
import { O as OperatorPanel, V as ViewOrientationBar } from "../viewOrientationBar.js";
class EventsExample {
  constructor() {
    this._functionMap = {};
  }
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      new ViewPanel("viewPanel", this._viewer);
      new OperatorPanel("operatorPanel", this._viewer);
      new ViewOrientationBar("viewOrientationBar", this._viewer);
      this._logText = document.getElementById("logText");
      this._bindEvents();
      this._viewer.start();
    });
  }
  _doLog(message) {
    this._logText.value += `${(/* @__PURE__ */ new Date()).toLocaleTimeString()}: ${message}
`;
    this._logText.scrollTop = this._logText.scrollHeight;
  }
  _clearLog() {
    this._logText.value = "";
  }
  _bindEvents() {
    this._functionMap.viewCreated = (view) => {
      this._doLog(`viewCreated- ${view.getName()}`);
    };
    this._functionMap.info = (infoType, message) => {
      switch (infoType) {
        case InfoType.Info:
          this._doLog(`Info: ${message}`);
          break;
        case InfoType.Warning:
          this._doLog(`Warning: ${message}`);
          break;
        case InfoType.Error:
          this._doLog(`Error: ${message}`);
          break;
      }
    };
    this._functionMap.modelStructureReady = () => {
      this._doLog("modelStructureReady");
    };
    this._functionMap.modelLoadFailure = () => {
      this._doLog("modelLoadFailure");
    };
    this._functionMap.missingModel = (modelPath) => {
      this._doLog(`missingModel- ${modelPath}`);
    };
    this._functionMap.viewDeleted = (view) => {
      this._doLog(`viewDeleted- ${view.getName()}`);
    };
    this._functionMap.viewLoaded = (view) => {
      this._doLog(`viewLoaded- ${view.getName()}`);
    };
    this._functionMap.sceneReady = () => {
      this._doLog("sceneReady");
    };
    this._functionMap.frameDrawn = () => {
      this._doLog("frameDrawn");
    };
    this._functionMap.camera = (camera) => {
      this._doLog("camera");
    };
    this._functionMap.transitionBegin = (duration) => {
      this._doLog(`transitionBegin: ${duration}ms`);
    };
    this._functionMap.transitionEnd = () => {
      this._doLog("transitionEnd");
    };
    this._functionMap.explode = (magnitude) => {
      this._doLog(`explode: ${magnitude}`);
    };
    this._functionMap.addCuttingSection = () => {
      this._doLog("addCuttingSection");
    };
    this._functionMap.removeCuttingSection = () => {
      this._doLog("removeCuttingSection");
    };
    this._functionMap.streamingActivated = () => {
      this._doLog("streamingActivated ");
    };
    this._functionMap.streamingDeactivated = () => {
      this._doLog("streamingDeactivated ");
    };
    this._functionMap.measurementLoaded = (measurement) => {
      this._doLog(`measurementLoaded: ${measurement.getName()}`);
    };
    this._functionMap.measurementValueSet = (measurement) => {
      this._doLog(
        `measurementValueSet: ${measurement.getName()}, value: ${measurement.getMeasurementValue()}`
      );
    };
    this._functionMap.measurementCreated = (measurement) => {
      this._doLog(`measurementCreated: ${measurement.getName()}`);
    };
    this._functionMap.measurementDeleted = (measurement) => {
      this._doLog(`measurementDeleted: ${measurement.getName()}`);
    };
    this._functionMap.contextMenu = (position) => {
      this._doLog(`contextMenu: ${position.x}, ${position.y}`);
    };
    this._functionMap.selectionArray = (selectionEvents) => {
      if (selectionEvents.length > 1 && selectionEvents[0].getType() !== SelectionType.None)
        this._doLog(`selection: Selected Part${selectionEvents[0].getSelection().getNodeId()}`);
      else this._doLog("selection: None");
    };
    this._functionMap.timeoutWarning = (warningTime) => {
      this._doLog(`timeoutWarning: ${warningTime} minutes`);
    };
    this._functionMap.timeout = () => {
      this._doLog("timeout");
    };
    this._functionMap.cadViewCreated = (cadViewId) => {
      this._doLog(`cadViewCreated: Id ${cadViewId}`);
    };
    this._viewer.setCallbacks(this._functionMap);
    const elements = document.getElementsByClassName("event-toggle");
    for (let i = 0; i < elements.length; i++) {
      this._setupInputElement(elements.item(i));
    }
    document.getElementById("clearLog").onclick = () => {
      this._clearLog();
    };
  }
  _setupInputElement(inputElement) {
    inputElement.onchange = () => {
      if (inputElement.checked) this._bindEvent(inputElement.id);
      else this._unbindEvent(inputElement.id);
    };
  }
  _unbindEvent(eventName) {
    this._doLog(`unset callback: ${eventName}`);
    const callbacks = {};
    callbacks[eventName] = this._functionMap[eventName];
    this._viewer.unsetCallbacks(callbacks);
  }
  _bindEvent(eventName) {
    this._doLog(`set callback: ${eventName}`);
    const callbacks = {};
    callbacks[eventName] = this._functionMap[eventName];
    this._viewer.setCallbacks(callbacks);
  }
}
window.onload = function() {
  const eventsExample = new EventsExample();
  eventsExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
