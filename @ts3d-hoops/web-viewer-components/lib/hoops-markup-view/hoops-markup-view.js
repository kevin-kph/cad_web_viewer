import { LitElement as c, html as p, css as v } from "lit";
import { property as h, customElement as u } from "lit/decorators.js";
import "@ts3d-hoops/ui-kit";
import "../hoops-markup-item/index.js";
import "../services/index.js";
import { formatRedlineIcon as m } from "../services/redline/utils.js";
var w = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (s, t, r, i) => {
  for (var e = i > 1 ? void 0 : i ? f(t, r) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (e = (i ? n(t, r, e) : n(e)) || e);
  return i && e && w(t, r, e), e;
};
let d = class extends c {
  constructor() {
    super(...arguments), this.uuid = "", this.itemFilter = () => !0, this.onRedlineCreated = () => {
      this.requestUpdate();
    }, this.onRedlineDeleted = () => {
      this.requestUpdate();
    }, this.onRedlineViewDeleted = () => {
      this.requestUpdate();
    }, this.onMarkupManagerReset = () => {
      this.requestUpdate();
    }, this.onMarkupViewActivated = () => {
      this.requestUpdate();
    };
  }
  /**
   * @internal
   */
  firstUpdated(s) {
    var t, r, i, e, o;
    super.firstUpdated(s), (t = this.redlineService) == null || t.addEventListener("hoops-redline-created", this.onRedlineCreated), (r = this.redlineService) == null || r.addEventListener("hoops-redline-deleted", this.onRedlineDeleted), (i = this.redlineService) == null || i.addEventListener("hoops-redline-view-deleted", this.onRedlineViewDeleted), (e = this.redlineService) == null || e.addEventListener("hoops-redline-service-reset", this.onMarkupManagerReset), (o = this.redlineService) == null || o.addEventListener(
      "hoops-markup-view-activated",
      this.onMarkupViewActivated
    );
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var s, t, r, i, e;
    super.disconnectedCallback(), (s = this.redlineService) == null || s.removeEventListener("hoops-redline-created", this.onRedlineCreated), (t = this.redlineService) == null || t.removeEventListener("hoops-redline-deleted", this.onRedlineDeleted), (r = this.redlineService) == null || r.removeEventListener(
      "hoops-redline-view-deleted",
      this.onRedlineViewDeleted
    ), (i = this.redlineService) == null || i.removeEventListener(
      "hoops-redline-service-reset",
      this.onMarkupManagerReset
    ), (e = this.redlineService) == null || e.removeEventListener(
      "hoops-markup-view-activated",
      this.onMarkupViewActivated
    );
  }
  /** @internal */
  render() {
    var r, i;
    const s = (r = this.redlineService) == null ? void 0 : r.getRedlineView(this.uuid);
    if (!s)
      return p`<div>No view found for UUID: "${this.uuid}"</div>`;
    const t = ((i = this.redlineService) == null ? void 0 : i.getActiveViewKey()) === this.uuid;
    return p`<hoops-tree-item
      ?selected=${t}
      ?expanded=${t}
      @hoops-tree-item-select=${(e) => {
      var n, a;
      e.detail.selected && ((n = this.redlineService) == null ? void 0 : n.getActiveViewKey()) !== this.uuid && ((a = this.redlineService) == null || a.setActiveView(this.uuid));
    }}
    >
      ${this.uuid}
      <div slot="children">
        ${s.items.filter(this.itemFilter).map(
      (e) => p`<hoops-tree-item leaf>
              <hoops-markup-item markupId=${e.id}>
                <hoops-icon
                  icon=${m(e.type)}
                  slot="icon"
                  style="width: 1rem"
                ></hoops-icon>
                <span>${e.id}</span>
                <div slot="toolbar">
                  <hoops-icon-button
                    @click=${() => {
        this.dispatchEvent(
          new CustomEvent("hoops-delete-redline", {
            detail: { markupViewId: s.id, markupItem: e },
            bubbles: !0,
            composed: !0
          })
        );
      }}
                  >
                    <hoops-icon icon="removeIcon"></hoops-icon>
                  </hoops-icon-button>
                </div>
              </hoops-markup-item>
            </hoops-tree-item>`
    )}
      </div>
    </hoops-tree-item>`;
  }
};
d.styles = [
  v`
      :host {
        display: block;
      }

      hoops-markup-item {
        display: block;
        width: 100%;
      }
    `
];
l([
  h({ type: String })
], d.prototype, "uuid", 2);
l([
  h({ type: Object, attribute: !1 })
], d.prototype, "itemFilter", 2);
l([
  h({ type: Object, attribute: !1 })
], d.prototype, "redlineService", 2);
d = l([
  u("hoops-markup-view")
], d);
const V = d;
export {
  d as HoopsMarkupViewElement,
  V as default
};
