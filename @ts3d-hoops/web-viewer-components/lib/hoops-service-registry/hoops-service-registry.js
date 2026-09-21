import { LitElement as n, html as m } from "lit";
import { property as i, customElement as l } from "lit/decorators.js";
import "../services/index.js";
import "../services/notetext/index.js";
import f from "../services/measurement/MeasurementService.js";
import { ViewService as h } from "../services/view/ViewService.js";
import "../services/floorplan/index.js";
import "../services/material/index.js";
import "../services/log/index.js";
import b from "../services/bcf/BcfService.js";
import u from "../services/redline/RedlineService.js";
import y from "../services/notetext/NoteTextService.js";
import O from "../services/render-options/RenderOptionsService.js";
import w from "../services/ifc-relationships/IFCRelationshipsService.js";
import { FloorplanService as j } from "../services/floorplan/FloorplanService.js";
import d from "../services/pmi/PmiService.js";
import g from "../services/selection/SelectionService.js";
import x from "../services/cutting/CuttingService.js";
import R from "../services/camera/CameraService.js";
import _ from "../services/sheet/SheetService.js";
import { WalkOperatorService as C } from "../services/walk-operator/WalkOperatorService.js";
import M from "../services/explode/ExplodeService.js";
import E from "../services/spacemouse/SpaceMouseService.js";
import P from "../services/log/LogService.js";
import { MaterialService as T } from "../services/material/MaterialService.js";
import { registerService as r, getService as D, tryGetService as F } from "../services/serviceRegistry.js";
var G = Object.defineProperty, H = Object.getOwnPropertyDescriptor, t = (c, p, v, s) => {
  for (var o = s > 1 ? void 0 : s ? H(p, v) : p, a = c.length - 1, S; a >= 0; a--)
    (S = c[a]) && (o = (s ? S(p, v, o) : S(o)) || o);
  return s && o && G(p, v, o), o;
};
let e = class extends n {
  constructor() {
    super(...arguments), this.bcfService = new b(), this.redlineService = new u(), this.noteTextService = new y(), this.measurementService = new f(), this.renderOptionsService = new O(), this.viewService = new h(), this.ifcRelationshipsService = new w(), this.floorplanService = new j(), this.pmiService = new d(), this.selectionService = new g(), this.cuttingService = new x(), this.cameraService = new R(), this.sheetService = new _(), this.walkOperatorService = new C(), this.explodeService = new M(), this.spaceMouseService = new E(), this.logService = new P(), this.materialService = new T();
  }
  /**
   * Lifecycle callback invoked when the element is connected to the DOM.
   * Automatically registers all configured services in the global service registry,
   * making them available throughout the application.
   *
   * Services are registered in a specific order to handle any potential dependencies.
   * If a service with the same name already exists, it will be overwritten with a warning.
   *
   * @override
   * @returns {void}
   */
  connectedCallback() {
    super.connectedCallback(), r(this.bcfService), r(this.measurementService), r(this.redlineService), r(this.noteTextService), r(this.renderOptionsService), r(this.ifcRelationshipsService), r(this.viewService), r(this.floorplanService), r(this.pmiService), r(this.selectionService), r(this.cuttingService), r(this.cameraService), r(this.sheetService), r(this.walkOperatorService), r(this.explodeService), r(this.spaceMouseService), r(this.materialService), r(this.logService);
  }
  /**
   * Retrieves a service from the global service registry by its name.
   * This is a type-safe wrapper around the global getService function.
   *
   * @template T - The type of the service to retrieve, must extend IService
   * @param {ServiceName} serviceName - The unique name of the service to retrieve
   * @returns {T} The requested service instance
   * @throws {Error} If the service with the given name is not registered
   *
   * @example
   * ```typescript
   * const measurementService = registry.getService<IMeasurementService>('MeasurementService');
   * measurementService.startMeasurement();
   * ```
   */
  getService(c) {
    return D(c);
  }
  /**
   * Attempts to retrieve a service from the global service registry by its name.
   * Returns undefined if the service is not found, making it safe for optional services.
   *
   * @template T - The type of the service to retrieve, must extend IService
   * @param {ServiceName} serviceName - The unique name of the service to retrieve
   * @returns {T | undefined} The service instance if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const customService = registry.tryGetService<ICustomService>('CustomService');
   * if (customService) {
   *   customService.performCustomAction();
   * }
   * ```
   */
  tryGetService(c) {
    return F(c);
  }
  /**
   * Returns the element itself as the render root instead of creating a shadow DOM.
   * This ensures the component doesn't interfere with the application's styling and DOM structure.
   *
   * @internal
   * @protected
   * @override
   * @returns {Element} The element itself
   */
  createRenderRoot() {
    return this;
  }
  /**
   * Renders an empty template since this component is purely functional.
   * The component's purpose is service registration, not visual rendering.
   *
   * @internal
   */
  render() {
    return m``;
  }
};
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "bcfService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "redlineService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "noteTextService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "measurementService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "renderOptionsService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "viewService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "ifcRelationshipsService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "floorplanService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "pmiService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "selectionService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "cuttingService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "cameraService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "sheetService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "walkOperatorService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "explodeService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "spaceMouseService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "logService", 2);
t([
  i({ type: Object, attribute: !1 })
], e.prototype, "materialService", 2);
e = t([
  l("hoops-service-registry")
], e);
const ve = e;
export {
  e as HoopsServiceRegistryElement,
  ve as default
};
