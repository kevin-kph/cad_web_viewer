import { LitElement as d, nothing as c, html as h, css as v } from "lit";
import { state as u, property as p, customElement as x } from "lit/decorators.js";
import "@ts3d-hoops/ui-kit";
import "../hoops-cutting-plane-toolbar/index.js";
import "../hoops-cutting-plane-editor/index.js";
var f = Object.defineProperty, g = Object.getOwnPropertyDescriptor, n = (e, s, r, o) => {
  for (var t = o > 1 ? void 0 : o ? g(s, r) : s, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (t = (o ? l(s, r, t) : l(t)) || t);
  return o && t && f(s, r, t), t;
};
let i = class extends d {
  /**
   * Constructs a new HoopsCuttingPlaneElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateCuttingPlane method for proper event handling context.
   */
  constructor() {
    super(), this.showEditor = !1, this.planeIndex = -1, this.sectionIndex = -1, this.invalidateCuttingPlane = this.invalidateCuttingPlane.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * component synchronized with the state of its associated cutting plane.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @protected
   * @override
   */
  firstUpdated(e) {
    super.firstUpdated(e), this.service && this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateCuttingPlane
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the component
   * is no longer needed.
   *
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && this.service.removeEventListener(
      "hoops-cutting-plane-change",
      this.invalidateCuttingPlane
    );
  }
  /**
   * Event handler that invalidates the component when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this component's section and plane indices.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @private
   */
  invalidateCuttingPlane(e) {
    this.planeIndex === e.detail.planeIndex && this.sectionIndex === e.detail.sectionIndex && this.requestUpdate();
  }
  /** @internal */
  render() {
    return this.planeIndex === -1 || this.sectionIndex === -1 ? c : this.service ? h`<hoops-accordion ?expanded=${this.showEditor}>
      <div slot="header" class="container">
        <div class="header-content">
          <hoops-icon icon="planeIcon"></hoops-icon>
          Cutting Plane ${this.planeIndex + 1}
        </div>
      </div>
      <div slot="icon">
        <hoops-cutting-plane-toolbar
          planeIndex=${this.planeIndex}
          sectionIndex=${this.sectionIndex}
          @change=${() => this.showEditor = !this.showEditor}
          .service=${this.service}
        ></hoops-cutting-plane-toolbar>
      </div>
      <div slot="content">
        <hoops-cutting-plane-editor
          sectionIndex=${this.sectionIndex}
          planeIndex=${this.planeIndex}
          .service=${this.service}
        ></hoops-cutting-plane-editor>
      </div>
    </hoops-accordion>` : c;
  }
};
i.styles = [
  v`
      :host {
        display: block;
      }

      .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-flow: row nowrap;
        font-size: 0.75rem;
      }

      .header-content {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }
    `
];
n([
  u()
], i.prototype, "showEditor", 2);
n([
  p({ type: Number })
], i.prototype, "planeIndex", 2);
n([
  p({ type: Number })
], i.prototype, "sectionIndex", 2);
n([
  p({ type: Object })
], i.prototype, "service", 2);
i = n([
  x("hoops-cutting-plane")
], i);
export {
  i as HoopsCuttingPlaneElement
};
