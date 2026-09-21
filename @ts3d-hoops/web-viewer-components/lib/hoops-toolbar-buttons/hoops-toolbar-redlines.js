import { consume as m } from "@lit/context";
import { LitElement as h, html as p, css as w } from "lit";
import { customElement as u } from "lit/decorators.js";
import { map as b } from "lit/directives/map.js";
import { OperatorId as i } from "@ts3d-hoops/web-viewer";
import "../context-manager/index.js";
import { redlineCircle as f, redlineNote as x, redlineRectangle as R, redlineFreehand as v } from "@ts3d-hoops/ui-kit/icons";
import { contextManagerContext as g, webViewerStateContext as C } from "../context-manager/context-manager.js";
var y = Object.defineProperty, M = Object.getOwnPropertyDescriptor, a = (e, r, l, n) => {
  for (var t = n > 1 ? void 0 : n ? M(r, l) : r, o = e.length - 1, d; o >= 0; o--)
    (d = e[o]) && (t = (n ? d(r, l, t) : d(t)) || t);
  return n && t && y(r, l, t), t;
};
const c = /* @__PURE__ */ new Map([
  [i.RedlineCircle, { title: "Circle", icon: f }],
  [i.RedlineText, { title: "Text", icon: x }],
  [i.RedlineRectangle, { title: "Rectangle", icon: R }],
  [i.RedlinePolyline, { title: "Free hand", icon: v }]
]);
let s = class extends h {
  constructor() {
    super(...arguments), this.handleKeyDown = (e) => {
      e.key === "Escape" && this.setRedlineMode(i.Select);
    };
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this.handleKeyDown);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    window.removeEventListener("keydown", this.handleKeyDown), super.disconnectedCallback();
  }
  setRedlineMode(e) {
    this.contextManager ? this.contextManager.setRedlineOperator(e) : console.error("Cannot set redline mode: WebViewer not initialized");
  }
  /** @internal */
  render() {
    var n, t;
    let e = this.webViewerState && c.has(this.webViewerState.toolOperator) ? this.webViewerState.toolOperator : i.RedlineText;
    c.has(e) || (e = i.RedlineText);
    const r = (n = c.get(e)) == null ? void 0 : n.icon, l = [(t = this.contextManager) != null && t.isRedlineOperatorActive() ? "active" : ""].join(
      " "
    );
    return p`<hoops-dropdown position="right">
      <hoops-icon-button class="${l}" size="sm" title="Redline markups"
        >${r}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${b(
      c,
      (o) => p`
            <hoops-button
              iconSize="sm"
              @click=${() => {
        this.setRedlineMode(o[0]);
      }}
              title=${o[1].title}
            >
              <span slot="icon">${o[1].icon}</span>
              ${o[1].title}
            </hoops-button>
          `
    )}
      </div>
    </hoops-dropdown>`;
  }
};
s.styles = [
  w`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
        padding: 0.2rem 0;
      }

      .active {
        background-color: var(--hoops-neutral-background-hover, #303030cc);
        border-radius: 50%;
      }
    `
];
a([
  m({ context: g })
], s.prototype, "contextManager", 2);
a([
  m({ context: C, subscribe: !0 })
], s.prototype, "webViewerState", 2);
s = a([
  u("hoops-toolbar-redlines")
], s);
const P = s;
export {
  s as HoopsRedlinesButtonElement,
  P as default
};
