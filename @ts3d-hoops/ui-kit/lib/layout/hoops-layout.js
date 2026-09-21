import { css as d, LitElement as p, unsafeCSS as s, html as h } from "lit";
import { state as u, property as m, customElement as g } from "lit/decorators.js";
var S = Object.defineProperty, f = Object.getOwnPropertyDescriptor, b = (t, l, e, a) => {
  for (var o = a > 1 ? void 0 : a ? f(l, e) : l, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (o = (a ? r(l, e, o) : r(o)) || o);
  return a && o && S(l, e, o), o;
};
let i = class extends p {
  constructor() {
    super(...arguments), this.slotsShown = {}, this.isSlotVisible = (t) => !!this.slotsShown[t], this.hideSlot = (t) => this.setSlotVisibility(t, !1), this.showSlot = (t) => this.setSlotVisibility(t, !0), this.toggleSlotVisibility = (t) => this.setSlotVisibility(t, !this.isSlotVisible(t));
  }
  static buildFloatablePanelStyle(t) {
    const l = t == "left" || t == "right", e = s(`panel-${t}`);
    return d`
      .panel.panel--floating.${e} {
        position: relative;
        ${s(l ? "width" : "height")}: 0;
        background: hotpink;
        display: flex;
      }
      .panel.${e} {
        ${s(l ? "height" : "width")}: 100%;
      }
      .panel.${e}.panel--floating slot {
        position: absolute;
        z-index: 2;
      }
      .panel.${e} slot {
        ${s(l ? "width" : "height")}: var(--panel-size);
        ${s(l ? "height" : "width")}: 100%;
        ${s(t)}: 0;
      }
    `;
  }
  /**
   * Mutates the visibility state of a slot.
   *
   * @param {HoopsLayoutSlotName} slotName - The name of the slot to mutate.
   * @param {boolean} shown - The visibility state to set for the slot.
   * @returns {void}
   */
  setSlotVisibility(t, l) {
    this.slotsShown = Object.assign({}, this.slotsShown, Object.fromEntries([[t, l]]));
  }
  /**
   * handleSlotChange updates the visibility of the slots according to the number
   * of slotted elements it has, 0 means the slot element should now be hidden
   * @param {Event} e - The event object.
   * @return {void}
   */
  handleSlotChange(t) {
    const l = t.target, e = l.getAttribute("name");
    this.setSlotVisibility(e, !!l.assignedElements().length);
  }
  /**
   * Build a slot element with the given slotName.
   *
   * @param {HoopsLayoutSlotName} slotName - The name of the slot to be built.
   * @return {Element} The constructed slot element.
   */
  buildSlotElement(t) {
    return h`<slot
      name=${t}
      @slotchange=${this.handleSlotChange}
      aria-hidden=${!this.isSlotVisible(t)}
    ></slot>`;
  }
  /**
   * Builds a panel element.
   *
   * @param {HoopsLayoutSlotName} slotName - The name of the slot for the panel element.
   * @returns {HTMLElement} - The panel element.
   */
  builPanelElement(t) {
    return h`<div class="panel ${t} ${this.floatingPanels ? "panel--floating" : ""}">
      ${this.buildSlotElement(t)}
    </div> `;
  }
  /** @internal */
  render() {
    return h`
      ${this.buildSlotElement("menu-bar")} ${this.buildSlotElement("toolbar-top")}
      ${this.builPanelElement("panel-top")}
      <div class="central-row">
        ${this.buildSlotElement("toolbar-left")} ${this.builPanelElement("panel-left")}
        ${this.buildSlotElement("central-widget")} ${this.builPanelElement("panel-right")}
        ${this.buildSlotElement("toolbar-right")}
      </div>
      ${this.builPanelElement("panel-bottom")} ${this.buildSlotElement("toolbar-bottom")}
      ${this.builPanelElement("status-bar")}
    `;
  }
};
i.styles = [
  d`
      :host {
        box-sizing: border-box;
        width: var(--hoops-layout-width, 100vw);
        height: var(--hoops-layout-height, 100vh);
        overflow: hidden;

        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
      }

      .central-row {
        flex-grow: 1;
        display: flex;
        height: 100%;
      }

      slot {
        display: flex;
        transition: opacity linear 0.5s;
        transition-behavior: allow-discrete;
      }

      ::slotted([slot='menu-bar']) {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      slot[name='menu-bar'] {
        min-height: 48px;
      }
      slot[name='status-bar'] {
        min-height: 16px;
      }

      slot[name='menu-bar'],
      slot[name='status-bar'] {
        width: 100%;
      }

      slot[name='central-widget'] {
        flex-grow: 1;
      }

      slot[name='toolbar-left'],
      slot[name='toolbar-right'] {
        width: var(--toolbar-size);
      }

      slot[name='toolbar-top'],
      slot[name='toolbar-bottom'] {
        height: var(--toolbar-size);
      }

      ::slotted(*) {
        height: 100%;
        width: 100%;
      }

      [aria-hidden='true'] {
        display: none;
      }
    `,
  i.buildFloatablePanelStyle("left"),
  i.buildFloatablePanelStyle("right"),
  i.buildFloatablePanelStyle("top"),
  i.buildFloatablePanelStyle("bottom")
];
b([
  u()
], i.prototype, "slotsShown", 2);
b([
  m({ type: Boolean })
], i.prototype, "floatingPanels", 2);
i = b([
  g("hoops-layout")
], i);
const w = i;
export {
  i as HoopsLayout,
  w as default
};
