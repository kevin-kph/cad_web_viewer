import { LitElement as c, nothing as p, html as r, css as m } from "lit";
import { property as g, state as h, customElement as v } from "lit/decorators.js";
import "../services/index.js";
import { getService as f } from "../services/serviceRegistry.js";
var u = Object.defineProperty, x = Object.getOwnPropertyDescriptor, a = (e, i, s, o) => {
  for (var t = o > 1 ? void 0 : o ? x(i, s) : i, l = e.length - 1, d; l >= 0; l--)
    (d = e[l]) && (t = (o ? d(i, s, t) : d(t)) || t);
  return o && t && u(i, s, t), t;
};
let n = class extends c {
  constructor() {
    super(...arguments), this.noAnim = !1, this.expandedRelationships = {}, this.relationshipsChangedHandler = ((e) => {
      this.selectionRelationships = e.detail;
    }), this.renderRelationshipIcon = (e) => ({
      relating: r`<i class="icon icon-arrow-right">←</i>`,
      related: r`<i class="icon icon-arrow-left">→</i>`
    })[e] || p, this.renderRelationships = (e) => e ? r`<li class="relationship-item">
      <hoops-button
        ?disabled="${!(e.nodeId && e.bimId)}"
        @click="${(i) => this.handleButtonClick(i, e)}"
      >
        ${this.renderRelationshipIcon(e.role)} ${e.name}
        #${e.bimId}
      </hoops-button>
    </li>` : p, this.renderRelationshipData = (e) => {
      var s, o;
      if (!((s = e == null ? void 0 : e.elements) != null && s.length))
        return p;
      const i = this.isRelationshipExpanded(e.typeName);
      return r`<div class="relationship-item" aria-expanded="${i}">
      <div class="relationship-type">
        <div
          class="relationship-header"
          @click="${() => this.toggleRelationship(e.typeName)}"
        >
          <div class="relationship-toggle">
            <hoops-icon
              icon=${i ? "downIcon" : "rightIcon"}
              style="width:1rem;"
            ></hoops-icon>
          </div>
          <div class="relationship-label">
            ${e.typeName} (${e.elements.length})
          </div>
        </div>
        <div
          class="relationship-content ${i ? "expanded" : "collapsed"} ${this.noAnim ? "no-anim" : ""}"
        >
          <div class="relationships">
            <ul>
              ${(o = e.elements) == null ? void 0 : o.map((t) => this.renderRelationships(t))}
            </ul>
          </div>
        </div>
      </div>
    </div>`;
    };
  }
  /**
   * Lifecycle callback when component is first updated.
   *
   * Initializes the IFC relationships service and sets up event listeners
   * for relationship changes based on selection.
   *
   * @returns {void}
   */
  firstUpdated() {
    this.service = f("IFCRelationshipsService"), this.service.addEventListener(
      "hoops-selection-ifc-relationships-changed",
      this.relationshipsChangedHandler
    );
  }
  /**
   * Lifecycle callback when component is removed from the DOM.
   *
   * Cleans up event listeners for IFC relationships service to prevent memory leaks.
   *
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.service && this.service.removeEventListener(
      "hoops-selection-ifc-relationships-changed",
      this.relationshipsChangedHandler
    );
  }
  /**
   * Handles click events on relationship element buttons.
   *
   * Selects the corresponding node in the model when a relationship element is clicked,
   * allowing navigation through related IFC elements.
   *
   * @internal
   * @param event - The mouse click event
   * @param relationship - The relationship element information containing node ID
   * @returns {void}
   */
  handleButtonClick(e, i) {
    e.preventDefault(), e.stopPropagation(), i.nodeId && this.service.selectNode(i.nodeId);
  }
  /**
   * Toggles the expanded/collapsed state of a relationship group.
   *
   * Controls the visibility of relationship elements within a specific relationship type,
   * with smooth animations (unless disabled via no-anim attribute).
   *
   * @param relationshipType - The type name of the relationship to toggle
   * @returns {void}
   */
  toggleRelationship(e) {
    this.expandedRelationships = {
      ...this.expandedRelationships,
      [e]: !this.expandedRelationships[e]
    };
  }
  /**
   * Checks whether a relationship group is currently expanded.
   *
   * @param relationshipType - The type name of the relationship to check
   * @returns {boolean} True if the relationship group is expanded, false otherwise
   */
  isRelationshipExpanded(e) {
    return !!this.expandedRelationships[e];
  }
  /** @internal */
  render() {
    const e = this.selectionRelationships ?? [];
    return r`
      <div data-testid="ifc-relationships-panel">
        <div class="section-title">Relationships</div>
        <div data-testid="relationships-tree">
          ${e.map(this.renderRelationshipData)}
        </div>
      </div>
    `;
  }
};
n.styles = [
  m`
      :host {
        display: block;
        padding: 0.4rem;
        padding-top: 0.8rem;
        border-top: 1px solid var(--hoops-separator-color, #f0f0f0);
        --hoops-svg-fill-color: var(--hoops-foreground, #303030);
        min-height: 16rem;
      }
      .section-title {
        font-weight: 400;
        margin-bottom: 0.4rem;
      }
      .relationship-label {
        font-weight: 500;
        font-size: 0.875rem;
        margin-bottom: 0.2rem;
      }
      .relationships {
        max-height: 8rem;
        overflow-y: auto;
        margin-bottom: 0.6rem;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      hoops-button {
        font-size: 0.875rem;
      }
      .relationship-item {
        cursor: pointer;
      }
      .relationship-header {
        display: flex;
        cursor: pointer;
        padding: 0.3rem 0;
        border-bottom: 1px solid var(--hoops-separator-color, #f0f0f0);
        stroke: var(--hoops-foreground, #303030);
        user-select: none;
      }
      .relationship-header:hover {
        background-color: color-mix(
          in srgb,
          var(--hoops-neutral-background-20, #fafafa),
          var(--hoops-foreground, #303030) 5%
        );
      }
      .relationship-toggle {
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
      }
      .relationship-content {
        overflow: hidden;
      }
      .relationship-content:not(.no-anim) {
        transition: max-height 0.3s ease;
      }
      .relationship-content.collapsed {
        max-height: 0;
      }
      .relationship-content.expanded {
        max-height: 200px;
      }
    `
];
a([
  g({ type: Boolean, attribute: "no-anim" })
], n.prototype, "noAnim", 2);
a([
  h()
], n.prototype, "selectionRelationships", 2);
a([
  h()
], n.prototype, "expandedRelationships", 2);
n = a([
  v("hoops-ifc-relationship")
], n);
export {
  n as HoopsIFCRelationshipElement
};
