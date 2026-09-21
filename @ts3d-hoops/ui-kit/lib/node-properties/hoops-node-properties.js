import { Task as m } from "@lit/task";
import { css as h, LitElement as u, nothing as l, html as s } from "lit";
import { property as b, state as c, customElement as f } from "lit/decorators.js";
import { repeat as g } from "lit/directives/repeat.js";
import { componentBaseStyle as v } from "../css-common.js";
import { NodePropertyAdapter as w } from "./NodePropertyAdapter.js";
var y = Object.defineProperty, N = Object.getOwnPropertyDescriptor, n = (e, t, a, r) => {
  for (var o = r > 1 ? void 0 : r ? N(t, a) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (o = (r ? p(t, a, o) : p(o)) || o);
  return r && o && y(t, a, o), o;
};
let i = class extends u {
  constructor() {
    super(...arguments), this.nodeId = Number.NaN, this.node = new w(), this.loadDataTask = new m(
      this,
      async ([e, t], a) => {
        const r = {
          name: t.getNodeName(e),
          properties: await t.getProperties(e),
          userData: await t.getUserData(e)
        };
        return a.signal.throwIfAborted(), r;
      },
      () => [this.nodeId, this.node]
    );
  }
  /**
   * Generates a table HTML template to display property data in a two-column format.
   *
   * @param rows - Array of key-value pairs to display in the table
   * @param formatter - Optional function to format the value column content
   * @returns HTML template for the table or nothing if rows array is empty
   *
   * @internal
   */
  generateTable(e, t) {
    return e.length === 0 ? l : s`
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${g(e, ([a, r]) => s`<tr>
              <td class="field-name">${a}</td>
              <td class="field-value">${t ? t(r) : r}</td>
            </tr>`)}
        </tbody>
      </table>
    `;
  }
  /** @internal */
  render() {
    return Number.isNaN(this.nodeId) ? s`<div>No properties to display</div>` : this.loadDataTask.render({
      pending: () => s`<p>Loading data</p>`,
      complete: (e) => {
        const t = e.userData;
        return s`
          <section class="property-window">
            <div class="property-table">
              <h3>Properties</h3>
              ${this.generateTable([
          ["Name", e.name],
          ["ID", this.nodeId.toString()],
          ...e.properties
        ])}
            </div>

            ${t.length ? s`<div class="user-data-table">
                  <h3>User Data</h3>
                  ${this.generateTable([...e.userData])}
                </div>` : l}
          </section>
        `;
      },
      error: (e) => s`<p>Error: ${e}</p>`
    });
  }
};
i.styles = [
  v,
  h`
      table {
        width: 100%;
        margin-bottom: 1rem;
      }

      table,
      th,
      tr,
      td {
        border-collapse: collapse;
        border: solid 1px black;
      }

      h3 {
        padding: 0.25rem;
        margin: 0;
      }

      .field-name,
      .field-value {
        min-width: 8rem;
        word-break: break-word;
        text-overflow: ellipsis;
      }

      .field-value {
        width: 80%;
      }

      th,
      .field-name,
      .field-value {
        padding: 0.5rem 0.5rem;
      }
    `
];
n([
  b({ type: Number })
], i.prototype, "nodeId", 2);
n([
  c()
], i.prototype, "node", 2);
i = n([
  f("hoops-node-properties")
], i);
const x = i;
export {
  i as NodeProperties,
  x as default
};
