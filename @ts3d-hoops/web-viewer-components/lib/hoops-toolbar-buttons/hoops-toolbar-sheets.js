import { LitElement as m, html as u } from "lit";
import { property as h, customElement as f } from "lit/decorators.js";
import { icons as i } from "@ts3d-hoops/ui-kit";
var a = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, c = (p, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? _(t, s) : t, l = p.length - 1, n; l >= 0; l--)
    (n = p[l]) && (o = (e ? n(t, s, o) : n(o)) || o);
  return e && o && a(t, s, o), o;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return u`<hoops-icon-button size="sm" title="Toggle sheets" .color=${this.color}
      >${i.sheetsIcon}</hoops-icon-button
    >`;
  }
};
c([
  h()
], r.prototype, "color", 2);
r = c([
  f("hoops-toolbar-sheets")
], r);
const O = r;
export {
  r as HoopsSheetsButtonElement,
  O as default
};
