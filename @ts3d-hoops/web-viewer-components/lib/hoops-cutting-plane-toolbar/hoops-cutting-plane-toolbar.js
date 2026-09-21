import { LitElement as p, nothing as h, html as d, css as u } from "lit";
import { property as a, customElement as v } from "lit/decorators.js";
var b = Object.defineProperty, g = Object.getOwnPropertyDescriptor, l = (e, t, n, o) => {
  for (var i = o > 1 ? void 0 : o ? g(t, n) : t, c = e.length - 1, r; c >= 0; c--)
    (r = e[c]) && (i = (o ? r(t, n, i) : r(i)) || i);
  return o && i && b(t, n, i), i;
};
let s = class extends p {
  /**
   * Constructs a new HoopsCuttingPlaneToolbarElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateToolbar method for proper event handling context.
   */
  constructor() {
    super(), this.sectionIndex = -1, this.planeIndex = -1, this.service = null, this.invalidateToolbar = this.invalidateToolbar.bind(this);
  }
  /**
   * Event handler that invalidates the toolbar when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this toolbar's section and plane indices.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @internal
   */
  invalidateToolbar(e) {
    e.detail.sectionIndex === this.sectionIndex && e.detail.planeIndex === this.planeIndex && this.requestUpdate();
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * toolbar synchronized with the state of its associated cutting plane.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   * @override
   */
  firstUpdated(e) {
    super.firstUpdated(e), this.service && this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateToolbar
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the toolbar
   * is no longer needed.
   *
   * @internal
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && this.service.removeEventListener(
      "hoops-cutting-plane-change",
      this.invalidateToolbar
    );
  }
  /** @internal */
  render() {
    var n;
    const e = (n = this.service) == null ? void 0 : n.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!e)
      return h;
    const t = !!e.referenceGeometry;
    return d`<div class="container">
      <hoops-button
        title="Customize Cutting Plane"
        iconSize="sm"
        @click=${(o) => {
      o.stopPropagation(), this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0 }));
    }}
      >
        <hoops-icon slot="icon" icon="editIcon"></hoops-icon>
      </hoops-button>
      <hoops-button title="Invert Cutting Plane" iconSize="sm" @click=${this.onInvertCuttingPlane}>
        <label slot="icon">
          <hoops-icon icon="invertIcon"></hoops-icon>
        </label>
      </hoops-button>
      <hoops-button
        title="Toggle Reference Geometry Visibility"
        iconSize="sm"
        @click=${this.onToggleVisibility}
      >
        <label slot="icon">
          <hoops-icon
            icon=${t ? "visibilityShown" : "visibilityHidden"}
            class="visibility-icon"
          ></hoops-icon>
        </label>
      </hoops-button>
      <hoops-icon-button title="Remove Cutting Plane" size="sm" @click=${this.onRemoveCuttingPlane}>
        <hoops-icon icon="removeIcon" class="remove-icon"></hoops-icon>
      </hoops-icon-button>
    </div>`;
  }
  /**
   * Handles the invert cutting plane button click event.
   *
   * Inverts the cutting plane by negating its normal vector and distance,
   * effectively flipping the plane's orientation to cut from the opposite side.
   *
   * @param event - The mouse click event from the invert button
   * @internal
   */
  onInvertCuttingPlane(e) {
    if (e.stopPropagation(), !this.service)
      return;
    const t = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    t && (t.plane.normal.negate(), t.plane.d = -t.plane.d, this.service.updateCuttingPlane(this.sectionIndex, this.planeIndex, {
      plane: t.plane
    }));
  }
  /**
   * Handles the toggle visibility button click event.
   *
   * Toggles the visibility of the cutting plane's reference geometry,
   * switching between showing and hiding the visual representation of the plane.
   *
   * @param event - The click event from the toggle visibility button
   * @internal
   */
  onToggleVisibility(e) {
    if (e.stopPropagation(), !this.service)
      return;
    const t = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    t && this.service.setCuttingPlaneVisibility(
      this.sectionIndex,
      this.planeIndex,
      !t.referenceGeometry
    );
  }
  /**
   * Handles the remove cutting plane button click event.
   *
   * Removes the cutting plane from its section, permanently deleting it
   * from the cutting configuration. This action cannot be undone.
   *
   * @param event - The click event from the remove button
   * @internal
   */
  onRemoveCuttingPlane(e) {
    e.stopPropagation(), this.service && this.service.removeCuttingPlane(this.sectionIndex, this.planeIndex);
  }
};
s.styles = [
  u`
      :host {
        display: block;
      }

      .container {
        display: flex;
      }

      .visibility-icon {
        width: 100%;
      }

      .remove-icon {
        width: 80%;
      }
    `
];
l([
  a({ type: Number })
], s.prototype, "sectionIndex", 2);
l([
  a({ type: Number })
], s.prototype, "planeIndex", 2);
l([
  a({ type: Object })
], s.prototype, "service", 2);
s = l([
  v("hoops-cutting-plane-toolbar")
], s);
export {
  s as HoopsCuttingPlaneToolbarElement
};
