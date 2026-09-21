import { LitElement as c, html as m } from "lit";
import { property as u, customElement as f } from "lit/decorators.js";
import { icons as a } from "@ts3d-hoops/ui-kit";
var g = Object.defineProperty, h = Object.getOwnPropertyDescriptor, i = (p, o, s, e) => {
  for (var t = e > 1 ? void 0 : e ? h(o, s) : o, n = p.length - 1, l; n >= 0; n--)
    (l = p[n]) && (t = (e ? l(o, s, t) : l(t)) || t);
  return e && t && g(o, s, t), t;
};
let r = class extends c {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return m`<hoops-icon-button size="sm" title="Toggle settings panel" .color=${this.color}
      >${a.settings}</hoops-icon-button
    >`;
  }
};
i([
  u()
], r.prototype, "color", 2);
r = i([
  f("hoops-toolbar-settings")
], r);
const E = r;
export {
  r as HoopsSettingsButtonElement,
  E as default
};
