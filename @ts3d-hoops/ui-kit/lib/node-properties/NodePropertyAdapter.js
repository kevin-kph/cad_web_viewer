class l {
  /**
   * Get the name of the node
   *
   * @param {number} nodeId The node to gather information from
   * @returns {string} The name of the node
   */
  getNodeName(t) {
    var e;
    return ((e = this.model) == null ? void 0 : e.getNodeName(t)) ?? "N/A";
  }
  /**
   * Collects all the properties from a given node
   *
   * @param nodeId The id of the node
   * @returns {Promise<[string, string][]>} A table containing the properties as [name, value]
   * tuples
   */
  async getProperties(t) {
    var r;
    const e = await ((r = this.model) == null ? void 0 : r.getNodeProperties(t));
    return e ? Object.entries(e).filter(Boolean) : [];
  }
  /**
   * Collects all the user data from a given node
   *
   * @param nodeId The id of the node
   * @returns {Promise<[string, string][]>} A table containing the user data as [name, value]
   * tuples
   */
  async getUserData(t) {
    var r;
    const e = ((r = this.model) == null ? void 0 : r.getNodeUserDataIndices(t)) ?? [];
    return e != null && e.length ? e.map((o) => {
      const s = this.model.getNodeUserData(t, o), n = typeof o == "number" ? `0x${o.toString(16).toUpperCase()}` : `0x${o}`, a = `${s.length}`;
      return [n, a];
    }) : [];
  }
}
export {
  l as NodePropertyAdapter,
  l as default
};
