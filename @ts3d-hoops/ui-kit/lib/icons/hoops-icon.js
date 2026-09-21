import { css as h, LitElement as m, html as f } from "lit";
import { property as u, customElement as a } from "lit/decorators.js";
import * as p from "./icons.js";
var v = Object.defineProperty, g = Object.getOwnPropertyDescriptor, l = (c, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? g(t, s) : t, n = c.length - 1, i; n >= 0; n--)
    (i = c[n]) && (o = (e ? i(t, s, o) : i(o)) || o);
  return e && o && v(t, s, o), o;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.icon = "";
  }
  /**
   * Retrieves the SVG template for the specified icon name.
   *
   * @returns The SVG template for the icon, or undefined if not found
   *
   * @internal
   */
  getIcon() {
    if (this.icon in p)
      return p[this.icon];
    console.warn(`unable to find hoops icon '${this.icon}'`, this);
  }
  /** @internal */
  render() {
    return f`${this.getIcon() ?? ""}`;
  }
};
r.styles = [
  h`
      :host {
        display: inline-block;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `
];
l([
  u({ type: String })
], r.prototype, "icon", 2);
r = l([
  a("hoops-icon")
], r);
export {
  r as HoopsIcon
};
