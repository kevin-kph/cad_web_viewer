import { LitElement as p, html as m, css as h } from "lit";
import { property as d, customElement as M } from "lit/decorators.js";
import { icons as r, componentBaseStyle as b } from "@ts3d-hoops/ui-kit";
import { OperatorId as e } from "@ts3d-hoops/web-viewer";
var f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, u = (s, n, c, a) => {
  for (var t = a > 1 ? void 0 : a ? v(n, c) : n, i = s.length - 1, l; i >= 0; i--)
    (l = s[i]) && (t = (a ? l(n, c, t) : l(t)) || t);
  return a && t && f(n, c, t), t;
};
let o = class extends p {
  selectMeasurementTool(s) {
    this.dispatchEvent(
      new CustomEvent("measurement-tool-selected", {
        detail: { operator: s }
      })
    );
  }
  /** @internal */
  render() {
    return m`
      <hoops-icon-button
        color=${this.activeToolOperator === e.MeasurePointPointDistance ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, e.MeasurePointPointDistance)}"
        title="Measure Point to Point"
      >
        ${r.measurePoint}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === e.MeasureFaceFaceDistance ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, e.MeasureFaceFaceDistance)}"
        title="Measure Distance Between Faces"
      >
        ${r.measureDistance}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === e.MeasureFaceFaceAngle ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, e.MeasureFaceFaceAngle)}"
        title="Measure Angle Between Faces"
      >
        ${r.measureAngle}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === e.MeasureEdgeLength ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, e.MeasureEdgeLength)}"
        title="Measure Edges"
      >
        ${r.measureEdge}
      </hoops-icon-button>
    `;
  }
};
o.styles = [
  b,
  h`
      :host {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        border: none;
      }
    `
];
u([
  d({ type: Number })
], o.prototype, "activeToolOperator", 2);
o = u([
  M("hoops-tools-measurement-actions")
], o);
const E = o;
export {
  o as HoopsToolsMeasurementActionsElement,
  E as default
};
