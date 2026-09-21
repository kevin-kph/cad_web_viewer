import { ContextConsumer as w, consume as m } from "@lit/context";
import { LitElement as d, html as b, css as u } from "lit";
import { property as v, state as g, customElement as f } from "lit/decorators.js";
import { icons as i } from "@ts3d-hoops/ui-kit";
import "@ts3d-hoops/ui-kit/icon-button";
import "@ts3d-hoops/ui-kit/button";
import "@ts3d-hoops/ui-kit/common";
import { Point3 as p, DefaultTransitionDuration as S, ViewOrientation as r } from "@ts3d-hoops/web-viewer";
import "../context-manager/index.js";
import "../services/index.js";
import { webViewerContext as V, contextManagerContext as $ } from "../context-manager/context-manager.js";
import { getService as C } from "../services/serviceRegistry.js";
var P = Object.defineProperty, k = Object.getOwnPropertyDescriptor, h = (t, s, o, n) => {
  for (var e = n > 1 ? void 0 : n ? k(s, o) : s, c = t.length - 1, l; c >= 0; c--)
    (l = t[c]) && (e = (n ? l(s, o, e) : l(e)) || e);
  return n && e && P(s, o, e), e;
};
let a = class extends d {
  constructor() {
    super(...arguments), this.dropDownPosition = "right", this.faceSelected = !1, this.webViewer = void 0, this.webViewerContext = new w(this, {
      context: V,
      callback: (t) => {
        this.webViewerChanged(t);
      },
      subscribe: !0
    }), this.webViewerCallbacks = void 0, this.handleServiceUpdate = () => this.requestUpdate();
  }
  webViewerChanged(t) {
    if (this.webViewer && this.webViewerCallbacks && this.webViewer.unsetCallbacks(this.webViewerCallbacks), this.webViewer = t, this.webViewer) {
      const s = this.webViewer.selectionManager.getLast();
      this.faceSelected = s !== null && s.isFaceSelection(), this.webViewerCallbacks = {
        selectionArray: (o) => {
          if (o.length > 0) {
            const e = o[o.length - 1].getSelection();
            this.faceSelected = e !== null && e.isFaceSelection();
          } else
            this.faceSelected = !1;
        }
      }, this.webViewer.setCallbacks(this.webViewerCallbacks);
    }
  }
  orientToFace() {
    if (!this.webViewer || !this.faceSelected)
      return;
    const t = this.webViewer.selectionManager.getLast();
    if (!t || !t.isFaceSelection())
      return;
    const s = this.webViewer.view, o = t.getFaceEntity().getNormal(), n = t.getPosition(), e = s.getCamera();
    let c = p.cross(o, new p(0, 1, 0));
    c.length() < 1e-3 && (c = p.cross(o, new p(1, 0, 0)));
    const l = e.getPosition().subtract(e.getTarget()).length();
    e.setTarget(n), e.setPosition(p.add(n, p.scale(o, l))), e.setUp(c), s.fitBounding(
      t.getFaceEntity().getBounding(),
      S,
      e
    );
  }
  setProjection(t) {
    this.cameraService.setProjectionMode(t);
  }
  setOrientation(t) {
    this.contextManager && this.contextManager.webViewer && this.contextManager.webViewer.view.setViewOrientation(t);
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.cameraService = C("CameraService"), this.cameraService.addEventListener("hoops-projection-mode-changed", this.handleServiceUpdate), this.cameraService.addEventListener("hoops-camera-service-reset", this.handleServiceUpdate);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    this.cameraService && (this.cameraService.removeEventListener(
      "hoops-projection-mode-changed",
      this.handleServiceUpdate
    ), this.cameraService.removeEventListener(
      "hoops-camera-service-reset",
      this.handleServiceUpdate
    ));
  }
  /** @internal */
  render() {
    return b`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Camera">${i.camera}</hoops-icon-button>
      <div class="dropdown-content" slot="dropdown-popup">
        <hoops-button
          .color=${this.cameraService.getProjectionMode() === "Orthographic" ? "accent" : "default"}
          title="Orthographic projection"
          iconSize="sm"
          @click=${() => {
      this.setProjection("Orthographic");
    }}
        >
          <span slot="icon">${i.orthoView}</span>
          Orthographic Projection
        </hoops-button>
        <hoops-button
          .color=${this.cameraService.getProjectionMode() === "Perspective" ? "accent" : "default"}
          iconSize="sm"
          title="Perspective projection"
          @click=${() => {
      this.setProjection("Perspective");
    }}
        >
          <span slot="icon">${i.perspectiveView}</span>
          Perspective Projection
        </hoops-button>

        <hoops-separator direction="horizontal"></hoops-separator>

        <hoops-button
          title="Iso view"
          iconSize="sm"
          @click=${() => {
      this.setOrientation(r.Iso);
    }}
        >
          <span slot="icon">${i.viewIso}</span>
          Iso View
        </hoops-button>

        <hoops-button
          iconSize="sm"
          title="Top view"
          @click=${() => {
      this.setOrientation(r.Top);
    }}
        >
          <span slot="icon">${i.cubeTop}</span>
          Top View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Bottom view"
          @click=${() => {
      this.setOrientation(r.Bottom);
    }}
        >
          <span slot="icon">${i.cubeBottom}</span>
          Bottom View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Left view"
          @click=${() => {
      this.setOrientation(r.Left);
    }}
        >
          <span slot="icon">${i.cubeLeft}</span>
          Left View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Right view"
          @click=${() => {
      this.setOrientation(r.Right);
    }}
        >
          <span slot="icon">${i.cubeRight}</span>
          Right View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Front view"
          @click=${() => {
      this.setOrientation(r.Front);
    }}
        >
          <span slot="icon">${i.cubeFront}</span>
          Front View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Back view"
          @click=${() => {
      this.setOrientation(r.Back);
    }}
        >
          <span slot="icon">${i.cubeBack}</span>
          Back View
        </hoops-button>

        <hoops-button
          title="Orient camera to selected face"
          iconSize="sm"
          ?disabled=${!this.faceSelected}
          @click=${() => {
      this.orientToFace();
    }}
        >
          <span slot="icon">${i.viewFace}</span>
          Orient to Selected Face
        </hoops-button>
      </div>
    </hoops-dropdown>`;
  }
};
a.styles = [
  u`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
      }
    `
];
h([
  v()
], a.prototype, "dropDownPosition", 2);
h([
  g()
], a.prototype, "faceSelected", 2);
h([
  m({ context: $ })
], a.prototype, "contextManager", 2);
a = h([
  f("hoops-toolbar-camera")
], a);
const I = a;
export {
  a as HoopsCameraButtonElement,
  I as default
};
