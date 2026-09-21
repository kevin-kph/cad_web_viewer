import { LitElement as a, html as l, css as p } from "lit";
import { customElement as d } from "lit/decorators.js";
import "./hoops-settings-graphics-section.js";
import "./hoops-settings-controls-section.js";
import "./hoops-settings-interface-section.js";
import "../services/index.js";
import { getAllServices as h } from "../services/serviceRegistry.js";
import { isResettableConfigurationService as f } from "../services/types.js";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, g = (t, e, n, s) => {
  for (var o = s > 1 ? void 0 : s ? v(e, n) : e, r = t.length - 1, c; r >= 0; r--)
    (c = t[r]) && (o = (s ? c(e, n, o) : c(o)) || o);
  return s && o && m(e, n, o), o;
};
let i = class extends a {
  resetToDefault() {
    Object.values(h()).forEach((t) => {
      f(t) && t.resetConfiguration();
    });
  }
  /** @internal */
  render() {
    return l`<div>
      <h2 class="title">Settings</h2>
      <hoops-accordion>
        <div slot="header">Graphics</div>
        <div slot="content">
          <hoops-settings-graphics-section></hoops-settings-graphics-section>
        </div>
      </hoops-accordion>
      <hoops-accordion>
        <div slot="header">Interface</div>
        <div slot="content">
          <hoops-settings-interface-section></hoops-settings-interface-section>
        </div>
      </hoops-accordion>
      <hoops-accordion>
        <div slot="header">Controls</div>
        <div slot="content">
          <hoops-settings-controls-section></hoops-settings-controls-section>
        </div>
      </hoops-accordion>
      <div class="configuration-section">
        <hoops-button @click=${this.resetToDefault}>Reset to Default</hoops-button>
      </div>
    </div>`;
  }
};
i.styles = p`
    :host {
      height: 100%;
      overflow: auto;
    }
    .title {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.5rem 0;
    }

    .configuration-section {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 1rem;
    }

    hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }
  `;
i = g([
  d("hoops-settings-panel")
], i);
const j = i;
export {
  i as HoopsSettingsPanelElement,
  j as default
};
