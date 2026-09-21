import { LitElement as p, html as s, nothing as m, css as h } from "lit";
import { property as M, customElement as g } from "lit/decorators.js";
import { icons as f, componentBaseStyle as d } from "@ts3d-hoops/ui-kit";
import { Operators as t } from "@ts3d-hoops/web-viewer";
var v = Object.defineProperty, k = Object.getOwnPropertyDescriptor, l = (e, r, a, i) => {
  for (var o = i > 1 ? void 0 : i ? k(r, a) : r, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (o = (i ? c(r, a, o) : c(o)) || o);
  return i && o && v(r, a, o), o;
};
let n = class extends p {
  getMeasureMarkupLabel(e) {
    return e instanceof t.Markup.Measure.MeasurePointPointDistanceMarkup ? "Point to Point" : e instanceof t.Markup.Measure.MeasureFaceFaceDistanceMarkup ? "Face to Face" : e instanceof t.Markup.Measure.MeasureStraightEdgeLengthMarkup ? "Edge Length" : e instanceof t.Markup.Measure.MeasureCircleEdgeLengthMarkup ? "Circle Length" : e instanceof t.Markup.Measure.MeasureFaceFaceAngleMarkup ? "Face Angle" : "Measurement";
  }
  getMeasureMarkupIcon(e) {
    return e instanceof t.Markup.Measure.MeasurePointPointDistanceMarkup ? s`<hoops-icon title="Point to Point" icon="measurePoint"></hoops-icon>` : e instanceof t.Markup.Measure.MeasureFaceFaceDistanceMarkup ? s`<hoops-icon title="Face to Face" icon="measureDistance"></hoops-icon>` : e instanceof t.Markup.Measure.MeasureStraightEdgeLengthMarkup ? s`<hoops-icon title="Straight Edge Length" icon="measureEdge"></hoops-icon>` : e instanceof t.Markup.Measure.MeasureCircleEdgeLengthMarkup ? s`<hoops-icon title="Circle Edge Length" icon="measureEdge"></hoops-icon>` : e instanceof t.Markup.Measure.MeasureFaceFaceAngleMarkup ? s`<hoops-icon title="Face to Face Angle" icon="measureAngle"></hoops-icon>` : s``;
  }
  getMeasureMarkupValue(e) {
    try {
      return e.getMeasurementText();
    } catch (r) {
      return console.error("Error getting measurement value:", r), "N/A";
    }
  }
  dispatchRemoval(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-measurement-remove-command", {
        detail: { measurement: e },
        composed: !0,
        bubbles: !0
      })
    );
  }
  /** @internal */
  render() {
    if (!this.measurement)
      return m;
    const e = this.getMeasureMarkupLabel(this.measurement), r = this.getMeasureMarkupValue(this.measurement), a = `${e}: ${r}`;
    return s`
      <div class="measure-container" title="${a}">
        ${this.getMeasureMarkupIcon(this.measurement)}
        <span class="measure-label">${r}</span>
      </div>
      <hoops-icon-button
        class="trash-button"
        color="default"
        title="Remove Measurement"
        @click=${() => {
      this.measurement && this.dispatchRemoval(this.measurement);
    }}
        style="--hoops-icon-color: var(--hoops-svg-stroke-color, #303030);"
      >
        ${f.removeIcon}
      </hoops-icon-button>
    `;
  }
};
n.styles = [
  d,
  h`
      :host {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem;
        width: 100%;
        transition: background-color 0.15s ease;
        border-radius: 0.25rem;
        min-height: 1.8rem;
        border-bottom: 1px dashed var(--hoops-foreground, #303030);
      }
      .measure-container {
        display: flex;
        align-items: center;
        flex-grow: 1;
        min-width: 0;
      }
      .measure-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        font-size: 0.875rem;
        color: var(--hoops-neutral-foreground, #303030);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
      }
      .trash-button {
        flex-shrink: 0;
      }
      hoops-icon {
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
        color: var(--hoops-svg-stroke-color, #303030);
      }
    `
];
l([
  M({ attribute: !1 })
], n.prototype, "measurement", 2);
n = l([
  g("hoops-tools-measurement-item")
], n);
const P = n;
export {
  n as HoopsToolsMeasurementItemElement,
  P as default
};
