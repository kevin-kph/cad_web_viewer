import { css as h, LitElement as c, html as d } from "lit";
import { property as b, queryAssignedElements as p, state as u, customElement as f } from "lit/decorators.js";
var g = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, l = (t, e, o, a) => {
  for (var r = a > 1 ? void 0 : a ? _(e, o) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (a ? n(e, o, r) : n(r)) || r);
  return a && r && g(e, o, r), r;
};
let i = class extends c {
  constructor() {
    super(...arguments), this.selectedIndex = 0, this.position = "top", this._tabsMetadata = [];
  }
  connectedCallback() {
    super.connectedCallback(), this._updateTabsMetadata(), this.requestUpdate();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("selectedIndex") && this._updateTabVisibility();
  }
  /**
   * Updates the metadata array from slotted tabs.
   * @internal
   */
  _updateTabsMetadata() {
    !this._tabs || this._tabs.length === 0 || (this._tabsMetadata = this._tabs.map((t) => ({
      label: t.label || "",
      disabled: t.disabled || !1,
      icon: t.icon,
      value: t.value
    })), this._updateTabVisibility());
  }
  /**
   * Updates the visibility of tab panels based on selected index.
   * @internal
   */
  _updateTabVisibility() {
    this._tabs && this._tabs.forEach((t, e) => {
      const o = e === this.selectedIndex;
      t.setAttribute("aria-hidden", String(!o)), t.style.display = o ? "block" : "none";
    });
  }
  /**
   * Handles slot changes to update tab metadata.
   * @internal
   */
  _handleSlotChange() {
    requestAnimationFrame(() => {
      this._updateTabsMetadata();
    });
  }
  /**
   * Handles tab button click.
   *
   * @param index - Index of the clicked tab
   * @internal
   */
  _handleTabClick(t) {
    var e;
    (e = this._tabsMetadata[t]) != null && e.disabled || this._selectTab(t);
  }
  /**
   * Handles keyboard navigation between tabs.
   *
   * @param event - Keyboard event
   * @param currentIndex - Current tab index
   * @internal
   */
  _handleKeyDown(t, e) {
    const o = this.position === "left" || this.position === "right", a = o ? "ArrowUp" : "ArrowLeft", r = o ? "ArrowDown" : "ArrowRight";
    let s = e;
    switch (t.key) {
      case a:
        t.preventDefault(), s = this._findPreviousEnabledTab(e);
        break;
      case r:
        t.preventDefault(), s = this._findNextEnabledTab(e);
        break;
      case "Home":
        t.preventDefault(), s = this._findFirstEnabledTab();
        break;
      case "End":
        t.preventDefault(), s = this._findLastEnabledTab();
        break;
      case "Enter":
      case " ":
        t.preventDefault(), this._selectTab(e);
        return;
      default:
        return;
    }
    s !== e && this._focusTab(s);
  }
  /**
   * Finds the previous enabled tab index.
   *
   * @param currentIndex - Current tab index
   * @returns Previous enabled tab index or current index if none found
   * @internal
   */
  _findPreviousEnabledTab(t) {
    var e, o;
    for (let a = t - 1; a >= 0; a--)
      if (!((e = this._tabsMetadata[a]) != null && e.disabled))
        return a;
    for (let a = this._tabsMetadata.length - 1; a > t; a--)
      if (!((o = this._tabsMetadata[a]) != null && o.disabled))
        return a;
    return t;
  }
  /**
   * Finds the next enabled tab index.
   *
   * @param currentIndex - Current tab index
   * @returns Next enabled tab index or current index if none found
   * @internal
   */
  _findNextEnabledTab(t) {
    var e, o;
    for (let a = t + 1; a < this._tabsMetadata.length; a++)
      if (!((e = this._tabsMetadata[a]) != null && e.disabled))
        return a;
    for (let a = 0; a < t; a++)
      if (!((o = this._tabsMetadata[a]) != null && o.disabled))
        return a;
    return t;
  }
  /**
   * Finds the first enabled tab index.
   *
   * @returns First enabled tab index or 0 if none found
   * @internal
   */
  _findFirstEnabledTab() {
    var t;
    for (let e = 0; e < this._tabsMetadata.length; e++)
      if (!((t = this._tabsMetadata[e]) != null && t.disabled))
        return e;
    return 0;
  }
  /**
   * Finds the last enabled tab index.
   *
   * @returns Last enabled tab index or last index if none found
   * @internal
   */
  _findLastEnabledTab() {
    var t;
    for (let e = this._tabsMetadata.length - 1; e >= 0; e--)
      if (!((t = this._tabsMetadata[e]) != null && t.disabled))
        return e;
    return this._tabsMetadata.length - 1;
  }
  /**
   * Focuses a tab button by index.
   *
   * @param index - Tab index to focus
   * @internal
   */
  _focusTab(t) {
    var a;
    const e = (a = this.shadowRoot) == null ? void 0 : a.querySelectorAll(".tab-button"), o = e == null ? void 0 : e[t];
    o == null || o.focus();
  }
  /**
   * Selects a tab by index and dispatches change event.
   *
   * @param index - Tab index to select
   * @internal
   */
  _selectTab(t) {
    var o, a;
    if (t === this.selectedIndex || (o = this._tabsMetadata[t]) != null && o.disabled)
      return;
    this.selectedIndex = t;
    const e = {
      selectedIndex: t,
      selectedValue: (a = this._tabsMetadata[t]) == null ? void 0 : a.value
    };
    this.dispatchEvent(
      new CustomEvent("hoops-tabs-change", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Selects a tab by its value property.
   *
   * @param value - The value of the tab to select
   */
  selectByValue(t) {
    const e = this._tabsMetadata.findIndex((o) => o.value === t);
    e !== -1 && this._selectTab(e);
  }
  /**
   * Renders the component.
   *
   * @returns The template result
   * @internal
   */
  render() {
    return d`
      <div class="tab-header" role="tablist">
        ${this._tabsMetadata.map(
      (t, e) => d`
            <button
              class="tab-button"
              role="tab"
              aria-selected="${this.selectedIndex === e}"
              aria-controls="panel-${e}"
              id="tab-${e}"
              tabindex="${this.selectedIndex === e ? 0 : -1}"
              ?disabled="${t.disabled}"
              @click="${() => this._handleTabClick(e)}"
              @keydown="${(o) => this._handleKeyDown(o, e)}"
            >
              ${t.icon ? d`<span class="tab-icon">${t.icon}</span>` : ""} ${t.label}
            </button>
          `
    )}
      </div>
      <div class="tab-content">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }
};
i.styles = [
  h`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      :host([position='bottom']) {
        flex-direction: column-reverse;
      }

      :host([position='left']) {
        flex-direction: row;
      }

      :host([position='right']) {
        flex-direction: row-reverse;
      }

      .tab-header {
        display: flex;
        flex-wrap: nowrap;
        background: var(
          --hoops-tabs-header-background,
          var(--hoops-neutral-background-50, #f0f0f0)
        );
        border-bottom: 1px solid
          var(--hoops-tabs-header-border-color, var(--hoops-neutral-foreground-20, #e0e0e0));
        gap: var(--hoops-tabs-gap, 0);
        overflow-x: auto;
        scrollbar-width: thin;
      }

      :host([position='left']) .tab-header,
      :host([position='right']) .tab-header {
        flex-direction: column;
        border-bottom: none;
        overflow-x: visible;
        overflow-y: auto;
      }

      :host([position='left']) .tab-header {
        border-right: 1px solid
          var(--hoops-tabs-header-border-color, var(--hoops-neutral-foreground-20, #e0e0e0));
      }

      :host([position='right']) .tab-header {
        border-left: 1px solid
          var(--hoops-tabs-header-border-color, var(--hoops-neutral-foreground-20, #e0e0e0));
      }

      :host([position='bottom']) .tab-header {
        border-bottom: none;
        border-top: 1px solid
          var(--hoops-tabs-header-border-color, var(--hoops-neutral-foreground-20, #e0e0e0));
      }

      .tab-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1rem;
        background: transparent;
        border: none;
        color: var(--hoops-neutral-foreground, var(--hoops-foreground, #303030));
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        position: relative;
        transition:
          background-color 0.15s ease,
          color 0.15s ease;
        outline: none;
      }

      .tab-button:hover:not([disabled]) {
        background: var(--hoops-neutral-background-hover, rgba(0, 0, 0, 0.05));
      }

      .tab-button:focus-visible {
        outline: 2px solid var(--hoops-accent-foreground, #0078d4);
        outline-offset: -2px;
      }

      .tab-button[aria-selected='true'] {
        color: var(--hoops-accent-foreground, #0078d4);
      }

      .tab-button[aria-selected='true']::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: var(--hoops-tabs-active-indicator-height, 2px);
        background: var(
          --hoops-tabs-active-indicator-color,
          var(--hoops-accent-foreground, #0078d4)
        );
      }

      :host([position='left']) .tab-button[aria-selected='true']::after {
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        width: var(--hoops-tabs-active-indicator-height, 2px);
        height: auto;
      }

      :host([position='right']) .tab-button[aria-selected='true']::after {
        top: 0;
        bottom: 0;
        left: 0;
        right: auto;
        width: var(--hoops-tabs-active-indicator-height, 2px);
        height: auto;
      }

      :host([position='bottom']) .tab-button[aria-selected='true']::after {
        top: 0;
        bottom: auto;
      }

      .tab-button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .tab-content {
        flex: 1;
        overflow: auto;
      }

      .tab-panel {
        display: none;
        height: 100%;
      }

      .tab-panel[aria-hidden='false'] {
        display: block;
      }

      .tab-icon {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
      }

      .tab-icon:empty {
        display: none;
        margin-right: 0;
      }
    `
];
l([
  b({ type: Number, reflect: !0 })
], i.prototype, "selectedIndex", 2);
l([
  b({ type: String, reflect: !0 })
], i.prototype, "position", 2);
l([
  p({ selector: "hoops-tab" })
], i.prototype, "_tabs", 2);
l([
  u()
], i.prototype, "_tabsMetadata", 2);
i = l([
  f("hoops-tabs")
], i);
export {
  i as HoopsTabsElement
};
