import "../WebViewer.js";
import { c as createViewer } from "../index.js";
function determineBrowser() {
  if (navigator.userAgent.indexOf("Edge") > 0) {
    return 3;
  } else if (navigator.userAgent.indexOf("Trident") > 0) {
    return 0;
  } else if (navigator.userAgent.indexOf("Chrome") > 0) {
    return 1;
  } else if (navigator.userAgent.indexOf("Firefox") > 0) {
    return 2;
  }
  return 4;
}
class PopOutExample {
  constructor() {
    this._poppedOutWindow = null;
    this._browser = determineBrowser();
  }
  start(viewerOptions) {
    this._viewerElement = document.getElementById("viewer");
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      const popOutButton = document.getElementById("popOutButton");
      popOutButton.onclick = () => {
        this.popOut();
      };
      const fullscreenButton = document.getElementById("fullScreenButton");
      fullscreenButton.onclick = () => {
        this.fullscreen();
      };
      this._viewer.start();
    });
    if (this._browser === 0 || this._browser === 3) {
      const popOutButton = document.getElementById("popOutButton");
      popOutButton.disabled = true;
      const messageDiv = document.getElementById("message");
      messageDiv.style.display = "block";
    }
  }
  fullscreen() {
    if (this._browser === 2) {
      this._viewerElement.mozRequestFullScreen();
    } else if (this._browser === 0) {
      this._viewerElement.msRequestFullscreen();
    } else {
      this._viewerElement.webkitRequestFullscreen();
    }
    this._viewer.resizeCanvas();
  }
  popOut() {
    this._poppedOutWindow = window.open("", "Viewer", "width=800,height=600");
    if (this._poppedOutWindow === null) {
      console.error("window.open() failed");
      return;
    }
    this._poppedOutWindow.document.body.style.margin = "0";
    const closeButton = this._poppedOutWindow.document.createElement("button");
    closeButton.innerHTML = "Restore";
    closeButton.onclick = () => {
      this.closePopout();
    };
    this._poppedOutWindow.document.body.appendChild(this._viewerElement);
    this._poppedOutWindow.document.body.appendChild(closeButton);
    const body = this._poppedOutWindow.document.body;
    body.onfocus = () => {
      this._viewer.resizeCanvas();
    };
    body.onbeforeunload = () => {
      this.returnViewer();
    };
    this._viewer.moveToWindow(this._poppedOutWindow);
    this._poppedOutWindow.focus();
  }
  closePopout() {
    if (this._poppedOutWindow) {
      this._poppedOutWindow.close();
      this._poppedOutWindow = null;
      this.returnViewer();
    }
  }
  returnViewer() {
    const container = document.getElementById("viewerContainer");
    container.appendChild(this._viewerElement);
    this._viewer.moveToWindow(window);
    this._viewer.resizeCanvas();
    this._viewer.redraw();
  }
}
window.onload = function() {
  const popOutExample = new PopOutExample();
  popOutExample.start({
    containerId: "viewer",
    model: "microengine"
  });
};
