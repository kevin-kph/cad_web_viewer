import { LitElement as v, nothing as h, html as g, css as m } from "lit";
import { property as d, queryAll as x, customElement as f } from "lit/decorators.js";
import c from "color-string";
import { Color as u } from "@ts3d-hoops/common";
import { Debouncer as b } from "@ts3d-hoops/ui-kit";
var y = Object.defineProperty, C = Object.getOwnPropertyDescriptor, a = (e, t, i, l) => {
  for (var n = l > 1 ? void 0 : l ? C(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (l ? r(t, i, n) : r(n)) || n);
  return l && n && y(t, i, n), n;
};
let s = class extends v {
  /**
   * Constructs a new HoopsCuttingPlaneEditorElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateEditor method for proper event handling context.
   */
  constructor() {
    super(), this.sectionIndex = 0, this.planeIndex = 0, this.invalidateEditor = this.invalidateEditor.bind(this), this.debouncer = new b(
      async (e) => {
        var t;
        return (t = this.service) == null ? void 0 : t.updateCuttingPlane(this.sectionIndex, this.planeIndex, e);
      }
    );
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * editor synchronized with the state of its associated cutting plane.
   * Also triggers an initial update to ensure the UI reflects current state.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   */
  firstUpdated(e) {
    super.firstUpdated(e), this.service && (this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateEditor
    ), this.requestUpdate());
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the editor
   * is no longer needed.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && this.service.removeEventListener(
      "hoops-cutting-plane-change",
      this.invalidateEditor
    ), this.debouncer.clear();
  }
  /** @internal */
  render() {
    if (!this.service)
      return h;
    const e = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!e)
      return h;
    const i = this.service.getModelBounding().extents().length(), l = e.color ? c.to.hex(e.color.r, e.color.g, e.color.b) : "#000000", n = e.lineColor ? c.to.hex(
      e.lineColor.r,
      e.lineColor.g,
      e.lineColor.b
    ) : "#000000";
    return g`
      <div style="padding: 0.5rem">
        <hoops-coordinate-input
          label="x"
          .value=${e.plane.normal.x}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(o) => this.updatePlane("x", o.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="y"
          .value=${e.plane.normal.y}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(o) => this.updatePlane("y", o.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="z"
          .value=${e.plane.normal.z}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(o) => this.updatePlane("z", o.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="d"
          .value=${e.plane.d}
          min=${-i}
          max=${i}
          @hoops-coordinate-changed=${(o) => this.updatePlane("d", o.detail.value)}
        ></hoops-coordinate-input>
        <div class="color-container">
          <div>borders:</div>
          <div class="color-ui">
            <div>${n}</div>
            <hoops-color-button
              title="Set Cutting Plane Borders Color"
              iconSize="sm"
              .value=${n}
              ?disabled=${e.referenceGeometry === void 0}
              @change=${(o) => {
      var r;
      (r = this == null ? void 0 : this.service) == null || r.setCuttingPlaneLineColor(
        this.sectionIndex,
        this.planeIndex,
        this.htmlToHwvColor(o.target.value)
      );
    }}
            >
              <hoops-icon
                slot="icon"
                icon="borderIcon"
                style="--hoops-svg-stroke-color: ${n}; cursor: pointer"
              ></hoops-icon>
            </hoops-color-button>
          </div>
          <div>color:</div>
          <div class="color-ui">
            <div>${l}</div>
            <hoops-color-button
              title="Set Cutting Plane Color"
              iconSize="sm"
              .value=${l}
              ?disabled=${e.referenceGeometry === void 0}
              @change=${(o) => {
      var r;
      (r = this == null ? void 0 : this.service) == null || r.setCuttingPlaneColor(
        this.sectionIndex,
        this.planeIndex,
        this.htmlToHwvColor(o.target.value)
      );
    }}
            >
              <hoops-icon slot="icon" icon="fillIcon"></hoops-icon>
            </hoops-color-button>
          </div>
          <div>opacity:</div>
          <div style="position: relative; display: flex; align-items: center">
            <input
              style="width: 100%"
              className="vertical-slider"
              type="range"
              min=${0}
              max=${1}
              step="0.01"
              .value=${(e.opacity ?? 1).toString()}
              @change=${(o) => {
      var p;
      o.stopPropagation();
      const r = parseFloat(o.target.value);
      (p = this.service) == null || p.setCuttingPlaneOpacity(this.sectionIndex, this.planeIndex, r);
    }}
            />
            <hoops-icon
              icon="opacityIcon"
              style="'--hoops-svg-stroke-color': color; margin: 0.4rem 0.6rem;"
            ></hoops-icon>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Handles debounced updates to the cutting plane.
   *
   * Implements a debouncing mechanism to prevent excessive service calls
   * when the user makes rapid changes. Updates are delayed by 500ms and
   * any new changes reset the timer.
   *
   * @param cuttingPlane - The modified cutting plane to apply to the service
   * @internal
   */
  onChange(e) {
    this.service && this.debouncer.debounce(500, e).catch((t) => {
      if (t)
        throw t;
    });
  }
  /**
   * Event handler that invalidates the editor when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this editor's section and plane indices.
   * Also updates all coordinate input elements to reflect the new values.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @internal
   */
  invalidateEditor(e) {
    e.detail.sectionIndex === this.sectionIndex && e.detail.planeIndex === this.planeIndex && (this.requestUpdate(), this.coordinateInputs.forEach((t) => t.requestUpdate()));
  }
  /**
   * Updates a specific axis or distance property of the cutting plane.
   *
   * Modifies either the normal vector components (x, y, z) or the distance (d)
   * of the cutting plane and triggers a debounced update to the service.
   *
   * @param axis - The plane property to update ('x', 'y', 'z' for normal vector, 'd' for distance)
   * @param value - The new value for the specified property
   * @internal
   */
  updatePlane(e, t) {
    if (!this.service)
      return;
    const i = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    i && (e === "d" ? i.plane.d = t : i.plane.normal[e] = t, this.onChange(i));
  }
  /**
   * Converts an HTML color string to a HOOPS Web Viewer color object.
   *
   * Parses various HTML color formats (hex, rgb, etc.) and converts them
   * to the IColor interface used by the HOOPS Web Viewer. Returns black
   * as a fallback if the color string cannot be parsed.
   *
   * @param color - HTML color string (e.g., "#ff0000", "rgb(255,0,0)", "red")
   * @returns IColor object with RGB values, or black (0,0,0) if parsing fails
   * @internal
   */
  htmlToHwvColor(e) {
    const t = c.get.rgb(e);
    return t ? new u(t[0], t[1], t[2]) : new u(0, 0, 0);
  }
};
s.styles = [
  m`
      :host {
        display: block;
      }

      .color-container {
        display: grid;
        grid-template-columns: min-content auto;
        gap: 0.25rem;
        margin-top: 1rem;
        align-items: center;
      }

      .color-ui {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
      }
    `
];
a([
  d({ type: Number })
], s.prototype, "sectionIndex", 2);
a([
  d({ type: Number })
], s.prototype, "planeIndex", 2);
a([
  d({ type: Object })
], s.prototype, "service", 2);
a([
  x("hoops-coordinate-input")
], s.prototype, "coordinateInputs", 2);
s = a([
  f("hoops-cutting-plane-editor")
], s);
const S = s;
export {
  s as HoopsCuttingPlaneEditorElement,
  S as default
};
