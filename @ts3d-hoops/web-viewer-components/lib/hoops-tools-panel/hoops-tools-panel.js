import { LitElement as m, html as a, css as u } from "lit";
import { customElement as i } from "lit/decorators.js";
import "./hoops-tools-select-group.js";
import "./measurements/hoops-tools-measurement-group.js";
import "./hoops-tools-redline-group.js";
import "./hoops-tools-markup-group.js";
var d = Object.defineProperty, h = Object.getOwnPropertyDescriptor, c = (n, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? h(e, r) : e, p = n.length - 1, t; p >= 0; p--)
    (t = n[p]) && (o = (s ? t(e, r, o) : t(o)) || o);
  return s && o && d(e, r, o), o;
};
let l = class extends m {
  /** @internal */
  render() {
    return a`
      <div class="hoops-tools-panel">
        <hoops-tools-select-group></hoops-tools-select-group>
        <hoops-tools-measurement-group></hoops-tools-measurement-group>
        <hoops-tools-redline-group></hoops-tools-redline-group>
        <hoops-tools-markup-group></hoops-tools-markup-group>
        <slot></slot>
      </div>
    `;
  }
};
l.styles = u`
    :host {
      display: block;
    }

    .hoops-tools-panel {
      display: flex;
      flex-direction: column;
    }

    .tools-group {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border: none;
      border-bottom: 1px solid var(--hoops-neutral-border, #303030);
    }
  `;
l = c([
  i("hoops-tools-panel")
], l);
const P = l;
export {
  l as HoopsToolsPanelElement,
  P as default
};
