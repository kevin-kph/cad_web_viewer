import { LitElement as a, html as p, css as v } from "lit";
import { property as h, customElement as c } from "lit/decorators.js";
import "../hoops-markup-view/index.js";
var m = Object.defineProperty, u = Object.getOwnPropertyDescriptor, l = (i, t, r, e) => {
  for (var s = e > 1 ? void 0 : e ? u(t, r) : t, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (s = (e ? o(t, r, s) : o(s)) || s);
  return e && s && m(t, r, s), s;
};
let d = class extends a {
  constructor() {
    super(...arguments), this.onUpdate = () => this.requestUpdate();
  }
  /**
   * @internal
   */
  firstUpdated(i) {
    var t, r, e, s;
    super.firstUpdated(i), (t = this.redlineService) == null || t.addEventListener("hoops-redline-created", this.onUpdate), (r = this.redlineService) == null || r.addEventListener("hoops-redline-deleted", this.onUpdate), (e = this.redlineService) == null || e.addEventListener("hoops-redline-view-deleted", this.onUpdate), (s = this.redlineService) == null || s.addEventListener("hoops-redline-service-reset", this.onUpdate);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var i, t, r, e;
    super.disconnectedCallback(), (i = this.redlineService) == null || i.removeEventListener("hoops-redline-created", this.onUpdate), (t = this.redlineService) == null || t.removeEventListener("hoops-redline-deleted", this.onUpdate), (r = this.redlineService) == null || r.removeEventListener("hoops-redline-view-deleted", this.onUpdate), (e = this.redlineService) == null || e.removeEventListener("hoops-redline-service-reset", this.onUpdate);
  }
  /** @internal */
  render() {
    var i;
    return p`${(i = this.redlineService) == null ? void 0 : i.getRedlineViewKeys().map(
      (t) => p`<hoops-markup-view
          .redlineService=${this.redlineService}
          uuid=${t}
          @hoops-delete-redline=${(r) => {
        var e;
        (e = this.redlineService) == null || e.removeRedlineItem(r.detail.markupViewId, r.detail.markupItem);
      }}
        ></hoops-markup-view>`
    )}`;
  }
};
d.styles = [
  v`
      :host {
        display: block;
      }
    `
];
l([
  h({ type: Object, attribute: !1 })
], d.prototype, "redlineService", 2);
d = l([
  c("hoops-markup-tree")
], d);
const U = d;
export {
  d as HoopsMarkupTreeElement,
  U as default
};
