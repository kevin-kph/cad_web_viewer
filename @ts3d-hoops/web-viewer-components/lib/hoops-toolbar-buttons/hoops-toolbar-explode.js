import { LitElement as a, html as c } from "lit";
import { property as l, customElement as h } from "lit/decorators.js";
import { icons as v } from "@ts3d-hoops/ui-kit";
import "../services/index.js";
import { getService as u } from "../services/serviceRegistry.js";
var x = Object.defineProperty, m = Object.getOwnPropertyDescriptor, d = (r, t, o, i) => {
  for (var e = i > 1 ? void 0 : i ? m(t, o) : t, s = r.length - 1, p; s >= 0; s--)
    (p = r[s]) && (e = (i ? p(t, o, e) : p(e)) || e);
  return i && e && x(t, o, e), e;
};
let n = class extends a {
  constructor() {
    super(...arguments), this.dropDownPosition = "right", this.webViewer = null, this.handleServiceUpdate = () => this.requestUpdate();
  }
  /** @internal */
  connectedCallback() {
    super.connectedCallback(), this.explodeService = u("ExplodeService"), this.explodeService.addEventListener("hoops-explode-service-reset", this.handleServiceUpdate), this.explodeService.addEventListener(
      "hoops-explode-magnitude-changed",
      this.handleServiceUpdate
    );
  }
  /** @internal */
  disconnectedCallback() {
    this.explodeService && (this.explodeService.removeEventListener(
      "hoops-explode-service-reset",
      this.handleServiceUpdate
    ), this.explodeService.removeEventListener(
      "hoops-explode-magnitude-changed",
      this.handleServiceUpdate
    ));
  }
  async handleExplodeChange(r) {
    if (!this.webViewer)
      return;
    if (!this.explodeService.getActive()) {
      const e = (await this.webViewer.model.getModelBounding(!0, !0)).center();
      await this.explodeService.start(void 0, e);
    }
    const t = r.target.value, o = parseFloat(t);
    this.explodeService.setMagnitude(o);
  }
  /** @internal */
  render() {
    return c` <hoops-dropdown position=${this.dropDownPosition} preventCloseOnClickInside>
      <hoops-icon-button size="sm" title="Explode">${v.explode}</hoops-icon-button>
      <div class="dropdown-content" slot="dropdown-popup">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value="${this.explodeService.getMagnitude()}"
          @input=${this.handleExplodeChange}
        />
      </div>
    </hoops-dropdown>`;
  }
};
d([
  l()
], n.prototype, "dropDownPosition", 2);
d([
  l({ type: Object })
], n.prototype, "webViewer", 2);
n = d([
  h("hoops-toolbar-explode")
], n);
const b = n;
export {
  n as HoopsExplodeButtonElement,
  b as default
};
