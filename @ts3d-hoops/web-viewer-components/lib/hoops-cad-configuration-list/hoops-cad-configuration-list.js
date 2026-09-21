import { LitElement as c, html as d, css as p } from "lit";
import { property as m, state as u, customElement as f } from "lit/decorators.js";
import { ModelAdapter as h } from "./model-adapter.js";
import { componentBaseStyle as g } from "@ts3d-hoops/ui-kit";
var C = Object.defineProperty, v = Object.getOwnPropertyDescriptor, s = (t, e, o, r) => {
  for (var i = r > 1 ? void 0 : r ? v(e, o) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (i = (r ? l(e, o, i) : l(i)) || i);
  return r && i && C(e, o, i), i;
};
let a = class extends c {
  constructor() {
    super(...arguments), this.modelAdapter = new h(), this.active = void 0, this.cadConfigurationData = void 0;
  }
  /**
   * Gets or sets the 3D model containing CAD configurations.
   *
   * This is a convenience accessor for the modelAdapter's model property.
   * Setting a new model will reset the component state and reload configuration data.
   *
   * @returns {IModel | undefined} The current model, or undefined if no model adapter is set
   * @throws {Error} When attempting to set a model without a configured model adapter
   */
  get model() {
    var t;
    return (t = this.modelAdapter) == null ? void 0 : t.model;
  }
  /**
   * @param model - The model to set
   * @returns {void}
   */
  set model(t) {
    const e = this.modelAdapter;
    if (!e)
      throw new Error("HoopsCadConfigurationListElement.model [set]: ModelAdapter is not set.");
    e.model = t, this.modelAdapter = e, this.reset();
  }
  /**
   * Resets the component state by clearing the cached configuration data and active selection.
   * Called when the model or model adapter changes to ensure fresh data loading.
   *
   * @internal
   * @returns {void}
   */
  reset() {
    this.cadConfigurationData = void 0, this.active = void 0;
  }
  /**
   * Generates HTML template results for all CAD configuration items.
   * Loads configuration data from model adapter if not cached, then maps each
   * configuration to a clickable list item element.
   *
   * @internal
   * @returns {HTMLTemplateResult[]} Array of HTML templates for configuration list items
   */
  getCadConfigurationHtmlElements() {
    return this.modelAdapter ? (this.cadConfigurationData === void 0 && (this.cadConfigurationData = this.modelAdapter.getCadConfigurations()), this.cadConfigurationData ? this.cadConfigurationData.map((t) => {
      const e = this.active === t.cadConfigurationId, o = this.modelAdapter.getContent(
        t,
        e
      );
      return d`<li
        class="list-item"
        @click=${(r) => {
        this.handleClick(r, t.cadConfigurationId);
      }}
      >
        ${o}
      </li>`;
    }) : []) : [];
  }
  /**
   * Handles click events on CAD configuration list items.
   * Stops event propagation and dispatches a custom event with configuration details.
   *
   * @internal
   * @param event - The mouse click event
   * @param cadConfigurationId - ID of the clicked CAD configuration
   * @returns {void}
   */
  handleClick(t, e) {
    t.stopPropagation();
    const o = {
      cadConfigurationId: e,
      ...t
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-cad-configuration-list-click",
        {
          bubbles: !0,
          composed: !0,
          detail: o
        }
      )
    );
  }
  /** @internal */
  render() {
    const t = this.getCadConfigurationHtmlElements();
    return d`<div>
      <h2 class="title">Configurations</h2>
      <ul class="list">
        ${t}
      </ul>
    </div>`;
  }
};
a.styles = [
  g,
  p`
      :host {
        height: 100%;
        overflow: auto;
      }
      .title {
        font-size: 1.2rem;
        font-weight: normal;
        margin: 0.5rem 0;
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .list-item {
      }
    `
];
s([
  m({ attribute: !1 })
], a.prototype, "modelAdapter", 2);
s([
  m({ attribute: !1 })
], a.prototype, "active", 2);
s([
  u()
], a.prototype, "cadConfigurationData", 2);
a = s([
  f("hoops-cad-configuration-list")
], a);
const b = a;
export {
  a as HoopsCadConfigurationListElement,
  b as default
};
