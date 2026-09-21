import { LitElement as h, css as u, html as a } from "lit";
import { styleMap as m } from "lit-html/directives/style-map.js";
import { property as p, state as f, queryAssignedElements as c, customElement as w } from "lit/decorators.js";
import { when as b } from "lit/directives/when.js";
import { componentBaseStyle as g } from "../css-common.js";
import "../icon-button/hoops-icon-button.js";
var y = Object.defineProperty, v = Object.getOwnPropertyDescriptor, s = (o, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? v(t, r) : t, l = o.length - 1, d; l >= 0; l--)
    (d = o[l]) && (i = (n ? d(t, r, i) : d(i)) || i);
  return n && i && y(t, r, i), i;
};
let e = class extends h {
  constructor() {
    super(), this.preventCloseOnClickInside = !1, this.menuShown = !1, this.position = "bottom", this.focusableSelector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])', this.disabled = !1, this.addEventListener("focusout", (o) => {
      var n;
      const t = o.relatedTarget !== this, r = ((n = o.relatedTarget) == null ? void 0 : n.closest("hoops-dropdown")) === this;
      t && !r && (this.menuShown = !1);
    }), document.addEventListener("click", (o) => {
      const t = o.composedPath().some((r) => r === this);
      this.preventCloseOnClickInside && t || o.target !== this && (this.menuShown = !1);
    });
  }
  /**
   * Focuses on the first item in the dropdown list of focusable elements.
   *
   * @return {void}
   */
  focusFirstDropdownItem() {
    var o, t;
    (t = (o = this.focusableDropdownChildren) == null ? void 0 : o.item(0)) == null || t.focus();
  }
  /**
   * Retrieves the focusable children within the dropdown slot element.
   *
   * @return {NodeListOf<HTMLElement> | undefined} A list of HTMLElements representing the focusable children
   */
  get focusableDropdownChildren() {
    var o, t;
    return (t = (o = this.dropdownSlot) == null ? void 0 : o.at(0)) == null ? void 0 : t.querySelectorAll(this.focusableSelector);
  }
  /**
   * Returns the positional styles for a dropdown based on the current position.
   * The styles include properties such as 'left', 'right', 'top', 'bottom' and 'margin'.
   *
   * @returns {StyleInfo} Object representing the positional styles for the dropdown
   */
  get dropdownPositionalStyles() {
    const o = "var(--hoops-dropdown-gap, 0.2rem)";
    let r = { ...{
      left: { right: "100%", top: "0", "margin-right": o },
      right: { left: "100%", top: "0", "margin-left": o },
      bottom: { top: "100%", left: "0", "margin-top": o },
      top: { bottom: "100%", left: "0", "margin-bottom": o }
    }[this.position] };
    return this.anchor && (r = { ...r, ...{
      top: { top: "0", bottom: "initial" },
      bottom: { bottom: "0", top: "initial" },
      left: { left: "0", right: "initial" },
      right: { right: "0", left: "initial" }
    }[this.anchor] }), r;
  }
  /**
   * Toggles the dropdown menu visibility based on the current state.
   *
   * @param {PointerEvent} event - The pointer event triggering the dropdown toggle.
   *
   * @return {Promise<void>}
   */
  async toggleDropdown(o) {
    o.preventDefault(), o.stopPropagation(), !this.disabled && (this.menuShown = !this.menuShown, this.menuShown && (await this.updateComplete, this.focusFirstDropdownItem()));
  }
  /** @internal */
  render() {
    return a`
      <slot @click=${this.toggleDropdown}></slot>
      ${b(
      this.menuShown,
      () => a` <div class="dropdown-panel" style="${m(this.dropdownPositionalStyles)}">
            <slot name="dropdown-popup"></slot>
          </div>`
    )}
    `;
  }
};
e.shadowRootOptions = { ...h.shadowRootOptions, delegatesFocus: !0 };
e.styles = [
  g,
  u`
      :host {
        position: relative;
        display: inline-block;
      }

      .dropdown-panel {
        position: absolute;
        z-index: var(--hoops-dropdown-z-index, 10);
        margin: 0;
        padding: 0;
        min-width: 1rem;
        background: var(--hoops-dropdown-background-color, #fcfcfc);
        border-color: var(--hoops-dropdown-menu-border-color, #90909090);
        border-radius: var(--hoops-dropdown-menu-radius, 0px);
        border-width: var(--hoops-dropdown-menu-border-size, 0px);
        border-style: var(--hoops-dropdown-menu-border-style, solid);
        box-shadow: var(
          --hoops-dropdown-box-shadow,
          0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24)
        );
      }

      ::slotted([slot='dropdown-popup']) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    `
];
s([
  p({ type: Boolean, reflect: !0 })
], e.prototype, "preventCloseOnClickInside", 2);
s([
  f()
], e.prototype, "menuShown", 2);
s([
  p()
], e.prototype, "position", 2);
s([
  p()
], e.prototype, "anchor", 2);
s([
  p()
], e.prototype, "focusableSelector", 2);
s([
  c({ slot: "dropdown-popup" })
], e.prototype, "dropdownSlot", 2);
s([
  c()
], e.prototype, "defaultSlot", 2);
s([
  p({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
e = s([
  w("hoops-dropdown")
], e);
export {
  e as default
};
