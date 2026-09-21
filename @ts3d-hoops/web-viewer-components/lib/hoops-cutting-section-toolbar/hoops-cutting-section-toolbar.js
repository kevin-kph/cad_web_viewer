import { LitElement as g, nothing as v, html as m, css as f } from "lit";
import { property as u, query as b, customElement as P } from "lit/decorators.js";
import { createReferenceGeometryFromAxis as d, Plane as r, createReferenceGeometryFromFaceNormal as p, Point3 as C } from "@ts3d-hoops/common";
var y = Object.defineProperty, x = Object.getOwnPropertyDescriptor, l = (e, s, a, n) => {
  for (var t = n > 1 ? void 0 : n ? x(s, a) : s, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (t = (n ? i(s, a, t) : i(t)) || t);
  return n && t && y(s, a, t), t;
};
let c = class extends g {
  /**
   * Constructs a new HoopsCuttingSectionToolbarElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateToolbar method for proper event handling context.
   */
  constructor() {
    super(), this.sectionIndex = -1, this.invalidateToolbar = this.invalidateToolbar.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting section and face selection change events
   * to keep the toolbar synchronized with the current state of the cutting section
   * and user selections.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   */
  firstUpdated(e) {
    super.firstUpdated(e), this.service && (this.service.addEventListener(
      "hoops-cutting-section-change",
      this.invalidateToolbar
    ), this.service.addEventListener(
      "hoops-cutting-face-selection-change",
      this.invalidateToolbar
    ));
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the toolbar
   * is no longer needed.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && (this.service.removeEventListener(
      "hoops-cutting-section-change",
      this.invalidateToolbar
    ), this.service.removeEventListener(
      "hoops-cutting-face-selection-change",
      this.invalidateToolbar
    ));
  }
  /**
   * Event handler that invalidates the toolbar when the associated cutting section changes.
   *
   * This method listens for cutting section and face selection change events and triggers
   * a re-render if the changed section matches this toolbar's section index or if the
   * event affects face selection state.
   *
   * @param event - Custom event containing section index or general selection changes
   * @internal
   */
  invalidateToolbar(e) {
    (e.detail === null || e.detail.sectionIndex === this.sectionIndex) && this.requestUpdate();
  }
  /**
   * Hides the dropdown menu after a plane creation operation.
   *
   * This method programmatically closes the dropdown to provide better user experience
   * after plane creation, preventing the menu from staying open unnecessarily.
   *
   * @internal
   */
  hideDropdown() {
    this._dropdown && this._dropdown.menuShown && (this._dropdown.menuShown = !1);
  }
  /** @internal */
  render() {
    if (!this.service)
      return v;
    const e = this.service.getCuttingSection(this.sectionIndex), s = this.service.getSelectedFace(), n = (this.service.getCuttingPlaneCount(this.sectionIndex) ?? 0) >= 3;
    return m`<div class="container" @click=${(t) => t.stopPropagation()}>
      <hoops-dropdown ?disabled=${n}>
        <hoops-icon-button ?disabled=${n}>
          <hoops-icon icon="addIcon"></hoops-icon>
        </hoops-icon-button>
        <div slot="dropdown-popup">
          <hoops-icon-button
            title="Create Cutting Plane An X Axis"
            @click=${(t) => {
      if (t.stopPropagation(), !this.service)
        return;
      const o = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: r.createFromCoefficients(1, 0, 0, -o.max.x),
        referenceGeometry: e != null && e.hideReferenceGeometry ? void 0 : d("x", o)
      }), this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneX" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Cutting Plane An Y Axis"
            @click=${(t) => {
      if (t.stopPropagation(), !this.service)
        return;
      const o = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: r.createFromCoefficients(0, 1, 0, -o.max.y),
        referenceGeometry: e != null && e.hideReferenceGeometry ? void 0 : d("y", o)
      }), this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneY" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Cutting Plane An Z Axis"
            @click=${(t) => {
      if (t.stopPropagation(), !this.service)
        return;
      const o = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: r.createFromCoefficients(0, 0, 1, -o.max.z),
        referenceGeometry: e != null && e.hideReferenceGeometry ? void 0 : d("z", o)
      }), this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneZ" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            ?disabled=${!s}
            title="Create Cutting Plane An Selected Face"
            @click=${(t) => {
      if (t.stopPropagation(), !this.service)
        return;
      const o = this.service.getModelBounding(), i = this.service.getSelectedFace();
      i && (this.service.addCuttingPlane(this.sectionIndex, {
        plane: r.createFromPointAndNormal(i.position, i.normal),
        referenceGeometry: e != null && e.hideReferenceGeometry ? void 0 : p(
          i.normal,
          i.position,
          o
        )
      }), this.hideDropdown());
    }}
          >
            <hoops-icon icon="viewFace" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Custom Cutting Plane"
            size="sm"
            @click=${(t) => {
      var h;
      if (t.stopPropagation(), !this.service)
        return;
      const o = new C(1, 1, 0).normalize(), i = (h = this.service) == null ? void 0 : h.getModelBounding().center();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: r.createFromPointAndNormal(i, o),
        referenceGeometry: e != null && e.hideReferenceGeometry ? void 0 : p(
          o,
          i,
          this.service.getModelBounding()
        )
      }), this.hideDropdown();
    }}
          >
            <hoops-icon icon="editIcon" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
        </div>
      </hoops-dropdown>
      <hoops-icon-button ?disabled=${!(e != null && e.active)} title="Toggle Cutting Plane Visibility">
        <hoops-icon
          title="Toggle Cutting Planes Visibility"
          icon=${e && e.hideReferenceGeometry ? "cuttingPlaneSection" : "cuttingPlaneSectionToggle"}
          class="cutting-plane-icon"
          @click=${(t) => {
      t.stopPropagation(), !(!this.service || !e) && this.service.setCuttingSectionGeometryVisibility(
        this.sectionIndex,
        !e.hideReferenceGeometry
      );
    }}
        ></hoops-icon>
      </hoops-icon-button>
      <hoops-icon-button
        ?disabled=${!(e != null && e.active)}
        title="Clear Cutting Section"
        @click=${(t) => {
      t.stopPropagation(), this.service && this.service.clearCuttingSection(this.sectionIndex);
    }}
      >
        <hoops-icon icon="cuttingPlaneReset" class="cutting-plane-icon"></hoops-icon>
      </hoops-icon-button>
      <hoops-switch
        ?checked=${e == null ? void 0 : e.active}
        @change=${(t) => {
      t.stopPropagation(), !(!this.service || !e) && this.service.setCuttingSectionState(this.sectionIndex, !e.active);
    }}
      ></hoops-switch>
    </div>`;
  }
};
c.styles = [
  f`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        align-items: center;
      }

      .cutting-plane-icon {
        width: 80%;
      }
    `
];
l([
  u({ type: Number })
], c.prototype, "sectionIndex", 2);
l([
  u({ type: Object })
], c.prototype, "service", 2);
l([
  b("hoops-dropdown")
], c.prototype, "_dropdown", 2);
c = l([
  P("hoops-cutting-section-toolbar")
], c);
export {
  c as HoopsCuttingSectionToolbarElement
};
