import { LitElement as u, html as f, css as h } from "lit";
import { customElement as b } from "lit/decorators.js";
import { consume as m } from "@lit/context";
import { icons as p } from "@ts3d-hoops/ui-kit";
import "../context-manager/index.js";
import { OperatorId as s } from "@ts3d-hoops/web-viewer";
import "./hoops-tools-group.js";
import { contextManagerContext as S, webViewerStateContext as d } from "../context-manager/context-manager.js";
var v = Object.defineProperty, w = Object.getOwnPropertyDescriptor, a = (e, t, c, l) => {
  for (var o = l > 1 ? void 0 : l ? w(t, c) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (o = (l ? n(t, c, o) : n(o)) || o);
  return l && o && v(t, c, o), o;
};
let r = class extends u {
  setActiveTool(e) {
    this.contextManager ? this.contextManager.activeToolOperator = e : console.error("Cannot set select tool: WebViewer not initialized");
  }
  /** @internal */
  render() {
    var e, t;
    return f`
      <hoops-tools-group label="Selection">
        <div class="content">
          <hoops-icon-button
            color=${((e = this.webViewerState) == null ? void 0 : e.toolOperator) === s.Select ? "accent" : "default"}
            @click=${() => {
      this.setActiveTool(s.Select);
    }}
            title="Select Parts"
          >
            ${p.select}
          </hoops-icon-button>
          <hoops-icon-button
            color=${((t = this.webViewerState) == null ? void 0 : t.toolOperator) === s.AreaSelect ? "accent" : "default"}
            @click=${() => {
      this.setActiveTool(s.AreaSelect);
    }}
            title="Select Area"
          >
            ${p.areaSelect}
          </hoops-icon-button>
        </div>
      </hoops-tools-group>
    `;
  }
};
r.styles = h`
    :host {
      display: block;
    }

    .content {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }
  `;
a([
  m({ context: S })
], r.prototype, "contextManager", 2);
a([
  m({ context: d, subscribe: !0 })
], r.prototype, "webViewerState", 2);
r = a([
  b("hoops-tools-select-group")
], r);
const P = r;
export {
  r as HoopsToolsSelectGroupElement,
  P as default
};
