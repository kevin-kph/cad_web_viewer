import { LitElement as v, html as i, css as m } from "lit";
import { customElement as f } from "lit/decorators.js";
import { consume as h } from "@lit/context";
import { icons as c } from "@ts3d-hoops/ui-kit";
import "../context-manager/index.js";
import { OperatorId as l } from "@ts3d-hoops/web-viewer";
import "../services/index.js";
import "../services/notetext/index.js";
import { getService as u } from "../services/serviceRegistry.js";
import { formatNoteTextIcon as g } from "../services/notetext/utils.js";
import { contextManagerContext as x, webViewerStateContext as k } from "../context-manager/context-manager.js";
var b = Object.defineProperty, M = Object.getOwnPropertyDescriptor, d = (e, t, n, r) => {
  for (var o = r > 1 ? void 0 : r ? M(t, n) : t, a = e.length - 1, p; a >= 0; a--)
    (p = e[a]) && (o = (r ? p(t, n, o) : p(o)) || o);
  return r && o && b(t, n, o), o;
};
let s = class extends v {
  constructor() {
    super(...arguments), this.onMarkupsUpdated = () => {
      this.requestUpdate();
    };
  }
  setActiveTool(e) {
    if (!this.contextManager) {
      console.error("Cannot set markup tool: WebViewer not initialized");
      return;
    }
    this.contextManager.activeToolOperator = e;
  }
  /**
   * @internal
   */
  firstUpdated() {
    if (!this.contextManager) {
      console.error("Cannot initialize redline tools: WebViewer not initialized");
      return;
    }
    this.service = u("NoteTextService"), this.service && (this.service.addEventListener("hoops-note-text-created", this.onMarkupsUpdated), this.service.addEventListener("hoops-note-text-deleted", this.onMarkupsUpdated), this.service.addEventListener("hoops-note-text-updated", this.onMarkupsUpdated), this.service.addEventListener("hoops-note-text-hidden", this.onMarkupsUpdated), this.service.addEventListener("hoops-note-text-shown", this.onMarkupsUpdated), this.service.addEventListener("hoops-note-text-manager-reset", this.onMarkupsUpdated));
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && (this.service.removeEventListener("hoops-note-text-created", this.onMarkupsUpdated), this.service.removeEventListener("hoops-note-text-deleted", this.onMarkupsUpdated), this.service.removeEventListener("hoops-note-text-updated", this.onMarkupsUpdated), this.service.removeEventListener("hoops-note-text-hidden", this.onMarkupsUpdated), this.service.removeEventListener("hoops-note-text-shown", this.onMarkupsUpdated), this.service.removeEventListener("hoops-note-text-manager-reset", this.onMarkupsUpdated));
  }
  selectMarkup(e) {
    if (!this.service) {
      console.error("Cannot select markup: NoteTextService not initialized");
      return;
    }
    this.service.setActiveNoteText(e);
  }
  /** @internal */
  render() {
    var r;
    const e = u("NoteTextService"), t = (e == null ? void 0 : e.getNoteTexts()) || [], n = e == null ? void 0 : e.getActiveNoteTextKey();
    return i`
      <hoops-tools-group label="Markup">
        <div class="content">
          <div class="tools">
            <hoops-icon-button
              color=${((r = this.webViewerState) == null ? void 0 : r.toolOperator) === l.Note ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(l.Note);
    }}
              title="Note"
            >
              ${c.note}
            </hoops-icon-button>
          </div>
          <div class="markups">
            ${t.length ? t.map(
      (o) => i`
                    <div
                      class=${["markup", o.id === n ? "selected" : ""].join(
        " "
      )}
                      @click=${() => this.selectMarkup(o.id)}
                    >
                      <div class="markupIcon">
                        <hoops-icon icon=${g(o.type)}></hoops-icon>
                      </div>
                      <div class="markupText">
                        ${o.text || i`<div class="placeholder">No text</div>`}
                      </div>
                      <hoops-icon-button
                        class="remove"
                        @click=${(a) => {
        a.stopPropagation(), e == null || e.removeNoteText(o);
      }}
                        >${c.removeIcon}</hoops-icon-button
                      >
                    </div>
                  `
    ) : i`<div class="placeholder">No markups</div>`}
          </div>
        </div>
      </hoops-tools-group>
    `;
  }
};
s.styles = m`
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
  `;
d([
  h({ context: x })
], s.prototype, "contextManager", 2);
d([
  h({ context: k, subscribe: !0 })
], s.prototype, "webViewerState", 2);
s = d([
  f("hoops-tools-markup-group")
], s);
const S = s;
export {
  s as HoopsToolsGroupMarkupElement,
  S as default
};
