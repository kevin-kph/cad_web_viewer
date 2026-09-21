import { consume as c } from "@lit/context";
import { LitElement as p, html as i, css as u } from "lit";
import { customElement as d } from "lit/decorators.js";
import { componentBaseStyle as h } from "@ts3d-hoops/ui-kit";
import "../../context-manager/index.js";
import "./hoops-tools-measurement-actions.js";
import "./hoops-tools-measurement-item.js";
import "../../services/index.js";
import { getService as v } from "../../services/serviceRegistry.js";
import { contextManagerContext as f, webViewerStateContext as b } from "../../context-manager/context-manager.js";
var g = Object.defineProperty, M = Object.getOwnPropertyDescriptor, l = (t, e, o, a) => {
  for (var r = a > 1 ? void 0 : a ? M(e, o) : e, n = t.length - 1, m; n >= 0; n--)
    (m = t[n]) && (r = (a ? m(e, o, r) : m(r)) || r);
  return a && r && g(e, o, r), r;
};
let s = class extends p {
  constructor() {
    super(...arguments), this.handleMeasurementUpdate = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), this.service = v("MeasurementService"), this.service.addEventListener("hoops-measurement-updated", this.handleMeasurementUpdate);
  }
  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Cleans up event listeners to prevent memory leaks.
   *
   * @override
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service.removeEventListener("hoops-measurement-updated", this.handleMeasurementUpdate);
  }
  /**
   * Handles measurement tool selection events.
   * Sets the active tool operator in the context manager when a measurement tool is selected.
   *
   * @param {MeasurementToolSelectedEvent} event - The measurement tool selection event
   * @returns {void}
   */
  handleMeasurementToolSelection(t) {
    var o;
    if (!((o = this.contextManager) != null && o.webViewer))
      return;
    const { operator: e } = t.detail;
    this.contextManager.activeToolOperator = e;
  }
  /**
   * Handles measurement removal commands.
   * Removes the specified measurement from the measurement service.
   *
   * @param {MeasurementRemoveCommand} event - The measurement remove command event
   * @returns {void}
   */
  handleMeasurementRemoveCommand(t) {
    const { measurement: e } = t.detail;
    this.service.removeMeasurement(e);
  }
  /** @internal */
  render() {
    var e;
    const t = this.service.measurements.length > 0;
    return i`
      <hoops-tools-group label="Measurement">
        <hoops-tools-measurement-actions
          activeToolOperator=${(e = this.webviewerState) == null ? void 0 : e.toolOperator}
          @measurement-tool-selected=${this.handleMeasurementToolSelection}
        ></hoops-tools-measurement-actions>
        <div class="measurement-list">
          ${t ? this.service.measurements.map(
      (o) => i`<hoops-tools-measurement-item
                    @hoops-measurement-remove-command=${this.handleMeasurementRemoveCommand}
                    .measurement=${o}
                  ></hoops-tools-measurement-item>`
    ) : i`<div class="empty-state">No measurements</div>`}
        </div>
      </hoops-tools-group>
    `;
  }
};
s.styles = [
  h,
  u`
      :host {
        display: block;
      }

      .measurement-list {
        margin: 0.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        border: 1px solid var(--hoops-foreground, #303030);
        border-radius: 0.25rem;
        scrollbar-width: thin;
        scrollbar-color: var(--hoops-neutral-foreground-20, #aaaaaa) transparent;
        background-color: var(--hoops-neutral-background-20, #fafafa);
        padding: 0.5rem;
      }

      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0.5;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `
];
l([
  c({
    context: f,
    subscribe: !0
  })
], s.prototype, "contextManager", 2);
l([
  c({ context: b, subscribe: !0 })
], s.prototype, "webviewerState", 2);
s = l([
  d("hoops-tools-measurement-group")
], s);
const P = s;
export {
  s as HoopsToolsMeasurementGroupElement,
  P as default
};
