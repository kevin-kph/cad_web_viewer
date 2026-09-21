import { LitElement as p, nothing as h, html as l, css as v } from "lit";
import { property as a, state as u, customElement as g } from "lit/decorators.js";
import "../hoops-cutting-section-toolbar/index.js";
var m = Object.defineProperty, f = Object.getOwnPropertyDescriptor, o = (e, n, s, d) => {
  for (var t = d > 1 ? void 0 : d ? f(n, s) : n, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (t = (d ? c(n, s, t) : c(t)) || t);
  return d && t && m(n, s, t), t;
};
let i = class extends p {
  /**
   * Constructs a new HoopsCuttingSectionElement.
   *
   * Initializes the component with default property values and binds
   * event handler methods for proper context preservation.
   */
  constructor() {
    super(), this.sectionIndex = 0, this.expanded = !1, this.label = "", this.invalidateSection = this.invalidateSection.bind(this), this.handleCuttingPlaneAdded = this.handleCuttingPlaneAdded.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting service events to keep the
   * section synchronized with the service state.
   *
   * @param _changedProperties - Map of changed properties
   * @internal
   */
  firstUpdated(e) {
    super.firstUpdated(e), this.service && (this.service.addEventListener(
      "hoops-cutting-service-reset",
      this.invalidateSection
    ), this.service.addEventListener(
      "hoops-cutting-section-change",
      this.invalidateSection
    ), this.service.addEventListener(
      "hoops-cutting-plane-removed",
      this.invalidateSection
    ), this.service.addEventListener(
      "hoops-cutting-plane-added",
      this.handleCuttingPlaneAdded
    ));
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up all event listeners to prevent memory leaks.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && (this.service.removeEventListener(
      "hoops-cutting-service-reset",
      this.invalidateSection
    ), this.service.removeEventListener(
      "hoops-cutting-section-change",
      this.invalidateSection
    ), this.service.removeEventListener(
      "hoops-cutting-plane-removed",
      this.invalidateSection
    ), this.service.removeEventListener(
      "hoops-cutting-plane-added",
      this.handleCuttingPlaneAdded
    ));
  }
  /**
   * Event handler that invalidates the section when it changes.
   *
   * @param event - Custom event containing the section index that changed
   * @internal
   */
  invalidateSection(e) {
    e.detail.sectionIndex === this.sectionIndex && this.requestUpdate();
  }
  /**
   * Event handler that handles cutting plane addition events.
   *
   * Automatically expands the accordion section when a new plane is added to provide
   * immediate visual feedback to the user.
   *
   * @param event - Custom event containing the section index where a plane was added
   * @internal
   */
  handleCuttingPlaneAdded(e) {
    e.detail.sectionIndex === this.sectionIndex && (this.expanded = !0, this.requestUpdate());
  }
  /** @internal */
  render() {
    if (!this.service)
      return h;
    const e = this.service.getCuttingSection(this.sectionIndex);
    return e ? l`<section>
      <hoops-accordion ?expanded=${this.expanded}>
        <div slot="header" class="header">
          <div>${this.label}</div>
        </div>
        <div slot="toolbar">
          <hoops-cutting-section-toolbar
            .service=${this.service}
            sectionIndex=${this.sectionIndex}
            onCuttingPlaneAdd=${() => {
      this.expanded = !0;
    }}
          ></hoops-cutting-section-toolbar>
        </div>
        <div slot="content">
          <div class="content">
            ${e.cuttingPlanes.map(
      (n, s) => l`<hoops-cutting-plane
                  sectionIndex=${this.sectionIndex}
                  planeIndex=${s}
                  .service=${this.service}
                ></hoops-cutting-plane>`
    )}
          </div>
        </div>
      </hoops-accordion>
    </section>` : h;
  }
};
i.styles = [
  v`
      :host {
        display: block;
      }

      section {
        margin-bottom: '0.25rem';
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.125rem 0.25rem;
        width: 100%;
      }

      .header div {
        margin: 0;
        flex-grow: 1;
      }

      .content {
        min-height: 2rem;
        background-color: var(--hoops-neutral-background-20, #fafafa);
        padding: 0.25rem;
      }
    `
];
o([
  a({ type: Number })
], i.prototype, "sectionIndex", 2);
o([
  a({ type: String })
], i.prototype, "label", 2);
o([
  a({ type: Object })
], i.prototype, "service", 2);
o([
  u()
], i.prototype, "expanded", 2);
i = o([
  g("hoops-cutting-section")
], i);
export {
  i as HoopsCuttingSectionElement
};
