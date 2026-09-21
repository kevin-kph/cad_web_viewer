import { Point3 as o, Plane as _, Box as b, Color as l } from "@ts3d-hoops/common";
import { isCuttingServiceConfiguration as S } from "./types.js";
import { convertCuttingSections as G, convertHwvSectionToSection as $, convertHwvCuttingPlaneToCuttingPlane as M } from "./utils.js";
function P(c, t) {
  const e = t.getCuttingSectionCount();
  for (let n = 0; n < e; n++)
    if (t.getCuttingSection(n) === c)
      return n;
  return -1;
}
function d(c, t) {
  if (c.normal.length() === 0)
    return [];
  const n = c.normal.copy().normalize();
  let i;
  Math.abs(n.x) < Math.abs(n.y) && Math.abs(n.x) < Math.abs(n.z) ? i = new o(1, 0, 0) : Math.abs(n.y) < Math.abs(n.z) ? i = new o(0, 1, 0) : i = new o(0, 0, 1), i = o.subtract(i, o.scale(n, o.dot(i, n))).normalize();
  const s = o.cross(n, i).normalize(), a = t.center(), r = o.subtract(a, o.scale(n, o.dot(n, a)));
  let g = 1 / 0, h = -1 / 0, C = 1 / 0, w = -1 / 0;
  for (const y of t.getCorners()) {
    const p = o.subtract(y, r), f = o.dot(p, i), v = o.dot(p, s);
    g = Math.min(g, f), h = Math.max(h, f), C = Math.min(C, v), w = Math.max(w, v);
  }
  return [
    o.add(r, o.add(o.scale(i, g), o.scale(s, C))),
    o.add(r, o.add(o.scale(i, h), o.scale(s, C))),
    o.add(r, o.add(o.scale(i, h), o.scale(s, w))),
    o.add(r, o.add(o.scale(i, g), o.scale(s, w)))
  ];
}
function m(c) {
  const t = c.normal.length();
  if (t === 0 || t === 1)
    return c;
  const e = new _();
  return e.normal = c.normal.copy().scale(1 / t), e.d = c.d / t, e;
}
const u = class u extends EventTarget {
  /**
   * Constructs a new CuttingService instance.
   *
   * @param cuttingManager - Optional HOOPS Web Viewer cutting manager to use for operations
   *
   * @example
   * ```typescript
   * // Create service with cutting manager
   * const service = new CuttingService(viewer.cuttingManager);
   *
   * // Create service without manager (can be set later)
   * const service = new CuttingService();
   * service.cuttingManager = viewer.cuttingManager;
   * ```
   */
  constructor(t) {
    super(), this.serviceName = "CuttingService", this.sectionHideReferenceGeometry = [], this._cuttingManager = t, this.callbackMap = {
      modelSwitched: async () => {
        if (!this._cuttingManager)
          return;
        const e = await this._cuttingManager.viewer.model.getModelBounding(!0, !1);
        this.setModelBounding(e);
      },
      modelStructureReady: async () => {
        if (!this._cuttingManager)
          return;
        const e = await this._cuttingManager.viewer.model.getModelBounding(!0, !1);
        this.setModelBounding(e), this.dispatchEvent(
          new CustomEvent("hoops-cutting-sections-change", {
            bubbles: !0,
            composed: !0
          })
        );
      },
      cuttingSectionsLoaded: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-sections-change", {
            bubbles: !0,
            composed: !0
          })
        );
      },
      removeCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-section-removed", {
            bubbles: !0,
            composed: !0
          })
        );
      },
      addCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-section-added", {
            bubbles: !0,
            composed: !0
          })
        );
      },
      cuttingPlaneDragEnd: (e, n) => {
        if (!this._cuttingManager)
          return;
        const i = P(e, this._cuttingManager);
        this.dispatchEvent(
          new CustomEvent(
            "hoops-cutting-plane-change",
            {
              bubbles: !0,
              composed: !0,
              detail: { sectionIndex: i, planeIndex: n }
            }
          )
        );
      },
      visibilityChanged: async () => {
        if (!this._cuttingManager)
          return;
        const e = await this._cuttingManager.viewer.model.getModelBounding(!0, !1);
        this.setModelBounding(e);
      },
      selectionArray: () => {
        var n;
        const e = (n = this._cuttingManager) == null ? void 0 : n.viewer.selectionManager.getLast();
        e ? this.selectedFace = e.isFaceSelection() ? {
          position: e.getPosition(),
          normal: e.getFaceEntity().getNormal()
        } : void 0 : this.selectedFace = void 0, this.dispatchEvent(
          new CustomEvent("hoops-cutting-face-selection-change", {
            bubbles: !0,
            composed: !0
          })
        );
      }
    }, this._cuttingManager && this.bind();
  }
  /**
   * Binds event callbacks to the HOOPS Web Viewer cutting manager.
   *
   * @internal
   * @throws Error if cutting manager is not set
   */
  bind() {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    this._cuttingManager.viewer.setCallbacks(this.callbackMap);
  }
  /**
   * Unbinds event callbacks from the HOOPS Web Viewer cutting manager.
   *
   * @internal
   * @throws Error if cutting manager is not set
   */
  unbind() {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    this._cuttingManager.viewer.unsetCallbacks(this.callbackMap);
  }
  /**
   * Gets the current HOOPS Web Viewer cutting manager.
   *
   * @returns The cutting manager instance, or undefined if not set
   */
  get cuttingManager() {
    return this._cuttingManager;
  }
  /**
   * Sets the HOOPS Web Viewer cutting manager.
   *
   * Unbinds from the previous cutting manager (if any) and binds to the new one.
   * Dispatches a 'hoops-cutting-service-reset' event when the manager changes.
   *
   * @param cuttingManager - The new cutting manager instance, or undefined to clear
   *
   * @fires hoops-cutting-service-reset - When the cutting manager is changed
   */
  set cuttingManager(t) {
    this._cuttingManager && this.unbind(), this._cuttingManager = t, this.dispatchEvent(
      new CustomEvent("hoops-cutting-service-reset", { bubbles: !0, composed: !0 })
    ), this._cuttingManager && this.bind();
  }
  /**
   * Gets the currently selected face for creating cutting planes.
   *
   * @returns The selected face data, or undefined if no face is selected
   */
  getSelectedFace() {
    return this.selectedFace;
  }
  /**
   * Gets the current model bounding box.
   *
   * @returns The model's bounding box, or an empty Box if not set
   */
  getModelBounding() {
    return this._modelBounding ?? new b();
  }
  /**
   * Sets the model bounding box.
   *
   * @param modelBounding - The new model bounding box
   */
  setModelBounding(t) {
    this._modelBounding = t;
  }
  /**
   * Gets the current capping geometry visibility state.
   *
   * @returns True if capping geometry is visible, false otherwise, or default value if no cutting manager is set
   */
  getCappingGeometryVisibility() {
    return this._cuttingManager ? this._cuttingManager.getCappingGeometryVisibility() : u.DefaultConfig.cappingGeometryVisibility;
  }
  /**
   * Sets the capping geometry visibility state.
   *
   * @param cappingGeometryVisibility - True to show capping geometry, false to hide
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-geometry-visibility-changed - When visibility state changes
   */
  async setCappingGeometryVisibility(t) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    await this._cuttingManager.setCappingGeometryVisibility(t), this.dispatchEvent(
      new CustomEvent("hoops-capping-geometry-visibility-changed", {
        bubbles: !0,
        composed: !0,
        detail: t
      })
    );
  }
  /**
   * Gets the current capping face color.
   *
   * @returns The capping face color as a hex string, or default value if no cutting manager is set
   */
  getCappingFaceColor() {
    if (!this._cuttingManager)
      return u.DefaultConfig.cappingFaceColor;
    const t = this._cuttingManager.getCappingFaceColor();
    return t == null ? void 0 : t.toHexString();
  }
  /**
   * Sets the capping face color.
   *
   * @param color - The color as a hex string (e.g., "#ff0000"), or undefined to use default
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-face-color-changed - When face color changes
   */
  async setCappingFaceColor(t) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    await this._cuttingManager.setCappingFaceColor(t ? l.fromHexString(t) : null), this.dispatchEvent(
      new CustomEvent("hoops-capping-face-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: t
      })
    );
  }
  /**
   * Gets the current capping line color.
   *
   * @returns The capping line color as a hex string, or default value if no cutting manager is set
   */
  getCappingLineColor() {
    if (!this._cuttingManager)
      return u.DefaultConfig.cappingLineColor;
    const t = this._cuttingManager.getCappingLineColor();
    return t == null ? void 0 : t.toHexString();
  }
  /**
   * Sets the capping line color.
   *
   * @param color - The color as a hex string (e.g., "#000000"), or undefined to use default
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-line-color-changed - When line color changes
   */
  async setCappingLineColor(t) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    await this._cuttingManager.setCappingLineColor(t ? l.fromHexString(t) : null), this.dispatchEvent(
      new CustomEvent("hoops-capping-line-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: t
      })
    );
  }
  /**
   * Gets the total number of cutting sections.
   *
   * @returns The number of cutting sections, or 0 if no cutting manager is set
   */
  getCuttingSectionCount() {
    return this._cuttingManager ? this._cuttingManager.getCuttingSectionCount() : 0;
  }
  /**
   * Gets all cutting sections.
   *
   * @returns Array of Section objects representing all cutting sections
   */
  getCuttingSections() {
    if (!this._cuttingManager)
      return [];
    const t = G(
      this._cuttingManager,
      this.sectionHideReferenceGeometry
    );
    return this.sectionHideReferenceGeometry = t.map((e) => !!e.hideReferenceGeometry), t;
  }
  /**
   * Gets a cutting section by index.
   *
   * @param index - The index of the cutting section to retrieve
   * @returns The Section object at the specified index, or undefined if not found
   */
  getCuttingSection(t) {
    if (!this._cuttingManager)
      return;
    const e = this._cuttingManager.getCuttingSection(t);
    if (e)
      return $(e, this.sectionHideReferenceGeometry[t]);
  }
  /**
   * Clears all cutting planes from the specified cutting section.
   *
   * @param sectionIndex - The index of the cutting section to clear
   * @throws Error if cutting manager is not set or section index is invalid
   *
   * @fires hoops-cutting-section-change - When the section is cleared
   */
  async clearCuttingSection(t) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const e = this._cuttingManager.getCuttingSection(t);
    if (!e)
      throw new Error(`No cutting section at index ${t}`);
    await e.clear(), this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t }
      })
    );
  }
  /**
   * Sets the active state of a cutting section.
   *
   * @param sectionIndex - The index of the cutting section to modify
   * @param active - True to activate the section, false to deactivate
   * @throws Error if cutting manager is not set or section index is invalid
   *
   * @fires hoops-cutting-section-change - When the section state changes
   */
  async setCuttingSectionState(t, e) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const n = this._cuttingManager.getCuttingSection(t);
    if (!n)
      throw new Error(`No cutting section at index ${t}`);
    e ? await n.activate() : await n.deactivate(), this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t }
      })
    );
  }
  /**
   * Sets the reference geometry visibility for a cutting section.
   *
   * @param sectionIndex - The index of the cutting section to modify
   * @param hidden - True to hide reference geometry, false to show
   * @throws Error if cutting manager is not set or section index is invalid
   *
   * @fires hoops-cutting-section-change - When the section visibility changes
   */
  async setCuttingSectionGeometryVisibility(t, e) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const n = this._cuttingManager.getCuttingSection(t);
    if (!n)
      throw new Error(`No cutting section at index ${t}`);
    this.sectionHideReferenceGeometry[t] = e, await Promise.all(
      n.getCuttingPlanes().map((i, s) => {
        const a = m(i.plane);
        let r;
        if (e)
          r = null;
        else if (i.referenceGeometry)
          r = i.referenceGeometry;
        else if (this._cuttingManager) {
          const g = this._modelBounding ?? new b();
          r = d(a, g);
        } else
          r = null;
        return n.setPlane(s, a, r, i);
      })
    ), this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t }
      })
    );
  }
  /**
   * Gets the number of cutting planes in a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @returns The number of cutting planes in the section, or 0 if section not found
   */
  getCuttingPlaneCount(t) {
    if (!this._cuttingManager)
      return 0;
    const e = this._cuttingManager.getCuttingSection(t);
    return e ? e.getCount() : 0;
  }
  /**
   * Gets all cutting planes from a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @returns Array of CuttingPlane objects representing all planes in the section
   */
  getCuttingPlanes(t) {
    if (!this._cuttingManager)
      return [];
    const e = this._cuttingManager.getCuttingSection(t);
    return e ? e.getCuttingPlanes().map(M) : [];
  }
  /**
   * Gets a specific cutting plane from a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @param planeIndex - The index of the cutting plane within the section
   * @returns The CuttingPlane object at the specified indices, or undefined if not found
   */
  getCuttingPlane(t, e) {
    if (!this._cuttingManager)
      return;
    const n = this._cuttingManager.getCuttingSection(t);
    if (!n)
      return;
    const i = n.getCuttingPlanes()[e];
    if (i)
      return M(i);
  }
  /**
   * Adds a cutting plane to a cutting section.
   *
   * @param sectionIndex - The index of the cutting section to add the plane to
   * @param cuttingPlane - The CuttingPlane object containing plane definition and visual properties
   * @throws Error if cutting manager is not set or section index is invalid
   *
   * @fires hoops-cutting-plane-added - When the plane is successfully added
   *
   * @example
   * ```typescript
   * const plane = new Plane();
   * plane.normal = new Point3(1, 0, 0);
   * plane.d = 0;
   *
   * const cuttingPlane = {
   *   plane,
   *   color: { r: 1, g: 0, b: 0 },
   *   opacity: 0.5
   * };
   *
   * service.addCuttingPlane(0, cuttingPlane);
   * ```
   */
  async addCuttingPlane(t, e) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const n = this._cuttingManager.getCuttingSection(t);
    if (!n)
      throw new Error(`No cutting section at index ${t}`);
    await n.addPlane(
      m(e.plane),
      e.referenceGeometry ?? null,
      e
    ), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-added", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t }
      })
    ), n.isActive() || this.setCuttingSectionState(t, !0);
  }
  /**
   * Removes a cutting plane from a cutting section.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to remove
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-removed - When the plane is successfully removed
   */
  async removeCuttingPlane(t, e) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const n = this._cuttingManager.getCuttingSection(t);
    if (!n)
      throw new Error(`No cutting section at index ${t}`);
    const i = n.getCuttingPlanes();
    if (e < 0 || e >= i.length)
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    await n.removePlane(e), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-removed", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Updates properties of an existing cutting plane.
   *
   * This method allows partial updates to cutting plane properties including plane geometry,
   * visual properties (color, opacity), and reference geometry. The plane normal is automatically
   * normalized for proper reference geometry alignment.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to update
   * @param cuttingPlane - Partial CuttingPlane object with properties to update
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-change - When the plane is successfully updated
   *
   * @example
   * ```typescript
   * // Update only the color
   * service.updateCuttingPlane(0, 0, {
   *   color: { r: 0, g: 1, b: 0 }
   * });
   *
   * // Update plane position and opacity
   * const newPlane = new Plane();
   * newPlane.normal = new Point3(0, 1, 0);
   * newPlane.d = 5;
   *
   * service.updateCuttingPlane(0, 0, {
   *   plane: newPlane,
   *   opacity: 0.8
   * });
   * ```
   */
  async updateCuttingPlane(t, e, n) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const i = this._cuttingManager.getCuttingSection(t);
    if (!i)
      throw new Error(`No cutting section at index ${t}`);
    const s = i.getCuttingPlanes();
    if (e < 0 || e >= s.length)
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    const a = s[e];
    if (n.plane || n.referenceGeometry) {
      const r = n.plane ?? a.plane, g = m(r);
      n.referenceGeometry && this._cuttingManager && (n.referenceGeometry = d(g, this.getModelBounding()));
      const h = n.referenceGeometry !== void 0 ? n.referenceGeometry : a.referenceGeometry;
      await i.setPlane(e, g, h ?? null, {
        color: n.color ?? a.color,
        lineColor: n.lineColor ?? a.lineColor,
        opacity: n.opacity ?? a.opacity
      });
    } else
      n.color && i.setPlaneColor(
        e,
        new l(n.color.r, n.color.g, n.color.b)
      ), n.lineColor && i.setPlaneLineColor(
        e,
        new l(n.lineColor.r, n.lineColor.g, n.lineColor.b)
      ), n.opacity !== void 0 && i.setPlaneOpacity(e, n.opacity);
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Sets the visibility of reference geometry for a specific cutting plane.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to modify
   * @param visible - True to show reference geometry, false to hide
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-change - When the plane visibility changes
   */
  async setCuttingPlaneVisibility(t, e, n) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const i = this._cuttingManager.getCuttingSection(t);
    if (!i)
      throw new Error(`No cutting section at index ${t}`);
    if (e < 0 || e >= i.getCount())
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    const s = this.getModelBounding(), a = i.getCuttingPlanes()[e], r = m(a.plane), g = n && this._cuttingManager ? d(r, s) : null;
    a.referenceGeometry = g, await i.setPlane(e, r, g, a), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Sets the face color of a specific cutting plane.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to modify
   * @param color - The new face color (RGB values between 0 and 1)
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-change - When the plane color changes
   */
  setCuttingPlaneColor(t, e, n) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const i = this._cuttingManager.getCuttingSection(t);
    if (!i)
      throw new Error(`No cutting section at index ${t}`);
    if (e < 0 || e >= i.getCount())
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    i.setPlaneColor(e, new l(n.r, n.g, n.b)), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Sets the line color of a specific cutting plane.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to modify
   * @param lineColor - The new line color (RGB values between 0 and 1)
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-change - When the plane line color changes
   */
  setCuttingPlaneLineColor(t, e, n) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const i = this._cuttingManager.getCuttingSection(t);
    if (!i)
      throw new Error(`No cutting section at index ${t}`);
    if (e < 0 || e >= i.getCount())
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    i.setPlaneLineColor(e, new l(n.r, n.g, n.b)), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Sets the opacity of a specific cutting plane.
   *
   * @param sectionIndex - The index of the cutting section containing the plane
   * @param planeIndex - The index of the cutting plane to modify
   * @param opacity - The new opacity value (between 0.0 and 1.0)
   * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
   *
   * @fires hoops-cutting-plane-change - When the plane opacity changes
   */
  setCuttingPlaneOpacity(t, e, n) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const i = this._cuttingManager.getCuttingSection(t);
    if (!i)
      throw new Error(`No cutting section at index ${t}`);
    if (e < 0 || e >= i.getCount())
      throw new Error(`No cutting plane at index ${e} in section ${t}`);
    i.setPlaneOpacity(e, n), this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: !0,
        composed: !0,
        detail: { sectionIndex: t, planeIndex: e }
      })
    );
  }
  /**
   * Resets the cutting service configuration to default values or provided configuration.
   *
   * @param obj - Optional configuration object to apply, or undefined to use default configuration
   * @throws Error if cutting manager is not set or configuration object is invalid
   *
   * @example
   * ```typescript
   * // Reset to default configuration
   * await service.resetConfiguration();
   *
   * // Apply custom configuration
   * await service.resetConfiguration({
   *   cappingGeometryVisibility: false,
   *   cappingFaceColor: '#ff0000',
   *   cappingLineColor: '#000000'
   * });
   * ```
   */
  async resetConfiguration(t) {
    if (!this._cuttingManager)
      throw new Error("Cutting manager not set");
    const e = t ?? u.DefaultConfig;
    if (!S(e))
      throw new Error("Invalid cutting configuration object");
    this.setCappingGeometryVisibility(e.cappingGeometryVisibility), this.setCappingFaceColor(e.cappingFaceColor), this.setCappingLineColor(e.cappingLineColor);
  }
};
u.DefaultConfig = {
  cappingGeometryVisibility: !0,
  cappingFaceColor: "#808080",
  cappingLineColor: "#808080"
};
let E = u;
export {
  E as default
};
