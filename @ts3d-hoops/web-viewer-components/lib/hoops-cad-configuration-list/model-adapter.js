import { html as a } from "lit";
import "./hoops-cad-configuration-list-item.js";
function r(n, t, o) {
  let i = "N/A";
  return n.model && (i = n.model.getCadConfigurations()[t] || "N/A"), a`<hoops-cad-configuration-list-item
    cadConfigurationId=${t}
    cadConfigurationName=${i}
    ?active=${o}
  >
  </hoops-cad-configuration-list-item>`;
}
const d = -1;
class u {
  constructor() {
    this.itemFactory = r;
  }
  /**
   * Get cad configurations from the model and format them to the desired format
   *
   * @returns {CadConfigurationData[]} the cad configurations
   */
  getCadConfigurations() {
    if (!this.model)
      return [];
    const t = this.model.getCadConfigurations();
    return Object.entries(t).map(([o, i]) => ({
      cadConfigurationId: parseInt(o, 10),
      cadConfigurationName: i
    }));
  }
  /**
   * Return the HTML Fragment for a cad configuration.
   * @param cadConfigurationData The id of the cad configuration to render.
   * @param active Whether the cad configuration is active or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(t, o) {
    return this.itemFactory(this, t.cadConfigurationId, o);
  }
}
export {
  d as CadConfigurationRootId,
  u as ModelAdapter,
  u as default,
  r as defaultItemFactory
};
