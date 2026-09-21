import { consume as m } from "@lit/context";
import { LitElement as w, html as p, css as l } from "lit";
import { property as h, customElement as f } from "lit/decorators.js";
import { map as u } from "lit/directives/map.js";
import { cubeWireframe as S, noWireframeShaded as x, wireframeShaded as b, cubeHiddenLine as M, xRayShader as D, goochShader as g, toonShader as y } from "@ts3d-hoops/ui-kit/icons";
import "../context-manager/index.js";
import { contextManagerContext as $, webViewerStateContext as v } from "../context-manager/context-manager.js";
var O = Object.defineProperty, P = Object.getOwnPropertyDescriptor, a = (i, o, e, t) => {
  for (var r = t > 1 ? void 0 : t ? P(o, e) : o, d = i.length - 1, s; d >= 0; d--)
    (s = i[d]) && (r = (t ? s(o, e, r) : s(r)) || r);
  return t && r && O(o, e, r), r;
};
const c = /* @__PURE__ */ new Map([
  ["Wireframe", { title: "Wireframe", icon: S }],
  ["Shaded", { title: "Shaded", icon: x }],
  ["WireframeOnShaded", { title: "Wireframe On Shaded", icon: b }],
  ["HiddenLine", { title: "Hidden Line", icon: M }],
  ["XRay", { title: "XRay", icon: D }],
  ["Gooch", { title: "Gooch", icon: g }],
  ["Toon", { title: "Toon", icon: y }]
]);
let n = class extends w {
  constructor() {
    super(...arguments), this.dropDownPosition = "right";
  }
  setDrawMode(i) {
    this.contextManager && this.contextManager.setDrawMode(i);
  }
  /** @internal */
  render() {
    const i = this.webViewerState && c.has(this.webViewerState.drawMode) ? this.webViewerState.drawMode : "WireframeOnShaded", o = c.get(i);
    return p`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Draw mode - ${o.title}"
        >${o.icon}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${u(
      c,
      (e) => {
        var t;
        return p`
            <hoops-button
              .color=${((t = this.webViewerState) == null ? void 0 : t.drawMode) === e[0] ? "accent" : "default"}
              iconSize="sm"
              @click=${() => {
          this.setDrawMode(e[0]);
        }}
              title=${e[1].title}
            >
              <span slot="icon">${e[1].icon}</span>
              ${e[1].title}
            </hoops-button>
          `;
      }
    )}
      </div>
    </hoops-dropdown>`;
  }
};
n.styles = [
  l`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
        padding: 0.2rem 0;
      }
    `
];
a([
  h()
], n.prototype, "dropDownPosition", 2);
a([
  m({ context: $ })
], n.prototype, "contextManager", 2);
a([
  m({ context: v, subscribe: !0 })
], n.prototype, "webViewerState", 2);
n = a([
  f("hoops-toolbar-drawmode")
], n);
const C = n;
export {
  n as HoopsDrawmodeButtonElement,
  C as default
};
