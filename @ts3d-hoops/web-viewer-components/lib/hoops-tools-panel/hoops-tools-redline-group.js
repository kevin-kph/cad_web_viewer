import { LitElement as h, html as c, css as v } from "lit";
import { customElement as m } from "lit/decorators.js";
import { consume as u } from "@lit/context";
import { icons as a } from "@ts3d-hoops/ui-kit";
import "../context-manager/index.js";
import { OperatorId as o } from "@ts3d-hoops/web-viewer";
import "../hoops-markup-tree/index.js";
import "../services/index.js";
import { getService as f } from "../services/serviceRegistry.js";
import { contextManagerContext as g, webViewerStateContext as b } from "../context-manager/context-manager.js";
var k = Object.defineProperty, w = Object.getOwnPropertyDescriptor, p = (t, r, n, i) => {
  for (var e = i > 1 ? void 0 : i ? w(r, n) : r, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (e = (i ? d(r, n, e) : d(e)) || e);
  return i && e && k(r, n, e), e;
};
let s = class extends h {
  constructor() {
    super(...arguments), this.onMarkupsUpdated = () => {
      this.requestUpdate();
    };
  }
  setActiveTool(t) {
    this.contextManager ? this.contextManager.activeToolOperator = t : console.error("Cannot set redline tool: WebViewer not initialized");
  }
  /**
   * @internal
   */
  firstUpdated() {
    if (!this.contextManager) {
      console.error("Cannot initialize redline tools: WebViewer not initialized");
      return;
    }
    this.service = f("RedlineService"), this.service && (this.service.addEventListener("hoops-redline-created", this.onMarkupsUpdated), this.service.addEventListener("hoops-redline-deleted", this.onMarkupsUpdated), this.service.addEventListener("hoops-redline-view-deleted", this.onMarkupsUpdated), this.service.addEventListener("hoops-markup-manager-reset", this.onMarkupsUpdated));
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && (this.service.removeEventListener("hoops-redline-created", this.onMarkupsUpdated), this.service.removeEventListener("hoops-redline-deleted", this.onMarkupsUpdated), this.service.removeEventListener("hoops-redline-view-deleted", this.onMarkupsUpdated), this.service.removeEventListener("hoops-markup-manager-reset", this.onMarkupsUpdated));
  }
  /** @internal */
  render() {
    var t, r, n, i, e;
    return c`
      <hoops-tools-group label="Redline">
        <div class="content">
          <div class="tools">
            <hoops-icon-button
              color=${((t = this.webViewerState) == null ? void 0 : t.toolOperator) === o.RedlineCircle ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(o.RedlineCircle);
    }}
              title="Redline Circle"
            >
              ${a.redlineCircle}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((r = this.webViewerState) == null ? void 0 : r.toolOperator) === o.RedlineText ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(o.RedlineText);
    }}
              title="Redline Note"
            >
              ${a.redlineNote}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((n = this.webViewerState) == null ? void 0 : n.toolOperator) === o.RedlineRectangle ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(o.RedlineRectangle);
    }}
              title="Redline Rectangle"
            >
              ${a.redlineRectangle}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((i = this.webViewerState) == null ? void 0 : i.toolOperator) === o.RedlinePolyline ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(o.RedlinePolyline);
    }}
              title="Redline Freehand"
            >
              ${a.redlineFreehand}
            </hoops-icon-button>
          </div>
          <div class="markups">
            ${(e = this.service) != null && e.getRedlineViewKeys().length ? c`<hoops-markup-tree .redlineService=${this.service}></hoops-markup-tree>` : c`<div class="placeholder">No Redlines</div>`}
          </div>
        </div>
      </hoops-tools-group>
    `;
  }
};
s.styles = v`
    :host {
      display: block;
    }

    .content {
      padding: 0.5rem;
    }

    .tools {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .markups {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;

      border-radius: 0.25rem;
      border: 1px solid var(--hoops-foreground, #303030);
      background-color: var(--hoops-neutral-background-20, #fafafa);
      max-height: 10rem;
      overflow-y: auto;
    }

    .markup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px dashed var(--hoops-foreground, #303030);
    }

    .markup.selected {
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-accent-foreground-active, var(--blue, #0078d4)) 10%
      );
    }

    .markupIcon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .markupText {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 5rem);
    }

    .markup:hover,
    .markup:hover .markupIcon {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-foreground, #303030) 5%
      );
    }

    .remove {
      justify-self: flex-end;
    }

    .markup.selected .markupIcon,
    .markup.selected .remove svg {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hoops-foreground, #303030);
      opacity: 0.5;
      font-size: 0.875rem;
      font-weight: 500;
    }

    hoops-markup-tree {
      overflow-y: auto;
      overflow-x: hidden;
    }
  `;
p([
  u({ context: g })
], s.prototype, "contextManager", 2);
p([
  u({ context: b, subscribe: !0 })
], s.prototype, "webViewerState", 2);
s = p([
  m("hoops-tools-redline-group")
], s);
const L = s;
export {
  s as HoopsToolsRedlineGroupElement,
  L as default
};
