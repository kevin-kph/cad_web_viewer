import { LitElement as d, nothing as p, html as u, css as f } from "lit";
import { property as l, customElement as v } from "lit/decorators.js";
import { icons as h, componentBaseStyle as m } from "@ts3d-hoops/ui-kit";
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, a = (r, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? b(t, n) : t, c = r.length - 1, s; c >= 0; c--)
    (s = r[c]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && g(t, n, o), o;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.cadConfigurationId = Number.NaN, this.cadConfigurationName = "", this.active = !1;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.cadConfigurationId))
      return p;
    const r = ["cad-configuration-item"];
    return this.active && r.push("active"), u`<div class=${r.join(" ")}>
      <div class="icon">${h.cadConfiguration}</hoops-icon></div>
      <div class="title">${this.cadConfigurationName}</div>
    </div>`;
  }
};
e.styles = [
  m,
  f`
      :host {
        flex-grow: 1;
      }

      .cad-configuration-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
        cursor: pointer;
      }

      .cad-configuration-item:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .cad-configuration-item.active {
        color: var(--hoops-accent-foreground, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      }

      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        padding-left: calc(0.4rem);
      }

      .icon {
        width: 1.2rem;
        height: 1.2rem;
      }
    `
];
a([
  l({ type: Number })
], e.prototype, "cadConfigurationId", 2);
a([
  l({ type: String })
], e.prototype, "cadConfigurationName", 2);
a([
  l({ type: Boolean })
], e.prototype, "active", 2);
e = a([
  v("hoops-cad-configuration-list-item")
], e);
export {
  e as CadConfigurationListItemElement
};
