import { LitElement as p, html as a, css as h } from "lit";
import { customElement as d } from "lit/decorators.js";
import "../services/index.js";
import "../hoops-cutting-section/hoops-cutting-section.js";
import { getService as u } from "../services/serviceRegistry.js";
var v = Object.defineProperty, l = Object.getOwnPropertyDescriptor, m = (i, s, t, n) => {
  for (var e = n > 1 ? void 0 : n ? l(s, t) : s, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (e = (n ? o(s, t, e) : o(e)) || e);
  return n && e && v(s, t, e), e;
};
let c = class extends p {
  /**
   * Lifecycle method called when the element is connected to the DOM.
   *
   * Automatically discovers and initializes the cutting service connection.
   *
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.service = u("CuttingService");
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting service events to keep the panel synchronized.
   *
   * @internal
   */
  firstUpdated() {
    this.service.addEventListener("hoops-cutting-service-reset", () => {
      this.requestUpdate();
    }), this.service.addEventListener("hoops-cutting-sections-change", () => {
      this.requestUpdate();
    }), this.service.addEventListener("hoops-cutting-section-change", () => {
      this.requestUpdate();
    }), this.service.addEventListener("hoops-cutting-section-added", () => {
      this.requestUpdate();
    }), this.service.addEventListener("hoops-cutting-section-removed", () => {
      this.requestUpdate();
    });
  }
  /** @internal */
  render() {
    const i = this.service.getCuttingSectionCount();
    return a`<div class="container">
      <h3>Cutting Planes</h3>
      ${[...new Array(i)].map((s, t) => a`<hoops-cutting-section
          label=${`Section ${t + 1}`}
          sectionIndex=${t}
          .service=${this.service}
        ></hoops-cutting-section>`)}
    </div>`;
  }
};
c.styles = [
  h`
      :host {
        display: block;
      }

      .container {
        margin: 0 0.5rem 1rem 0.5rem;
      }

      h3 {
        margin: 0.25rem 0;
      }
    `
];
c = m([
  d("hoops-cutting-plane-panel")
], c);
export {
  c as HoopsCuttingPlanePanelElement
};
