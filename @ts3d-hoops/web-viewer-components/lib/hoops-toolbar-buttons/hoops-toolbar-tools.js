import { LitElement as m, html as u } from "lit";
import { property as f, customElement as i } from "lit/decorators.js";
import { icons as a } from "@ts3d-hoops/ui-kit";
var h = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, c = (p, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? _(t, s) : t, l = p.length - 1, n; l >= 0; l--)
    (n = p[l]) && (o = (e ? n(t, s, o) : n(o)) || o);
  return e && o && h(t, s, o), o;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return u`<hoops-icon-button size="sm" title="Open tools panel" .color=${this.color}
      >${a.toolsIcon}</hoops-icon-button
    >`;
  }
};
c([
  f()
], r.prototype, "color", 2);
r = c([
  i("hoops-toolbar-tools")
], r);
const E = r;
export {
  r as HoopsToolsButtonElement,
  E as default
};
