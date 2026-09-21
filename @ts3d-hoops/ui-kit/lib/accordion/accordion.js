import { css as p, LitElement as c, html as h } from "lit-element";
import { property as d, customElement as f } from "lit/decorators.js";
import { ifDefined as u } from "lit/directives/if-defined.js";
import "../icons/hoops-icon.js";
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, n = (i, t, s, r) => {
  for (var e = r > 1 ? void 0 : r ? b(t, s) : t, a = i.length - 1, l; a >= 0; a--)
    (l = i[a]) && (e = (r ? l(t, s, e) : l(e)) || e);
  return r && e && g(t, s, e), e;
};
let o = class extends c {
  constructor() {
    super(...arguments), this.expanded = !1, this.disabled = !1;
  }
  /** @internal */
  render() {
    return h`
      <div>
        <div role="heading" aria-level=${u(this.level)}>
          <button
            class="accordion-button"
            ?disabled=${this.disabled}
            role="button"
            aria-expanded=${this.expanded}
            aria-disabled=${this.disabled}
          >
            <slot name="header" @click=${this._toggle}></slot>
            <slot name="toolbar"></slot>
            <slot name="icon" @click=${this._toggle}>
              <hoops-icon
                class="expandIcon"
                icon=${this.expanded ? "downIcon" : "rightIcon"}
              ></hoops-icon>
            </slot>
          </button>
        </div>
        <div class="panel" role="region" aria-hidden=${!this.expanded}>
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
  /**
   * Toggles the accordion's expanded state.
   * @internal
   */
  _toggle() {
    this.disabled || (this.expanded = !this.expanded, this.dispatchEvent(new Event("change")));
  }
};
o.styles = p`
    :host {
      display: block;
    }

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      background-color: var(--hoops-neutral-background-50, #f0f0f0);
      color: var(--hoops-foreground, #303030);
      cursor: pointer;
      border: none;
      text-align: left;
      outline: none;
      font-size: 1.25rem;
    }

    slot[name='header']::slotted(*) {
      flex-grow: 1;
    }

    button[disabled] {
      cursor: not-allowed;
      filter: grayscale(1);
    }

    hoops-icon {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      width: 2rem;
      height: 2rem;
      stroke: var(--hoops-foreground, #303030);
    }

    .panel {
      background-color: var(--hoops-background, #fafafa);
      color: var(--hoops-foreground, #303030);
      height: 100%;
      display: none;
      border: solid 1px var(--hoops-neutral-foreground-20, #1181d7);
    }

    .panel[aria-hidden='false'] {
      display: block;
    }

    .expandIcon {
      stroke: var(--hoops-foreground, #303030);
    }
  `;
n([
  d({ type: Boolean })
], o.prototype, "expanded", 2);
n([
  d({ type: Boolean })
], o.prototype, "disabled", 2);
n([
  d({ type: Number })
], o.prototype, "level", 2);
o = n([
  f("hoops-accordion")
], o);
const _ = o;
export {
  o as HoopsAccordion,
  _ as default
};
