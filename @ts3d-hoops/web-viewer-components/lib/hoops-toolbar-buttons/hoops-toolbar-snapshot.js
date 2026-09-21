import { LitElement as m, html as a } from "lit";
import { customElement as f } from "lit/decorators.js";
import { icons as h } from "@ts3d-hoops/ui-kit";
var u = Object.defineProperty, i = Object.getOwnPropertyDescriptor, c = (l, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? i(t, s) : t, n = l.length - 1, r; n >= 0; n--)
    (r = l[n]) && (o = (e ? r(t, s, o) : r(o)) || o);
  return e && o && u(t, s, o), o;
};
let p = class extends m {
  /** @internal */
  render() {
    return a`<hoops-icon-button size="sm" title="Take snapshot"
      >${h.snapshot}</hoops-icon-button
    >`;
  }
};
p = c([
  f("hoops-toolbar-snapshot")
], p);
const E = p;
export {
  p as HoopsSnapshotButtonElement,
  E as default
};
