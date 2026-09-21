import { consume as d } from "@lit/context";
import { LitElement as h, html as w, css as f } from "lit";
import { property as b, customElement as g } from "lit/decorators.js";
import { map as u } from "lit/directives/map.js";
import { icons as l } from "@ts3d-hoops/ui-kit";
import { OperatorId as a } from "@ts3d-hoops/web-viewer";
import "../context-manager/index.js";
import "../services/index.js";
import { CameraOperatorPosition as v } from "../context-manager/types.js";
import { getService as x } from "../services/serviceRegistry.js";
import { contextManagerContext as O, webViewerStateContext as M } from "../context-manager/context-manager.js";
var S = Object.defineProperty, C = Object.getOwnPropertyDescriptor, s = (e, t, r, p) => {
  for (var o = p > 1 ? void 0 : p ? C(t, r) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (o = (p ? m(t, r, o) : m(o)) || o);
  return p && o && S(t, r, o), o;
};
const n = /* @__PURE__ */ new Map([
  [a.Navigate, { title: "Orbit camera", icon: l.orbit }],
  [a.Turntable, { title: "Turntable", icon: l.cameraTurntable }],
  [a.WalkMode, { title: "Walk", icon: l.walk }]
]);
let i = class extends h {
  constructor() {
    super(...arguments), this.dropDownPosition = "right";
  }
  setCameraOp(e) {
    !this.contextManager || !this.contextManager.webViewer || (this.contextManager.webViewer.view.operatorManager.set(e, v), this.contextManager.refreshCameraOperator(), e === a.WalkMode && x("FloorplanService").reset());
  }
  /** @internal */
  render() {
    const e = this.webViewerState && n.has(this.webViewerState.topCameraOperator) ? n.get(this.webViewerState.topCameraOperator) : n.get(a.Navigate);
    return w`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Camera operator - ${e == null ? void 0 : e.title}"
        >${e == null ? void 0 : e.icon}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${u(
      n,
      (t) => {
        var r;
        return w`
            <hoops-icon-button
              .color=${((r = this.webViewerState) == null ? void 0 : r.topCameraOperator) === t[0] ? "accent" : "default"}
              size="sm"
              title=${t[1].title}
              @click=${() => {
          this.setCameraOp(t[0]);
        }}
            >
              ${t[1].icon}
            </hoops-icon-button>
          `;
      }
    )}
      </div>
    </hoops-dropdown>`;
  }
};
i.styles = [
  f`
      .dropdown-content {
        display: flex;
        flex-direction: row;
        padding: 0.2rem;
        gap: 0.2rem;
      }
    `
];
s([
  b()
], i.prototype, "dropDownPosition", 2);
s([
  d({ context: O })
], i.prototype, "contextManager", 2);
s([
  d({ context: M, subscribe: !0 })
], i.prototype, "webViewerState", 2);
i = s([
  g("hoops-toolbar-camera-operator")
], i);
export {
  i as HoopsCameraOperatorButtonElement
};
