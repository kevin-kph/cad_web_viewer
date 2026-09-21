var _a;
import { O as OperatorId, J as BCFTopic, U as createUuid, W as BCFViewpoint, X as Box, C as Color, b as Plane, P as Point3, Y as Projection, o as OrbitFallbackMode, Z as PointSizeUnit, A as AntiAliasingMode, _ as RelationshipType, j as SelectionMask, $ as WalkMode, z as InfoType, a0 as FloorplanOrientation, a1 as FloorplanAutoActivation, a2 as DefaultTransitionDuration, a3 as waitForAll, a4 as ElementType, a5 as SelectionItem, a6 as createReferenceGeometryFromAxis, a7 as createReferenceGeometryFromFaceNormal, a8 as FileType, k as NodeType, a9 as BranchVisibility, V as ViewOrientation, aa as MeasurePointPointDistanceMarkup, ab as MeasureFaceFaceDistanceMarkup, ac as MeasureStraightEdgeLengthMarkup, ad as MeasureCircleEdgeLengthMarkup, ae as MeasureFaceFaceAngleMarkup, af as RendererType, ag as StreamingMode, ah as WebViewer } from "./WebViewer.js";
function filterInPlace(xs, pred) {
  let j2 = 0;
  for (let i5 = 0; i5 < xs.length; ++i5) {
    const x2 = xs[i5];
    if (pred(x2)) {
      xs[j2++] = x2;
    }
  }
  xs.length = j2;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$8 = class s extends Event {
  constructor(s5, t2, e3) {
    super("context-request", { bubbles: true, composed: true }), this.context = s5, this.callback = t2, this.subscribe = e3 ?? false;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$9(n3) {
  return n3;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$7 = class s2 {
  constructor(t2, s5, i5, h3) {
    if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t3, s6) => {
      this.unsubscribe && (this.unsubscribe !== s6 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t3, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t3, s6)), this.unsubscribe = s6;
    }, this.host = t2, void 0 !== s5.context) {
      const t3 = s5;
      this.context = t3.context, this.callback = t3.callback, this.subscribe = t3.subscribe ?? false;
    } else this.context = s5, this.callback = i5, this.subscribe = h3 ?? false;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new s$8(this.context, this.t, this.subscribe));
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$6 = class s3 {
  get value() {
    return this.o;
  }
  set value(s5) {
    this.setValue(s5);
  }
  setValue(s5, t2 = false) {
    const i5 = t2 || !Object.is(s5, this.o);
    this.o = s5, i5 && this.updateObservers();
  }
  constructor(s5) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [s6, { disposer: t2 }] of this.subscriptions) s6(this.o, t2);
    }, void 0 !== s5 && (this.value = s5);
  }
  addCallback(s5, t2, i5) {
    if (!i5) return void s5(this.value);
    this.subscriptions.has(s5) || this.subscriptions.set(s5, { disposer: () => {
      this.subscriptions.delete(s5);
    }, consumerHost: t2 });
    const { disposer: h3 } = this.subscriptions.get(s5);
    s5(this.value, h3);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$b = class e extends Event {
  constructor(t2) {
    super("context-provider", { bubbles: true, composed: true }), this.context = t2;
  }
};
let i$8 = class i extends s$6 {
  constructor(s5, e3, i5) {
    var _a2, _b;
    super(void 0 !== e3.context ? e3.initialValue : i5), this.onContextRequest = (t2) => {
      const s6 = t2.composedPath()[0];
      t2.context === this.context && s6 !== this.host && (t2.stopPropagation(), this.addCallback(t2.callback, s6, t2.subscribe));
    }, this.onProviderRequest = (s6) => {
      const e4 = s6.composedPath()[0];
      if (s6.context !== this.context || e4 === this.host) return;
      const i6 = /* @__PURE__ */ new Set();
      for (const [s7, { consumerHost: e5 }] of this.subscriptions) i6.has(s7) || (i6.add(s7), e5.dispatchEvent(new s$8(this.context, s7, true)));
      s6.stopPropagation();
    }, this.host = s5, void 0 !== e3.context ? this.context = e3.context : this.context = e3, this.attachListeners(), (_b = (_a2 = this.host).addController) == null ? void 0 : _b.call(_a2, this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new e$b(this.context));
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$a({ context: e3 }) {
  return (n3, r2) => {
    const i5 = /* @__PURE__ */ new WeakMap();
    if ("object" == typeof r2) return r2.addInitializer((function() {
      i5.set(this, new i$8(this, { context: e3 }));
    })), { get() {
      return n3.get.call(this);
    }, set(t2) {
      var _a2;
      return (_a2 = i5.get(this)) == null ? void 0 : _a2.setValue(t2), n3.set.call(this, t2);
    }, init(t2) {
      var _a2;
      return (_a2 = i5.get(this)) == null ? void 0 : _a2.setValue(t2), t2;
    } };
    {
      n3.constructor.addInitializer(((n4) => {
        i5.set(n4, new i$8(n4, { context: e3 }));
      }));
      const o2 = Object.getOwnPropertyDescriptor(n3, r2);
      let s5;
      if (void 0 === o2) {
        const t2 = /* @__PURE__ */ new WeakMap();
        s5 = { get() {
          return t2.get(this);
        }, set(e4) {
          i5.get(this).setValue(e4), t2.set(this, e4);
        }, configurable: true, enumerable: true };
      } else {
        const t2 = o2.set;
        s5 = { ...o2, set(e4) {
          i5.get(this).setValue(e4), t2 == null ? void 0 : t2.call(this, e4);
        } };
      }
      return void Object.defineProperty(n3, r2, s5);
    }
  };
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function c$6({ context: c2, subscribe: e3 }) {
  return (o2, n3) => {
    "object" == typeof n3 ? n3.addInitializer((function() {
      new s$7(this, { context: c2, callback: (t2) => {
        o2.set.call(this, t2);
      }, subscribe: e3 });
    })) : o2.constructor.addInitializer(((o3) => {
      new s$7(o3, { context: c2, callback: (t2) => {
        o3[n3] = t2;
      }, subscribe: e3 });
    }));
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$5 = globalThis, e$9 = t$5.ShadowRoot && (void 0 === t$5.ShadyCSS || t$5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$5 = Symbol(), o$b = /* @__PURE__ */ new WeakMap();
let n$8 = class n {
  constructor(t2, e3, o2) {
    if (this._$cssResult$ = true, o2 !== s$5) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e3;
  }
  get styleSheet() {
    let t2 = this.o;
    const s5 = this.t;
    if (e$9 && void 0 === t2) {
      const e3 = void 0 !== s5 && 1 === s5.length;
      e3 && (t2 = o$b.get(s5)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e3 && o$b.set(s5, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$9 = (t2) => new n$8("string" == typeof t2 ? t2 : t2 + "", void 0, s$5), i$7 = (t2, ...e3) => {
  const o2 = 1 === t2.length ? t2[0] : e3.reduce((e4, s5, o3) => e4 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t2[o3 + 1], t2[0]);
  return new n$8(o2, t2, s$5);
}, S$2 = (s5, o2) => {
  if (e$9) s5.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e3 of o2) {
    const o3 = document.createElement("style"), n3 = t$5.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e3.cssText, s5.appendChild(o3);
  }
}, c$5 = e$9 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e3 = "";
  for (const s5 of t3.cssRules) e3 += s5.cssText;
  return r$9(e3);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$6, defineProperty: e$8, getOwnPropertyDescriptor: h$5, getOwnPropertyNames: r$8, getOwnPropertySymbols: o$a, getPrototypeOf: n$7 } = Object, a$2 = globalThis, c$4 = a$2.trustedTypes, l$2 = c$4 ? c$4.emptyScript : "", p$3 = a$2.reactiveElementPolyfillSupport, d$2 = (t2, s5) => t2, u$4 = { toAttribute(t2, s5) {
  switch (s5) {
    case Boolean:
      t2 = t2 ? l$2 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s5) {
  let i5 = t2;
  switch (s5) {
    case Boolean:
      i5 = null !== t2;
      break;
    case Number:
      i5 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t2);
      } catch (t3) {
        i5 = null;
      }
  }
  return i5;
} }, f$4 = (t2, s5) => !i$6(t2, s5), b$1 = { attribute: true, type: String, converter: u$4, reflect: false, useDefault: false, hasChanged: f$4 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$2.litPropertyMetadata ?? (a$2.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s5 = b$1) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s5 = Object.create(s5)).wrapped = true), this.elementProperties.set(t2, s5), !s5.noAccessor) {
      const i5 = Symbol(), h3 = this.getPropertyDescriptor(t2, i5, s5);
      void 0 !== h3 && e$8(this.prototype, t2, h3);
    }
  }
  static getPropertyDescriptor(t2, s5, i5) {
    const { get: e3, set: r2 } = h$5(this.prototype, t2) ?? { get() {
      return this[s5];
    }, set(t3) {
      this[s5] = t3;
    } };
    return { get: e3, set(s6) {
      const h3 = e3 == null ? void 0 : e3.call(this);
      r2 == null ? void 0 : r2.call(this, s6), this.requestUpdate(t2, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$2("elementProperties"))) return;
    const t2 = n$7(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$2("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$2("properties"))) {
      const t3 = this.properties, s5 = [...r$8(t3), ...o$a(t3)];
      for (const i5 of s5) this.createProperty(i5, t3[i5]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s5 = litPropertyMetadata.get(t2);
      if (void 0 !== s5) for (const [t3, i5] of s5) this.elementProperties.set(t3, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s5] of this.elementProperties) {
      const i5 = this._$Eu(t3, s5);
      void 0 !== i5 && this._$Eh.set(i5, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i5 = [];
    if (Array.isArray(s5)) {
      const e3 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e3) i5.unshift(c$5(s6));
    } else void 0 !== s5 && i5.push(c$5(s5));
    return i5;
  }
  static _$Eu(t2, s5) {
    const i5 = s5.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i5 of s5.keys()) this.hasOwnProperty(i5) && (t2.set(i5, this[i5]), delete this[i5]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$2(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s5, i5) {
    this._$AK(t2, i5);
  }
  _$ET(t2, s5) {
    var _a2;
    const i5 = this.constructor.elementProperties.get(t2), e3 = this.constructor._$Eu(t2, i5);
    if (void 0 !== e3 && true === i5.reflect) {
      const h3 = (void 0 !== ((_a2 = i5.converter) == null ? void 0 : _a2.toAttribute) ? i5.converter : u$4).toAttribute(s5, i5.type);
      this._$Em = t2, null == h3 ? this.removeAttribute(e3) : this.setAttribute(e3, h3), this._$Em = null;
    }
  }
  _$AK(t2, s5) {
    var _a2, _b;
    const i5 = this.constructor, e3 = i5._$Eh.get(t2);
    if (void 0 !== e3 && this._$Em !== e3) {
      const t3 = i5.getPropertyOptions(e3), h3 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$4;
      this._$Em = e3;
      const r2 = h3.fromAttribute(s5, t3.type);
      this[e3] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e3)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s5, i5, e3 = false, h3) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e3 && (h3 = this[t2]), i5 ?? (i5 = r2.getPropertyOptions(t2)), !((i5.hasChanged ?? f$4)(h3, s5) || i5.useDefault && i5.reflect && h3 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i5)))) return;
      this.C(t2, s5, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s5, { useDefault: i5, reflect: e3, wrapped: h3 }, r2) {
    i5 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s5 ?? this[t2]), true !== h3 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i5 || (s5 = void 0), this._$AL.set(t2, s5)), true === e3 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s6] of this._$Ep) this[t4] = s6;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s6, i5] of t3) {
        const { wrapped: t4 } = i5, e3 = this[s6];
        true !== t4 || this._$AL.has(s6) || void 0 === e3 || this.C(s6, void 0, i5, e3);
      }
    }
    let t2 = false;
    const s5 = this._$AL;
    try {
      t2 = this.shouldUpdate(s5), t2 ? (this.willUpdate(s5), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s5)) : this._$EM();
    } catch (s6) {
      throw t2 = false, this._$EM(), s6;
    }
    t2 && this._$AE(s5);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$2("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$2("finalized")] = /* @__PURE__ */ new Map(), p$3 == null ? void 0 : p$3({ ReactiveElement: y$1 }), (a$2.reactiveElementVersions ?? (a$2.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, i$5 = t$4.trustedTypes, s$4 = i$5 ? i$5.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$7 = "$lit$", h$4 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$9 = "?" + h$4, n$6 = `<${o$9}>`, r$7 = document, l$1 = () => r$7.createComment(""), c$3 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a$1 = Array.isArray, u$3 = (t2) => a$1(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d$1 = "[ 	\n\f\r]", f$3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$2 = /-->/g, _$1 = />/g, m$2 = RegExp(`>|${d$1}(?:([^\\s"'>=/]+)(${d$1}*=${d$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$2 = /'/g, g$1 = /"/g, $$1 = /^(?:script|style|textarea|title)$/i, T = Symbol.for("lit-noChange"), E$1 = Symbol.for("lit-nothing"), A$1 = /* @__PURE__ */ new WeakMap(), C$1 = r$7.createTreeWalker(r$7, 129);
function P$1(t2, i5) {
  if (!a$1(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$4 ? s$4.createHTML(i5) : i5;
}
const V$1 = (t2, i5) => {
  const s5 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c2 = f$3;
  for (let i6 = 0; i6 < s5; i6++) {
    const s6 = t2[i6];
    let a2, u2, d2 = -1, y3 = 0;
    for (; y3 < s6.length && (c2.lastIndex = y3, u2 = c2.exec(s6), null !== u2); ) y3 = c2.lastIndex, c2 === f$3 ? "!--" === u2[1] ? c2 = v$2 : void 0 !== u2[1] ? c2 = _$1 : void 0 !== u2[2] ? ($$1.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m$2) : void 0 !== u2[3] && (c2 = m$2) : c2 === m$2 ? ">" === u2[0] ? (c2 = r2 ?? f$3, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m$2 : '"' === u2[3] ? g$1 : p$2) : c2 === g$1 || c2 === p$2 ? c2 = m$2 : c2 === v$2 || c2 === _$1 ? c2 = f$3 : (c2 = m$2, r2 = void 0);
    const x2 = c2 === m$2 && t2[i6 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f$3 ? s6 + n$6 : d2 >= 0 ? (o2.push(a2), s6.slice(0, d2) + e$7 + s6.slice(d2) + h$4 + x2) : s6 + h$4 + (-2 === d2 ? i6 : x2);
  }
  return [P$1(t2, l2 + (t2[s5] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), o2];
};
let N$1 = class N {
  constructor({ strings: t2, _$litType$: s5 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = V$1(t2, s5);
    if (this.el = N.createElement(f2, n3), C$1.currentNode = this.el.content, 2 === s5 || 3 === s5) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C$1.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$7)) {
          const i5 = v2[a2++], s6 = r2.getAttribute(t3).split(h$4), e3 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: c2, name: e3[2], strings: s6, ctor: "." === e3[1] ? H$1 : "?" === e3[1] ? I$1 : "@" === e3[1] ? L$1 : k$1 }), r2.removeAttribute(t3);
        } else t3.startsWith(h$4) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($$1.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$4), s6 = t3.length - 1;
          if (s6 > 0) {
            r2.textContent = i$5 ? i$5.emptyScript : "";
            for (let i5 = 0; i5 < s6; i5++) r2.append(t3[i5], l$1()), C$1.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s6], l$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$9) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h$4, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h$4.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i5) {
    const s5 = r$7.createElement("template");
    return s5.innerHTML = t2, s5;
  }
};
function S$1(t2, i5, s5 = t2, e3) {
  var _a2, _b;
  if (i5 === T) return i5;
  let h3 = void 0 !== e3 ? (_a2 = s5._$Co) == null ? void 0 : _a2[e3] : s5._$Cl;
  const o2 = c$3(i5) ? void 0 : i5._$litDirective$;
  return (h3 == null ? void 0 : h3.constructor) !== o2 && ((_b = h3 == null ? void 0 : h3._$AO) == null ? void 0 : _b.call(h3, false), void 0 === o2 ? h3 = void 0 : (h3 = new o2(t2), h3._$AT(t2, s5, e3)), void 0 !== e3 ? (s5._$Co ?? (s5._$Co = []))[e3] = h3 : s5._$Cl = h3), void 0 !== h3 && (i5 = S$1(t2, h3._$AS(t2, i5.values), h3, e3)), i5;
}
let M$2 = class M {
  constructor(t2, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i5 }, parts: s5 } = this._$AD, e3 = ((t2 == null ? void 0 : t2.creationScope) ?? r$7).importNode(i5, true);
    C$1.currentNode = e3;
    let h3 = C$1.nextNode(), o2 = 0, n3 = 0, l2 = s5[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i6;
        2 === l2.type ? i6 = new R$1(h3, h3.nextSibling, this, t2) : 1 === l2.type ? i6 = new l2.ctor(h3, l2.name, l2.strings, this, t2) : 6 === l2.type && (i6 = new z$1(h3, this, t2)), this._$AV.push(i6), l2 = s5[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h3 = C$1.nextNode(), o2++);
    }
    return C$1.currentNode = r$7, e3;
  }
  p(t2) {
    let i5 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t2, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t2[i5])), i5++;
  }
};
let R$1 = class R {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i5, s5, e3) {
    this.type = 2, this._$AH = E$1, this._$AN = void 0, this._$AA = t2, this._$AB = i5, this._$AM = s5, this.options = e3, this._$Cv = (e3 == null ? void 0 : e3.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i5.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i5 = this) {
    t2 = S$1(this, t2, i5), c$3(t2) ? t2 === E$1 || null == t2 || "" === t2 ? (this._$AH !== E$1 && this._$AR(), this._$AH = E$1) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$3(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E$1 && c$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$7.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i5, _$litType$: s5 } = t2, e3 = "number" == typeof s5 ? this._$AC(t2) : (void 0 === s5.el && (s5.el = N$1.createElement(P$1(s5.h, s5.h[0]), this.options)), s5);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e3) this._$AH.p(i5);
    else {
      const t3 = new M$2(e3, this), s6 = t3.u(this.options);
      t3.p(i5), this.T(s6), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i5 = A$1.get(t2.strings);
    return void 0 === i5 && A$1.set(t2.strings, i5 = new N$1(t2)), i5;
  }
  k(t2) {
    a$1(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s5, e3 = 0;
    for (const h3 of t2) e3 === i5.length ? i5.push(s5 = new R(this.O(l$1()), this.O(l$1()), this, this.options)) : s5 = i5[e3], s5._$AI(h3), e3++;
    e3 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e3), i5.length = e3);
  }
  _$AR(t2 = this._$AA.nextSibling, i5) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i5); t2 && t2 !== this._$AB; ) {
      const i6 = t2.nextSibling;
      t2.remove(), t2 = i6;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
};
let k$1 = class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i5, s5, e3, h3) {
    this.type = 1, this._$AH = E$1, this._$AN = void 0, this.element = t2, this.name = i5, this._$AM = e3, this.options = h3, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = E$1;
  }
  _$AI(t2, i5 = this, s5, e3) {
    const h3 = this.strings;
    let o2 = false;
    if (void 0 === h3) t2 = S$1(this, t2, i5, 0), o2 = !c$3(t2) || t2 !== this._$AH && t2 !== T, o2 && (this._$AH = t2);
    else {
      const e4 = t2;
      let n3, r2;
      for (t2 = h3[0], n3 = 0; n3 < h3.length - 1; n3++) r2 = S$1(this, e4[s5 + n3], i5, n3), r2 === T && (r2 = this._$AH[n3]), o2 || (o2 = !c$3(r2) || r2 !== this._$AH[n3]), r2 === E$1 ? t2 = E$1 : t2 !== E$1 && (t2 += (r2 ?? "") + h3[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e3 && this.j(t2);
  }
  j(t2) {
    t2 === E$1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
let H$1 = class H extends k$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E$1 ? void 0 : t2;
  }
};
let I$1 = class I extends k$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E$1);
  }
};
let L$1 = class L extends k$1 {
  constructor(t2, i5, s5, e3, h3) {
    super(t2, i5, s5, e3, h3), this.type = 5;
  }
  _$AI(t2, i5 = this) {
    if ((t2 = S$1(this, t2, i5, 0) ?? E$1) === T) return;
    const s5 = this._$AH, e3 = t2 === E$1 && s5 !== E$1 || t2.capture !== s5.capture || t2.once !== s5.once || t2.passive !== s5.passive, h3 = t2 !== E$1 && (s5 === E$1 || e3);
    e3 && this.element.removeEventListener(this.name, this, s5), h3 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
let z$1 = class z {
  constructor(t2, i5, s5) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S$1(this, t2);
  }
};
const Z$1 = { I: R$1 }, j = t$4.litHtmlPolyfillSupport;
j == null ? void 0 : j(N$1, R$1), (t$4.litHtmlVersions ?? (t$4.litHtmlVersions = [])).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, i$4 = (t2) => t2, s$3 = t$3.trustedTypes, e$6 = s$3 ? s$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$3 = "$lit$", o$8 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$5 = "?" + o$8, r$6 = `<${n$5}>`, l = document, c$2 = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u$2 = Array.isArray, d = (t2) => u$2(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f$2 = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f$2}(?:([^\\s"'>=/]+)(${f$2}*=${f$2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i5, ...s5) => ({ _$litType$: t2, strings: i5, values: s5 }), b = x(1), w = x(2), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i5) {
  if (!u$2(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$6 ? e$6.createHTML(i5) : i5;
}
const N2 = (t2, i5) => {
  const s5 = t2.length - 1, e3 = [];
  let n3, l2 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c2 = v$1;
  for (let i6 = 0; i6 < s5; i6++) {
    const s6 = t2[i6];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s6.length && (c2.lastIndex = f2, u2 = c2.exec(s6), null !== u2); ) f2 = c2.lastIndex, c2 === v$1 ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n3 ?? v$1, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$1 : c2 === _ || c2 === m$1 ? c2 = v$1 : (c2 = p$1, n3 = void 0);
    const x2 = c2 === p$1 && t2[i6 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v$1 ? s6 + r$6 : d2 >= 0 ? (e3.push(a2), s6.slice(0, d2) + h$3 + s6.slice(d2) + o$8 + x2) : s6 + o$8 + (-2 === d2 ? i6 : x2);
  }
  return [V(t2, l2 + (t2[s5] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e3];
};
class S {
  constructor({ strings: t2, _$litType$: i5 }, e3) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N2(t2, i5);
    if (this.el = S.createElement(f2, e3), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$3)) {
          const i6 = v2[a2++], s5 = r2.getAttribute(t3).split(o$8), e4 = /([.?@])?(.*)/.exec(i6);
          d2.push({ type: 1, index: l2, name: e4[2], strings: s5, ctor: "." === e4[1] ? I2 : "?" === e4[1] ? L2 : "@" === e4[1] ? z2 : H2 }), r2.removeAttribute(t3);
        } else t3.startsWith(o$8) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$8), i6 = t3.length - 1;
          if (i6 > 0) {
            r2.textContent = s$3 ? s$3.emptyScript : "";
            for (let s5 = 0; s5 < i6; s5++) r2.append(t3[s5], c$2()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i6], c$2());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$5) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$8, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$8.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i5) {
    const s5 = l.createElement("template");
    return s5.innerHTML = t2, s5;
  }
}
function M$1(t2, i5, s5 = t2, e3) {
  var _a2, _b;
  if (i5 === E) return i5;
  let h3 = void 0 !== e3 ? (_a2 = s5._$Co) == null ? void 0 : _a2[e3] : s5._$Cl;
  const o2 = a(i5) ? void 0 : i5._$litDirective$;
  return (h3 == null ? void 0 : h3.constructor) !== o2 && ((_b = h3 == null ? void 0 : h3._$AO) == null ? void 0 : _b.call(h3, false), void 0 === o2 ? h3 = void 0 : (h3 = new o2(t2), h3._$AT(t2, s5, e3)), void 0 !== e3 ? (s5._$Co ?? (s5._$Co = []))[e3] = h3 : s5._$Cl = h3), void 0 !== h3 && (i5 = M$1(t2, h3._$AS(t2, i5.values), h3, e3)), i5;
}
class R2 {
  constructor(t2, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i5 }, parts: s5 } = this._$AD, e3 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i5, true);
    P.currentNode = e3;
    let h3 = P.nextNode(), o2 = 0, n3 = 0, r2 = s5[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i6;
        2 === r2.type ? i6 = new k2(h3, h3.nextSibling, this, t2) : 1 === r2.type ? i6 = new r2.ctor(h3, r2.name, r2.strings, this, t2) : 6 === r2.type && (i6 = new Z(h3, this, t2)), this._$AV.push(i6), r2 = s5[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h3 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e3;
  }
  p(t2) {
    let i5 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t2, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t2[i5])), i5++;
  }
}
class k2 {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i5, s5, e3) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i5, this._$AM = s5, this.options = e3, this._$Cv = (e3 == null ? void 0 : e3.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i5.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i5 = this) {
    t2 = M$1(this, t2, i5), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i5, _$litType$: s5 } = t2, e3 = "number" == typeof s5 ? this._$AC(t2) : (void 0 === s5.el && (s5.el = S.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e3) this._$AH.p(i5);
    else {
      const t3 = new R2(e3, this), s6 = t3.u(this.options);
      t3.p(i5), this.T(s6), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i5 = C.get(t2.strings);
    return void 0 === i5 && C.set(t2.strings, i5 = new S(t2)), i5;
  }
  k(t2) {
    u$2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s5, e3 = 0;
    for (const h3 of t2) e3 === i5.length ? i5.push(s5 = new k2(this.O(c$2()), this.O(c$2()), this, this.options)) : s5 = i5[e3], s5._$AI(h3), e3++;
    e3 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e3), i5.length = e3);
  }
  _$AR(t2 = this._$AA.nextSibling, s5) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s5); t2 !== this._$AB; ) {
      const s6 = i$4(t2).nextSibling;
      i$4(t2).remove(), t2 = s6;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H2 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i5, s5, e3, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i5, this._$AM = e3, this.options = h3, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t2, i5 = this, s5, e3) {
    const h3 = this.strings;
    let o2 = false;
    if (void 0 === h3) t2 = M$1(this, t2, i5, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e4 = t2;
      let n3, r2;
      for (t2 = h3[0], n3 = 0; n3 < h3.length - 1; n3++) r2 = M$1(this, e4[s5 + n3], i5, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h3[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e3 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I2 extends H2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L2 extends H2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z2 extends H2 {
  constructor(t2, i5, s5, e3, h3) {
    super(t2, i5, s5, e3, h3), this.type = 5;
  }
  _$AI(t2, i5 = this) {
    if ((t2 = M$1(this, t2, i5, 0) ?? A) === E) return;
    const s5 = this._$AH, e3 = t2 === A && s5 !== A || t2.capture !== s5.capture || t2.once !== s5.once || t2.passive !== s5.passive, h3 = t2 !== A && (s5 === A || e3);
    e3 && this.element.removeEventListener(this.name, this, s5), h3 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i5, s5) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M$1(this, t2);
  }
}
const B = t$3.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k2), (t$3.litHtmlVersions ?? (t$3.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i5, s5) => {
  const e3 = (s5 == null ? void 0 : s5.renderBefore) ?? i5;
  let h3 = e3._$litPart$;
  if (void 0 === h3) {
    const t3 = (s5 == null ? void 0 : s5.renderBefore) ?? null;
    e3._$litPart$ = h3 = new k2(i5.insertBefore(c$2(), t3), t3, void 0, s5 ?? {});
  }
  return h3._$AI(t2), h3;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$2 = globalThis;
let i$3 = class i2 extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
};
i$3._$litElement$ = true, i$3["finalized"] = true, (_a = s$2.litElementHydrateSupport) == null ? void 0 : _a.call(s$2, { LitElement: i$3 });
const o$7 = s$2.litElementPolyfillSupport;
o$7 == null ? void 0 : o$7({ LitElement: i$3 });
(s$2.litElementVersions ?? (s$2.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = (t2) => (e3, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e3);
  }) : customElements.define(t2, e3);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$6 = { attribute: true, type: String, converter: u$4, reflect: false, hasChanged: f$4 }, r$5 = (t2 = o$6, e3, r2) => {
  const { kind: n3, metadata: i5 } = r2;
  let s5 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i5, s5 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s5.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e3.get.call(this);
      e3.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e4) {
      return void 0 !== e4 && this.C(o2, void 0, t2, e4), e4;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e3.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$4(t2) {
  return (e3, o2) => "object" == typeof o2 ? r$5(t2, e3, o2) : ((t3, e4, o3) => {
    const r2 = e4.hasOwnProperty(o3);
    return e4.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e4, o3) : void 0;
  })(t2, e3, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$4(r2) {
  return n$4({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$5 = (e3, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e3, t2, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$4(e3, r2) {
  return (n3, s5, i5) => {
    const o2 = (t2) => {
      var _a2;
      return ((_a2 = t2.renderRoot) == null ? void 0 : _a2.querySelector(e3)) ?? null;
    };
    return e$5(n3, s5, { get() {
      return o2(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$3;
function r$3(r2) {
  return (n3, o2) => e$5(n3, o2, { get() {
    return (this.renderRoot ?? (e$3 ?? (e$3 = document.createDocumentFragment()))).querySelectorAll(r2);
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function o$5(o2) {
  return (e3, n3) => {
    const { slot: r2, selector: s5 } = o2 ?? {}, c2 = "slot" + (r2 ? `[name=${r2}]` : ":not([name])");
    return e$5(e3, n3, { get() {
      var _a2;
      const t2 = (_a2 = this.renderRoot) == null ? void 0 : _a2.querySelector(c2), e4 = (t2 == null ? void 0 : t2.assignedElements(o2)) ?? [];
      return void 0 === s5 ? e4 : e4.filter((t3) => t3.matches(s5));
    } });
  };
}
const CameraOperatorPosition = 0;
const ActiveToolOperatorPosition = 1;
const redlineModes = [
  OperatorId.RedlineCircle,
  OperatorId.RedlineText,
  OperatorId.RedlineRectangle,
  OperatorId.RedlinePolyline
];
function isService(obj) {
  return typeof obj === "object" && obj !== null && "serviceName" in obj && typeof obj.serviceName === "string";
}
function isResettableConfigurationService(obj) {
  return isService(obj) && "resetConfiguration" in obj && typeof obj.resetConfiguration === "function";
}
class BcfService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "BcfService";
  }
  get webViewer() {
    return this._webViewer;
  }
  set webViewer(value) {
    if (this._webViewer === value) {
      return;
    }
    this.clearTopicMarkupAutoDeactivate();
    this._webViewer = value;
    this.dispatchEvent(new CustomEvent("hoops-bcf-service-reset", { bubbles: true, composed: true }));
  }
  /** {@inheritDoc IBcfService.getBCFMap} */
  getBCFMap() {
    var _a2;
    return ((_a2 = this._webViewer) == null ? void 0 : _a2.BCFManager.getBCFMap()) ?? /* @__PURE__ */ new Map();
  }
  /** {@inheritDoc IBcfService.getBCFData} */
  getBCFData(id) {
    if (!this._webViewer) {
      return null;
    }
    return this._webViewer.BCFManager.getBCFData(id);
  }
  /** {@inheritDoc IBcfService.createBCFData} */
  createBCFData(name) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    return this._webViewer.BCFManager.createBCFData(name);
  }
  /** {@inheritDoc IBcfService.addBCFFromBuffer} */
  async addBCFFromBuffer(buffer, fileName) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    await this._webViewer.BCFManager.addBCFFromBuffer(buffer, fileName);
  }
  /** {@inheritDoc IBcfService.removeBCFData} */
  removeBCFData(id) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    this._webViewer.BCFManager.removeBCFData(id);
  }
  /** {@inheritDoc IBcfService.createTopic} */
  createTopic(bcfData, topicId) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    return new BCFTopic(
      bcfData.getId(),
      bcfData.getFilename(),
      topicId,
      this._webViewer
    );
  }
  /**
   * Creates a fully initialized BCF topic: markup, title, viewpoint, snapshot, and registers it on the BCF data.
   *
   * @param bcfData - The BCF data set to add the topic to.
   * @param title - The human-readable topic title.
   * @param captureView - The active markup view to capture in the topic viewpoint, or null/undefined.
   * @returns The fully initialized BCF topic.
   */
  async setupTopic(bcfData, title, captureView) {
    const topicId = createUuid();
    const topic = this.createTopic(bcfData, topicId);
    const markup = topic.addMarkup("markup.bcf", null);
    markup.setTopicTitle(title);
    markup.setTopicId(topicId);
    const viewpointFilename = "viewpoint.bcfv";
    const viewpoint = await this.createViewpoint(viewpointFilename, captureView);
    topic.setViewpoint(viewpointFilename, viewpoint);
    const topicSnapshot = await this.captureSnapshotPng();
    if (topicSnapshot) {
      topic.addSnapshot("snapshot.png", topicSnapshot);
    }
    bcfData.addTopic(topicId, topic);
    return topic;
  }
  /**
   * Creates a comment on a BCF topic, including its viewpoint and snapshot.
   *
   * @param topic - The BCF topic to add the comment to.
   * @param text - The comment text.
   * @param captureView - The active markup view to capture in the comment viewpoint, or null/undefined.
   * @returns An object containing the new comment's ID.
   */
  async addTopicComment(topic, text, captureView) {
    const markup = topic.getMarkup();
    if (!markup) {
      throw new Error("BcfService: Topic has no markup.");
    }
    const viewpointGuid = createUuid();
    const viewpointFilename = `${viewpointGuid}.bcfv`;
    const snapshotFilename = `${viewpointGuid}.png`;
    const viewpoint = await this.createViewpoint(viewpointFilename, captureView);
    topic.setViewpoint(viewpointFilename, viewpoint);
    const commentSnapshot = await this.captureSnapshotPng();
    if (commentSnapshot) {
      topic.addSnapshot(snapshotFilename, commentSnapshot);
    }
    markup.addViewpoint(viewpointGuid, viewpointFilename, snapshotFilename);
    const comment = markup.addComment(/* @__PURE__ */ new Date(), "User", text, viewpointGuid);
    return { commentId: comment.getId() };
  }
  /** {@inheritDoc IBcfService.getMarkupViewForBcfCapture} */
  getMarkupViewForBcfCapture() {
    if (!this._webViewer) {
      return null;
    }
    const markupManager = this._webViewer.markupManager;
    const activeView = markupManager.getActiveMarkupView(this._webViewer.view);
    if (activeView) {
      return activeView;
    }
    const viewKeys = markupManager.getMarkupViewKeys();
    for (let i5 = viewKeys.length - 1; i5 >= 0; i5--) {
      const view = markupManager.getMarkupView(viewKeys[i5]);
      if (view && view.getMarkup().length > 0) {
        return view;
      }
    }
    return null;
  }
  /** {@inheritDoc IBcfService.createViewpoint} */
  async createViewpoint(viewpointFilename, captureView) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    return await BCFViewpoint.createViewpoint(
      this._webViewer,
      viewpointFilename,
      captureView
    );
  }
  /**
   * Captures the current viewer state as a PNG image using `WebViewer.takeSnapshot()`.
   *
   * @returns PNG bytes of the snapshot, or null if capture fails or viewer is not initialized.
   */
  async captureSnapshotPng() {
    if (!this._webViewer) {
      return null;
    }
    try {
      const image = await this._webViewer.takeSnapshot();
      const dataUrl = image.src;
      const base64Marker = ";base64,";
      const base64Index = dataUrl.indexOf(base64Marker);
      if (base64Index < 0) {
        return null;
      }
      const raw = window.atob(dataUrl.substring(base64Index + base64Marker.length));
      const bytes = new Uint8Array(raw.length);
      for (let i5 = 0; i5 < raw.length; i5++) {
        bytes[i5] = raw.charCodeAt(i5);
      }
      return bytes;
    } catch {
      return null;
    }
  }
  /** {@inheritDoc IBcfService.activateTopicAndRestoreMarkup} */
  async activateTopicAndRestoreMarkup(topic, markupViewId) {
    if (!this._webViewer) {
      throw new Error("BcfService: WebViewer is not initialized.");
    }
    this.clearTopicMarkupAutoDeactivate();
    const viewpointMap = topic.getViewpointMap();
    const firstViewpoint = viewpointMap.values().next().value;
    if (firstViewpoint) {
      await firstViewpoint.activate();
    }
    if (!markupViewId) {
      return;
    }
    await this._webViewer.lineManager.removeAllLines();
    await this._webViewer.markupManager.activateMarkupViewWithPromise(
      markupViewId,
      this._webViewer.view,
      0
    );
    this._armTopicMarkupAutoDeactivate(markupViewId);
  }
  /**
   * Clears currently active topic markup overlays from the viewer.
   *
   * This centralizes direct markup-manager interactions behind the service API.
   */
  async clearActiveTopicMarkup() {
    if (!this._webViewer) {
      return;
    }
    await this._webViewer.lineManager.removeAllLines();
    await this._webViewer.markupManager._setActiveMarkupView(this._webViewer.view, null);
  }
  /** {@inheritDoc IBcfService.clearTopicMarkupAutoDeactivate} */
  clearTopicMarkupAutoDeactivate() {
    if (this._webViewer && this._topicMarkupCameraCallbacks) {
      this._webViewer.unsetCallbacks(this._topicMarkupCameraCallbacks);
    }
    this._topicMarkupCameraCallbacks = void 0;
  }
  _armTopicMarkupAutoDeactivate(markupViewId) {
    if (!this._webViewer) {
      return;
    }
    this.clearTopicMarkupAutoDeactivate();
    const activatedCamera = this._webViewer.view.getCamera();
    const callbackMap = {
      camera: (camera2) => {
        if (!this._webViewer) {
          return;
        }
        const activeView = this._webViewer.markupManager.getActiveMarkupView(this._webViewer.view);
        if ((activeView == null ? void 0 : activeView.getUniqueId()) !== markupViewId) {
          this.clearTopicMarkupAutoDeactivate();
          return;
        }
        if (camera2.equals(activatedCamera)) {
          return;
        }
        this.clearTopicMarkupAutoDeactivate();
        this._webViewer.view.setCamera(camera2, 0);
      }
    };
    this._topicMarkupCameraCallbacks = callbackMap;
    this._webViewer.setCallbacks(callbackMap);
  }
}
function isCuttingServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return typeof value.cappingGeometryVisibility === "boolean" && (typeof value.cappingFaceColor === "string" || typeof value.cappingFaceColor === "undefined") && (typeof value.cappingLineColor === "string" || typeof value.cappingLineColor === "undefined");
}
function convertHwvCuttingPlaneToCuttingPlane(hwvPlane) {
  return {
    plane: hwvPlane.plane,
    referenceGeometry: hwvPlane.referenceGeometry ?? void 0,
    color: hwvPlane.color,
    lineColor: hwvPlane.lineColor,
    opacity: hwvPlane.opacity,
    hideReferenceGeometry: !hwvPlane.referenceGeometry
  };
}
function convertHwvSectionToSection(hwvSection, hidden) {
  const hwvPlanes = hwvSection.getCuttingPlanes();
  return {
    cuttingPlanes: hwvPlanes.map(convertHwvCuttingPlaneToCuttingPlane),
    active: hwvSection.isActive(),
    hideReferenceGeometry: !!hidden
  };
}
function convertCuttingSections(cuttingManager, hidden) {
  return [...Array(cuttingManager.getCuttingSectionCount())].map((_2, index) => {
    const section = cuttingManager.getCuttingSection(index);
    if (!section) {
      throw new Error(`Cutting section at index ${index} not found`);
    }
    return convertHwvSectionToSection(
      section,
      hidden && hidden.length > index ? hidden[index] : false
    );
  });
}
function getSectionIndex(section, cuttingManager) {
  const count = cuttingManager.getCuttingSectionCount();
  for (let i5 = 0; i5 < count; i5++) {
    if (cuttingManager.getCuttingSection(i5) === section) {
      return i5;
    }
  }
  return -1;
}
function generatePlaneVertices(plane, boundingBox) {
  const normalLength = plane.normal.length();
  if (normalLength === 0) {
    return [];
  }
  const n3 = plane.normal.copy().normalize();
  let u2;
  if (Math.abs(n3.x) < Math.abs(n3.y) && Math.abs(n3.x) < Math.abs(n3.z)) {
    u2 = new Point3(1, 0, 0);
  } else if (Math.abs(n3.y) < Math.abs(n3.z)) {
    u2 = new Point3(0, 1, 0);
  } else {
    u2 = new Point3(0, 0, 1);
  }
  u2 = Point3.subtract(u2, Point3.scale(n3, Point3.dot(u2, n3))).normalize();
  const v2 = Point3.cross(n3, u2).normalize();
  const boxCenter = boundingBox.center();
  const planeCenter = Point3.subtract(boxCenter, Point3.scale(n3, Point3.dot(n3, boxCenter)));
  let uMin = Infinity;
  let uMax = -Infinity;
  let vMin = Infinity;
  let vMax = -Infinity;
  for (const corner of boundingBox.getCorners()) {
    const relative = Point3.subtract(corner, planeCenter);
    const uCoord = Point3.dot(relative, u2);
    const vCoord = Point3.dot(relative, v2);
    uMin = Math.min(uMin, uCoord);
    uMax = Math.max(uMax, uCoord);
    vMin = Math.min(vMin, vCoord);
    vMax = Math.max(vMax, vCoord);
  }
  const vertices = [
    Point3.add(planeCenter, Point3.add(Point3.scale(u2, uMin), Point3.scale(v2, vMin))),
    Point3.add(planeCenter, Point3.add(Point3.scale(u2, uMax), Point3.scale(v2, vMin))),
    Point3.add(planeCenter, Point3.add(Point3.scale(u2, uMax), Point3.scale(v2, vMax))),
    Point3.add(planeCenter, Point3.add(Point3.scale(u2, uMin), Point3.scale(v2, vMax)))
  ];
  return vertices;
}
function normalizePlaneEquation(plane) {
  const length = plane.normal.length();
  if (length === 0 || length === 1) {
    return plane;
  }
  const normalized = new Plane();
  normalized.normal = plane.normal.copy().scale(1 / length);
  normalized.d = plane.d / length;
  return normalized;
}
const _CuttingService = class _CuttingService extends EventTarget {
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
  constructor(cuttingManager) {
    super();
    this.serviceName = "CuttingService";
    this.sectionHideReferenceGeometry = [];
    this._cuttingManager = cuttingManager;
    this.callbackMap = {
      modelSwitched: async () => {
        if (!this._cuttingManager) {
          return;
        }
        const bounding = await this._cuttingManager.viewer.model.getModelBounding(true, false);
        this.setModelBounding(bounding);
      },
      modelStructureReady: async () => {
        if (!this._cuttingManager) {
          return;
        }
        const bounding = await this._cuttingManager.viewer.model.getModelBounding(true, false);
        this.setModelBounding(bounding);
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-sections-change", {
            bubbles: true,
            composed: true
          })
        );
      },
      cuttingSectionsLoaded: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-sections-change", {
            bubbles: true,
            composed: true
          })
        );
      },
      removeCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-section-removed", {
            bubbles: true,
            composed: true
          })
        );
      },
      addCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-section-added", {
            bubbles: true,
            composed: true
          })
        );
      },
      cuttingPlaneDragEnd: (section, planeIndex) => {
        if (!this._cuttingManager) {
          return;
        }
        const sectionIndex = getSectionIndex(section, this._cuttingManager);
        this.dispatchEvent(
          new CustomEvent(
            "hoops-cutting-plane-change",
            {
              bubbles: true,
              composed: true,
              detail: { sectionIndex, planeIndex }
            }
          )
        );
      },
      visibilityChanged: async () => {
        if (!this._cuttingManager) {
          return;
        }
        const bounding = await this._cuttingManager.viewer.model.getModelBounding(true, false);
        this.setModelBounding(bounding);
      },
      selectionArray: () => {
        var _a2;
        const selection = (_a2 = this._cuttingManager) == null ? void 0 : _a2.viewer.selectionManager.getLast();
        if (!selection) {
          this.selectedFace = void 0;
        } else {
          this.selectedFace = selection.isFaceSelection() ? {
            position: selection.getPosition(),
            normal: selection.getFaceEntity().getNormal()
          } : void 0;
        }
        this.dispatchEvent(
          new CustomEvent("hoops-cutting-face-selection-change", {
            bubbles: true,
            composed: true
          })
        );
      }
    };
    if (this._cuttingManager) {
      this.bind();
    }
  }
  /**
   * Binds event callbacks to the HOOPS Web Viewer cutting manager.
   *
   * @internal
   * @throws Error if cutting manager is not set
   */
  bind() {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    this._cuttingManager.viewer.setCallbacks(this.callbackMap);
  }
  /**
   * Unbinds event callbacks from the HOOPS Web Viewer cutting manager.
   *
   * @internal
   * @throws Error if cutting manager is not set
   */
  unbind() {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
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
  set cuttingManager(cuttingManager) {
    if (this._cuttingManager) {
      this.unbind();
    }
    this._cuttingManager = cuttingManager;
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-service-reset", { bubbles: true, composed: true })
    );
    if (!this._cuttingManager) {
      return;
    }
    this.bind();
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
    return this._modelBounding ?? new Box();
  }
  /**
   * Sets the model bounding box.
   *
   * @param modelBounding - The new model bounding box
   */
  setModelBounding(modelBounding) {
    this._modelBounding = modelBounding;
  }
  /**
   * Gets the current capping geometry visibility state.
   *
   * @returns True if capping geometry is visible, false otherwise, or default value if no cutting manager is set
   */
  getCappingGeometryVisibility() {
    if (!this._cuttingManager) {
      return _CuttingService.DefaultConfig.cappingGeometryVisibility;
    }
    return this._cuttingManager.getCappingGeometryVisibility();
  }
  /**
   * Sets the capping geometry visibility state.
   *
   * @param cappingGeometryVisibility - True to show capping geometry, false to hide
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-geometry-visibility-changed - When visibility state changes
   */
  async setCappingGeometryVisibility(cappingGeometryVisibility) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    await this._cuttingManager.setCappingGeometryVisibility(cappingGeometryVisibility);
    this.dispatchEvent(
      new CustomEvent("hoops-capping-geometry-visibility-changed", {
        bubbles: true,
        composed: true,
        detail: cappingGeometryVisibility
      })
    );
  }
  /**
   * Gets the current capping face color.
   *
   * @returns The capping face color as a hex string, or default value if no cutting manager is set
   */
  getCappingFaceColor() {
    if (!this._cuttingManager) {
      return _CuttingService.DefaultConfig.cappingFaceColor;
    }
    const faceColor = this._cuttingManager.getCappingFaceColor();
    return faceColor == null ? void 0 : faceColor.toHexString();
  }
  /**
   * Sets the capping face color.
   *
   * @param color - The color as a hex string (e.g., "#ff0000"), or undefined to use default
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-face-color-changed - When face color changes
   */
  async setCappingFaceColor(color) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    await this._cuttingManager.setCappingFaceColor(color ? Color.fromHexString(color) : null);
    this.dispatchEvent(
      new CustomEvent("hoops-capping-face-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  /**
   * Gets the current capping line color.
   *
   * @returns The capping line color as a hex string, or default value if no cutting manager is set
   */
  getCappingLineColor() {
    if (!this._cuttingManager) {
      return _CuttingService.DefaultConfig.cappingLineColor;
    }
    const lineColor = this._cuttingManager.getCappingLineColor();
    return lineColor == null ? void 0 : lineColor.toHexString();
  }
  /**
   * Sets the capping line color.
   *
   * @param color - The color as a hex string (e.g., "#000000"), or undefined to use default
   * @throws Error if cutting manager is not set
   *
   * @fires hoops-capping-line-color-changed - When line color changes
   */
  async setCappingLineColor(color) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    await this._cuttingManager.setCappingLineColor(color ? Color.fromHexString(color) : null);
    this.dispatchEvent(
      new CustomEvent("hoops-capping-line-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  /**
   * Gets the total number of cutting sections.
   *
   * @returns The number of cutting sections, or 0 if no cutting manager is set
   */
  getCuttingSectionCount() {
    if (!this._cuttingManager) {
      return 0;
    }
    return this._cuttingManager.getCuttingSectionCount();
  }
  /**
   * Gets all cutting sections.
   *
   * @returns Array of Section objects representing all cutting sections
   */
  getCuttingSections() {
    if (!this._cuttingManager) {
      return [];
    }
    const sections = convertCuttingSections(
      this._cuttingManager,
      this.sectionHideReferenceGeometry
    );
    this.sectionHideReferenceGeometry = sections.map((section) => !!section.hideReferenceGeometry);
    return sections;
  }
  /**
   * Gets a cutting section by index.
   *
   * @param index - The index of the cutting section to retrieve
   * @returns The Section object at the specified index, or undefined if not found
   */
  getCuttingSection(index) {
    if (!this._cuttingManager) {
      return void 0;
    }
    const hwvSection = this._cuttingManager.getCuttingSection(index);
    if (!hwvSection) {
      return void 0;
    }
    return convertHwvSectionToSection(hwvSection, this.sectionHideReferenceGeometry[index]);
  }
  /**
   * Clears all cutting planes from the specified cutting section.
   *
   * @param sectionIndex - The index of the cutting section to clear
   * @throws Error if cutting manager is not set or section index is invalid
   *
   * @fires hoops-cutting-section-change - When the section is cleared
   */
  async clearCuttingSection(sectionIndex) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    await hwvSection.clear();
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex }
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
  async setCuttingSectionState(sectionIndex, active) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    if (active) {
      await hwvSection.activate();
    } else {
      await hwvSection.deactivate();
    }
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex }
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
  async setCuttingSectionGeometryVisibility(sectionIndex, hidden) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    this.sectionHideReferenceGeometry[sectionIndex] = hidden;
    await Promise.all(
      hwvSection.getCuttingPlanes().map((cuttingPlane2, index) => {
        const plane = normalizePlaneEquation(cuttingPlane2.plane);
        let refGeo;
        if (!hidden) {
          if (cuttingPlane2.referenceGeometry) {
            refGeo = cuttingPlane2.referenceGeometry;
          } else if (this._cuttingManager) {
            const bounding = this._modelBounding ?? new Box();
            refGeo = generatePlaneVertices(plane, bounding);
          } else {
            refGeo = null;
          }
        } else {
          refGeo = null;
        }
        return hwvSection.setPlane(index, plane, refGeo, cuttingPlane2);
      })
    );
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-section-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex }
      })
    );
  }
  /**
   * Gets the number of cutting planes in a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @returns The number of cutting planes in the section, or 0 if section not found
   */
  getCuttingPlaneCount(sectionIndex) {
    if (!this._cuttingManager) {
      return 0;
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      return 0;
    }
    return hwvSection.getCount();
  }
  /**
   * Gets all cutting planes from a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @returns Array of CuttingPlane objects representing all planes in the section
   */
  getCuttingPlanes(sectionIndex) {
    if (!this._cuttingManager) {
      return [];
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      return [];
    }
    const hwvPlanes = hwvSection.getCuttingPlanes();
    return hwvPlanes.map(convertHwvCuttingPlaneToCuttingPlane);
  }
  /**
   * Gets a specific cutting plane from a cutting section.
   *
   * @param sectionIndex - The index of the cutting section
   * @param planeIndex - The index of the cutting plane within the section
   * @returns The CuttingPlane object at the specified indices, or undefined if not found
   */
  getCuttingPlane(sectionIndex, planeIndex) {
    if (!this._cuttingManager) {
      return void 0;
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      return void 0;
    }
    const hwvPlane = hwvSection.getCuttingPlanes()[planeIndex];
    if (!hwvPlane) {
      return void 0;
    }
    return convertHwvCuttingPlaneToCuttingPlane(hwvPlane);
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
  async addCuttingPlane(sectionIndex, cuttingPlane2) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    await hwvSection.addPlane(
      normalizePlaneEquation(cuttingPlane2.plane),
      cuttingPlane2.referenceGeometry ?? null,
      cuttingPlane2
    );
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-added", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex }
      })
    );
    if (!hwvSection.isActive()) {
      this.setCuttingSectionState(sectionIndex, true);
    }
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
  async removeCuttingPlane(sectionIndex, planeIndex) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    const hwvPlanes = hwvSection.getCuttingPlanes();
    if (planeIndex < 0 || planeIndex >= hwvPlanes.length) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    await hwvSection.removePlane(planeIndex);
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-removed", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  async updateCuttingPlane(sectionIndex, planeIndex, cuttingPlane2) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    const hwvPlanes = hwvSection.getCuttingPlanes();
    if (planeIndex < 0 || planeIndex >= hwvPlanes.length) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    const hwvPlane = hwvPlanes[planeIndex];
    if (cuttingPlane2.plane || cuttingPlane2.referenceGeometry) {
      const requestedPlane = cuttingPlane2.plane ?? hwvPlane.plane;
      const newPlane = normalizePlaneEquation(requestedPlane);
      if (cuttingPlane2.referenceGeometry && this._cuttingManager) {
        cuttingPlane2.referenceGeometry = generatePlaneVertices(newPlane, this.getModelBounding());
      }
      const newReferenceGeometry = cuttingPlane2.referenceGeometry !== void 0 ? cuttingPlane2.referenceGeometry : hwvPlane.referenceGeometry;
      await hwvSection.setPlane(planeIndex, newPlane, newReferenceGeometry ?? null, {
        color: cuttingPlane2.color ?? hwvPlane.color,
        lineColor: cuttingPlane2.lineColor ?? hwvPlane.lineColor,
        opacity: cuttingPlane2.opacity ?? hwvPlane.opacity
      });
    } else {
      if (cuttingPlane2.color) {
        hwvSection.setPlaneColor(
          planeIndex,
          new Color(cuttingPlane2.color.r, cuttingPlane2.color.g, cuttingPlane2.color.b)
        );
      }
      if (cuttingPlane2.lineColor) {
        hwvSection.setPlaneLineColor(
          planeIndex,
          new Color(cuttingPlane2.lineColor.r, cuttingPlane2.lineColor.g, cuttingPlane2.lineColor.b)
        );
      }
      if (cuttingPlane2.opacity !== void 0) {
        hwvSection.setPlaneOpacity(planeIndex, cuttingPlane2.opacity);
      }
    }
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  async setCuttingPlaneVisibility(sectionIndex, planeIndex, visible) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    if (planeIndex < 0 || planeIndex >= hwvSection.getCount()) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    const bounding = this.getModelBounding();
    const cuttingPlane2 = hwvSection.getCuttingPlanes()[planeIndex];
    const plane = normalizePlaneEquation(cuttingPlane2.plane);
    const geometry = visible && this._cuttingManager ? generatePlaneVertices(plane, bounding) : null;
    cuttingPlane2.referenceGeometry = geometry;
    await hwvSection.setPlane(planeIndex, plane, geometry, cuttingPlane2);
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  setCuttingPlaneColor(sectionIndex, planeIndex, color) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    if (planeIndex < 0 || planeIndex >= hwvSection.getCount()) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    hwvSection.setPlaneColor(planeIndex, new Color(color.r, color.g, color.b));
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  setCuttingPlaneLineColor(sectionIndex, planeIndex, lineColor) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    if (planeIndex < 0 || planeIndex >= hwvSection.getCount()) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    hwvSection.setPlaneLineColor(planeIndex, new Color(lineColor.r, lineColor.g, lineColor.b));
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  setCuttingPlaneOpacity(sectionIndex, planeIndex, opacity) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const hwvSection = this._cuttingManager.getCuttingSection(sectionIndex);
    if (!hwvSection) {
      throw new Error(`No cutting section at index ${sectionIndex}`);
    }
    if (planeIndex < 0 || planeIndex >= hwvSection.getCount()) {
      throw new Error(`No cutting plane at index ${planeIndex} in section ${sectionIndex}`);
    }
    hwvSection.setPlaneOpacity(planeIndex, opacity);
    this.dispatchEvent(
      new CustomEvent("hoops-cutting-plane-change", {
        bubbles: true,
        composed: true,
        detail: { sectionIndex, planeIndex }
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
  async resetConfiguration(obj) {
    if (!this._cuttingManager) {
      throw new Error("Cutting manager not set");
    }
    const config = obj ?? _CuttingService.DefaultConfig;
    if (!isCuttingServiceConfiguration(config)) {
      throw new Error("Invalid cutting configuration object");
    }
    this.setCappingGeometryVisibility(config.cappingGeometryVisibility);
    this.setCappingFaceColor(config.cappingFaceColor);
    this.setCappingLineColor(config.cappingLineColor);
  }
};
_CuttingService.DefaultConfig = {
  cappingGeometryVisibility: true,
  cappingFaceColor: "#808080",
  cappingLineColor: "#808080"
};
let CuttingService = _CuttingService;
const ProjectionValues = ["Perspective", "Orthographic"];
const OrbitFallbackModeValues = ["Camera Target", "Model Center", "Orbit Target"];
function isProjection(value) {
  return ProjectionValues.includes(value);
}
function isOrbitFallbackMode(value) {
  return OrbitFallbackModeValues.includes(value);
}
function isCameraServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return isProjection(value.projectionMode) && isOrbitFallbackMode(value.orbitFallbackMode);
}
function toServiceProjectionMode(projection) {
  switch (projection) {
    case Projection.Perspective:
      return "Perspective";
    case Projection.Orthographic:
      return "Orthographic";
    default:
      throw new Error(`Unknown projection mode: ${projection}`);
  }
}
function toWebViewerProjectionMode(projection) {
  switch (projection) {
    case "Perspective":
      return Projection.Perspective;
    case "Orthographic":
      return Projection.Orthographic;
    default:
      throw new Error(`Unknown projection mode: ${projection}`);
  }
}
function toServiceOrbitFallbackMode(mode) {
  switch (mode) {
    case OrbitFallbackMode.CameraTarget:
      return "Camera Target";
    case OrbitFallbackMode.ModelCenter:
      return "Model Center";
    case OrbitFallbackMode.OrbitTarget:
      return "Orbit Target";
    default:
      throw new Error(`Unknown orbit fallback mode: ${mode}`);
  }
}
function toWebViewerOrbitFallbackMode(mode) {
  switch (mode) {
    case "Camera Target":
      return OrbitFallbackMode.CameraTarget;
    case "Model Center":
      return OrbitFallbackMode.ModelCenter;
    case "Orbit Target":
      return OrbitFallbackMode.OrbitTarget;
    default:
      throw new Error(`Unknown orbit fallback mode: ${mode}`);
  }
}
const _CameraService = class _CameraService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "CameraService";
  }
  get webViewer() {
    return this._webViewer;
  }
  set webViewer(webViewer) {
    if (this._webViewer === webViewer) {
      return;
    }
    this._webViewer = webViewer;
    this.reset();
  }
  getProjectionMode() {
    if (!this._webViewer) {
      return _CameraService.DefaultConfig.projectionMode;
    }
    return toServiceProjectionMode(this._webViewer.view.getProjectionMode());
  }
  setProjectionMode(projectionMode) {
    if (!this._webViewer) {
      throw new Error("WebViewer is not set");
    }
    if (projectionMode === this.getProjectionMode()) {
      return;
    }
    this._webViewer.view.setProjectionMode(toWebViewerProjectionMode(projectionMode));
    this.dispatchEvent(
      new CustomEvent("hoops-projection-mode-changed", {
        detail: projectionMode,
        bubbles: true,
        composed: true
      })
    );
  }
  getOrbitFallbackMode() {
    if (!this._webViewer) {
      return _CameraService.DefaultConfig.orbitFallbackMode;
    }
    const orbitOperator = this._webViewer.operatorManager.getOperator(OperatorId.Orbit);
    return toServiceOrbitFallbackMode(orbitOperator.getOrbitFallbackMode());
  }
  setOrbitFallbackMode(fallbackMode) {
    if (!this._webViewer) {
      throw new Error("WebViewer is not set");
    }
    if (fallbackMode === this.getOrbitFallbackMode()) {
      return;
    }
    const orbitOperator = this._webViewer.operatorManager.getOperator(OperatorId.Orbit);
    orbitOperator.setOrbitFallbackMode(toWebViewerOrbitFallbackMode(fallbackMode));
    this.dispatchEvent(
      new CustomEvent("hoops-orbit-fallback-mode-changed", {
        detail: fallbackMode,
        bubbles: true,
        composed: true
      })
    );
  }
  async resetConfiguration(obj) {
    if (!this._webViewer) {
      throw new Error("WebViewer is not set");
    }
    const config = obj ?? _CameraService.DefaultConfig;
    if (!isCameraServiceConfiguration(config)) {
      throw new Error("Invalid camera configuration object");
    }
    this.setProjectionMode(config.projectionMode);
    this.setOrbitFallbackMode(config.orbitFallbackMode);
  }
  async reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-camera-service-reset", { bubbles: true, composed: true })
    );
  }
};
_CameraService.DefaultConfig = {
  projectionMode: "Orthographic",
  orbitFallbackMode: "Model Center"
};
let CameraService = _CameraService;
class ExplodeService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "ExplodeService";
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(value) {
    if (this._webviewer === value) {
      return;
    }
    this._webviewer = value;
    this.reset();
  }
  /**
   * Resets the explode service, clearing any active operations.
   */
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-explode-service-reset", { bubbles: true, composed: true })
    );
  }
  /**
   * Starts an explode operation. This will cancel any currently active explode operation.
   * @param nodeIds an array of node Ids for the parts that should be exploded. If this parameter is omitted or is an empty array, the entire model will be considered for explosion.
   * @param explosionVector the vector to use for the center of the explosion.
   * @returns a promise that resolves when this operation is complete.
   */
  async start(nodeIds, explosionVector) {
    if (!this._webviewer) {
      return Promise.reject(new Error("Webviewer not set"));
    }
    await this._webviewer.explodeManager.start(
      nodeIds,
      explosionVector ? new Point3(explosionVector.x, explosionVector.y, explosionVector.z) : void 0
    );
    this.dispatchEvent(
      new CustomEvent("hoops-explode-started", {
        bubbles: true,
        composed: true,
        detail: { nodeIds, explosionVector }
      })
    );
  }
  /**
   * Sets the explosion magnitude if there is an active explosion operation.
   * A value of 1.0 indicates that the distance between a part's exploded center, and exploded center will be double.
   * @param magnitude the magnitude for the explosion.
   * @returns a promise that resolves when this operation is complete.
   */
  async setMagnitude(magnitude) {
    if (!this._webviewer) {
      return Promise.reject(new Error("Webviewer not set"));
    }
    await this._webviewer.explodeManager.setMagnitude(magnitude);
    this.dispatchEvent(
      new CustomEvent("hoops-explode-magnitude-changed", {
        bubbles: true,
        composed: true,
        detail: magnitude
      })
    );
  }
  /**
   * Terminates any active explode operation.
   * @returns a promise that resolves when this operation is complete.
   */
  async stop() {
    if (!this._webviewer) {
      return Promise.reject(new Error("Webviewer not set"));
    }
    await this._webviewer.explodeManager.stop();
    this.dispatchEvent(
      new CustomEvent("hoops-explode-stopped", {
        bubbles: true,
        composed: true
      })
    );
  }
  /**
   * Gets the current explode magnitude. This will always return 0 when there is no active explode operation.
   * @returns the current explode magnitude.
   */
  getMagnitude() {
    if (!this._webviewer) {
      return 0;
    }
    return this._webviewer.explodeManager.getMagnitude();
  }
  /**
   * Indicates whether there is a currently active explode operation.
   * @returns boolean value indicating if there is an active explode operation.
   */
  getActive() {
    if (!this._webviewer) {
      return false;
    }
    return this._webviewer.explodeManager.getActive();
  }
}
function formatRedlineItem(markup) {
  return {
    id: markup.uniqueId,
    type: markup.getClassName()
  };
}
function formatRedlineView(view) {
  return {
    id: view.getUniqueId(),
    items: view.getMarkup().map(formatRedlineItem)
  };
}
function formatRedlineIcon(className) {
  switch (className) {
    case "Communicator.Markup.Redline.RedlineCircle":
      return "redlineCircle";
    case "Communicator.Markup.Redline.RedlineRectangle":
      return "redlineRectangle";
    case "Communicator.Markup.Redline.RedlinePolyline":
      return "redlineFreehand";
    case "Communicator.Markup.Redline.RedlineText":
      return "redlineNote";
    default:
      console.warn(`Unknown redline class name: ${className}`);
      return "undefined";
  }
}
class RedlineService extends EventTarget {
  constructor(markupManager) {
    super();
    this.serviceName = "RedlineService";
    this._markupManager = markupManager;
    this.redlineCreated = this.redlineCreated.bind(this);
    this.redlineDeleted = this.redlineDeleted.bind(this);
    this.viewDeleted = this.viewDeleted.bind(this);
    this.callbackMap = {
      redlineCreated: this.redlineCreated,
      redlineDeleted: this.redlineDeleted,
      viewDeleted: this.viewDeleted
    };
    if (this._markupManager) {
      this.bind();
    }
  }
  redlineCreated(markup) {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    const markupItemData = formatRedlineItem(markup);
    const markupViewId = this._markupManager.getMarkupViewKeys().find((key) => {
      const view = this._markupManager.getMarkupView(key);
      return view && view.getMarkup().find((item) => item.uniqueId === markup.uniqueId);
    });
    if (!markupViewId) {
      console.warn("Markup view not found for the created redline", markupItemData);
      return;
    }
    this._markupManager.selectMarkup(markup, this._markupManager.viewer.view);
    this.dispatchEvent(
      new CustomEvent("hoops-redline-created", {
        detail: {
          markupViewId,
          markup: markupItemData
        },
        bubbles: true,
        composed: true
      })
    );
  }
  redlineDeleted(markup) {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    const markupViewId = this._markupManager.getMarkupViewKeys().find((key) => {
      const view = this._markupManager.getMarkupView(key);
      return view && view.getMarkup().find((item) => item.uniqueId === markup.uniqueId);
    });
    if (!markupViewId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hoops-redline-deleted", {
        detail: {
          markupViewId,
          markup: formatRedlineItem(markup)
        },
        bubbles: true,
        composed: true
      })
    );
  }
  viewDeleted(view) {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    this.dispatchEvent(
      new CustomEvent("hoops-redline-view-deleted", {
        detail: {
          markupViewId: view.getUniqueId()
        },
        bubbles: true,
        composed: true
      })
    );
  }
  bind() {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    this._markupManager.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    this._markupManager.viewer.unsetCallbacks(this.callbackMap);
  }
  get markupManager() {
    return this._markupManager;
  }
  set markupManager(value) {
    if (this._markupManager === value) {
      return;
    }
    if (this._markupManager) {
      this.unbind();
    }
    this._markupManager = value;
    this.bind();
    this.dispatchEvent(
      new CustomEvent("hoops-redline-service-reset", { bubbles: true, composed: true })
    );
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-redline-service-reset", { bubbles: true, composed: true })
    );
  }
  getRedlineViewKeys() {
    var _a2;
    return ((_a2 = this._markupManager) == null ? void 0 : _a2.getMarkupViewKeys()) || [];
  }
  getRedlineViews() {
    var _a2;
    return ((_a2 = this._markupManager) == null ? void 0 : _a2.getMarkupViewKeys().map((key) => {
      return formatRedlineView(this._markupManager.getMarkupView(key));
    })) || [];
  }
  getRedlineView(uniqueId) {
    var _a2;
    const view = (_a2 = this._markupManager) == null ? void 0 : _a2.getMarkupView(uniqueId);
    if (!view) {
      return void 0;
    }
    return formatRedlineView(view);
  }
  getActiveViewKey() {
    if (!this._markupManager) {
      return void 0;
    }
    const activeView = this._markupManager.getActiveMarkupView(this._markupManager.viewer.view);
    return activeView ? activeView.getUniqueId() : void 0;
  }
  async setActiveView(uniqueId) {
    if (!this.markupManager) {
      throw new Error("MarkupManager is not set");
    }
    return this.markupManager.activateMarkupViewWithPromise(uniqueId, this.markupManager.viewer.view).then((result) => {
      if (result) {
        this.dispatchEvent(
          new CustomEvent("hoops-markup-view-activated", {
            detail: {
              markupViewId: uniqueId
            },
            bubbles: true,
            composed: true
          })
        );
      }
      return result;
    });
  }
  getActiveView() {
    var _a2;
    const activeViewKey = this.getActiveViewKey();
    if (!activeViewKey) {
      return void 0;
    }
    const view = (_a2 = this._markupManager) == null ? void 0 : _a2.getMarkupView(activeViewKey);
    return formatRedlineView(view);
  }
  async removeRedlineItem(viewId, item) {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    const view = this._markupManager.getMarkupView(viewId);
    if (!view) {
      throw new Error(`Redline view with ID ${viewId} not found`);
    }
    const markupItem = view.getMarkup().find((m2) => m2.uniqueId === item.id);
    if (!markupItem) {
      throw new Error(`Redline item with ID ${item.id} not found in view ${viewId}`);
    }
    view.removeMarkup(markupItem);
    if (view.getMarkup().length === 0) {
      this.removeRedlineView(viewId);
    }
  }
  removeRedlineView(uniqueId) {
    if (!this._markupManager) {
      throw new Error("MarkupManager is not set");
    }
    const view = this._markupManager.getMarkupView(uniqueId);
    if (!view) {
      throw new Error(`Redline view with ID ${uniqueId} not found`);
    }
    if (!this._markupManager.deleteMarkupView(uniqueId)) {
      throw new Error(`Failed to remove redline view with ID ${uniqueId}`);
    }
  }
}
const PointSizeUnitValues = [
  "Screen Pixels",
  "CSS Pixels",
  "World",
  "Proportion Of Screen Width",
  "Proportion Of Screen Height",
  "Proportion Of Bounding Diagonal"
];
function isPointSizeUnit(obj) {
  return PointSizeUnitValues.includes(obj);
}
//! rgb colors as hexadecimal strings
//! undefined if transparent
function isVerticalGradient(obj) {
  return !!obj && typeof obj === "object" && (typeof obj.top === "string" || obj.top === void 0) && (typeof obj.bottom === "string" || obj.bottom === void 0);
}
function isRenderOptionsServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return typeof value.minimumFramerate === "number" && typeof value.hiddenLineOpacity === "number" && typeof value.showBackfaces === "boolean" && typeof value.ambientOcclusionEnabled === "boolean" && typeof value.ambientOcclusionRadius === "number" && typeof value.antiAliasingEnabled === "boolean" && typeof value.bloomEnabled === "boolean" && typeof value.bloomIntensity === "number" && typeof value.bloomThreshold === "number" && typeof value.silhouetteEnabled === "boolean" && typeof value.reflectionEnabled === "boolean" && typeof value.shadowEnabled === "boolean" && typeof value.shadowInteractive === "boolean" && typeof value.shadowBlurSamples === "number" && typeof value.splatRenderingEnabled === "boolean" && typeof value.splatRenderingSize === "number" && isPointSizeUnit(value.splatRenderingPointSizeUnit) && typeof value.eyeDomeLightingEnabled === "boolean" && isVerticalGradient(value.backgroundColor);
}
function toWebViewerPointSizeUnit(unit) {
  switch (unit) {
    case "Screen Pixels":
      return PointSizeUnit.ScreenPixels;
    case "CSS Pixels":
      return PointSizeUnit.CSSPixels;
    case "World":
      return PointSizeUnit.World;
    case "Proportion Of Screen Width":
      return PointSizeUnit.ProportionOfScreenWidth;
    case "Proportion Of Screen Height":
      return PointSizeUnit.ProportionOfScreenHeight;
    case "Proportion Of Bounding Diagonal":
      return PointSizeUnit.ProportionOfBoundingDiagonal;
    default:
      throw new Error(`Unknown service point size unit: ${unit}`);
  }
}
const _RenderOptionsService = class _RenderOptionsService extends EventTarget {
  constructor() {
    super();
    this.serviceName = "RenderOptionsService";
    this._webViewerReady = false;
    this._splatRenderingEnabled = false;
    this._splatRenderingSize = 3e-3;
    this._splatRenderingPointSizeUnit = "Screen Pixels";
    this.sceneReady = this.sceneReady.bind(this);
    this._callbackMap = {
      sceneReady: this.sceneReady,
      firstModelLoaded: () => {
        this.updateSplatRenderingEnabled();
        this.dispatchEvent(
          new CustomEvent("hoops-render-options-service-reset", { bubbles: true, composed: true })
        );
      },
      modelSwitched: () => {
        this.updateSplatRenderingEnabled();
        this.dispatchEvent(
          new CustomEvent("hoops-render-options-service-reset", { bubbles: true, composed: true })
        );
      }
    };
  }
  bind() {
    if (!this._webviewer) {
      throw new Error("MarkupManager is not set");
    }
    this._webviewer.setCallbacks(this._callbackMap);
  }
  unbind() {
    if (!this._webviewer) {
      throw new Error("WebViewer not set");
    }
    this._webviewer.unsetCallbacks(this._callbackMap);
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(value) {
    if (this._webviewer === value) {
      return;
    }
    if (this._webviewer) {
      this.unbind();
    }
    this._webviewer = value;
    this._webViewerReady = false;
    if (!this._webviewer) {
      return;
    }
    this.bind();
    if (this._webviewer.getSceneReady()) {
      this.sceneReady();
    }
  }
  sceneReady() {
    this._webViewerReady = true;
    this.dispatchEvent(
      new CustomEvent("hoops-render-options-service-reset", { bubbles: true, composed: true })
    );
  }
  // --- Minimum Framerate ---
  getMinimumFramerate() {
    if (!this._webViewerReady) {
      return Promise.resolve(0);
    }
    return this._webviewer.getMinimumFramerate();
  }
  async setMinimumFramerate(value) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.setMinimumFramerate(value);
    this.dispatchEvent(
      new CustomEvent("hoops-minimum-framerate-changed", {
        bubbles: true,
        composed: true,
        detail: value
      })
    );
  }
  // --- Hidden Line Opacity ---
  getHiddenLineOpacity() {
    if (!this._webViewerReady) {
      return 0;
    }
    return this._webviewer.view.getHiddenLineSettings().getObscuredLineOpacity();
  }
  setHiddenLineOpacity(opacity) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    const view = this._webviewer.view;
    view.getHiddenLineSettings().setObscuredLineOpacity(opacity);
    if (view.getDrawModeName() === "HiddenLine") {
      view.setDrawMode("HiddenLine");
    }
    this.dispatchEvent(
      new CustomEvent("hoops-hidden-line-opacity-changed", {
        bubbles: true,
        composed: true,
        detail: opacity
      })
    );
  }
  // --- Show Backfaces ---
  getShowBackfaces() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getBackfacesVisible();
  }
  async setShowBackfaces(show) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setBackfacesVisible(show);
    this.dispatchEvent(
      new CustomEvent("hoops-show-backfaces-changed", {
        bubbles: true,
        composed: true,
        detail: show
      })
    );
  }
  // --- Ambient Occlusion Enabled ---
  getAmbientOcclusionEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getAmbientOcclusionEnabled();
  }
  async setAmbientOcclusionEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setAmbientOcclusionEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-ambient-occlusion-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Ambient Occlusion Radius ---
  getAmbientOcclusionRadius() {
    if (!this._webViewerReady) {
      return 0;
    }
    return this._webviewer.view.getAmbientOcclusionRadius();
  }
  async setAmbientOcclusionRadius(radius) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setAmbientOcclusionRadius(radius);
    this.dispatchEvent(
      new CustomEvent("hoops-ambient-occlusion-radius-changed", {
        bubbles: true,
        composed: true,
        detail: radius
      })
    );
  }
  // --- Anti Aliasing Enabled ---
  getAntiAliasingEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getAntiAliasingMode() === AntiAliasingMode.SMAA;
  }
  async setAntiAliasingEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setAntiAliasingMode(
      enabled ? AntiAliasingMode.SMAA : AntiAliasingMode.None
    );
    this.dispatchEvent(
      new CustomEvent("hoops-anti-aliasing-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Bloom Enabled ---
  getBloomEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getBloomEnabled();
  }
  setBloomEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setBloomEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-bloom-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Bloom Intensity ---
  getBloomIntensity() {
    if (!this._webViewerReady) {
      return 0;
    }
    return this._webviewer.view.getBloomIntensityScale();
  }
  setBloomIntensity(intensity) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setBloomIntensityScale(intensity);
    this.dispatchEvent(
      new CustomEvent("hoops-bloom-intensity-changed", {
        bubbles: true,
        composed: true,
        detail: intensity
      })
    );
  }
  // --- Bloom Threshold ---
  getBloomThreshold() {
    if (!this._webViewerReady) {
      return 0;
    }
    return this._webviewer.view.getBloomThreshold();
  }
  setBloomThreshold(threshold) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setBloomThreshold(threshold);
    this.dispatchEvent(
      new CustomEvent("hoops-bloom-threshold-changed", {
        bubbles: true,
        composed: true,
        detail: threshold
      })
    );
  }
  // --- Silhouette Enabled ---
  getSilhouetteEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getSilhouetteEnabled();
  }
  setSilhouetteEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setSilhouetteEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-silhouette-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Reflection Enabled ---
  getReflectionEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getSimpleReflectionEnabled();
  }
  setReflectionEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setSimpleReflectionEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-reflection-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Shadow Enabled ---
  getShadowEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getSimpleShadowEnabled();
  }
  async setShadowEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setSimpleShadowEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-shadow-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Shadow Interactive ---
  getShadowInteractive() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getSimpleShadowInteractiveUpdateEnabled();
  }
  setShadowInteractive(interactive) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setSimpleShadowInteractiveUpdateEnabled(interactive);
    this.dispatchEvent(
      new CustomEvent("hoops-shadow-interactive-changed", {
        bubbles: true,
        composed: true,
        detail: interactive
      })
    );
  }
  // --- Shadow Blur Samples ---
  getShadowBlurSamples() {
    if (!this._webViewerReady) {
      return 0;
    }
    return this._webviewer.view.getSimpleShadowBlurSamples();
  }
  setShadowBlurSamples(samples) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._webviewer.view.setSimpleShadowBlurSamples(samples);
    this.dispatchEvent(
      new CustomEvent("hoops-shadow-blur-samples-changed", {
        bubbles: true,
        composed: true,
        detail: samples
      })
    );
  }
  /*
    Splat rendering is a specific setup for point size.
    When splat rendering is disabled the default values of (1, ScreenPixels) are used for point size.
    When splat rendering is turned on, we will use a default of splatRenderingSize and splatRenderingPointSizeUnit
    (default at .003 and ProportionOfBoundingDiagonal).
  */
  getSplatRenderingEnabled() {
    return this._splatRenderingEnabled;
  }
  async setSplatRenderingEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._splatRenderingEnabled = enabled;
    if (enabled) {
      await this._webviewer.view.setPointSize(
        this._splatRenderingSize,
        toWebViewerPointSizeUnit(this._splatRenderingPointSizeUnit)
      );
    } else {
      await this._webviewer.view.setPointSize(1, PointSizeUnit.ScreenPixels);
    }
    this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  getSplatRenderingSize() {
    return this._splatRenderingSize;
  }
  async setSplatRenderingSize(size) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._splatRenderingSize = size;
    if (this._splatRenderingEnabled) {
      await this._webviewer.view.setPointSize(
        this._splatRenderingSize,
        toWebViewerPointSizeUnit(this._splatRenderingPointSizeUnit)
      );
    }
    this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-size-changed", {
        bubbles: true,
        composed: true,
        detail: size
      })
    );
  }
  getSplatRenderingPointSizeUnit() {
    return this._splatRenderingPointSizeUnit;
  }
  async setSplatRenderingPointSizeUnit(unit) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    this._splatRenderingPointSizeUnit = unit;
    if (this._splatRenderingEnabled) {
      await this._webviewer.view.setPointSize(
        this._splatRenderingSize,
        toWebViewerPointSizeUnit(this._splatRenderingPointSizeUnit)
      );
    }
    this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-point-size-unit-changed", {
        bubbles: true,
        composed: true,
        detail: unit
      })
    );
  }
  updateSplatRenderingEnabled() {
    if (!this._webViewerReady) {
      return;
    }
    this._splatRenderingEnabled = this.getSplatRenderingSize() !== 1 || this.getSplatRenderingPointSizeUnit() !== "Screen Pixels";
  }
  // --- Eye Dome Lighting Enabled ---
  async getEyeDomeLightingEnabled() {
    if (!this._webViewerReady) {
      return false;
    }
    return this._webviewer.view.getEyeDomeLightingEnabled();
  }
  async setEyeDomeLightingEnabled(enabled) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setEyeDomeLightingEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-eye-dome-lighting-enabled-changed", {
        bubbles: true,
        composed: true,
        detail: enabled
      })
    );
  }
  // --- Background Color ---
  getBackgroundColor() {
    var _a2, _b;
    if (!this._webViewerReady) {
      return {};
    }
    const background = this._webviewer.view.getBackgroundColor();
    return {
      top: (_a2 = background.top) == null ? void 0 : _a2.toHexString(),
      bottom: (_b = background.bottom) == null ? void 0 : _b.toHexString()
    };
  }
  async setBackgroundColor(color) {
    if (!this._webViewerReady) {
      throw new Error("WebViewer not ready");
    }
    await this._webviewer.view.setBackgroundColor(
      color.top ? Color.fromHexString(color.top) : null,
      color.bottom ? Color.fromHexString(color.bottom) : null
    );
    this.dispatchEvent(
      new CustomEvent("hoops-background-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  async resetConfiguration(obj) {
    const config = obj ?? { ..._RenderOptionsService.DefaultConfig };
    if (!isRenderOptionsServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    await this.setMinimumFramerate(config.minimumFramerate);
    this.setHiddenLineOpacity(config.hiddenLineOpacity);
    await this.setShowBackfaces(config.showBackfaces);
    await this.setAmbientOcclusionEnabled(config.ambientOcclusionEnabled);
    await this.setAmbientOcclusionRadius(config.ambientOcclusionRadius);
    await this.setAntiAliasingEnabled(config.antiAliasingEnabled);
    this.setBloomEnabled(config.bloomEnabled);
    this.setBloomIntensity(config.bloomIntensity);
    this.setBloomThreshold(config.bloomThreshold);
    this.setSilhouetteEnabled(config.silhouetteEnabled);
    this.setReflectionEnabled(config.reflectionEnabled);
    await this.setShadowEnabled(config.shadowEnabled);
    this.setShadowInteractive(config.shadowInteractive);
    this.setShadowBlurSamples(config.shadowBlurSamples);
    await this.setSplatRenderingSize(config.splatRenderingSize);
    await this.setSplatRenderingPointSizeUnit(config.splatRenderingPointSizeUnit);
    await this.setSplatRenderingEnabled(config.splatRenderingEnabled);
    await this.setEyeDomeLightingEnabled(config.eyeDomeLightingEnabled);
    await this.setBackgroundColor(config.backgroundColor);
  }
};
_RenderOptionsService.DefaultConfig = {
  minimumFramerate: 13,
  hiddenLineOpacity: 0.2,
  showBackfaces: false,
  ambientOcclusionEnabled: false,
  ambientOcclusionRadius: 0.03,
  antiAliasingEnabled: true,
  bloomEnabled: false,
  bloomIntensity: 1,
  bloomThreshold: 0.65,
  silhouetteEnabled: false,
  reflectionEnabled: false,
  shadowEnabled: false,
  shadowInteractive: true,
  shadowBlurSamples: 5,
  splatRenderingEnabled: true,
  splatRenderingSize: 3e-3,
  splatRenderingPointSizeUnit: "Screen Pixels",
  eyeDomeLightingEnabled: false,
  backgroundColor: {}
};
let RenderOptionsService = _RenderOptionsService;
class IFCRelationshipsService extends EventTarget {
  constructor(selectionManager) {
    super();
    this.serviceName = "IFCRelationshipsService";
    this._selectionRelationships = [];
    this.getNodeRelationships = (selectionItem) => {
      var _a2;
      const nodeId = selectionItem.getNodeId();
      const bimId = (_a2 = this._selectionManager) == null ? void 0 : _a2.viewer.model.getBimIdFromNode(nodeId);
      if (!bimId) {
        return [];
      }
      return this.getBimElementRelationships(nodeId, bimId);
    };
    this._selectionManager = selectionManager;
    this.callbackMap = {
      selectionArray: this.handleSelectionArray.bind(this)
    };
    if (this._selectionManager) {
      this.bind();
    }
  }
  get viewer() {
    var _a2;
    return (_a2 = this._selectionManager) == null ? void 0 : _a2.viewer;
  }
  set selectionManager(selectionManager) {
    this._selectionManager = selectionManager;
    if (this._selectionManager) {
      this.bind();
    }
  }
  get selectionRelationships() {
    return this._selectionRelationships;
  }
  set selectionRelationships(relationships) {
    this._selectionRelationships = relationships;
    this.dispatchEvent(
      new CustomEvent("hoops-selection-ifc-relationships-changed", {
        detail: this.selectionRelationships
      })
    );
  }
  /**
   * Handles selection changes and emits relationship data
   * @fires hoops-selection-ifc-relationships-changed
   */
  handleSelectionArray(selections) {
    this.selectionRelationships = selections.map((selectionEvent) => selectionEvent.getSelection()).map(this.getNodeRelationships).flat();
  }
  /**
   * Get all relationships for a BIM element
   * @returns Array of relationship data with agglomerated elements containing both relateds and relatings
   */
  getBimElementRelationships(nodeId, bimId) {
    if (!this.viewer) {
      console.warn("WebViewer not available in IFCRelationshipsService");
      return [];
    }
    const relationshipTypes = this.viewer.model.getRelationshipTypesFromBimId(nodeId, bimId);
    const relationships = [];
    for (const relType of relationshipTypes) {
      const connectedElements = this.viewer.model.getBimIdConnectedElements(nodeId, bimId, relType);
      const relateds = this._processBimIds(nodeId, connectedElements.relateds);
      const relatings = this._processBimIds(nodeId, connectedElements.relatings);
      relationships.push({
        type: relType,
        typeName: this._getRelationshipTypeName(relType),
        elements: [
          ...relateds.map((element) => ({ ...element, role: "related" })),
          ...relatings.map((element) => ({ ...element, role: "relating" }))
        ]
      });
    }
    return relationships;
  }
  /**
   * Converts BIM IDs to element info with names and connection status
   */
  _processBimIds(contextNodeId, bimIds) {
    if (!this.viewer) return [];
    return bimIds.map((bimId) => {
      if (!this.viewer) {
        return {
          bimId,
          name: bimId,
          connected: false,
          nodeId: void 0
        };
      }
      const bimInfo = this.viewer.model.getBimInfoFromBimId(contextNodeId, bimId);
      const nodeId = this.viewer.model.getNodeIdFromBimId(contextNodeId, bimId);
      return {
        bimId,
        name: bimInfo.name,
        connected: bimInfo.connected,
        nodeId: nodeId || void 0
      };
    });
  }
  /**
   * Converts relationship type enum to human-readable string
   */
  _getRelationshipTypeName(type) {
    const typeNames = {
      [RelationshipType.ContainedInSpatialStructure]: "Contained In Spatial Structure",
      [RelationshipType.Aggregates]: "Aggregates",
      [RelationshipType.VoidsElement]: "Voids Element",
      [RelationshipType.FillsElement]: "Fills Element",
      [RelationshipType.SpaceBoundary]: "Space Boundary",
      [RelationshipType.ConnectsPathElements]: "Connects Path Elements",
      [RelationshipType.Undefined]: "Undefined"
    };
    return typeNames[type] || "Unknown";
  }
  /**
   * Binds service to selection manager for auto-emit functionality
   */
  bind() {
    if (!this._selectionManager) {
      console.warn("SelectionManager not available in IFCRelationshipsService");
      return;
    }
    this._selectionManager.viewer.setCallbacks(this.callbackMap);
    this.selectionRelationships = this._selectionManager.getResults().map(this.getNodeRelationships).flat();
  }
  selectNode(nodeId) {
    if (!this._selectionManager) {
      throw new Error("SelectionManager not available in IFCRelationshipsService");
    }
    this._selectionManager.selectNode(nodeId);
  }
}
function isPmiServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return typeof value.color === "string" && typeof value.isColorOverride === "boolean";
}
const _PmiService = class _PmiService extends EventTarget {
  constructor() {
    super();
    this.serviceName = "PmiService";
    this._viewer = void 0;
    this.callbackMap = {};
    this.callbackMap = {
      firstModelLoaded: () => {
        this.reset();
      },
      subtreeLoaded: () => {
        this.reset();
      },
      modelSwitched: () => {
        this.reset();
      }
    };
  }
  unbind() {
    if (!this._viewer) {
      return;
    }
    this._viewer.unsetCallbacks(this.callbackMap);
  }
  bind() {
    if (!this._viewer) {
      return;
    }
    this._viewer.setCallbacks(this.callbackMap);
  }
  async resetConfiguration(obj) {
    const config = obj ?? _PmiService.DefaultConfig;
    if (!isPmiServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    this.setPmiColor(config.color);
    await this.setPmiColorOverride(config.isColorOverride);
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-pmi-service-reset", { bubbles: true, composed: true })
    );
  }
  get viewer() {
    return this._viewer;
  }
  set viewer(viewer) {
    if (this._viewer === viewer) {
      return;
    }
    this.unbind();
    this._viewer = viewer;
    this.bind();
    this.reset();
  }
  getPmiColor() {
    if (!this.viewer) {
      return _PmiService.DefaultConfig.color;
    }
    return this.viewer.model.getPmiColor().toHexString();
  }
  setPmiColor(color) {
    if (!this.viewer) {
      throw new Error("Viewer is not set");
    }
    if (color === this.getPmiColor()) {
      return;
    }
    this.viewer.model.setPmiColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-pmi-color-changed", { detail: color, bubbles: true, composed: true })
    );
  }
  getPmiColorOverride() {
    if (!this.viewer) {
      return _PmiService.DefaultConfig.isColorOverride;
    }
    return this.viewer.model.getPmiColorOverride();
  }
  async setPmiColorOverride(enableOverride, rootId) {
    if (!this.viewer) {
      throw new Error("Viewer is not set");
    }
    await this.viewer.model.setPmiColorOverride(enableOverride, rootId);
    this.dispatchEvent(
      new CustomEvent("hoops-pmi-color-override-changed", {
        detail: { enableOverride, rootId },
        bubbles: true,
        composed: true
      })
    );
  }
};
_PmiService.DefaultConfig = {
  color: "#000000",
  isColorOverride: true
};
let PmiService = _PmiService;
function isSelectionServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return typeof value.faceLineSelectionEnabled === "boolean" && typeof value.honorsSceneVisibility === "boolean" && typeof value.bodyColor === "string" && typeof value.faceAndLineColor === "string";
}
const _SelectionService = class _SelectionService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "SelectionService";
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(value) {
    if (this._webviewer === value) {
      return;
    }
    this._webviewer = value;
    this.dispatchEvent(
      new CustomEvent("hoops-selection-service-reset", { bubbles: true, composed: true })
    );
  }
  getEnableFaceLineSelection() {
    if (!this._webviewer) {
      return _SelectionService.DefaultConfiguration.faceLineSelectionEnabled;
    }
    return this._webviewer.selectionManager.getHighlightFaceElementSelection() && this._webviewer.selectionManager.getHighlightLineElementSelection();
  }
  async setEnableFaceLineSelection(enableFaceLineSelection) {
    if (!this._webviewer) {
      return Promise.reject(new Error("Webviewer not set"));
    }
    await this._webviewer.selectionManager.setHighlightFaceElementSelection(
      enableFaceLineSelection
    );
    await this._webviewer.selectionManager.setHighlightLineElementSelection(
      enableFaceLineSelection
    );
    this.dispatchEvent(
      new CustomEvent("hoops-enable-face-line-selection-changed", {
        bubbles: true,
        composed: true,
        detail: enableFaceLineSelection
      })
    );
  }
  getHonorsSceneVisibility() {
    if (!this._webviewer) {
      return _SelectionService.DefaultConfiguration.honorsSceneVisibility;
    }
    const selectionOperator = this._webviewer.operatorManager.getOperator(OperatorId.Select);
    const selectionOperatorPickConfig = selectionOperator.getPickConfig();
    const forceEffectiveSceneVisibilityMask = selectionOperatorPickConfig.forceEffectiveSceneVisibilityMask;
    return forceEffectiveSceneVisibilityMask == SelectionMask.None;
  }
  setHonorsSceneVisibility(honorsSceneVisibility) {
    if (!this._webviewer) {
      throw new Error("Webviewer not set");
    }
    const forceEffectiveSceneVisibilityMask = honorsSceneVisibility ? SelectionMask.None : SelectionMask.All;
    const selectionOperator = this._webviewer.operatorManager.getOperator(OperatorId.Select);
    const selectionOperatorPickConfig = selectionOperator.getPickConfig();
    selectionOperatorPickConfig.forceEffectiveSceneVisibilityMask = forceEffectiveSceneVisibilityMask;
    selectionOperator.setPickConfig(selectionOperatorPickConfig);
    const areaSelectionOperator = this._webviewer.operatorManager.getOperator(
      OperatorId.AreaSelect
    );
    areaSelectionOperator.setForceEffectiveSceneVisibilityMask(forceEffectiveSceneVisibilityMask);
    const rayDrillSelectionOperator = this._webviewer.operatorManager.getOperator(
      OperatorId.RayDrillSelect
    );
    rayDrillSelectionOperator.setForceEffectiveSceneVisibilityMask(
      forceEffectiveSceneVisibilityMask
    );
    this.dispatchEvent(
      new CustomEvent("hoops-honors-scene-visibility-changed", {
        bubbles: true,
        composed: true,
        detail: honorsSceneVisibility
      })
    );
  }
  getBodyColor() {
    if (!this._webviewer) {
      return _SelectionService.DefaultConfiguration.bodyColor;
    }
    return this._webviewer.selectionManager.getNodeSelectionColor().toHexString();
  }
  async setBodyColor(color) {
    if (!this._webviewer) {
      throw new Error("Webviewer not set");
    }
    await this._webviewer.selectionManager.setNodeSelectionColor(Color.fromHexString(color));
    await this._webviewer.selectionManager.setNodeSelectionOutlineColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-body-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  getFaceAndLineColor() {
    if (!this._webviewer) {
      return _SelectionService.DefaultConfiguration.faceAndLineColor;
    }
    return this._webviewer.selectionManager.getNodeElementSelectionColor().toHexString();
  }
  async setFaceAndLineColor(color) {
    if (!this._webviewer) {
      throw new Error("Webviewer not set");
    }
    await this._webviewer.selectionManager.setNodeElementSelectionColor(Color.fromHexString(color));
    await this._webviewer.selectionManager.setNodeElementSelectionOutlineColor(
      Color.fromHexString(color)
    );
    this.dispatchEvent(
      new CustomEvent("hoops-face-and-line-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  async resetConfiguration(obj) {
    const config = obj ?? _SelectionService.DefaultConfiguration;
    if (!isSelectionServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    if (!this._webviewer) {
      throw new Error("Webviewer not set");
    }
    this.setEnableFaceLineSelection(config.faceLineSelectionEnabled);
    this.setHonorsSceneVisibility(config.honorsSceneVisibility);
    this.setBodyColor(config.bodyColor);
    this.setFaceAndLineColor(config.faceAndLineColor);
  }
};
_SelectionService.DefaultConfiguration = {
  faceLineSelectionEnabled: true,
  honorsSceneVisibility: true,
  bodyColor: "#ffff00",
  faceAndLineColor: "#ff0000"
};
let SelectionService = _SelectionService;
function isSheetServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const sheetData = obj;
  return typeof sheetData.backgroundColor === "string" && typeof sheetData.sheetColor === "string" && typeof sheetData.sheetShadowColor === "string" && typeof sheetData.backgroundSheetEnabled === "boolean";
}
const _SheetService = class _SheetService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "SheetService";
    this._sheetManager = void 0;
  }
  get sheetManager() {
    return this._sheetManager;
  }
  set sheetManager(sheetManager) {
    if (this._sheetManager === sheetManager) {
      return;
    }
    this._sheetManager = sheetManager;
    this.dispatchEvent(
      new CustomEvent("hoops-sheet-service-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  getSheetBackgroundColor() {
    if (!this.sheetManager) {
      return _SheetService.DefaultConfiguration.backgroundColor;
    }
    return this.sheetManager.getSheetBackgroundColor().toHexString();
  }
  getSheetColor() {
    if (!this.sheetManager) {
      return _SheetService.DefaultConfiguration.sheetColor;
    }
    return this.sheetManager.getSheetColor().toHexString();
  }
  getSheetShadowColor() {
    if (!this.sheetManager) {
      return _SheetService.DefaultConfiguration.sheetShadowColor;
    }
    return this.sheetManager.getSheetShadowColor().toHexString();
  }
  async setSheetColors(backgroundColor, sheetColor, sheetShadowColor) {
    if (!this.sheetManager) {
      throw new Error("SheetManager is not set");
    }
    await this.sheetManager.setSheetColors(
      Color.fromHexString(backgroundColor),
      Color.fromHexString(sheetColor),
      Color.fromHexString(sheetShadowColor)
    );
    this.dispatchEvent(
      new CustomEvent("hoops-sheet-colors-changed", {
        detail: {
          backgroundColor,
          sheetColor,
          sheetShadowColor
        },
        bubbles: true,
        composed: true
      })
    );
  }
  getBackgroundSheetEnabled() {
    if (!this.sheetManager) {
      return false;
    }
    return this.sheetManager.getBackgroundSheetEnabled();
  }
  async setBackgroundSheetEnabled(enabled) {
    if (!this.sheetManager) {
      throw new Error("SheetManager is not set");
    }
    await this.sheetManager.setBackgroundSheetEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-background-sheet-enabled-changed", {
        detail: enabled,
        bubbles: true,
        composed: true
      })
    );
  }
  async resetConfiguration(obj) {
    const config = obj ?? _SheetService.DefaultConfiguration;
    if (!this.sheetManager) {
      throw new Error("SheetManager is not set");
    }
    if (!isSheetServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    await this.setSheetColors(config.backgroundColor, config.sheetColor, config.sheetShadowColor);
    await this.setBackgroundSheetEnabled(config.backgroundSheetEnabled);
  }
};
_SheetService.DefaultConfiguration = {
  backgroundColor: "#b4b4b4",
  sheetColor: "#ffffff",
  sheetShadowColor: "#4b4b4b",
  backgroundSheetEnabled: false
};
let SheetService = _SheetService;
class SpaceMouseService extends EventTarget {
  constructor() {
    super(...arguments);
    this.serviceName = "SpaceMouseService";
  }
  get spaceMouseOperator() {
    return this._spaceMouseOperator;
  }
  set spaceMouseOperator(spaceMouseOperator) {
    if (this._spaceMouseOperator === spaceMouseOperator) {
      return;
    }
    this._spaceMouseOperator = spaceMouseOperator;
  }
  connect() {
    if (!this._spaceMouseOperator) {
      throw new Error("SpaceMouseOperator is not initialized");
    }
    this._spaceMouseOperator.connect();
    this.dispatchEvent(
      new CustomEvent("hoops-spacemouse-connected", {
        bubbles: true,
        composed: true
      })
    );
  }
}
const WalkModeNames = ["Mouse", "Keyboard"];
function isWalkModeName(value) {
  return typeof value === "string" && WalkModeNames.includes(value);
}
function isWalkOperatorServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const data = obj;
  return isWalkModeName(data.walkMode) && (typeof data.rotationSpeed === "number" || data.rotationSpeed === void 0) && (typeof data.walkSpeed === "number" || data.walkSpeed === void 0) && (typeof data.elevationSpeed === "number" || data.elevationSpeed === void 0) && (typeof data.fieldOfView === "number" || data.fieldOfView === void 0) && typeof data.mouseLookEnabled === "boolean" && (typeof data.mouseLookSpeed === "number" || data.mouseLookSpeed === void 0) && typeof data.collisionDetectionEnabled === "boolean";
}
function walkModeToString(mode) {
  switch (mode) {
    case WalkMode.Mouse:
      return "Mouse";
    case WalkMode.Keyboard:
      return "Keyboard";
    default:
      return "Mouse";
  }
}
function stringToWalkMode(mode) {
  switch (mode) {
    case "Mouse":
      return WalkMode.Mouse;
    case "Keyboard":
      return WalkMode.Keyboard;
    default:
      return WalkMode.Mouse;
  }
}
function getWalkSpeedUnitName(factor) {
  switch (true) {
    case factor < 1:
      return "µm";
    case factor < 10:
      return "mm";
    case factor < 1e3:
      return "cm";
    default:
      return "m";
  }
}
function calculateWalkSpeedUnitFactor(speed) {
  if (speed < 0) {
    return -1;
  }
  return Math.pow(10, Math.floor(Math.log10(speed)));
}
const _WalkOperatorService = class _WalkOperatorService extends EventTarget {
  constructor(options) {
    var _a2, _b;
    super();
    this.serviceName = "WalkOperatorService";
    this._walkModeOperator = options == null ? void 0 : options.walkModeOperator;
    this._mouseWalkOperator = (options == null ? void 0 : options.mouseWalkOperator) ?? ((_a2 = options == null ? void 0 : options.walkModeOperator) == null ? void 0 : _a2.walkOperator);
    this._keyboardWalkOperator = (options == null ? void 0 : options.keyboardWalkOperator) ?? ((_b = options == null ? void 0 : options.walkModeOperator) == null ? void 0 : _b.keyboardWalkOperator);
    this.callbackMap = {
      firstModelLoaded: async () => {
        if (this._keyboardWalkOperator && this._keyboardWalkOperator.getWalkSpeed() <= 0) {
          await this._keyboardWalkOperator.resetDefaultWalkSpeeds();
          this.dispatchEvent(
            new CustomEvent("hoops-keyboard-walk-operator-reset", {
              bubbles: true,
              composed: true
            })
          );
        }
        if (this._mouseWalkOperator && this._mouseWalkOperator.getWalkSpeed() <= 0) {
          await this._mouseWalkOperator.resetDefaultWalkSpeeds();
          this.dispatchEvent(
            new CustomEvent("hoops-mouse-walk-operator-reset", {
              bubbles: true,
              composed: true
            })
          );
        }
      }
    };
    if (this._walkModeOperator) {
      this.bind();
    }
  }
  get walkModeOperator() {
    return this._walkModeOperator;
  }
  set walkModeOperator(value) {
    if (this._walkModeOperator === value) {
      return;
    }
    if (this._walkModeOperator) {
      this.unbind();
    }
    this._walkModeOperator = value;
    this.mouseWalkOperator = value == null ? void 0 : value.walkOperator;
    this.keyboardWalkOperator = value == null ? void 0 : value.keyboardWalkOperator;
    this.bind();
    this.dispatchEvent(
      new CustomEvent("hoops-walk-mode-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  get mouseWalkOperator() {
    return this._mouseWalkOperator;
  }
  set mouseWalkOperator(value) {
    if (this._mouseWalkOperator === value) {
      return;
    }
    this._mouseWalkOperator = value;
    this.dispatchEvent(
      new CustomEvent("hoops-mouse-walk-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  get keyboardWalkOperator() {
    return this._keyboardWalkOperator;
  }
  set keyboardWalkOperator(value) {
    if (this._keyboardWalkOperator === value) {
      return;
    }
    this._keyboardWalkOperator = value;
    this.dispatchEvent(
      new CustomEvent("hoops-keyboard-walk-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  getWalkMode() {
    var _a2;
    return walkModeToString(((_a2 = this._walkModeOperator) == null ? void 0 : _a2.getWalkMode()) ?? WalkMode.Mouse);
  }
  async setWalkMode(mode) {
    if (!this._walkModeOperator) {
      throw new Error("WalkModeOperator is not initialized");
    }
    await this._walkModeOperator.setWalkMode(stringToWalkMode(mode));
    this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-mode-changed", {
        detail: { mode },
        bubbles: true,
        composed: true
      })
    );
  }
  getRotationSpeed() {
    if (!this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator) {
      return 0;
    }
    const op = this._walkModeOperator.getWalkMode() === WalkMode.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator;
    return op.getRotationSpeed();
  }
  setRotationSpeed(value) {
    if (!this._walkModeOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.setRotationSpeed(value);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-rotation-speed-changed", {
        detail: { speed: value },
        bubbles: true,
        composed: true
      })
    );
  }
  getWalkSpeed() {
    if (!this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator) {
      return 0;
    }
    const op = this._walkModeOperator.getWalkMode() === WalkMode.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator;
    return op.getWalkSpeed();
  }
  setWalkSpeed(value) {
    if (!this._walkModeOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.setWalkSpeed(value);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-walk-speed-changed", {
        detail: { speed: value },
        bubbles: true,
        composed: true
      })
    );
  }
  getElevationSpeed() {
    if (!this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator) {
      return 0;
    }
    const op = this._walkModeOperator.getWalkMode() === WalkMode.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator;
    return op.getElevationSpeed();
  }
  setElevationSpeed(value) {
    if (!this._walkModeOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.setElevationSpeed(value);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-elevation-speed-changed", {
        detail: { speed: value },
        bubbles: true,
        composed: true
      })
    );
  }
  getFieldOfView() {
    if (!this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator) {
      return 0;
    }
    const op = this._walkModeOperator.getWalkMode() === WalkMode.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator;
    return op.getViewAngle();
  }
  setFieldOfView(value) {
    if (!this._walkModeOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.setViewAngle(value);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-field-of-view-changed", {
        detail: { fov: value },
        bubbles: true,
        composed: true
      })
    );
  }
  isMouseLookEnabled() {
    var _a2;
    return ((_a2 = this._keyboardWalkOperator) == null ? void 0 : _a2.getMouseLookEnabled()) ?? false;
  }
  setMouseLookEnabled(enabled) {
    if (!this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._keyboardWalkOperator.setMouseLookEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-mouse-look-enabled-changed", {
        detail: { enabled },
        bubbles: true,
        composed: true
      })
    );
  }
  getMouseLookSpeed() {
    var _a2;
    return ((_a2 = this._keyboardWalkOperator) == null ? void 0 : _a2.getMouseLookSpeed()) ?? 0;
  }
  setMouseLookSpeed(speed) {
    if (!this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._keyboardWalkOperator.setMouseLookSpeed(speed);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-mouse-look-speed-changed", {
        detail: { speed },
        bubbles: true,
        composed: true
      })
    );
  }
  isCollisionDetectionEnabled() {
    if (!this._walkModeOperator || !this._keyboardWalkOperator || !this._mouseWalkOperator) {
      return false;
    }
    const op = this._walkModeOperator.getWalkMode() === WalkMode.Mouse ? this._mouseWalkOperator : this._keyboardWalkOperator;
    return op.getBimModeEnabled();
  }
  async setCollisionDetectionEnabled(enabled) {
    if (!this._walkModeOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    await this._walkModeOperator.setBimModeEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-operators-collision-detection-changed", {
        detail: { enabled },
        bubbles: true,
        composed: true
      })
    );
  }
  reset() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._mouseWalkOperator.resetDefaultWalkSpeeds();
    this._keyboardWalkOperator.resetDefaultWalkSpeeds();
    this.dispatchEvent(
      new CustomEvent("hoops-walk-mode-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent("hoops-mouse-walk-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent("hoops-keyboard-walk-operator-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  async resetConfiguration(obj) {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    const config = obj ?? _WalkOperatorService.DefaultConfiguration;
    if (!isWalkOperatorServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    await this._mouseWalkOperator.resetDefaultWalkSpeeds();
    await this._keyboardWalkOperator.resetDefaultWalkSpeeds();
    await this.setWalkMode(config.walkMode);
    if (config.rotationSpeed !== void 0) {
      this.setRotationSpeed(config.rotationSpeed);
    }
    if (config.walkSpeed !== void 0) {
      this.setWalkSpeed(config.walkSpeed);
    }
    if (config.elevationSpeed !== void 0) {
      this.setElevationSpeed(config.elevationSpeed);
    }
    if (config.fieldOfView !== void 0) {
      this.setFieldOfView(config.fieldOfView);
    }
    this.setMouseLookEnabled(config.mouseLookEnabled);
    if (config.mouseLookSpeed !== void 0) {
      this.setMouseLookSpeed(config.mouseLookSpeed);
    }
    this.setCollisionDetectionEnabled(config.collisionDetectionEnabled);
  }
  bind() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._walkModeOperator || !this._mouseWalkOperator || !this._keyboardWalkOperator) {
      throw new Error("Walk Operators are not initialized");
    }
    this._walkModeOperator.viewer.unsetCallbacks(this.callbackMap);
  }
};
_WalkOperatorService.DefaultConfiguration = {
  walkMode: "Mouse",
  mouseLookEnabled: true,
  collisionDetectionEnabled: false
};
let WalkOperatorService = _WalkOperatorService;
function isViewServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const viewData = obj;
  return typeof viewData.axisTriadVisible === "boolean" && typeof viewData.navCubeVisible === "boolean";
}
const _ViewService = class _ViewService extends EventTarget {
  constructor(view) {
    super();
    this.serviceName = "ViewService";
    this._view = view;
  }
  get view() {
    return this._view;
  }
  set view(view) {
    if (this._view === view) {
      return;
    }
    this._view = view;
    this.dispatchEvent(
      new CustomEvent("hoops-view-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  isAxisTriadVisible() {
    var _a2;
    return ((_a2 = this._view) == null ? void 0 : _a2.axisTriad.getEnabled()) ?? _ViewService.DefaultConfiguration.axisTriadVisible;
  }
  setAxisTriadVisible(visible) {
    if (!this._view) {
      throw new Error("ViewService: View is not initialized.");
    }
    if (this._view.axisTriad.getEnabled() !== visible) {
      if (visible) {
        this._view.axisTriad.enable();
      } else {
        this._view.axisTriad.disable();
      }
      this.dispatchEvent(
        new CustomEvent("hoops-view-axis-triad-visibility-changed", {
          detail: { visible },
          bubbles: true,
          composed: true
        })
      );
    }
  }
  isNavCubeVisible() {
    var _a2;
    return ((_a2 = this._view) == null ? void 0 : _a2.navCube.getEnabled()) ?? _ViewService.DefaultConfiguration.navCubeVisible;
  }
  setNavCubeVisible(visible) {
    if (!this._view) {
      throw new Error("ViewService: View is not initialized.");
    }
    if (this._view.navCube.getEnabled() !== visible) {
      if (visible) {
        this._view.navCube.enable();
      } else {
        this._view.navCube.disable();
      }
      this.dispatchEvent(
        new CustomEvent("hoops-view-nav-cube-visibility-changed", {
          detail: { visible },
          bubbles: true,
          composed: true
        })
      );
    }
  }
  reset() {
    this.dispatchEvent(new CustomEvent("hoops-view-service-reset"));
  }
  async resetConfiguration(obj) {
    const config = obj ?? _ViewService.DefaultConfiguration;
    if (!isViewServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    this.setAxisTriadVisible(config.axisTriadVisible);
    this.setNavCubeVisible(config.navCubeVisible);
  }
};
_ViewService.DefaultConfiguration = {
  axisTriadVisible: true,
  navCubeVisible: true
};
let ViewService = _ViewService;
class MaterialService extends EventTarget {
  constructor(viewer) {
    super();
    this.serviceName = "MaterialService";
    this.selectedNodeIds = [];
    this._viewer = viewer;
    this.callbackMap = {
      selectionArray: () => {
        var _a2;
        this.selectedNodeIds = ((_a2 = this._viewer) == null ? void 0 : _a2.selectionManager.getResults().map((s5) => s5.getNodeId())) || [];
        this.dispatchEvent(
          new CustomEvent("hoops-material-selection-change", {
            bubbles: true,
            composed: true
          })
        );
      }
    };
    if (this._viewer) {
      this.bind();
    }
  }
  bind() {
    if (!this._viewer) {
      throw new Error("Viewer not set");
    }
    this._viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._viewer) {
      throw new Error("Viewer not set");
    }
    this._viewer.unsetCallbacks(this.callbackMap);
  }
  get viewer() {
    return this._viewer;
  }
  set viewer(viewer) {
    if (this._viewer === viewer) {
      return;
    }
    if (this._viewer) {
      this.unbind();
    }
    this._viewer = viewer;
    if (this._viewer) {
      this.bind();
    }
    this.dispatchEvent(
      new CustomEvent("hoops-model-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  getSelectedNodeIds() {
    return this.selectedNodeIds;
  }
  async getMeshDescription(nodeId) {
    if (!this._viewer) {
      return void 0;
    }
    const data = await this._viewer.model.getNodeMeshData(nodeId);
    return data;
  }
  async getMaterialDescription(nodeId) {
    if (!this._viewer) {
      return void 0;
    }
    const materials = await this._viewer.model.getNodesMaterial([nodeId]);
    return (materials == null ? void 0 : materials.length) ? materials[0] : void 0;
  }
  async setNodesShader(nodeIds, vertexShader, fragmentShader, options) {
    if (!this._viewer) {
      throw new Error("Viewer not set");
    }
    return this._viewer.model.setNodesShader(nodeIds, vertexShader, fragmentShader, options);
  }
}
class LogService extends EventTarget {
  /**
   * Constructs a new LogService instance.
   *
   * @param webViewer - Optional web viewer instance to bind to immediately
   *
   * @example
   * ```typescript
   * // Create with immediate binding
   * const logService = new LogService(viewer);
   *
   * // Create without binding (can be set later)
   * const logService = new LogService();
   * logService.webViewer = viewer;
   * ```
   */
  constructor(webViewer) {
    super();
    this.serviceName = "LogService";
    this._webViewer = webViewer;
    this._callbackMap = LogService.getDefaultCallbackMap(this);
    if (this._webViewer) {
      this.bind();
    }
  }
  /**
   * Gets the current web viewer instance.
   *
   * @returns The web viewer instance, or undefined if not set
   */
  get webViewer() {
    return this._webViewer;
  }
  /**
   * Sets the web viewer instance.
   *
   * Unbinds from the previous viewer (if any), updates the reference, and binds
   * to the new viewer. Dispatches a `hoops-log-service-reset` event on change.
   *
   * @param webViewer - The new web viewer instance, or undefined to unbind
   *
   * @fires hoops-log-service-reset - When the web viewer reference changes
   */
  set webViewer(webViewer) {
    if (this._webViewer === webViewer) {
      return;
    }
    if (this._webViewer) {
      this.unbind();
    }
    this._webViewer = webViewer;
    this.dispatchEvent(
      new CustomEvent("hoops-log-service-reset", { bubbles: true, composed: true })
    );
    if (!this._webViewer) {
      return;
    }
    this.bind();
  }
  /**
   * Gets the current callback map registered on the web viewer.
   *
   * @returns A read-only reference to the active callback map
   */
  get callbackMap() {
    return this._callbackMap;
  }
  /**
   * Replaces the callback map used to intercept web viewer events.
   *
   * Unbinds the previous map and binds the new one if a web viewer is set.
   *
   * @param callbackMap - The new callback map to register
   */
  set callbackMap(callbackMap) {
    if (this._callbackMap === callbackMap) {
      return;
    }
    if (this._webViewer) {
      this.unbind();
    }
    this._callbackMap = callbackMap;
    if (this._webViewer) {
      this.bind();
    }
  }
  /**
   * Registers the callback map on the web viewer.
   *
   * @internal
   * @throws Error if web viewer is not set
   */
  bind() {
    if (!this._webViewer) {
      throw new Error("Web viewer not set");
    }
    this._webViewer.setCallbacks(this._callbackMap);
  }
  /**
   * Unregisters the callback map from the web viewer.
   *
   * @internal
   * @throws Error if web viewer is not set
   */
  unbind() {
    if (!this._webViewer) {
      throw new Error("Web viewer not set");
    }
    this._webViewer.unsetCallbacks(this._callbackMap);
  }
  /**
   * Emits a log entry event with an automatically generated timestamp.
   *
   * @param entry - Log entry without the timestamp field
   *
   * @fires hoops-log-service-entry - Dispatched with the complete {@link LogEntry} as detail
   */
  log(entry) {
    const logEntry = {
      ...entry,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.dispatchEvent(
      new CustomEvent("hoops-log-service-entry", {
        detail: logEntry,
        bubbles: true,
        composed: true
      })
    );
  }
  /**
   * Emits a debug-level log entry.
   *
   * @param message - Human-readable debug message
   * @param context - Optional structured context for additional metadata
   */
  debug(message, context) {
    this.log({
      level: "debug",
      message,
      context
    });
  }
  /**
   * Emits an info-level log entry.
   *
   * @param message - Human-readable informational message
   * @param context - Optional structured context for additional metadata
   */
  info(message, context) {
    this.log({
      level: "info",
      message,
      context
    });
  }
  /**
   * Emits a warn-level log entry.
   *
   * @param message - Human-readable warning message
   * @param context - Optional structured context for additional metadata
   */
  warn(message, context) {
    this.log({
      level: "warn",
      message,
      context
    });
  }
  /**
   * Emits an error-level log entry.
   *
   * @param message - Human-readable error message
   * @param context - Optional structured context for additional metadata
   */
  error(message, context) {
    this.log({
      level: "error",
      message,
      context
    });
  }
  /**
   * Creates the default callback map that translates web viewer events into log entries.
   *
   * Handles: `info`, `missingModel`, `modelLoadFailure`, `timeout`,
   * `timeoutWarning`, `webGlContextLost`, `websocketConnectionClosed`, and `XHRonerror`.
   *
   * @param logger - The LogService instance used to emit log entries
   * @returns A CallbackMap suitable for registration on a web viewer
   */
  static getDefaultCallbackMap(logger) {
    return {
      info: (infoType, message) => {
        switch (infoType) {
          case InfoType.Info:
            logger.info(message);
            return;
          case InfoType.Warning:
            logger.warn(message);
            return;
          case InfoType.Error:
            logger.error(message);
            return;
        }
      },
      missingModel: (modelPath) => {
        logger.error(`Missing model: ${modelPath}`);
      },
      modelLoadFailure: (modelName, reason, error) => {
        logger.error(`Model load failure for model ${modelName}: ${reason}`, { error });
      },
      timeout: () => {
        logger.warn("Viewer timeout");
      },
      timeoutWarning: (minutesRemaining) => {
        logger.warn(`Viewer timeout warning: ${minutesRemaining} minutes remaining`);
      },
      webGlContextLost: () => {
        logger.error("WebGL context lost");
      },
      websocketConnectionClosed: () => {
        logger.warn("WebSocket connection closed");
      },
      XHRonerror: (errorEvent) => {
        logger.error("XHR error", { error: errorEvent.error });
      }
    };
  }
}
const serviceRegistry = {};
function registerService(service) {
  if (!service || !service.serviceName) {
    throw new Error("Service must have a serviceName property.");
  }
  const currentService = serviceRegistry[service.serviceName];
  if (currentService == service) {
    return;
  }
  if (currentService) {
    console.info(`Service with name ${service.serviceName} is already registered. Overwriting.`);
  }
  serviceRegistry[service.serviceName] = service;
}
function tryGetService(serviceName) {
  return serviceRegistry[serviceName];
}
function getService(serviceName) {
  if (!serviceRegistry[serviceName]) {
    throw new Error(`Service with name ${serviceName} is not registered.`);
  }
  return serviceRegistry[serviceName];
}
function getAllServices() {
  return { ...serviceRegistry };
}
function formatNoteTextItem(markup) {
  return {
    id: markup.uniqueId,
    type: markup.getClassName(),
    text: markup.getText()
  };
}
function formatNoteTextIcon(className) {
  switch (className) {
    case "Communicator.Markup.Note.NoteText":
      return "note";
    default:
      console.warn(`Unknown note text class name: ${className}`);
      return "undefined";
  }
}
class NoteTextService extends EventTarget {
  constructor(noteTextManager) {
    super();
    this.serviceName = "NoteTextService";
    this._noteTextManager = noteTextManager;
    this.noteTextCreated = this.noteTextCreated.bind(this);
    this.noteTextDeleted = this.noteTextDeleted.bind(this);
    this.noteTextUpdated = this.noteTextUpdated.bind(this);
    this.noteTextHidden = this.noteTextHidden.bind(this);
    this.noteTextShown = this.noteTextShown.bind(this);
    this.callbackMap = {
      noteTextCreated: this.noteTextCreated,
      noteTextDeleted: this.noteTextDeleted,
      noteTextUpdated: this.noteTextUpdated,
      noteTextHidden: this.noteTextHidden,
      noteTextShown: this.noteTextShown
    };
    if (this._noteTextManager) {
      this.bind();
    }
  }
  getNoteTexts() {
    if (!this._noteTextManager) {
      throw new Error("Cannot get note texts: NoteTextManager not initialized");
    }
    return this._noteTextManager.getNoteTextList().map(formatNoteTextItem);
  }
  getNoteText(uniqueId) {
    if (!this._noteTextManager) {
      throw new Error("Cannot get note text: NoteTextManager not initialized");
    }
    const noteText = this._noteTextManager.getNoteTextList().find((noteText2) => noteText2.uniqueId === uniqueId);
    return noteText ? formatNoteTextItem(noteText) : void 0;
  }
  getNoteTextKeys() {
    if (!this._noteTextManager) {
      throw new Error("Cannot get note text keys: NoteTextManager not initialized");
    }
    return this._noteTextManager.getNoteTextList().map((noteText) => noteText.uniqueId);
  }
  /**
   * Returns the unique IDs of all note text annotations that are currently visible in the model.
   * A note is considered visible if either its sphere or stem instance node is visible.
   * @throws {Error} If the NoteTextManager is not initialized.
   */
  getVisibleNoteTextKeys() {
    if (!this._noteTextManager) {
      throw new Error("Cannot get visible note text keys: NoteTextManager not initialized");
    }
    const model = this._noteTextManager.viewer.model;
    return this._noteTextManager.getNoteTextList().filter((noteText) => {
      const sphereInstanceId = noteText.getSphereInstanceId();
      const stemInstanceId = noteText.getStemInstanceId();
      const sphereVisible = sphereInstanceId !== void 0 && model.getNodeVisibility(sphereInstanceId);
      const stemVisible = stemInstanceId !== void 0 && model.getNodeVisibility(stemInstanceId);
      return sphereVisible || stemVisible;
    }).map((noteText) => noteText.uniqueId);
  }
  /**
   * Sets the visibility of the note text annotations identified by the given unique IDs.
   * When hiding a note, if it is the currently active note, its UI is also hidden.
   * @param uniqueIds - The unique IDs of the note texts to show or hide.
   * @param visible - Whether to make the note texts visible (`true`) or hidden (`false`).
   * @throws {Error} If the NoteTextManager is not initialized.
   */
  async setNoteTextsVisibility(uniqueIds, visible) {
    var _a2;
    if (!this._noteTextManager) {
      throw new Error("Cannot set note text visibility: NoteTextManager not initialized");
    }
    const noteIds = new Set(uniqueIds);
    const instanceIds = [];
    for (const noteText of this._noteTextManager.getNoteTextList().filter((n3) => noteIds.has(n3.uniqueId))) {
      const sphereInstanceId = noteText.getSphereInstanceId();
      const stemInstanceId = noteText.getStemInstanceId();
      if (sphereInstanceId !== void 0) {
        instanceIds.push(sphereInstanceId);
      }
      if (stemInstanceId !== void 0) {
        instanceIds.push(stemInstanceId);
      }
      if (!visible && ((_a2 = this._noteTextManager.getActiveItem()) == null ? void 0 : _a2.uniqueId) === noteText.uniqueId) {
        noteText.hide();
      }
    }
    if (instanceIds.length === 0) {
      return;
    }
    await this._noteTextManager.viewer.model.setNodesVisibility([...new Set(instanceIds)], visible);
  }
  async setActiveNoteText(id) {
    if (!this._noteTextManager) {
      throw new Error("Cannot select note text: NoteTextManager not initialized");
    }
    const noteText = this._noteTextManager.getNoteTextList().find((noteText2) => noteText2.uniqueId === id);
    if (!noteText) {
      console.error(`Note text with id ${id} not found`);
      return false;
    }
    await noteText.restore();
    this._noteTextManager.viewer.markupManager.selectMarkup(noteText, this._noteTextManager.viewer.view);
    return true;
  }
  getActiveNoteTextKey() {
    var _a2;
    if (!this._noteTextManager) {
      console.error("Cannot get selected note text: NoteTextManager not initialized");
      return void 0;
    }
    return (_a2 = this._noteTextManager.getActiveItem()) == null ? void 0 : _a2.uniqueId;
  }
  getActiveNoteText() {
    if (!this._noteTextManager) {
      console.error("Cannot get selected note text: NoteTextManager not initialized");
      return void 0;
    }
    const note2 = this._noteTextManager.getActiveItem();
    return note2 ? formatNoteTextItem(note2) : void 0;
  }
  async removeNoteText(item) {
    var _a2;
    if (!this._noteTextManager) {
      throw new Error("Cannot remove note text: NoteTextManager not initialized");
    }
    const noteText = this._noteTextManager.getNoteTextList().find((noteText2) => noteText2.uniqueId === item.id);
    if (!noteText) {
      console.error(`Note text with id ${item.id} not found`);
      return;
    }
    return noteText.remove(((_a2 = this.noteTextManager) == null ? void 0 : _a2.viewer.view) ?? null);
  }
  noteTextCreated(noteText) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-created", {
        detail: formatNoteTextItem(noteText),
        bubbles: true,
        composed: true
      })
    );
  }
  noteTextDeleted(noteText) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-deleted", {
        detail: formatNoteTextItem(noteText),
        bubbles: true,
        composed: true
      })
    );
  }
  noteTextUpdated(noteText) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-updated", {
        detail: formatNoteTextItem(noteText),
        bubbles: true,
        composed: true
      })
    );
  }
  noteTextHidden(noteText) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-hidden", {
        detail: formatNoteTextItem(noteText),
        bubbles: true,
        composed: true
      })
    );
  }
  noteTextShown(noteText) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-shown", {
        detail: formatNoteTextItem(noteText),
        bubbles: true,
        composed: true
      })
    );
  }
  bind() {
    if (!this._noteTextManager) {
      throw new Error("NoteTextManager is not set");
    }
    this._noteTextManager.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._noteTextManager) {
      throw new Error("NoteTextManager is not set");
    }
    this._noteTextManager.viewer.unsetCallbacks(this.callbackMap);
  }
  get noteTextManager() {
    return this._noteTextManager;
  }
  set noteTextManager(value) {
    if (this._noteTextManager === value) {
      return;
    }
    if (this._noteTextManager) {
      this.unbind();
    }
    this._noteTextManager = value;
    this.bind();
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-manager-reset", { bubbles: true, composed: true })
    );
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-manager-reset", { bubbles: true, composed: true })
    );
  }
}
function isMeasurementServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return typeof value.color === "string";
}
const _MeasurementService = class _MeasurementService extends EventTarget {
  constructor(measureManager) {
    super();
    this.serviceName = "MeasurementService";
    this.callbackMap = {};
    this.callbackToEvent = (eventName) => {
      return () => {
        if (!this._measureManager) {
          return;
        }
        this.dispatchEvent(
          new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            detail: {
              measurements: this.measurements
            }
          })
        );
      };
    };
    this._measureManager = measureManager;
    this.callbackMap = {
      measurementCreated: this.callbackToEvent("hoops-measurement-updated").bind(this),
      measurementDeleted: this.callbackToEvent("hoops-measurement-updated").bind(this)
    };
    if (this._measureManager) {
      this.bind();
    }
  }
  unbind() {
    if (this._measureManager) {
      this._measureManager.viewer.setCallbacks({});
    }
  }
  bind() {
    if (!this._measureManager) {
      throw new Error("MarkupManager is not set");
    }
    this._measureManager.viewer.setCallbacks(this.callbackMap);
  }
  removeMeasurement(measurement) {
    var _a2;
    (_a2 = this._measureManager) == null ? void 0 : _a2.removeMeasurement(measurement);
  }
  get measurements() {
    if (!this._measureManager) {
      return [];
    }
    const allMeasurements = this._measureManager.getAllMeasurements();
    return allMeasurements || [];
  }
  get measureManager() {
    return this._measureManager;
  }
  set measureManager(value) {
    if (this._measureManager === value) {
      return;
    }
    this.unbind();
    this._measureManager = value;
    this.bind();
  }
  getMeasurementColor() {
    if (!this._measureManager) {
      return _MeasurementService.DefaultConfig.color;
    }
    return this._measureManager.getMeasurementColor().toHexString();
  }
  setMeasurementColor(color) {
    if (!this._measureManager) {
      throw new Error("MeasureManager is not set");
    }
    this._measureManager.setMeasurementColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-measurement-color-changed", {
        bubbles: true,
        composed: true,
        detail: color
      })
    );
  }
  async resetConfiguration(obj) {
    if (!this._measureManager) {
      throw new Error("MeasureManager is not set");
    }
    const config = obj ?? _MeasurementService.DefaultConfig;
    if (!isMeasurementServiceConfiguration(config)) {
      throw new Error("Invalid configuration object");
    }
    this._measureManager.removeAllMeasurements();
    this.setMeasurementColor(config.color);
    this.dispatchEvent(
      new CustomEvent("hoops-measurement-reset", {
        bubbles: true,
        composed: true,
        detail: {
          measurements: this.measurements
        }
      })
    );
  }
};
_MeasurementService.DefaultConfig = {
  color: "#000000"
};
let MeasurementService = _MeasurementService;
const OrientationNames = ["North Up", "Avatar Up"];
function isOrientationName(value) {
  return OrientationNames.includes(value);
}
const AutoActivationModeNames = ["Bim", "Bim + Walk", "Never"];
function isAutoActivationModeName(value) {
  return AutoActivationModeNames.includes(value);
}
function isFloorplanServiceConfiguration(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const value = obj;
  return !!obj && typeof obj === "object" && typeof value.floorplanActive === "boolean" && typeof value.trackCamera === "boolean" && isOrientationName(value.orientation) && isAutoActivationModeName(value.autoActivationMode) && typeof value.overlayFeetPerPixel === "number" && typeof value.overlayZoomLevel === "number" && typeof value.overlayBackgroundOpacity === "number" && typeof value.overlayBorderOpacity === "number" && typeof value.overlayAvatarOpacity === "number" && typeof value.floorplanBackgroundColor === "string" && typeof value.floorplanBorderColor === "string" && typeof value.floorplanAvatarColor === "string" && typeof value.floorplanAvatarOutlineColor === "string";
}
const _FloorplanService = class _FloorplanService extends EventTarget {
  constructor(floorplanManager) {
    super();
    this.serviceName = "FloorplanService";
    this._floorplanManager = floorplanManager;
  }
  get floorplanManager() {
    return this._floorplanManager;
  }
  set floorplanManager(manager) {
    this._floorplanManager = manager;
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  isActive() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.isActive()) ?? false;
  }
  async setActive(active) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.isActive() === active) {
      return;
    }
    if (active) {
      await this._floorplanManager.activate();
    } else {
      await this._floorplanManager.deactivate();
    }
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-activation-changed", {
        detail: { active },
        bubbles: true,
        composed: true
      })
    );
  }
  isTrackCameraEnabled() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().trackCameraEnabled) ?? false;
  }
  async setTrackCameraEnabled(enabled) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.isTrackCameraEnabled() === enabled) {
      return;
    }
    await this._floorplanManager.setTrackCameraEnabled(enabled);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-track-camera-changed", {
        detail: { enabled },
        bubbles: true,
        composed: true
      })
    );
  }
  getOrientation() {
    var _a2;
    const orientation = (_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().floorplanOrientation;
    switch (orientation) {
      case FloorplanOrientation.NorthUp:
        return "North Up";
      case FloorplanOrientation.AvatarUp:
        return "Avatar Up";
      default:
        return "North Up";
    }
  }
  async setOrientation(orientation) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    let floorplanOrientation;
    switch (orientation) {
      case "North Up":
        floorplanOrientation = FloorplanOrientation.NorthUp;
        break;
      case "Avatar Up":
        floorplanOrientation = FloorplanOrientation.AvatarUp;
        break;
      default:
        throw new Error(`Unknown orientation: ${orientation}`);
    }
    await this._floorplanManager.setFloorplanOrientation(floorplanOrientation);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-orientation-changed", {
        detail: { orientation },
        bubbles: true,
        composed: true
      })
    );
  }
  getAutoActivationMode() {
    var _a2;
    const mode = (_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().autoActivate;
    switch (mode) {
      case FloorplanAutoActivation.Bim:
        return "Bim";
      case FloorplanAutoActivation.BimWalk:
        return "Bim + Walk";
      case FloorplanAutoActivation.Never:
        return "Never";
      default:
        return "Bim";
    }
  }
  async setAutoActivationMode(mode) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    let autoActivationMode;
    switch (mode) {
      case "Bim":
        autoActivationMode = FloorplanAutoActivation.Bim;
        break;
      case "Bim + Walk":
        autoActivationMode = FloorplanAutoActivation.BimWalk;
        break;
      case "Never":
        autoActivationMode = FloorplanAutoActivation.Never;
        break;
      default:
        throw new Error(`Unknown auto activation mode: ${mode}`);
    }
    await this._floorplanManager.setAutoActivate(autoActivationMode);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-auto-activation-changed", {
        detail: { mode },
        bubbles: true,
        composed: true
      })
    );
  }
  getOverlayFeetPerPixel() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().overlayFeetPerPixel) ?? 0;
  }
  async setOverlayFeetPerPixel(feetPerPixel) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.getOverlayFeetPerPixel() === feetPerPixel) {
      return;
    }
    await this._floorplanManager.setOverlayFeetPerPixel(feetPerPixel);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-feet-per-pixel-changed", {
        detail: { feetPerPixel },
        bubbles: true,
        composed: true
      })
    );
  }
  getOverlayZoomLevel() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().zoomLevel) ?? 1;
  }
  async setOverlayZoomLevel(zoomLevel) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.getOverlayZoomLevel() === zoomLevel) {
      return;
    }
    await this._floorplanManager.setZoomLevel(zoomLevel);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-zoom-level-changed", {
        detail: { zoomLevel },
        bubbles: true,
        composed: true
      })
    );
  }
  getOverlayBackgroundOpacity() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().backgroundOpacity) ?? 1;
  }
  async setOverlayBackgroundOpacity(opacity) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.getOverlayBackgroundOpacity() === opacity) {
      return;
    }
    await this._floorplanManager.setBackgroundOpacity(opacity);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-background-opacity-changed", {
        detail: { opacity },
        bubbles: true,
        composed: true
      })
    );
  }
  getOverlayBorderOpacity() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().borderOpacity) ?? 1;
  }
  async setOverlayBorderOpacity(opacity) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.getOverlayBorderOpacity() === opacity) {
      return;
    }
    await this._floorplanManager.setBorderOpacity(opacity);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-border-opacity-changed", {
        detail: { opacity },
        bubbles: true,
        composed: true
      })
    );
  }
  getOverlayAvatarOpacity() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().avatarOpacity) ?? 1;
  }
  async setOverlayAvatarOpacity(opacity) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    if (this.getOverlayAvatarOpacity() === opacity) {
      return;
    }
    await this._floorplanManager.setAvatarOpacity(opacity);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-overlay-avatar-opacity-changed", {
        detail: { opacity },
        bubbles: true,
        composed: true
      })
    );
  }
  getFloorplanBackgroundColor() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().backgroundColor.toHexString()) || "#ffffff";
  }
  async setFloorplanBackgroundColor(color) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    await this._floorplanManager.setBackgroundColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-background-color-changed", {
        detail: { color },
        bubbles: true,
        composed: true
      })
    );
  }
  getFloorplanBorderColor() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().borderColor.toHexString()) || "#ffffff";
  }
  async setFloorplanBorderColor(color) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    await this._floorplanManager.setBorderColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-border-color-changed", {
        detail: { color },
        bubbles: true,
        composed: true
      })
    );
  }
  getFloorplanAvatarColor() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().avatarColor.toHexString()) || "#ffffff";
  }
  async setFloorplanAvatarColor(color) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    await this._floorplanManager.setAvatarColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-avatar-color-changed", {
        detail: { color },
        bubbles: true,
        composed: true
      })
    );
  }
  getFloorplanAvatarOutlineColor() {
    var _a2;
    return ((_a2 = this._floorplanManager) == null ? void 0 : _a2.getConfiguration().avatarOutlineColor.toHexString()) || "#ffffff";
  }
  async setFloorplanAvatarOutlineColor(color) {
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    await this._floorplanManager.setAvatarOutlineColor(Color.fromHexString(color));
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-avatar-outline-color-changed", {
        detail: { color },
        bubbles: true,
        composed: true
      })
    );
  }
  async resetConfiguration(obj) {
    const config = obj ?? _FloorplanService.DefaultConfig;
    if (!isFloorplanServiceConfiguration(config)) {
      throw new Error("Invalid floorplan configuration object");
    }
    if (!this._floorplanManager) {
      throw new Error("FloorplanManager is not initialized");
    }
    await this.setActive(config.floorplanActive);
    await this.setTrackCameraEnabled(config.trackCamera);
    await this.setOrientation(config.orientation);
    await this.setAutoActivationMode(config.autoActivationMode);
    await this.setOverlayFeetPerPixel(config.overlayFeetPerPixel);
    await this.setOverlayZoomLevel(config.overlayZoomLevel);
    await this.setOverlayBackgroundOpacity(config.overlayBackgroundOpacity);
    await this.setOverlayBorderOpacity(config.overlayBorderOpacity);
    await this.setOverlayAvatarOpacity(config.overlayAvatarOpacity);
    await this.setFloorplanBackgroundColor(config.floorplanBackgroundColor);
    await this.setFloorplanBorderColor(config.floorplanBorderColor);
    await this.setFloorplanAvatarColor(config.floorplanAvatarColor);
    await this.setFloorplanAvatarOutlineColor(config.floorplanAvatarOutlineColor);
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }
  async reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-floorplan-manager-reset", {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }
};
_FloorplanService.DefaultConfig = {
  floorplanActive: false,
  trackCamera: false,
  orientation: "North Up",
  autoActivationMode: "Bim + Walk",
  overlayFeetPerPixel: 0.1,
  overlayZoomLevel: 1,
  overlayBackgroundOpacity: 0.25,
  overlayBorderOpacity: 1,
  overlayAvatarOpacity: 1,
  floorplanBackgroundColor: "#ffffff",
  floorplanBorderColor: "#000000",
  floorplanAvatarColor: "#ff00ff",
  floorplanAvatarOutlineColor: "#000000"
};
let FloorplanService = _FloorplanService;
var __defProp$10 = Object.defineProperty;
var __getOwnPropDesc$1c = Object.getOwnPropertyDescriptor;
var __decorateClass$1c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1c(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$10(target, key, result);
  return result;
};
let HoopsServiceRegistryElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.bcfService = new BcfService();
    this.redlineService = new RedlineService();
    this.noteTextService = new NoteTextService();
    this.measurementService = new MeasurementService();
    this.renderOptionsService = new RenderOptionsService();
    this.viewService = new ViewService();
    this.ifcRelationshipsService = new IFCRelationshipsService();
    this.floorplanService = new FloorplanService();
    this.pmiService = new PmiService();
    this.selectionService = new SelectionService();
    this.cuttingService = new CuttingService();
    this.cameraService = new CameraService();
    this.sheetService = new SheetService();
    this.walkOperatorService = new WalkOperatorService();
    this.explodeService = new ExplodeService();
    this.spaceMouseService = new SpaceMouseService();
    this.logService = new LogService();
    this.materialService = new MaterialService();
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
    super.connectedCallback();
    registerService(this.bcfService);
    registerService(this.measurementService);
    registerService(this.redlineService);
    registerService(this.noteTextService);
    registerService(this.renderOptionsService);
    registerService(this.ifcRelationshipsService);
    registerService(this.viewService);
    registerService(this.floorplanService);
    registerService(this.pmiService);
    registerService(this.selectionService);
    registerService(this.cuttingService);
    registerService(this.cameraService);
    registerService(this.sheetService);
    registerService(this.walkOperatorService);
    registerService(this.explodeService);
    registerService(this.spaceMouseService);
    registerService(this.materialService);
    registerService(this.logService);
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
  getService(serviceName) {
    return getService(serviceName);
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
  tryGetService(serviceName) {
    return tryGetService(serviceName);
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
    return b``;
  }
};
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "bcfService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "redlineService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "noteTextService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "measurementService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "renderOptionsService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "viewService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "ifcRelationshipsService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "floorplanService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "pmiService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "selectionService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "cuttingService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "cameraService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "sheetService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "walkOperatorService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "explodeService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "spaceMouseService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "logService", 2);
__decorateClass$1c([
  n$4({ type: Object, attribute: false })
], HoopsServiceRegistryElement.prototype, "materialService", 2);
HoopsServiceRegistryElement = __decorateClass$1c([
  t$2("hoops-service-registry")
], HoopsServiceRegistryElement);
var __defProp$$ = Object.defineProperty;
var __getOwnPropDesc$1b = Object.getOwnPropertyDescriptor;
var __decorateClass$1b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1b(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$$(target, key, result);
  return result;
};
const contextManagerContext = n$9(
  Symbol("hoops-context-manager-context")
);
const webViewerContext = n$9(Symbol("hoops-web-viewer-context"));
const webViewerStateContext = n$9(
  Symbol("hoops-web-viewer-state-context")
);
let WebViewerContextManager = class extends i$3 {
  constructor() {
    super(...arguments);
    this.webviewerState = {
      drawMode: "Wireframe",
      topCameraOperator: OperatorId.Navigate,
      toolOperator: OperatorId.None
    };
    this.contextManager = this;
  }
  /**
   * Gets the current WebViewer instance.
   *
   * @returns {WebViewer | undefined} The current WebViewer instance or undefined if not set
   */
  get webViewer() {
    return this._webViewer;
  }
  /**
   * Sets the WebViewer instance and initializes all associated services.
   * When set, automatically configures service dependencies and refreshes operator states.
   *
   * @param value - The WebViewer instance to set
   * @returns {void}
   */
  set webViewer(value) {
    var _a2;
    this._webViewer = value;
    if (!this._webViewer) {
      return;
    }
    const currentDrawMode = this._webViewer.view.getDrawModeName();
    this.dispatchDrawMode(currentDrawMode);
    this.refreshCameraOperator();
    this.refreshToolOperator();
    getService("MeasurementService").measureManager = this._webViewer.measureManager;
    getService("BcfService").webViewer = this._webViewer;
    getService("RedlineService").markupManager = (_a2 = this._webViewer) == null ? void 0 : _a2.markupManager;
    getService("NoteTextService").noteTextManager = this._webViewer.noteTextManager;
    getService("RenderOptionsService").webViewer = this._webViewer;
    getService("IFCRelationshipsService").selectionManager = this._webViewer.selectionManager;
    getService("ViewService").view = this._webViewer.view;
    getService("FloorplanService").floorplanManager = this._webViewer.view.floorplanManager;
    getService("PmiService").viewer = this._webViewer;
    getService("SelectionService").webViewer = this._webViewer;
    getService("CuttingService").cuttingManager = this._webViewer.cuttingManager;
    getService("CameraService").webViewer = this._webViewer;
    getService("SheetService").sheetManager = this._webViewer.sheetManager;
    const walkService = getService("WalkOperatorService");
    walkService.walkModeOperator = this._webViewer.view.operatorManager.getOperator(
      OperatorId.WalkMode
    );
    getService("ExplodeService").webViewer = this._webViewer;
    getService("SpaceMouseService").spaceMouseOperator = this._webViewer.view.operatorManager.getOperator(
      OperatorId.SpaceMouse
    );
    getService("MaterialService").viewer = this._webViewer;
    getService("LogService").webViewer = this._webViewer;
  }
  /**
   * Updates the web viewer state with the specified draw mode.
   * Dispatches state change to all consuming components via context.
   *
   * @internal
   * @param drawMode - The new draw mode to set in the state
   * @returns {void}
   */
  dispatchDrawMode(drawMode) {
    this.webviewerState = {
      ...this.webviewerState,
      drawMode
    };
  }
  /**
   * Sets the draw mode for the web viewer and updates the context state.
   * Changes how 3D models are rendered (wireframe, shaded, etc.).
   *
   * @param drawMode - The draw mode to apply to the web viewer
   * @returns {void}
   */
  setDrawMode(drawMode) {
    if (this._webViewer) {
      this._webViewer.view.setDrawMode(drawMode);
      this.dispatchDrawMode(drawMode);
    }
  }
  /**
   * Resets the web viewer and all associated services to their initial state.
   * Clears all active operations, handles, and resets service states.
   *
   * @returns {Promise<void>} Promise that resolves when reset is complete
   */
  async reset() {
    if (!this.webViewer) {
      return;
    }
    await this.webViewer.reset();
    if (!this.webViewer.sheetManager.isDrawingSheetActive()) {
      this.webViewer.noteTextManager.setIsolateActive(false);
      await this.webViewer.noteTextManager.updatePinVisibility();
      const handleOperator = this.webViewer.view.operatorManager.getOperator(OperatorId.Handle);
      if (handleOperator !== null && handleOperator.removeHandles) {
        await handleOperator.removeHandles();
      }
    }
    getService("RedlineService").reset();
    getService("NoteTextService").reset();
    getService("ViewService").reset();
    getService("FloorplanService").reset();
    getService("CameraService").reset();
    getService("WalkOperatorService").reset();
    getService("ExplodeService").reset();
  }
  /**
   * Updates the web viewer state with the specified camera operator.
   * Dispatches camera operator change to all consuming components via context.
   *
   * @internal
   * @param cameraOp - The camera operator ID to set in the state
   * @returns {void}
   */
  dispatchCameraOperator(cameraOp) {
    this.webviewerState = {
      ...this.webviewerState,
      topCameraOperator: cameraOp
    };
  }
  /**
   * Updates the web viewer state with the specified tool operator.
   * Dispatches tool operator change to all consuming components via context.
   *
   * @internal
   * @param redlineOperator - The tool operator ID to set in the state
   * @returns {void}
   */
  dispatchToolOperator(redlineOperator) {
    this.webviewerState = {
      ...this.webviewerState,
      toolOperator: redlineOperator
    };
  }
  /**
   * Refreshes the camera operator state from the web viewer and updates the context.
   * Synchronizes the context state with the current camera operator.
   *
   * @returns {void}
   */
  refreshCameraOperator() {
    if (this._webViewer) {
      const currentCameraOp = this._webViewer.view.operatorManager.get(CameraOperatorPosition);
      this.dispatchCameraOperator(currentCameraOp);
    }
  }
  /**
   * Refreshes the tool operator state from the web viewer and updates the context.
   * Synchronizes the context state with the current active tool operator.
   *
   * @returns {void}
   */
  refreshToolOperator() {
    if (this._webViewer) {
      const currentRedlineOp = this._webViewer.view.operatorManager.get(ActiveToolOperatorPosition);
      this.dispatchToolOperator(currentRedlineOp);
    }
  }
  /**
   * Sets the active redline operator for drawing markup annotations.
   * Validates the operator ID against supported redline modes before setting.
   *
   * @param redlineOperatorId - The redline operator ID to activate
   * @returns {void}
   */
  setRedlineOperator(redlineOperatorId) {
    if (!redlineModes.includes(redlineOperatorId)) {
      console.error("Invalid redline operator ID:", redlineOperatorId);
      return;
    }
    this.activeToolOperator = redlineOperatorId;
  }
  /**
   * Checks if a redline operator is currently active.
   * Returns true if any redline drawing mode is currently enabled.
   *
   * @returns {boolean} True if a redline operator is active, false otherwise
   */
  isRedlineOperatorActive() {
    if (!this._webViewer) {
      return false;
    }
    return redlineModes.includes(
      this._webViewer.view.operatorManager.get(
        ActiveToolOperatorPosition
      )
    );
  }
  /**
   * Gets the currently active tool operator.
   * Returns the operator ID if a tool is active, undefined otherwise.
   *
   * @returns {OperatorId | undefined} The active tool operator ID or undefined if none is active
   */
  get activeToolOperator() {
    if (!this._webViewer) {
      return void 0;
    }
    const op = this._webViewer.view.operatorManager.get(ActiveToolOperatorPosition);
    if (op === OperatorId.Invalid || op === OperatorId.None) {
      return void 0;
    }
    return op;
  }
  /**
   * Sets the active tool operator and updates the context state.
   * Activates the specified operator in the web viewer's operator manager and
   * synchronizes the context state to notify all consuming components.
   *
   * @param value - The operator ID to set as active, or undefined to clear
   * @returns {void}
   */
  set activeToolOperator(value) {
    if (!this._webViewer) {
      console.error("Cannot set operator: WebViewer not initialized");
      return;
    }
    this._webViewer.view.operatorManager.set(value ?? OperatorId.None, ActiveToolOperatorPosition);
    this.refreshToolOperator();
  }
  /**
   * Returns the element itself as the render root instead of creating a shadow DOM.
   * This ensures the context provider doesn't interfere with application styling.
   *
   * @internal
   * @returns {Element} The element itself
   */
  createRenderRoot() {
    return this;
  }
  /** @internal */
  render() {
    return b``;
  }
};
__decorateClass$1b([
  e$a({ context: webViewerStateContext })
], WebViewerContextManager.prototype, "webviewerState", 2);
__decorateClass$1b([
  e$a({ context: contextManagerContext })
], WebViewerContextManager.prototype, "contextManager", 2);
__decorateClass$1b([
  e$a({ context: webViewerContext })
], WebViewerContextManager.prototype, "_webViewer", 2);
WebViewerContextManager = __decorateClass$1b([
  t$2("hoops-web-viewer-context-manager")
], WebViewerContextManager);
var __defProp$_ = Object.defineProperty;
var __getOwnPropDesc$1a = Object.getOwnPropertyDescriptor;
var __decorateClass$1a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1a(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$_(target, key, result);
  return result;
};
let Separator = class extends i$3 {
  constructor() {
    super(...arguments);
    this.direction = "vertical";
  }
  /**
   * Renders the separator component template.
   *
   * Creates a simple `<hr>` element with CSS classes that determine the separator's
   * appearance based on the direction property. The element uses CSS custom properties
   * for theming and applies appropriate styling for either horizontal or vertical orientation.
   *
   * The rendered element:
   * - Uses semantic `<hr>` element for accessibility
   * - Applies base "separator" class for common styling
   * - Adds direction-specific class ("separator-horizontal" or "separator-vertical")
   * - Respects --hoops-separator-color CSS custom property for theming
   *
   * @returns TemplateResult containing an `<hr>` element with appropriate CSS classes
   *
   * @example
   * ```html
   * <!-- Rendered vertical separator -->
   * <hr class="separator separator-vertical" />
   *
   * <!-- Rendered horizontal separator -->
   * <hr class="separator separator-horizontal" />
   * ```
   *
   * @override
   */
  render() {
    return b`<hr class="separator separator-${this.direction}" />`;
  }
};
Separator.styles = [
  i$7`
      :host {
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-content: center;
      }
      .separator {
        border: none;
        border-left: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
      .separator.separator-vertical {
        height: 80%;
        margin: 0px 4px;
        border-left: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
      .separator.separator-horizontal {
        width: 80%;
        margin: 4px 0px;
        border-top: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
    `
];
__decorateClass$1a([
  n$4()
], Separator.prototype, "direction", 2);
Separator = __decorateClass$1a([
  t$2("hoops-separator")
], Separator);
var __defProp$Z = Object.defineProperty;
var __getOwnPropDesc$19 = Object.getOwnPropertyDescriptor;
var __decorateClass$19 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$19(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$Z(target, key, result);
  return result;
};
let HoopsCoordinateInputElement = class extends i$3 {
  /**
   * Constructs a new HoopsCoordinateInputElement with default values.
   *
   * Initializes the component with:
   * - Empty label
   * - Value of 0
   * - Min value of 0
   * - Max value of 100
   */
  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.min = 0;
    this.max = 100;
  }
  /**
   * Lifecycle method called when the element's properties change.
   *
   * This override ensures that both input controls (numeric and range)
   * stay synchronized with the current value property. This is necessary
   * because external updates to the value property may not trigger a
   * re-render of the input elements if they already contain the same value.
   *
   * @param changedProperties - Map of changed properties and their previous values
   *
   * @example
   * ```typescript
   * // When value is updated externally, both inputs will reflect the new value
   * element.value = 42.5; // Both numeric input and slider will show 42.50
   * ```
   */
  update(changedProperties) {
    super.update(changedProperties);
    this._inputs.forEach((input) => {
      input.value = this.formattedValue;
    });
  }
  /**
   * Gets the current value formatted as a string with 2 decimal places.
   *
   * This formatter ensures consistent display across both input controls
   * and provides a standardized precision for coordinate values.
   *
   * @returns The formatted value string (e.g., "10.50", "0.00", "-5.25")
   *
   * @example
   * ```typescript
   * element.value = 10.5;
   * console.log(element.formattedValue); // "10.50"
   *
   * element.value = 0;
   * console.log(element.formattedValue); // "0.00"
   * ```
   */
  get formattedValue() {
    return this.value.toFixed(2);
  }
  /** @internal */
  render() {
    const value = this.formattedValue;
    return b`<div>
      <label>${this.label}:</label>
      <input
        type="number"
        .value=${value}
        min=${this.min}
        max=${this.max}
        step="0.01"
        @change=${(e3) => this.onChange(parseFloat(e3.target.value))}
      />
      <input
        type="range"
        .value=${value}
        min=${this.min}
        max=${this.max}
        step="0.01"
        @change=${(e3) => this.onChange(parseFloat(e3.target.value))}
      />
    </div>`;
  }
  /**
   * Handles value changes from either the numeric input or range slider.
   *
   * When either input control changes, this method dispatches a custom
   * 'hoops-coordinate-changed' event with the new value and the coordinate
   * label in the event detail.
   *
   * @param value - The new numeric value from the input control
   *
   * @fires hoops-coordinate-changed - Custom event containing the label and new value
   *
   * @internal
   */
  onChange(value) {
    this.dispatchEvent(
      new CustomEvent("hoops-coordinate-changed", {
        detail: { label: this.label, value }
      })
    );
  }
};
HoopsCoordinateInputElement.styles = [
  i$7`
      :host {
        display: block;
      }

      div {
        display: grid;
        grid-template-columns: 1rem 4rem auto;
        align-items: center;
        gap: 0.5rem;
      }

      label {
        text-align: center;
      }

      input[type='number'] {
        width: 4rem;
      }
    `
];
__decorateClass$19([
  n$4({ type: String })
], HoopsCoordinateInputElement.prototype, "label", 2);
__decorateClass$19([
  n$4({ type: Number })
], HoopsCoordinateInputElement.prototype, "value", 2);
__decorateClass$19([
  n$4({ type: Number })
], HoopsCoordinateInputElement.prototype, "min", 2);
__decorateClass$19([
  n$4({ type: Number })
], HoopsCoordinateInputElement.prototype, "max", 2);
__decorateClass$19([
  r$3("input")
], HoopsCoordinateInputElement.prototype, "_inputs", 2);
HoopsCoordinateInputElement = __decorateClass$19([
  t$2("hoops-coordinate-input")
], HoopsCoordinateInputElement);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2 }, e$2 = (t2) => (...e3) => ({ _$litDirective$: t2, values: e3 });
let i$2 = class i3 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e3, i5) {
    this._$Ct = t2, this._$AM = e3, this._$Ci = i5;
  }
  _$AS(t2, e3) {
    return this.update(t2, e3);
  }
  update(t2, e3) {
    return this.render(...e3);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$3 = "important", i$1 = " !" + n$3, o$4 = e$2(class extends i$2 {
  constructor(t2) {
    var _a2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "style" !== t2.name || ((_a2 = t2.strings) == null ? void 0 : _a2.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce(((e3, r2) => {
      const s5 = t2[r2];
      return null == s5 ? e3 : e3 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s5};`;
    }), "");
  }
  update(e3, [r2]) {
    const { style: s5 } = e3.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s5.removeProperty(t2) : s5[t2] = null);
    for (const t2 in r2) {
      const e4 = r2[t2];
      if (null != e4) {
        this.ft.add(t2);
        const r3 = "string" == typeof e4 && e4.endsWith(i$1);
        t2.includes("-") || r3 ? s5.setProperty(t2, r3 ? e4.slice(0, -11) : e4, r3 ? n$3 : "") : s5[t2] = e4;
      }
    }
    return T;
  }
});
var __defProp$Y = Object.defineProperty;
var __getOwnPropDesc$18 = Object.getOwnPropertyDescriptor;
var __decorateClass$18 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$18(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$Y(target, key, result);
  return result;
};
let HoopsButton = class extends i$3 {
  constructor() {
    super();
    this.tabindex = "0";
    this.role = "button";
    this.iconSize = "md";
    this.color = "default";
    this.disabled = false;
    this.addEventListener("keypress", this.handleKeypress);
  }
  /**
   * Handles keyboard interactions for the button.
   *
   * @param keypressEvent - The keyboard event to handle
   * @returns void
   *
   * @internal
   */
  handleKeypress(keypressEvent) {
    if (keypressEvent.key === "Space" || keypressEvent.key === "Enter") {
      keypressEvent.preventDefault();
      keypressEvent.stopPropagation();
      if (!this.disabled) {
        this.click();
      }
    }
  }
  /** @internal */
  render() {
    return b`
      <div
        class="container"
        size=${this.iconSize}
        color=${this.color}
        ?aria-disabled=${this.disabled}
      >
        <slot name="icon"></slot>
        <span>
          <slot></slot>
        </span>
      </div>
    `;
  }
};
HoopsButton.styles = [
  i$7`
      :host {
        align-self: stretch;
      }
      .container {
        border: none;
        display: flex;
        box-sizing: border-box;
        background-color: transparent;
        color: var(--hoops-neutral-foreground, var(--hoops-foreground, #303030));
        width: 100%;
        padding: 0.4rem 0.6rem;
        transition: background-color linear 0.2s;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        overflow: hidden;
      }
      .container[color='default'] {
        color: var(--hoops-neutral-foreground, var(--hoops-foreground, #303030));
      }
      .container[color='accent'] {
        color: var(--hoops-accent-foreground, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      }

      :host(:is(:hover, :active, :focus))
        .container[color='default']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-neutral-foreground-active, #f0f0f0);
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }
      :host(:is(:hover, :active, :focus))
        .container[color='accent']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-accent-foreground-active, #f0f0f0);
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }

      ::slotted([slot='icon']) {
        margin-right: 0.2rem;
      }

      [size='xl'] ::slotted([slot='icon']) {
        width: var(--hoops-xl-icon-button-content-size, 2.6rem);
        height: var(--hoops-xl-icon-button-content-size, 2.6rem);
      }
      [size='md'] ::slotted([slot='icon']) {
        width: var(--hoops-md-icon-button-content-size, 1.6rem);
        height: var(--hoops-md-icon-button-content-size, 1.6rem);
      }
      [size='sm'] ::slotted([slot='icon']) {
        width: var(--hoops-sm-icon-button-content-size, 1.2rem);
        height: var(--hoops-sm-icon-button-content-size, 1.2rem);
      }

      .container[aria-disabled] {
        cursor: default;
        opacity: 0.25;
      }
    `
];
__decorateClass$18([
  n$4({ reflect: true })
], HoopsButton.prototype, "tabindex", 2);
__decorateClass$18([
  n$4({ reflect: true })
], HoopsButton.prototype, "role", 2);
__decorateClass$18([
  n$4()
], HoopsButton.prototype, "iconSize", 2);
__decorateClass$18([
  n$4()
], HoopsButton.prototype, "color", 2);
__decorateClass$18([
  n$4({ type: Boolean })
], HoopsButton.prototype, "disabled", 2);
HoopsButton = __decorateClass$18([
  t$2("hoops-button")
], HoopsButton);
const hiddenIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <g><path xmlns="http://www.w3.org/2000/svg" d="M10.5 14c-2.7 0-4.6-2.2-5.8-3.5-.2-.3-.4-.5-.6-.6-.1-.2-.1-.6 0-.8s.5-.2.7 0c.2.2.4.5.7.7 1.1 1.3 2.8 3.2 5 3.2 2.3 0 3.9-1.9 5-3.2.2-.3.4-.5.6-.7.2-.2.5-.2.7 0s.2.5 0 .7l-.6.6c-1.1 1.4-3 3.6-5.7 3.6z" fill="var(--hoops-svg-stroke-color, #303030)"></path></g>
</svg>`;
const visibleIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><path xmlns="http://www.w3.org/2000/svg" d="M16.9 9.2C15.5 7.7 13.8 5 10.5 5s-5 2.7-6.4 4.2c-.1.2-.1.4 0 .6 1.3 1.4 3.1 4.2 6.4 4.2s5-2.7 6.4-4.2c.1-.2.1-.4 0-.6zM10.5 13C8.6 13 7 11.4 7 9.5S8.6 6 10.5 6 14 7.6 14 9.5 12.4 13 10.5 13z" fill="var(--hoops-svg-stroke-color, #303030)"></path><circle xmlns="http://www.w3.org/2000/svg" cx="10.5" cy="9.5" r="1.5" fill="var(--hoops-svg-stroke-color, #303030)"></circle></g>
</svg>`;
const halfVisibleIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><path xmlns="http://www.w3.org/2000/svg" d="M16.9 9.2C15.5 7.7 13.8 5 10.5 5s-5 2.7-6.4 4.2c-.1.2-.1.4 0 .6 1.3 1.4 3.1 4.2 6.4 4.2s5-2.7 6.4-4.2c.1-.2.1-.4 0-.6zM10.5 13C8.6 13 7 11.4 7 9.5S8.6 6 10.5 6 14 7.6 14 9.5 12.4 13 10.5 13z" stroke="none" fill="var(--hoops-svg-stroke-color, #303030)"/> <circle xmlns="http://www.w3.org/2000/svg" cx="10.5" cy="9.5" r="1.5" stroke="none" fill="none"/></g>
</svg>`;
const folderIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><g xmlns="http://www.w3.org/2000/svg" > <path d="M363.5 95a.5.5 0 0 0-.5.5V99h14v-1.5a.5.5 0 0 0-.5-.5H368v-1.5a.5.5 0 0 0-.5-.5z"  transform="translate(-360 -91.5)"></path> <path  d="M363.5 100a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5z" transform="translate(-360 -91.5)"></path> </g></g>
</svg>`;
const meshCubeIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><g xmlns="http://www.w3.org/2000/svg" > <path d="M30.5 389a.5.5 0 0 0-.354.146l-3 3a.5.5 0 0 0-.146.354v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .354-.146l3-3A.5.5 0 0 0 41 399.5v-10a.5.5 0 0 0-.5-.5zm.207 1H40v9.293L37.293 402H28v-9.293z"  transform="translate(-24 -386)"></path> <path d="M39.49 389.988a.5.5 0 0 0-.344.153L37.293 392H29.5a.5.5 0 1 0 0 1H37v7.5a.5.5 0 1 0 1 0v-7.793l1.854-1.861a.5.5 0 0 0-.364-.858z" transform="translate(-24 -386)"></path> </g></g>
</svg>`;
const rightIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><path xmlns="http://www.w3.org/2000/svg" d="M7.998 5.494a.5.5 0 0 0-.348.859l3.647 3.646-3.647 3.647a.5.5 0 1 0 .707.707l4-4a.5.5 0 0 0 0-.707l-4-4a.5.5 0 0 0-.36-.152z"></path></g>
</svg>`;
const downIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="var(--hoops-svg-stroke-color, #303030)">
<g><path xmlns="http://www.w3.org/2000/svg" d="M5.995 7.498a.5.5 0 0 0-.35.86l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 1 0-.707-.708l-3.647 3.647L6.353 7.65a.5.5 0 0 0-.358-.152z"></path></g>
</svg>`;
const dotIcon = w`<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<g><path xmlns="http://www.w3.org/2000/svg" d="M10 8c-1.099 0-2 .901-2 2s.901 2 2 2 2-.901 2-2-.901-2-2-2z"></path></g>
</svg>`;
const appMenuIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z"/></svg>`;
const explode = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M59.1,58.4c-0.6,0.4-1,1-1,1.7v26.8L50,91.6l-8.1-4.7V60.1 c0-0.7-0.4-1.3-1-1.7L18,44.5V30.2L49.1,46c0.3,0.1,0.6,0.2,0.9,0.2c0.3,0,0.6-0.1,0.9-0.2L82,30.3v14.3L59.1,58.4z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M92.8,39.2c-0.6-0.4-1.4-0.3-2,0L84,43.3V29.2l8.7-4.4c0.7-0.3,1.1-1,1.1-1.8s-0.4-1.4-1.1-1.8 l-41.8-21c-0.6-0.3-1.2-0.3-1.8,0L7.2,21.3c-0.7,0.3-1.1,1-1.1,1.8s0.4,1.4,1.1,1.8l8.7,4.4v14.1l-6.8-4.1c-0.6-0.4-1.4-0.4-2,0 s-1,1-1,1.7l0.1,37.9c0,0.7,0.4,1.3,1,1.7l31.6,19.1c0.3,0.2,0.7,0.3,1,0.3s0.7-0.1,1-0.3c0.6-0.4,1-0.9,1-1.6v-8.8l7.6,4.4 c0.2,0.1,0.3,0.1,0.5,0.1s0.3,0,0.5-0.1l7.6-4.4V98c0,0.7,0.4,1.4,1,1.7c0.3,0.2,0.6,0.3,1,0.3s0.7-0.1,1-0.3l31.6-19.2 c0.6-0.4,1-1,1-1.7l0.1-37.9C93.8,40.2,93.4,39.6,92.8,39.2z M50,4.2L87.4,23L50,42L12.6,23L50,4.2z M37.9,94.5L10.3,77.7l-0.1-33.2 l27.7,16.7V94.5z M59.1,58.4c-0.6,0.4-1,1-1,1.7v26.8L50,91.6l-8.1-4.7V60.1c0-0.7-0.4-1.3-1-1.7L18,44.5V30.2L49.1,46 c0.3,0.1,0.6,0.2,0.9,0.2c0.3,0,0.6-0.1,0.9-0.2L82,30.3v14.3L59.1,58.4z M89.7,77.7L62.1,94.5V61.2l27.7-16.7L89.7,77.7z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const home = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M99.2,41.3l-48-37.9c-0.7-0.6-1.7-0.6-2.5,0l-48,37.9c-0.7,0.5-0.9,1.4-0.6,2.2 c0.3,0.8,1,1.3,1.9,1.3h11V95c0,1.1,0.9,2,2,2h70c1.1,0,2-0.9,2-2V44.9h11c0.8,0,1.6-0.5,1.9-1.3C100.2,42.8,99.9,41.9,99.2,41.3z M61,93H39V58.1h22V93z M85,40.9c-1.1,0-2,0.9-2,2V93H65V56.1c0-1.1-0.9-2-2-2H37c-1.1,0-2,0.9-2,2V93H17V42.9c0-1.1-0.9-2-2-2H7.7 L50,7.5l42.3,33.4H85z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const measureDistance = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M25.6,9.1V40L25,40.6c-1.1,1.1-2.2,2.1-3.3,3.1 c-1.1,1.1-2.3,2.1-3.4,3.2c-1.2,1.1-1.5,2.8-0.9,4.3c0.4,1.1,1.3,2,2.2,2.8l0.5,0.5c0.8,0.8,1.5,1.5,2.3,2.2 c0.6,0.6,1.1,1.1,1.7,1.7c0.5,0.5,1,1,1.5,1.5v6c-6.6,8-13.3,16-20,24.1V27.5C12.3,21.4,19,15.2,25.6,9.1z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M94.3,27.5V90l-20-24.2v-5.7c0.6-0.6,1.2-1.2,1.7-1.8l1.7-1.7 c0.8-0.7,1.5-1.5,2.3-2.2l0.5-0.5c0.9-0.9,1.8-1.7,2.2-2.8c0.6-1.5,0.2-3.2-0.9-4.3c-1.1-1.1-2.3-2.2-3.4-3.2c-1.1-1-2.2-2-3.3-3.1 l-0.8-0.8V9.1c3.4,3,6.7,6.1,10,9.2C87.6,21.4,91,24.4,94.3,27.5z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M82.7,51.2c-0.4,1.1-1.3,1.9-2.2,2.8L80,54.5c-0.8,0.7-1.5,1.5-2.3,2.2L76,58.4 c-0.5,0.6-1.1,1.2-1.7,1.8c-1.3,1.3-2.6,2.6-3.9,4c-0.7,0.7-1.3,1.4-2,2.2c-1.6,1.6-4.1,1.6-5.7,0.1c-0.8-0.7-1.2-1.7-1.2-2.8 c0-1,0.4-2,1.1-2.8l5.7-5.8c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6H32.4c-0.4,0-0.7,0.2-0.9,0.6s-0.1,0.8,0.2,1.1 l5.7,5.8c0.7,0.7,1.1,1.7,1.1,2.8c0,1.1-0.4,2.1-1.2,2.8c-0.7,0.7-1.7,1.1-2.8,1.1s-2.1-0.5-2.8-1.2c-0.7-0.7-1.3-1.5-2-2.2 c-1.4-1.5-2.7-2.9-4.1-4.2c-0.5-0.5-1-1-1.5-1.5c-0.6-0.6-1.1-1.1-1.7-1.7c-0.8-0.7-1.5-1.4-2.3-2.2L19.6,54 c-0.9-0.8-1.8-1.7-2.2-2.8c-0.6-1.5-0.3-3.2,0.9-4.3c1.1-1.1,2.3-2.1,3.4-3.2c1.1-1,2.2-2,3.3-3.1l0.6-0.6l1.1-1.2c1-1,2-1.9,3-2.9 c0.2-0.2,0.5-0.4,0.7-0.7l1.7-1.6c0.8-0.7,1.8-1.1,2.8-1.1c1.1,0,2.1,0.4,2.9,1.2c1.5,1.6,1.5,4.2-0.1,5.7l-4.1,4l-1.8,1.8 c-0.3,0.3-0.4,0.7-0.2,1.1c0.1,0.4,0.5,0.6,0.9,0.6h35.1c0.4,0,0.7-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.9-5.8 c-0.8-0.7-1.2-1.8-1.2-2.8s0.4-2,1.1-2.8c1.6-1.6,4.1-1.6,5.7-0.1l1.7,1.6c0.2,0.2,0.5,0.5,0.7,0.7c1,1,2,2,3,2.9l0.9,0.9l0.8,0.8 c1.1,1.1,2.2,2.1,3.3,3.1c1.1,1,2.3,2.1,3.4,3.2C82.9,48,83.3,49.7,82.7,51.2z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M83,45.4c-1.1-1.1-2.2-2.1-3.4-3.2c-1.1-1-2.2-2.1-3.3-3.1l-1.7-1.7c-0.1-0.1-0.2-0.2-0.3-0.3v2.7 l0.8,0.8c1.1,1.1,2.2,2.1,3.3,3.1c1.1,1,2.3,2.1,3.4,3.2c1.1,1.1,1.5,2.8,0.9,4.3c-0.4,1.1-1.3,1.9-2.2,2.8L80,54.5 c-0.8,0.7-1.5,1.5-2.3,2.2L76,58.4c-0.5,0.6-1.1,1.2-1.7,1.8v2.7c1-1,2-2,2.9-2.9c0.6-0.6,1.1-1.2,1.7-1.7c0.8-0.8,1.6-1.5,2.3-2.3 l0.5-0.5c1-1,2.1-2,2.7-3.5C85.3,49.6,84.7,47.1,83,45.4z M83,45.4c-1.1-1.1-2.2-2.1-3.4-3.2c-1.1-1-2.2-2.1-3.3-3.1l-1.7-1.7 c-0.1-0.1-0.2-0.2-0.3-0.3v2.7l0.8,0.8c1.1,1.1,2.2,2.1,3.3,3.1c1.1,1,2.3,2.1,3.4,3.2c1.1,1.1,1.5,2.8,0.9,4.3 c-0.4,1.1-1.3,1.9-2.2,2.8L80,54.5c-0.8,0.7-1.5,1.5-2.3,2.2L76,58.4c-0.5,0.6-1.1,1.2-1.7,1.8v2.7c1-1,2-2,2.9-2.9 c0.6-0.6,1.1-1.2,1.7-1.7c0.8-0.8,1.6-1.5,2.3-2.3l0.5-0.5c1-1,2.1-2,2.7-3.5C85.3,49.6,84.7,47.1,83,45.4z M97.8,25.2l-24-22.1 c-0.6-0.6-1.5-0.7-2.2-0.4c-0.7,0.3-1.2,1-1.2,1.8v28.8l-1.2-1.1c-2.4-2.3-6.2-2.3-8.5,0.1C59.6,33.5,59,35,59,36.6 c0,1.6,0.7,3.1,1.8,4.2l4.2,4H34.9l4.2-4c2.4-2.3,2.4-6.1,0.1-8.5c-1.1-1.1-2.6-1.8-4.2-1.8s-3.2,0.6-4.3,1.7l-1,0.9V4.4 c0-0.8-0.5-1.5-1.2-1.8c-0.8-0.3-1.6-0.1-2.2,0.4L2.2,25.1c-0.4,0.4-0.6,0.9-0.6,1.5v68.9c0,0.9,0.5,1.6,1.3,1.9 c0.2,0.1,0.5,0.1,0.7,0.1c0.6,0,1.2-0.3,1.6-0.8l24-29c0.2-0.2,0.3-0.4,0.4-0.7c0.2,0.2,0.4,0.5,0.6,0.7c1.1,1.1,2.6,1.8,4.3,1.8 c0,0,0,0,0,0c1.6,0,3-0.6,4.1-1.7c1.1-1.1,1.8-2.6,1.8-4.2c0-1.6-0.6-3.1-1.7-4.3l-4-4.2H65l-4,4.2c-1.1,1.2-1.7,2.7-1.7,4.3 c0,1.6,0.7,3.1,1.8,4.2c2.4,2.3,6.2,2.3,8.5-0.1c0.3-0.3,0.6-0.6,0.8-0.9c0.1,0.4,0.2,0.7,0.5,1l24,29c0.3,0.4,0.9,0.7,1.5,0.7h0.7 c0.8-0.3,1.3-1.1,1.3-1.9V26.7C98.4,26.1,98.2,25.6,97.8,25.2z M25.6,65.8L5.6,90V27.5l20-18.4v28c-0.1,0.1-0.2,0.2-0.3,0.3 l-1.8,1.7c-1.1,1.1-2.2,2.1-3.3,3.1c-1.1,1-2.3,2.1-3.4,3.2c-1.7,1.7-2.3,4.3-1.4,6.5c0.6,1.5,1.7,2.5,2.7,3.5l0.5,0.5 c0.8,0.7,1.5,1.5,2.3,2.2c0.6,0.6,1.1,1.1,1.7,1.7c1,1,2,2,3,3.1V65.8z M70.4,64.1c-0.7,0.7-1.3,1.4-2,2.2c-1.6,1.6-4.1,1.6-5.7,0.1 c-0.8-0.7-1.2-1.7-1.2-2.8c0-1,0.4-2,1.1-2.8l5.7-5.8c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6H32.4 c-0.4,0-0.7,0.2-0.9,0.6s-0.1,0.8,0.2,1.1l5.7,5.8c0.7,0.7,1.1,1.7,1.1,2.8c0,1.1-0.4,2.1-1.2,2.8c-0.7,0.7-1.7,1.1-2.8,1.1 s-2.1-0.5-2.8-1.2c-0.7-0.7-1.3-1.5-2-2.2c-1.4-1.5-2.7-2.9-4.1-4.2c-0.5-0.5-1-1-1.5-1.5c-0.6-0.6-1.1-1.1-1.7-1.7 c-0.8-0.7-1.5-1.4-2.3-2.2L19.6,54c-0.9-0.8-1.8-1.7-2.2-2.8c-0.6-1.5-0.3-3.2,0.9-4.3c1.1-1.1,2.3-2.1,3.4-3.2c1.1-1,2.2-2,3.3-3.1 l0.6-0.6l1.1-1.2c1-1,2-1.9,3-2.9c0.2-0.2,0.5-0.4,0.7-0.7l1.7-1.6c0.8-0.7,1.8-1.1,2.8-1.1c1.1,0,2.1,0.4,2.9,1.2 c1.5,1.6,1.5,4.2-0.1,5.7l-4.1,4l-1.8,1.8c-0.3,0.3-0.4,0.7-0.2,1.1c0.1,0.4,0.5,0.6,0.9,0.6h35.1c0.4,0,0.7-0.2,0.9-0.6 c0.2-0.4,0.1-0.8-0.2-1.1l-5.9-5.8c-0.8-0.7-1.2-1.8-1.2-2.8s0.4-2,1.1-2.8c1.6-1.6,4.1-1.6,5.7-0.1l1.7,1.6 c0.2,0.2,0.5,0.5,0.7,0.7c1,1,2,2,3,2.9l0.9,0.9l0.8,0.8c1.1,1.1,2.2,2.1,3.3,3.1c1.1,1,2.3,2.1,3.4,3.2c1.1,1.1,1.5,2.8,0.9,4.3 c-0.4,1.1-1.3,1.9-2.2,2.8L80,54.5c-0.8,0.7-1.5,1.5-2.3,2.2L76,58.4c-0.5,0.6-1.1,1.2-1.7,1.8C73,61.4,71.7,62.8,70.4,64.1z M94.3,90l-20-24.2v-3c1-1,2-2,2.9-2.9c0.6-0.6,1.1-1.2,1.7-1.7c0.8-0.8,1.6-1.5,2.3-2.3l0.5-0.5c1-1,2.1-2,2.7-3.5 c0.9-2.3,0.3-4.8-1.4-6.5c-1.1-1.1-2.2-2.1-3.4-3.2c-1.1-1-2.2-2.1-3.3-3.1l-1.7-1.7c-0.1-0.1-0.2-0.2-0.3-0.3v-28 c3.4,3,6.7,6.1,10,9.2l10,9.2V90z M83,45.4c-1.1-1.1-2.2-2.1-3.4-3.2c-1.1-1-2.2-2.1-3.3-3.1l-1.7-1.7c-0.1-0.1-0.2-0.2-0.3-0.3v2.7 l0.8,0.8c1.1,1.1,2.2,2.1,3.3,3.1c1.1,1,2.3,2.1,3.4,3.2c1.1,1.1,1.5,2.8,0.9,4.3c-0.4,1.1-1.3,1.9-2.2,2.8L80,54.5 c-0.8,0.7-1.5,1.5-2.3,2.2L76,58.4c-0.5,0.6-1.1,1.2-1.7,1.8v2.7c1-1,2-2,2.9-2.9c0.6-0.6,1.1-1.2,1.7-1.7c0.8-0.8,1.6-1.5,2.3-2.3 l0.5-0.5c1-1,2.1-2,2.7-3.5C85.3,49.6,84.7,47.1,83,45.4z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const orbit = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M84.8,52.4c-0.1,0.3-0.3,0.5-0.5,0.8l-0.2,0.2c0,0,0,0-0.1,0.1c-0.2,0.2-0.4,0.4-0.7,0.5 c-1.4,0.7-3,0.5-4.1-0.6l-5.3-5.1c-0.3-0.3-0.7-0.3-1.1-0.2c-0.4,0.1-0.6,0.5-0.6,0.9c-0.1,1.5-0.2,3-0.3,4.5 c-0.4,5.9-1.1,11.8-2.4,17.6C68,77.8,65.4,84.5,61.2,90c-0.1,0.1-0.2,0.2-0.3,0.3c-2.6,3.3-6,6.3-10.2,7.3c-0.9,0.2-1.9,0.3-2.9,0.3 c-5.3,0-10.3-3.7-14.5-10.1c-2.5-3.9-4.6-8.7-6.2-14.3c-0.2-0.8-0.5-1.6-0.7-2.4c0.5,0.1,1.1,0.3,1.7,0.4c1.3,0.3,2.7,0.7,4.1,1 C35.9,84.1,41.7,91,47.9,91c6.8,0,12.9-7.6,16.3-20.2c0,0,0,0,0-0.1c1.4-5.1,2.1-14,2.3-16.8c0-0.3,0.1-0.7,0.1-1 c0.1-1.5,0.1-2.8,0.2-4c0-0.4-0.2-0.8-0.6-0.9c-0.4-0.2-0.8-0.1-1.1,0.2L59.5,54c-0.6,0.6-1.5,1-2.4,1c-0.9,0-1.8-0.3-2.5-1 c-0.2-0.2-0.4-0.4-0.5-0.7c-0.2-0.3-0.3-0.5-0.4-0.8c-0.4-1.2-0.1-2.6,0.8-3.5l6.3-6.5c1-1,1.9-2,2.8-3.1l1.3-1.4l1.6-1.6 c1-1,2.5-1.3,3.8-0.8c1,0.4,1.7,1.1,2.5,1.9l0.9,0.9c0.2,0.2,0.4,0.4,0.7,0.7l2.4,2.4c2.2,2.2,4.6,4.6,7.2,6.9 C85.1,49.4,85.4,51,84.8,52.4z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M98,48.1c0,6.2-4.9,12.1-13.2,16.5c-3.3,1.7-7.1,3.2-11.3,4.5c-0.5,0.1-1,0.1-1.4-0.1 c0.4-1.7,0.7-3.4,0.9-5.3c1.8-0.5,3.9-1.3,6.1-2.3c1.9-0.9,3.6-1.9,5.1-2.8c0.3-0.2,0.6-0.5,0.9-0.7l0.1-0.1 c3.7-2.9,5.7-6.2,5.7-9.7c0-7.3-9.8-14.1-25-17.2l-0.4-0.1c-1.9-0.4-3.8-0.7-5.7-0.9c-5.6-0.7-11.2-0.8-16.7-0.3 c-3.4,0.3-6.6,0.8-9.7,1.5c0.1-0.5,0.3-1,0.4-1.5c0.1-0.4,0.2-0.7,0.3-1.1c0.3-1.1,0.7-2.1,1-3.1c2.7-0.5,5.5-0.8,8.2-1.1 c5.3-0.4,10.8-0.3,16.3,0.3l1.7,0.2c2.8,0.4,5.5,0.9,8.1,1.5c3.8,0.9,7.3,2,10.5,3.3C81,30,82,30.5,83,30.9c0.3,0.1,0.6,0.3,0.9,0.4 C92.8,35.8,98,41.8,98,48.1z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M68.1,24c-1.9-0.4-3.9-0.8-6-1.1C58.6,14.1,53.4,9,47.9,9s-10.8,5.5-14.4,15.1 c-0.1,0.3-0.2,0.6-0.3,0.9c-0.3,0.9-0.7,1.9-1,2.9c-0.1,0.4-0.2,0.8-0.3,1.1c-0.3,1-0.5,2-0.8,3.1c-0.6,2.6-1.1,5.3-1.4,8 c-0.7,5.6-0.8,11.2-0.3,16.7c0.2,2,0.4,3.9,0.7,5.8c-0.5-0.1-1-0.3-1.5-0.4c-1.4-0.4-2.8-0.9-4.1-1.4c-0.2-1.3-0.3-2.6-0.4-4.2 c-0.4-5.3-0.3-10.8,0.3-16.3c0.2-1.8,0.5-3.7,0.8-5.5c0.4-2.2,0.9-4.4,1.4-6.4c0.2-0.6,0.3-1.1,0.5-1.7c0.4-1.4,0.9-2.8,1.3-4.1 C33.1,9.8,40.3,2,47.9,2C56,2,63.6,10.4,68.1,24z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M61.7,70.2c0,0.1-0.1,0.2-0.1,0.3c-0.4,1-1.1,1.7-1.9,2.5l-0.5,0.5c-0.1,0.1-0.3,0.3-0.4,0.4L55.7,77 c-2.1,2.1-4.6,4.6-6.9,7.2c-1,1.1-2.6,1.4-4,0.8c-0.3-0.1-0.5-0.3-0.8-0.5c0,0-0.1-0.1-0.1-0.1c-1.4-1.4-1.4-3.6-0.1-5l5.1-5.3 c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6c-3.8,0-7.6-0.3-11.3-0.9c-1.1-0.2-2.2-0.4-3.4-0.6c-1.7-0.3-3.4-0.7-5-1.1 c-1-0.2-1.9-0.5-2.8-0.8C11,64.4,2,56.5,2,48.1c0-8,8.7-15.7,22.8-20.2c0,0,0,0,0,0c-0.5,2-1,4-1.4,6C14.3,37.5,9,42.7,9,48.1 c0,5.6,5.2,10.8,14.3,14.4c1.5,0.6,3.1,1.1,4.8,1.6c0.5,0.1,1,0.3,1.5,0.4c0.5,0.1,1,0.2,1.5,0.4c3.8,0.9,7.9,1.5,12.1,1.8 c0.4,0,0.7,0.1,1.1,0.1c1.5,0.1,2.8,0.1,4,0.2c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.7-5.5c-0.7-0.7-1.1-1.5-1.1-2.5 c0-0.7,0.2-1.3,0.5-1.9c0.2-0.3,0.4-0.5,0.5-0.6c0.4-0.4,0.9-0.7,1.1-0.8c0,0,0.2-0.1,0.4-0.1c1.2-0.4,2.6-0.1,3.5,0.8l6.5,6.3 c1,1,2.1,1.9,3.1,2.9l1.4,1.3c0.4,0.4,0.8,0.7,1.2,1.1l0.4,0.4C61.7,67.6,62.1,68.9,61.7,70.2z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M84.7,29.6c-0.3-0.1-0.6-0.3-0.9-0.4c-1-0.5-2.1-1-3.3-1.5c-3.1-1.3-6.5-2.4-10.2-3.3 C65.7,9.1,57.3,0,47.9,0c-8.5,0-16.4,8.3-21.3,21.9c-0.4,1.2-0.8,2.4-1.2,3.7C9.7,30.3,0,38.9,0,48.1c0,9.4,9.1,17.7,24.4,22.4 c0.3,1.2,0.6,2.4,1,3.5c1.7,5.8,3.9,10.8,6.4,14.9c4.5,7,10.2,11.1,16.1,11.1c10.3,0,19.5-11.4,23.7-29.1c0.4,0.1,0.8,0.2,1.3,0.2 c0.4,0,0.8-0.1,1.1-0.2c4.4-1.3,8.3-2.8,11.7-4.6c9-4.8,14.2-11.3,14.2-18.3C100,41.1,94.3,34.5,84.7,29.6z M27.1,26.7 c0.4-1.4,0.9-2.8,1.3-4.1C33.1,9.8,40.3,2,47.9,2c8.1,0,15.7,8.4,20.2,22c-1.9-0.4-3.9-0.8-6-1.1C58.6,14.1,53.4,9,47.9,9 s-10.8,5.5-14.4,15.1c-0.1,0.3-0.2,0.6-0.3,0.9c-0.3,0.9-0.7,1.9-1,2.9c-0.1,0.4-0.2,0.8-0.3,1.1c-0.3,1-0.5,2-0.8,3.1 c-0.6,2.6-1.1,5.3-1.4,8c-0.7,5.6-0.8,11.2-0.3,16.7c0.2,2,0.4,3.9,0.7,5.8c-0.5-0.1-1-0.3-1.5-0.4c-1.4-0.4-2.8-0.9-4.1-1.4 c-0.2-1.3-0.3-2.6-0.4-4.2c-0.4-5.3-0.3-10.8,0.3-16.3c0.2-1.8,0.5-3.7,0.8-5.5c0.4-2.2,0.9-4.4,1.4-6.4 C26.8,27.8,26.9,27.3,27.1,26.7z M2,48.1c0-8,8.7-15.7,22.8-20.2c0,0,0,0,0,0c-0.5,2-1,4-1.4,6C14.3,37.5,9,42.7,9,48.1 c0,5.6,5.2,10.8,14.3,14.4c1.5,0.6,3.1,1.1,4.8,1.6c0.5,0.1,1,0.3,1.5,0.4c0.5,0.1,1,0.2,1.5,0.4c3.8,0.9,7.9,1.5,12.1,1.8 c0.4,0,0.7,0.1,1.1,0.1c1.5,0.1,2.8,0.1,4,0.2c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.7-5.5c-0.7-0.7-1.1-1.5-1.1-2.5 c0-0.7,0.2-1.3,0.5-1.9c0.2-0.3,0.4-0.5,0.5-0.6c0.4-0.4,0.9-0.7,1.1-0.8c0,0,0.2-0.1,0.4-0.1c1.2-0.4,2.6-0.1,3.5,0.8l6.5,6.3 c1,1,2.1,1.9,3.1,2.9l1.4,1.3c0.4,0.4,0.8,0.7,1.2,1.1l0.4,0.4c0.9,0.9,1.3,2.2,0.9,3.5c0,0.1-0.1,0.2-0.1,0.3 c-0.4,1-1.1,1.7-1.9,2.5l-0.5,0.5c-0.1,0.1-0.3,0.3-0.4,0.4L55.7,77c-2.1,2.1-4.6,4.6-6.9,7.2c-1,1.1-2.6,1.4-4,0.8 c-0.3-0.1-0.5-0.3-0.8-0.5c0,0-0.1-0.1-0.1-0.1c-1.4-1.4-1.4-3.6-0.1-5l5.1-5.3c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6 c-3.8,0-7.6-0.3-11.3-0.9c-1.1-0.2-2.2-0.4-3.4-0.6c-1.7-0.3-3.4-0.7-5-1.1c-1-0.2-1.9-0.5-2.8-0.8C11,64.4,2,56.5,2,48.1z M69.5,71.1C68,77.8,65.4,84.5,61.2,90c-0.1,0.1-0.2,0.2-0.3,0.3c-2.6,3.3-6,6.3-10.2,7.3c-0.9,0.2-1.9,0.3-2.9,0.3 c-5.3,0-10.3-3.7-14.5-10.1c-2.5-3.9-4.6-8.7-6.2-14.3c-0.2-0.8-0.5-1.6-0.7-2.4c0.5,0.1,1.1,0.3,1.7,0.4c1.3,0.3,2.7,0.7,4.1,1 C35.9,84.1,41.7,91,47.9,91c6.8,0,12.9-7.6,16.3-20.2c0,0,0,0,0-0.1c1.4-5.1,2.1-14,2.3-16.8c0-0.3,0.1-0.7,0.1-1 c0.1-1.5,0.1-2.8,0.2-4c0-0.4-0.2-0.8-0.6-0.9c-0.4-0.2-0.8-0.1-1.1,0.2L59.5,54c-0.6,0.6-1.5,1-2.4,1c-0.9,0-1.8-0.3-2.5-1 c-0.2-0.2-0.4-0.4-0.5-0.7c-0.2-0.3-0.3-0.5-0.4-0.8c-0.4-1.2-0.1-2.6,0.8-3.5l6.3-6.5c1-1,1.9-2,2.8-3.1l1.3-1.4l1.6-1.6 c1-1,2.5-1.3,3.8-0.8c1,0.4,1.7,1.1,2.5,1.9l0.9,0.9c0.2,0.2,0.4,0.4,0.7,0.7l2.4,2.4c2.2,2.2,4.6,4.6,7.2,6.9c1.1,1,1.4,2.6,0.8,4 c-0.1,0.3-0.3,0.5-0.5,0.8l-0.2,0.2c0,0,0,0-0.1,0.1c-0.2,0.2-0.4,0.4-0.7,0.5c-1.4,0.7-3,0.5-4.1-0.6l-5.3-5.1 c-0.3-0.3-0.7-0.3-1.1-0.2c-0.4,0.1-0.6,0.5-0.6,0.9c-0.1,1.5-0.2,3-0.3,4.5C71.5,59.4,70.8,65.3,69.5,71.1z M84.8,64.6 c-3.3,1.7-7.1,3.2-11.3,4.5c-0.5,0.1-1,0.1-1.4-0.1c0.4-1.7,0.7-3.4,0.9-5.3c1.8-0.5,3.9-1.3,6.1-2.3c1.9-0.9,3.6-1.9,5.1-2.8 c0.3-0.2,0.6-0.5,0.9-0.7l0.1-0.1c3.7-2.9,5.7-6.2,5.7-9.7c0-7.3-9.8-14.1-25-17.2l-0.4-0.1c-1.9-0.4-3.8-0.7-5.7-0.9 c-5.6-0.7-11.2-0.8-16.7-0.3c-3.4,0.3-6.6,0.8-9.7,1.5c0.1-0.5,0.3-1,0.4-1.5c0.1-0.4,0.2-0.7,0.3-1.1c0.3-1.1,0.7-2.1,1-3.1 c2.7-0.5,5.5-0.8,8.2-1.1c5.3-0.4,10.8-0.3,16.3,0.3l1.7,0.2c2.8,0.4,5.5,0.9,8.1,1.5c3.8,0.9,7.3,2,10.5,3.3C81,30,82,30.5,83,30.9 c0.3,0.1,0.6,0.3,0.9,0.4C92.8,35.8,98,41.8,98,48.1C98,54.3,93.1,60.2,84.8,64.6z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const redlineFreehand = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M99.2,75.1L57.8,43.7c0.6-6.6-1.4-11.7-5.5-14c-4.1-2.2-8.7-0.8-12.2,0.8c-2,0.9-4.1,1.8-6.1,2.7 c-2.2,1-4.4,2-6.6,2.9l-0.3,0.1c-1.5,0.6-2.9,1.3-4.3,1.5c-1.9,0.4-2.2,0-2.2,0c-0.3-0.4,0.4-2,0.8-2.8l0.3-0.6 c1-2.1,2.3-4.1,3.4-5.8c0.3-0.5,0.7-1,1-1.5c0.5-0.7,1-1.4,1.4-2.1l0.1-0.2C31.3,19.2,38.9,7.4,30,1.3c-4.8-3.3-12.2,0.6-18.8,4.1 C8.9,6.6,5.5,8.4,4,8.7c0.1-0.4,0.2-1.2,0.8-2.5c0.5-1,0-2.2-1-2.6c-1-0.5-2.2,0-2.6,1c-1,2.2-2,5.2-0.2,7.1 c2.4,2.5,6.5,0.3,12.1-2.7c5-2.7,11.8-6.3,14.6-4.4c5.1,3.5,1.4,10.8-3.4,18.2l-0.1,0.2c-0.4,0.7-0.9,1.3-1.3,1.9 c-0.4,0.5-0.7,1.1-1.1,1.6c-1.2,1.8-2.6,4-3.7,6.3l-0.2,0.5c-0.8,1.7-2.2,4.5-0.4,6.9c1.8,2.4,5.1,1.8,6.2,1.6 c1.9-0.4,3.5-1.1,5.1-1.8l0.3-0.1c2.2-1,4.4-2,6.6-2.9c2-0.9,4-1.8,6.1-2.7c2.9-1.3,6.1-2.4,8.7-1c3.1,1.7,3.6,5.9,3.5,8.8 c-0.8,0.3-1.3,1.2-1.2,2L58,98.2c0.1,0.8,0.6,1.5,1.4,1.7c0.2,0.1,0.4,0.1,0.6,0.1c0.6,0,1.1-0.2,1.5-0.7l9.8-11.2l5.2,10.2 c0.2,0.5,0.7,0.8,1.2,1c0.5,0.2,1.1,0.1,1.6-0.2l9.6-5.4c0.5-0.3,0.8-0.7,1-1.2c0.1-0.5,0.1-1.1-0.2-1.5l-5.9-9.8l14.7-2.5 c0.8-0.1,1.4-0.7,1.6-1.5C100.1,76.4,99.8,75.6,99.2,75.1z M80.1,77.8c-0.7,0.1-1.2,0.5-1.5,1.1c-0.3,0.6-0.2,1.3,0.1,1.9l6.4,10.6 l-6,3.3l-5.6-11c-0.3-0.6-0.9-1-1.5-1.1c-0.1,0-0.2,0-0.2,0c-0.6,0-1.1,0.2-1.5,0.7l-8.7,9.9l-4.4-45l36,27.4L80.1,77.8z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const select = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M29.4,88.7c-0.2,0-0.4,0-0.5-0.1c-0.8-0.2-1.3-0.9-1.4-1.7l-9.7-73.4c-0.1-0.9,0.4-1.8,1.3-2.1 c0.2-0.1,0.5-0.1,0.7-0.1c0.4,0,0.8,0.1,1.1,0.4l60.4,42.7c0.7,0.5,1,1.3,0.8,2c-0.2,0.8-0.8,1.4-1.6,1.5l-20.9,4.3l9.1,14 c0.3,0.5,0.4,1,0.3,1.5c-0.1,0.5-0.5,1-0.9,1.3l-12.8,7.7c-0.5,0.3-1,0.4-1.5,0.2c-0.5-0.1-1-0.5-1.2-1l-8.1-14.5L31,88 C30.6,88.4,30,88.7,29.4,88.7z M44.8,66c0.1,0,0.1,0,0.2,0c0.7,0.1,1.2,0.4,1.6,1l8.5,15.3l9.2-5.6L54.8,62 c-0.4-0.6-0.4-1.3-0.2-1.9c0.3-0.6,0.8-1.1,1.4-1.2L75.3,55L22.4,17.6l8.5,64.3l12.4-15.2C43.6,66.2,44.2,66,44.8,66z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeTop = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.6,0H27.4c-0.6,0-1.2,0.3-1.6,0.8l-20.9,30c-0.2,0.3-0.4,0.7-0.4,1.1v66.2c0,1.1,0.9,1.9,1.9,1.9 h66.2c0.6,0,1.2-0.3,1.6-0.8l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V1.9C95.5,0.9,94.6,0,93.6,0z M73.6,67.2v-35l18-25.7v60.7H73.6z M8.4,32.8h18v35l-18,25.7V32.8z M28.3,32.8h43.3v34.3H28.3V32.8z M91,3.9l-18.9,27H28.3V4V3.9H91z M26.4,6.7v24.2H9.5L26.4,6.7z M9,96.1l18.9-27h43.8V96v0.1H9z M73.6,93.3V69.1h16.9L73.6,93.3z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M91,3.9c-20.9,0-41.8,0-62.7,0c-6.3,9-12.5,18-18.8,27 c20.9,0,41.7,0,62.6,0C78.4,21.9,84.7,12.9,91,3.9z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)" enable-background="new"/></svg>`;
const camera = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M70.2,0.7c-0.7-0.9-2-1-2.8-0.3L41,21.9c0,0,0,0,0,0L8.2,48.5c-0.5,0.4-0.7,0.9-0.7,1.5 c0,0.6,0.3,1.2,0.7,1.5l59.2,48c0.4,0.3,0.8,0.4,1.3,0.4c0.6,0,1.2-0.3,1.5-0.7c0.7-0.9,0.6-2.1-0.3-2.8L45.6,76.7 c8.7-6.1,14-16,14-26.7c0-10.7-5.3-20.7-14-26.7L69.9,3.5C70.8,2.8,70.9,1.6,70.2,0.7z M12.7,50l25.1-20.4c-2.6,4.9-5,11.7-5.1,19.9 c-0.1,8.7,2.5,15.9,5.2,20.9L12.7,50z M51.8,35.8c-2.8,4.4-4.2,9-4.3,13.8c-0.1,5.1,1.4,10,4.3,14.7c-2.3,3.9-5.4,7.3-9.4,9.8 c-3.1-4.4-7.9-13.1-7.8-24.5c0.1-10.8,4.4-18.9,7.8-23.6C46.3,28.4,49.5,31.8,51.8,35.8z" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="63" y="48.6" width="5.8" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="74.8" y="48.6" width="6" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="86.8" y="48.6" width="5.8" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const viewFace = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M68.3,96.1c-20.3,0-40.7,0-61,0c8.1-6.8,16.2-13.6,24.3-20.4c20.3,0,40.7,0,61,0 C84.5,82.5,76.4,89.3,68.3,96.1z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M99.9,73.1c-0.3-0.8-1-1.3-1.8-1.3H31c-0.5,0-0.9,0.2-1.3,0.5l-29,24.3c-0.6,0.5-0.9,1.4-0.6,2.2 c0.3,0.8,1,1.3,1.8,1.3H69c0.5,0,0.9-0.2,1.3-0.5l29-24.3C99.9,74.7,100.2,73.8,99.9,73.1z M68.3,96.1h-61l24.3-20.4h16.9v5.7h2.9 v-5.7h41.2L68.3,96.1z" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="48.6" y="63.6" width="2.9" height="6" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M0.7,62.6c0.8,0.7,2,0.5,2.7-0.3l19.8-24.4c5.8,8.3,15.2,13.5,25.3,14v5.7h2.9v-5.7 c10.2-0.5,19.6-5.7,25.3-14l19.8,24.4c0.4,0.5,0.9,0.7,1.5,0.7c0.4,0,0.9-0.1,1.2-0.4c0.8-0.7,1-1.9,0.3-2.7L51.5,0.7 c-0.7-0.9-2.3-0.9-3,0L0.4,59.9C-0.2,60.8-0.1,62,0.7,62.6z M50,4.9l20.6,25.4c-5-2.7-11.8-5.2-20.1-5.3c-0.2,0-0.3,0-0.5,0 c-8.6,0-15.6,2.5-20.6,5.3L50,4.9z M50.5,27c10.9,0.1,19.1,4.5,23.7,7.8c-2.5,3.9-5.9,7.2-9.9,9.4c-4.4-2.8-9.1-4.3-13.9-4.3 c-5.1-0.1-10,1.4-14.7,4.3c-4-2.3-7.4-5.5-9.9-9.4C30.2,31.7,38.9,26.9,50.5,27z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const viewIso = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M92,73L51,49.3V2c0-0.6-0.4-1-1-1s-1,0.4-1,1v47.3L8,73c-0.5,0.3-0.6,0.9-0.4,1.4 c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l41-23.7l41,23.7c0.2,0.1,0.3,0.1,0.5,0.1c0.3,0,0.7-0.2,0.9-0.5 C92.6,73.9,92.5,73.3,92,73z" opacity="0.5" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M93.6,25.9c0-0.3-0.1-0.7-0.3-1l0,0c-0.1-0.3-0.4-0.5-0.7-0.7C78.8,16.2,64.9,8.2,51,0.3 C50.8,0.2,50.5,0,50.2,0c-0.1,0-0.2,0-0.4,0c-0.2,0-0.5,0.1-0.8,0.3L7.4,24.1c0,0,0,0,0,0c0,0-0.4,0.3-0.7,0.7c0,0-0.3,0.4-0.3,1 c-0.1,0.8,0,20.8,0.1,48.1c0,0.7,0.4,1.4,1,1.7L49,99.7c0.1,0,0.2,0.1,0.3,0.1c0.3,0.1,0.5,0.1,0.7,0.1c0,0,0,0,0,0c0,0,0,0,0,0 c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.1,0.4-0.2c12.5-6.4,22.2-12.3,41.5-24.1c0.1-0.1,0.4-0.2,0.6-0.6c0.3-0.4,0.3-0.8,0.3-0.9 c0-0.1,0-0.2,0-0.3L93.6,25.9z M50,4.3l37.6,21.6L50,47.6L12.4,25.9L50,4.3z M52,51.1l37.6-21.7l-0.1,43.4L52,94.5V51.1z M48,94.5 L10.5,72.7l-0.1-43.4L48,51.1V94.5z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeBack = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><rect x="28.3" y="3.9" width="63.3" height="63.3" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/><path d="M93.6,0H27.4c-0.6,0-1.2,0.3-1.6,0.8L4.8,30.8c-0.2,0.3-0.4,0.7-0.4,1.1v66.2c0,1.1,0.9,1.9,1.9,1.9 h66.2c0.6,0,1.2-0.3,1.6-0.8l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V1.9C95.5,0.9,94.6,0,93.6,0z M73.6,67.2v-35l18-25.7v60.7H73.6z M8.4,32.8h18v35l-18,25.7V32.8z M28.3,32.8h43.3v34.3H28.3V32.8z M91,3.9l-18.9,27H28.3V4l0-0.1H91z M26.4,6.7v24.2H9.5L26.4,6.7z M9,96.1l18.9-27h43.8V96l0,0.1H9z M73.6,93.3V69.1h16.9L73.6,93.3z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const measureEdge = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M25.5,67.9v1.7L5.4,93.9V29.8c2.6-2.4,5.2-4.7,7.8-7.1 c0.5-0.5,1-0.9,1.5-1.4c0.2,0.4,0.5,0.8,0.8,1.2c1.6,1.5,4.2,1.5,5.7-0.1l4.2-4.3c0,1,0,2,0,3.1c0,1.6,0,3.2,0,4.8 c0,4.9,0,9.7,0,14.5c0,4.9,0,9.7,0,14.6C25.5,59.3,25.5,63.6,25.5,67.9z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M92,65.5c-0.4,1.1-1.3,1.9-2.2,2.8l-0.5,0.5c-0.8,0.8-1.7,1.7-2.5,2.5l-1.4,1.4 c-1.2,1.2-2.6,2.5-3.9,3.9c-1.2,1.3-2.5,2.6-3.8,3.9c-1.2,1.2-3,1.5-4.5,0.9c-0.4-0.2-0.9-0.5-1.2-0.8c-0.8-0.8-1.2-1.7-1.2-2.8 c0-0.2,0-0.4,0-0.6c0.1-0.8,0.5-1.6,1.1-2.2l4-4.1l1.3-1.3c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6H28.4V17.5 c0-0.4-0.2-0.7-0.6-0.9c-0.4-0.2-0.8-0.1-1.1,0.2l-1.3,1.3l-4.2,4.3c-1.5,1.6-4.1,1.6-5.7,0.1c-0.3-0.3-0.5-0.6-0.7-0.9 c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0c-0.2-0.5-0.3-1-0.3-1.6c0-1,0.4-2,1.1-2.8l7-7.1c1.1-1.1,2.1-2.2,3.2-3.3 c0.5-0.5,1-1,1.5-1.5c0.6-0.6,1.1-1.2,1.7-1.8c1.2-1.1,2.9-1.5,4.4-0.9c1.1,0.5,1.9,1.3,2.8,2.2c0.1,0.1,0.3,0.3,0.5,0.5 c0.9,0.8,1.7,1.6,2.5,2.4l1.5,1.5c2.3,2.4,5.1,5.1,7.9,7.6c0.8,0.8,1.2,1.7,1.2,2.8c0.1,1-0.4,2-1.1,2.8c-1.5,1.6-4.1,1.6-5.7,0.1 l-5.6-5.4c-0.3-0.3-0.7-0.4-1.1-0.2c-0.4,0.1-0.6,0.5-0.6,0.9v42.3c0,0.6,0.5,1,1,1h40c0.4,0,0.7-0.2,0.9-0.6 c0.2-0.4,0.1-0.8-0.2-1.1l-5.6-5.4c-0.8-0.8-1.2-1.7-1.2-2.8c-0.1-1,0.4-2,1.1-2.8c1.5-1.6,4.1-1.6,5.7-0.1l7.1,7 c1.1,1,2.3,2.1,3.4,3.1c1.2,1,2.3,2,3.4,3.1C92.2,62.3,92.6,64,92,65.5z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M92.5,59.7c-1.1-1.1-2.3-2.2-3.4-3.2c-1.1-1-2.2-2-3.3-3.1l-7.2-6.9c-2.4-2.3-6.2-2.3-8.5,0.1 c-1.1,1.2-1.7,2.7-1.7,4.3s0.6,3.1,1.8,4.2l3.8,3.7H37.6v-39l4,3.8c2.4,2.3,6.2,2.3,8.5-0.1c1.1-1.2,1.7-2.7,1.7-4.3 c-0.1-1.6-0.7-3.1-1.9-4.2c-2.8-2.5-5.6-5.2-7.9-7.5L40.5,6c-0.9-0.9-1.7-1.7-2.5-2.5c-0.2-0.2-0.3-0.3-0.5-0.5c-1-1-2-2-3.5-2.6 c-2.2-0.9-4.8-0.3-6.5,1.4c-1.1,1.1-2.1,2.2-3.2,3.3c-1.1,1.1-2.1,2.2-3.2,3.3l-7,7.1c-0.6,0.6-1,1.3-1.3,2.1L2,27.5 c-0.4,0.4-0.6,0.9-0.6,1.5v68.9c0,1.1,0.9,2,2,2h61c0.7,0,1.3-0.3,1.6-0.9l10.8-15.6c0.9-0.3,1.7-0.8,2.4-1.5 c2.5-2.8,5.3-5.5,7.6-7.8l4.4-4.4c1.1-1,2.1-2,2.7-3.5c0.3-0.8,0.4-1.5,0.4-2.3C94.3,62.4,93.7,60.8,92.5,59.7z M5.4,29.8l7.7-7.1 c0,0,0,0,0,0c0.3,0.5,0.6,0.9,1,1.3c2.4,2.3,6.2,2.3,8.5-0.1l2.7-2.7c0,1.6,0,3.2,0,4.8c0,4.9,0,9.7,0,14.5c0,4.9,0,9.7,0,14.6 c0,4.3,0,8.6,0,12.8v1.7L5.4,93.9V29.8z M63.3,95.9h-57l0.6-0.7L27,70.9h46l-2.5,2.6c-0.9,1-1.5,2.2-1.6,3.4v0 c0,0.3-0.1,0.5-0.1,0.8c0,1.6,0.6,3.1,1.8,4.2c0.5,0.4,1,0.8,1.5,1L63.3,95.9z M92,65.5c-0.4,1.1-1.3,1.9-2.2,2.8l-0.5,0.5 c-0.8,0.8-1.7,1.7-2.5,2.5l-1.4,1.4c-1.2,1.2-2.6,2.5-3.9,3.9c-1.2,1.3-2.5,2.6-3.8,3.9c-1.2,1.2-3,1.5-4.5,0.9 c-0.4-0.2-0.9-0.5-1.2-0.8c-0.8-0.8-1.2-1.7-1.2-2.8c0-0.2,0-0.4,0-0.6c0.1-0.8,0.5-1.6,1.1-2.2l4-4.1l1.3-1.3 c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.4-0.5-0.6-0.9-0.6H28.4V17.5c0-0.4-0.2-0.7-0.6-0.9c-0.4-0.2-0.8-0.1-1.1,0.2l-1.3,1.3l-4.2,4.3 c-1.5,1.6-4.1,1.6-5.7,0.1c-0.3-0.3-0.5-0.6-0.7-0.9c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0c-0.2-0.5-0.3-1-0.3-1.6 c0-1,0.4-2,1.1-2.8l7-7.1c1.1-1.1,2.1-2.2,3.2-3.3c0.5-0.5,1-1,1.5-1.5c0.6-0.6,1.1-1.2,1.7-1.8c1.2-1.1,2.9-1.5,4.4-0.9 c1.1,0.5,1.9,1.3,2.8,2.2c0.1,0.1,0.3,0.3,0.5,0.5c0.9,0.8,1.7,1.6,2.5,2.4l1.5,1.5c2.3,2.4,5.1,5.1,7.9,7.6 c0.8,0.8,1.2,1.7,1.2,2.8c0.1,1-0.4,2-1.1,2.8c-1.5,1.6-4.1,1.6-5.7,0.1l-5.6-5.4c-0.3-0.3-0.7-0.4-1.1-0.2 c-0.4,0.1-0.6,0.5-0.6,0.9v42.3c0,0.6,0.5,1,1,1h40c0.4,0,0.7-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.6-5.4 c-0.8-0.8-1.2-1.7-1.2-2.8c-0.1-1,0.4-2,1.1-2.8c1.5-1.6,4.1-1.6,5.7-0.1l7.1,7c1.1,1,2.3,2.1,3.4,3.1c1.2,1,2.3,2,3.4,3.1 C92.2,62.3,92.6,64,92,65.5z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const orthoView = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M28.4,4h62.5L72.1,30.9H9.6L28.4,4z M8.5,96 V32.9h63.1v63.1l0,0.1H8.5z M73.6,93.1V32.2L91.5,6.6v60.9L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const redlineNote = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M60,100c-0.2,0-0.4,0-0.6-0.1c-0.8-0.2-1.3-0.9-1.4-1.7l-5.3-54c-0.1-0.9,0.4-1.7,1.2-2.1 c0.3-0.1,0.5-0.2,0.8-0.1c0.4,0,0.8,0.1,1.2,0.4l43.2,32.8c0.6,0.5,0.9,1.3,0.7,2.1c-0.2,0.8-0.8,1.4-1.6,1.5l-14.6,2.5l5.9,9.8 c0.3,0.5,0.4,1,0.2,1.6c-0.1,0.5-0.5,1-1,1.2l-9.5,5.3c-0.5,0.3-1,0.3-1.6,0.2c-0.5-0.2-1-0.5-1.2-1l-5.2-10.1l-9.8,11.1 C61.1,99.8,60.6,100,60,100z M71.7,82.6c0.1,0,0.2,0,0.2,0c0.7,0.1,1.2,0.5,1.5,1.1l5.6,10.9l5.9-3.3l-6.3-10.5 c-0.3-0.6-0.4-1.3-0.1-1.9c0.3-0.6,0.8-1,1.5-1.1l12.9-2.2L57.2,48.4l4.4,44.8l8.7-9.9C70.6,82.9,71.2,82.6,71.7,82.6z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M45,43.1c0-1.5-1.2-2.8-2.8-2.8H37V13.7c0-5.6-3.8-8.8-6.7-10.8c-5-3.4-10.8-2.9-13-2.7 c-2.4,0.2-8,0.7-12,5.1c-1.5,1.6-2.5,3.5-3.1,5.6c-0.4,1.5,0.4,3,1.9,3.5c1.5,0.4,3-0.4,3.4-1.9c0.4-1.3,1-2.4,1.9-3.3 c2.6-2.8,6.6-3.1,8.5-3.3c1.8-0.2,6-0.5,9.4,1.8c3.1,2.1,4.3,3.9,4.3,6.2v7.8C20.1,16,9,15.8,3.8,21.3c-5.2,5.6-5,15.2,0.4,20.8 c2.7,2.8,6.8,4.2,11.6,4.2c4.7,0,10.2-1.4,15.7-4c0.3,2,2,3.6,4.1,3.6h6.5C43.7,45.9,45,44.7,45,43.1z M8.2,38.2 c-3.4-3.5-3.6-9.6-0.3-13.1c3-3.3,11.6-3.4,21.4,1.4c1.4,0.7,2.2,2.1,2.2,3.6v3.4c0,1.5-0.9,2.9-2.3,3.6 C19.7,41.8,11.4,41.5,8.2,38.2z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const settings = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M50,70.3c-11.2,0-20.3-9.1-20.3-20.3c0-11.2,9.1-20.3,20.3-20.3c11.2,0,20.3,9.1,20.3,20.3 C70.3,61.2,61.2,70.3,50,70.3z M50,33.7c-9,0-16.3,7.3-16.3,16.3S41,66.3,50,66.3S66.3,59,66.3,50S59,33.7,50,33.7z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M50,100c-5.5,0-9.9-4.4-9.9-9.9v-5.2c-2.7-0.8-5.3-1.8-7.7-3.2l-3.7,3.7c-1.9,1.9-4.4,2.9-7,2.9 s-5.1-1-7-2.9c-1.9-1.9-2.9-4.4-2.9-7c0-2.6,1-5.1,2.9-7l3.7-3.7c-1.4-2.4-2.4-5-3.2-7.7H9.9C4.4,59.9,0,55.5,0,50s4.4-9.9,9.9-9.9 h5.2c0.8-2.7,1.8-5.3,3.2-7.7l-3.7-3.7c-3.9-3.9-3.9-10.1,0-14s10.1-3.9,14,0l3.7,3.7c2.4-1.4,5-2.4,7.7-3.2V9.9 C40.1,4.4,44.5,0,50,0s9.9,4.4,9.9,9.9v5.2c2.7,0.8,5.3,1.8,7.7,3.2l3.7-3.7c1.9-1.9,4.4-2.9,7-2.9c2.6,0,5.1,1,7,2.9 c1.9,1.9,2.9,4.4,2.9,7s-1,5.1-2.9,7l-3.7,3.7c1.4,2.4,2.4,5,3.2,7.7h5.2c5.5,0,9.9,4.4,9.9,9.9s-4.4,9.9-9.9,9.9h-5.2 c-0.8,2.7-1.8,5.3-3.2,7.7l3.7,3.7c1.9,1.9,2.9,4.4,2.9,7c0,2.6-1,5.1-2.9,7c-1.9,1.9-4.4,2.9-7,2.9c-2.6,0-5.1-1-7-2.9l-3.7-3.7 c-2.4,1.4-5,2.4-7.7,3.2v5.2C59.9,95.6,55.5,100,50,100z M32,77.2c0.4,0,0.7,0.1,1,0.3c2.9,1.8,6.1,3.1,9.5,3.9 c0.9,0.2,1.5,1,1.5,1.9v6.8c0,3.3,2.7,5.9,5.9,5.9c3.3,0,5.9-2.7,5.9-5.9v-6.8c0-0.9,0.6-1.7,1.5-1.9c3.4-0.8,6.5-2.1,9.5-3.9 c0.8-0.5,1.8-0.4,2.5,0.3l4.8,4.8c1.1,1.1,2.6,1.7,4.2,1.7c1.6,0,3.1-0.6,4.2-1.7c1.1-1.1,1.7-2.6,1.7-4.2c0-1.6-0.6-3.1-1.7-4.2 l-4.8-4.8c-0.7-0.7-0.8-1.7-0.3-2.5c1.8-2.9,3.1-6.1,3.9-9.5c0.2-0.9,1-1.5,1.9-1.5h6.8c3.3,0,5.9-2.7,5.9-5.9 c0-3.3-2.7-5.9-5.9-5.9h-6.8c-0.9,0-1.7-0.6-1.9-1.5c-0.8-3.4-2.1-6.5-3.9-9.5c-0.5-0.8-0.4-1.8,0.3-2.5l4.8-4.8 c1.1-1.1,1.7-2.6,1.7-4.2s-0.6-3.1-1.7-4.2c-1.1-1.1-2.6-1.7-4.2-1.7c-1.6,0-3.1,0.6-4.2,1.7l-4.8,4.8c-0.7,0.7-1.7,0.8-2.5,0.3 c-2.9-1.8-6.1-3.1-9.5-3.9c-0.9-0.2-1.5-1-1.5-1.9V9.9C55.9,6.6,53.3,4,50,4c-3.3,0-5.9,2.7-5.9,5.9v6.8c0,0.9-0.6,1.7-1.5,1.9 c-3.4,0.8-6.5,2.1-9.5,3.9c-0.8,0.5-1.8,0.4-2.5-0.3l-4.8-4.8c-2.3-2.3-6.1-2.3-8.4,0c-2.3,2.3-2.3,6.1,0,8.4l4.8,4.8 c0.7,0.7,0.8,1.7,0.3,2.5c-1.8,2.9-3.1,6.1-3.9,9.5c-0.2,0.9-1,1.5-1.9,1.5H9.9C6.6,44.1,4,46.7,4,50c0,3.3,2.7,5.9,5.9,5.9h6.8 c0.9,0,1.7,0.6,1.9,1.5c0.8,3.4,2.1,6.5,3.9,9.5c0.5,0.8,0.4,1.8-0.3,2.5l-4.8,4.8c-1.1,1.1-1.7,2.6-1.7,4.2c0,1.6,0.6,3.1,1.7,4.2 c1.1,1.1,2.6,1.7,4.2,1.7s3.1-0.6,4.2-1.7l4.8-4.8C31,77.4,31.5,77.2,32,77.2z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cameraTurntable = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M98,45c0,8.7-9.4,16.7-24.5,21c-1,0.3-2.1-0.2-2.6-1.2c-0.1-0.3-0.2-0.7-0.2-1.3 c0-0.5,0.1-0.9,0.2-1.2c0.4-0.8,1-1.4,1.8-1.6C84.2,57.3,91,51.4,91,45c0-8.4-12.8-15.9-31.1-18.2h-0.1v-5.3C81.9,24.2,98,34,98,45z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M61.8,66c0,0.5-0.1,0.9-0.3,1.3c-0.4,1-1.1,1.7-1.9,2.5l-4,4C53.5,76,51,78.5,48.7,81 c-1,1.1-2.6,1.4-4,0.7c-0.3-0.1-0.5-0.3-0.8-0.5l-0.1-0.1c-1.4-1.3-1.4-3.6-0.1-5l5.1-5.3c0.3-0.3,0.4-0.7,0.2-1.1 c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.1-0.4-0.1c-0.4,0-2.2-0.1-4.7-0.2c-11.8-0.8-22.2-3.8-29.6-8.1c0,0,0,0,0,0 c-0.5-0.3-0.9-0.5-1.3-0.8c-1-0.6-1.9-1.2-2.8-1.9c-0.3-0.2-0.6-0.5-0.9-0.7c0,0,0,0,0,0c-0.4-0.3-0.7-0.6-1-0.9C4.1,53,2,49.1,2,45 c0-6.5,5.6-12.6,14.7-17c7.1-3.4,16.3-5.9,26.6-6.8v5.2h-0.1C23.4,28.3,9,36.1,9,45c0,9.3,14.4,17.1,34.2,18.6h0.1v0 c0.4,0,0.6,0.1,1,0.1c1.5,0.1,2.8,0.1,4,0.2c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.7-5.5c-0.7-0.6-1.1-1.5-1.1-2.5 c0-0.7,0.2-1.3,0.5-1.9c0.2-0.3,0.4-0.5,0.5-0.6c0.4-0.4,0.9-0.7,1.2-0.8c0,0,0.2-0.1,0.3-0.1c1.2-0.4,2.6-0.1,3.5,0.8l6.5,6.2 c1,1,2,1.9,3.1,2.8l1.4,1.3c0.5,0.5,1.1,1,1.6,1.5C61.4,64.1,61.8,65.1,61.8,66z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M59.9,19.6L59.8,11c0-0.7-0.3-2.5-1.9-4c-1.5-1.4-3.7-1.7-5.8-1.7c-2.5,0-5.1,0.1-6.9,1.7 c-1.6,1.5-1.9,3.3-1.9,4v8.3h-0.1c-10.5,0.8-19.9,3.4-27.3,7l0,0C6.1,31.1,0,37.8,0,45c0,13,18.6,24.1,43.2,25.8h0.1v2.7l-1.1,1.1 c-2.1,2.2-2,5.7,0.1,7.8l0.1,0.1c0.1,0.1,0.1,0.1,0.2,0.2c0.2,0.2,0.4,0.4,0.6,0.5v4.3c0,4,3.7,7.2,8.2,7.2s8.2-3.2,8.2-7.2v-15 c0.1-0.1,0.3-0.3,0.4-0.4l0.9-0.9c0.9-0.9,1.9-1.8,2.4-3.2c0.2-0.7,0.4-1.3,0.4-2v-0.1c0-1.4-0.6-2.8-1.7-3.9l-0.4-0.4 c-0.4-0.4-0.8-0.8-1.3-1.2l-0.7-0.6v-31C76.7,31,89,37.8,89,45c0,5.5-6.3,10.6-16.8,13.8c-1.4,0.4-2.5,1.4-3.1,2.7 c-0.4,0.9-0.4,1.9-0.4,2c0,0.9,0.2,1.7,0.4,2.1c0.7,1.5,2.2,2.5,3.8,2.5c0.4,0,0.8-0.1,1.1-0.2c16.1-4.5,26-13.3,26-22.9 C100,33,83.1,22.3,59.9,19.6z M51.6,6C55.1,6,58,7.5,58,9.4s-2.9,3.5-6.5,3.5S45,11.3,45,9.4C45.1,7.5,48,6,51.6,6z M60.8,63.4 c0.6,0.7,1,1.7,1,2.6c0,0.5-0.1,0.9-0.3,1.3c-0.4,1-1.1,1.7-1.9,2.5l-4,4C53.5,76,51,78.5,48.7,81c-1,1.1-2.6,1.4-4,0.7 c-0.3-0.1-0.5-0.3-0.8-0.5l-0.1-0.1c-1.4-1.3-1.4-3.6-0.1-5l5.1-5.3c0.3-0.3,0.4-0.7,0.2-1.1c-0.1-0.2-0.3-0.4-0.5-0.5 c-0.2-0.1-0.4-0.1-0.4-0.1c-0.4,0-2.2-0.1-4.7-0.2c-11.8-0.8-22.2-3.8-29.6-8.1c0,0,0,0,0,0c-0.5-0.3-0.9-0.5-1.3-0.8 c-1-0.6-1.9-1.2-2.8-1.9c-0.3-0.2-0.6-0.5-0.9-0.7c0,0,0,0,0,0c-0.4-0.3-0.7-0.6-1-0.9C4.1,53,2,49.1,2,45c0-6.5,5.6-12.6,14.7-17 c7.1-3.4,16.3-5.9,26.6-6.8v5.2h-0.1C23.4,28.3,9,36.1,9,45c0,9.3,14.4,17.1,34.2,18.6h0.1v0c0.4,0,0.6,0.1,1,0.1 c1.5,0.1,2.8,0.1,4,0.2c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.7-5.5c-0.7-0.6-1.1-1.5-1.1-2.5c0-0.7,0.2-1.3,0.5-1.9 c0.2-0.3,0.4-0.5,0.5-0.6c0.4-0.4,0.9-0.7,1.2-0.8c0,0,0.2-0.1,0.3-0.1c1.2-0.4,2.6-0.1,3.5,0.8l6.5,6.2c1,1,2,1.9,3.1,2.8l1.4,1.3 C59.7,62.4,60.3,62.9,60.8,63.4z M42,58l1.4,1.4v2.2C24.9,60.3,11,53.1,11,45c0-7.8,13.9-14.9,32.3-16.5v20.6 c-0.1,0-0.2,0.1-0.3,0.1c0,0-0.7,0.4-1.2,1c-0.4,0.4-1.5,1.8-1.5,3.9C40.3,55.6,40.9,57,42,58z M73.5,66c-1,0.3-2.1-0.2-2.6-1.2 c-0.1-0.3-0.2-0.7-0.2-1.3c0-0.5,0.1-0.9,0.2-1.2c0.4-0.8,1-1.4,1.8-1.6C84.2,57.3,91,51.4,91,45c0-8.4-12.8-15.9-31.1-18.2h-0.1 v-5.3C81.9,24.2,98,34,98,45C98,53.7,88.6,61.7,73.5,66z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeFront = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M73.6,67.1V32.2L91.5,6.6v60.5H73.6z M8.5,32.9h17.9v34.9L8.5,93.4V32.9z M28.4,32.9h43.2v34.2H28.4V32.9z M90.9,4L72.1,30.9H28.4V4.1l0-0.1H90.9z M26.4,6.9v24H9.6 L26.4,6.9z M9.1,96l18.8-26.9h43.7v26.8l0,0.1H9.1z M73.6,93.1v-24h16.8L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M71.6,96c-21,0-42.1,0-63.1,0c0-21,0-42.1,0-63.1c21,0,42.1,0,63.1,0 C71.6,53.9,71.6,75,71.6,96z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/></svg>`;
const cubeWireframe = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M73.6,67.1V32.2L91.5,6.6v60.5H73.6z M8.5,32.9h17.9v34.9L8.5,93.4V32.9z M28.4,32.9h43.2v34.2H28.4V32.9z M90.9,4L72.1,30.9H28.4V4.1l0-0.1H90.9z M26.4,6.9v24H9.6 L26.4,6.9z M9.1,96l18.8-26.9h43.7v26.8l0,0.1H9.1z M73.6,93.1v-24h16.8L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeLeft = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M8.5,93.4c6-8.5,11.9-17.1,17.9-25.6c0-20.3,0-40.6,0-60.9c-6,8.5-11.9,17.1-17.9,25.6 C8.5,52.8,8.5,73.1,8.5,93.4z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M73.6,67.1V32.2L91.5,6.6v60.5H73.6z M8.5,32.9h17.9v34.9L8.5,93.4V32.9z M28.4,32.9h43.2v34.2H28.4V32.9z M90.9,4L72.1,30.9H28.4V4.1l0-0.1H90.9z M26.4,6.9v24H9.6 L26.4,6.9z M9.1,96l18.8-26.9h43.7v26.8l0,0.1H9.1z M73.6,93.1v-24h16.8L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const measurePoint = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M81.5,74.9c-1.1,1.1-2.1,2.2-3.2,3.2L75,81.4l-6.9,7.2c-0.7,0.8-1.7,1.2-2.8,1.2 c-1.1,0-2.1-0.4-2.8-1.1c-1.6-1.5-1.6-4.1-0.1-5.7l5.3-5.5c0.3-0.3,0.4-0.7,0.2-1.1s-0.5-0.6-0.9-0.6H33c-0.4,0-0.7,0.2-0.9,0.6 s-0.1,0.8,0.2,1.1l5.3,5.5c1.5,1.6,1.5,4.2-0.1,5.7c-0.7,0.7-1.7,1.1-2.8,1.1c-1.1,0-2.1-0.4-2.8-1.2L25,81.4l-3.3-3.3 c-1.1-1-2.1-2.1-3.2-3.2c-1.1-1.2-1.4-2.9-0.8-4.4c0.3-0.9,0.8-1.3,2.3-2.7c1.4-1.3,2.5-2.3,3.2-2.9l1.4-1.4 c2.4-2.2,5.3-4.9,7.9-7.6c0.6-0.6,1.6-1.1,2.8-1.1c1,0,1.8,0.4,1.9,0.4c0,0,0.6,0.3,1.1,0.8c1.5,1.6,1.5,4.2-0.1,5.7l-5.6,5.4 c-0.3,0.3-0.4,0.7-0.2,1.1c0.1,0.4,0.5,0.6,0.9,0.6h33.4c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.6-5.4 c-1.6-1.5-1.6-4.1-0.1-5.7c0.4-0.5,1.1-0.8,1.1-0.8c0.1-0.1,0.9-0.5,1.9-0.4c1.2,0,2.2,0.5,2.8,1.1c2.6,2.7,5.5,5.4,7.9,7.6l1.4,1.4 c0.7,0.6,1.8,1.6,3.2,2.9c1.5,1.4,2,1.8,2.3,2.7C82.9,72,82.6,73.7,81.5,74.9z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M84,69.8c-0.5-1.1-1.4-2-2.8-3.4c-0.3-0.3-1.2-1.1-1.8-1.7c-0.5-0.5-1-0.9-1.3-1.2l-1.5-1.4 c-2.4-2.2-5.2-4.9-7.8-7.6c-1.2-1.1-2.7-1.8-4.3-1.7c-1.6,0-3.1,0.7-4.2,1.8c-2.3,2.4-2.2,6.2,0.2,8.5l3.8,3.6H35.7l3.8-3.6 c2.4-2.3,2.5-6.1,0.2-8.5c-1.1-1.1-2.6-1.8-4.2-1.8c-1.6-0.1-3.1,0.6-4.3,1.7c-2.6,2.7-5.4,5.4-7.8,7.6l-1.5,1.4 c-0.3,0.3-0.8,0.7-1.3,1.2c-0.6,0.6-1.5,1.4-1.8,1.7c-1.4,1.4-2.3,2.3-2.8,3.4c-0.9,2.2-0.5,4.8,1.2,6.5l3.3,3.3 c1.1,1,2.1,2.1,3.2,3.2l6.9,7.2c1.1,1.1,2.6,1.8,4.3,1.8c1.6,0,3-0.6,4.2-1.7c2.4-2.3,2.5-6.1,0.2-8.5l-3.7-3.8h28.8l-3.7,3.8 c-2.3,2.4-2.2,6.2,0.2,8.5c1.2,1.1,2.6,1.7,4.2,1.7c1.7,0,3.2-0.7,4.3-1.8l6.9-7.2c1.1-1.1,2.1-2.2,3.2-3.2l3.3-3.3 C84.5,74.6,84.9,72,84,69.8z M81.5,74.9c-1.1,1.1-2.1,2.2-3.2,3.2L75,81.4l-6.9,7.2c-0.7,0.8-1.7,1.2-2.8,1.2 c-1.1,0-2.1-0.4-2.8-1.1c-1.6-1.5-1.6-4.1-0.1-5.7l5.3-5.5c0.3-0.3,0.4-0.7,0.2-1.1s-0.5-0.6-0.9-0.6H33c-0.4,0-0.7,0.2-0.9,0.6 s-0.1,0.8,0.2,1.1l5.3,5.5c1.5,1.6,1.5,4.2-0.1,5.7c-0.7,0.7-1.7,1.1-2.8,1.1c-1.1,0-2.1-0.4-2.8-1.2L25,81.4l-3.3-3.3 c-1.1-1-2.1-2.1-3.2-3.2c-1.1-1.2-1.4-2.9-0.8-4.4c0.3-0.9,0.8-1.3,2.3-2.7c1.4-1.3,2.5-2.3,3.2-2.9l1.4-1.4 c2.4-2.2,5.3-4.9,7.9-7.6c0.6-0.6,1.6-1.1,2.8-1.1c1,0,1.8,0.4,1.9,0.4c0,0,0.6,0.3,1.1,0.8c1.5,1.6,1.5,4.2-0.1,5.7l-5.6,5.4 c-0.3,0.3-0.4,0.7-0.2,1.1c0.1,0.4,0.5,0.6,0.9,0.6h33.4c0.4,0,0.8-0.2,0.9-0.6c0.2-0.4,0.1-0.8-0.2-1.1l-5.6-5.4 c-1.6-1.5-1.6-4.1-0.1-5.7c0.4-0.5,1.1-0.8,1.1-0.8c0.1-0.1,0.9-0.5,1.9-0.4c1.2,0,2.2,0.5,2.8,1.1c2.6,2.7,5.5,5.4,7.9,7.6l1.4,1.4 c0.7,0.6,1.8,1.6,3.2,2.9c1.5,1.4,2,1.8,2.3,2.7C82.9,72,82.6,73.7,81.5,74.9z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M96,26.4c0,7.9-6.4,14.2-14.3,14.2c-7.9,0-14.2-6.4-14.2-14.2 s6.4-14.2,14.2-14.2S96,18.5,96,26.4z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M32.4,26.4c0,7.8-6.3,14.2-14.1,14.2C10.4,40.6,4,34.2,4,26.4 s6.4-14.2,14.2-14.2S32.4,18.6,32.4,26.4z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M81.7,8.1c-9.4,0-17.1,7.1-18.1,16.3H36.4c-1-9.1-8.8-16.3-18.1-16.3C8.2,8.1,0,16.3,0,26.4 s8.2,18.3,18.3,18.3c9.4,0,17.1-7.1,18.1-16.3h27.2c1,9.1,8.8,16.3,18.1,16.3c10.1,0,18.3-8.2,18.3-18.3S91.8,8.1,81.7,8.1z M18.3,40.6C10.4,40.6,4,34.2,4,26.4s6.4-14.2,14.2-14.2s14.2,6.4,14.2,14.2S26.1,40.6,18.3,40.6z M81.7,40.6 c-7.9,0-14.2-6.4-14.2-14.2s6.4-14.2,14.2-14.2S96,18.5,96,26.4S89.6,40.6,81.7,40.6z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const wireframeShaded = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M73.6,93.1c6-8.5,11.9-17.1,17.9-25.6c0-20.3,0-40.6,0-60.9c-6,8.5-11.9,17.1-17.9,25.6 C73.6,52.5,73.6,72.8,73.6,93.1z" opacity="0.5" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M71.6,96c-21,0-42.1,0-63.1,0c0-21,0-42.1,0-63.1c21,0,42.1,0,63.1,0 C71.6,53.9,71.6,75,71.6,96z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M28.4,4c20.8,0,41.6,0,62.5,0c-6.3,9-12.5,17.9-18.8,26.9 c-20.8,0-41.6,0-62.5,0C15.9,21.9,22.2,13,28.4,4z" opacity="5.000000e-02" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M28.4,4h62.5L72.1,30.9H9.6L28.4,4z M8.5,96 V32.9h63.1v63.1l0,0.1H8.5z M73.6,93.1V32.2L91.5,6.6v60.9L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const noWireframeShaded = w`<svg x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 27.400391 0 C 26.700391 0 26.100781 0.30039061 25.800781 0.90039062 L 4.9003906 30.699219 C 4.7003906 30.999219 4.5 31.400781 4.5 31.800781 L 4.5 98 C 4.5 99.1 5.4 100 6.5 100 L 72.599609 100 C 73.299609 100 73.899219 99.699609 74.199219 99.099609 L 95.099609 69.199219 C 95.299609 68.899219 95.5 68.499609 95.5 68.099609 L 95.5 2 C 95.5 0.9 94.6 0 93.5 0 L 27.400391 0 z M 29.283203 3.4550781 L 90.1875 3.4550781 C 91.201053 3.4550781 92.03125 4.2917864 92.03125 5.3144531 L 92.03125 66.765625 C 92.03125 67.137504 91.846391 67.510154 91.662109 67.789062 L 72.404297 95.587891 C 72.127874 96.14571 71.574675 96.423828 70.929688 96.423828 L 10.025391 96.423828 C 9.0118375 96.423828 8.1816406 95.58712 8.1816406 94.564453 L 8.1816406 33.019531 C 8.1816406 32.647652 8.3664988 32.275003 8.5507812 31.996094 L 27.808594 4.2910156 C 28.085017 3.7331974 28.638215 3.4550781 29.283203 3.4550781 z " fill="var(--hoops-svg-stroke-color, #303030)"/><path d="m 71.963148,95.757578 c 6,-8.5 14.052,-20.000003 20.052,-28.500003 V 3.7575752 c -6,8.4999998 -14.052,19.4299998 -20.052,27.9299998 z" opacity="0.5" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M 71.963148,95.757578 H 8.0151479 v -64.0697 l 63.9480001,-3.03e-4 z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="m 27.915148,3.7575752 h 64.1 c -6.3,8.9999998 -13.752,18.9299998 -20.052,27.9299998 H 8.0151479 c 6.3000001,-9 13.7000001,-18.93 19.9000001,-27.9299998 z" opacity="0.05" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const toonShader = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M73.6,93.1c6-8.5,11.9-17.1,17.9-25.6c0-20.3,0-40.6,0-60.9c-6,8.5-11.9,17.1-17.9,25.6 C73.6,52.5,73.6,72.8,73.6,93.1z" opacity=".9" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M71.6,96c-21,0-42.1,0-63.1,0c0-21,0-42.1,0-63.1c21,0,42.1,0,63.1,0 C71.6,53.9,71.6,75,71.6,96z" opacity="0.75" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M28.4,4c20.8,0,41.6,0,62.5,0c-6.3,9-12.5,17.9-18.8,26.9 c-20.8,0-41.6,0-62.5,0C15.9,21.9,22.2,13,28.4,4z" opacity="0.5" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M28.4,4h62.5L72.1,30.9H9.6L28.4,4z M8.5,96 V32.9h63.1v63.1l0,0.1H8.5z M73.6,93.1V32.2L91.5,6.6v60.9L73.6,93.1z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const goochShader = w`<svg x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path d="M 27.400391 0 C 26.700391 0 26.100781 0.30039061 25.800781 0.90039062 L 4.9003906 30.699219 C 4.7003906 30.999219 4.5 31.400781 4.5 31.800781 L 4.5 98 C 4.5 99.1 5.4 100 6.5 100 L 72.599609 100 C 73.299609 100 73.899219 99.699609 74.199219 99.099609 L 95.099609 69.199219 C 95.299609 68.899219 95.5 68.499609 95.5 68.099609 L 95.5 2 C 95.5 0.9 94.6 0 93.5 0 L 27.400391 0 z M 29.283203 3.4550781 L 90.1875 3.4550781 C 91.201053 3.4550781 92.03125 4.2917864 92.03125 5.3144531 L 92.03125 66.765625 C 92.03125 67.137504 91.846391 67.510154 91.662109 67.789062 L 72.404297 95.587891 C 72.127874 96.14571 71.574675 96.423828 70.929688 96.423828 L 10.025391 96.423828 C 9.0118375 96.423828 8.1816406 95.58712 8.1816406 94.564453 L 8.1816406 33.019531 C 8.1816406 32.647652 8.3664988 32.275003 8.5507812 31.996094 L 27.808594 4.2910156 C 28.085017 3.7331974 28.638215 3.4550781 29.283203 3.4550781 z " fill="var(--hoops-svg-stroke-color, #303030)"/><path d="m 71.963148,95.757578 c 6,-8.5 14.052,-20.000003 20.052,-28.500003 V 3.7575752 c -6,8.4999998 -14.052,19.4299998 -20.052,27.9299998 z" opacity="1" fill="#9A9F71"/><path d="M 71.963148,95.757578 H 8.0151479 v -64.0697 l 63.9480001,-3.03e-4 z" opacity="1" fill="#887590"/><path d="m 27.915148,3.7575752 h 64.1 c -6.3,8.9999998 -13.752,18.9299998 -20.052,27.9299998 H 8.0151479 c 6.3000001,-9 13.7000001,-18.93 19.9000001,-27.9299998 z" opacity="1" fill="#47A96C"/></svg>`;
const xRayShader = w`<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><rect style="fill:var(--hoops-svg-stroke-color, #303030);fill-opacity:0.443548;stroke-width:1.00183;stroke-linejoin:round;stroke-miterlimit:3" id="rect1" width="100" height="100" x="0" y="0"/><path d="M 87.006948,8.4001837 H 31.431709 c -0.588543,0 -1.093008,0.252364 -1.345241,0.75709 L 12.514267,34.225396 c -0.168155,0.252364 -0.33631,0.588848 -0.33631,0.925334 v 55.688242 c 0,0.925334 0.756698,1.682424 1.681551,1.682424 h 55.575239 c 0.588543,0 1.093008,-0.252364 1.345239,-0.75709 L 88.352188,66.612062 C 88.520343,66.3597 88.688499,66.023214 88.688499,65.68673 V 10.082608 c 0,-0.9253343 -0.756698,-1.6824243 -1.681551,-1.6824243 z M 70.275522,64.845518 V 35.487214 L 85.325397,13.952184 V 64.845518 Z M 15.541058,36.076062 h 15.049875 v 29.358304 l -15.049875,21.53503 z m 16.731426,0 H 68.593971 V 64.845518 H 32.272484 Z M 84.820932,11.765032 69.014359,34.393638 H 32.272484 v -22.544484 -0.08412 z m -54.229999,2.439516 v 20.18909 H 16.46591 Z m -14.545409,74.952 15.806572,-22.628606 h 36.741875 v 22.544484 0.08412 z m 54.229998,-2.439516 v -20.18909 h 14.125023 z" fill="var(--hoops-svg-stroke-color, #303030)" style="stroke-width:0.840994"/></svg>`;
const cuttingPlane = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M84,17.5c0-0.9-0.8-1.7-1.7-1.7H36.2c-0.5,0-1,0.2-1.3,0.6L16.3,39.2c-0.2,0.3-0.4,0.7-0.4,1.1v34 c0,0.9,0.8,1.7,1.7,1.7h46.1c0.5,0,1-0.2,1.3-0.6l18.6-22.7c0.2-0.3,0.4-0.7,0.4-1.1V17.5z M37,19.2h42.8L63.4,39.4H20.6L37,19.2z M19.4,41.1h43.5v31.4H19.4V41.1z M64.6,70.4V40.5l16-19.6v29.9L64.6,70.4z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M19.9,19.6c20.1,0,40.1-0.1,60.2-0.1c0,21.1,0,42.2,0,63.3 c-20.1,0-40.1,0-60.2,0c0-2.3,0-4.5,0-6.8c14.7,0,29.3,0,44,0c0.1,0,0.4-0.1,0.6-0.2c0.3-0.1,0.4-0.3,0.5-0.4 c0.3-0.4,3.9-4.8,8.9-10.9c0-12.1,0-24.2,0-36.3c-16.2-0.1-32.3-0.1-48.5-0.2c-1.8,2.3-3.7,4.5-5.5,6.8" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)" enable-background="new"/><path d="M80.1,19.5v63.3H19.9v-7c14.5,0,29.1,0,43.6,0 c0.5,0,1-0.2,1.3-0.6c3-3.7,6-7.1,9.1-10.8V28.2c-8-0.1-16.1-0.1-24.2-0.1C41.6,28,33.5,28,25.4,28c-1.8,2.3-3.7,4.5-5.5,6.8 c0-5.1,0-10.1,0-15.2L80.1,19.5 M80.1,18.2H19.9c-0.8,0-1.4,0.6-1.4,1.4v15c0,0.6,0,1.3,0,1.9c1.9-2.4,3.9-4.7,5.8-7.1 c16.1,0.1,32.1,0.2,48.2,0.3v34.2l-6.6,8l-2.2,2.7c-0.1,0.1-0.2,0.1-0.3,0.1H19.9c-0.8,0-1.4,0.6-1.4,1.4v7c0,0.8,0.6,1.4,1.4,1.4 h60.2c0.8,0,1.4-0.6,1.4-1.4V19.5C81.5,18.8,80.8,18.2,80.1,18.2z" opacity="0.7" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/></svg>`;
const perspectiveView = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.5,0H39.7c-0.5,0-1,0.2-1.3,0.5L5.2,30.4c-0.4,0.4-0.7,0.9-0.7,1.5V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.4-0.4,1.8-1.1l20.9-39.2c0.2-0.3,0.2-0.6,0.2-0.9V2C95.5,0.9,94.6,0,93.5,0z M40.4,4h50.6l-19,27.2H10.3L40.4,4z M8.5,96 V33.2h63.1v62.5L71.4,96H8.5z M73.6,91.9V32.5L91.5,6.9v51.5L73.6,91.9z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneZ = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><rect x="17" y="45.2" width="43.5" height="31.4" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M18.2,43.5H61c5.5-6.7,10.9-13.4,16.4-20.1c-14.3,0-28.5,0-42.8,0C29.1,30.1,23.7,36.8,18.2,43.5z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><polygon points="62.2,74.6 62.2,44.7 78.2,25.1 78.2,55" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M81.6,21.7c0-0.9-0.8-1.7-1.7-1.7H33.8c-0.5,0-1,0.2-1.3,0.6L13.9,43.3c-0.2,0.3-0.4,0.7-0.4,1.1 v33.9c0,0.9,0.8,1.7,1.7,1.7h46.1c0.5,0,1-0.2,1.3-0.6l18.6-22.7c0.2-0.3,0.4-0.7,0.4-1.1V21.7z M34.6,23.4h42.8L61,43.5H18.2 L34.6,23.4z M17,45.2h43.5v31.4H17V45.2z M62.2,74.6V44.7l16-19.6V55L62.2,74.6z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M1.7,62.9c3.9-4.7,7.9-9.5,11.8-14.2c0,2.3,0,4.6,0,6.9 c15.9,0.1,31.9,0.1,47.8,0.2c6.8-7.8,13.5-15.7,20.3-23.5c0-2.8,0-5.6,0-8.4c5.5,0,11.1,0,16.6,0c-10.8,13-21.7,26-32.5,39" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)" enable-background="new"/><path d="M98.2,23.9c-10.8,13-21.6,26-32.5,39h-64l11.8-14.2v6.9 c15.9,0.1,31.9,0.1,47.8,0.2c6.8-7.8,13.5-15.7,20.3-23.5c0-2.8,0-5.6,0-8.4C87.2,23.9,92.7,23.9,98.2,23.9z M98.2,22.1 c-5.5,0-11.1,0-16.6,0c0,2.6,0,5.1,0,7.7c-7,8.1-14.1,16.2-21.1,24.3C52.8,54,45.1,54,37.5,54c-7.4,0-16.5-0.1-23.9-0.1 c0-1.9,0-1.5,0-8c-4.5,6-8.8,10-13.2,16c-0.4,0.5-0.5,1.2-0.2,1.8c0.3,0.6,0.9,1,1.6,1h64.3c0.5,0,1.1-0.3,1.4-0.7l32.2-39 c0.4-0.5,0.5-1.2,0.2-1.8C99.5,22.5,98.9,22.1,98.2,22.1z M98.2,25.6L98.2,25.6L98.2,25.6L98.2,25.6z" opacity="0.7" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/></svg>`;
const redlineRectangle = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M99.2,75.2L78.5,59.5V2c0-1.1-0.9-2-2-2H2C0.9,0,0,0.9,0,2v57.7c0,1.1,0.9,2,2,2h52.8l3.5,36.4 c0.1,0.8,0.6,1.5,1.4,1.7c0.2,0.1,0.4,0.1,0.6,0.1c0.6,0,1.1-0.2,1.5-0.7l9.7-11.1l5.2,10.1c0.2,0.5,0.7,0.8,1.2,1 c0.5,0.2,1.1,0.1,1.6-0.2l9.5-5.3c0.5-0.3,0.8-0.7,1-1.2c0.1-0.5,0.1-1.1-0.2-1.6l-5.8-9.7l14.5-2.5c0.8-0.1,1.4-0.7,1.6-1.5 C100.1,76.5,99.8,75.7,99.2,75.2z M4,57.7V4h70.6v52.4L56.3,42.5c-0.3-0.3-0.7-0.4-1.1-0.4c-0.2,0-0.5,0-0.7,0.1 c-0.9,0.3-1.5,1.2-1.4,2.1l1.3,13.4H4z M80.3,77.8c-0.7,0.1-1.2,0.5-1.5,1.1c-0.3,0.6-0.2,1.3,0.1,1.9l6.3,10.5l-5.9,3.3l-5.6-10.9 c-0.3-0.6-0.9-1-1.5-1.1c-0.1,0-0.2,0-0.2,0c-0.6,0-1.1,0.2-1.5,0.7l-8.6,9.8l-4.3-44.7l35.6,27.2L80.3,77.8z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneY = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M19.4,45.8c14.5,0,29,0,43.5,0c0,10.5,0,20.9,0,31.4c-14.5,0-29,0-43.5,0 C19.4,66.7,19.4,56.3,19.4,45.8z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><polygon points="20.6,44.1 63.4,44.1 79.8,24 37,24" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><polygon points="64.6,75.2 64.6,45.3 80.6,25.7 80.6,55.6" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M83.5,21c-0.5-0.4-1-0.5-1.2-0.5H36.2c-0.5,0-1,0.2-1.3,0.6L16.3,43.9C16.1,44.2,16,44.6,16,45v34 c0,0.9,0.8,1.7,1.7,1.7h46.1c0.5,0,1-0.2,1.3-0.6l18.6-22.7c0.2-0.3,0.4-0.7,0.4-1.1V22.2C84.1,22,84,21.5,83.5,21z M37,24h42.8 L63.4,44.1H20.6L37,24z M19.4,45.8h43.5v31.4H19.4V45.8z M64.6,75.2V45.3l16-19.6v29.9L64.6,75.2z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M66.7,7.9c0,4.2,0,8.4,0,12.6c-0.5,0-1,0-1.5,0 C58.1,28.4,51.1,36.2,44,44.1c0,12.2,0,24.4,0,36.6c1.2,0,2.4,0,3.6,0c-4.1,3.8-8.2,7.6-12.3,11.4c0-17.7,0-35.3,0-53 C45.8,28.7,56.2,18.3,66.7,7.9z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)" enable-background="new"/><path d="M66.7,7.9v12.6h-1.5L44,44.1v36.6h3.6L35.3,92.1v-53L66.7,7.9 M47.6,80.7L47.6,80.7 M66.7,6.4c-0.4,0-0.8,0.2-1.1,0.4L34.2,38c-0.3,0.3-0.5,0.7-0.5,1.1V92c0,0.6,0.4,1.2,0.9,1.4 c0.2,0.1,0.4,0.1,0.6,0.1c0.4,0,0.8-0.1,1-0.4l12.3-11.3c0.3-0.3,0.5-0.7,0.5-1.2c0-0.9-0.7-1.5-1.5-1.5l0,0h-2V44.7L65.9,22h0.8 c0.9,0,1.5-0.7,1.5-1.5V7.9c0-0.6-0.4-1.2-0.9-1.4C67.1,6.4,66.9,6.4,66.7,6.4L66.7,6.4z" opacity="0.7" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/></svg>`;
const cubeShaded = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M71.6,96c6.6-9.5,13.3-19,19.9-28.5c0-21.2,0-42.3,0-63.5c-6.3,9.4-12.6,18.8-18.9,28.2 C72.3,53.5,71.9,74.7,71.6,96z" opacity="0.5" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M71.6,96c-21,0-42.1,0-63.1,0c0-21.2,0-42.3,0-63.5c21.4-0.1,42.7-0.2,64.1-0.3 C72.3,53.5,71.9,74.7,71.6,96z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M28.4,4c21,0,42.1,0,63.1,0c-6.3,9.4-12.6,18.8-18.9,28.2 c-21.4,0.1-42.7,0.2-64.1,0.3C15.1,23,21.8,13.5,28.4,4z" opacity="5.000000e-02" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M93.5,0H27.4c-0.7,0-1.3,0.3-1.6,0.9L4.9,30.7c-0.2,0.3-0.4,0.7-0.4,1.1V98c0,1.1,0.9,2,2,2h66.1 c0.7,0,1.3-0.3,1.6-0.9l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V2C95.5,0.9,94.6,0,93.5,0z M91.5,67.5L71.6,96H8.5V32.5L28.4,4h63.1V67.5 z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneX = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><rect x="19.4" y="41.1" width="43.5" height="31.4" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><polygon points="20.6,39.4 63.4,39.4 79.8,19.2 37,19.2" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><polygon points="64.6,70.4 64.6,40.5 80.6,20.9 80.6,50.8" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M84,17.5c0-0.9-0.8-1.7-1.7-1.7H36.2c-0.5,0-1,0.2-1.3,0.6L16.3,39.2c-0.2,0.3-0.4,0.7-0.4,1.1v34 c0,0.9,0.8,1.7,1.7,1.7h46.1c0.5,0,1-0.2,1.3-0.6l18.6-22.7c0.2-0.3,0.4-0.7,0.4-1.1V17.5z M37,19.2h42.8L63.4,39.4H20.6L37,19.2z M19.4,41.1h43.5v31.4H19.4V41.1z M64.6,70.4V40.5l16-19.6v29.9L64.6,70.4z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M19.9,19.6c20.1,0,40.1,0,60.2,0c0,21.1,0,42.1,0,63.2 c-20.1,0-40.1,0-60.2,0c0-2.3,0-4.5,0-6.8c14.5,0,29.1,0,43.6,0c0.1,0,0.4,0,0.7-0.1c0.3-0.1,0.6-0.3,0.7-0.4 c0.3-0.3,0.6-0.7,0.9-1.1c2.7-3.3,5.4-6.6,8.1-9.9c0-12.1,0-24.2,0-36.3c-16.1-0.1-32.3-0.1-48.4-0.2c-1.9,2.3-3.7,4.5-5.6,6.8" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)" enable-background="new"/><path d="M80.1,19.5v63.3H19.9v-7c14.5,0,29.1,0,43.6,0 c0.5,0,1-0.2,1.3-0.6c3-3.7,6-7.1,9.1-10.8V28.2C57.7,28.1,41.7,28,25.5,28c-1.8,2.2-3.8,4.7-5.6,6.9c0-5,0-10.3,0-15.3h60.2 M80.1,18.2H19.9c-0.8,0-1.4,0.6-1.4,1.4v15c0,0.8,0,1.1,0,2c1.9-2.3,4-4.9,5.8-7.2L58,29.6l14.5,0.1v34.2l-6.6,8l-2.2,2.7 c-0.1,0.1-0.2,0.1-0.3,0.1H19.9c-0.8,0-1.4,0.6-1.4,1.4v7c0,0.8,0.6,1.4,1.4,1.4h60.2c0.8,0,1.4-0.6,1.4-1.4V19.5 C81.5,18.8,80.8,18.2,80.1,18.2z" opacity="0.7" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/></svg>`;
const walk = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M88.2,9.6C83.9,7,79.1,6.2,74.8,7.3C60.3,11.2,57,29.9,57.3,40.3c0.1,2.6,0.4,5.2,0.7,7.6 c0.7,5.1,1.3,9.9-0.4,14.9c-0.3,0.8-0.6,1.6-0.9,2.5C54.6,71,52,78,54.7,84.3c2.6,6,9,8.8,14.7,8.8c1,0,1.9-0.1,2.9-0.2 c12-2.1,14.6-12.9,17-22.5c0.6-2.5,1.2-4.8,1.9-6.9c0.2-0.6,0.4-1.1,0.4-1.2c0,0,0,0,0,0c0.2-0.6,0.5-1.1,0.8-1.8 c0.5-1,1.2-2.4,2.3-4.8C101.8,39.6,103.8,19,88.2,9.6z M71.5,89c-4.8,0.9-11-1.2-13.1-6.2c-2.1-4.8,0.1-10.8,2.1-16.1 c0.3-0.9,0.6-1.7,0.9-2.5c0.1-0.2,0.1-0.4,0.2-0.5l24,4.7c-0.1,0.4-0.2,0.8-0.3,1.2C83,78.6,80.9,87.3,71.5,89z M91,54.2 c-1,2.4-1.7,3.7-2.2,4.7c-0.4,0.7-0.7,1.3-1,2l0,0c-0.2,0.4-0.4,0.9-0.5,1.4c-0.4,1.3-0.8,2.6-1.2,4l-24-4.7c1.2-5,0.5-9.7-0.1-14.3 c-0.3-2.3-0.6-4.8-0.7-7.2c-0.4-12,4-26.1,14.5-28.9c0.9-0.2,1.9-0.4,2.8-0.4c2.5,0,5.1,0.7,7.4,2.2C99.5,21.1,97.4,39.6,91,54.2z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M42.4,62.8c-1.8-5-1.1-9.8-0.4-14.9c0.3-2.4,0.7-5,0.7-7.6c0.3-10.4-3-29-17.5-32.9 C20.9,6.2,16.1,7,11.8,9.6C-3.8,19-1.8,39.6,5.4,55.8c1.1,2.5,1.8,3.8,2.3,4.8c0.3,0.7,0.6,1.2,0.8,1.7c0,0,0.2,0.6,0.4,1.2 c0.7,2.1,1.3,4.4,1.9,6.9c2.3,9.5,5,20.3,17,22.5c0.9,0.2,1.9,0.2,2.9,0.2c5.7,0,12.1-2.8,14.7-8.8c2.7-6.3,0.1-13.4-2-19.1 C43,64.4,42.7,63.6,42.4,62.8z M9,54.2c-6.5-14.6-8.6-33,4.9-41.2c2.3-1.4,5-2.2,7.4-2.2c1,0,1.9,0.1,2.8,0.4 c10.5,2.8,14.9,17,14.5,28.9c-0.1,2.4-0.4,4.9-0.7,7.2c-0.6,4.6-1.2,9.3-0.1,14.3l-24,4.7c-0.4-1.4-0.7-2.7-1.2-4 c-0.2-0.7-0.5-1.4-0.5-1.4c-0.3-0.7-0.6-1.3-1-2C10.8,57.9,10.1,56.5,9,54.2z M41.6,82.8c-2.1,5-8.4,7.1-13.1,6.2 C19.1,87.3,17,78.6,14.7,69.5c-0.1-0.4-0.2-0.8-0.3-1.2l24-4.7c0.1,0.2,0.1,0.4,0.2,0.5c0.3,0.8,0.6,1.7,0.9,2.5 C41.5,71.9,43.7,77.9,41.6,82.8z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneSectionToggle = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M42.4,20.3h39.5c-3.7,4.9-7.3,9.8-11,14.8c-13.7,0-27.5,0-41.2,0L42.4,20.3z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M28.2,37c14.1,0,28.1,0,42.2,0c0,3.3,0,6.7,0,10c-14.1,0-28.1,0-42.2,0V37z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M27.5,49.5c0.2-0.1,0.3-0.3,0.4-0.5c13.8,0,27.7,0,41.5,0c-2.6,2.7-5.3,5.4-7.9,8.2H19.1L27.5,49.5z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><rect x="17" y="59.2" width="44" height="20.6" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M63,77.8V58.5l9.1-9.9c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.1-0.3c0,0,0,0,0,0 c0-3.9,0-7.7,0-11.6c3.6-4.8,7.1-9.6,10.7-14.3v35.2L63,77.8z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M85,16.3H41.5c-0.6,0-1.1,0.3-1.5,0.7L24.7,34.7c-0.3,0.4-0.5,0.8-0.5,1.3v11.1l-10.5,9.6 c-0.4,0.4-0.7,0.9-0.7,1.5v23.6c0,1.1,0.9,2,2,2h47c0.5,0,1.1-0.2,1.4-0.6l23-23.7C86.8,59,87,58.5,87,58V18.3 C87,17.2,86.1,16.3,85,16.3z M42.4,20.3h39.5c-3.7,4.9-7.3,9.8-11,14.8H29.7L42.4,20.3z M28.2,37h42.2v10H28.2V37z M27.5,49.5 c0.2-0.1,0.3-0.3,0.4-0.5h41.5l-7.9,8.2H19.1L27.5,49.5z M17,59.2h44v20.6H17V59.2z M63,77.8V58.5l9.1-9.9c0,0,0-0.1,0.1-0.1 c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.1-0.3c0,0,0,0,0,0V36.4c3.6-4.8,7.1-9.6,10.7-14.3v35.2L63,77.8z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M20.3,48C14.3,53.7,8.4,59.4,2.5,65.1h59.4c5.3-5.7,10.6-11.4,16-17.1L20.3,48 C20.3,48,20.3,48,20.3,48z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/><path d="M21.3,25v21h57.5c0,0,0,0,0,0V25H21.3z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/><path d="M78.8,23H21.3c-1.1,0-2,0.9-2,2v21.2l-8.8,8.5l-9.4,9.1c-0.6,0.6-0.8,1.4-0.5,2.2 c0.3,0.8,1,1.3,1.9,1.3h59.4c0.6,0,1.1-0.2,1.5-0.6l8.4-9.1l8.4-9.1c0.3-0.4,0.5-0.9,0.5-1.4V25C80.8,23.9,79.9,23,78.8,23z M78.8,25v21c0,0,0,0,0,0H21.3V25H78.8z M61.9,65.1H2.5C8.4,59.4,14.3,53.7,20.3,48c0,0,0,0,0.1,0h57.5 C72.5,53.7,67.2,59.4,61.9,65.1z" opacity="0.7" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const areaSelect = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M99.1,75.3L78.5,59.5v-4.7h-4v1.7l-18.3-14c-0.3-0.3-0.7-0.4-1.1-0.4c-0.2,0-0.5,0-0.7,0.1 c-0.9,0.3-1.5,1.2-1.4,2.1l1.3,13.4h-2.8v4h3.2l3.5,36.5c0.1,0.8,0.6,1.5,1.4,1.7c0.2,0.1,0.4,0.1,0.6,0.1c0.6,0,1.1-0.2,1.5-0.7 l9.7-11.1l5.2,10.1c0.2,0.5,0.7,0.8,1.2,1c0.5,0.2,1.1,0.1,1.6-0.2l9.5-5.3c0.5-0.3,0.8-0.7,1-1.2c0.1-0.5,0.1-1.1-0.2-1.6l-5.8-9.7 l14.5-2.5c0.8-0.1,1.4-0.7,1.6-1.5C100,76.6,99.8,75.8,99.1,75.3z M80.2,77.9C79.5,78,79,78.4,78.7,79c-0.3,0.6-0.2,1.3,0.1,1.9 l6.3,10.5l-5.9,3.3l-5.6-10.9c-0.3-0.6-0.9-1-1.5-1.1c-0.1,0-0.2,0-0.2,0c-0.6,0-1.1,0.2-1.5,0.7l-8.6,9.8l-4.3-44.8l35.5,27.2 L80.2,77.9z" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="74.6" y="35.6" width="4" height="9.5" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="74.6" y="16.6" width="4" height="9.5" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="74.6,7 78.6,7 78.6,0 71.6,0 71.6,4 74.6,4" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="53.1" width="9.2" height="4" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="16.2" width="9.2" height="4" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="34.7" width="9.2" height="4" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="0,7 4,7 4,4 7,4 7,0 0,0" fill="var(--hoops-svg-stroke-color, #303030)"/><rect y="35.6" width="4" height="9.5" fill="var(--hoops-svg-stroke-color, #303030)"/><rect y="16.6" width="4" height="9.5" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="4,54.7 0,54.7 0,61.8 7,61.8 7,57.7 4,57.7" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="15.9" y="57.7" width="8.9" height="4" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="33.8" y="57.7" width="8.9" height="4" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneReset = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M53,50.3l17.3-18.7c0.8-0.8,0.7-2.1-0.1-2.8c-0.8-0.8-2.1-0.7-2.8,0.1L50,47.6L31.4,30.3 c-0.8-0.8-2.1-0.7-2.8,0.1c-0.8,0.8-0.7,2.1,0.1,2.8l18.7,17.3L30,69.2c-0.8,0.8-0.7,2.1,0.1,2.8c0.4,0.4,0.9,0.5,1.4,0.5 c0.5,0,1.1-0.2,1.5-0.6l17.3-18.7l18.7,17.3c0.4,0.4,0.9,0.5,1.4,0.5c0.5,0,1.1-0.2,1.5-0.6c0.8-0.8,0.7-2.1-0.1-2.8L53,50.3z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M50,4.4C24.9,4.4,4.4,24.9,4.4,50S24.9,95.6,50,95.6S95.6,75.1,95.6,50S75.1,4.4,50,4.4z M50,91.6 C27.1,91.6,8.4,72.9,8.4,50C8.4,27.1,27.1,8.4,50,8.4c22.9,0,41.6,18.6,41.6,41.6C91.6,72.9,72.9,91.6,50,91.6z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeHiddenLine = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><rect x="37.4" y="66.7" width="6.6" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="77" y="66.7" width="6.6" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="50.6" y="66.7" width="6.6" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="63.8" y="66.7" width="6.6" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="25.9" y="38.3" width="2.9" height="6.6" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="25.9" y="51.5" width="2.9" height="6.6" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="25.9" y="11.9" width="2.9" height="6.6" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="17.3" y="76.8" transform="matrix(0.573 -0.8195 0.8195 0.573 -55.4355 50.0434)" width="5.9" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="10.5" y="86.5" transform="matrix(0.573 -0.8195 0.8195 0.573 -66.3207 48.6202)" width="5.9" height="2.9" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="26.6,71.8 28.1,69.6 30.8,69.6 30.8,66.7 28.8,66.7 28.8,64.7 25.9,64.7 25.9,67.7 24.2,70.1" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M93.6,0H27.4c-0.6,0-1.2,0.3-1.6,0.8L4.8,30.8c-0.2,0.3-0.4,0.7-0.4,1.1v66.2c0,1.1,0.9,1.9,1.9,1.9 h66.2c0.6,0,1.2-0.3,1.6-0.8l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V1.9C95.5,0.9,94.6,0,93.6,0z M71.7,96L71.7,96L9.6,96.1l0,0 l-1.2-0.8V32.8h63.3V96z M72.1,30.9H28.8v-5.7h-2.9v5.7H9.5L27.4,5.4h1.5V3.9H91L72.1,30.9z M73.6,93.3V32.2l18-25.7v60.2h-1.5v2.9 h0L73.6,93.3z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cuttingPlaneSection = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M42.4,20.3h39.5c-3.7,4.9-7.3,9.8-11,14.8c-13.7,0-27.5,0-41.2,0L42.4,20.3z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M28.2,37c14.1,0,28.1,0,42.2,0c0,3.3,0,6.7,0,10c-14.1,0-28.1,0-42.2,0V37z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M27.5,49.5c0.2-0.1,0.3-0.3,0.4-0.5c13.8,0,27.7,0,41.5,0c-2.6,2.7-5.3,5.4-7.9,8.2H19.1L27.5,49.5z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><rect x="17" y="59.2" width="44" height="20.6" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M63,77.8V58.5l9.1-9.9c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.1-0.3c0,0,0,0,0,0 c0-3.9,0-7.7,0-11.6c3.6-4.8,7.1-9.6,10.7-14.3v35.2L63,77.8z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M85,16.3H41.5c-0.6,0-1.1,0.3-1.5,0.7L24.7,34.7c-0.3,0.4-0.5,0.8-0.5,1.3v11.1l-10.5,9.6 c-0.4,0.4-0.7,0.9-0.7,1.5v23.6c0,1.1,0.9,2,2,2h47c0.5,0,1.1-0.2,1.4-0.6l23-23.7C86.8,59,87,58.5,87,58V18.3 C87,17.2,86.1,16.3,85,16.3z M42.4,20.3h39.5c-3.7,4.9-7.3,9.8-11,14.8H29.7L42.4,20.3z M28.2,37h42.2v10H28.2V37z M27.5,49.5 c0.2-0.1,0.3-0.3,0.4-0.5h41.5l-7.9,8.2H19.1L27.5,49.5z M17,59.2h44v20.6H17V59.2z M63,77.8V58.5l9.1-9.9c0,0,0-0.1,0.1-0.1 c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.1-0.3c0,0,0,0,0,0V36.4c3.6-4.8,7.1-9.6,10.7-14.3v35.2L63,77.8z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const measureAngle = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M5.4,93.9c0-21.4,0-42.7,0-64.1c6.7-6.1,13.4-12.3,20-18.4 c0,19.4,0.1,38.8,0.1,58.2C18.8,77.7,12.1,85.8,5.4,93.9z" opacity="0.2" fill="var(--hoops-svg-stroke-color, #303030)" enable-background="new"/><path d="M95.7,53.7l-6.4,6.9c-1,1.1-2,2.2-3,3.3c-0.9,1-1.7,2-2.7,3c0,0-0.1,0.1-0.1,0.1c-1,1.1-2.6,1.5-4,1 c-0.7-0.2-1.2-0.6-1.8-1.1c-0.3-0.3-0.6-0.6-0.9-0.9c-0.2-0.2-0.3-0.3-0.5-0.5c-0.7-0.6-1.3-1.3-2-1.9l-1.8-1.7 c-2.8-2.7-5.2-4.9-7.6-7c-1.5-1.4-1.6-3.8-0.2-5.3c0.7-0.7,1.6-1.2,2.6-1.2h0.1c1,0,1.9,0.3,2.6,1l3.4,3.6c0.4,0.4,1,0.4,1.4,0 c0.2-0.3,0.4-0.6,0.3-0.9c-0.7-4.3-2.9-12.7-10.1-19.8c-6.7-6.7-14.5-9-18.6-9.8c-0.5-0.1-0.9,0.1-1.1,0.5c-0.2,0.4-0.1,0.9,0.2,1.2 l4.6,4.6c0.7,0.7,1.1,1.6,1.1,2.6s-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1s-1.9-0.4-2.6-1.1l-6.6-6.7l-3-3c-1-1-2.1-2.1-3.1-3.1 c-1.1-1-1.4-2.6-0.8-4c0.4-1,1.2-1.8,2.1-2.6c0.2-0.2,0.3-0.3,0.5-0.5l3.8-3.5c2.8-2.7,5.1-4.9,7.3-7.3c1.4-1.5,3.8-1.5,5.2,0 c1.5,1.4,1.5,3.8,0,5.2L44.7,14c-0.2,0.3-0.3,0.7-0.2,1.1c0.2,0.4,0.5,0.7,0.9,0.7c4,0.3,18,2.3,27.9,14.3 c1.4,1.6,8.3,10.6,8.8,22.7v0.7c0,0.4,0.2,0.7,0.6,0.9c0.4,0.1,0.8,0.1,1.1-0.2l6.4-5.5l0.1-0.1c1.3-1.5,3.7-1.6,5.2-0.2 c0.7,0.7,1.2,1.6,1.2,2.6S96.4,53,95.7,53.7z" fill="var(--hoops-svg-fill-color, #f0f0f0)"/><path d="M98.6,51c0-1.5-0.7-3-1.8-4c-2.3-2.2-5.8-2.1-8,0.2L84,51.3c-1-11.7-7.2-20.2-9.2-22.6 c-9-11-21.4-14-27.2-14.8l4.1-4c2.2-2.2,2.2-5.9,0-8.1c-2.2-2.2-5.8-2.2-8.1,0c-2.2,2.3-4.5,4.6-7.3,7.2l-3.6,3.6l-0.5,0.5 c-1,0.9-2,1.9-2.6,3.3c-0.1,0.2-0.1,0.3-0.2,0.5v-10c0-0.8-0.5-1.5-1.2-1.8S26.6,4.9,26,5.5l-24,22c-0.4,0.4-0.6,0.9-0.6,1.5v68.9 c0,1.1,0.9,2,2,2h61c0.7,0,1.3-0.3,1.6-0.9l20-29c0.4-0.5,0.4-1.3,0.1-2c-0.1-0.2-0.2-0.4-0.3-0.5c0.7-0.7,1.3-1.4,2-2.2 c1-1.1,2-2.2,3-3.3l6.4-6.9C98.1,54,98.7,52.5,98.6,51z M29.4,20.2c0.3,0.9,0.7,1.7,1.4,2.4c1.1,1,2.1,2.1,3.2,3.1 c1,0.9,2,1.9,3,2.9l6.6,6.7c1,1.1,2.5,1.7,4,1.7c1.4,0,2.9-0.6,4-1.7c1.1-1,1.7-2.5,1.7-4c0.1-1.5-0.5-2.9-1.6-4l-2.1-2.1 c4,1.2,9.4,3.6,14.2,8.4c5.3,5.3,7.8,11.3,8.9,15.6l-1.4-1.3c-1.1-1-2.6-1.6-4.1-1.5c-1.6,0-3,0.7-4,1.8c-2.2,2.3-2,5.9,0.3,8.1 c2.4,2.1,4.7,4.3,7.5,7l1.8,1.7c0.7,0.6,1.3,1.3,2,1.9H29.4V20.2z M5.4,29.9l20-18.4c0,19.4,0.1,38.8,0.1,58.2L5.4,93.9V29.9z M63.3,95.9h-57l20.7-25h53.4L63.3,95.9z M95.7,53.7l-6.4,6.9c-1,1.1-2,2.2-3,3.3c-0.9,1-1.7,2-2.7,3c0,0-0.1,0.1-0.1,0.1 c-1,1.1-2.6,1.5-4,1c-0.7-0.2-1.2-0.6-1.8-1.1c-0.3-0.3-0.6-0.6-0.9-0.9c-0.2-0.2-0.3-0.3-0.5-0.5c-0.7-0.6-1.3-1.3-2-1.9l-1.8-1.7 c-2.8-2.7-5.2-4.9-7.6-7c-1.5-1.4-1.6-3.8-0.2-5.3c0.7-0.7,1.6-1.2,2.6-1.2h0.1c1,0,1.9,0.3,2.6,1l3.4,3.6c0.4,0.4,1,0.4,1.4,0 c0.2-0.3,0.4-0.6,0.3-0.9c-0.7-4.3-2.9-12.7-10.1-19.8c-6.7-6.7-14.5-9-18.6-9.8c-0.5-0.1-0.9,0.1-1.1,0.5c-0.2,0.4-0.1,0.9,0.2,1.2 l4.6,4.6c0.7,0.7,1.1,1.6,1.1,2.6s-0.4,1.9-1.1,2.6c-0.7,0.7-1.6,1.1-2.6,1.1s-1.9-0.4-2.6-1.1l-6.6-6.7l-3-3c-1-1-2.1-2.1-3.1-3.1 c-1.1-1-1.4-2.6-0.8-4c0.4-1,1.2-1.8,2.1-2.6c0.2-0.2,0.3-0.3,0.5-0.5l3.8-3.5c2.8-2.7,5.1-4.9,7.3-7.3c1.4-1.5,3.8-1.5,5.2,0 c1.5,1.4,1.5,3.8,0,5.2L44.7,14c-0.2,0.3-0.3,0.7-0.2,1.1c0.2,0.4,0.5,0.7,0.9,0.7c4,0.3,18,2.3,27.9,14.3 c1.4,1.6,8.3,10.6,8.8,22.7v0.7c0,0.4,0.2,0.7,0.6,0.9c0.4,0.1,0.8,0.1,1.1-0.2l6.4-5.5l0.1-0.1c1.3-1.5,3.7-1.6,5.2-0.2 c0.7,0.7,1.2,1.6,1.2,2.6S96.4,53,95.7,53.7z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const note = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M32.4,100c-1.4,0-2.8-0.5-3.9-1.5L0.6,73.2C0.2,72.8,0,72.3,0,71.8V1.9C0,0.9,0.9,0,1.9,0h96.2 c1.1,0,1.9,0.9,1.9,1.9v69.9c0,1.1-0.9,1.9-1.9,1.9H38l0.2,20.5c0,2.3-1.3,4.3-3.4,5.3C34,99.8,33.2,100,32.4,100z M3.8,71L31,95.7 c0.6,0.5,1.4,0.7,2.1,0.3c0.7-0.3,1.2-1,1.2-1.8l-0.2-22.5c0-0.5,0.2-1,0.6-1.4c0.4-0.4,0.9-0.6,1.4-0.6h60.1V3.8H3.8V71z" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="54.5,53 54.5,25.3 41.9,25.3 41.9,32.1 48.2,32.1 48.2,53 41.9,53 41.9,59.5 62.4,59.5 62.4,53" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="47.9" y="11.9" width="6.7" height="6.7" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const bcf = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><g transform="translate(8 8) scale(0.84)"><path d="M32.4,100c-1.4,0-2.8-0.5-3.9-1.5L0.6,73.2C0.2,72.8,0,72.3,0,71.8V1.9C0,0.9,0.9,0,1.9,0h96.2 c1.1,0,1.9,0.9,1.9,1.9v69.9c0,1.1-0.9,1.9-1.9,1.9H38l0.2,20.5c0,2.3-1.3,4.3-3.4,5.3C34,99.8,33.2,100,32.4,100z M3.8,71L31,95.7 c0.6,0.5,1.4,0.7,2.1,0.3c0.7-0.3,1.2-1,1.2-1.8l-0.2-22.5c0-0.5,0.2-1,0.6-1.4c0.4-0.4,0.9-0.6,1.4-0.6h60.1V3.8H3.8V71z" fill="var(--hoops-svg-stroke-color, #303030)"/><polygon points="54.5,53 54.5,25.3 41.9,25.3 41.9,32.1 48.2,32.1 48.2,53 41.9,53 41.9,59.5 62.4,59.5 62.4,53" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="47.9" y="11.9" width="6.7" height="6.7" fill="var(--hoops-svg-stroke-color, #303030)"/></g></svg>`;
const redlineCircle = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M99.2,75L68.6,51.8c2.4-4.9,3.6-10.3,3.6-15.7C72.2,16.2,56,0,36.1,0C16.2,0,0,16.2,0,36.1 C0,56,16.2,72.1,36.1,72.1c6.6,0,13-1.8,18.6-5.2l3,31.2c0.1,0.8,0.6,1.5,1.4,1.7c0.2,0.1,0.4,0.1,0.6,0.1c0.6,0,1.1-0.2,1.5-0.7 L71.1,88l5.3,10.3c0.2,0.5,0.7,0.8,1.2,1c0.5,0.2,1.1,0.1,1.6-0.2l9.6-5.4c0.5-0.3,0.8-0.7,1-1.2c0.1-0.5,0.1-1.1-0.2-1.5l-6-9.9 l14.8-2.5c0.8-0.1,1.4-0.7,1.6-1.5C100.1,76.3,99.9,75.5,99.2,75z M36.1,68.1C18.4,68.1,4,53.7,4,36.1C4,18.4,18.4,4,36.1,4 c17.7,0,32.1,14.4,32.1,32.1c0,4.6-1,9.1-2.9,13.2l-9.7-7.4c-0.3-0.3-0.7-0.4-1.1-0.4c-0.2,0-0.5,0-0.7,0.1 c-0.9,0.3-1.5,1.2-1.4,2.1l1.8,18.8C48.9,66.2,42.7,68.1,36.1,68.1z M80,77.6c-0.7,0.1-1.2,0.5-1.5,1.1c-0.3,0.6-0.2,1.3,0.1,1.9 L85,91.3l-6,3.4l-5.7-11c-0.3-0.6-0.9-1-1.5-1.1c-0.1,0-0.2,0-0.2,0c-0.6,0-1.1,0.2-1.5,0.7l-8.8,10l-4.4-45.4l36.3,27.6L80,77.6z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeRight = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.6,0H27.4c-0.6,0-1.2,0.3-1.6,0.8L4.8,30.8c-0.2,0.3-0.4,0.7-0.4,1.1v66.2c0,1.1,0.9,1.9,1.9,1.9 h66.2c0.6,0,1.2-0.3,1.6-0.8l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V1.9C95.5,0.9,94.6,0,93.6,0z M73.6,67.2v-35l18-25.7v60.7H73.6z M8.4,32.8h18v35l-18,25.7V32.8z M28.3,32.8h43.3v34.3H28.3V32.8z M91,3.9l-18.9,27H28.3V4l0-0.1H91z M26.4,6.7v24.2H9.5L26.4,6.7z M9,96.1l18.9-27h43.8V96l0,0.1H9z M73.6,93.3V69.1h16.9L73.6,93.3z" fill="var(--hoops-svg-stroke-color, #303030)"/><path d="M73.6,93.3c6-8.6,12-17.2,18-25.7c0-20.4,0-40.7,0-61.1c-6,8.6-12,17.2-18,25.7 C73.6,52.5,73.6,72.9,73.6,93.3z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/></svg>`;
const snapshot = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M98,19.8H71.3v-7.5c0-1.1-0.9-2-2-2H30.7c-1.1,0-2,0.9-2,2v7.5H2c-1.1,0-2,0.9-2,2v66 c0,1.1,0.9,2,2,2h96c1.1,0,2-0.9,2-2v-66C100,20.6,99.1,19.8,98,19.8z M30.7,23.7c1.1,0,2-0.9,2-2v-7.5h34.7v7.5c0,1.1,0.9,2,2,2H96 v22H76.3c-2.7-12-13.5-21-26.3-21c-12.8,0-23.6,9-26.3,21H4v-22H30.7z M73,51.7c0,12.7-10.3,23-23,23c-12.7,0-23-10.3-23-23 c0-12.7,10.3-23,23-23C62.7,28.7,73,39.1,73,51.7z M4,85.8v-38h19.3c-0.2,1.3-0.3,2.6-0.3,4c0,14.9,12.1,27,27,27 c14.9,0,27-12.1,27-27c0-1.4-0.1-2.7-0.3-4H96v38H4z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const cubeBottom = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><path d="M93.6,68.1H27.4c-7,10-14,19.9-20.9,29.9c22.1,0,44.1,0,66.2,0 C79.6,88.1,86.6,78.1,93.6,68.1z" opacity="0.7" fill="var(--hoops-neutral-foreground-20, #1181d7)"/><path d="M93.6,0H27.4c-0.6,0-1.2,0.3-1.6,0.8L4.8,30.8c-0.2,0.3-0.4,0.7-0.4,1.1v66.2c0,1.1,0.9,1.9,1.9,1.9 h66.2c0.6,0,1.2-0.3,1.6-0.8l20.9-29.9c0.2-0.3,0.4-0.7,0.4-1.1V1.9C95.5,0.9,94.6,0,93.6,0z M73.6,67.2v-35l18-25.7v60.7H73.6z M8.4,32.8h18v35l-18,25.7V32.8z M28.3,32.8h43.3v34.3H28.3V32.8z M91,3.9l-18.9,27H28.3V4l0-0.1H91z M26.4,6.7v24.2H9.5L26.4,6.7z M9,96.1l18.9-27h43.8V96l0,0.1H9z M73.6,93.3V69.1h16.9L73.6,93.3z" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const info = w`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve" enable-background="new 0 0 100 100"><circle cx="50" cy="50" r="45" stroke="var(--hoops-svg-stroke-color, #303030)" fill="none" stroke-width="5" /><polygon points="54.5,65 54.5,37.3 41.9,37.3 41.9,42.1 48.2,42.1 48.2,65 41.9,65 41.9,71.5 62.4,71.5 62.4,65" opacity="0.9" fill="var(--hoops-svg-stroke-color, #303030)"/><rect x="47.9" y="22.9" width="6.7" height="6.7" opacity="0.9" fill="var(--hoops-svg-stroke-color, #303030)"/></svg>`;
const rootModel = w`<svg version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill-opacity="0" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.8"><path d="m1.9945 8.6568v82.819h96.165v-71.954h-50.164l-12.073-10.865z"/><path d="m3.8678 35.922h92.835"/></g></svg>`;
const assemblyNode = w`<svg version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill-opacity="0" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-linecap="round" stroke-linejoin="round"><path d="m50.387 63.925 21.789-7.8668zm-48.48-17.645 48.48 17.645v34.244m-26.864-86.507 24.134 8.784m0 26.744-24.134-8.784m23.985-18.014 24.494 8.9152v26.744l-24.494-8.9152zm24.494 35.659 25.983-9.457zm0-26.744 25.983-9.457m-24.494-8.9152-25.983 9.457" stroke-width="1.9"/><path d="m73.491 10.935 24.494 8.9152v26.744m-48.48-44.389-25.983 9.457v26.744m25.983-36.201 24.134 8.784zm-47.598 78.318 48.48 17.645 47.598-17.324m-74.605-42.139-21.473 7.5743v34.244m96.078-33.923v34.244z" stroke-width="3.8"/></g></svg>`;
const bodyNode = w`<svg version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill-opacity="0" fill-rule="evenodd" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.8"><path d="m50.137 98.078-48.23-17.554v-61.153m48.23 78.707 47.898-17.433v-61.153l-48.23-17.554-47.898 17.433"/><path d="m1.9077 19.371 48.23 17.554v61.153m0-61.153 47.898-17.433z" stroke-width="1.9"/></g></svg>`;
const visibilityShown = w`<svg version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g stroke="var(--hoops-svg-stroke-color, #303030)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.8"><path d="m3.3599 51.331c7.2797-10.826 13.999-20.12 28.559-22.772 11.283-1.3205 31.545-1.4933 38.638 0.37332 14.933 3.9198 19.226 9.8929 25.759 20.346m-91.836-2.4266c5.2264-8.9596 19.492-23.193 30.052-27.065 11.493-0.69905 21.413-0.4546 32.479 0 12.066 6.0601 23.706 17.733 28.932 26.692 1.3066 3.5465 1.12 7.8397 0 11.759-8.9116 11.825-23.833 21.704-44.051 21.839-20.218 0.13498-35.124-9.2804-47.411-21.652-2.2399-5.2264-2.0532-8.0263 0-11.573z" fill="none"/><path d="m75 52.451a22.586 22.586 0 0 1-22.586 22.586 22.586 22.586 0 0 1-22.586-22.586 22.586 22.586 0 0 1 22.586-22.586 22.586 22.586 0 0 1 22.586 22.586z" fill-opacity=".19788" fill="var(--hoops-svg-stroke-color, #303030)" /></g></svg>`;
const visibilityHidden = w`<svg version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g><path d="m96.793 53.559c-0.12022 1.5721-0.41467 3.1536-0.85039 4.6786-8.9116 11.825-23.833 21.704-44.051 21.839-20.218 0.13498-35.124-9.2804-47.411-21.652-0.8106-1.8914-1.3034-3.465-1.505-4.8712" fill="none" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.8"/></g></svg>`;
const moon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
const light = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
const close = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
</svg>`;
const modelTree = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)">
<path d="M600-120v-120H440v-400h-80v120H80v-320h280v120h240v-120h280v320H600v-120h-80v320h80v-120h280v320H600Z"/>
</svg>`;
const search = w`
<svg viewBox="0 -960 4480 4480" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(3.8551 0 0 3.8551 405.44 3153.5)"><path fill="var(--hoops-svg-stroke-color, #303030)" d="m172.46-841.94-9.7093 709.49zm107.54 425.44h168.79c7.074-9.9633 11.454-15.581 22-26.497 14.842-12.259 30-20.497 30-20.497h-220.79zm0 160h155.79c-3.8703-12.259-5.5-10.164-6.5-23.497s0.5-23.497 0.5-23.497h-149.79zm-80 176.5c-22 0-40.833-7.8333-56.5-23.5-15.667-15.667-23.5-34.5-23.5-56.5v-640c0-22 7.8333-40.833 23.5-56.5s34.5-23.5 56.5-23.5h320l240 240v128.79c-12.667-5.3333-6.6609-3.2094-18.597-8.13-17.524-5.4443-19.461-6.2348-19.461-10.87v-76.587l-238.55 3.3966 3.3966-238.55h-324.05v727.08l307.05-3.2048c15.077 13.354 21.344 16.71 36 26.848 9.3639 11.461 62.868 11.22 44 11.22zm460-86.851c28 0 73.279-21.203 92.613-40.536s36.653-64.613 36.653-92.613-17.319-73.279-36.653-92.613-64.613-40.536-92.613-40.536-73.279 21.203-92.613 40.536-40.536 64.613-40.536 92.613 21.203 73.279 40.536 92.613 64.613 40.536 92.613 40.536zm209.83 121.03-108-108c-14 9.3333-34.992 22.159-51.326 26.826s-33.167 7-50.5 7c-50 0-92.5-17.5-127.5-52.5s-52.5-77.5-52.5-127.5 17.5-92.5 52.5-127.5 77.5-52.5 127.5-52.5 92.5 17.5 127.5 52.5 52.5 77.5 52.5 127.5c0 17.333-2.3333 34.167-7 50.5s-17.492 37.326-26.826 51.326l108 108z"/></g></svg>
`;
const layers = w`
<svg viewBox="0 -960 4480 4480" xmlns="http://www.w3.org/2000/svg"><path fill="var(--hoops-svg-stroke-color, #303030)" d="m2266.5 3057.6-1868.7-1412.9 193.7-193.7 1675 1299 1675-1299 193.7 193.7zm0-968.52-1868.7-1412.9 1868.7-1230.6 1868.7 1230.6zm0-307.65 1492.7-1105.3-1492.7-922.95-1492.7 922.95z" stroke-width="5.6972"/></svg>
`;
const importIcon = w`
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="var(--hoops-svg-stroke-color, #303030)"
      d="m14 12l-4-4v3H2v2h8v3m10 2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3h2V6h12v12H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"
    />
  </svg>
`;
const newFileIcon = w`
<svg class="w-12 h-12 icon blender" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <g><g xmlns="http://www.w3.org/2000/svg"> <path d="M264.5 688a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm-.5 1h1v2h2v1h-2v2h-1v-2h-2v-1h2z" transform="translate(-251 -685)"></path> <g> <path d="M366.484 579a.5.5 0 0 0-.338.146l-3 3a.5.5 0 0 0 .354.854h3a.5.5 0 0 0 .5-.5V580h1.5c.676.01.676-1.01 0-1h-2v.002l-.016-.002zM363 584v7.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-5c.01-.676-1.01-.676-1 0v4.5h-9v-7z" transform="translate(-360 -575)"></path> </g> </g></g>
</svg>
`;
const viewIcon = w`
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="var(--hoops-svg-stroke-color, #303030)" d="M23.9 40.5 9.95 32.3335V16L24 7.7 38.05 16v16.3335L23.9 40.5Zm-1.4 -4.3V25L13 19.55V30.5l9.5 5.7Zm3 0 9.55 -5.7V19.55L25.5 25v11.2ZM4 13.45V4h9.45v3H7v6.45H4ZM13.45 44H4v-9.45h3V41h6.45v3Zm21.1 0v-3H41v-6.45h3V44h-9.45ZM41 13.45V7h-6.45V4H44v9.45h-3ZM24 22.3l9.5 -5.5 -9.5 -5.45 -9.5 5.45 9.5 5.5Z" stroke-width="1"></path>
</svg>`;
const addIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const removeIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const editIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>`;
const borderIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z"/></svg>`;
const fillIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="m247-904 57-56 343 343q23 23 23 57t-23 57L457-313q-23 23-57 23t-57-23L153-503q-23-23-23-57t23-57l190-191-96-96Zm153 153L209-560h382L400-751Zm360 471q-33 0-56.5-23.5T680-360q0-21 12.5-45t27.5-45q9-12 19-25t21-25q11 12 21 25t19 25q15 21 27.5 45t12.5 45q0 33-23.5 56.5T760-280ZM80 0v-160h800V0H80Z"/></svg>`;
const planeIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h160v80H200v560h160v80Zm80 80v-880h80v880h-80Zm160-80v-80h80v80h-80Zm0-640v-80h80v80h-80Zm160 640v-80h80q0 33-23.5 56.5T760-120Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80q33 0 56.5 23.5T840-760h-80Z"/></svg>`;
const invertIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>`;
const opacityIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M440-440v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm160 0v-80h80v80h-80Zm80-80v-80h80v80h-80Zm-320 0v-80h80v80h-80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-80h80v-80h-80v80Zm160 0h80v-80h-80v80Zm320 0v-80 80Zm-560-80h80v-80h80v80h80v-80h80v80h80v-80h80v80h80v-80h-80v-80h80v-320H200v320h80v80h-80v80Zm0 80v-560 560Zm560-240v80-80ZM600-280v80h80v-80h-80Z"/></svg>`;
const paletteIcon = w`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
const playIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const pauseIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const stopIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M320-320h320v-320H320v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const repeatIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>`;
const fastForwardIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M100-240v-480l360 240-360 240Zm400 0v-480l360 240-360 240ZM180-480Zm400 0Zm-400 90 136-90-136-90v180Zm400 0 136-90-136-90v180Z"/></svg>`;
const fpsIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M360-840v-80h240v80H360ZM480-80q-75 0-140.5-28.5T225-186q-49-49-77-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q63 0 120 21t104 59l58-58 56 56-56 58q36 47 57 104t21 120q0 74-28 139.5T735-186q-49 49-114.5 77.5T480-80Zm0-360Zm0-80h268q-18-62-61.5-109T584-700L480-520Zm-70 40 134-232q-59-15-121.5-2.5T306-660l104 180Zm-206 80h206L276-632q-42 47-62.5 106.5T204-400Zm172 220 104-180H212q18 62 61.5 109T376-180Zm40 12q66 17 128 1.5T654-220L550-400 416-168Zm268-80q44-48 63.5-107.5T756-480H550l134 232Z"/></svg>`;
const recordIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const uploadIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M444-336v-342L339-573l-51-51 192-192 192 192-51 51-105-105v342h-72ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/></svg>`;
const downloadIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>`;
const toolsIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M764-80q-6 0-11-2t-10-7L501-331q-5-5-7-10t-2-11q0-6 2-11t7-10l85-85q5-5 10-7t11-2q6 0 11 2t10 7l242 242q5 5 7 10t2 11q0 6-2 11t-7 10l-85 85q-5 5-10 7t-11 2Zm0-72 43-43-200-200-43 43 200 200ZM195-80q-6 0-11.5-2T173-89l-84-84q-5-5-7-10.5T80-195q0-6 2-11t7-10l225-225h85l38-38-175-175h-57L80-779l99-99 125 125v57l175 175 130-130-67-67 56-56H485l-18-18 128-128 18 18v113l56-56 169 169q15 15 23.5 34.5T870-600q0 20-6.5 38.5T845-528l-85-85-56 56-52-52-211 211v84L216-89q-5 5-10 7t-11 2Zm0-72 200-200v-43h-43L152-195l43 43Zm0 0-43-43 22 21 21 22Zm569 0 43-43-43 43Z"/></svg>`;
const cadConfiguration = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M440-280h80l12-60q12-5 22.5-10.5T576-364l58 18 40-68-46-40q2-14 2-26t-2-26l46-40-40-68-58 18q-11-8-21.5-13.5T532-620l-12-60h-80l-12 60q-12 5-22.5 10.5T384-596l-58-18-40 68 46 40q-2 14-2 26t2 26l-46 40 40 68 58-18q11 8 21.5 13.5T428-340l12 60Zm40-120q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
const typesIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="12" y1="6" x2="12" y2="19" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="5" y1="5" x2="5" y2="8" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="19" y1="5" x2="19" y2="8" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="19" y1="5" x2="5" y2="5" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="15" y1="20" x2="9" y2="20" stroke="var(--hoops-svg-stroke-color, #303030)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const relationshipIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-87q0-50 35-85t85-35h160v-127q-35-12-57.5-43T360-760q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T520-647v127h160q50 0 85 35t35 85v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-87q0-17-11.5-28.5T680-440H520v127q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-127H280q-17 0-28.5 11.5T240-400v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm280 0q17 0 28.5-11.5T520-200q0-17-11.5-28.5T480-240q-17 0-28.5 11.5T440-200q0 17 11.5 28.5T480-160Zm280 0q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160ZM480-720q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"/></svg>`;
const codeIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color)"><path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
const sheetsIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>`;
const warningIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm361.5-65.68q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68ZM454-348h60v-224h-60v224Zm26-122Z"/></svg>`;
const errorIcon = w`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--hoops-svg-stroke-color, #303030)"><path d="M503.5-289.48q9.5-9.48 9.5-23.5t-9.48-23.52q-9.48-9.5-23.5-9.5t-23.52 9.48q-9.5 9.48-9.5 23.5t9.48 23.52q9.48 9.5 23.5 9.5t23.52-9.48ZM453-433h60v-253h-60v253Zm27.27 353q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>`;
const icons = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addIcon,
  appMenuIcon,
  areaSelect,
  assemblyNode,
  bcf,
  bodyNode,
  borderIcon,
  cadConfiguration,
  camera,
  cameraTurntable,
  close,
  codeIcon,
  cubeBack,
  cubeBottom,
  cubeFront,
  cubeHiddenLine,
  cubeLeft,
  cubeRight,
  cubeShaded,
  cubeTop,
  cubeWireframe,
  cuttingPlane,
  cuttingPlaneReset,
  cuttingPlaneSection,
  cuttingPlaneSectionToggle,
  cuttingPlaneX,
  cuttingPlaneY,
  cuttingPlaneZ,
  dotIcon,
  downIcon,
  downloadIcon,
  editIcon,
  errorIcon,
  explode,
  fastForwardIcon,
  fillIcon,
  folderIcon,
  fpsIcon,
  goochShader,
  halfVisibleIcon,
  hiddenIcon,
  home,
  importIcon,
  info,
  invertIcon,
  layers,
  light,
  measureAngle,
  measureDistance,
  measureEdge,
  measurePoint,
  meshCubeIcon,
  modelTree,
  moon,
  newFileIcon,
  noWireframeShaded,
  note,
  opacityIcon,
  orbit,
  orthoView,
  paletteIcon,
  pauseIcon,
  perspectiveView,
  planeIcon,
  playIcon,
  recordIcon,
  redlineCircle,
  redlineFreehand,
  redlineNote,
  redlineRectangle,
  relationshipIcon,
  removeIcon,
  repeatIcon,
  rightIcon,
  rootModel,
  search,
  select,
  settings,
  sheetsIcon,
  snapshot,
  stopIcon,
  toolsIcon,
  toonShader,
  typesIcon,
  uploadIcon,
  viewFace,
  viewIcon,
  viewIso,
  visibilityHidden,
  visibilityShown,
  visibleIcon,
  walk,
  warningIcon,
  wireframeShaded,
  xRayShader
}, Symbol.toStringTag, { value: "Module" }));
var __defProp$X = Object.defineProperty;
var __getOwnPropDesc$17 = Object.getOwnPropertyDescriptor;
var __decorateClass$17 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$17(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$X(target, key, result);
  return result;
};
let HoopsIcon = class extends i$3 {
  constructor() {
    super(...arguments);
    this.icon = "";
  }
  /**
   * Retrieves the SVG template for the specified icon name.
   *
   * @returns The SVG template for the icon, or undefined if not found
   *
   * @internal
   */
  getIcon() {
    if (this.icon in icons) {
      return icons[this.icon];
    }
    console.warn(`unable to find hoops icon '${this.icon}'`, this);
    return void 0;
  }
  /** @internal */
  render() {
    return b`${this.getIcon() ?? ""}`;
  }
};
HoopsIcon.styles = [
  i$7`
      :host {
        display: inline-block;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `
];
__decorateClass$17([
  n$4({ type: String })
], HoopsIcon.prototype, "icon", 2);
HoopsIcon = __decorateClass$17([
  t$2("hoops-icon")
], HoopsIcon);
var __defProp$W = Object.defineProperty;
var __getOwnPropDesc$16 = Object.getOwnPropertyDescriptor;
var __decorateClass$16 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$16(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$W(target, key, result);
  return result;
};
let HoopsColorButtonElement = class extends i$3 {
  /**
   * Constructs a new HoopsColorButtonElement with default values.
   *
   * Initializes the component with:
   * - Empty title
   * - White color value ("#ffffff")
   * - Disabled state set to false
   */
  constructor() {
    super();
    this.tabindex = "0";
    this.role = "button";
    this.iconSize = "md";
    this.color = "default";
    this.disabled = false;
    this.title = "";
    this.value = "#ffffff";
    this.disabled = false;
  }
  /** @internal */
  render() {
    return b`
      <label>
        <hoops-button
          title=${this.title}
          tabindex=${this.tabindex}
          role=${this.role}
          iconSize=${this.iconSize}
          color=${this.color}
          ?disabled=${this.disabled}
          style=${o$4({
      "--hoops-svg-stroke-color": this.value
    })}
        >
          <slot name="icon" slot="icon"></slot>
          <slot></slot>
          <input
            type="color"
            value=${this.value}
            ?disabled=${this.disabled}
            @change=${(e3) => this.onChange(e3.target.value)}
          />
        </hoops-button>
      </label>
    `;
  }
  /**
   * Handles value changes from the color input element.
   *
   * When the user selects a new color through the color picker, this method
   * updates the component's value property and dispatches a standard 'change'
   * event to notify parent components of the color selection.
   *
   * @param value - The new color value in hexadecimal format from the color input
   *
   * @fires change - Standard change event indicating the color value has been updated
   *
   * @internal
   */
  onChange(value) {
    this.value = value;
    this.dispatchEvent(new Event("change"));
  }
};
HoopsColorButtonElement.styles = [
  i$7`
      :host {
        display: block;
      }

      hoops-button {
        position: 'relative';
        cursor: 'pointer';
      }

      hoops-button[disabled] {
        cursor: not-allowed;
      }

      input[type='color'] {
        display: 'inline-block';
        width: 0;
        height: 0;
        opacity: 0;
        position: 'absolute';
      }
    `
];
__decorateClass$16([
  n$4({ type: String })
], HoopsColorButtonElement.prototype, "title", 2);
__decorateClass$16([
  n$4({ type: String })
], HoopsColorButtonElement.prototype, "value", 2);
__decorateClass$16([
  n$4({ reflect: true })
], HoopsColorButtonElement.prototype, "tabindex", 2);
__decorateClass$16([
  n$4({ reflect: true })
], HoopsColorButtonElement.prototype, "role", 2);
__decorateClass$16([
  n$4()
], HoopsColorButtonElement.prototype, "iconSize", 2);
__decorateClass$16([
  n$4()
], HoopsColorButtonElement.prototype, "color", 2);
__decorateClass$16([
  n$4({ type: Boolean })
], HoopsColorButtonElement.prototype, "disabled", 2);
HoopsColorButtonElement = __decorateClass$16([
  t$2("hoops-color-button")
], HoopsColorButtonElement);
var __defProp$V = Object.defineProperty;
var __getOwnPropDesc$15 = Object.getOwnPropertyDescriptor;
var __decorateClass$15 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$15(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$V(target, key, result);
  return result;
};
let HoopsLayout = class extends i$3 {
  constructor() {
    super(...arguments);
    this.slotsShown = {};
    this.isSlotVisible = (slotName) => !!this.slotsShown[slotName];
    this.hideSlot = (name) => this.setSlotVisibility(name, false);
    this.showSlot = (name) => this.setSlotVisibility(name, true);
    this.toggleSlotVisibility = (name) => this.setSlotVisibility(name, !this.isSlotVisible(name));
  }
  static buildFloatablePanelStyle(position) {
    const expandsHorizontally = position == "left" || position == "right";
    const positionedPanelClassname = r$9(`panel-${position}`);
    return i$7`
      .panel.panel--floating.${positionedPanelClassname} {
        position: relative;
        ${r$9(expandsHorizontally ? "width" : "height")}: 0;
        background: hotpink;
        display: flex;
      }
      .panel.${positionedPanelClassname} {
        ${r$9(expandsHorizontally ? "height" : "width")}: 100%;
      }
      .panel.${positionedPanelClassname}.panel--floating slot {
        position: absolute;
        z-index: 2;
      }
      .panel.${positionedPanelClassname} slot {
        ${r$9(expandsHorizontally ? "width" : "height")}: var(--panel-size);
        ${r$9(expandsHorizontally ? "height" : "width")}: 100%;
        ${r$9(position)}: 0;
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
  setSlotVisibility(slotName, shown) {
    this.slotsShown = Object.assign({}, this.slotsShown, Object.fromEntries([[slotName, shown]]));
  }
  /**
   * handleSlotChange updates the visibility of the slots according to the number
   * of slotted elements it has, 0 means the slot element should now be hidden
   * @param {Event} e - The event object.
   * @return {void}
   */
  handleSlotChange(e3) {
    const slotElement = e3.target;
    const slotName = slotElement.getAttribute("name");
    this.setSlotVisibility(slotName, !!slotElement.assignedElements().length);
  }
  /**
   * Build a slot element with the given slotName.
   *
   * @param {HoopsLayoutSlotName} slotName - The name of the slot to be built.
   * @return {Element} The constructed slot element.
   */
  buildSlotElement(slotName) {
    return b`<slot
      name=${slotName}
      @slotchange=${this.handleSlotChange}
      aria-hidden=${!this.isSlotVisible(slotName)}
    ></slot>`;
  }
  /**
   * Builds a panel element.
   *
   * @param {HoopsLayoutSlotName} slotName - The name of the slot for the panel element.
   * @returns {HTMLElement} - The panel element.
   */
  builPanelElement(slotName) {
    return b`<div class="panel ${slotName} ${this.floatingPanels ? "panel--floating" : ""}">
      ${this.buildSlotElement(slotName)}
    </div> `;
  }
  /** @internal */
  render() {
    return b`
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
HoopsLayout.styles = [
  i$7`
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
  HoopsLayout.buildFloatablePanelStyle("left"),
  HoopsLayout.buildFloatablePanelStyle("right"),
  HoopsLayout.buildFloatablePanelStyle("top"),
  HoopsLayout.buildFloatablePanelStyle("bottom")
];
__decorateClass$15([
  r$4()
], HoopsLayout.prototype, "slotsShown", 2);
__decorateClass$15([
  n$4({ type: Boolean })
], HoopsLayout.prototype, "floatingPanels", 2);
HoopsLayout = __decorateClass$15([
  t$2("hoops-layout")
], HoopsLayout);
var __getOwnPropDesc$14 = Object.getOwnPropertyDescriptor;
var __decorateClass$14 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$14(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let Toolbar = class extends i$3 {
  /** @internal */
  render() {
    return b`<div class="toolbar">
      <slot></slot>
    </div>`;
  }
};
Toolbar.styles = [
  i$7`
      .toolbar {
        display: flex;
        flex-direction: column;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        gap: 0.1rem;
        align-items: center;
        width: 48px;
        height: calc(100% - 1rem);
        overflow: visible;
        --hoops-dropdown-gap: 0.8rem;
      }
    `
];
Toolbar = __decorateClass$14([
  t$2("hoops-toolbar")
], Toolbar);
const treeContext = n$9("tree");
function toBaseMouseEvent$1(event) {
  return {
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    movementX: event.movementX,
    movementY: event.movementY,
    offsetX: event.offsetX,
    offsetY: event.offsetY,
    pageX: event.pageX,
    pageY: event.pageY,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey
  };
}
var __defProp$U = Object.defineProperty;
var __getOwnPropDesc$13 = Object.getOwnPropertyDescriptor;
var __decorateClass$13 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$13(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$U(target, key, result);
  return result;
};
let TreeNode = class extends i$3 {
  constructor() {
    super(...arguments);
    this.key = Number.NaN;
    this.expanded = false;
    this.selected = false;
    this.leaf = false;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.key) || !this.tree) {
      return A;
    }
    const classNames = ["node"];
    if (this.selected) {
      classNames.push("selected");
    }
    return b`<div
      class=${classNames.join(" ")}
      @click=${this.handleNodeClick}
      @auxclick=${this.handleNodeAuxClick}
    >
      <div class="header">
        ${this.getExpandIcon()}
        <div class="header-caption">
          ${this.tree.context.getContent(
      this.tree.context,
      this.key,
      this.selected,
      this.tree.context.nodesData ? this.tree.context.nodesData[this.key] : void 0
    )}
        </div>
      </div>
      <div class=${`children ${this.expanded ? "expanded" : ""}`}>
        <slot></slot>
      </div>
    </div>`;
  }
  /**
   * Handles click on the expand icon.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-tree-node-expand with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-expand
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleExpandClick(event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-expand",
        {
          bubbles: true,
          composed: true,
          detail: {
            key: this.key,
            expanded: !this.expanded,
            ...toBaseMouseEvent$1(event),
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles click on the node.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-tree-node-click with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-click
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleNodeClick(event) {
    event.stopPropagation();
    const target = event.target;
    const detail = {
      key: this.key,
      ...toBaseMouseEvent$1(event),
      source: target
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-click",
        {
          bubbles: true,
          composed: true,
          detail
        }
      )
    );
  }
  /**
   * Handles right click on the node.
   *
   * This will stop the propagation of the aux click and propagate a
   * hoops-tree-node-aux-click with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-aux-click
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleNodeAuxClick(event) {
    event.stopPropagation();
    const target = event.target;
    const detail = {
      key: this.key,
      ...toBaseMouseEvent$1(event),
      source: target
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-aux-click",
        {
          bubbles: true,
          composed: true,
          detail
        }
      )
    );
  }
  /**
   * Get the expand/collapse icon for a node. If a node is a leaf, it does not
   * make sense to have an expand/collapse icon but you may want to provide an
   * icon for the leafs which is supported by TreeContext
   *
   * @returns {(HTMLTemplateResult | typeof nothing)}
   */
  getExpandIcon() {
    if (!this.tree) {
      return A;
    }
    if (this.leaf) {
      return b`<div class="leaf-icon">${this.tree.context.leafIcon ?? A}</div>`;
    }
    let icon = this.tree.context.collapsedIcon;
    if (this.expanded) {
      icon = this.tree.context.expandedIcon;
    }
    return b`<div class="expand-icon" @click=${this.handleExpandClick}>${icon}</div>`;
  }
};
TreeNode.styles = [
  i$7`
      :host {
        display: block;
      }

      .header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
      }

      .expand-icon,
      .leaf-icon {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .leaf-icon {
        stroke: black;
        fill: black;
      }

      .expand-icon {
        cursor: pointer;
      }

      .expand-icon svg {
        width: 100%;
        height: 100%;
      }

      .expand-icon:hover {
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .children {
        display: none;
        padding-left: 0.5rem;
      }

      .children.expanded {
        display: block;
      }

      hoops-model-tree-node {
        width: 100%;
      }

      .node {
        color: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
        stroke: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
      }

      .node.selected {
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      }

      .header-caption {
        width: calc(100% - 1.2rem);
      }
    `
];
__decorateClass$13([
  c$6({ context: treeContext, subscribe: true })
], TreeNode.prototype, "tree", 2);
__decorateClass$13([
  n$4({ type: Number })
], TreeNode.prototype, "key", 2);
__decorateClass$13([
  n$4({ type: Boolean })
], TreeNode.prototype, "expanded", 2);
__decorateClass$13([
  n$4({ type: Boolean })
], TreeNode.prototype, "selected", 2);
__decorateClass$13([
  n$4({ type: Boolean })
], TreeNode.prototype, "leaf", 2);
TreeNode = __decorateClass$13([
  t$2("hoops-tree-node")
], TreeNode);
var __defProp$T = Object.defineProperty;
var __getOwnPropDesc$12 = Object.getOwnPropertyDescriptor;
var __decorateClass$12 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$12(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$T(target, key, result);
  return result;
};
let Tree = class extends i$3 {
  constructor() {
    super(...arguments);
    this.entries = {};
    this.selected = [];
    this.tree = {
      context: {
        // default implementation to have the tree mounting
        expandedIcon: b`${downIcon}`,
        collapsedIcon: b`${rightIcon}`,
        getRoot: () => Number.NaN,
        getChildren: () => [],
        getContent: () => A,
        isSelected: () => false
      }
    };
  }
  /**
   * Triggers a re-render by reassigning entries.
   *
   * @returns void
   */
  updateEntries() {
    this.entries = { ...this.entries };
  }
  /**
   * Triggers a re-render by reassigning tree context.
   *
   * @returns void
   */
  updateContext() {
    this.tree = { ...this.tree };
  }
  /**
   * Triggers a re-render by reassigning selected entries.
   *
   * @returns void
   */
  updateSelected() {
    this.selected = [...this.selected];
  }
  /**
   * Loads and registers child nodes for a parent node.
   *
   * @param parent - The parent node entry
   * @returns void
   */
  loadChildrenData(parent) {
    const data = parent.children.map(
      (key) => ({
        key,
        parentKey: parent.key,
        children: this.tree.context.getChildren(key),
        expanded: false
      })
    );
    for (const d2 of data) {
      this.entries[d2.key] = this.entries[d2.key] ?? d2;
    }
    this.updateEntries();
  }
  /**
   * Expands all nodes along the specified path.
   *
   * @param nodePath - Array of node keys representing the path to expand
   * @returns void
   * @throws Error when a node in the path is not found
   */
  expandPath(nodePath) {
    var _a2;
    const rootKey = ((_a2 = this.tree) == null ? void 0 : _a2.context.getRoot()) ?? Number.NaN;
    if (isNaN(rootKey)) {
      return;
    }
    this.getRootNodeData(rootKey);
    for (const key of nodePath) {
      if (!this.entries[key]) {
        throw new Error(
          `Unable to expand the path in the tree. Path ${nodePath} is invalid. ${key} didn't found`
        );
      }
      const nodeData = this.entries[key];
      this.loadChildrenData(nodeData);
      nodeData.expanded = true;
    }
    this.updateEntries();
  }
  /**
   * Refreshes node data from context. No-op if node is not loaded.
   *
   * @param nodeKey - The key of the node to refresh
   * @returns void
   */
  refreshNodeData(nodeKey) {
    if (!this.entries[nodeKey]) {
      return;
    }
    const nodeData = this.entries[nodeKey];
    nodeData.children = this.tree.context.getChildren(nodeKey);
    this.loadChildrenData(nodeData);
  }
  /**
   * Removes a node and all its children from the tree. No-op if node is not loaded.
   *
   * @param nodeKey - The key of the node to remove
   * @returns void
   */
  removeNode(nodeKey) {
    const parent = Object.entries(this.entries).find(([, entry]) => {
      return entry.children.includes(nodeKey);
    });
    if (!parent) {
      return;
    }
    const childrenToDelete = [nodeKey];
    while (childrenToDelete.length > 0) {
      const key = childrenToDelete.pop();
      if (!key) {
        continue;
      }
      const entry = this.entries[key];
      if (!entry) {
        continue;
      }
      childrenToDelete.push(...entry.children);
      delete this.entries[key];
    }
    parent[1].children = parent[1].children.filter((key) => key !== nodeKey);
    this.updateEntries();
  }
  /**
   * Resets the tree to its initial state, clearing all entries and selections.
   *
   * @returns void
   */
  resetTree() {
    this.entries = {};
    this.selected = [];
  }
  /** @internal */
  render() {
    var _a2;
    const rootKey = ((_a2 = this.tree) == null ? void 0 : _a2.context.getRoot()) ?? Number.NaN;
    if (Number.isNaN(rootKey)) {
      return b`<div class="tree"></div>`;
    }
    const rootData = this.getRootNodeData(rootKey);
    return b`<div class="tree" @hoops-tree-node-expand=${this.handleNodeExpanded}>
      ${this.getNode(rootData)}
    </div>`;
  }
  /**
   * Handles node expansion events and loads children on demand.
   *
   * @internal
   * @param event - The tree node expand event
   */
  handleNodeExpanded(event) {
    this.entries[event.detail.key].expanded = event.detail.expanded;
    if (event.detail.expanded) {
      this.loadChildrenData(this.entries[event.detail.key]);
    } else {
      this.updateEntries();
    }
  }
  /**
   * Recursively generates HTML template for a node and its loaded children.
   *
   * @internal
   * @param nodeData - Optional node entry data
   * @returns HTML template for the node or nothing if node is not loaded
   */
  getNode(nodeData) {
    if (!nodeData) {
      return A;
    }
    return b`<hoops-tree-node
      class="node"
      key=${nodeData.key}
      ?expanded=${nodeData.expanded}
      ?selected=${this.selected.includes(nodeData.key)}
      ?leaf=${!nodeData.children.length}
    >
      ${nodeData.children.map((child) => this.getNode(this.entries[child]))}
    </hoops-tree-node>`;
  }
  /**
   * Gets or creates the root node entry data.
   *
   * @internal
   * @param rootKey - The key for the root node
   * @returns The root node entry data
   */
  getRootNodeData(rootKey) {
    if (!this.entries[rootKey]) {
      this.entries[rootKey] = {
        key: rootKey,
        expanded: false,
        children: this.tree.context.getChildren(rootKey)
      };
    }
    return this.entries[rootKey];
  }
};
Tree.styles = [
  i$7`
      :host {
        display: block;
      }

      .tree {
        width: 100%;
        height: 100%;
      }
    `
];
__decorateClass$12([
  r$4()
], Tree.prototype, "entries", 2);
__decorateClass$12([
  n$4({ attribute: false })
], Tree.prototype, "selected", 2);
__decorateClass$12([
  e$a({ context: treeContext }),
  n$4({ attribute: false })
], Tree.prototype, "tree", 2);
Tree = __decorateClass$12([
  t$2("hoops-tree")
], Tree);
const listContext = n$9("list");
function toBaseMouseEvent(event) {
  return {
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    movementX: event.movementX,
    movementY: event.movementY,
    offsetX: event.offsetX,
    offsetY: event.offsetY,
    pageX: event.pageX,
    pageY: event.pageY,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey
  };
}
var __defProp$S = Object.defineProperty;
var __getOwnPropDesc$11 = Object.getOwnPropertyDescriptor;
var __decorateClass$11 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$11(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$S(target, key, result);
  return result;
};
let ListElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.key = Number.NaN;
    this.name = "";
    this.selected = false;
  }
  /** @internal */
  render() {
    var _a2;
    const classNames = ["element"];
    if (this.selected) {
      classNames.push("selected");
    }
    return b`<div class=${classNames.join(" ")} @click=${this.handleElementClick}>
      <div class="header" elementId=${this.key}>
        ${(_a2 = this.list) == null ? void 0 : _a2.context.getContent(this.list.context, this.key, this.selected)}
        <slot></slot>
      </div>
    </div>`;
  }
  /**
   * Handles click on the element.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-list-element-click with information about the clicked element.
   *
   * @fires hoops-list-element-click - Emitted with click metadata for the selected element
   *
   * @param {MouseEvent} event The event that triggered the listener.
   * @returns {void}
   */
  handleElementClick(event) {
    event.stopPropagation();
    const target = event.target;
    const detail = {
      key: this.key,
      ...toBaseMouseEvent(event),
      source: target
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-list-element-click",
        {
          bubbles: true,
          composed: true,
          detail
        }
      )
    );
  }
};
ListElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
      }

      hoops-model-list-element {
        width: 100%;
      }

      .element {
        color: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
        stroke: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
      }

      .element.selected {
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      }
    `
];
__decorateClass$11([
  c$6({ context: listContext, subscribe: true })
], ListElement.prototype, "list", 2);
__decorateClass$11([
  n$4({ type: Number })
], ListElement.prototype, "key", 2);
__decorateClass$11([
  n$4({ type: String })
], ListElement.prototype, "name", 2);
__decorateClass$11([
  n$4({ type: Boolean })
], ListElement.prototype, "selected", 2);
ListElement = __decorateClass$11([
  t$2("hoops-list-element")
], ListElement);
var __defProp$R = Object.defineProperty;
var __getOwnPropDesc$10 = Object.getOwnPropertyDescriptor;
var __decorateClass$10 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$10(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$R(target, key, result);
  return result;
};
let List = class extends i$3 {
  constructor() {
    super(...arguments);
    this.selected = [];
    this.list = {
      context: {
        elementsData: void 0,
        sortedByValue: false,
        getContent(_context, key, _selected) {
          var _a2;
          return b`id: ${key}, value: ${(_a2 = this.elementsData) == null ? void 0 : _a2.get(key)}`;
        }
      }
    };
  }
  /**
   * Triggers a re-render by reassigning list context.
   *
   * @returns void
   */
  updateContext() {
    this.list = { ...this.list };
  }
  /**
   * Triggers a re-render by reassigning selected elements.
   *
   * @returns void
   */
  updateSelected() {
    this.selected = [...this.selected];
  }
  /** @internal */
  render() {
    if (this.list === void 0) {
      return b`<div class="list"></div>`;
    }
    let elements = this.list.context.elementsData;
    if (elements === void 0) {
      return b`<div class="list"></div>`;
    }
    if (this.list.context.sortedByValue === true) {
      elements = new Map([...elements].sort((a2, b2) => a2[1].localeCompare(b2[1])));
    }
    const elementsHtml = [];
    elements.forEach((_value, key) => {
      const selected = this.selected.includes(key);
      elementsHtml.push(this.getElementHtml(key, selected));
    });
    return b`<div class="list">${elementsHtml}</div>`;
  }
  /**
   * Generates HTML template for a list element.
   *
   * @internal
   * @param elementKey - The element's unique key
   * @param selected - Whether the element is selected
   * @returns HTML template for the element
   */
  getElementHtml(elementKey, selected) {
    return b`<hoops-list-element class="element" key=${elementKey} ?selected=${selected}>
    </hoops-list-element>`;
  }
};
List.styles = [
  i$7`
      :host {
        display: block;
      }

      .list {
        width: 100%;
        height: 100%;
      }
    `
];
__decorateClass$10([
  n$4({ attribute: false })
], List.prototype, "selected", 2);
__decorateClass$10([
  e$a({ context: listContext }),
  n$4({ attribute: false })
], List.prototype, "list", 2);
List = __decorateClass$10([
  t$2("hoops-list")
], List);
var __defProp$Q = Object.defineProperty;
var __getOwnPropDesc$$ = Object.getOwnPropertyDescriptor;
var __decorateClass$$ = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$$(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$Q(target, key, result);
  return result;
};
let HoopsSwitchElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
    this.label = "";
  }
  /** @internal */
  render() {
    return b`
      <label
        class="switch"
        role="switch"
        title=${this.label}
        aria-label=${this.label}
        aria-checked=${this.checked}
        @click=${(event) => event.stopPropagation()}
      >
        <input
          type="checkbox"
          .checked="${this.checked}"
          ?disabled=${this.disabled}
          @change="${this._toggle}"
        />
        <span class=${["slider", this.disabled ? "disabled" : ""].join(" ")}></span>
      </label>
    `;
  }
  _toggle(event) {
    if (this.disabled) {
      return;
    }
    event.stopPropagation();
    this.checked = event.target.checked;
    this.dispatchEvent(new Event("change"));
  }
};
HoopsSwitchElement.styles = i$7`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      --slider-color: color-mix(
        in srgb,
        var(--hoops-background, blue),
        var(--hoops-foreground, red) 30%
      );
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 1.825rem;
      height: 1rem;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: var(--slider-color);
      box-shadow: 0 0 1px var(--slider-color);
      transition: 0.4s;
      border-radius: 1rem;
    }

    .slider.disabled {
      cursor: not-allowed;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 1rem;
      width: 1rem;
      left: 0;
      bottom: calc(50% - 0.5rem);
      background-color: var(--hoops-background, #fafafa);
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
    }

    input:checked + .slider.disabled {
      background-color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      filter: grayscale(1);
    }

    input:checked + .slider:before {
      transform: translateX(0.825rem);
    }
  `;
__decorateClass$$([
  n$4({ type: Boolean })
], HoopsSwitchElement.prototype, "checked", 2);
__decorateClass$$([
  n$4({ type: Boolean })
], HoopsSwitchElement.prototype, "disabled", 2);
__decorateClass$$([
  n$4({ type: String })
], HoopsSwitchElement.prototype, "label", 2);
HoopsSwitchElement = __decorateClass$$([
  t$2("hoops-switch")
], HoopsSwitchElement);
var __defProp$P = Object.defineProperty;
var __getOwnPropDesc$_ = Object.getOwnPropertyDescriptor;
var __decorateClass$_ = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$_(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$P(target, key, result);
  return result;
};
let HoopsTabElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.label = "";
    this.disabled = false;
  }
  /** @internal */
  render() {
    return b`
      <div class="panel" role="tabpanel">
        <slot></slot>
      </div>
    `;
  }
};
HoopsTabElement.styles = [
  i$7`
      :host {
        display: block;
        height: 100%;
      }

      .panel {
        height: 100%;
        box-sizing: border-box;
      }
    `
];
__decorateClass$_([
  n$4({ type: String })
], HoopsTabElement.prototype, "label", 2);
__decorateClass$_([
  n$4({ type: String })
], HoopsTabElement.prototype, "value", 2);
__decorateClass$_([
  n$4({ type: String })
], HoopsTabElement.prototype, "icon", 2);
__decorateClass$_([
  n$4({ type: Boolean })
], HoopsTabElement.prototype, "disabled", 2);
HoopsTabElement = __decorateClass$_([
  t$2("hoops-tab")
], HoopsTabElement);
var __defProp$O = Object.defineProperty;
var __getOwnPropDesc$Z = Object.getOwnPropertyDescriptor;
var __decorateClass$Z = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$Z(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$O(target, key, result);
  return result;
};
let HoopsTabsElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.selectedIndex = 0;
    this.position = "top";
    this._tabsMetadata = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this._updateTabsMetadata();
    this.requestUpdate();
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("selectedIndex")) {
      this._updateTabVisibility();
    }
  }
  /**
   * Updates the metadata array from slotted tabs.
   * @internal
   */
  _updateTabsMetadata() {
    if (!this._tabs || this._tabs.length === 0) {
      return;
    }
    this._tabsMetadata = this._tabs.map((tab) => ({
      label: tab.label || "",
      disabled: tab.disabled || false,
      icon: tab.icon,
      value: tab.value
    }));
    this._updateTabVisibility();
  }
  /**
   * Updates the visibility of tab panels based on selected index.
   * @internal
   */
  _updateTabVisibility() {
    if (!this._tabs) {
      return;
    }
    this._tabs.forEach((tab, index) => {
      const isSelected = index === this.selectedIndex;
      tab.setAttribute("aria-hidden", String(!isSelected));
      tab.style.display = isSelected ? "block" : "none";
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
  _handleTabClick(index) {
    var _a2;
    if ((_a2 = this._tabsMetadata[index]) == null ? void 0 : _a2.disabled) {
      return;
    }
    this._selectTab(index);
  }
  /**
   * Handles keyboard navigation between tabs.
   *
   * @param event - Keyboard event
   * @param currentIndex - Current tab index
   * @internal
   */
  _handleKeyDown(event, currentIndex) {
    const isVertical = this.position === "left" || this.position === "right";
    const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
    let newIndex = currentIndex;
    switch (event.key) {
      case prevKey:
        event.preventDefault();
        newIndex = this._findPreviousEnabledTab(currentIndex);
        break;
      case nextKey:
        event.preventDefault();
        newIndex = this._findNextEnabledTab(currentIndex);
        break;
      case "Home":
        event.preventDefault();
        newIndex = this._findFirstEnabledTab();
        break;
      case "End":
        event.preventDefault();
        newIndex = this._findLastEnabledTab();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        this._selectTab(currentIndex);
        return;
      default:
        return;
    }
    if (newIndex !== currentIndex) {
      this._focusTab(newIndex);
    }
  }
  /**
   * Finds the previous enabled tab index.
   *
   * @param currentIndex - Current tab index
   * @returns Previous enabled tab index or current index if none found
   * @internal
   */
  _findPreviousEnabledTab(currentIndex) {
    var _a2, _b;
    for (let i5 = currentIndex - 1; i5 >= 0; i5--) {
      if (!((_a2 = this._tabsMetadata[i5]) == null ? void 0 : _a2.disabled)) {
        return i5;
      }
    }
    for (let i5 = this._tabsMetadata.length - 1; i5 > currentIndex; i5--) {
      if (!((_b = this._tabsMetadata[i5]) == null ? void 0 : _b.disabled)) {
        return i5;
      }
    }
    return currentIndex;
  }
  /**
   * Finds the next enabled tab index.
   *
   * @param currentIndex - Current tab index
   * @returns Next enabled tab index or current index if none found
   * @internal
   */
  _findNextEnabledTab(currentIndex) {
    var _a2, _b;
    for (let i5 = currentIndex + 1; i5 < this._tabsMetadata.length; i5++) {
      if (!((_a2 = this._tabsMetadata[i5]) == null ? void 0 : _a2.disabled)) {
        return i5;
      }
    }
    for (let i5 = 0; i5 < currentIndex; i5++) {
      if (!((_b = this._tabsMetadata[i5]) == null ? void 0 : _b.disabled)) {
        return i5;
      }
    }
    return currentIndex;
  }
  /**
   * Finds the first enabled tab index.
   *
   * @returns First enabled tab index or 0 if none found
   * @internal
   */
  _findFirstEnabledTab() {
    var _a2;
    for (let i5 = 0; i5 < this._tabsMetadata.length; i5++) {
      if (!((_a2 = this._tabsMetadata[i5]) == null ? void 0 : _a2.disabled)) {
        return i5;
      }
    }
    return 0;
  }
  /**
   * Finds the last enabled tab index.
   *
   * @returns Last enabled tab index or last index if none found
   * @internal
   */
  _findLastEnabledTab() {
    var _a2;
    for (let i5 = this._tabsMetadata.length - 1; i5 >= 0; i5--) {
      if (!((_a2 = this._tabsMetadata[i5]) == null ? void 0 : _a2.disabled)) {
        return i5;
      }
    }
    return this._tabsMetadata.length - 1;
  }
  /**
   * Focuses a tab button by index.
   *
   * @param index - Tab index to focus
   * @internal
   */
  _focusTab(index) {
    var _a2;
    const tabButtons = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(".tab-button");
    const button = tabButtons == null ? void 0 : tabButtons[index];
    button == null ? void 0 : button.focus();
  }
  /**
   * Selects a tab by index and dispatches change event.
   *
   * @param index - Tab index to select
   * @internal
   */
  _selectTab(index) {
    var _a2, _b;
    if (index === this.selectedIndex || ((_a2 = this._tabsMetadata[index]) == null ? void 0 : _a2.disabled)) {
      return;
    }
    this.selectedIndex = index;
    const detail = {
      selectedIndex: index,
      selectedValue: (_b = this._tabsMetadata[index]) == null ? void 0 : _b.value
    };
    this.dispatchEvent(
      new CustomEvent("hoops-tabs-change", {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }
  /**
   * Selects a tab by its value property.
   *
   * @param value - The value of the tab to select
   */
  selectByValue(value) {
    const index = this._tabsMetadata.findIndex((tab) => tab.value === value);
    if (index !== -1) {
      this._selectTab(index);
    }
  }
  /**
   * Renders the component.
   *
   * @returns The template result
   * @internal
   */
  render() {
    return b`
      <div class="tab-header" role="tablist">
        ${this._tabsMetadata.map(
      (tab, index) => b`
            <button
              class="tab-button"
              role="tab"
              aria-selected="${this.selectedIndex === index}"
              aria-controls="panel-${index}"
              id="tab-${index}"
              tabindex="${this.selectedIndex === index ? 0 : -1}"
              ?disabled="${tab.disabled}"
              @click="${() => this._handleTabClick(index)}"
              @keydown="${(e3) => this._handleKeyDown(e3, index)}"
            >
              ${tab.icon ? b`<span class="tab-icon">${tab.icon}</span>` : ""} ${tab.label}
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
HoopsTabsElement.styles = [
  i$7`
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
__decorateClass$Z([
  n$4({ type: Number, reflect: true })
], HoopsTabsElement.prototype, "selectedIndex", 2);
__decorateClass$Z([
  n$4({ type: String, reflect: true })
], HoopsTabsElement.prototype, "position", 2);
__decorateClass$Z([
  o$5({ selector: "hoops-tab" })
], HoopsTabsElement.prototype, "_tabs", 2);
__decorateClass$Z([
  r$4()
], HoopsTabsElement.prototype, "_tabsMetadata", 2);
HoopsTabsElement = __decorateClass$Z([
  t$2("hoops-tabs")
], HoopsTabsElement);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e$2(class extends i$2 {
  constructor(t2) {
    var _a2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "class" !== t2.name || ((_a2 = t2.strings) == null ? void 0 : _a2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter(((s5) => t2[s5])).join(" ") + " ";
  }
  update(s5, [i5]) {
    var _a2, _b;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter(((t2) => "" !== t2))));
      for (const t2 in i5) i5[t2] && !((_a2 = this.nt) == null ? void 0 : _a2.has(t2)) && this.st.add(t2);
      return this.render(i5);
    }
    const r2 = s5.element.classList;
    for (const t2 of this.st) t2 in i5 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i5) {
      const s6 = !!i5[t2];
      s6 === this.st.has(t2) || ((_b = this.nt) == null ? void 0 : _b.has(t2)) || (s6 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return T;
  }
});
var __defProp$N = Object.defineProperty;
var __getOwnPropDesc$Y = Object.getOwnPropertyDescriptor;
var __decorateClass$Y = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$Y(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$N(target, key, result);
  return result;
};
let HoopsTreeItemElement = class extends i$3 {
  constructor() {
    super();
    this.expanded = false;
    this.selected = false;
    this.leaf = false;
    this.noAnim = false;
    this.hidden = true;
    this.hidden = !this.expanded;
    this.addEventListener("hoops-tree-item-expand", (e3) => {
      if (e3.target !== this) {
        return;
      }
      this.expanded = e3.detail.expanded;
    });
  }
  willUpdate(_2) {
    if (this.expanded) {
      this.hidden = false;
    } else {
      setTimeout(() => {
        this.hidden = true;
      }, 250);
    }
  }
  /** @internal */
  render() {
    return b`
      <div
        class=${e$1({
      "tree-item": true,
      selected: this.selected
    })}
        @click=${(e3) => {
      e3.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hoops-tree-item-select", {
          bubbles: true,
          composed: true,
          detail: {
            selected: !this.selected
          }
        })
      );
    }}
      >
        <div
          class="expand-icon"
          @click=${(e3) => {
      e3.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hoops-tree-item-expand", {
          bubbles: true,
          composed: true,
          detail: {
            expanded: !this.expanded
          }
        })
      );
    }}
        >
          <slot name="icon">
            ${this.leaf ? A : b` <hoops-icon
                  icon=${this.expanded ? "downIcon" : "rightIcon"}
                  style="width:1rem;"
                ></hoops-icon>`}
          </slot>
        </div>
        <slot></slot>
      </div>
      ${this.leaf ? A : b`<div
            ?hidden=${this.hidden}
            class=${e$1({
      children: true,
      "no-anim": this.noAnim,
      expanded: this.expanded,
      collapsed: !this.hidden && !this.expanded
    })}
          >
            <slot name="children"></slot>
          </div>`}
    `;
  }
};
HoopsTreeItemElement.styles = [
  i$7`
      :host {
        display: block;
        --scale-in-anim: scale-in-ver-top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        --scale-out-anim: scale-out-ver-top 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          --scale-in-anim: none;
          --scale-out-anim: none;
        }
      }

      .tree-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
      }

      .tree-item::before {
        content: '';
        display: inline-block;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }

      .tree-item:hover::before {
        background-color: color-mix(
          in srgb,
          var(--hoops-neutral-foreground-20, #1181d7) 15%,
          transparent
        );
      }

      .tree-item.selected {
        font-weight: bold;
        color: var(--hoops-neutral-foreground-20, #1181d7);
        stroke: var(--hoops-neutral-foreground-20, #1181d7);
        fill: var(--hoops-neutral-foreground-20, #1181d7);
      }

      .expand-icon {
        color: var(--hoops-foreground, #303030);
        stroke: var(--hoops-svg-stroke-color, #303030);
        fill: var(--hoops-svg-fill-color, #f0f0f0);
      }

      .children {
        padding-left: 1.5rem;
        height: min-content;
      }

      .children.expanded:not(.no-anim) {
        -webkit-animation: var(--scale-in-anim);
        animation: var(--scale-in-anim);
      }

      .children.collapsed:not(.no-anim) {
        -webkit-animation: var(--scale-out-anim);
        animation: var(--scale-out-anim);
      }

      @-webkit-keyframes scale-in-ver-top {
        0% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @keyframes scale-in-ver-top {
        0% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }

      @-webkit-keyframes scale-out-ver-top {
        0% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @keyframes scale-out-ver-top {
        0% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
    `
];
__decorateClass$Y([
  n$4({ type: Boolean })
], HoopsTreeItemElement.prototype, "expanded", 2);
__decorateClass$Y([
  n$4({ type: Boolean })
], HoopsTreeItemElement.prototype, "selected", 2);
__decorateClass$Y([
  n$4({ type: Boolean })
], HoopsTreeItemElement.prototype, "leaf", 2);
__decorateClass$Y([
  n$4({ type: Boolean, attribute: "no-anim" })
], HoopsTreeItemElement.prototype, "noAnim", 2);
__decorateClass$Y([
  r$4()
], HoopsTreeItemElement.prototype, "hidden", 2);
HoopsTreeItemElement = __decorateClass$Y([
  t$2("hoops-tree-item")
], HoopsTreeItemElement);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$3 = (o2) => o2 ?? E$1;
var __defProp$M = Object.defineProperty;
var __getOwnPropDesc$X = Object.getOwnPropertyDescriptor;
var __decorateClass$X = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$X(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$M(target, key, result);
  return result;
};
let HoopsAccordion = class extends i$3 {
  constructor() {
    super(...arguments);
    this.expanded = false;
    this.disabled = false;
  }
  /** @internal */
  render() {
    return b`
      <div>
        <div role="heading" aria-level=${o$3(this.level)}>
          <button
            class="accordion-button"
            ?disabled=${this.disabled}
            role="button"
            aria-expanded=${this.expanded}
            aria-disabled=${this.disabled}
          >
            <slot name="header" @click=${this._toggle}></slot>
            <slot name="toolbar"></slot>
            <slot name="icon" @click=${this._toggle}>
              <hoops-icon
                class="expandIcon"
                icon=${this.expanded ? "downIcon" : "rightIcon"}
              ></hoops-icon>
            </slot>
          </button>
        </div>
        <div class="panel" role="region" aria-hidden=${!this.expanded}>
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
  /**
   * Toggles the accordion's expanded state.
   * @internal
   */
  _toggle() {
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
    this.dispatchEvent(new Event("change"));
  }
};
HoopsAccordion.styles = i$7`
    :host {
      display: block;
    }

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      background-color: var(--hoops-neutral-background-50, #f0f0f0);
      color: var(--hoops-foreground, #303030);
      cursor: pointer;
      border: none;
      text-align: left;
      outline: none;
      font-size: 1.25rem;
    }

    slot[name='header']::slotted(*) {
      flex-grow: 1;
    }

    button[disabled] {
      cursor: not-allowed;
      filter: grayscale(1);
    }

    hoops-icon {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      width: 2rem;
      height: 2rem;
      stroke: var(--hoops-foreground, #303030);
    }

    .panel {
      background-color: var(--hoops-background, #fafafa);
      color: var(--hoops-foreground, #303030);
      height: 100%;
      display: none;
      border: solid 1px var(--hoops-neutral-foreground-20, #1181d7);
    }

    .panel[aria-hidden='false'] {
      display: block;
    }

    .expandIcon {
      stroke: var(--hoops-foreground, #303030);
    }
  `;
__decorateClass$X([
  n$4({ type: Boolean })
], HoopsAccordion.prototype, "expanded", 2);
__decorateClass$X([
  n$4({ type: Boolean })
], HoopsAccordion.prototype, "disabled", 2);
__decorateClass$X([
  n$4({ type: Number })
], HoopsAccordion.prototype, "level", 2);
HoopsAccordion = __decorateClass$X([
  t$2("hoops-accordion")
], HoopsAccordion);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$2(n3, r2, t2) {
  return n3 ? r2(n3) : t2 == null ? void 0 : t2(n3);
}
const componentBaseStyle = i$7`
  :host {
    display: block;
    color: var(--hoops-neutral-foreground, #303030);
    stroke: var(--hoops-neutral-foreground, #303030);
    box-sizing: border-box;
  }

  :host * {
    box-sizing: border-box;
  }
`;
var __defProp$L = Object.defineProperty;
var __getOwnPropDesc$W = Object.getOwnPropertyDescriptor;
var __decorateClass$W = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$W(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$L(target, key, result);
  return result;
};
let HoopsIconButton = class extends i$3 {
  constructor() {
    super();
    this.tabindex = "0";
    this.role = "button";
    this.size = "md";
    this.color = "default";
    this.disabled = false;
    this.addEventListener("keypress", this.handleKeypress);
  }
  /**
   * Handles keyboard interactions for the button.
   *
   * @param keypressEvent - The keyboard event to handle
   * @returns void
   *
   * @internal
   */
  handleKeypress(keypressEvent) {
    if (keypressEvent.key === "Space" || keypressEvent.key === "Enter") {
      keypressEvent.preventDefault();
      keypressEvent.stopPropagation();
      if (!this.disabled) {
        this.click();
      }
    }
  }
  /** @internal */
  render() {
    return b`
      <div
        class="container"
        size=${this.size}
        color="${this.color}"
        ?hoopsdisabled=${this.disabled}
      >
        <slot></slot>
      </div>
    `;
  }
};
HoopsIconButton.styles = [
  i$7`
      :host {
        display: inline-block;
        user-select: none;
      }
      .container {
        border: none;
        display: flex;
        align-items: center;
        background-color: transparent;
        color: var(--hoops-neutral-foreground, #303030);
        transition: background-color linear 0.2s;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
      }
      .container[color='default'] {
        color: var(--hoops-neutral-foreground, #303030);
      }
      .container[color='accent'] {
        color: var(--hoops-accent-foreground, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      }
      :host(:is(:hover, :active, :focus))
        .container[color='default']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-neutral-foreground-active, #f0f0f0);
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }
      :host(:is(:hover, :active, :focus))
        .container[color='accent']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }
      .container[size='xl'] {
        height: var(--hoops-xl-icon-button-size, 2.8rem);
        width: var(--hoops-xl-icon-button-size, 2.8rem);
      }
      [size='xl'] ::slotted(*) {
        width: var(--hoops-xl-icon-button-content-size, 2.6rem);
        height: var(--hoops-xl-icon-button-content-size, 2.6rem);
      }
      .container[size='md'] {
        height: var(--hoops-md-icon-button-size, 2rem);
        width: var(--hoops-md-icon-button-size, 2rem);
      }
      [size='md'] ::slotted(*) {
        width: var(--hoops-md-icon-button-content-size, 1.6rem);
        height: var(--hoops-md-icon-button-content-size, 1.6rem);
      }
      .container[size='sm'] {
        height: var(--hoops-sm-icon-button-size, 1.8rem);
        width: var(--hoops-sm-icon-button-size, 1.8rem);
      }
      [size='sm'] ::slotted(*) {
        width: var(--hoops-sm-icon-button-content-size, 1.2rem);
        height: var(--hoops-sm-icon-button-content-size, 1.2rem);
      }
      .container[hoopsdisabled] {
        cursor: auto;
        opacity: 0.25;
      }
    `
];
__decorateClass$W([
  n$4({ reflect: true })
], HoopsIconButton.prototype, "tabindex", 2);
__decorateClass$W([
  n$4({ reflect: true })
], HoopsIconButton.prototype, "role", 2);
__decorateClass$W([
  n$4()
], HoopsIconButton.prototype, "size", 2);
__decorateClass$W([
  n$4()
], HoopsIconButton.prototype, "color", 2);
__decorateClass$W([
  n$4({ type: Boolean })
], HoopsIconButton.prototype, "disabled", 2);
HoopsIconButton = __decorateClass$W([
  t$2("hoops-icon-button")
], HoopsIconButton);
var __defProp$K = Object.defineProperty;
var __getOwnPropDesc$V = Object.getOwnPropertyDescriptor;
var __decorateClass$V = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$V(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$K(target, key, result);
  return result;
};
let DropdownMenu = class extends i$3 {
  constructor() {
    super();
    this.preventCloseOnClickInside = false;
    this.menuShown = false;
    this.position = "bottom";
    this.focusableSelector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    this.disabled = false;
    this.addEventListener("focusout", (event) => {
      var _a2;
      const isFocusLost = event.relatedTarget !== this;
      const isFocusingDropdown = ((_a2 = event.relatedTarget) == null ? void 0 : _a2.closest("hoops-dropdown")) === this;
      if (isFocusLost && !isFocusingDropdown) {
        this.menuShown = false;
      }
    });
    document.addEventListener("click", (e3) => {
      const clickInside = e3.composedPath().some((el) => el === this);
      if (this.preventCloseOnClickInside && clickInside) {
        return;
      }
      if (e3.target !== this) {
        this.menuShown = false;
      }
    });
  }
  /**
   * Focuses on the first item in the dropdown list of focusable elements.
   *
   * @return {void}
   */
  focusFirstDropdownItem() {
    var _a2, _b;
    (_b = (_a2 = this.focusableDropdownChildren) == null ? void 0 : _a2.item(0)) == null ? void 0 : _b.focus();
  }
  /**
   * Retrieves the focusable children within the dropdown slot element.
   *
   * @return {NodeListOf<HTMLElement> | undefined} A list of HTMLElements representing the focusable children
   */
  get focusableDropdownChildren() {
    var _a2, _b;
    return (_b = (_a2 = this.dropdownSlot) == null ? void 0 : _a2.at(0)) == null ? void 0 : _b.querySelectorAll(this.focusableSelector);
  }
  /**
   * Returns the positional styles for a dropdown based on the current position.
   * The styles include properties such as 'left', 'right', 'top', 'bottom' and 'margin'.
   *
   * @returns {StyleInfo} Object representing the positional styles for the dropdown
   */
  get dropdownPositionalStyles() {
    const GAP = "var(--hoops-dropdown-gap, 0.2rem)";
    const positions = {
      left: { right: "100%", top: "0", "margin-right": GAP },
      right: { left: "100%", top: "0", "margin-left": GAP },
      bottom: { top: "100%", left: "0", "margin-top": GAP },
      top: { bottom: "100%", left: "0", "margin-bottom": GAP }
    };
    let position = { ...positions[this.position] };
    if (this.anchor) {
      const anchorAdjustments = {
        top: { top: "0", bottom: "initial" },
        bottom: { bottom: "0", top: "initial" },
        left: { left: "0", right: "initial" },
        right: { right: "0", left: "initial" }
      };
      position = { ...position, ...anchorAdjustments[this.anchor] };
    }
    return position;
  }
  /**
   * Toggles the dropdown menu visibility based on the current state.
   *
   * @param {PointerEvent} event - The pointer event triggering the dropdown toggle.
   *
   * @return {Promise<void>}
   */
  async toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.menuShown = !this.menuShown;
    if (this.menuShown) {
      await this.updateComplete;
      this.focusFirstDropdownItem();
    }
  }
  /** @internal */
  render() {
    return b`
      <slot @click=${this.toggleDropdown}></slot>
      ${n$2(
      this.menuShown,
      () => b` <div class="dropdown-panel" style="${o$4(this.dropdownPositionalStyles)}">
            <slot name="dropdown-popup"></slot>
          </div>`
    )}
    `;
  }
};
DropdownMenu.shadowRootOptions = { ...i$3.shadowRootOptions, delegatesFocus: true };
DropdownMenu.styles = [
  componentBaseStyle,
  i$7`
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
__decorateClass$V([
  n$4({ type: Boolean, reflect: true })
], DropdownMenu.prototype, "preventCloseOnClickInside", 2);
__decorateClass$V([
  r$4()
], DropdownMenu.prototype, "menuShown", 2);
__decorateClass$V([
  n$4()
], DropdownMenu.prototype, "position", 2);
__decorateClass$V([
  n$4()
], DropdownMenu.prototype, "anchor", 2);
__decorateClass$V([
  n$4()
], DropdownMenu.prototype, "focusableSelector", 2);
__decorateClass$V([
  o$5({ slot: "dropdown-popup" })
], DropdownMenu.prototype, "dropdownSlot", 2);
__decorateClass$V([
  o$5()
], DropdownMenu.prototype, "defaultSlot", 2);
__decorateClass$V([
  n$4({ type: Boolean, reflect: true })
], DropdownMenu.prototype, "disabled", 2);
DropdownMenu = __decorateClass$V([
  t$2("hoops-dropdown")
], DropdownMenu);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i4 = Symbol();
let h$2 = class h {
  get taskComplete() {
    return this.t || (1 === this.i ? this.t = new Promise(((t2, s5) => {
      this.o = t2, this.h = s5;
    })) : 3 === this.i ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
  }
  constructor(t2, s5, i5) {
    var _a2;
    this.p = 0, this.i = 0, (this._ = t2).addController(this);
    const h3 = "object" == typeof s5 ? s5 : { task: s5, args: i5 };
    this.v = h3.task, this.j = h3.args, this.m = h3.argsEqual ?? r$2, this.k = h3.onComplete, this.A = h3.onError, this.autoRun = h3.autoRun ?? true, "initialValue" in h3 && (this.u = h3.initialValue, this.i = 2, this.O = (_a2 = this.T) == null ? void 0 : _a2.call(this));
  }
  hostUpdate() {
    true === this.autoRun && this.S();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this.S();
  }
  T() {
    if (void 0 === this.j) return;
    const t2 = this.j();
    if (!Array.isArray(t2)) throw Error("The args function must return an array");
    return t2;
  }
  async S() {
    const t2 = this.T(), s5 = this.O;
    this.O = t2, t2 === s5 || void 0 === t2 || void 0 !== s5 && this.m(s5, t2) || await this.run(t2);
  }
  async run(t2) {
    var _a2, _b, _c, _d, _e;
    let s5, h3;
    t2 ?? (t2 = this.T()), this.O = t2, 1 === this.i ? (_a2 = this.q) == null ? void 0 : _a2.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, "afterUpdate" === this.autoRun ? queueMicrotask((() => this._.requestUpdate())) : this._.requestUpdate();
    const r2 = ++this.p;
    this.q = new AbortController();
    let e3 = false;
    try {
      s5 = await this.v(t2, { signal: this.q.signal });
    } catch (t3) {
      e3 = true, h3 = t3;
    }
    if (this.p === r2) {
      if (s5 === i4) this.i = 0;
      else {
        if (false === e3) {
          try {
            (_b = this.k) == null ? void 0 : _b.call(this, s5);
          } catch {
          }
          this.i = 2, (_c = this.o) == null ? void 0 : _c.call(this, s5);
        } else {
          try {
            (_d = this.A) == null ? void 0 : _d.call(this, h3);
          } catch {
          }
          this.i = 3, (_e = this.h) == null ? void 0 : _e.call(this, h3);
        }
        this.u = s5, this.l = h3;
      }
      this._.requestUpdate();
    }
  }
  abort(t2) {
    var _a2;
    1 === this.i && ((_a2 = this.q) == null ? void 0 : _a2.abort(t2));
  }
  get value() {
    return this.u;
  }
  get error() {
    return this.l;
  }
  get status() {
    return this.i;
  }
  render(t2) {
    var _a2, _b, _c, _d;
    switch (this.i) {
      case 0:
        return (_a2 = t2.initial) == null ? void 0 : _a2.call(t2);
      case 1:
        return (_b = t2.pending) == null ? void 0 : _b.call(t2);
      case 2:
        return (_c = t2.complete) == null ? void 0 : _c.call(t2, this.value);
      case 3:
        return (_d = t2.error) == null ? void 0 : _d.call(t2, this.error);
      default:
        throw Error("Unexpected status: " + this.i);
    }
  }
};
const r$2 = (s5, i5) => s5 === i5 || s5.length === i5.length && s5.every(((s6, h3) => !f$4(s6, i5[h3])));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t } = Z$1, f$1 = (o2) => void 0 === o2.strings, s$1 = () => document.createComment(""), r$1 = (o2, i5, n3) => {
  var _a2;
  const e3 = o2._$AA.parentNode, l2 = void 0 === i5 ? o2._$AB : i5._$AA;
  if (void 0 === n3) {
    const i6 = e3.insertBefore(s$1(), l2), c2 = e3.insertBefore(s$1(), l2);
    n3 = new t(i6, c2, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i6 = n3._$AM, c2 = i6 !== o2;
    if (c2) {
      let t3;
      (_a2 = n3._$AQ) == null ? void 0 : _a2.call(n3, o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i6._$AU && n3._$AP(t3);
    }
    if (t2 !== l2 || c2) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e3.insertBefore(o3, l2), o3 = t3;
      }
    }
  }
  return n3;
}, v = (o2, t2, i5 = o2) => (o2._$AI(t2, i5), o2), u$1 = {}, m = (o2, t2 = u$1) => o2._$AH = t2, p = (o2) => o2._$AH, M2 = (o2) => {
  var _a2;
  (_a2 = o2._$AP) == null ? void 0 : _a2.call(o2, false, true);
  let t2 = o2._$AA;
  const i5 = o2._$AB.nextSibling;
  for (; t2 !== i5; ) {
    const o3 = t2.nextSibling;
    t2.remove(), t2 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e3, s5, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s5; l2 <= t2; l2++) r2.set(e3[l2], l2);
  return r2;
}, c$1 = e$2(class extends i$2 {
  constructor(e3) {
    if (super(e3), e3.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e3, s5, t2) {
    let r2;
    void 0 === t2 ? t2 = s5 : void 0 !== s5 && (r2 = s5);
    const l2 = [], o2 = [];
    let i5 = 0;
    for (const s6 of e3) l2[i5] = r2 ? r2(s6, i5) : i5, o2[i5] = t2(s6, i5), i5++;
    return { values: o2, keys: l2 };
  }
  render(e3, s5, t2) {
    return this.dt(e3, s5, t2).values;
  }
  update(s5, [t2, r2, c2]) {
    const d2 = p(s5), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h3 = this.ut ?? (this.ut = []), v$12 = [];
    let m$12, y3, x2 = 0, j2 = d2.length - 1, k3 = 0, w2 = p$12.length - 1;
    for (; x2 <= j2 && k3 <= w2; ) if (null === d2[x2]) x2++;
    else if (null === d2[j2]) j2--;
    else if (h3[x2] === a2[k3]) v$12[k3] = v(d2[x2], p$12[k3]), x2++, k3++;
    else if (h3[j2] === a2[w2]) v$12[w2] = v(d2[j2], p$12[w2]), j2--, w2--;
    else if (h3[x2] === a2[w2]) v$12[w2] = v(d2[x2], p$12[w2]), r$1(s5, v$12[w2 + 1], d2[x2]), x2++, w2--;
    else if (h3[j2] === a2[k3]) v$12[k3] = v(d2[j2], p$12[k3]), r$1(s5, d2[x2], d2[j2]), j2--, k3++;
    else if (void 0 === m$12 && (m$12 = u(a2, k3, w2), y3 = u(h3, x2, j2)), m$12.has(h3[x2])) if (m$12.has(h3[j2])) {
      const e3 = y3.get(a2[k3]), t3 = void 0 !== e3 ? d2[e3] : null;
      if (null === t3) {
        const e4 = r$1(s5, d2[x2]);
        v(e4, p$12[k3]), v$12[k3] = e4;
      } else v$12[k3] = v(t3, p$12[k3]), r$1(s5, d2[x2], t3), d2[e3] = null;
      k3++;
    } else M2(d2[j2]), j2--;
    else M2(d2[x2]), x2++;
    for (; k3 <= w2; ) {
      const e3 = r$1(s5, v$12[w2 + 1]);
      v(e3, p$12[k3]), v$12[k3++] = e3;
    }
    for (; x2 <= j2; ) {
      const e3 = d2[x2++];
      null !== e3 && M2(e3);
    }
    return this.ut = a2, m(s5, v$12), T;
  }
});
class NodePropertyAdapter {
  /**
   * Get the name of the node
   *
   * @param {number} nodeId The node to gather information from
   * @returns {string} The name of the node
   */
  getNodeName(nodeId) {
    var _a2;
    return ((_a2 = this.model) == null ? void 0 : _a2.getNodeName(nodeId)) ?? "N/A";
  }
  /**
   * Collects all the properties from a given node
   *
   * @param nodeId The id of the node
   * @returns {Promise<[string, string][]>} A table containing the properties as [name, value]
   * tuples
   */
  async getProperties(nodeId) {
    var _a2;
    const props = await ((_a2 = this.model) == null ? void 0 : _a2.getNodeProperties(nodeId));
    if (!props) {
      return [];
    }
    return Object.entries(props).filter(Boolean);
  }
  /**
   * Collects all the user data from a given node
   *
   * @param nodeId The id of the node
   * @returns {Promise<[string, string][]>} A table containing the user data as [name, value]
   * tuples
   */
  async getUserData(nodeId) {
    var _a2;
    const userDataIndices = ((_a2 = this.model) == null ? void 0 : _a2.getNodeUserDataIndices(nodeId)) ?? [];
    if (!(userDataIndices == null ? void 0 : userDataIndices.length)) {
      return [];
    }
    return userDataIndices.map((userDataIndex) => {
      const userData = this.model.getNodeUserData(nodeId, userDataIndex);
      const key = typeof userDataIndex === "number" ? `0x${userDataIndex.toString(16).toUpperCase()}` : `0x${userDataIndex}`;
      const len = `${userData.length}`;
      return [key, len];
    });
  }
}
var __defProp$J = Object.defineProperty;
var __getOwnPropDesc$U = Object.getOwnPropertyDescriptor;
var __decorateClass$U = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$U(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$J(target, key, result);
  return result;
};
let NodeProperties = class extends i$3 {
  constructor() {
    super(...arguments);
    this.nodeId = Number.NaN;
    this.node = new NodePropertyAdapter();
    this.loadDataTask = new h$2(
      this,
      async ([nodeId, node], options) => {
        const result = {
          name: node.getNodeName(nodeId),
          properties: await node.getProperties(nodeId),
          userData: await node.getUserData(nodeId)
        };
        options.signal.throwIfAborted();
        return result;
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
  generateTable(rows, formatter) {
    if (rows.length === 0) {
      return A;
    }
    return b`
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${c$1(rows, ([key, value]) => {
      return b`<tr>
              <td class="field-name">${key}</td>
              <td class="field-value">${formatter ? formatter(value) : value}</td>
            </tr>`;
    })}
        </tbody>
      </table>
    `;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.nodeId)) {
      return b`<div>No properties to display</div>`;
    }
    return this.loadDataTask.render({
      pending: () => b`<p>Loading data</p>`,
      complete: (result) => {
        const userData = result.userData;
        return b`
          <section class="property-window">
            <div class="property-table">
              <h3>Properties</h3>
              ${this.generateTable([
          ["Name", result.name],
          ["ID", this.nodeId.toString()],
          ...result.properties
        ])}
            </div>

            ${userData.length ? b`<div class="user-data-table">
                  <h3>User Data</h3>
                  ${this.generateTable([...result.userData])}
                </div>` : A}
          </section>
        `;
      },
      error: (e3) => b`<p>Error: ${e3}</p>`
    });
  }
};
NodeProperties.styles = [
  componentBaseStyle,
  i$7`
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
__decorateClass$U([
  n$4({ type: Number })
], NodeProperties.prototype, "nodeId", 2);
__decorateClass$U([
  r$4()
], NodeProperties.prototype, "node", 2);
NodeProperties = __decorateClass$U([
  t$2("hoops-node-properties")
], NodeProperties);
class Debouncer {
  /**
   * Creates a new Debouncer instance with the specified callback function.
   *
   * @param callback - The function to debounce. Can be synchronous or asynchronous.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer((x: number, y: number) => x + y);
   * ```
   */
  constructor(callback) {
    this.timeoutId = null;
    this.pendingPromise = null;
    this.callback = callback;
  }
  /**
   * Schedules the callback to execute after the specified delay. If called again before
   * the delay elapses, the previous call is cancelled and a new delay period begins.
   *
   * @param delay - The number of milliseconds to wait before executing the callback
   * @param args - Arguments to pass to the callback function
   *
   * @returns A Promise that resolves with the callback's return value or rejects if:
   *   - The callback throws an error
   *   - The debounced call is cancelled via `clear()` or another `debounce()` call
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer((text: string) => text.toUpperCase());
   *
   * // Only the last call executes after 500ms
   * debouncer.debounce(500, 'first');  // Cancelled
   * debouncer.debounce(500, 'second'); // Cancelled
   * const result = await debouncer.debounce(500, 'third'); // Executes
   * console.log(result); // 'THIRD'
   * ```
   */
  debounce(delay, ...args) {
    this.clear();
    return new Promise((resolve, reject) => {
      this.pendingPromise = { resolve, reject };
      this.timeoutId = setTimeout(async () => {
        this.timeoutId = null;
        const promise = this.pendingPromise;
        this.pendingPromise = null;
        try {
          const result = await this.callback(...args);
          promise == null ? void 0 : promise.resolve(result);
        } catch (error) {
          promise == null ? void 0 : promise.reject(error);
        }
      }, delay);
    });
  }
  /**
   * Cancels any pending debounced execution. If a debounced callback is waiting to execute,
   * it will be cancelled and the associated Promise will reject with no error.
   *
   * This method is safe to call multiple times and can be called even when no execution
   * is pending.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer(() => console.log('Execute'));
   *
   * const promise = debouncer.debounce(500);
   * debouncer.clear(); // Cancels the pending execution
   *
   * try {
   *   await promise;
   * } catch (error) {
   *   console.log('Execution was cancelled');
   * }
   * ```
   */
  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.pendingPromise) {
      this.pendingPromise.reject();
      this.pendingPromise = null;
    }
  }
  /**
   * Indicates whether a debounced callback is currently waiting to execute.
   *
   * @returns `true` if a callback is scheduled to execute, `false` otherwise
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer(() => console.log('Execute'));
   *
   * console.log(debouncer.isPending); // false
   *
   * debouncer.debounce(500);
   * console.log(debouncer.isPending); // true
   *
   * await new Promise(resolve => setTimeout(resolve, 500));
   * console.log(debouncer.isPending); // false
   * ```
   */
  get isPending() {
    return this.timeoutId !== null;
  }
}
var __defProp$I = Object.defineProperty;
var __getOwnPropDesc$T = Object.getOwnPropertyDescriptor;
var __decorateClass$T = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$T(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$I(target, key, result);
  return result;
};
let CadConfigurationListItemElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.cadConfigurationId = Number.NaN;
    this.cadConfigurationName = "";
    this.active = false;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.cadConfigurationId)) {
      return A;
    }
    const classNames = ["cad-configuration-item"];
    if (this.active) {
      classNames.push("active");
    }
    return b`<div class=${classNames.join(" ")}>
      <div class="icon">${cadConfiguration}</hoops-icon></div>
      <div class="title">${this.cadConfigurationName}</div>
    </div>`;
  }
};
CadConfigurationListItemElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        flex-grow: 1;
      }

      .cad-configuration-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
        cursor: pointer;
      }

      .cad-configuration-item:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .cad-configuration-item.active {
        color: var(--hoops-accent-foreground, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      }

      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        padding-left: calc(0.4rem);
      }

      .icon {
        width: 1.2rem;
        height: 1.2rem;
      }
    `
];
__decorateClass$T([
  n$4({ type: Number })
], CadConfigurationListItemElement.prototype, "cadConfigurationId", 2);
__decorateClass$T([
  n$4({ type: String })
], CadConfigurationListItemElement.prototype, "cadConfigurationName", 2);
__decorateClass$T([
  n$4({ type: Boolean })
], CadConfigurationListItemElement.prototype, "active", 2);
CadConfigurationListItemElement = __decorateClass$T([
  t$2("hoops-cad-configuration-list-item")
], CadConfigurationListItemElement);
function defaultItemFactory(modelAdapter, cadConfigurationId, active) {
  let configurationName = "N/A";
  if (modelAdapter.model) {
    const cadConfigurations = modelAdapter.model.getCadConfigurations();
    configurationName = cadConfigurations[cadConfigurationId] || "N/A";
  }
  return b`<hoops-cad-configuration-list-item
    cadConfigurationId=${cadConfigurationId}
    cadConfigurationName=${configurationName}
    ?active=${active}
  >
  </hoops-cad-configuration-list-item>`;
}
let ModelAdapter$1 = class ModelAdapter {
  constructor() {
    this.itemFactory = defaultItemFactory;
  }
  /**
   * Get cad configurations from the model and format them to the desired format
   *
   * @returns {CadConfigurationData[]} the cad configurations
   */
  getCadConfigurations() {
    if (!this.model) {
      return [];
    }
    const cadConfigurations = this.model.getCadConfigurations();
    return Object.entries(cadConfigurations).map(([key, value]) => ({
      cadConfigurationId: parseInt(key, 10),
      cadConfigurationName: value
    }));
  }
  /**
   * Return the HTML Fragment for a cad configuration.
   * @param cadConfigurationData The id of the cad configuration to render.
   * @param active Whether the cad configuration is active or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(cadConfigurationData, active) {
    return this.itemFactory(this, cadConfigurationData.cadConfigurationId, active);
  }
};
var __defProp$H = Object.defineProperty;
var __getOwnPropDesc$S = Object.getOwnPropertyDescriptor;
var __decorateClass$S = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$S(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$H(target, key, result);
  return result;
};
let HoopsCadConfigurationListElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.modelAdapter = new ModelAdapter$1();
    this.active = void 0;
    this.cadConfigurationData = void 0;
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
    var _a2;
    return (_a2 = this.modelAdapter) == null ? void 0 : _a2.model;
  }
  /**
   * @param model - The model to set
   * @returns {void}
   */
  set model(model) {
    const modelAdapter = this.modelAdapter;
    if (!modelAdapter) {
      throw new Error(`HoopsCadConfigurationListElement.model [set]: ModelAdapter is not set.`);
    }
    modelAdapter.model = model;
    this.modelAdapter = modelAdapter;
    this.reset();
  }
  /**
   * Resets the component state by clearing the cached configuration data and active selection.
   * Called when the model or model adapter changes to ensure fresh data loading.
   *
   * @internal
   * @returns {void}
   */
  reset() {
    this.cadConfigurationData = void 0;
    this.active = void 0;
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
    if (!this.modelAdapter) {
      return [];
    }
    if (this.cadConfigurationData === void 0) {
      this.cadConfigurationData = this.modelAdapter.getCadConfigurations();
    }
    if (!this.cadConfigurationData) {
      return [];
    }
    return this.cadConfigurationData.map((cadConfiguration2) => {
      const cadConfigurationActive = this.active === cadConfiguration2.cadConfigurationId;
      const cadConfigurationHtmlElement = this.modelAdapter.getContent(
        cadConfiguration2,
        cadConfigurationActive
      );
      return b`<li
        class="list-item"
        @click=${(event) => {
        this.handleClick(event, cadConfiguration2.cadConfigurationId);
      }}
      >
        ${cadConfigurationHtmlElement}
      </li>`;
    });
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
  handleClick(event, cadConfigurationId) {
    event.stopPropagation();
    const detail = {
      cadConfigurationId,
      ...event
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-cad-configuration-list-click",
        {
          bubbles: true,
          composed: true,
          detail
        }
      )
    );
  }
  /** @internal */
  render() {
    const cadConfigurationHtmlElements = this.getCadConfigurationHtmlElements();
    return b`<div>
      <h2 class="title">Configurations</h2>
      <ul class="list">
        ${cadConfigurationHtmlElements}
      </ul>
    </div>`;
  }
};
HoopsCadConfigurationListElement.styles = [
  componentBaseStyle,
  i$7`
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
__decorateClass$S([
  n$4({ attribute: false })
], HoopsCadConfigurationListElement.prototype, "modelAdapter", 2);
__decorateClass$S([
  n$4({ attribute: false })
], HoopsCadConfigurationListElement.prototype, "active", 2);
__decorateClass$S([
  r$4()
], HoopsCadConfigurationListElement.prototype, "cadConfigurationData", 2);
HoopsCadConfigurationListElement = __decorateClass$S([
  t$2("hoops-cad-configuration-list")
], HoopsCadConfigurationListElement);
function _filterActiveSheetNodeIds(viewer, model, nodeIds) {
  const activeSheetId = viewer.sheetManager.getActiveSheetId();
  if (activeSheetId !== null) {
    const sheetParent = model.getNodeParent(activeSheetId);
    const sheets = model.getNodeChildren(sheetParent);
    filterInPlace(nodeIds, (id) => {
      let parentId = id;
      while (parentId !== null) {
        if (parentId === activeSheetId) {
          return true;
        } else if (sheets.indexOf(parentId) !== -1) {
          return false;
        }
        parentId = model.getNodeParent(parentId);
      }
      return true;
    });
  }
}
class IsolateZoomHelper {
  constructor(viewer, model) {
    this._camera = null;
    this._deselectOnIsolate = true;
    this._deselectOnZoom = true;
    this._isolateStatus = false;
    this._viewer = viewer;
    this._model = model;
    this._viewer.setCallbacks({
      modelSwitched: () => {
        this._camera = null;
      }
    });
  }
  _setCamera(camera2) {
    if (this._camera === null) {
      this._camera = camera2;
    }
  }
  setDeselectOnIsolate(deselect) {
    this._deselectOnIsolate = deselect;
  }
  getIsolateStatus() {
    return this._isolateStatus;
  }
  isolateNodes(nodeIds, initiallyHiddenStayHidden = null) {
    const view = this._viewer.view;
    this._setCamera(view.getCamera());
    _filterActiveSheetNodeIds(this._viewer, this._model, nodeIds);
    const p2 = view.isolateNodes(
      nodeIds,
      DefaultTransitionDuration,
      !this._viewer.sheetManager.isDrawingSheetActive(),
      initiallyHiddenStayHidden
    );
    if (this._deselectOnIsolate) {
      this._viewer.selectionManager.clear();
    }
    this._isolateStatus = true;
    return p2;
  }
  fitNodes(nodeIds) {
    const view = this._viewer.view;
    this._setCamera(view.getCamera());
    const p2 = view.fitNodes(nodeIds);
    if (this._deselectOnZoom) {
      this._viewer.selectionManager.clear();
    }
    return p2;
  }
  showAll() {
    const model = this._model;
    if (this._viewer.sheetManager.isDrawingSheetActive()) {
      const sheetId = this._viewer.sheetManager.getActiveSheetId();
      if (sheetId !== null) {
        return this.isolateNodes([sheetId]);
      }
      return Promise.resolve();
    } else {
      const ps = [];
      if (model.isDrawing()) {
        const nodes3D = this._viewer.sheetManager.get3DNodes();
        ps.push(this.isolateNodes(nodes3D));
      } else ps.push(model.resetNodesVisibility());
      if (this._camera !== null) {
        this._viewer.view.setCamera(this._camera, DefaultTransitionDuration);
        this._camera = null;
      }
      this._isolateStatus = false;
      ps.push(this._updatePinVisibility());
      return waitForAll(ps);
    }
  }
  _updatePinVisibility() {
    this._viewer.noteTextManager.setIsolateActive(this._isolateStatus);
    return this._viewer.noteTextManager.updatePinVisibility();
  }
}
var __defProp$G = Object.defineProperty;
var __getOwnPropDesc$R = Object.getOwnPropertyDescriptor;
var __decorateClass$R = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$R(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$G(target, key, result);
  return result;
};
let HoopsContextMenuElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.x = 0;
    this.y = 0;
    this.activeItemId = null;
    this.activeLayerName = null;
    this.activeType = null;
    this.position = null;
    this.color = "#ff0000";
    this.isUnsettingColor = false;
    this.handleServiceUpdate = () => this.requestUpdate();
  }
  /** @internal */
  render() {
    const contextualItemClass = this.isMenuItemExecutable() ? "context-menu-item" : "context-menu-item disabled";
    const handleClasses = this.isHandleExecutable() ? "context-menu-item" : "context-menu-item disabled";
    const visibilityContent = this.isMenuItemVisible() ? "Hide" : "Show";
    const colorItemContent = this.isUnsettingColor ? "Unset Color" : "Set Color";
    return b`
      <div class="context-menu">
        <div class="${contextualItemClass}" @click=${this.isolateFunc}>Isolate</div>
        <div class="${contextualItemClass}" @click=${this.zoomFunc}>Zoom</div>
        <div class="${contextualItemClass}" @click=${this.visibilityFunc}>${visibilityContent}</div>
        <hr />
        <div class="${contextualItemClass}" @click=${this.transparentFunc}>Transparent</div>
        <hr />
        <div class="color-picker-container">
          <div class="${contextualItemClass}" @click=${this.setColorFunc}>${colorItemContent}</div>
          <input
            type="color"
            id="favcolor"
            name="favcolor"
            value="${this.color}"
            @input="${this.handleColorChange}"
          />
        </div>
        <hr />
        <div class="${handleClasses}" @click=${this.handlesFunc}>Show Handles</div>
        <div class="context-menu-item" @click=${this.resetFunc}>Reset Model</div>
        <hr />
        <div class="context-menu-item" @click=${this.showAllFunc}>Show All</div>
        <slot></slot>
      </div>
    `;
  }
  /**
   * Handles color picker input change events.
   *
   * Updates the component's color property when the user selects a new color
   * from the color picker input element.
   *
   * @internal
   * @param event - The input change event from the color picker
   * @returns {void}
   */
  handleColorChange(event) {
    const input = event.target;
    this.color = input.value;
  }
  /**
   * Handles component updates and positions the menu within viewport bounds.
   *
   * Automatically repositions the menu if it would extend beyond window boundaries
   * and updates the color state based on current context.
   *
   * @param _changedProperties - Map of changed properties (unused)
   * @returns {void}
   */
  updated(_changedProperties) {
    var _a2;
    if (!this.webViewer || !this.model) {
      return;
    }
    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
    const menu = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".context-menu");
    if (menu) {
      const rect = menu.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        this.style.left = `${this.x - rect.width}px`;
      } else {
        this.style.left = `${this.x}px`;
      }
      if (rect.bottom > window.innerHeight) {
        this.style.top = `${this.y - rect.height}px`;
      } else {
        this.style.top = `${this.y}px`;
      }
      this.updateIsUnsettingColor();
    } else {
      console.error("menu not found");
    }
  }
  /**
   * Updates the color operation state based on current context items.
   *
   * Determines whether the color action should be "Set Color" or "Unset Color"
   * based on whether the selected items already have the current color applied.
   *
   * @returns {Promise<void>}
   */
  async updateIsUnsettingColor() {
    const contextItemIds = this.getContextItemIds(true, true, false);
    if (contextItemIds.length > 0) {
      if (await this._isColorSet(contextItemIds)) {
        this.isUnsettingColor = true;
      } else {
        this.isUnsettingColor = false;
      }
    } else {
      this.isUnsettingColor = false;
    }
  }
  /**
   * Gets or sets the context menu model interface.
   *
   * The model provides access to 3D model operations like visibility, color, and node queries.
   * Setting a new model triggers helper recreation and component updates.
   *
   * @returns {IContextMenuModel | undefined} The current model instance or undefined
   */
  get contextMenuModel() {
    return this.model;
  }
  /**
   * Sets the context menu model interface.
   *
   * @param model - The model instance to use for 3D operations
   * @returns {void}
   */
  set contextMenuModel(model) {
    const oldValue = this.model;
    this.model = model;
    this.requestUpdate("model", oldValue);
    this.createIsolateZoomHelper();
  }
  /**
   * Gets or sets the web viewer interface for context menu operations.
   *
   * The web viewer provides access to selection management, operators, and view controls.
   * Setting a new web viewer triggers helper recreation and component updates.
   *
   * @returns {IContextMenuWebViewer | undefined} The current web viewer instance or undefined
   */
  get contextMenuWebViewer() {
    return this.webViewer;
  }
  /**
   * Sets the web viewer interface for context menu operations.
   *
   * @param webViewer - The web viewer instance to use for operations
   * @returns {void}
   */
  set contextMenuWebViewer(webViewer) {
    const oldValue = this.webViewer;
    this.webViewer = webViewer;
    this.requestUpdate("webViewer", oldValue);
    this.createIsolateZoomHelper();
  }
  /**
   * Notifies parent components that a context menu item was clicked.
   *
   * Dispatches a custom event to inform listeners that any context menu action
   * was executed, allowing parent components to respond appropriately (e.g., hide menu).
   *
   * @internal
   * @returns {void}
   */
  notifyItemClicked() {
    this.dispatchEvent(
      new CustomEvent("context-menu-item-clicked", {
        bubbles: true,
        composed: true
      })
    );
  }
  /**
   * Determines if the context menu items should show as visible/hidden.
   *
   * Checks the visibility state of active items, layers, and types to determine
   * whether the visibility toggle should show "Hide" or "Show" text.
   *
   * @internal
   * @returns {boolean} True if any active context items are currently visible
   */
  isMenuItemVisible() {
    const activeItemVisible = this.isItemVisible(this.activeItemId);
    const activeLayerVisible = this.isLayerVisibile(this.activeLayerName);
    const activeTypeVisibile = this.isTypeVisible(this.activeType);
    return activeItemVisible || activeLayerVisible || activeTypeVisibile;
  }
  /**
   * Creates a new IsolateZoomHelper instance when both webViewer and model are available.
   *
   * Initializes the helper class that provides isolate and zoom functionality
   * for context menu operations. Called when model or webViewer properties change.
   *
   * @internal
   * @returns {void}
   */
  createIsolateZoomHelper() {
    if (this.webViewer && this.model) {
      this.isolateZoomHelper = new IsolateZoomHelper(this.webViewer, this.model);
    }
  }
  /**
   * Lifecycle callback when component is added to the DOM.
   *
   * Sets up event listeners for context menu prevention and explode service events.
   *
   * @returns {void}
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("contextmenu", this._handleContextMenu);
    this.explodeService = getService("ExplodeService");
    this.explodeService.addEventListener("hoops-explode-service-reset", this.handleServiceUpdate);
    this.explodeService.addEventListener("hoops-explode-started", this.handleServiceUpdate);
    this.explodeService.addEventListener("hoops-explode-stopped", this.handleServiceUpdate);
  }
  /**
   * Lifecycle callback when component is removed from the DOM.
   *
   * Cleans up event listeners for context menu prevention and explode service events.
   *
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("contextmenu", this._handleContextMenu);
    if (this.explodeService) {
      this.explodeService.removeEventListener(
        "hoops-explode-service-reset",
        this.handleServiceUpdate
      );
      this.explodeService.removeEventListener("hoops-explode-started", this.handleServiceUpdate);
      this.explodeService.removeEventListener("hoops-explode-stopped", this.handleServiceUpdate);
    }
  }
  /**
   * Prevents the browser's default context menu from appearing.
   *
   * Intercepts right-click context menu events to ensure only the custom
   * hoops context menu is shown, preventing conflicts with browser menus.
   *
   * @internal
   * @param event - The right-click mouse event to prevent
   * @returns {void}
   */
  _handleContextMenu(event) {
    event.preventDefault();
  }
  /**
   * Checks if all provided nodes are IFC space elements.
   *
   * Determines whether the given node IDs all represent IFCSPACE elements,
   * which may require special handling in certain operations.
   *
   * @internal
   * @param nodeIds - Array of node IDs to check
   * @returns {boolean} True if all nodes are IFC space elements
   */
  isAllIfcSpace(nodeIds) {
    return nodeIds.every((nodeId) => {
      var _a2;
      return (_a2 = this.model) == null ? void 0 : _a2.hasEffectiveGenericType(nodeId, "IFCSPACE");
    });
  }
  /**
   * Determines if context menu items should be executable/enabled.
   *
   * Checks if there are any active context items (selected nodes, active layer,
   * active type, or current selections) that would make menu operations valid.
   *
   * @internal
   * @returns {boolean} True if menu items can be executed based on current context
   */
  isMenuItemExecutable() {
    if (this.webViewer) {
      return this.activeItemId !== null || this.activeLayerName !== null || this.activeType !== null || this.webViewer.selectionManager.size() > 0;
    }
    return false;
  }
  /**
   * Determines if handle operations should be executable/enabled.
   *
   * Checks if menu items are executable and explode mode is not currently active,
   * as handles cannot be used during model explosion.
   *
   * @internal
   * @returns {boolean} True if handle operations can be executed
   */
  isHandleExecutable() {
    return this.isMenuItemExecutable() && !this.explodeService.getActive();
  }
  /**
   * Executes the isolate operation on context items.
   *
   * Hides all model elements except the currently active context items,
   * providing a focused view. Special handling for IFC space elements.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async isolateFunc() {
    var _a2;
    if (this.isMenuItemExecutable()) {
      this.notifyItemClicked();
      const nodeIds = this.getContextItemIds(true, true);
      await ((_a2 = this.isolateZoomHelper) == null ? void 0 : _a2.isolateNodes(
        nodeIds,
        this.isAllIfcSpace(nodeIds) ? false : null
      ));
    }
  }
  /**
   * Executes the zoom-to-fit operation on context items.
   *
   * Adjusts the camera view to fit all currently active context items
   * within the viewport bounds for optimal viewing.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async zoomFunc() {
    var _a2;
    if (this.isMenuItemExecutable()) {
      this.notifyItemClicked();
      await ((_a2 = this.isolateZoomHelper) == null ? void 0 : _a2.fitNodes(this.getContextItemIds(true, true)));
    }
  }
  /**
   * Traverses the model hierarchy to find the first leaf node.
   *
   * Recursively drills down through the node hierarchy to find a leaf node
   * (a node with no children), used for opacity and property queries.
   *
   * @internal
   * @param nodeId - The starting node ID to drill down from
   * @returns {NodeId} The ID of the first encountered leaf node
   */
  drillNodes(nodeId) {
    const children = this.model.getNodeChildren(nodeId);
    if (children.length === 0) {
      return nodeId;
    }
    return this.drillNodes(children[0]);
  }
  /**
   * Toggles the visibility of context items.
   *
   * Shows or hides the currently active context items based on their current
   * visibility state. Special handling for IFC space elements.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async visibilityFunc() {
    var _a2;
    if (this.isMenuItemExecutable()) {
      const hidden = !this.isMenuItemVisible();
      const nodeIds = this.getContextItemIds(true, true);
      this.notifyItemClicked();
      await ((_a2 = this.model) == null ? void 0 : _a2.setNodesVisibility(
        nodeIds,
        hidden,
        this.isAllIfcSpace(nodeIds) ? false : null
      ));
      this.requestUpdate();
    }
  }
  /**
   * Toggles transparency on context items.
   *
   * Sets context items to 50% opacity if they are currently opaque (opacity = 1 or null),
   * or resets them to full opacity if they are currently transparent.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async transparentFunc() {
    var _a2, _b;
    if (this.isMenuItemExecutable()) {
      const contextItemIds = this.getContextItemIds(true, true);
      const leaf = this.drillNodes(contextItemIds[0]);
      const opacityOfFirstItem = (await this.model.getNodesEffectiveOpacity([leaf], ElementType.Faces))[0];
      if (opacityOfFirstItem === null || opacityOfFirstItem === 1) {
        (_a2 = this.model) == null ? void 0 : _a2.setNodesOpacity(contextItemIds, 0.5);
      } else {
        (_b = this.model) == null ? void 0 : _b.resetNodesOpacity(contextItemIds);
      }
      this.notifyItemClicked();
    }
  }
  /**
   * Adds interactive handles to context items for manipulation.
   *
   * Creates 3D manipulation handles on the currently selected context items,
   * allowing users to interactively move, rotate, or scale objects. Only works
   * when explode mode is not active.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async handlesFunc() {
    var _a2;
    if (this.isHandleExecutable()) {
      const handleOperator = (_a2 = this.webViewer) == null ? void 0 : _a2.view.operatorManager.getOperator(OperatorId.Handle);
      const contextItemIds = this.getContextItemIds(true, true, false);
      if (contextItemIds.length > 0) {
        this.notifyItemClicked();
        await (handleOperator == null ? void 0 : handleOperator.addHandles(contextItemIds, this.position));
      }
    }
  }
  /**
   * Resets the entire model to its initial state.
   *
   * Performs a comprehensive reset including:
   * - Removes all manipulation handles
   * - Resets model visibility, colors, and transformations
   * - Clears face color overrides
   * - Resets PMI color override settings
   *
   * @internal
   * @returns {Promise<void>}
   */
  async resetFunc() {
    var _a2, _b, _c, _d;
    this.notifyItemClicked();
    const handleOperator = (_a2 = this.webViewer) == null ? void 0 : _a2.view.operatorManager.getOperator(OperatorId.Handle);
    await (handleOperator == null ? void 0 : handleOperator.removeHandles());
    await ((_b = this.model) == null ? void 0 : _b.reset());
    (_c = this.model) == null ? void 0 : _c.unsetNodesFaceColor([this.model.getAbsoluteRootNode()]);
    (_d = this.model) == null ? void 0 : _d.setPmiColorOverride(this.model.getPmiColorOverride());
  }
  /**
   * Sets the mesh level for context items.
   *
   * Updates the level of detail for mesh rendering on the currently selected
   * or context items if menu operations are executable.
   *
   * @param meshLevel - The mesh level to apply (higher = more detailed)
   * @returns {void}
   */
  meshLevelFunc(meshLevel) {
    var _a2;
    if (this.isMenuItemExecutable()) {
      (_a2 = this.model) == null ? void 0 : _a2.setMeshLevel(this.getContextItemIds(true, true), meshLevel);
    }
  }
  /**
   * Shows all model elements and fits them in the view.
   *
   * Restores visibility to all previously hidden elements and adjusts
   * the camera view to fit the entire model within the viewport.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async showAllFunc() {
    var _a2;
    this.notifyItemClicked();
    await ((_a2 = this.isolateZoomHelper) == null ? void 0 : _a2.showAll());
  }
  /**
   * Sets or unsets the face color for context items.
   *
   * Applies the current color picker value to context items if setting color,
   * or removes color overrides if unsetting color. The operation mode is
   * determined by the isUnsettingColor state.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async setColorFunc() {
    var _a2, _b;
    if (this.isMenuItemExecutable()) {
      const contextItemIds = this.getContextItemIds(true, true, false);
      if (this.isUnsettingColor) {
        (_a2 = this.model) == null ? void 0 : _a2.unsetNodesFaceColor(contextItemIds);
      } else {
        (_b = this.model) == null ? void 0 : _b.setNodesFaceColor(contextItemIds, Color.fromHexString(this.color));
      }
      this.notifyItemClicked();
    }
  }
  /**
   * Checks if the current color is already set on the provided context items.
   *
   * Determines whether all the given node IDs already have the current color
   * applied to their faces, which affects whether the color action should be
   * "Set Color" or "Unset Color".
   *
   * @internal
   * @param contextItemIds - Array of node IDs to check for color state
   * @returns {Promise<boolean>} True if the current color is set on all items
   */
  async _isColorSet(contextItemIds) {
    var _a2;
    let colorSet = true;
    for (let i5 = 0; i5 < contextItemIds.length; ++i5) {
      const colorMap = await ((_a2 = this.model) == null ? void 0 : _a2.getNodeColorMap(contextItemIds[i5], ElementType.Faces)) ?? /* @__PURE__ */ new Map();
      if (colorMap.size === 0) {
        return false;
      } else {
        colorMap.forEach((color) => {
          if (!color.equals(Color.fromHexString(this.color))) {
            colorSet = false;
          }
        });
      }
    }
    return colorSet;
  }
  /**
   * Checks the visibility state of a specific node item.
   *
   * Determines if the given node ID is currently visible in the model.
   * If nodeId is null, checks the first selected item instead.
   *
   * @internal
   * @param nodeId - The node ID to check visibility for, or null to check first selection
   * @returns {boolean} True if the item is visible, false otherwise
   */
  isItemVisible(nodeId) {
    var _a2, _b, _c;
    if (nodeId === null) {
      const selectionItems = (_a2 = this.webViewer) == null ? void 0 : _a2.selectionManager.getResults();
      if ((selectionItems == null ? void 0 : selectionItems.length) === 0) {
        return false;
      }
      nodeId = ((_b = selectionItems == null ? void 0 : selectionItems.at(0)) == null ? void 0 : _b.getNodeId()) ?? null;
    }
    if (nodeId) {
      return ((_c = this.model) == null ? void 0 : _c.getNodeVisibility(nodeId)) ?? false;
    } else {
      return false;
    }
  }
  /**
   * Checks if any nodes in the specified layer are visible.
   *
   * Iterates through all layer IDs matching the layer name and checks
   * if any nodes within those layers are currently visible.
   *
   * @internal
   * @param layerName - The name of the layer to check visibility for
   * @returns {boolean} True if any nodes in the layer are visible
   */
  isLayerVisibile(layerName) {
    var _a2, _b, _c;
    if (layerName) {
      const layerIds = (_a2 = this.model) == null ? void 0 : _a2.getLayerIdsFromName(layerName);
      if (layerIds) {
        for (const layerId of layerIds) {
          const nodeIds = (_b = this.model) == null ? void 0 : _b.getNodesFromLayer(layerId);
          if (nodeIds) {
            for (const nodeId of nodeIds) {
              if ((_c = this.model) == null ? void 0 : _c.getNodeVisibility(nodeId)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  /**
   * Checks if any nodes of the specified generic type are visible.
   *
   * Iterates through all nodes matching the generic type and checks
   * if any of them are currently visible in the model.
   *
   * @internal
   * @param genericType - The generic type to check visibility for
   * @returns {boolean} True if any nodes of the type are visible
   */
  isTypeVisible(genericType) {
    var _a2;
    let typeVisible = false;
    if (genericType !== null) {
      const nodeIds = (_a2 = this.model) == null ? void 0 : _a2.getNodesByGenericType(genericType);
      if (nodeIds) {
        nodeIds.forEach((nodeId) => {
          var _a3;
          typeVisible = ((_a3 = this.model) == null ? void 0 : _a3.getNodeVisibility(nodeId)) ?? false;
        });
      }
    }
    return typeVisible;
  }
  /**
   * Retrieves the node IDs that are currently in context for operations.
   *
   * Collects node IDs from various sources based on the provided parameters:
   * selected items, clicked items, active layer, and active type. This method
   * determines which nodes should be affected by context menu operations.
   *
   * @param includeSelected - Whether to include currently selected nodes
   * @param includeClicked - Whether to include the clicked/active node
   * @param includeRoot - Whether to include root nodes in the results
   * @returns {NodeId[]} Array of node IDs that are in context for operations
   */
  getContextItemIds(includeSelected, includeClicked, includeRoot = true) {
    var _a2, _b, _c, _d;
    const selectionManager = (_a2 = this.webViewer) == null ? void 0 : _a2.selectionManager;
    const model = this.model;
    const rootId = model == null ? void 0 : model.getAbsoluteRootNode();
    const itemIds = [];
    if (includeSelected) {
      const selectedItems = selectionManager == null ? void 0 : selectionManager.getResults();
      for (const item of (selectedItems == null ? void 0 : selectedItems.values()) ?? []) {
        const id = item.getNodeId();
        if (model && (includeRoot || !includeRoot && id !== rootId)) {
          itemIds.push(id);
        }
      }
    }
    if (this.activeLayerName !== null) {
      const layerIds = (_b = this.model) == null ? void 0 : _b.getLayerIdsFromName(this.activeLayerName);
      if (layerIds) {
        for (const layerId of layerIds) {
          const nodeIds = (_c = this.model) == null ? void 0 : _c.getNodesFromLayer(layerId);
          if (nodeIds) {
            for (const nodeId of nodeIds) {
              const selectionItem = SelectionItem.create(nodeId);
              if (!(selectionManager == null ? void 0 : selectionManager.contains(selectionItem))) {
                itemIds.push(nodeId);
              }
            }
          }
        }
      }
    }
    if (this.activeType !== null) {
      const nodeIds = (_d = this.model) == null ? void 0 : _d.getNodesByGenericType(this.activeType);
      if (nodeIds) {
        nodeIds.forEach((nodeId) => {
          const selectionItem = SelectionItem.create(nodeId);
          if (!(selectionManager == null ? void 0 : selectionManager.contains(selectionItem))) {
            itemIds.push(nodeId);
          }
        });
      }
    }
    if (this.activeItemId !== null) {
      const selectionItem = SelectionItem.create(this.activeItemId);
      const containsParent = (selectionManager == null ? void 0 : selectionManager.containsParent(selectionItem)) !== null;
      const containsItem = itemIds.indexOf(this.activeItemId) !== -1;
      if (includeClicked && (includeRoot || !includeRoot && this.activeItemId !== rootId && (itemIds.length === 0 || !containsItem && !containsParent))) {
        itemIds.push(this.activeItemId);
      }
    }
    return itemIds;
  }
};
HoopsContextMenuElement.styles = i$7`
    :host {
      background-color: var(--hoops-neutral-background-20, #fafafa);
      position: fixed;
      z-index: 1000;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      padding: 0.3rem;
    }

    .context-menu-item {
      display: block;
      white-space: nowrap;
      user-select: none;
    }

    .context-menu-item:not(.disabled) {
      cursor: pointer;
    }

    .context-menu-item:not(.disabled):hover {
      color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
    }

    .context-menu-item.disabled {
      color: var(
        --hoops-accent-foreground-disabled,
        color-mix(in srgb, var(--hoops-neutral-background, #fafafa), #0078d4 50%)
      );
      cursor: default;
    }

    .color-picker-container {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .color-picker-container > .context-menu-item {
      display: inline-flex;
      justify-content: space-between;
      vertical-align: middle;
      padding-right: 0.3rem;
    }

    input[type='color'] {
      padding: 0;
      height: 1.2rem;
      width: 1.2rem;
      cursor: pointer;
      border-radius: 50%;
      border: none;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
      margin-left: auto;
    }

    input[type='color']::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type='color']::-webkit-color-swatch {
      border: none;
    }
  `;
__decorateClass$R([
  n$4({ type: Number })
], HoopsContextMenuElement.prototype, "x", 2);
__decorateClass$R([
  n$4({ type: Number })
], HoopsContextMenuElement.prototype, "y", 2);
__decorateClass$R([
  n$4({ type: IsolateZoomHelper })
], HoopsContextMenuElement.prototype, "isolateZoomHelper", 2);
__decorateClass$R([
  n$4({ type: String })
], HoopsContextMenuElement.prototype, "activeItemId", 2);
__decorateClass$R([
  n$4({ type: String })
], HoopsContextMenuElement.prototype, "activeLayerName", 2);
__decorateClass$R([
  n$4({ type: String })
], HoopsContextMenuElement.prototype, "activeType", 2);
__decorateClass$R([
  n$4({ type: Object })
], HoopsContextMenuElement.prototype, "position", 2);
__decorateClass$R([
  n$4({ type: String })
], HoopsContextMenuElement.prototype, "color", 2);
__decorateClass$R([
  n$4({ type: Object })
], HoopsContextMenuElement.prototype, "model", 2);
__decorateClass$R([
  n$4({ type: Object })
], HoopsContextMenuElement.prototype, "webViewer", 2);
__decorateClass$R([
  n$4({ type: Boolean })
], HoopsContextMenuElement.prototype, "isUnsettingColor", 2);
HoopsContextMenuElement = __decorateClass$R([
  t$2("hoops-context-menu")
], HoopsContextMenuElement);
const colors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
for (const key in colors) Object.freeze(colors[key]);
const colorNames = Object.freeze(colors);
const reverseNames = /* @__PURE__ */ Object.create(null);
for (const name in colorNames) {
  if (Object.hasOwn(colorNames, name)) {
    reverseNames[colorNames[name]] = name;
  }
}
const cs = {
  to: {},
  get: {}
};
cs.get = function(string) {
  const prefix = string.slice(0, 3).toLowerCase();
  let value;
  let model;
  switch (prefix) {
    case "hsl": {
      value = cs.get.hsl(string);
      model = "hsl";
      break;
    }
    case "hwb": {
      value = cs.get.hwb(string);
      model = "hwb";
      break;
    }
    default: {
      value = cs.get.rgb(string);
      model = "rgb";
      break;
    }
  }
  if (!value) {
    return null;
  }
  return { model, value };
};
cs.get.rgb = function(string) {
  if (!string) {
    return null;
  }
  const abbr = /^#([a-f\d]{3,4})$/i;
  const hex = /^#([a-f\d]{6})([a-f\d]{2})?$/i;
  const rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/;
  const per = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/;
  const keyword = /^(\w+)$/;
  let rgb = [0, 0, 0, 1];
  let match;
  let i5;
  let hexAlpha;
  if (match = string.match(hex)) {
    hexAlpha = match[2];
    match = match[1];
    for (i5 = 0; i5 < 3; i5++) {
      const i22 = i5 * 2;
      rgb[i5] = Number.parseInt(match.slice(i22, i22 + 2), 16);
    }
    if (hexAlpha) {
      rgb[3] = Number.parseInt(hexAlpha, 16) / 255;
    }
  } else if (match = string.match(abbr)) {
    match = match[1];
    hexAlpha = match[3];
    for (i5 = 0; i5 < 3; i5++) {
      rgb[i5] = Number.parseInt(match[i5] + match[i5], 16);
    }
    if (hexAlpha) {
      rgb[3] = Number.parseInt(hexAlpha + hexAlpha, 16) / 255;
    }
  } else if (match = string.match(rgba)) {
    for (i5 = 0; i5 < 3; i5++) {
      rgb[i5] = Number.parseInt(match[i5 + 1], 10);
    }
    if (match[4]) {
      rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4]);
    }
  } else if (match = string.match(per)) {
    for (i5 = 0; i5 < 3; i5++) {
      rgb[i5] = Math.round(Number.parseFloat(match[i5 + 1]) * 2.55);
    }
    if (match[4]) {
      rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4]);
    }
  } else if (match = string.match(keyword)) {
    if (match[1] === "transparent") {
      return [0, 0, 0, 0];
    }
    if (!Object.hasOwn(colorNames, match[1])) {
      return null;
    }
    rgb = colorNames[match[1]];
    rgb[3] = 1;
    return rgb;
  } else {
    return null;
  }
  for (i5 = 0; i5 < 3; i5++) {
    rgb[i5] = clamp(rgb[i5], 0, 255);
  }
  rgb[3] = clamp(rgb[3], 0, 1);
  return rgb;
};
cs.get.hsl = function(string) {
  if (!string) {
    return null;
  }
  const hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  const match = string.match(hsl);
  if (match) {
    const alpha = Number.parseFloat(match[4]);
    const h3 = (Number.parseFloat(match[1]) % 360 + 360) % 360;
    const s5 = clamp(Number.parseFloat(match[2]), 0, 100);
    const l2 = clamp(Number.parseFloat(match[3]), 0, 100);
    const a2 = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h3, s5, l2, a2];
  }
  return null;
};
cs.get.hwb = function(string) {
  if (!string) {
    return null;
  }
  const hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
  const match = string.match(hwb);
  if (match) {
    const alpha = Number.parseFloat(match[4]);
    const h3 = (Number.parseFloat(match[1]) % 360 + 360) % 360;
    const w2 = clamp(Number.parseFloat(match[2]), 0, 100);
    const b2 = clamp(Number.parseFloat(match[3]), 0, 100);
    const a2 = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h3, w2, b2, a2];
  }
  return null;
};
cs.to.hex = function(...rgba) {
  return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
};
cs.to.rgb = function(...rgba) {
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
cs.to.rgb.percent = function(...rgba) {
  const r2 = Math.round(rgba[0] / 255 * 100);
  const g2 = Math.round(rgba[1] / 255 * 100);
  const b2 = Math.round(rgba[2] / 255 * 100);
  return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r2 + "%, " + g2 + "%, " + b2 + "%)" : "rgba(" + r2 + "%, " + g2 + "%, " + b2 + "%, " + rgba[3] + ")";
};
cs.to.hsl = function(...hsla) {
  return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
cs.to.hwb = function(...hwba) {
  let a2 = "";
  if (hwba.length >= 4 && hwba[3] !== 1) {
    a2 = ", " + hwba[3];
  }
  return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a2 + ")";
};
cs.to.keyword = function(...rgb) {
  return reverseNames[rgb.slice(0, 3)];
};
function clamp(number_, min, max) {
  return Math.min(Math.max(min, number_), max);
}
function hexDouble(number_) {
  const string_ = Math.round(number_).toString(16).toUpperCase();
  return string_.length < 2 ? "0" + string_ : string_;
}
var __defProp$F = Object.defineProperty;
var __getOwnPropDesc$Q = Object.getOwnPropertyDescriptor;
var __decorateClass$Q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$Q(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$F(target, key, result);
  return result;
};
let HoopsCuttingPlaneEditorElement = class extends i$3 {
  /**
   * Constructs a new HoopsCuttingPlaneEditorElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateEditor method for proper event handling context.
   */
  constructor() {
    super();
    this.sectionIndex = 0;
    this.planeIndex = 0;
    this.invalidateEditor = this.invalidateEditor.bind(this);
    this.debouncer = new Debouncer(
      async (cuttingPlane2) => {
        var _a2;
        return (_a2 = this.service) == null ? void 0 : _a2.updateCuttingPlane(this.sectionIndex, this.planeIndex, cuttingPlane2);
      }
    );
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * editor synchronized with the state of its associated cutting plane.
   * Also triggers an initial update to ensure the UI reflects current state.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.service) {
      return;
    }
    this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateEditor
    );
    this.requestUpdate();
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the editor
   * is no longer needed.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.service) {
      this.service.removeEventListener(
        "hoops-cutting-plane-change",
        this.invalidateEditor
      );
    }
    this.debouncer.clear();
  }
  /** @internal */
  render() {
    if (!this.service) {
      return A;
    }
    const cuttingPlane2 = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!cuttingPlane2) {
      return A;
    }
    const modelBounding = this.service.getModelBounding();
    const boxSize = modelBounding.extents().length();
    const color = cuttingPlane2.color ? cs.to.hex(cuttingPlane2.color.r, cuttingPlane2.color.g, cuttingPlane2.color.b) : "#000000";
    const lineColor = cuttingPlane2.lineColor ? cs.to.hex(
      cuttingPlane2.lineColor.r,
      cuttingPlane2.lineColor.g,
      cuttingPlane2.lineColor.b
    ) : "#000000";
    return b`
      <div style="padding: 0.5rem">
        <hoops-coordinate-input
          label="x"
          .value=${cuttingPlane2.plane.normal.x}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(event) => this.updatePlane("x", event.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="y"
          .value=${cuttingPlane2.plane.normal.y}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(event) => this.updatePlane("y", event.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="z"
          .value=${cuttingPlane2.plane.normal.z}
          min="-1"
          max="1"
          @hoops-coordinate-changed=${(event) => this.updatePlane("z", event.detail.value)}
        ></hoops-coordinate-input>
        <hoops-coordinate-input
          label="d"
          .value=${cuttingPlane2.plane.d}
          min=${-boxSize}
          max=${boxSize}
          @hoops-coordinate-changed=${(event) => this.updatePlane("d", event.detail.value)}
        ></hoops-coordinate-input>
        <div class="color-container">
          <div>borders:</div>
          <div class="color-ui">
            <div>${lineColor}</div>
            <hoops-color-button
              title="Set Cutting Plane Borders Color"
              iconSize="sm"
              .value=${lineColor}
              ?disabled=${cuttingPlane2.referenceGeometry === void 0}
              @change=${(event) => {
      var _a2;
      (_a2 = this == null ? void 0 : this.service) == null ? void 0 : _a2.setCuttingPlaneLineColor(
        this.sectionIndex,
        this.planeIndex,
        this.htmlToHwvColor(event.target.value)
      );
    }}
            >
              <hoops-icon
                slot="icon"
                icon="borderIcon"
                style="--hoops-svg-stroke-color: ${lineColor}; cursor: pointer"
              ></hoops-icon>
            </hoops-color-button>
          </div>
          <div>color:</div>
          <div class="color-ui">
            <div>${color}</div>
            <hoops-color-button
              title="Set Cutting Plane Color"
              iconSize="sm"
              .value=${color}
              ?disabled=${cuttingPlane2.referenceGeometry === void 0}
              @change=${(event) => {
      var _a2;
      (_a2 = this == null ? void 0 : this.service) == null ? void 0 : _a2.setCuttingPlaneColor(
        this.sectionIndex,
        this.planeIndex,
        this.htmlToHwvColor(event.target.value)
      );
    }}
            >
              <hoops-icon slot="icon" icon="fillIcon"></hoops-icon>
            </hoops-color-button>
          </div>
          <div>opacity:</div>
          <div style="position: relative; display: flex; align-items: center">
            <input
              style="width: 100%"
              className="vertical-slider"
              type="range"
              min=${0}
              max=${1}
              step="0.01"
              .value=${(cuttingPlane2.opacity ?? 1).toString()}
              @change=${(event) => {
      var _a2;
      event.stopPropagation();
      const value = parseFloat(event.target.value);
      (_a2 = this.service) == null ? void 0 : _a2.setCuttingPlaneOpacity(this.sectionIndex, this.planeIndex, value);
    }}
            />
            <hoops-icon
              icon="opacityIcon"
              style="'--hoops-svg-stroke-color': color; margin: 0.4rem 0.6rem;"
            ></hoops-icon>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Handles debounced updates to the cutting plane.
   *
   * Implements a debouncing mechanism to prevent excessive service calls
   * when the user makes rapid changes. Updates are delayed by 500ms and
   * any new changes reset the timer.
   *
   * @param cuttingPlane - The modified cutting plane to apply to the service
   * @internal
   */
  onChange(cuttingPlane2) {
    if (!this.service) {
      return;
    }
    this.debouncer.debounce(500, cuttingPlane2).catch((e3) => {
      if (e3) {
        throw e3;
      }
    });
  }
  /**
   * Event handler that invalidates the editor when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this editor's section and plane indices.
   * Also updates all coordinate input elements to reflect the new values.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @internal
   */
  invalidateEditor(event) {
    if (event.detail.sectionIndex === this.sectionIndex && event.detail.planeIndex === this.planeIndex) {
      this.requestUpdate();
      this.coordinateInputs.forEach((input) => input.requestUpdate());
    }
  }
  /**
   * Updates a specific axis or distance property of the cutting plane.
   *
   * Modifies either the normal vector components (x, y, z) or the distance (d)
   * of the cutting plane and triggers a debounced update to the service.
   *
   * @param axis - The plane property to update ('x', 'y', 'z' for normal vector, 'd' for distance)
   * @param value - The new value for the specified property
   * @internal
   */
  updatePlane(axis, value) {
    if (!this.service) {
      return;
    }
    const cuttingPlane2 = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!cuttingPlane2) {
      return;
    }
    if (axis === "d") {
      cuttingPlane2.plane.d = value;
    } else {
      cuttingPlane2.plane.normal[axis] = value;
    }
    this.onChange(cuttingPlane2);
  }
  /**
   * Converts an HTML color string to a HOOPS Web Viewer color object.
   *
   * Parses various HTML color formats (hex, rgb, etc.) and converts them
   * to the IColor interface used by the HOOPS Web Viewer. Returns black
   * as a fallback if the color string cannot be parsed.
   *
   * @param color - HTML color string (e.g., "#ff0000", "rgb(255,0,0)", "red")
   * @returns IColor object with RGB values, or black (0,0,0) if parsing fails
   * @internal
   */
  htmlToHwvColor(color) {
    const rgb = cs.get.rgb(color);
    if (!rgb) {
      return new Color(0, 0, 0);
    }
    return new Color(rgb[0], rgb[1], rgb[2]);
  }
};
HoopsCuttingPlaneEditorElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .color-container {
        display: grid;
        grid-template-columns: min-content auto;
        gap: 0.25rem;
        margin-top: 1rem;
        align-items: center;
      }

      .color-ui {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
      }
    `
];
__decorateClass$Q([
  n$4({ type: Number })
], HoopsCuttingPlaneEditorElement.prototype, "sectionIndex", 2);
__decorateClass$Q([
  n$4({ type: Number })
], HoopsCuttingPlaneEditorElement.prototype, "planeIndex", 2);
__decorateClass$Q([
  n$4({ type: Object })
], HoopsCuttingPlaneEditorElement.prototype, "service", 2);
__decorateClass$Q([
  r$3("hoops-coordinate-input")
], HoopsCuttingPlaneEditorElement.prototype, "coordinateInputs", 2);
HoopsCuttingPlaneEditorElement = __decorateClass$Q([
  t$2("hoops-cutting-plane-editor")
], HoopsCuttingPlaneEditorElement);
var __defProp$E = Object.defineProperty;
var __getOwnPropDesc$P = Object.getOwnPropertyDescriptor;
var __decorateClass$P = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$P(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$E(target, key, result);
  return result;
};
let HoopsCuttingPlaneToolbarElement = class extends i$3 {
  /**
   * Constructs a new HoopsCuttingPlaneToolbarElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateToolbar method for proper event handling context.
   */
  constructor() {
    super();
    this.sectionIndex = -1;
    this.planeIndex = -1;
    this.service = null;
    this.invalidateToolbar = this.invalidateToolbar.bind(this);
  }
  /**
   * Event handler that invalidates the toolbar when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this toolbar's section and plane indices.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @internal
   */
  invalidateToolbar(event) {
    if (event.detail.sectionIndex === this.sectionIndex && event.detail.planeIndex === this.planeIndex) {
      this.requestUpdate();
    }
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * toolbar synchronized with the state of its associated cutting plane.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   * @override
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.service) {
      return;
    }
    this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateToolbar
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the toolbar
   * is no longer needed.
   *
   * @internal
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.service) {
      this.service.removeEventListener(
        "hoops-cutting-plane-change",
        this.invalidateToolbar
      );
    }
  }
  /** @internal */
  render() {
    var _a2;
    const cuttingPlane2 = (_a2 = this.service) == null ? void 0 : _a2.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!cuttingPlane2) {
      return A;
    }
    const visible = !!cuttingPlane2.referenceGeometry;
    return b`<div class="container">
      <hoops-button
        title="Customize Cutting Plane"
        iconSize="sm"
        @click=${(event) => {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true }));
    }}
      >
        <hoops-icon slot="icon" icon="editIcon"></hoops-icon>
      </hoops-button>
      <hoops-button title="Invert Cutting Plane" iconSize="sm" @click=${this.onInvertCuttingPlane}>
        <label slot="icon">
          <hoops-icon icon="invertIcon"></hoops-icon>
        </label>
      </hoops-button>
      <hoops-button
        title="Toggle Reference Geometry Visibility"
        iconSize="sm"
        @click=${this.onToggleVisibility}
      >
        <label slot="icon">
          <hoops-icon
            icon=${!visible ? "visibilityHidden" : "visibilityShown"}
            class="visibility-icon"
          ></hoops-icon>
        </label>
      </hoops-button>
      <hoops-icon-button title="Remove Cutting Plane" size="sm" @click=${this.onRemoveCuttingPlane}>
        <hoops-icon icon="removeIcon" class="remove-icon"></hoops-icon>
      </hoops-icon-button>
    </div>`;
  }
  /**
   * Handles the invert cutting plane button click event.
   *
   * Inverts the cutting plane by negating its normal vector and distance,
   * effectively flipping the plane's orientation to cut from the opposite side.
   *
   * @param event - The mouse click event from the invert button
   * @internal
   */
  onInvertCuttingPlane(event) {
    event.stopPropagation();
    if (!this.service) {
      return;
    }
    const cuttingPlane2 = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!cuttingPlane2) {
      return;
    }
    cuttingPlane2.plane.normal.negate();
    cuttingPlane2.plane.d = -cuttingPlane2.plane.d;
    this.service.updateCuttingPlane(this.sectionIndex, this.planeIndex, {
      plane: cuttingPlane2.plane
    });
  }
  /**
   * Handles the toggle visibility button click event.
   *
   * Toggles the visibility of the cutting plane's reference geometry,
   * switching between showing and hiding the visual representation of the plane.
   *
   * @param event - The click event from the toggle visibility button
   * @internal
   */
  onToggleVisibility(event) {
    event.stopPropagation();
    if (!this.service) {
      return;
    }
    const cuttingPlane2 = this.service.getCuttingPlane(this.sectionIndex, this.planeIndex);
    if (!cuttingPlane2) {
      return;
    }
    this.service.setCuttingPlaneVisibility(
      this.sectionIndex,
      this.planeIndex,
      !cuttingPlane2.referenceGeometry
    );
  }
  /**
   * Handles the remove cutting plane button click event.
   *
   * Removes the cutting plane from its section, permanently deleting it
   * from the cutting configuration. This action cannot be undone.
   *
   * @param event - The click event from the remove button
   * @internal
   */
  onRemoveCuttingPlane(event) {
    event.stopPropagation();
    if (!this.service) {
      return;
    }
    this.service.removeCuttingPlane(this.sectionIndex, this.planeIndex);
  }
};
HoopsCuttingPlaneToolbarElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .container {
        display: flex;
      }

      .visibility-icon {
        width: 100%;
      }

      .remove-icon {
        width: 80%;
      }
    `
];
__decorateClass$P([
  n$4({ type: Number })
], HoopsCuttingPlaneToolbarElement.prototype, "sectionIndex", 2);
__decorateClass$P([
  n$4({ type: Number })
], HoopsCuttingPlaneToolbarElement.prototype, "planeIndex", 2);
__decorateClass$P([
  n$4({ type: Object })
], HoopsCuttingPlaneToolbarElement.prototype, "service", 2);
HoopsCuttingPlaneToolbarElement = __decorateClass$P([
  t$2("hoops-cutting-plane-toolbar")
], HoopsCuttingPlaneToolbarElement);
var __defProp$D = Object.defineProperty;
var __getOwnPropDesc$O = Object.getOwnPropertyDescriptor;
var __decorateClass$O = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$O(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$D(target, key, result);
  return result;
};
let HoopsCuttingPlaneElement = class extends i$3 {
  /**
   * Constructs a new HoopsCuttingPlaneElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateCuttingPlane method for proper event handling context.
   */
  constructor() {
    super();
    this.showEditor = false;
    this.planeIndex = -1;
    this.sectionIndex = -1;
    this.invalidateCuttingPlane = this.invalidateCuttingPlane.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting plane change events to keep the
   * component synchronized with the state of its associated cutting plane.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @protected
   * @override
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.service) {
      return;
    }
    this.service.addEventListener(
      "hoops-cutting-plane-change",
      this.invalidateCuttingPlane
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the component
   * is no longer needed.
   *
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.service) {
      this.service.removeEventListener(
        "hoops-cutting-plane-change",
        this.invalidateCuttingPlane
      );
    }
  }
  /**
   * Event handler that invalidates the component when the associated cutting plane changes.
   *
   * This method listens for cutting plane change events and triggers a re-render
   * if the changed plane matches this component's section and plane indices.
   *
   * @param event - Custom event containing section and plane indices that changed
   * @private
   */
  invalidateCuttingPlane(event) {
    if (this.planeIndex === event.detail.planeIndex && this.sectionIndex === event.detail.sectionIndex) {
      this.requestUpdate();
    }
  }
  /** @internal */
  render() {
    if (this.planeIndex === -1 || this.sectionIndex === -1) {
      return A;
    }
    if (!this.service) {
      return A;
    }
    return b`<hoops-accordion ?expanded=${this.showEditor}>
      <div slot="header" class="container">
        <div class="header-content">
          <hoops-icon icon="planeIcon"></hoops-icon>
          Cutting Plane ${this.planeIndex + 1}
        </div>
      </div>
      <div slot="icon">
        <hoops-cutting-plane-toolbar
          planeIndex=${this.planeIndex}
          sectionIndex=${this.sectionIndex}
          @change=${() => this.showEditor = !this.showEditor}
          .service=${this.service}
        ></hoops-cutting-plane-toolbar>
      </div>
      <div slot="content">
        <hoops-cutting-plane-editor
          sectionIndex=${this.sectionIndex}
          planeIndex=${this.planeIndex}
          .service=${this.service}
        ></hoops-cutting-plane-editor>
      </div>
    </hoops-accordion>`;
  }
};
HoopsCuttingPlaneElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-flow: row nowrap;
        font-size: 0.75rem;
      }

      .header-content {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }
    `
];
__decorateClass$O([
  r$4()
], HoopsCuttingPlaneElement.prototype, "showEditor", 2);
__decorateClass$O([
  n$4({ type: Number })
], HoopsCuttingPlaneElement.prototype, "planeIndex", 2);
__decorateClass$O([
  n$4({ type: Number })
], HoopsCuttingPlaneElement.prototype, "sectionIndex", 2);
__decorateClass$O([
  n$4({ type: Object })
], HoopsCuttingPlaneElement.prototype, "service", 2);
HoopsCuttingPlaneElement = __decorateClass$O([
  t$2("hoops-cutting-plane")
], HoopsCuttingPlaneElement);
var __defProp$C = Object.defineProperty;
var __getOwnPropDesc$N = Object.getOwnPropertyDescriptor;
var __decorateClass$N = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$N(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$C(target, key, result);
  return result;
};
let HoopsCuttingSectionToolbarElement = class extends i$3 {
  /**
   * Constructs a new HoopsCuttingSectionToolbarElement.
   *
   * Initializes the component with default property values and binds
   * the invalidateToolbar method for proper event handling context.
   */
  constructor() {
    super();
    this.sectionIndex = -1;
    this.invalidateToolbar = this.invalidateToolbar.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting section and face selection change events
   * to keep the toolbar synchronized with the current state of the cutting section
   * and user selections.
   *
   * @param _changedProperties - Map of changed properties (not used)
   * @internal
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.service) {
      return;
    }
    this.service.addEventListener(
      "hoops-cutting-section-change",
      this.invalidateToolbar
    );
    this.service.addEventListener(
      "hoops-cutting-face-selection-change",
      this.invalidateToolbar
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up event listeners to prevent memory leaks when the toolbar
   * is no longer needed.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.service) {
      this.service.removeEventListener(
        "hoops-cutting-section-change",
        this.invalidateToolbar
      );
      this.service.removeEventListener(
        "hoops-cutting-face-selection-change",
        this.invalidateToolbar
      );
    }
  }
  /**
   * Event handler that invalidates the toolbar when the associated cutting section changes.
   *
   * This method listens for cutting section and face selection change events and triggers
   * a re-render if the changed section matches this toolbar's section index or if the
   * event affects face selection state.
   *
   * @param event - Custom event containing section index or general selection changes
   * @internal
   */
  invalidateToolbar(event) {
    if (event.detail === null || event.detail.sectionIndex === this.sectionIndex) {
      this.requestUpdate();
    }
  }
  /**
   * Hides the dropdown menu after a plane creation operation.
   *
   * This method programmatically closes the dropdown to provide better user experience
   * after plane creation, preventing the menu from staying open unnecessarily.
   *
   * @internal
   */
  hideDropdown() {
    if (this._dropdown && this._dropdown.menuShown) {
      this._dropdown.menuShown = false;
    }
  }
  /** @internal */
  render() {
    if (!this.service) {
      return A;
    }
    const section = this.service.getCuttingSection(this.sectionIndex);
    const selectedFace = this.service.getSelectedFace();
    const cuttingPlaneCount = this.service.getCuttingPlaneCount(this.sectionIndex) ?? 0;
    const sectionFull = cuttingPlaneCount >= 3;
    return b`<div class="container" @click=${(event) => event.stopPropagation()}>
      <hoops-dropdown ?disabled=${sectionFull}>
        <hoops-icon-button ?disabled=${sectionFull}>
          <hoops-icon icon="addIcon"></hoops-icon>
        </hoops-icon-button>
        <div slot="dropdown-popup">
          <hoops-icon-button
            title="Create Cutting Plane An X Axis"
            @click=${(event) => {
      event.stopPropagation();
      if (!this.service) {
        return;
      }
      const modelBounding = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: Plane.createFromCoefficients(1, 0, 0, -modelBounding.max.x),
        referenceGeometry: (section == null ? void 0 : section.hideReferenceGeometry) ? void 0 : createReferenceGeometryFromAxis("x", modelBounding)
      });
      this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneX" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Cutting Plane An Y Axis"
            @click=${(event) => {
      event.stopPropagation();
      if (!this.service) {
        return;
      }
      const modelBounding = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: Plane.createFromCoefficients(0, 1, 0, -modelBounding.max.y),
        referenceGeometry: (section == null ? void 0 : section.hideReferenceGeometry) ? void 0 : createReferenceGeometryFromAxis("y", modelBounding)
      });
      this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneY" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Cutting Plane An Z Axis"
            @click=${(event) => {
      event.stopPropagation();
      if (!this.service) {
        return;
      }
      const modelBounding = this.service.getModelBounding();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: Plane.createFromCoefficients(0, 0, 1, -modelBounding.max.z),
        referenceGeometry: (section == null ? void 0 : section.hideReferenceGeometry) ? void 0 : createReferenceGeometryFromAxis("z", modelBounding)
      });
      this.hideDropdown();
    }}
          >
            <hoops-icon icon="cuttingPlaneZ" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            ?disabled=${!selectedFace}
            title="Create Cutting Plane An Selected Face"
            @click=${(event) => {
      event.stopPropagation();
      if (!this.service) {
        return;
      }
      const modelBounding = this.service.getModelBounding();
      const selectedFace2 = this.service.getSelectedFace();
      if (!selectedFace2) {
        return;
      }
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: Plane.createFromPointAndNormal(selectedFace2.position, selectedFace2.normal),
        referenceGeometry: (section == null ? void 0 : section.hideReferenceGeometry) ? void 0 : createReferenceGeometryFromFaceNormal(
          selectedFace2.normal,
          selectedFace2.position,
          modelBounding
        )
      });
      this.hideDropdown();
    }}
          >
            <hoops-icon icon="viewFace" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
          <hoops-icon-button
            title="Create Custom Cutting Plane"
            size="sm"
            @click=${(event) => {
      var _a2;
      event.stopPropagation();
      if (!this.service) {
        return;
      }
      const normal = new Point3(1, 1, 0).normalize();
      const center = (_a2 = this.service) == null ? void 0 : _a2.getModelBounding().center();
      this.service.addCuttingPlane(this.sectionIndex, {
        plane: Plane.createFromPointAndNormal(center, normal),
        referenceGeometry: (section == null ? void 0 : section.hideReferenceGeometry) ? void 0 : createReferenceGeometryFromFaceNormal(
          normal,
          center,
          this.service.getModelBounding()
        )
      });
      this.hideDropdown();
    }}
          >
            <hoops-icon icon="editIcon" class="cutting-plane-icon"></hoops-icon>
          </hoops-icon-button>
        </div>
      </hoops-dropdown>
      <hoops-icon-button ?disabled=${!(section == null ? void 0 : section.active)} title="Toggle Cutting Plane Visibility">
        <hoops-icon
          title="Toggle Cutting Planes Visibility"
          icon=${section && section.hideReferenceGeometry ? "cuttingPlaneSection" : "cuttingPlaneSectionToggle"}
          class="cutting-plane-icon"
          @click=${(e3) => {
      e3.stopPropagation();
      if (!this.service || !section) {
        return;
      }
      this.service.setCuttingSectionGeometryVisibility(
        this.sectionIndex,
        !section.hideReferenceGeometry
      );
    }}
        ></hoops-icon>
      </hoops-icon-button>
      <hoops-icon-button
        ?disabled=${!(section == null ? void 0 : section.active)}
        title="Clear Cutting Section"
        @click=${(e3) => {
      e3.stopPropagation();
      if (!this.service) return;
      this.service.clearCuttingSection(this.sectionIndex);
    }}
      >
        <hoops-icon icon="cuttingPlaneReset" class="cutting-plane-icon"></hoops-icon>
      </hoops-icon-button>
      <hoops-switch
        ?checked=${section == null ? void 0 : section.active}
        @change=${(e3) => {
      e3.stopPropagation();
      if (!this.service || !section) {
        return;
      }
      this.service.setCuttingSectionState(this.sectionIndex, !section.active);
    }}
      ></hoops-switch>
    </div>`;
  }
};
HoopsCuttingSectionToolbarElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        align-items: center;
      }

      .cutting-plane-icon {
        width: 80%;
      }
    `
];
__decorateClass$N([
  n$4({ type: Number })
], HoopsCuttingSectionToolbarElement.prototype, "sectionIndex", 2);
__decorateClass$N([
  n$4({ type: Object })
], HoopsCuttingSectionToolbarElement.prototype, "service", 2);
__decorateClass$N([
  e$4("hoops-dropdown")
], HoopsCuttingSectionToolbarElement.prototype, "_dropdown", 2);
HoopsCuttingSectionToolbarElement = __decorateClass$N([
  t$2("hoops-cutting-section-toolbar")
], HoopsCuttingSectionToolbarElement);
var __defProp$B = Object.defineProperty;
var __getOwnPropDesc$M = Object.getOwnPropertyDescriptor;
var __decorateClass$M = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$M(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$B(target, key, result);
  return result;
};
let HoopsCuttingSectionElement = class extends i$3 {
  /**
   * Constructs a new HoopsCuttingSectionElement.
   *
   * Initializes the component with default property values and binds
   * event handler methods for proper context preservation.
   */
  constructor() {
    super();
    this.sectionIndex = 0;
    this.expanded = false;
    this.label = "";
    this.invalidateSection = this.invalidateSection.bind(this);
    this.handleCuttingPlaneAdded = this.handleCuttingPlaneAdded.bind(this);
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting service events to keep the
   * section synchronized with the service state.
   *
   * @param _changedProperties - Map of changed properties
   * @internal
   */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.service) {
      return;
    }
    this.service.addEventListener(
      "hoops-cutting-service-reset",
      this.invalidateSection
    );
    this.service.addEventListener(
      "hoops-cutting-section-change",
      this.invalidateSection
    );
    this.service.addEventListener(
      "hoops-cutting-plane-removed",
      this.invalidateSection
    );
    this.service.addEventListener(
      "hoops-cutting-plane-added",
      this.handleCuttingPlaneAdded
    );
  }
  /**
   * Lifecycle method called when the element is removed from the DOM.
   *
   * Cleans up all event listeners to prevent memory leaks.
   *
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.service) {
      return;
    }
    this.service.removeEventListener(
      "hoops-cutting-service-reset",
      this.invalidateSection
    );
    this.service.removeEventListener(
      "hoops-cutting-section-change",
      this.invalidateSection
    );
    this.service.removeEventListener(
      "hoops-cutting-plane-removed",
      this.invalidateSection
    );
    this.service.removeEventListener(
      "hoops-cutting-plane-added",
      this.handleCuttingPlaneAdded
    );
  }
  /**
   * Event handler that invalidates the section when it changes.
   *
   * @param event - Custom event containing the section index that changed
   * @internal
   */
  invalidateSection(event) {
    if (event.detail.sectionIndex === this.sectionIndex) {
      this.requestUpdate();
    }
  }
  /**
   * Event handler that handles cutting plane addition events.
   *
   * Automatically expands the accordion section when a new plane is added to provide
   * immediate visual feedback to the user.
   *
   * @param event - Custom event containing the section index where a plane was added
   * @internal
   */
  handleCuttingPlaneAdded(event) {
    if (event.detail.sectionIndex === this.sectionIndex) {
      this.expanded = true;
      this.requestUpdate();
    }
  }
  /** @internal */
  render() {
    if (!this.service) {
      return A;
    }
    const section = this.service.getCuttingSection(this.sectionIndex);
    if (!section) {
      return A;
    }
    return b`<section>
      <hoops-accordion ?expanded=${this.expanded}>
        <div slot="header" class="header">
          <div>${this.label}</div>
        </div>
        <div slot="toolbar">
          <hoops-cutting-section-toolbar
            .service=${this.service}
            sectionIndex=${this.sectionIndex}
            onCuttingPlaneAdd=${() => {
      this.expanded = true;
    }}
          ></hoops-cutting-section-toolbar>
        </div>
        <div slot="content">
          <div class="content">
            ${section.cuttingPlanes.map(
      (_2, i5) => b`<hoops-cutting-plane
                  sectionIndex=${this.sectionIndex}
                  planeIndex=${i5}
                  .service=${this.service}
                ></hoops-cutting-plane>`
    )}
          </div>
        </div>
      </hoops-accordion>
    </section>`;
  }
};
HoopsCuttingSectionElement.styles = [
  i$7`
      :host {
        display: block;
      }

      section {
        margin-bottom: '0.25rem';
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.125rem 0.25rem;
        width: 100%;
      }

      .header div {
        margin: 0;
        flex-grow: 1;
      }

      .content {
        min-height: 2rem;
        background-color: var(--hoops-neutral-background-20, #fafafa);
        padding: 0.25rem;
      }
    `
];
__decorateClass$M([
  n$4({ type: Number })
], HoopsCuttingSectionElement.prototype, "sectionIndex", 2);
__decorateClass$M([
  n$4({ type: String })
], HoopsCuttingSectionElement.prototype, "label", 2);
__decorateClass$M([
  n$4({ type: Object })
], HoopsCuttingSectionElement.prototype, "service", 2);
__decorateClass$M([
  r$4()
], HoopsCuttingSectionElement.prototype, "expanded", 2);
HoopsCuttingSectionElement = __decorateClass$M([
  t$2("hoops-cutting-section")
], HoopsCuttingSectionElement);
var __getOwnPropDesc$L = Object.getOwnPropertyDescriptor;
var __decorateClass$L = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$L(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsCuttingPlanePanelElement = class extends i$3 {
  /**
   * Lifecycle method called when the element is connected to the DOM.
   *
   * Automatically discovers and initializes the cutting service connection.
   *
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.service = getService("CuttingService");
  }
  /**
   * Lifecycle method called after the first render.
   *
   * Sets up event listeners for cutting service events to keep the panel synchronized.
   *
   * @internal
   */
  firstUpdated() {
    this.service.addEventListener("hoops-cutting-service-reset", () => {
      this.requestUpdate();
    });
    this.service.addEventListener("hoops-cutting-sections-change", () => {
      this.requestUpdate();
    });
    this.service.addEventListener("hoops-cutting-section-change", () => {
      this.requestUpdate();
    });
    this.service.addEventListener("hoops-cutting-section-added", () => {
      this.requestUpdate();
    });
    this.service.addEventListener("hoops-cutting-section-removed", () => {
      this.requestUpdate();
    });
  }
  /** @internal */
  render() {
    const cuttingSectionCount = this.service.getCuttingSectionCount();
    return b`<div class="container">
      <h3>Cutting Planes</h3>
      ${[...new Array(cuttingSectionCount)].map((_2, i5) => {
      return b`<hoops-cutting-section
          label=${`Section ${i5 + 1}`}
          sectionIndex=${i5}
          .service=${this.service}
        ></hoops-cutting-section>`;
    })}
    </div>`;
  }
};
HoopsCuttingPlanePanelElement.styles = [
  i$7`
      :host {
        display: block;
      }

      .container {
        margin: 0 0.5rem 1rem 0.5rem;
      }

      h3 {
        margin: 0.25rem 0;
      }
    `
];
HoopsCuttingPlanePanelElement = __decorateClass$L([
  t$2("hoops-cutting-plane-panel")
], HoopsCuttingPlanePanelElement);
var __defProp$A = Object.defineProperty;
var __getOwnPropDesc$K = Object.getOwnPropertyDescriptor;
var __decorateClass$K = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$K(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$A(target, key, result);
  return result;
};
let InfoButton = class extends i$3 {
  constructor() {
    super(...arguments);
    this.tabindex = "0";
    this.role = "button";
    this.size = "md";
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button
      tabindex=${this.tabIndex}
      color=${this.color}
      role=${this.role}
      size=${this.size}
    >
      ${info}
    </hoops-icon-button>`;
  }
};
__decorateClass$K([
  n$4({ reflect: true })
], InfoButton.prototype, "tabindex", 2);
__decorateClass$K([
  n$4({ reflect: true })
], InfoButton.prototype, "role", 2);
__decorateClass$K([
  n$4()
], InfoButton.prototype, "size", 2);
__decorateClass$K([
  n$4()
], InfoButton.prototype, "color", 2);
InfoButton = __decorateClass$K([
  t$2("hoops-info-button")
], InfoButton);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s4 = (i5, t2) => {
  var _a2;
  const e3 = i5._$AN;
  if (void 0 === e3) return false;
  for (const i6 of e3) (_a2 = i6._$AO) == null ? void 0 : _a2.call(i6, t2, false), s4(i6, t2);
  return true;
}, o$2 = (i5) => {
  let t2, e3;
  do {
    if (void 0 === (t2 = i5._$AM)) break;
    e3 = t2._$AN, e3.delete(i5), i5 = t2;
  } while (0 === (e3 == null ? void 0 : e3.size));
}, r = (i5) => {
  for (let t2; t2 = i5._$AM; i5 = t2) {
    let e3 = t2._$AN;
    if (void 0 === e3) t2._$AN = e3 = /* @__PURE__ */ new Set();
    else if (e3.has(i5)) break;
    e3.add(i5), c(t2);
  }
};
function h$1(i5) {
  void 0 !== this._$AN ? (o$2(this), this._$AM = i5, r(this)) : this._$AM = i5;
}
function n$1(i5, t2 = false, e3 = 0) {
  const r2 = this._$AH, h3 = this._$AN;
  if (void 0 !== h3 && 0 !== h3.size) if (t2) if (Array.isArray(r2)) for (let i6 = e3; i6 < r2.length; i6++) s4(r2[i6], false), o$2(r2[i6]);
  else null != r2 && (s4(r2, false), o$2(r2));
  else s4(this, i5);
}
const c = (i5) => {
  i5.type == t$1.CHILD && (i5._$AP ?? (i5._$AP = n$1), i5._$AQ ?? (i5._$AQ = h$1));
};
class f extends i$2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i5, t2, e3) {
    super._$AT(i5, t2, e3), r(this), this.isConnected = i5._$AU;
  }
  _$AO(i5, t2 = true) {
    var _a2, _b;
    i5 !== this.isConnected && (this.isConnected = i5, i5 ? (_a2 = this.reconnected) == null ? void 0 : _a2.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t2 && (s4(this, i5), o$2(this));
  }
  setValue(t2) {
    if (f$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i5 = [...this._$Ct._$AH];
      i5[this._$Ci] = t2, this._$Ct._$AI(i5, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e2 = () => new h2();
class h2 {
}
const o$1 = /* @__PURE__ */ new WeakMap(), n2 = e$2(class extends f {
  render(i5) {
    return E$1;
  }
  update(i5, [s5]) {
    var _a2;
    const e3 = s5 !== this.Y;
    return e3 && void 0 !== this.Y && this.rt(void 0), (e3 || this.lt !== this.ct) && (this.Y = s5, this.ht = (_a2 = i5.options) == null ? void 0 : _a2.host, this.rt(this.ct = i5.element)), E$1;
  }
  rt(t2) {
    if (this.isConnected || (t2 = void 0), "function" == typeof this.Y) {
      const i5 = this.ht ?? globalThis;
      let s5 = o$1.get(i5);
      void 0 === s5 && (s5 = /* @__PURE__ */ new WeakMap(), o$1.set(i5, s5)), void 0 !== s5.get(this.Y) && this.Y.call(this.ht, void 0), s5.set(this.Y, t2), void 0 !== t2 && this.Y.call(this.ht, t2);
    } else this.Y.value = t2;
  }
  get lt() {
    var _a2, _b;
    return "function" == typeof this.Y ? (_a2 = o$1.get(this.ht ?? globalThis)) == null ? void 0 : _a2.get(this.Y) : (_b = this.Y) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function formatLayersIcon() {
  return b`${layers}`;
}
function formatNodeIcon() {
  return b`${meshCubeIcon}`;
}
function rightArrowIcon() {
  return b`${rightIcon}`;
}
function downArrowIcon() {
  return b`${downIcon}`;
}
var __defProp$z = Object.defineProperty;
var __getOwnPropDesc$J = Object.getOwnPropertyDescriptor;
var __decorateClass$J = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$J(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$z(target, key, result);
  return result;
};
let LayerTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.layerId = Number.NaN;
    this.layerName = "";
    this.hiddenNodes = [];
    this.selected = false;
    this.selectedNodes = [];
    this.layerNodes = /* @__PURE__ */ new Map();
    this.expanded = false;
    this.nodesChildren = /* @__PURE__ */ new Map();
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.layerId)) {
      return A;
    }
    const classNames = ["layer-tree-element"];
    if (this.selected) {
      classNames.push("selected");
    }
    const nodesHtml = [];
    const childNodeIds = /* @__PURE__ */ new Set();
    this.nodesChildren.forEach((children) => {
      children.forEach((childId) => childNodeIds.add(childId));
    });
    this.layerNodes.forEach((v2, k3) => {
      if (!childNodeIds.has(k3)) {
        nodesHtml.push(this.getNodeHtml(k3, v2));
      }
    });
    const nodeListClassNames = ["layer-node-list"];
    if (!this.expanded) {
      nodeListClassNames.push("collapsed");
    }
    return b` <div class=${classNames.join(" ")}>
      <div class="header">
        ${this.getExpandIcon()}
        <div class="layer-icon">${formatLayersIcon()}</div>
        <div class="content" @click=${this.onLayerClicked} @auxclick=${this.onLayerClicked}>
          <div class="title">${this.layerName}</div>
        </div>
        <div class="visible-icon" @click=${this.onVisibilityClicked}>
          ${this.formatLayerVisibilityIcon()}
        </div>
      </div>
      <div class=${nodeListClassNames.join(" ")}>${nodesHtml}</div>
    </div>`;
  }
  formatLayerVisibilityIcon() {
    if (this.hiddenNodes.length <= 0) {
      return b`${visibleIcon}`;
    }
    const layerNodes = Array.from(this.layerNodes.keys());
    if (layerNodes.length !== this.hiddenNodes.length) {
      if (this.hiddenNodes.some((value) => layerNodes.includes(value))) {
        return b`${halfVisibleIcon}`;
      } else {
        return b`${visibleIcon}`;
      }
    }
    const layerNodesSorted = [...layerNodes].sort();
    const hiddenNodesSorted = [...this.hiddenNodes].sort();
    if (layerNodesSorted.every((value, index) => value === hiddenNodesSorted[index])) {
      return b`${hiddenIcon}`;
    }
    return A;
  }
  toggleSelection() {
    this.select(!this.selected);
  }
  select(selected) {
    this.selectNodes([...this.layerNodes.keys()], selected);
    this.selected = selected;
  }
  clearSelection() {
    this.selectedNodes = [];
    this.updateLayerElementSelection();
  }
  updateVisibility(shownBodyIds, hiddenBodyIds) {
    this.hiddenNodes = Array.from(/* @__PURE__ */ new Set([...this.hiddenNodes, ...hiddenBodyIds]));
    this.layerNodes.forEach((_2, nodeId) => {
      if (shownBodyIds.includes(nodeId)) {
        this.hiddenNodes = this.hiddenNodes.filter((id) => id !== nodeId);
      }
    });
  }
  selectNodes(nodeIds, selected) {
    const hasCommonElements = this.getLayerNodeIds().some((item) => nodeIds.includes(item));
    if (!hasCommonElements) {
      return;
    }
    if (selected) {
      const childrenToAdd = new Array();
      nodeIds.forEach((nodeId) => {
        if (this.nodesChildren.has(nodeId)) {
          childrenToAdd.push(...this.nodesChildren.get(nodeId) ?? []);
        }
      });
      this.selectedNodes = [...nodeIds, ...childrenToAdd];
    } else {
      this.selectedNodes = this.selectedNodes.filter((item) => !nodeIds.includes(item));
    }
    this.updateLayerElementSelection();
  }
  toggleNodeSelection(nodeId) {
    if (this.selectedNodes.includes(nodeId)) {
      this.selectedNodes = this.selectedNodes.filter((item) => item !== nodeId);
    } else {
      this.selectedNodes.push(nodeId);
    }
    this.updateLayerElementSelection();
  }
  toggleVisibility() {
    if (this.hiddenNodes.length > 0) {
      this.hiddenNodes = [];
    } else {
      this.hiddenNodes = [...this.layerNodes.keys()];
    }
  }
  updateLayerElementSelection() {
    this.selected = this.selectedNodes.length > 0;
  }
  getLayerNodeIds() {
    return Array.from(this.layerNodes.keys());
  }
  getNodeHtml(nodeId, nodeName) {
    const classNames = ["layer-node-element"];
    if (this.selectedNodes.includes(nodeId)) {
      classNames.push("selected");
    }
    const isNodeHidden = this.hiddenNodes.includes(nodeId);
    return b`<div
      class="${classNames.join(" ")}"
      nodeId=${nodeId}
      @click=${(event) => this.onLayerNodeClicked(event, nodeId)}
      @auxclick=${(event) => this.onLayerNodeClicked(event, nodeId)}
    >
      <div class="layer-node-icon">${formatNodeIcon()}</div>
      <div class="layer-node-title">${nodeName}</div>
      <hoops-icon
        class="visible-icon"
        icon="${isNodeHidden ? "hiddenIcon" : "visibleIcon"}"
        @click=${(event) => this.onNodeVisibilityClicked(event, nodeId)}
      >
      </hoops-icon>
    </div>`;
  }
  /**
   * Get the expand/collapse icon for a layer node.
   *
   * @returns {(HTMLTemplateResult | typeof nothing)}
   */
  getExpandIcon() {
    let icon = rightArrowIcon();
    if (this.expanded) {
      icon = downArrowIcon();
    }
    return b`<div class="expand-icon" @click=${this.handleExpandClick}>${icon}</div>`;
  }
  /**
   * Handles click on the expand icon.
   *
   * This will stop the propagation of the click and update
   * its expanded status
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleExpandClick(event) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
  /**
   * Handles a click on the visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-visibility-change' that provides the layerId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onVisibilityClicked(event) {
    event.stopPropagation();
    const visibility = this.hiddenNodes.length > 0;
    this.dispatchEvent(
      new CustomEvent("hoops-layer-visibility-change", {
        bubbles: true,
        composed: true,
        detail: {
          ...toBaseMouseEvent$1(event),
          layerId: this.layerId,
          visibility: !visibility,
          source: this
        }
      })
    );
  }
  /**
   * Handles a click on the node visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-node-visibility-change' that provides the nodeId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onNodeVisibilityClicked(event, nodeId) {
    event.stopPropagation();
    if (this.hiddenNodes.includes(nodeId)) {
      this.hiddenNodes = this.hiddenNodes.filter((id) => id != nodeId);
    } else {
      this.hiddenNodes.push(nodeId);
      this.hiddenNodes = [...this.hiddenNodes];
    }
    this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-node-visibility-change",
        {
          bubbles: true,
          composed: true,
          detail: {
            ...toBaseMouseEvent$1(event),
            nodeIds: this.hiddenNodes,
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles a click on a node in the list.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-tree-node-clicked' that provides the nodeId
   * and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onLayerNodeClicked(event, clickedNodeId) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-node-clicked",
        {
          bubbles: true,
          composed: true,
          detail: {
            ...toBaseMouseEvent$1(event),
            layerId: this.layerId,
            nodeId: clickedNodeId,
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles a click on a single layer list element
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-clicked' that provides the nodeId
   * and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onLayerClicked(event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-clicked",
        {
          bubbles: true,
          composed: true,
          detail: {
            ...toBaseMouseEvent$1(event),
            layerId: this.layerId,
            source: this
          }
        }
      )
    );
  }
};
LayerTreeElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        width: 100%;
      }

      .layer-tree-element {
        width: 100%;
        user-select: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .type-icon,
      .visible-icon,
      .layer-icon,
      .layer-node-icon,
      .expand-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
      }

      .type-icon svg,
      .visible-icon svg,
      .layer-icon svg,
      .layer-node-icon svg,
      .expand-icon svg {
        width: 100%;
        height: 100%;
      }

      .layer-node-list {
        margin-left: 1rem;
      }

      .layer-node-list.collapsed {
        display: none;
      }

      .layer-node-element {
        display: flex;
        align-items: center;
      }

      .layer-tree-element.selected,
      .layer-node-element.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .layer-node-element:not(.selected) {
        color: var(--hoops-neutral-foreground, #303030);
        stroke: var(--hoops-neutral-foreground, #303030);
      }

      .title,
      .layer-node-title {
        width: 100%;
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
__decorateClass$J([
  n$4({ type: Number })
], LayerTreeElement.prototype, "layerId", 2);
__decorateClass$J([
  n$4({ type: String })
], LayerTreeElement.prototype, "layerName", 2);
__decorateClass$J([
  n$4({ type: Array })
], LayerTreeElement.prototype, "hiddenNodes", 2);
__decorateClass$J([
  n$4({ type: Boolean })
], LayerTreeElement.prototype, "selected", 2);
__decorateClass$J([
  n$4({ type: Array })
], LayerTreeElement.prototype, "selectedNodes", 2);
__decorateClass$J([
  n$4({ type: Object })
], LayerTreeElement.prototype, "layerNodes", 2);
__decorateClass$J([
  n$4({ type: Boolean })
], LayerTreeElement.prototype, "expanded", 2);
__decorateClass$J([
  n$4({ type: Map })
], LayerTreeElement.prototype, "nodesChildren", 2);
LayerTreeElement = __decorateClass$J([
  t$2("hoops-layer-tree-element")
], LayerTreeElement);
function defaultLayerElementFactory(listContext2, layersContainer, layerId, selected, selectedNodes) {
  var _a2, _b, _c;
  const element = document.createElement("hoops-layer-tree-element");
  element.layerId = layerId;
  element.layerName = ((_a2 = listContext2.elementsData) == null ? void 0 : _a2.get(layerId)) ?? `Unnamed layer ${layerId}`;
  if (element.layerName === "No layer") {
    return A;
  }
  element.selected = selected ?? false;
  element.selectedNodes = selectedNodes ?? [];
  const layerNodeSet = /* @__PURE__ */ new Set();
  for (const [id, name] of layersContainer.getLayers()) {
    const authoredId = ((_b = layersContainer.getLayerAuthoredId) == null ? void 0 : _b.call(layersContainer, id)) ?? null;
    const curedName = getSanitizedLayerName(name, id, authoredId);
    if (curedName === element.layerName) {
      (_c = layersContainer.getNodesFromLayer(id)) == null ? void 0 : _c.forEach((nodeId) => layerNodeSet.add(nodeId));
    }
  }
  const layerNodes = Array.from(layerNodeSet);
  const nodeIdToName = /* @__PURE__ */ new Map();
  const nodesChildren = /* @__PURE__ */ new Map();
  if (!layerNodes || (layerNodes == null ? void 0 : layerNodes.length) <= 0) {
    return A;
  }
  const adapter = listContext2;
  layerNodes == null ? void 0 : layerNodes.forEach((nodeId) => {
    if (!adapter.alwaysShowLeafNodes) {
      nodeId = getAdjustedNodeId(layersContainer, nodeId);
    }
    nodeIdToName.set(nodeId, layersContainer.getNodeName(nodeId) ?? "Unknown node");
  });
  element.layerNodes = nodeIdToName;
  if (!adapter.alwaysShowLeafNodes) {
    for (const nodeId of element.layerNodes.keys()) {
      const nodeChildren = layersContainer.getNodeChildren(nodeId);
      if (nodeChildren && nodeChildren.length > 0) {
        const nodeChildrenPartOfLayer = nodeChildren.filter(
          (nodeChild) => nodeIdToName.has(nodeChild)
        );
        if (nodeChildrenPartOfLayer.length > 0) {
          nodesChildren.set(nodeId, nodeChildrenPartOfLayer);
        }
      }
    }
  }
  element.nodesChildren = nodesChildren;
  return b` ${element} `;
}
function getSanitizedLayerName(layerName, layerId, authoredId) {
  if (layerName) {
    return layerName;
  }
  if (authoredId !== null && authoredId !== void 0) {
    return `Unnamed layer (${authoredId})`;
  }
  return `Unnamed layer ${layerId}`;
}
function getAdjustedNodeId(layersContainer, nodeId) {
  const fileType = layersContainer.getModelFileTypeFromNode(nodeId);
  const nodeType = layersContainer.getNodeType(nodeId);
  const isDrawing = layersContainer.isDrawing();
  if (!isDrawing && fileType !== FileType.Dwg && nodeType === NodeType.BodyInstance) {
    const parentId = layersContainer.getNodeParent(nodeId);
    if (parentId !== null) {
      nodeId = parentId;
    }
  }
  return nodeId;
}
class LayerAdapter {
  constructor() {
    this.alwaysShowLeafNodes = false;
    this.nodeIdsToNodeNames = /* @__PURE__ */ new Map();
    this.layerNamesToNodeIds = /* @__PURE__ */ new Map();
    this.layerFactory = defaultLayerElementFactory;
    this.layersData = {};
    this.elementsData = /* @__PURE__ */ new Map();
    this.expandedIcon = b`${downIcon}`;
    this.collapsedIcon = b`${rightIcon}`;
    this.sortedByValue = false;
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(_2, id, selected, selectedNodes) {
    if (!this.layersContainer) {
      return A;
    }
    return this.layerFactory(
      this,
      this.layersContainer,
      id,
      selected ?? false,
      selectedNodes ?? []
    );
  }
}
var __getOwnPropDesc$I = Object.getOwnPropertyDescriptor;
var __decorateClass$I = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$I(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsLayerTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.listRef = e2();
  }
  /**
   * Gets the internal list component instance.
   *
   * This is a syntactic sugar to simplify getting the list element and expose it externally.
   *
   * @returns {List | undefined} The list element instance or undefined if not initialized
   */
  get layerTreeDomElement() {
    return this.listRef.value;
  }
  /**
   * Gets or sets the layers container that represents the available layers in the model.
   *
   * This is a syntactic sugar to access LayerTree.layerAdapter.layersContainer.
   * If the LayerAdapter is not set it returns undefined.
   *
   * Reassigning the layersContainer will trigger an update.
   *
   * @throws {Error} When setting layersContainer without an initialized layer adapter. This should not happen in normal use since the layerAdapter is added to the layer list at initialization.
   */
  get layersContainer() {
    var _a2;
    return (_a2 = this.layerAdapter) == null ? void 0 : _a2.layersContainer;
  }
  set layersContainer(layersContainer) {
    const layerAdapter = this.layerAdapter;
    if (!layerAdapter) {
      throw new Error(`LayerTree.layersContainer [set]: LayerAdapter is not set.`);
    }
    layerAdapter.layersContainer = layersContainer;
    this.layerAdapter = layerAdapter;
  }
  /**
   * Gets or sets the layer adapter that supplies data to the list.
   *
   * This is a syntactic sugar to access list.context.
   * If the List is not set it returns undefined.
   *
   * Reassigning the layerAdapter will trigger an update.
   *
   * @throws {Error} When setting layerAdapater without an initialized list element. This should not happen in normal use since the list is added to the layer list at initialization.
   */
  get layerAdapter() {
    var _a2;
    return (_a2 = this.layerTreeDomElement) == null ? void 0 : _a2.list.context;
  }
  set layerAdapter(newLayerAdapter) {
    var _a2;
    if (!this.layerTreeDomElement) {
      throw new Error(`LayerTree.layerAdapter [set]: List element is not set.`);
    }
    const rawLayersData = (_a2 = newLayerAdapter.layersContainer) == null ? void 0 : _a2.getLayers();
    rawLayersData == null ? void 0 : rawLayersData.forEach((layerName, _layerId) => {
      var _a3, _b, _c;
      const authoredId = ((_b = (_a3 = newLayerAdapter.layersContainer) == null ? void 0 : _a3.getLayerAuthoredId) == null ? void 0 : _b.call(_a3, _layerId)) ?? null;
      layerName = getSanitizedLayerName(layerName, _layerId, authoredId);
      const newNodes = new Set(((_c = newLayerAdapter.layersContainer) == null ? void 0 : _c.getNodesFromLayer(_layerId, false)) ?? []);
      if (newLayerAdapter.layerNamesToNodeIds.has(layerName)) {
        const existingNodes = newLayerAdapter.layerNamesToNodeIds.get(layerName) ?? /* @__PURE__ */ new Set();
        newLayerAdapter.layerNamesToNodeIds.set(
          layerName,
          /* @__PURE__ */ new Set([...existingNodes, ...newNodes])
        );
      } else {
        newLayerAdapter.layerNamesToNodeIds.set(layerName, newNodes);
      }
    });
    const htmlIdsToLayerNames = /* @__PURE__ */ new Map();
    let counter = 0;
    newLayerAdapter.layerNamesToNodeIds.forEach((_v, layerName) => {
      htmlIdsToLayerNames.set(counter++, layerName);
    });
    this.layerTreeDomElement.list = { context: newLayerAdapter };
    this.layerTreeDomElement.list.context.elementsData = htmlIdsToLayerNames;
    this.layerTreeDomElement.list.context.sortedByValue = false;
  }
  /**
   * Selects or deselects layers in the list.
   *
   * Reassigning the selected layers will trigger an update.
   *
   * @param layerIds - Array of layer IDs to update
   * @param selected - Whether to select (true) or deselect (false) the layers
   * @returns {void}
   * @throws {Error} When the layer tree element is not initialized
   */
  selectElements(layerIds, selected) {
    if (!this.layerTreeDomElement) {
      throw new Error(`LayerTree.selectElements: layer tree element is not set.`);
    }
    let selection = this.layerTreeDomElement.selected;
    if (!selected) {
      selection = selection.filter((current) => !layerIds.includes(current));
    } else {
      selection = layerIds;
    }
    this.layerTreeDomElement.selected = selection;
  }
  /**
   * Selects or deselects nodes in the layer sublists.
   *
   * Clears existing selection and applies the new selection to all layer tree elements.
   *
   * @param nodeIds - Array of node IDs to update
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When the tree dom element is not initialized
   */
  selectNodes(nodeIds, selected) {
    if (!this.layerTreeDomElement) {
      throw new Error(`LayerTree.selectElements: tree dom element is not set.`);
    }
    const layerTreeElements = this.getLayerTreeElements();
    layerTreeElements.forEach((el) => {
      el.clearSelection();
      el.selectNodes(nodeIds, selected);
    });
  }
  /**
   * Retrieves custom data associated with a layer.
   *
   * This is a shorthand to allow users to attach reactive data to layers.
   *
   * @param layerId - The ID of the layer that owns the data
   * @returns {T} The stored custom data or undefined if no data exists
   * @throws {Error} When the layer adapter is not initialized
   */
  getElementData(layerId) {
    const layerAdapter = this.layerAdapter;
    if (!layerAdapter) {
      throw new Error(`LayerTree.setLayerData [set]: LayerAdapter is not set.`);
    }
    return layerAdapter.layersData[layerId];
  }
  /**
   * Stores custom data for a layer, replacing any existing value.
   *
   * If the layer had already a value it is erased.
   * Setting layer data will trigger an update.
   *
   * @param layerId - The ID of the layer that owns the data
   * @param data - The data to store
   * @returns {void}
   * @throws {Error} When the layer adapter or tree element is not initialized
   */
  setLayerData(layerId, data) {
    const layerAdapter = this.layerAdapter;
    if (!layerAdapter) {
      throw new Error(`LayerTree.setLayerData [set]: LayerAdapter is not set.`);
    }
    const layerTreeElm = this.layerTreeDomElement;
    if (!layerTreeElm) {
      throw new Error(`LayerTree.setLayerData [set]: tree element is not set.`);
    }
    layerAdapter.layersData[layerId] = data;
    layerTreeElm.list = { ...layerTreeElm.list };
  }
  /**
   * Merges custom data into an existing layer entry.
   *
   * If the layer did not have data, it is added to the context.
   * If the given data is an array and the context layer data is an array, the data passed as argument are appended to the context data.
   * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
   * Otherwise it is equivalent to setLayerData.
   *
   * Updating layer data will trigger an update.
   *
   * @param layerId - The ID of the layer that owns the data
   * @param data - The data to merge into the layer entry
   * @returns {void}
   * @throws {Error} When the layer adapter or tree element is not initialized
   */
  updateLayerData(layerId, data) {
    const layerAdapter = this.layerAdapter;
    if (!layerAdapter) {
      throw new Error(`LayerTree.setLayerData [set]: LayerAdapter is not set.`);
    }
    const layerTreeElm = this.layerTreeDomElement;
    if (!layerTreeElm) {
      throw new Error(`LayerTree.setLayerData [set]: Tree element is not set.`);
    }
    if (Array.isArray(data) && Array.isArray(layerAdapter.layersData[layerId])) {
      layerAdapter.layersData[layerId] = [...layerAdapter.layersData[layerId], ...data];
    } else if (typeof data === "object" && (!layerAdapter.layersData[layerId] || typeof layerAdapter.layersData[layerId] === "object")) {
      layerAdapter.layersData[layerId] = Object.assign(
        layerAdapter.layersData[layerId] ?? {},
        data
      );
    } else {
      layerAdapter.layersData[layerId] = data;
    }
    layerAdapter.layersData[layerId] = Object.assign(layerAdapter.layersData[layerId] ?? {}, data);
    layerTreeElm.list = { ...layerTreeElm.list };
  }
  /**
   * Updates visibility icons for layers based on shown and hidden body IDs.
   *
   * This method propagates visibility changes to affected layer tree elements.
   *
   * @param shownBodyIds - Array of body IDs that are now visible
   * @param hiddenBodyIds - Array of body IDs that are now hidden
   * @returns {void}
   */
  updateVisibility(shownBodyIds, hiddenBodyIds) {
    if (!this.layerAdapter || !this.layerAdapter.layersContainer) {
      console.error(
        "Cannot update layer tree visibility icons: LayerAdapter and/or LayersContainer is not set."
      );
      return;
    }
    const layerTreeElements = this.getLayerTreeElements();
    const getParentShownBodyId = (nodeId) => {
      var _a2;
      return ((_a2 = this.layerAdapter) == null ? void 0 : _a2.layersContainer) ? getAdjustedNodeId(this.layerAdapter.layersContainer, nodeId) : nodeId;
    };
    const parentShownBodyIds = new Set(shownBodyIds.map(getParentShownBodyId));
    const parentHiddenBodyIds = new Set(hiddenBodyIds.map(getParentShownBodyId));
    layerTreeElements.forEach((lle) => {
      const affectedKeys = Array.from(lle.layerNodes.keys()).some(
        (nodeId) => parentShownBodyIds.has(nodeId) || parentHiddenBodyIds.has(nodeId)
      );
      if (affectedKeys) {
        lle.updateVisibility(
          Array.from(parentShownBodyIds).filter((id) => lle.layerNodes.has(id)),
          Array.from(parentHiddenBodyIds).filter((id) => lle.layerNodes.has(id))
        );
      }
    });
  }
  /** @internal */
  render() {
    return b`<div class="layertree-container">
      <hoops-list
        class="layertree"
        .list=${{ context: new LayerAdapter() }}
        ${n2(this.listRef)}
        @hoops-layer-clicked=${this.onLayerClicked}
        @hoops-layer-tree-node-clicked=${this.onLayerNodeClicked}
        @hoops-layer-visibility-change=${this.onLayerVisibilityClicked}
        @hoops-layer-node-visibility-change=${this.onLayerNodeVisibilityClicked}
      ></hoops-list>
    </div>`;
  }
  /**
   * Handles layer click events and manages layer selection.
   * @internal
   * @param event - The layer clicked event
   * @returns {void}
   */
  onLayerClicked(event) {
    const layerElement = event.detail.source;
    if (event.detail.button === 0 || event.detail.button === 2 && !layerElement.selected) {
      layerElement.toggleSelection();
    }
    const otherElements = this.getLayerTreeElements();
    otherElements == null ? void 0 : otherElements.forEach((lle) => {
      if (lle.layerId === event.detail.layerId) {
        return;
      }
      lle.select(false);
    });
    this.notifyNodeSelection(event.detail);
  }
  /**
   * Retrieves all layer tree element instances from the shadow DOM.
   * @internal
   * @returns {LayerTreeElement[]} Array of layer tree elements
   */
  getLayerTreeElements() {
    var _a2, _b;
    const ll = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".layertree");
    const dl = (_b = ll == null ? void 0 : ll.shadowRoot) == null ? void 0 : _b.querySelector("div.list");
    const listElements = dl == null ? void 0 : dl.querySelectorAll("hoops-list-element");
    const LayerTreeElements = new Array();
    listElements == null ? void 0 : listElements.forEach((listElement) => {
      var _a3;
      const lle = (_a3 = listElement.shadowRoot) == null ? void 0 : _a3.querySelector(
        "div.element > div.header > hoops-layer-tree-element"
      );
      if (lle) {
        LayerTreeElements.push(lle);
      }
    });
    return LayerTreeElements;
  }
  /**
   * Handles layer node click events and manages node selection.
   * @internal
   * @param event - The layer tree node clicked event
   * @returns {void}
   */
  onLayerNodeClicked(event) {
    const layerElement = event.detail.source;
    if (event.detail.button === 0 || event.detail.button === 2 && !layerElement.selectedNodes.includes(event.detail.nodeId)) {
      layerElement.toggleNodeSelection(event.detail.nodeId);
    }
    let wasSelected = false;
    if (layerElement.selectedNodes.includes(event.detail.nodeId)) {
      wasSelected = true;
    }
    const layerSublists = this.getLayerTreeElements();
    layerSublists == null ? void 0 : layerSublists.forEach((lle) => {
      lle.selectedNodes = [];
    });
    if (wasSelected) {
      layerElement.selectedNodes.push(event.detail.nodeId);
    }
    this.notifyNodeSelection(event.detail);
  }
  /**
   * Handles layer visibility toggle events.
   * @internal
   * @param event - The layer visibility click event
   * @returns {void}
   */
  onLayerVisibilityClicked(event) {
    const layerElement = event.detail.source;
    layerElement.toggleVisibility();
    this.notifyLayerVisibility(event.detail);
  }
  /**
   * Handles layer node visibility toggle events.
   * @internal
   * @param event - The layer node visibility click event
   * @returns {void}
   */
  onLayerNodeVisibilityClicked(event) {
    this.notifyLayerVisibility(event.detail);
  }
  /**
   * Dispatches a custom event to notify about node selection changes.
   * @internal
   * @param event - The base mouse event details
   * @returns {void}
   */
  notifyNodeSelection(event) {
    const selectedIds = [];
    const layerSublists = this.getLayerTreeElements();
    layerSublists == null ? void 0 : layerSublists.forEach((lle) => {
      selectedIds.push(...lle.selectedNodes);
    });
    this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-node-selected",
        {
          bubbles: true,
          composed: true,
          detail: {
            ...event,
            nodeIds: selectedIds,
            source: this
          }
        }
      )
    );
  }
  /**
   * Dispatches a custom event to notify about layer visibility changes.
   * @internal
   * @param event - The base mouse event details
   * @returns {void}
   */
  notifyLayerVisibility(event) {
    const hiddenLayers = this.getLayerTreeElements();
    const hiddenNodeIds = [];
    hiddenLayers.forEach((lle) => {
      hiddenNodeIds.push(...lle.hiddenNodes);
    });
    this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-visibility-changed",
        {
          bubbles: true,
          composed: true,
          detail: {
            ...event,
            nodeIds: hiddenNodeIds,
            source: this
          }
        }
      )
    );
  }
};
HoopsLayerTreeElement.styles = [
  componentBaseStyle,
  i$7`
      .layertree-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .layertree-options {
        display: flex;
        align-items: center;
        padding: 0.4rem 0.6rem;
        gap: 0.4rem;
        font-size: 0.85rem;
        border-bottom: 1px solid var(--hoops-neutral-stroke, #e0e0e0);
        user-select: none;
      }

      .layertree-options label {
        cursor: pointer;
      }

      .layertree {
        height: 100%;
        overflow: auto;
        width: 100%;
        flex: 1;
      }

      hoops-layer-tree-element {
        width: 100%;
      }
    `
];
HoopsLayerTreeElement = __decorateClass$I([
  t$2("hoops-layer-tree")
], HoopsLayerTreeElement);
var __defProp$y = Object.defineProperty;
var __getOwnPropDesc$H = Object.getOwnPropertyDescriptor;
var __decorateClass$H = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$H(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$y(target, key, result);
  return result;
};
let HoopsMarkupItemElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.markupId = "";
    this.selected = false;
  }
  /** @internal */
  render() {
    return b`<div
      class=${`markup ${this.selected ? "selected" : ""}`}
      @click=${() => this.dispatchEvent(
      new CustomEvent("hoops-select-markup", {
        detail: this.markupId,
        bubbles: true,
        composed: true
      })
    )}
    >
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="label"><slot></slot></div>
      <div class="toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>`;
  }
};
HoopsMarkupItemElement.styles = i$7`
    :host {
      display: block;
    }

    .markup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px dashed var(--hoops-foreground, #303030);
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .label {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .markup:hover,
    .markup:hover .icon {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-foreground, #303030) 5%
      );
    }

    .markup.selected {
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-accent-foreground-active, var(--blue, #0078d4)) 10%
      );
    }

    .markup.selected,
    .markup.selected .icon,
    .markup.selected .toolbar {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
    }
  `;
__decorateClass$H([
  n$4({ type: String })
], HoopsMarkupItemElement.prototype, "markupId", 2);
__decorateClass$H([
  n$4({ type: Boolean })
], HoopsMarkupItemElement.prototype, "selected", 2);
HoopsMarkupItemElement = __decorateClass$H([
  t$2("hoops-markup-item")
], HoopsMarkupItemElement);
var __defProp$x = Object.defineProperty;
var __getOwnPropDesc$G = Object.getOwnPropertyDescriptor;
var __decorateClass$G = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$G(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$x(target, key, result);
  return result;
};
let HoopsMarkupViewElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.uuid = "";
    this.itemFilter = () => true;
    this.onRedlineCreated = () => {
      this.requestUpdate();
    };
    this.onRedlineDeleted = () => {
      this.requestUpdate();
    };
    this.onRedlineViewDeleted = () => {
      this.requestUpdate();
    };
    this.onMarkupManagerReset = () => {
      this.requestUpdate();
    };
    this.onMarkupViewActivated = () => {
      this.requestUpdate();
    };
  }
  /**
   * @internal
   */
  firstUpdated(_changedProperties) {
    var _a2, _b, _c, _d, _e;
    super.firstUpdated(_changedProperties);
    (_a2 = this.redlineService) == null ? void 0 : _a2.addEventListener("hoops-redline-created", this.onRedlineCreated);
    (_b = this.redlineService) == null ? void 0 : _b.addEventListener("hoops-redline-deleted", this.onRedlineDeleted);
    (_c = this.redlineService) == null ? void 0 : _c.addEventListener("hoops-redline-view-deleted", this.onRedlineViewDeleted);
    (_d = this.redlineService) == null ? void 0 : _d.addEventListener("hoops-redline-service-reset", this.onMarkupManagerReset);
    (_e = this.redlineService) == null ? void 0 : _e.addEventListener(
      "hoops-markup-view-activated",
      this.onMarkupViewActivated
    );
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var _a2, _b, _c, _d, _e;
    super.disconnectedCallback();
    (_a2 = this.redlineService) == null ? void 0 : _a2.removeEventListener("hoops-redline-created", this.onRedlineCreated);
    (_b = this.redlineService) == null ? void 0 : _b.removeEventListener("hoops-redline-deleted", this.onRedlineDeleted);
    (_c = this.redlineService) == null ? void 0 : _c.removeEventListener(
      "hoops-redline-view-deleted",
      this.onRedlineViewDeleted
    );
    (_d = this.redlineService) == null ? void 0 : _d.removeEventListener(
      "hoops-redline-service-reset",
      this.onMarkupManagerReset
    );
    (_e = this.redlineService) == null ? void 0 : _e.removeEventListener(
      "hoops-markup-view-activated",
      this.onMarkupViewActivated
    );
  }
  /** @internal */
  render() {
    var _a2, _b;
    const view = (_a2 = this.redlineService) == null ? void 0 : _a2.getRedlineView(this.uuid);
    if (!view) {
      return b`<div>No view found for UUID: "${this.uuid}"</div>`;
    }
    const selected = ((_b = this.redlineService) == null ? void 0 : _b.getActiveViewKey()) === this.uuid;
    return b`<hoops-tree-item
      ?selected=${selected}
      ?expanded=${selected}
      @hoops-tree-item-select=${(e3) => {
      var _a3, _b2;
      const selected2 = e3.detail.selected;
      if (selected2 && ((_a3 = this.redlineService) == null ? void 0 : _a3.getActiveViewKey()) !== this.uuid) {
        (_b2 = this.redlineService) == null ? void 0 : _b2.setActiveView(this.uuid);
      }
    }}
    >
      ${this.uuid}
      <div slot="children">
        ${view.items.filter(this.itemFilter).map(
      (item) => b`<hoops-tree-item leaf>
              <hoops-markup-item markupId=${item.id}>
                <hoops-icon
                  icon=${formatRedlineIcon(item.type)}
                  slot="icon"
                  style="width: 1rem"
                ></hoops-icon>
                <span>${item.id}</span>
                <div slot="toolbar">
                  <hoops-icon-button
                    @click=${() => {
        this.dispatchEvent(
          new CustomEvent("hoops-delete-redline", {
            detail: { markupViewId: view.id, markupItem: item },
            bubbles: true,
            composed: true
          })
        );
      }}
                  >
                    <hoops-icon icon="removeIcon"></hoops-icon>
                  </hoops-icon-button>
                </div>
              </hoops-markup-item>
            </hoops-tree-item>`
    )}
      </div>
    </hoops-tree-item>`;
  }
};
HoopsMarkupViewElement.styles = [
  i$7`
      :host {
        display: block;
      }

      hoops-markup-item {
        display: block;
        width: 100%;
      }
    `
];
__decorateClass$G([
  n$4({ type: String })
], HoopsMarkupViewElement.prototype, "uuid", 2);
__decorateClass$G([
  n$4({ type: Object, attribute: false })
], HoopsMarkupViewElement.prototype, "itemFilter", 2);
__decorateClass$G([
  n$4({ type: Object, attribute: false })
], HoopsMarkupViewElement.prototype, "redlineService", 2);
HoopsMarkupViewElement = __decorateClass$G([
  t$2("hoops-markup-view")
], HoopsMarkupViewElement);
var __defProp$w = Object.defineProperty;
var __getOwnPropDesc$F = Object.getOwnPropertyDescriptor;
var __decorateClass$F = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$F(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$w(target, key, result);
  return result;
};
let HoopsMarkupTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.onUpdate = () => this.requestUpdate();
  }
  /**
   * @internal
   */
  firstUpdated(_changedProperties) {
    var _a2, _b, _c, _d;
    super.firstUpdated(_changedProperties);
    (_a2 = this.redlineService) == null ? void 0 : _a2.addEventListener("hoops-redline-created", this.onUpdate);
    (_b = this.redlineService) == null ? void 0 : _b.addEventListener("hoops-redline-deleted", this.onUpdate);
    (_c = this.redlineService) == null ? void 0 : _c.addEventListener("hoops-redline-view-deleted", this.onUpdate);
    (_d = this.redlineService) == null ? void 0 : _d.addEventListener("hoops-redline-service-reset", this.onUpdate);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var _a2, _b, _c, _d;
    super.disconnectedCallback();
    (_a2 = this.redlineService) == null ? void 0 : _a2.removeEventListener("hoops-redline-created", this.onUpdate);
    (_b = this.redlineService) == null ? void 0 : _b.removeEventListener("hoops-redline-deleted", this.onUpdate);
    (_c = this.redlineService) == null ? void 0 : _c.removeEventListener("hoops-redline-view-deleted", this.onUpdate);
    (_d = this.redlineService) == null ? void 0 : _d.removeEventListener("hoops-redline-service-reset", this.onUpdate);
  }
  /** @internal */
  render() {
    var _a2;
    return b`${(_a2 = this.redlineService) == null ? void 0 : _a2.getRedlineViewKeys().map(
      (key) => b`<hoops-markup-view
          .redlineService=${this.redlineService}
          uuid=${key}
          @hoops-delete-redline=${(e3) => {
        var _a3;
        (_a3 = this.redlineService) == null ? void 0 : _a3.removeRedlineItem(e3.detail.markupViewId, e3.detail.markupItem);
      }}
        ></hoops-markup-view>`
    )}`;
  }
};
HoopsMarkupTreeElement.styles = [
  i$7`
      :host {
        display: block;
      }
    `
];
__decorateClass$F([
  n$4({ type: Object, attribute: false })
], HoopsMarkupTreeElement.prototype, "redlineService", 2);
HoopsMarkupTreeElement = __decorateClass$F([
  t$2("hoops-markup-tree")
], HoopsMarkupTreeElement);
function formatNodeType(type) {
  switch (type) {
    case NodeType.AssemblyNode:
      return "Assembly Node";
    case NodeType.PartInstance:
      return "Part Instance";
    case NodeType.Part:
      return "Part";
    case NodeType.BodyInstance:
      return "Body Instance";
    case NodeType.PmiBody:
      return "Pmi Body";
    case NodeType.ViewFrame:
      return "View Frame";
    case NodeType.Body:
      return "Body";
    case NodeType.BrepBody:
      return "Brep Body";
    case NodeType.TessBody:
      return "Tess Body";
    case NodeType.WireBody:
      return "Wire Body";
    case NodeType.PointsBody:
      return "Points Body";
    case NodeType.Pmi:
      return "Pmi";
    case NodeType.CadView:
      return "Cad View";
    case NodeType.DrawingSheet:
      return "Drawing Sheet";
    case NodeType.Unknown:
      return "Unknown";
  }
}
function formatNodeTypeIcon(isRoot, type) {
  if (isRoot) {
    return b`${rootModel}`;
  }
  switch (type) {
    case NodeType.PartInstance:
      return b`${assemblyNode}`;
    case NodeType.AssemblyNode:
      return b`${assemblyNode}`;
    case NodeType.BodyInstance:
      return b`${bodyNode}`;
    default:
      return A;
  }
}
function formatNodeVisibilityIcon(visibility) {
  switch (visibility) {
    case "Shown":
      return b`${visibleIcon}`;
    case "Hidden":
      return b`${hiddenIcon}`;
    case "Mixed":
      return b`${halfVisibleIcon}`;
    default:
      return A;
  }
}
var __defProp$v = Object.defineProperty;
var __getOwnPropDesc$E = Object.getOwnPropertyDescriptor;
var __decorateClass$E = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$E(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$v(target, key, result);
  return result;
};
let ModelTreeNode = class extends i$3 {
  constructor() {
    super(...arguments);
    this.nodeId = Number.NaN;
    this.nodeName = "";
    this.nodeType = NodeType.Unknown;
    this.isRoot = false;
    this.visibility = "Shown";
    this.selected = false;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.nodeId)) {
      return A;
    }
    const classNames = ["model-tree-node"];
    if (this.selected) {
      classNames.push("selected");
    }
    return b`<div class=${classNames.join(" ")}>
      <div class="content">
        <div class="type-icon" title=${formatNodeType(this.nodeType)}>
          ${formatNodeTypeIcon(this.isRoot, this.nodeType)}
        </div>
        <div class="title" title=${this.nodeName}>${this.nodeName}</div>
      </div>
      <div class="visible-icon" @click=${this.onVisibilityClicked}>
        ${formatNodeVisibilityIcon(this.visibility)}
      </div>
    </div>`;
  }
  /**
   * Handles a click on the visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-model-tree-node-visibility-change' that provides the nodeId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the node
   */
  onVisibilityClicked(event) {
    event.stopPropagation();
    let isVisible = true;
    switch (this.visibility) {
      case "Shown":
        isVisible = false;
        break;
      case "Hidden":
        isVisible = true;
        break;
      // Show everything if some children are hidden
      case "Mixed":
        isVisible = true;
        break;
    }
    this.dispatchEvent(
      new CustomEvent("hoops-model-tree-node-visibility-change", {
        bubbles: true,
        composed: true,
        detail: {
          ...toBaseMouseEvent$1(event),
          nodeId: this.nodeId,
          visibility: isVisible,
          source: this
        }
      })
    );
  }
};
ModelTreeNode.styles = [
  componentBaseStyle,
  i$7`
      .model-tree-node,
      .content {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
      }

      .model-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .type-icon,
      .visible-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .content {
        width: calc(100% - 1.8rem);
      }

      .type-icon svg,
      .visible-icon svg {
        width: 100%;
        height: 100%;
      }

      .content .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .content:hover,
      .visible-icon:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .title {
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
__decorateClass$E([
  n$4({ type: Number })
], ModelTreeNode.prototype, "nodeId", 2);
__decorateClass$E([
  n$4({ type: String })
], ModelTreeNode.prototype, "nodeName", 2);
__decorateClass$E([
  n$4({ type: Number })
], ModelTreeNode.prototype, "nodeType", 2);
__decorateClass$E([
  n$4({ type: Boolean })
], ModelTreeNode.prototype, "isRoot", 2);
__decorateClass$E([
  n$4({ type: String })
], ModelTreeNode.prototype, "visibility", 2);
__decorateClass$E([
  n$4({ type: Boolean })
], ModelTreeNode.prototype, "selected", 2);
ModelTreeNode = __decorateClass$E([
  t$2("hoops-model-tree-node")
], ModelTreeNode);
function branchVisibilityFromComBranchVisibility(value) {
  switch (value) {
    case BranchVisibility.Hidden:
      return "Hidden";
    case BranchVisibility.Shown:
      return "Shown";
    case BranchVisibility.Mixed:
      return "Mixed";
    default:
      return "Unknown";
  }
}
function defaultNodeFactory$2(treeContext2, model, nodeId, selected, nodeData) {
  const branchVisibility = branchVisibilityFromComBranchVisibility(
    model.getBranchVisibility(nodeId)
  );
  const modelAdapter = treeContext2;
  const data = nodeData ?? {
    visibility: branchVisibility
  };
  data.visibility = branchVisibility;
  if (!nodeData) {
    modelAdapter.nodesData[nodeId] = data;
  }
  return b`<hoops-model-tree-node
    nodeId=${nodeId}
    nodeName=${model.getNodeName(nodeId) ?? "N/A"}
    nodeType=${model.getNodeType(nodeId)}
    ?isRoot=${model.getAbsoluteRootNode() === nodeId}
    visibility=${data.visibility}
    ?selected=${selected}
  >
  </hoops-model-tree-node>`;
}
class ModelAdapter2 {
  constructor() {
    this.nodeFactory = defaultNodeFactory$2;
    this.nodesData = {};
    this.expandedIcon = b`${downIcon}`;
    this.collapsedIcon = b`${rightIcon}`;
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    var _a2;
    return ((_a2 = this.model) == null ? void 0 : _a2.getAbsoluteRootNode()) ?? Number.NaN;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(nodeId) {
    var _a2;
    return ((_a2 = this.model) == null ? void 0 : _a2.getNodeChildren(nodeId)) ?? [];
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(_2, id, selected, nodeData) {
    if (!this.model) {
      return A;
    }
    return this.nodeFactory(this, this.model, id, selected, nodeData);
  }
}
var __getOwnPropDesc$D = Object.getOwnPropertyDescriptor;
var __decorateClass$D = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$D(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsModelTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.treeRef = e2();
  }
  /**
   * Gets the internal tree component instance.
   * Provides access to the underlying tree API when needed.
   * @returns {Tree | undefined} The tree element instance or undefined if not initialized
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets the currently selected model node IDs.
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var _a2;
    return ((_a2 = this.treeElement) == null ? void 0 : _a2.selected) ?? [];
  }
  /**
   * Sets the currently selected model node IDs.
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  set selected(value) {
    if (!this.treeElement) {
      throw new Error(`ModelTree.selected [set]: Tree element is not set.`);
    }
    this.treeElement.selected = value;
  }
  /**
   * Gets the model instance used to populate the tree.
   * @returns {IModel | undefined} The current model instance or undefined
   */
  get model() {
    var _a2;
    return (_a2 = this.modelAdapter) == null ? void 0 : _a2.model;
  }
  /**
   * Sets the model instance used to populate the tree.
   * Setting the model refreshes the displayed tree structure.
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When the model adapter is not initialized
   */
  set model(model) {
    const modelAdapter = this.modelAdapter;
    if (!modelAdapter) {
      throw new Error(`ModelTree.model [set]: ModelAdapter is not set.`);
    }
    modelAdapter.model = model;
    this.modelAdapter = modelAdapter;
    this.resetTree();
  }
  /**
   * Gets the model adapter that supplies data to the tree.
   * @returns {ModelAdapter | undefined} The current model adapter or undefined
   */
  get modelAdapter() {
    var _a2;
    return (_a2 = this.treeElement) == null ? void 0 : _a2.tree.context;
  }
  /**
   * Sets the model adapter that supplies data to the tree.
   * @param value - The model adapter to set
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  set modelAdapter(value) {
    if (!this.treeElement) {
      throw new Error(`ModelTree.modelAdapter [set]: Tree element is not set.`);
    }
    this.treeElement.tree = { context: value };
  }
  /**
   * Selects or deselects nodes in the tree.
   *
   * Reassigning the selected nodes will trigger an update.
   *
   * @param nodeIds - Array of node IDs to update
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  selectNodes(nodeIds, selected) {
    if (!this.treeElement) {
      throw new Error(`ModelTree.selectNodes: Tree element is not set.`);
    }
    let selection = this.treeElement.selected;
    if (!selected) {
      selection = selection.filter((current) => !nodeIds.includes(current));
    } else {
      selection = nodeIds;
    }
    this.treeElement.selected = selection;
  }
  /**
   * Retrieves custom data associated with a node.
   *
   * This is a shorthand to allow users to attach reactive data to nodes.
   *
   * @param nodeId - The ID of the node that owns the data
   * @returns {T} The stored custom data
   * @throws {Error} When the model adapter is not initialized
   */
  getNodeData(nodeId) {
    const modelAdapter = this.modelAdapter;
    if (!modelAdapter) {
      throw new Error(`ModelTree.setNodeData [set]: ModelAdapter is not set.`);
    }
    return modelAdapter.nodesData[nodeId];
  }
  /**
   * Stores custom data for a node, replacing any existing value.
   *
   * If the node had already a value it is erased.
   * Setting node data will trigger an update.
   *
   * @param nodeId - The ID of the node that owns the data
   * @param data - The data to store
   * @returns {void}
   * @throws {Error} When the model adapter or tree element is not initialized
   */
  setNodeData(nodeId, data) {
    const modelAdapter = this.modelAdapter;
    if (!modelAdapter) {
      throw new Error(`ModelTree.setNodeData [set]: ModelAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`ModelTree.setNodeData [set]: Tree element is not set.`);
    }
    modelAdapter.nodesData[nodeId] = data;
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Merges custom data into an existing node entry.
   *
   * If the node did not have data, it is added to the context.
   * If the given data is an array and the context node data is an array, the data passed as argument are appended to the context data.
   * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
   * Otherwise it is equivalent to setNodeData.
   *
   * Updating node data will trigger an update.
   *
   * @param nodeId - The ID of the node that owns the data
   * @param data - The data to merge into the node entry
   * @returns {void}
   * @throws {Error} When the model adapter or tree element is not initialized
   */
  updateNodeData(nodeId, data) {
    const modelAdapter = this.modelAdapter;
    if (!modelAdapter) {
      throw new Error(`ModelTree.setNodeData [set]: ModelAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`ModelTree.setNodeData [set]: Tree element is not set.`);
    }
    if (Array.isArray(data) && Array.isArray(modelAdapter.nodesData[nodeId])) {
      modelAdapter.nodesData[nodeId] = [...modelAdapter.nodesData[nodeId], ...data];
    } else if (typeof data === "object" && (!modelAdapter.nodesData[nodeId] || typeof modelAdapter.nodesData[nodeId] === "object")) {
      modelAdapter.nodesData[nodeId] = Object.assign(modelAdapter.nodesData[nodeId] ?? {}, data);
    } else {
      modelAdapter.nodesData[nodeId] = data;
    }
    modelAdapter.nodesData[nodeId] = Object.assign(modelAdapter.nodesData[nodeId] ?? {}, data);
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Refreshes the data for a specific node.
   *
   * Useful if data provided by the model has changed (child nodes added or removed).
   * If node is not loaded, it does nothing since data will be properly loaded when expanded.
   *
   * @param nodeId - The ID of the node to refresh
   * @returns {void}
   */
  refreshNodeData(nodeId) {
    var _a2;
    (_a2 = this.treeRef.value) == null ? void 0 : _a2.refreshNodeData(nodeId);
  }
  /**
   * Removes a node and its descendants from the displayed tree.
   *
   * This notifies the tree that a node has been removed from the model.
   * If the node is not loaded yet, it does nothing.
   *
   * @param nodeId - The ID of the removed node
   * @returns {void}
   */
  removeNode(nodeId) {
    var _a2;
    (_a2 = this.treeRef.value) == null ? void 0 : _a2.removeNode(nodeId);
  }
  /**
   * Resets the tree and expands default nodes for user visibility.
   * @internal
   * @returns {void}
   */
  resetTree() {
    var _a2, _b;
    (_a2 = this.treeRef.value) == null ? void 0 : _a2.resetTree();
    const model = this.model;
    if (!model) {
      return;
    }
    const defaultExpandedPath = [];
    let currentNode = model.getAbsoluteRootNode();
    let children = model.getNodeChildren(currentNode);
    let shouldContinueToDig = model.getNodeChildren(currentNode).length === 1;
    while (shouldContinueToDig) {
      defaultExpandedPath.push(currentNode);
      children = model.getNodeChildren(currentNode);
      shouldContinueToDig = children.length === 1;
      if (shouldContinueToDig) {
        currentNode = children[0];
      }
    }
    if (children.length > 1) {
      defaultExpandedPath.push(currentNode);
    }
    (_b = this.treeRef.value) == null ? void 0 : _b.expandPath(defaultExpandedPath);
  }
  /**
   * Handles low-level tree click events and re-emits them as model tree events.
   * @internal
   * @param event - The original tree click event
   * @returns {void}
   */
  handleNodeClick(event) {
    event.stopPropagation();
    const { key, ...detail } = event.detail;
    this.dispatchEvent(
      new CustomEvent("hoops-model-tree-node-click", {
        bubbles: true,
        composed: true,
        detail: {
          nodeId: key,
          ...detail
        }
      })
    );
  }
  /** @internal */
  render() {
    return b`<hoops-tree
      data-html2canvas-ignore
      class="modeltree"
      .tree=${{ context: new ModelAdapter2() }}
      @hoops-tree-node-click=${(event) => {
      this.handleNodeClick(event);
    }}
      @hoops-tree-node-aux-click=${(event) => {
      this.handleNodeClick(event);
    }}
      ${n2(this.treeRef)}
    ></hoops-tree>`;
  }
};
HoopsModelTreeElement.styles = [
  componentBaseStyle,
  i$7`
      .modeltree {
        height: 100%;
        overflow: auto;
      }
    `
];
HoopsModelTreeElement = __decorateClass$D([
  t$2("hoops-model-tree")
], HoopsModelTreeElement);
var __defProp$u = Object.defineProperty;
var __getOwnPropDesc$C = Object.getOwnPropertyDescriptor;
var __decorateClass$C = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$C(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$u(target, key, result);
  return result;
};
let SheetListNode = class extends i$3 {
  constructor() {
    super(...arguments);
    this.nodeId = Number.NaN;
    this.nodeName = "";
    this.selected = false;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.nodeId)) {
      return A;
    }
    return b`<div class="sheet-list-node ${this.selected ? "selected" : ""}">
      <div class="content">
        <div class="title">${this.nodeName}</div>
      </div>
    </div>`;
  }
};
SheetListNode.styles = [
  componentBaseStyle,
  i$7`
      .sheet-list-node,
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .sheet-list-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content,
      .type-icon svg {
        width: 100%;
        height: 100%;
      }

      .content:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .title {
        width: 100%;
        padding-left: calc(0.4rem);
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
];
__decorateClass$C([
  n$4({ type: Number })
], SheetListNode.prototype, "nodeId", 2);
__decorateClass$C([
  n$4({ type: String })
], SheetListNode.prototype, "nodeName", 2);
__decorateClass$C([
  n$4({ type: Boolean })
], SheetListNode.prototype, "selected", 2);
SheetListNode = __decorateClass$C([
  t$2("hoops-sheet-list-node")
], SheetListNode);
class SheetAdapter {
  constructor() {
    this.elementsData = /* @__PURE__ */ new Map();
    this.sortedByValue = true;
  }
  /**
   * Returns the HTML fragment for a given sheet entry.
   *
   * @param _context - The list context (unused)
   * @param id - The sheet node id
   * @param selected - Whether the node is currently selected
   * @returns The HTML fragment to render for the node
   */
  getContent(_context, id, selected) {
    if (!this.model) {
      return A;
    }
    const name = this.model.getNodeName(id) ?? "Unnamed sheet";
    return b`<hoops-sheet-list-node
      nodeId=${id}
      nodeName=${name}
      ?selected=${selected}
    ></hoops-sheet-list-node>`;
  }
}
var __getOwnPropDesc$B = Object.getOwnPropertyDescriptor;
var __decorateClass$B = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$B(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsSheetListElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.listRef = e2();
  }
  /**
   * Gets the internal list component element.
   *
   * @returns {List | undefined} The list element instance or undefined if not initialised
   */
  get listElement() {
    return this.listRef.value;
  }
  /**
   * Gets the currently selected sheet nodes.
   *
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var _a2;
    return ((_a2 = this.listElement) == null ? void 0 : _a2.selected) ?? [];
  }
  /**
   * Sets the currently selected sheet nodes.
   *
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When setting selected nodes before list initialisation
   */
  set selected(value) {
    if (!this.listElement) {
      throw new Error("HoopsSheetList.selected [set]: List element is not set.");
    }
    this.listElement.selected = value;
  }
  /**
   * Convenience accessor for the model on the underlying adapter.
   *
   * @returns {IModel | undefined} The current model instance or undefined
   */
  get model() {
    var _a2;
    return (_a2 = this.sheetAdapter) == null ? void 0 : _a2.model;
  }
  /**
   * Sets the model instance for sheet data. Setting a new model refreshes the list.
   *
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When setting model before adapter initialisation
   */
  set model(model) {
    const adapter = this.sheetAdapter;
    if (!adapter) {
      throw new Error("HoopsSheetList.model [set]: SheetAdapter is not set.");
    }
    adapter.model = model;
    this.sheetAdapter = adapter;
  }
  /**
   * Gets the sheet adapter managing list data.
   *
   * @returns {SheetAdapter | undefined} The current sheet adapter or undefined
   */
  get sheetAdapter() {
    var _a2;
    return (_a2 = this.listElement) == null ? void 0 : _a2.list.context;
  }
  /**
   * Sets the sheet adapter managing list data.
   * Populates `elementsData` from the adapter's model before assigning.
   *
   * @param value - The sheet adapter to set
   * @returns {void}
   * @throws {Error} When setting adapter before list initialisation
   */
  set sheetAdapter(value) {
    var _a2;
    if (!this.listElement) {
      throw new Error("HoopsSheetList.sheetAdapter [set]: List element is not set.");
    }
    const sheetIds = ((_a2 = value.model) == null ? void 0 : _a2.getSheetIds()) ?? [];
    const elementsData = /* @__PURE__ */ new Map();
    sheetIds.forEach((id) => {
      var _a3;
      elementsData.set(id, ((_a3 = value.model) == null ? void 0 : _a3.getNodeName(id)) ?? "Unnamed sheet");
    });
    this.listElement.list = { context: value };
    this.listElement.list.context.elementsData = elementsData;
  }
  /**
   * Selects or deselects sheet nodes.
   *
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When list element is not initialised
   */
  selectNodes(nodeIds, selected) {
    if (!this.listElement) {
      throw new Error("HoopsSheetList.selectNodes: List element is not set.");
    }
    let selection = this.listElement.selected;
    if (!selected) {
      selection = selection.filter((current) => !nodeIds.includes(current));
    } else {
      selection = nodeIds;
    }
    this.listElement.selected = selection;
  }
  /**
   * Handles list element click events and re-dispatches them as
   * `hoops-sheet-list-node-click`.
   *
   * @internal
   * @param event - The list element click event
   * @returns {void}
   */
  onSheetNodeClicked(event) {
    event.stopPropagation();
    const { key, ...rest } = event.detail;
    this.dispatchEvent(
      new CustomEvent("hoops-sheet-list-node-click", {
        bubbles: true,
        composed: true,
        detail: {
          nodeId: key,
          ...rest
        }
      })
    );
  }
  /** @internal */
  render() {
    return b`<hoops-list
      class="sheetlist"
      .list=${{ context: new SheetAdapter() }}
      @hoops-list-element-click=${this.onSheetNodeClicked}
      ${n2(this.listRef)}
    ></hoops-list>`;
  }
};
HoopsSheetListElement.styles = [
  componentBaseStyle,
  i$7`
      .sheetlist {
        height: 100%;
        overflow: auto;
      }
    `
];
HoopsSheetListElement = __decorateClass$B([
  t$2("hoops-sheet-list")
], HoopsSheetListElement);
const panelStyles = i$7`
  .settings-root {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem;
  }

  .settings-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .settings-subgroup {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.4rem;
  }

  label {
    text-align: left;
    height: 1.4rem;
  }

  label.disabled {
    opacity: 0.6;
  }

  .setting-row select,
  .setting-row input,
  .setting-row hoops-switch {
    justify-self: flex-end;
  }

  .setting-row input {
    width: 3.75rem;
  }

  .setting-row-group {
    display: flex;
    gap: 0.5rem;
  }

  input[type='color'] {
    width: 1.75rem;
    height: 1.4rem;
  }

  span.color {
    font-family: monospace;
    align-self: center;
  }

  .setting-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.setting-label {
    display: inline-block;
  }

  span.color.disabled,
  .setting-label.disabled,
  .navigation-group.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  fieldset {
    min-width: 10rem;
  }
`;
var __getOwnPropDesc$A = Object.getOwnPropertyDescriptor;
var __decorateClass$A = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$A(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsSettingsControlsSectionElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.updateCallback = () => this.requestUpdate();
    this.walkSpeedUnitFactor = -1;
    this.updateUnitFactor = () => {
      const walkSpeed = this.walkOperatorService.getWalkSpeed();
      this.walkSpeedUnitFactor = calculateWalkSpeedUnitFactor(walkSpeed);
    };
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.walkOperatorService = getService("WalkOperatorService");
    [
      "hoops-walk-mode-operator-reset",
      "hoops-mouse-walk-operator-reset",
      "hoops-keyboard-walk-operator-reset",
      "hoops-operators-walk-mode-changed",
      "hoops-operators-walk-rotation-speed-changed",
      "hoops-operators-walk-speed-changed",
      "hoops-operators-elevation-speed-changed",
      "hoops-operators-field-of-view-changed",
      "hoops-operators-mouse-look-enabled-changed",
      "hoops-operators-collision-detection-changed"
    ].map((event) => this.walkOperatorService.addEventListener(event, this.updateCallback));
    this.updateUnitFactor();
    this.spaceMouseService = getService("SpaceMouseService");
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.walkOperatorService) {
      [
        "hoops-walk-mode-operator-reset",
        "hoops-mouse-walk-operator-reset",
        "hoops-keyboard-walk-operator-reset",
        "hoops-operators-walk-mode-changed",
        "hoops-operators-walk-rotation-speed-changed",
        "hoops-operators-walk-speed-changed",
        "hoops-operators-elevation-speed-changed",
        "hoops-operators-field-of-view-changed",
        "hoops-operators-mouse-look-enabled-changed",
        "hoops-operators-collision-detection-changed"
      ].map((event) => {
        this.walkOperatorService.removeEventListener(event, this.updateCallback);
      });
    }
  }
  /** @internal */
  render() {
    const walkMode = this.walkOperatorService.getWalkMode();
    const isInKeyboardMode = walkMode === "Keyboard";
    if (this.walkSpeedUnitFactor < 1) {
      this.updateUnitFactor();
    }
    const walkSpeedUnitName = getWalkSpeedUnitName(this.walkSpeedUnitFactor);
    return b`<div class="settings-root">
      <fieldset>
        <legend>Walk Mode</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label" title="Walk Mode">Walk Mode:</div>
            <select
              class="hoops-select"
              id="walk-move-select"
              .value=${walkMode}
              @change=${(e3) => {
      const select2 = e3.target;
      this.walkOperatorService.setWalkMode(select2.value);
    }}
            >
              <option value="Mouse" ?selected=${walkMode === "Mouse"}>Mouse</option>
              <option value="Keyboard" ?selected=${walkMode === "Keyboard"}>Keyboard</option>
            </select>
          </div>
          <div
            class=${e$1({ "navigation-group": true, disabled: !isInKeyboardMode })}
            title=${o$3(isInKeyboardMode ? void 0 : "Keyboard mode is not enabled")}
            ?hidden=${!isInKeyboardMode}
          >
            <h3>Navigation Keys</h3>
            <div class="settings-group">
              <div class="setting-row">
                <div class="setting-label">Move:</div>
                <div>W / A / S / D</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Rotate:</div>
                <div>Q / E</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Up / Down:</div>
                <div>X / C</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Tilt:</div>
                <div>R / F</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Toggle Collision Detection:</div>
                <div>V</div>
              </div>
            </div>
            <hoops-separator direction="horizontal"></hoops-separator>
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Rotation (Deg/s)">Rotation (Deg/s):</div>
            <input
              type="number"
              min="0"
              step="1"
              .value=${this.walkOperatorService.getRotationSpeed()}
              @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setRotationSpeed(parseInt(input.value, 10));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title=${`Walk Speed (${walkSpeedUnitName}/s)`}>
              Walk Speed (${walkSpeedUnitName}/s):
            </div>
            <input
              type="number"
              min="0.1"
              step="0.1"
              .value=${(this.walkOperatorService.getWalkSpeed() / this.walkSpeedUnitFactor).toFixed(
      1
    )}
              @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setWalkSpeed(
        Math.trunc(parseFloat(input.value) * 10) / 10 * this.walkSpeedUnitFactor
      );
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title=${`Elevation Speed (${walkSpeedUnitName}/s)`}>
              Elevation Speed (${walkSpeedUnitName}/s):
            </div>
            <input
              type="number"
              min="0.01"
              step="0.01"
              .value=${(this.walkOperatorService.getElevationSpeed() / this.walkSpeedUnitFactor).toFixed(1)}
              @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setElevationSpeed(
        Math.trunc(parseFloat(input.value) * 10) / 10 * this.walkSpeedUnitFactor
      );
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Field of View (Deg)">Field of View (Deg):</div>
            <input
              type="number"
              min="1"
              step="1"
              .value=${this.walkOperatorService.getFieldOfView()}
              @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setFieldOfView(parseInt(input.value, 10));
    }}
            />
          </div>
          <div class="setting-row">
            <div
              class=${e$1({ "setting-label": true, disabled: !isInKeyboardMode })}
              data-testid="enable-mouse-look-row"
              style="display: flex; align-items: center; gap: 0.75rem"
            >
              <span class="setting-label" title="Enable Mouse Look">Enable Mouse Look:</span>
              <hoops-switch
                label="Enable Mouse Look"
                ?checked=${this.walkOperatorService.isMouseLookEnabled()}
                @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setMouseLookEnabled(input.checked);
    }}
                ?disabled=${!isInKeyboardMode}
              ></hoops-switch>
            </div>
            <div
              class=${e$1({ "setting-label": true, disabled: !isInKeyboardMode })}
              data-testid="speed-row"
              style="display: flex; align-items: center; gap: 0.75rem"
            >
              <span class="setting-label" title="Speed">Speed:</span>
              <input
                ?disabled=${!isInKeyboardMode || !this.walkOperatorService.isMouseLookEnabled()}
                type="number"
                min="1"
                step="1"
                .value=${this.walkOperatorService.getMouseLookSpeed()}
                @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setMouseLookSpeed(parseInt(input.value, 10));
    }}
              />
            </div>
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Enable Collision Detection">
              Enable Collision Detection:
            </div>
            <hoops-switch
              label="Enable Collision Detection"
              ?checked=${this.walkOperatorService.isCollisionDetectionEnabled()}
              @change=${(e3) => {
      const input = e3.target;
      this.walkOperatorService.setCollisionDetectionEnabled(input.checked);
    }}
            ></hoops-switch>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Space Mouse</legend>
        <div class="setting-row" style="height: 2rem;">
          <div class="setting-label">Connect space mouse:</div>
          <hoops-button
            title="Connect space mouse"
            @click=${() => {
      this.spaceMouseService.connect();
    }}
          >
            Connect
          </hoops-button>
        </div>
      </fieldset>
    </div>`;
  }
};
HoopsSettingsControlsSectionElement.styles = [
  panelStyles,
  i$7`
      :host {
        display: block;
      }

      h3 {
        margin-top: 0;
      }
    `
];
HoopsSettingsControlsSectionElement = __decorateClass$A([
  t$2("hoops-settings-controls-section")
], HoopsSettingsControlsSectionElement);
var __defProp$t = Object.defineProperty;
var __getOwnPropDesc$z = Object.getOwnPropertyDescriptor;
var __decorateClass$z = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$z(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$t(target, key, result);
  return result;
};
let HoopsSettingsGraphicsSectionElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.minimumFramerate = 0;
    this.eyeDomeLightingEnabled = false;
    this.updateCallback = async () => {
      await this.updatePromisedData();
      this.requestUpdate();
    };
    this.cameraServiceEvents = [
      "hoops-camera-service-reset",
      "hoops-projection-mode-changed",
      "hoops-orbit-fallback-mode-changed"
    ];
    this.renderOptionsServiceEvents = [
      "hoops-render-options-service-reset",
      "hoops-minimum-framerate-changed",
      "hoops-hidden-line-opacity-changed",
      "hoops-show-backfaces-changed",
      "hoops-ambient-occlusion-enabled-changed",
      "hoops-ambient-occlusion-radius-changed",
      "hoops-anti-aliasing-enabled-changed",
      "hoops-bloom-enabled-changed",
      "hoops-bloom-intensity-changed",
      "hoops-bloom-threshold-changed",
      "hoops-silhouette-enabled-changed",
      "hoops-reflection-enabled-changed",
      "hoops-shadow-enabled-changed",
      "hoops-shadow-interactive-changed",
      "hoops-shadow-blur-samples-changed",
      "hoops-splat-rendering-enabled-changed",
      "hoops-splat-rendering-size-changed",
      "hoops-splat-rendering-point-size-unit-changed",
      "hoops-eye-dome-lighting-enabled-changed",
      "hoops-background-color-changed"
    ];
    this.cuttingServiceEvents = [
      "hoops-cutting-service-reset",
      "hoops-capping-geometry-visibility-changed",
      "hoops-capping-face-color-changed",
      "hoops-capping-line-color-changed"
    ];
    this.selectionServiceEvents = [
      "hoops-selection-service-reset",
      "hoops-enable-face-line-selection-changed",
      "hoops-honors-scene-visibility-changed",
      "hoops-body-color-changed",
      "hoops-face-and-line-color-changed"
    ];
    this.measurementsServiceEvents = ["hoops-measurement-color-changed"];
    this.pmiServiceEvents = [
      "hoops-pmi-service-reset",
      "hoops-pmi-color-changed",
      "hoops-pmi-color-override-changed"
    ];
    this.sheetServiceEvents = [
      "hoops-sheet-service-reset",
      "hoops-sheet-colors-changed",
      "hoops-background-sheet-enabled-changed"
    ];
  }
  async updatePromisedData() {
    this.minimumFramerate = await this.renderOptionsService.getMinimumFramerate();
    this.eyeDomeLightingEnabled = await this.renderOptionsService.getEyeDomeLightingEnabled();
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.cameraService = getService("CameraService");
    this.cameraServiceEvents.map(
      (event) => this.cameraService.addEventListener(event, this.updateCallback)
    );
    this.renderOptionsService = getService("RenderOptionsService");
    this.renderOptionsServiceEvents.map(
      (event) => this.renderOptionsService.addEventListener(event, this.updateCallback)
    );
    this.cuttingService = getService("CuttingService");
    this.cuttingServiceEvents.map(
      (event) => this.cuttingService.addEventListener(event, this.updateCallback)
    );
    this.selectionService = getService("SelectionService");
    this.selectionServiceEvents.map(
      (event) => this.selectionService.addEventListener(event, this.updateCallback)
    );
    this.measurementsService = getService("MeasurementService");
    this.measurementsServiceEvents.map(
      (event) => this.measurementsService.addEventListener(event, this.updateCallback)
    );
    this.pmiService = getService("PmiService");
    this.pmiServiceEvents.map(
      (event) => this.pmiService.addEventListener(event, this.updateCallback)
    );
    this.sheetService = getService("SheetService");
    this.sheetServiceEvents.map(
      (event) => this.sheetService.addEventListener(event, this.updateCallback)
    );
    this.updateCallback();
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.cameraService) {
      this.cameraServiceEvents.map((event) => {
        this.cameraService.removeEventListener(event, this.updateCallback);
      });
    }
    if (this.renderOptionsService) {
      this.renderOptionsServiceEvents.map((event) => {
        this.renderOptionsService.removeEventListener(event, this.updateCallback);
      });
    }
    if (this.cuttingService) {
      this.cuttingServiceEvents.map(
        (event) => this.cuttingService.removeEventListener(event, this.updateCallback)
      );
    }
    if (this.selectionService) {
      this.selectionServiceEvents.map(
        (event) => this.selectionService.removeEventListener(event, this.updateCallback)
      );
    }
    if (this.measurementsService) {
      this.measurementsServiceEvents.map(
        (event) => this.measurementsService.removeEventListener(event, this.updateCallback)
      );
    }
    if (this.pmiService) {
      this.pmiServiceEvents.map(
        (event) => this.pmiService.removeEventListener(event, this.updateCallback)
      );
    }
    if (this.sheetService) {
      this.sheetServiceEvents.map(
        (event) => this.sheetService.removeEventListener(event, this.updateCallback)
      );
    }
  }
  /** @internal */
  render() {
    return b`
      <div class="settings-root">
        <fieldset>
          <legend>General</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label for="projection-mode" class="setting-label" title="Projection Mode"
                >Projection Mode:</label
              >
              <select
                id="projection-mode"
                name="projection-mode"
                .value=${this.cameraService.getProjectionMode()}
                @change=${(event) => {
      const target = event.target;
      this.cameraService.setProjectionMode(target.value);
    }}
              >
                ${ProjectionValues.map((value) => {
      return b`<option
                    value=${value}
                    ?selected=${value === this.cameraService.getProjectionMode()}
                  >
                    ${value}
                  </option>`;
    })}
              </select>
            </div>
            <div class="setting-row">
              <label for="framerate" class="setting-label" title="Framerate (fps)"
                >Framerate (fps):</label
              >
              <input
                id="framerate"
                name="framerate"
                type="number"
                min="0"
                step="1"
                .value=${this.minimumFramerate}
                @input=${(e3) => {
      const target = e3.target;
      const value = parseInt(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setMinimumFramerate(value);
      }
    }}
              />
            </div>
            <div class="setting-row">
              <label
                for="hidden-line-opacity"
                class="setting-label"
                title="Hidden Line Opacity (0-1)"
              >
                Hidden Line Opacity (0-1):
              </label>
              <input
                id="hidden-line-opacity"
                name="hidden-line-opacity"
                type="number"
                min="0"
                max="1"
                step="0.1"
                .value=${this.renderOptionsService.getHiddenLineOpacity()}
                @input=${(e3) => {
      const target = e3.target;
      const value = parseFloat(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setHiddenLineOpacity(value);
      }
    }}
              />
            </div>
            <div class="setting-row">
              <label for="show-backfaces" class="setting-label" title="Show Backfaces"
                >Show Backfaces:</label
              >
              <hoops-switch
                id="show-backfaces"
                name="show-backfaces"
                ?checked=${this.renderOptionsService.getShowBackfaces()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setShowBackfaces(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="show-capping-geometry"
                class="setting-label"
                title="Show Capping Geometry"
              >
                Show Capping Geometry:
              </label>
              <hoops-switch
                id="show-capping-geometry"
                name="show-capping-geometry"
                ?checked=${this.cuttingService.getCappingGeometryVisibility()}
                @change=${(e3) => {
      const target = e3.target;
      this.cuttingService.setCappingGeometryVisibility(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="enable-face-line-selection"
                class="setting-label"
                title="Enable Face / Line Selection"
              >
                Enable Face / Line Selection:
              </label>
              <hoops-switch
                id="enable-face-line-selection"
                name="enable-face-line-selection"
                ?checked=${this.selectionService.getEnableFaceLineSelection()}
                @change=${(e3) => {
      const target = e3.target;
      this.selectionService.setEnableFaceLineSelection(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="selection-honors-scene-visibility"
                class="setting-label"
                title="Selection Honors Scene Visibility"
              >
                Selection Honors Scene Visibility:
              </label>
              <hoops-switch
                id="selection-honors-scene-visibility"
                name="selection-honors-scene-visibility"
                ?checked=${this.selectionService.getHonorsSceneVisibility()}
                @change=${(e3) => {
      const target = e3.target;
      this.selectionService.setHonorsSceneVisibility(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="rotate-around-camera-center"
                class="setting-label"
                title="Rotate Around Camera Center"
              >
                Rotate Around Camera Center:
              </label>
              <hoops-switch
                id="rotate-around-camera-center"
                name="rotate-around-camera-center"
                ?checked=${this.cameraService.getOrbitFallbackMode() === "Camera Target"}
                @change=${(e3) => {
      const target = e3.target;
      this.cameraService.setOrbitFallbackMode(
        target.checked ? "Camera Target" : "Model Center"
      );
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Effects</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label
                for="enable-ambient-occlusion"
                class="setting-label"
                title="Enable Ambient Occlusion"
              >
                Enable Ambient Occlusion:
              </label>
              <hoops-switch
                id="enable-ambient-occlusion"
                name="enable-ambient-occlusion"
                ?checked=${this.renderOptionsService.getAmbientOcclusionEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setAmbientOcclusionEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="ao-radius"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getAmbientOcclusionEnabled()
    })}
                  title="Radius"
                >
                  Radius:
                </label>
                <input
                  id="ao-radius"
                  name="ao-radius"
                  type="number"
                  step="0.01"
                  ?disabled=${!this.renderOptionsService.getAmbientOcclusionEnabled()}
                  .value=${this.renderOptionsService.getAmbientOcclusionRadius()}
                  @input=${(e3) => {
      const target = e3.target;
      const value = parseFloat(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setAmbientOcclusionRadius(value);
      }
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="enable-antialiasing" class="setting-label" title="Enable Anti-Aliasing">
                Enable Anti-Aliasing:
              </label>
              <hoops-switch
                id="enable-antialiasing"
                name="enable-antialiasing"
                ?checked=${this.renderOptionsService.getAntiAliasingEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setAntiAliasingEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="enable-bloom" class="setting-label" title="Enable Bloom">
                Enable Bloom:
              </label>
              <hoops-switch
                id="enable-bloom"
                name="enable-bloom"
                ?checked=${this.renderOptionsService.getBloomEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setBloomEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="intensity-scale"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getBloomEnabled()
    })}
                  title="Intensity Scale"
                >
                  Intensity Scale:
                </label>
                <input
                  id="intensity-scale"
                  ?disabled="${!this.renderOptionsService.getBloomEnabled()}"
                  name="intensity-scale"
                  type="number"
                  step="1"
                  .value=${this.renderOptionsService.getBloomIntensity()}
                  @input=${(e3) => {
      const target = e3.target;
      const value = parseInt(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setBloomIntensity(value);
      }
    }}
                />
              </div>
              <div class="setting-row">
                <label
                  for="threshold"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getBloomEnabled()
    })}
                  title="Threshold"
                >
                  Threshold:
                </label>
                <input
                  id="threshold"
                  ?disabled="${!this.renderOptionsService.getBloomEnabled()}"
                  name="threshold"
                  type="number"
                  step="0.1"
                  .value=${this.renderOptionsService.getBloomThreshold()}
                  @input=${(e3) => {
      const target = e3.target;
      const value = parseFloat(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setBloomThreshold(value);
      }
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="silhouette-edges" class="setting-label" title="Silhouette Edges">
                Silhouette Edges:
              </label>
              <hoops-switch
                id="silhouette-edges"
                name="silhouette-edges"
                ?checked=${this.renderOptionsService.getSilhouetteEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setSilhouetteEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="reflection-planes" class="setting-label" title="Reflection Planes">
                Reflection Planes:
              </label>
              <hoops-switch
                id="reflection-planes"
                name="reflection-planes"
                ?checked=${this.renderOptionsService.getReflectionEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setReflectionEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="enable-shadows" class="setting-label" title="Enable Shadows">
                Enable Shadows:
              </label>
              <hoops-switch
                id="enable-shadows"
                name="enable-shadows"
                ?checked=${this.renderOptionsService.getShadowEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setShadowEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="interactive"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getShadowEnabled()
    })}
                  title="Interactive"
                >
                  Interactive:
                </label>
                <hoops-switch
                  id="interactive"
                  name="interactive"
                  ?disabled="${!this.renderOptionsService.getShadowEnabled()}"
                  ?checked=${this.renderOptionsService.getShadowInteractive()}
                  @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setShadowInteractive(target.checked);
    }}
                ></hoops-switch>
              </div>
              <div class="setting-row">
                <label
                  for="blur-samples"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getShadowEnabled()
    })}
                  title="Blur Samples"
                >
                  Blur Samples:
                </label>
                <input
                  id="blur-samples"
                  name="blur-samples"
                  type="number"
                  step="1"
                  ?disabled="${!this.renderOptionsService.getShadowEnabled()}"
                  .value=${this.renderOptionsService.getShadowBlurSamples()}
                  @input=${(e3) => {
      const target = e3.target;
      const value = parseInt(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setShadowBlurSamples(value);
      }
    }}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Point Cloud</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label for="enable-splats" class="setting-label" title="Enable Splats">
                Enable Splats:
              </label>
              <hoops-switch
                id="enable-splats"
                name="enable-splats"
                ?checked=${this.renderOptionsService.getSplatRenderingEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setSplatRenderingEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="splats-size"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getSplatRenderingEnabled()
    })}
                  title="Size"
                >
                  Size:
                </label>
                <input
                  id="splats-size"
                  name="splats-size"
                  type="number"
                  step="0.001"
                  ?disabled="${!this.renderOptionsService.getSplatRenderingEnabled()}"
                  .value=${this.renderOptionsService.getSplatRenderingSize()}
                  @input=${(e3) => {
      const target = e3.target;
      const value = parseFloat(target.value);
      if (!isNaN(value)) {
        this.renderOptionsService.setSplatRenderingSize(value);
      }
    }}
                />
              </div>
              <div
                class="setting-row"
                style="flex-direction: column; height: fit-content; align-items: start;"
              >
                <label
                  for="splats-mode"
                  class=${e$1({
      "setting-label": true,
      disabled: !this.renderOptionsService.getSplatRenderingEnabled()
    })}
                  title="Mode"
                >
                  Mode:
                </label>
                <select
                  id="splats-mode"
                  name="splats-mode"
                  style="align-self: end;"
                  ?disabled="${!this.renderOptionsService.getSplatRenderingEnabled()}"
                  .value=${this.renderOptionsService.getSplatRenderingPointSizeUnit()}
                  @change=${(event) => {
      const target = event.target;
      const value = target.value;
      this.renderOptionsService.setSplatRenderingPointSizeUnit(value);
    }}
                >
                  ${PointSizeUnitValues.map((value) => {
      return b`<option
                      value=${value}
                      ?sselected=${value === this.renderOptionsService.getSplatRenderingPointSizeUnit()}
                    >
                      ${value}
                    </option>`;
    })}
                </select>
              </div>
            </div>
            <div class="setting-row">
              <label
                for="enable-eye-dome-lighting"
                class="setting-label"
                title="Enable Eye-Dome Lighting"
              >
                Enable Eye-Dome Lighting:
              </label>
              <hoops-switch
                id="enable-eye-dome-lighting"
                name="enable-eye-dome-lighting"
                ?checked=${this.eyeDomeLightingEnabled}
                @change=${(e3) => {
      const target = e3.target;
      this.renderOptionsService.setEyeDomeLightingEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Color</legend>
          <div class="settings-group">
            <label>Background</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="background-color-top" class="setting-label" title="Top"> Top: </label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.renderOptionsService.getBackgroundColor().top ?? "#transparent"}</span
                  >
                  <input
                    id="background-color-top"
                    name="background-color-top"
                    type="color"
                    .value=${this.renderOptionsService.getBackgroundColor().top ?? "#000000"}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      const colors2 = this.renderOptionsService.getBackgroundColor();
      this.renderOptionsService.setBackgroundColor({
        top: value,
        bottom: colors2.bottom
      });
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="background-color-bottom" class="setting-label" title="Bottom">
                  Bottom:
                </label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.renderOptionsService.getBackgroundColor().bottom ?? "#transparent"}</span
                  >
                  <input
                    id="background-color-bottom"
                    name="background-color-bottom"
                    type="color"
                    .value=${this.renderOptionsService.getBackgroundColor().bottom ?? "#000000"}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      const colors2 = this.renderOptionsService.getBackgroundColor();
      this.renderOptionsService.setBackgroundColor({
        top: colors2.top,
        bottom: value
      });
    }}
                  />
                </div>
              </div>
            </div>
            <label>Capping Geometry</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="capping-geometry-face" class="setting-label" title="Face">Face:</label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.cuttingService.getCappingFaceColor() ?? "#no-color"}</span
                  >
                  <input
                    id="capping-geometry-face"
                    name="capping-geometry-face"
                    type="color"
                    .value=${this.cuttingService.getCappingFaceColor() ?? "#000000"}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.cuttingService.setCappingFaceColor(value);
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="capping-geometry-line" class="setting-label" title="Line">Line:</label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.cuttingService.getCappingLineColor() ?? "#no-color"}</span
                  >
                  <input
                    id="capping-geometry-line"
                    name="capping-geometry-line"
                    type="color"
                    .value=${this.cuttingService.getCappingLineColor() ?? "#000000"}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.cuttingService.setCappingLineColor(value);
    }}
                  />
                </div>
              </div>
            </div>
            <label>Selection</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="selection-color-body" class="setting-label" title="Body">Body:</label>
                <div class="setting-row-group">
                  <span class="color">${this.selectionService.getBodyColor()}</span>
                  <input
                    id="selection-color-body"
                    name="selection-color-body"
                    type="color"
                    .value=${this.selectionService.getBodyColor()}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.selectionService.setBodyColor(value);
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label
                  for="selection-color-faces-lines"
                  class="setting-label"
                  title="Faces and Lines"
                >
                  Faces and Lines:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.selectionService.getFaceAndLineColor()}</span>
                  <input
                    id="selection-color-faces-lines"
                    name="selection-color-faces-lines"
                    type="color"
                    .value=${this.selectionService.getFaceAndLineColor()}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.selectionService.setFaceAndLineColor(value);
    }}
                  />
                </div>
              </div>
            </div>
            <div class="setting-row">
              <label for="measurement-color" class="setting-label" title="Measurement">
                Measurement:
              </label>
              <div class="setting-row-group">
                <span class="color">${this.measurementsService.getMeasurementColor()}</span>
                <input
                  id="measurement-color"
                  name="measurement-color"
                  type="color"
                  .value=${this.measurementsService.getMeasurementColor()}
                  @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.measurementsService.setMeasurementColor(value);
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="pmi-override-color" class="setting-label" title="PMI Override">
                PMI Override:
              </label>
              <div class="setting-row-group">
                <hoops-switch
                  id="pmi-override-enable"
                  name="pmi-override-enable"
                  ?checked=${this.pmiService.getPmiColorOverride()}
                  @change=${(e3) => {
      const target = e3.target;
      this.pmiService.setPmiColorOverride(target.checked);
    }}
                ></hoops-switch>
                <span class=${!this.pmiService.getPmiColorOverride() ? "color disabled" : "color"}
                  >${this.pmiService.getPmiColor()}</span
                >
                <input
                  id="pmi-override-color"
                  name="pmi-override-color"
                  type="color"
                  ?disabled=${!this.pmiService.getPmiColorOverride()}
                  .value=${this.pmiService.getPmiColor()}
                  @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.pmiService.setPmiColor(value);
      if (this.pmiService.getPmiColorOverride()) {
        this.pmiService.setPmiColorOverride(true);
      }
    }}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Drawing</legend>
          <div class="settings-group">
            <label>Drawing Colors</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="drawing-background-color" class="setting-label" title="Background">
                  Background:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetBackgroundColor()}</span>
                  <input
                    id="drawing-background-color"
                    name="drawing-background-color"
                    type="color"
                    .value=${this.sheetService.getSheetBackgroundColor()}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.sheetService.setSheetColors(
        value,
        this.sheetService.getSheetColor(),
        this.sheetService.getSheetShadowColor()
      );
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="drawing-sheet-color" class="setting-label" title="Sheet">
                  Sheet:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetColor()}</span>
                  <input
                    id="drawing-sheet-color"
                    name="drawing-sheet-color"
                    type="color"
                    .value=${this.sheetService.getSheetColor()}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.sheetService.setSheetColors(
        this.sheetService.getSheetBackgroundColor(),
        value,
        this.sheetService.getSheetShadowColor()
      );
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="drawing-sheet-shadow-color" class="setting-label" title="Sheet Shadow">
                  Sheet Shadow:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetShadowColor()}</span>
                  <input
                    id="drawing-sheet-shadow-color"
                    name="drawing-sheet-shadow-color"
                    type="color"
                    .value=${this.sheetService.getSheetShadowColor()}
                    @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.sheetService.setSheetColors(
        this.sheetService.getSheetBackgroundColor(),
        this.sheetService.getSheetColor(),
        value
      );
    }}
                  />
                </div>
              </div>
            </div>
            <div class="setting-row">
              <label
                for="show-sheet-background"
                class="setting-label"
                title="Show Sheet Background"
              >
                Show Sheet Background:
              </label>
              <hoops-switch
                id="show-sheet-background"
                name="show-sheet-background"
                ?checked=${this.sheetService.getBackgroundSheetEnabled()}
                @change=${(e3) => {
      const target = e3.target;
      this.sheetService.setBackgroundSheetEnabled(target.checked);
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
      </div>
    `;
  }
};
HoopsSettingsGraphicsSectionElement.styles = [
  panelStyles,
  i$7`
      :host {
        display: block;
      }
    `
];
__decorateClass$z([
  n$4({ type: Number })
], HoopsSettingsGraphicsSectionElement.prototype, "minimumFramerate", 2);
__decorateClass$z([
  n$4({ type: Boolean })
], HoopsSettingsGraphicsSectionElement.prototype, "eyeDomeLightingEnabled", 2);
HoopsSettingsGraphicsSectionElement = __decorateClass$z([
  t$2("hoops-settings-graphics-section")
], HoopsSettingsGraphicsSectionElement);
var __getOwnPropDesc$y = Object.getOwnPropertyDescriptor;
var __decorateClass$y = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$y(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsSettingsInterfaceSectionElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.updateCallback = () => this.requestUpdate();
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.viewService = getService("ViewService");
    this.floorplanService = getService("FloorplanService");
    [
      "hoops-view-axis-triad-visibility-changed",
      "hoops-view-nav-cube-visibility-changed",
      "hoops-view-reset"
    ].map((event) => this.viewService.addEventListener(event, this.updateCallback));
    [
      "hoops-floorplan-activation-changed",
      "hoops-floorplan-track-camera-changed",
      "hoops-floorplan-orientation-changed",
      "hoops-floorplan-auto-activation-changed",
      "hoops-floorplan-overlay-feet-per-pixel-changed",
      "hoops-floorplan-overlay-zoom-level-changed",
      "hoops-floorplan-overlay-background-opacity-changed",
      "hoops-floorplan-overlay-border-opacity-changed",
      "hoops-floorplan-overlay-avatar-opacity-changed",
      "hoops-floorplan-background-color-changed",
      "hoops-floorplan-border-color-changed",
      "hoops-floorplan-avatar-color-changed",
      "hoops-floorplan-avatar-outline-color-changed",
      "hoops-floorplan-manager-reset"
    ].map((event) => this.floorplanService.addEventListener(event, this.updateCallback));
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.viewService) {
      [
        "hoops-view-axis-triad-visibility-changed",
        "hoops-view-nav-cube-visibility-changed",
        "hoops-view-reset"
      ].map((event) => {
        this.viewService.removeEventListener(event, this.updateCallback);
      });
    }
    if (this.floorplanService) {
      [
        "hoops-floorplan-activation-changed",
        "hoops-floorplan-track-camera-changed",
        "hoops-floorplan-orientation-changed",
        "hoops-floorplan-auto-activation-changed",
        "hoops-floorplan-overlay-feet-per-pixel-changed",
        "hoops-floorplan-overlay-zoom-level-changed",
        "hoops-floorplan-overlay-background-opacity-changed",
        "hoops-floorplan-overlay-border-opacity-changed",
        "hoops-floorplan-overlay-avatar-opacity-changed",
        "hoops-floorplan-background-color-changed",
        "hoops-floorplan-border-color-changed",
        "hoops-floorplan-avatar-color-changed",
        "hoops-floorplan-avatar-outline-color-changed",
        "hoops-floorplan-manager-reset"
      ].map((event) => {
        this.floorplanService.removeEventListener(event, this.updateCallback);
      });
    }
  }
  /** @internal */
  render() {
    const floorplanActive = this.floorplanService.isActive();
    const orientation = this.floorplanService.getOrientation();
    const autoActivationMode = this.floorplanService.getAutoActivationMode();
    const trackCameraEnabled = this.floorplanService.isTrackCameraEnabled();
    const trackCameraDependantLabelClass = { disabled: !trackCameraEnabled };
    return b`<div class="settings-root">
      <fieldset>
        <legend>Axis</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label">Show Axis Triad:</div>
            <hoops-switch
              id="show-axis-triad"
              label="Show Axis Triad"
              ?checked=${this.viewService.isAxisTriadVisible()}
              @change=${(e3) => {
      const target = e3.target;
      this.viewService.setAxisTriadVisible(target.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Show Nav Cube:</div>
            <hoops-switch
              id="show-nav-cube"
              label="Show Nav Cube"
              ?checked=${this.viewService.isNavCubeVisible()}
              @change=${(e3) => {
      const target = e3.target;
      this.viewService.setNavCubeVisible(target.checked);
    }}
            ></hoops-switch>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Floorplan</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label">Activate FloorPlan:</div>
            <hoops-switch
              id="activate-floorplan"
              label="Activate Floorplan"
              ?checked=${floorplanActive}
              @change=${(e3) => {
      const target = e3.target;
      this.floorplanService.setActive(target.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Track Camera:</div>
            <hoops-switch
              id="track-camera"
              label="Track Camera"
              ?checked=${trackCameraEnabled}
              @change=${(e3) => {
      const target = e3.target;
      this.floorplanService.setTrackCameraEnabled(target.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Orientation:</div>
            <select
              name="orientation"
              id="orientation"
              .value=${orientation}
              @change=${(event) => {
      const select2 = event.target;
      const value = select2.value;
      this.floorplanService.setOrientation(value);
    }}
            >
              ${OrientationNames.map((value) => {
      return b`<option value=${value} ?selected=${orientation === value}>
                  ${value}
                </option>`;
    })}
            </select>
          </div>
          <div class="setting-row">
            <div class="setting-label">Auto Activation:</div>
            <select
              name="auto-activation"
              id="auto-activation"
              .value=${autoActivationMode}
              @change=${(event) => {
      const select2 = event.target;
      const value = select2.value;
      this.floorplanService.setAutoActivationMode(value);
    }}
            >
              ${AutoActivationModeNames.map((value) => {
      return b`<option value=${value} ?selected=${autoActivationMode === value}>
                  ${value}
                </option>`;
    })}
            </select>
          </div>
          <div class="setting-row">
            <div class="setting-label ${e$1(trackCameraDependantLabelClass)}">
              Overlay Feet per Pixel:
            </div>
            <input
              type="number"
              id="overlay-feet-per-pixel"
              .value=${this.floorplanService.getOverlayFeetPerPixel()}
              step="0.1"
              ?disabled=${!trackCameraEnabled}
              @input=${(e3) => {
      const target = e3.target;
      let value = parseFloat(target.value);
      if (!isNaN(value)) {
        value = Math.trunc(value * 10) / 10;
        this.floorplanService.setOverlayFeetPerPixel(value);
      } else {
        console.warn("Invalid input for Overlay Feet per Pixel");
      }
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label ${e$1(trackCameraDependantLabelClass)}">
              Overlay Zoom Level:
            </div>
            <input
              type="number"
              id="overlay-zoom-level"
              .value=${this.floorplanService.getOverlayZoomLevel()}
              step="1"
              ?disabled=${!trackCameraEnabled}
              @input=${(e3) => {
      const target = e3.target;
      const value = parseInt(target.value, 10);
      if (!isNaN(value)) {
        this.floorplanService.setOverlayZoomLevel(value);
      } else {
        console.warn("Invalid input for Overlay Zoom Level");
      }
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Background Opacity:</div>
            <input
              type="number"
              id="overlay-background-opacity"
              .value=${this.floorplanService.getOverlayBackgroundOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e3) => {
      const target = e3.target;
      let value = parseFloat(target.value);
      if (!isNaN(value)) {
        value = Math.trunc(value * 100) / 100;
        this.floorplanService.setOverlayBackgroundOpacity(value);
      } else {
        console.warn("Invalid input for Overlay Background Opacity");
      }
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Border Opacity:</div>
            <input
              type="number"
              id="overlay-border-opacity"
              .value=${this.floorplanService.getOverlayBorderOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e3) => {
      const target = e3.target;
      let value = parseFloat(target.value);
      if (!isNaN(value)) {
        value = Math.trunc(value * 100) / 100;
        this.floorplanService.setOverlayBorderOpacity(value);
      } else {
        console.warn("Invalid input for Overlay Border Opacity");
      }
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Avatar Opacity:</div>
            <input
              type="number"
              id="overlay-avatar-opacity"
              .value=${this.floorplanService.getOverlayAvatarOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e3) => {
      const target = e3.target;
      let value = parseFloat(target.value);
      if (!isNaN(value)) {
        value = Math.trunc(value * 100) / 100;
        this.floorplanService.setOverlayAvatarOpacity(value);
      } else {
        console.warn("Invalid input for Overlay Avatar Opacity");
      }
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Background Color:</div>
            <label>
              ${this.floorplanService.getFloorplanBackgroundColor()}
              <input
                type="color"
                id="floorplan-background-color"
                .value=${this.floorplanService.getFloorplanBackgroundColor()}
                @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.floorplanService.setFloorplanBackgroundColor(value);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Border Color:</div>
            <label>
              ${this.floorplanService.getFloorplanBorderColor()}
              <input
                type="color"
                id="floorplan-border-color"
                .value=${this.floorplanService.getFloorplanBorderColor()}
                @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.floorplanService.setFloorplanBorderColor(value);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Avatar Color:</div>
            <label>
              ${this.floorplanService.getFloorplanAvatarColor()}
              <input
                type="color"
                id="floorplan-avatar-color"
                .value=${this.floorplanService.getFloorplanAvatarColor()}
                @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.floorplanService.setFloorplanAvatarColor(value);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Avatar Outline Color:</div>
            <label>
              ${this.floorplanService.getFloorplanAvatarOutlineColor()}
              <input
                type="color"
                id="floorplan-avatar-outline-color"
                .value=${this.floorplanService.getFloorplanAvatarOutlineColor()}
                @change=${(e3) => {
      const target = e3.target;
      const value = target.value;
      this.floorplanService.setFloorplanAvatarOutlineColor(value);
    }}
              />
            </label>
          </div>
        </div>
      </fieldset>
    </div>`;
  }
};
HoopsSettingsInterfaceSectionElement.styles = [
  panelStyles,
  i$7`
      :host {
        display: block;
      }
    `
];
HoopsSettingsInterfaceSectionElement = __decorateClass$y([
  t$2("hoops-settings-interface-section")
], HoopsSettingsInterfaceSectionElement);
var __getOwnPropDesc$x = Object.getOwnPropertyDescriptor;
var __decorateClass$x = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$x(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsSettingsPanelElement = class extends i$3 {
  resetToDefault() {
    Object.values(getAllServices()).forEach((service) => {
      if (!isResettableConfigurationService(service)) {
        return;
      }
      service.resetConfiguration();
    });
  }
  /** @internal */
  render() {
    return b`<div>
      <h2 class="title">Settings</h2>
      <hoops-accordion>
        <div slot="header">Graphics</div>
        <div slot="content">
          <hoops-settings-graphics-section></hoops-settings-graphics-section>
        </div>
      </hoops-accordion>
      <hoops-accordion>
        <div slot="header">Interface</div>
        <div slot="content">
          <hoops-settings-interface-section></hoops-settings-interface-section>
        </div>
      </hoops-accordion>
      <hoops-accordion>
        <div slot="header">Controls</div>
        <div slot="content">
          <hoops-settings-controls-section></hoops-settings-controls-section>
        </div>
      </hoops-accordion>
      <div class="configuration-section">
        <hoops-button @click=${this.resetToDefault}>Reset to Default</hoops-button>
      </div>
    </div>`;
  }
};
HoopsSettingsPanelElement.styles = i$7`
    :host {
      height: 100%;
      overflow: auto;
    }
    .title {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.5rem 0;
    }

    .configuration-section {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 1rem;
    }

    hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }
  `;
HoopsSettingsPanelElement = __decorateClass$x([
  t$2("hoops-settings-panel")
], HoopsSettingsPanelElement);
var __defProp$s = Object.defineProperty;
var __getOwnPropDesc$w = Object.getOwnPropertyDescriptor;
var __decorateClass$w = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$w(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$s(target, key, result);
  return result;
};
let HoopsCadConfigurationButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle CAD configurations" .color=${this.color}
      >${cadConfiguration}</hoops-icon-button
    >`;
  }
};
__decorateClass$w([
  n$4()
], HoopsCadConfigurationButtonElement.prototype, "color", 2);
HoopsCadConfigurationButtonElement = __decorateClass$w([
  t$2("hoops-toolbar-cad-configuration")
], HoopsCadConfigurationButtonElement);
var __defProp$r = Object.defineProperty;
var __getOwnPropDesc$v = Object.getOwnPropertyDescriptor;
var __decorateClass$v = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$v(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$r(target, key, result);
  return result;
};
let HoopsCameraButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.dropDownPosition = "right";
    this.faceSelected = false;
    this.webViewer = void 0;
    this.webViewerContext = new s$7(this, {
      context: webViewerContext,
      callback: (value) => {
        this.webViewerChanged(value);
      },
      subscribe: true
    });
    this.webViewerCallbacks = void 0;
    this.handleServiceUpdate = () => this.requestUpdate();
  }
  webViewerChanged(webViewer) {
    if (this.webViewer && this.webViewerCallbacks) {
      this.webViewer.unsetCallbacks(this.webViewerCallbacks);
    }
    this.webViewer = webViewer;
    if (this.webViewer) {
      const selectionItem = this.webViewer.selectionManager.getLast();
      this.faceSelected = selectionItem !== null && selectionItem.isFaceSelection();
      this.webViewerCallbacks = {
        selectionArray: (events) => {
          if (events.length > 0) {
            const selection = events[events.length - 1];
            const selectionItem2 = selection.getSelection();
            this.faceSelected = selectionItem2 !== null && selectionItem2.isFaceSelection();
          } else {
            this.faceSelected = false;
          }
        }
      };
      this.webViewer.setCallbacks(this.webViewerCallbacks);
    }
  }
  orientToFace() {
    if (!this.webViewer || !this.faceSelected) {
      return;
    }
    const selectionItem = this.webViewer.selectionManager.getLast();
    if (!selectionItem || !selectionItem.isFaceSelection()) {
      return;
    }
    const view = this.webViewer.view;
    const normal = selectionItem.getFaceEntity().getNormal();
    const position = selectionItem.getPosition();
    const camera2 = view.getCamera();
    let up = Point3.cross(normal, new Point3(0, 1, 0));
    if (up.length() < 1e-3) {
      up = Point3.cross(normal, new Point3(1, 0, 0));
    }
    const zoomDelta = camera2.getPosition().subtract(camera2.getTarget()).length();
    camera2.setTarget(position);
    camera2.setPosition(Point3.add(position, Point3.scale(normal, zoomDelta)));
    camera2.setUp(up);
    view.fitBounding(
      selectionItem.getFaceEntity().getBounding(),
      DefaultTransitionDuration,
      camera2
    );
  }
  setProjection(projection) {
    this.cameraService.setProjectionMode(projection);
  }
  setOrientation(viewOrientation) {
    if (this.contextManager && this.contextManager.webViewer) {
      this.contextManager.webViewer.view.setViewOrientation(viewOrientation);
    }
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.cameraService = getService("CameraService");
    this.cameraService.addEventListener("hoops-projection-mode-changed", this.handleServiceUpdate);
    this.cameraService.addEventListener("hoops-camera-service-reset", this.handleServiceUpdate);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    if (this.cameraService) {
      this.cameraService.removeEventListener(
        "hoops-projection-mode-changed",
        this.handleServiceUpdate
      );
      this.cameraService.removeEventListener(
        "hoops-camera-service-reset",
        this.handleServiceUpdate
      );
    }
  }
  /** @internal */
  render() {
    return b`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Camera">${camera}</hoops-icon-button>
      <div class="dropdown-content" slot="dropdown-popup">
        <hoops-button
          .color=${this.cameraService.getProjectionMode() === "Orthographic" ? "accent" : "default"}
          title="Orthographic projection"
          iconSize="sm"
          @click=${() => {
      this.setProjection("Orthographic");
    }}
        >
          <span slot="icon">${orthoView}</span>
          Orthographic Projection
        </hoops-button>
        <hoops-button
          .color=${this.cameraService.getProjectionMode() === "Perspective" ? "accent" : "default"}
          iconSize="sm"
          title="Perspective projection"
          @click=${() => {
      this.setProjection("Perspective");
    }}
        >
          <span slot="icon">${perspectiveView}</span>
          Perspective Projection
        </hoops-button>

        <hoops-separator direction="horizontal"></hoops-separator>

        <hoops-button
          title="Iso view"
          iconSize="sm"
          @click=${() => {
      this.setOrientation(ViewOrientation.Iso);
    }}
        >
          <span slot="icon">${viewIso}</span>
          Iso View
        </hoops-button>

        <hoops-button
          iconSize="sm"
          title="Top view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Top);
    }}
        >
          <span slot="icon">${cubeTop}</span>
          Top View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Bottom view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Bottom);
    }}
        >
          <span slot="icon">${cubeBottom}</span>
          Bottom View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Left view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Left);
    }}
        >
          <span slot="icon">${cubeLeft}</span>
          Left View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Right view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Right);
    }}
        >
          <span slot="icon">${cubeRight}</span>
          Right View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Front view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Front);
    }}
        >
          <span slot="icon">${cubeFront}</span>
          Front View
        </hoops-button>
        <hoops-button
          iconSize="sm"
          title="Back view"
          @click=${() => {
      this.setOrientation(ViewOrientation.Back);
    }}
        >
          <span slot="icon">${cubeBack}</span>
          Back View
        </hoops-button>

        <hoops-button
          title="Orient camera to selected face"
          iconSize="sm"
          ?disabled=${!this.faceSelected}
          @click=${() => {
      this.orientToFace();
    }}
        >
          <span slot="icon">${viewFace}</span>
          Orient to Selected Face
        </hoops-button>
      </div>
    </hoops-dropdown>`;
  }
};
HoopsCameraButtonElement.styles = [
  i$7`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
      }
    `
];
__decorateClass$v([
  n$4()
], HoopsCameraButtonElement.prototype, "dropDownPosition", 2);
__decorateClass$v([
  r$4()
], HoopsCameraButtonElement.prototype, "faceSelected", 2);
__decorateClass$v([
  c$6({ context: contextManagerContext })
], HoopsCameraButtonElement.prototype, "contextManager", 2);
HoopsCameraButtonElement = __decorateClass$v([
  t$2("hoops-toolbar-camera")
], HoopsCameraButtonElement);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* o(o2, f2) {
  if (void 0 !== o2) {
    let i5 = 0;
    for (const t2 of o2) yield f2(t2, i5++);
  }
}
var __defProp$q = Object.defineProperty;
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$q(target, key, result);
  return result;
};
const cameraOperatorIcons = /* @__PURE__ */ new Map([
  [OperatorId.Navigate, { title: "Orbit camera", icon: orbit }],
  [OperatorId.Turntable, { title: "Turntable", icon: cameraTurntable }],
  [OperatorId.WalkMode, { title: "Walk", icon: walk }]
]);
let HoopsCameraOperatorButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.dropDownPosition = "right";
  }
  setCameraOp(cameraOp) {
    if (!this.contextManager || !this.contextManager.webViewer) {
      return;
    }
    this.contextManager.webViewer.view.operatorManager.set(cameraOp, CameraOperatorPosition);
    this.contextManager.refreshCameraOperator();
    if (cameraOp === OperatorId.WalkMode) {
      const fpService = getService("FloorplanService");
      fpService.reset();
    }
  }
  /** @internal */
  render() {
    const currentCameraOperatorIcon = this.webViewerState && cameraOperatorIcons.has(this.webViewerState.topCameraOperator) ? cameraOperatorIcons.get(this.webViewerState.topCameraOperator) : cameraOperatorIcons.get(OperatorId.Navigate);
    return b`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Camera operator - ${currentCameraOperatorIcon == null ? void 0 : currentCameraOperatorIcon.title}"
        >${currentCameraOperatorIcon == null ? void 0 : currentCameraOperatorIcon.icon}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${o(
      cameraOperatorIcons,
      (button) => {
        var _a2;
        return b`
            <hoops-icon-button
              .color=${((_a2 = this.webViewerState) == null ? void 0 : _a2.topCameraOperator) === button[0] ? "accent" : "default"}
              size="sm"
              title=${button[1].title}
              @click=${() => {
          this.setCameraOp(button[0]);
        }}
            >
              ${button[1].icon}
            </hoops-icon-button>
          `;
      }
    )}
      </div>
    </hoops-dropdown>`;
  }
};
HoopsCameraOperatorButtonElement.styles = [
  i$7`
      .dropdown-content {
        display: flex;
        flex-direction: row;
        padding: 0.2rem;
        gap: 0.2rem;
      }
    `
];
__decorateClass$u([
  n$4()
], HoopsCameraOperatorButtonElement.prototype, "dropDownPosition", 2);
__decorateClass$u([
  c$6({ context: contextManagerContext })
], HoopsCameraOperatorButtonElement.prototype, "contextManager", 2);
__decorateClass$u([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsCameraOperatorButtonElement.prototype, "webViewerState", 2);
HoopsCameraOperatorButtonElement = __decorateClass$u([
  t$2("hoops-toolbar-camera-operator")
], HoopsCameraOperatorButtonElement);
var __defProp$p = Object.defineProperty;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$p(target, key, result);
  return result;
};
const drawModeButtons = /* @__PURE__ */ new Map([
  ["Wireframe", { title: "Wireframe", icon: cubeWireframe }],
  ["Shaded", { title: "Shaded", icon: noWireframeShaded }],
  ["WireframeOnShaded", { title: "Wireframe On Shaded", icon: wireframeShaded }],
  ["HiddenLine", { title: "Hidden Line", icon: cubeHiddenLine }],
  ["XRay", { title: "XRay", icon: xRayShader }],
  ["Gooch", { title: "Gooch", icon: goochShader }],
  ["Toon", { title: "Toon", icon: toonShader }]
]);
let HoopsDrawmodeButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.dropDownPosition = "right";
  }
  setDrawMode(drawmode) {
    if (this.contextManager) {
      this.contextManager.setDrawMode(drawmode);
    }
  }
  /** @internal */
  render() {
    const currentDrawMode = this.webViewerState && drawModeButtons.has(this.webViewerState.drawMode) ? this.webViewerState.drawMode : "WireframeOnShaded";
    const currentIcon = drawModeButtons.get(currentDrawMode);
    return b`<hoops-dropdown position=${this.dropDownPosition}>
      <hoops-icon-button size="sm" title="Draw mode - ${currentIcon.title}"
        >${currentIcon.icon}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${o(
      drawModeButtons,
      (button) => {
        var _a2;
        return b`
            <hoops-button
              .color=${((_a2 = this.webViewerState) == null ? void 0 : _a2.drawMode) === button[0] ? "accent" : "default"}
              iconSize="sm"
              @click=${() => {
          this.setDrawMode(button[0]);
        }}
              title=${button[1].title}
            >
              <span slot="icon">${button[1].icon}</span>
              ${button[1].title}
            </hoops-button>
          `;
      }
    )}
      </div>
    </hoops-dropdown>`;
  }
};
HoopsDrawmodeButtonElement.styles = [
  i$7`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
        padding: 0.2rem 0;
      }
    `
];
__decorateClass$t([
  n$4()
], HoopsDrawmodeButtonElement.prototype, "dropDownPosition", 2);
__decorateClass$t([
  c$6({ context: contextManagerContext })
], HoopsDrawmodeButtonElement.prototype, "contextManager", 2);
__decorateClass$t([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsDrawmodeButtonElement.prototype, "webViewerState", 2);
HoopsDrawmodeButtonElement = __decorateClass$t([
  t$2("hoops-toolbar-drawmode")
], HoopsDrawmodeButtonElement);
var __defProp$o = Object.defineProperty;
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$o(target, key, result);
  return result;
};
let HoopsHomeButtonElement = class extends i$3 {
  action() {
    if (this.contextManager) {
      this.contextManager.reset();
    }
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Home" @click=${this.action}
      >${home}</hoops-icon-button
    >`;
  }
};
__decorateClass$s([
  c$6({ context: contextManagerContext })
], HoopsHomeButtonElement.prototype, "contextManager", 2);
HoopsHomeButtonElement = __decorateClass$s([
  t$2("hoops-toolbar-home")
], HoopsHomeButtonElement);
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$n(target, key, result);
  return result;
};
let HoopsLayersButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle layers" .color=${this.color}
      >${layers}</hoops-icon-button
    >`;
  }
};
__decorateClass$r([
  n$4()
], HoopsLayersButtonElement.prototype, "color", 2);
HoopsLayersButtonElement = __decorateClass$r([
  t$2("hoops-toolbar-layers")
], HoopsLayersButtonElement);
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$m(target, key, result);
  return result;
};
let HoopsViewsButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle views" .color=${this.color}
      >${viewIcon}</hoops-icon-button
    >`;
  }
};
__decorateClass$q([
  n$4()
], HoopsViewsButtonElement.prototype, "color", 2);
HoopsViewsButtonElement = __decorateClass$q([
  t$2("hoops-toolbar-views")
], HoopsViewsButtonElement);
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$l(target, key, result);
  return result;
};
let HoopsTypesButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle types" .color=${this.color}
      >${typesIcon}</hoops-icon-button
    >`;
  }
};
__decorateClass$p([
  n$4()
], HoopsTypesButtonElement.prototype, "color", 2);
HoopsTypesButtonElement = __decorateClass$p([
  t$2("hoops-toolbar-types")
], HoopsTypesButtonElement);
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$k(target, key, result);
  return result;
};
let HoopsModelTreeButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle model tree" .color=${this.color}
      >${modelTree}</hoops-icon-button
    >`;
  }
};
__decorateClass$o([
  n$4()
], HoopsModelTreeButtonElement.prototype, "color", 2);
HoopsModelTreeButtonElement = __decorateClass$o([
  t$2("hoops-toolbar-model-tree")
], HoopsModelTreeButtonElement);
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$j(target, key, result);
  return result;
};
let HoopsPropertiesButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button title="Toggle properties" .color=${this.color}
      >${search}</hoops-icon-button
    >`;
  }
};
__decorateClass$n([
  n$4()
], HoopsPropertiesButtonElement.prototype, "color", 2);
HoopsPropertiesButtonElement = __decorateClass$n([
  t$2("hoops-toolbar-properties")
], HoopsPropertiesButtonElement);
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsSnapshotButtonElement = class extends i$3 {
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Take snapshot"
      >${snapshot}</hoops-icon-button
    >`;
  }
};
HoopsSnapshotButtonElement = __decorateClass$m([
  t$2("hoops-toolbar-snapshot")
], HoopsSnapshotButtonElement);
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
let HoopsExplodeButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.dropDownPosition = "right";
    this.webViewer = null;
    this.handleServiceUpdate = () => this.requestUpdate();
  }
  /** @internal */
  connectedCallback() {
    super.connectedCallback();
    this.explodeService = getService("ExplodeService");
    this.explodeService.addEventListener("hoops-explode-service-reset", this.handleServiceUpdate);
    this.explodeService.addEventListener(
      "hoops-explode-magnitude-changed",
      this.handleServiceUpdate
    );
  }
  /** @internal */
  disconnectedCallback() {
    if (this.explodeService) {
      this.explodeService.removeEventListener(
        "hoops-explode-service-reset",
        this.handleServiceUpdate
      );
      this.explodeService.removeEventListener(
        "hoops-explode-magnitude-changed",
        this.handleServiceUpdate
      );
    }
  }
  async handleExplodeChange(e3) {
    if (!this.webViewer) {
      return;
    }
    if (!this.explodeService.getActive()) {
      const modelBounding = await this.webViewer.model.getModelBounding(true, true);
      const explodeCenter = modelBounding.center();
      const explodeNodes = void 0;
      await this.explodeService.start(explodeNodes, explodeCenter);
    }
    const inputValue = e3.target.value;
    const magnitude = parseFloat(inputValue);
    this.explodeService.setMagnitude(magnitude);
  }
  /** @internal */
  render() {
    return b` <hoops-dropdown position=${this.dropDownPosition} preventCloseOnClickInside>
      <hoops-icon-button size="sm" title="Explode">${explode}</hoops-icon-button>
      <div class="dropdown-content" slot="dropdown-popup">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value="${this.explodeService.getMagnitude()}"
          @input=${this.handleExplodeChange}
        />
      </div>
    </hoops-dropdown>`;
  }
};
__decorateClass$l([
  n$4()
], HoopsExplodeButtonElement.prototype, "dropDownPosition", 2);
__decorateClass$l([
  n$4({ type: Object })
], HoopsExplodeButtonElement.prototype, "webViewer", 2);
HoopsExplodeButtonElement = __decorateClass$l([
  t$2("hoops-toolbar-explode")
], HoopsExplodeButtonElement);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
const redlineButtons = /* @__PURE__ */ new Map([
  [OperatorId.RedlineCircle, { title: "Circle", icon: redlineCircle }],
  [OperatorId.RedlineText, { title: "Text", icon: redlineNote }],
  [OperatorId.RedlineRectangle, { title: "Rectangle", icon: redlineRectangle }],
  [OperatorId.RedlinePolyline, { title: "Free hand", icon: redlineFreehand }]
]);
let HoopsRedlinesButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.handleKeyDown = (event) => {
      if (event.key === "Escape") {
        this.setRedlineMode(OperatorId.Select);
      }
    };
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleKeyDown);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    window.removeEventListener("keydown", this.handleKeyDown);
    super.disconnectedCallback();
  }
  setRedlineMode(redlineOperatorId) {
    if (this.contextManager) {
      this.contextManager.setRedlineOperator(redlineOperatorId);
    } else {
      console.error("Cannot set redline mode: WebViewer not initialized");
    }
  }
  /** @internal */
  render() {
    var _a2, _b;
    let redlineMode = this.webViewerState && redlineButtons.has(this.webViewerState.toolOperator) ? this.webViewerState.toolOperator : OperatorId.RedlineText;
    if (!redlineButtons.has(redlineMode)) {
      redlineMode = OperatorId.RedlineText;
    }
    const currentIcon = (_a2 = redlineButtons.get(redlineMode)) == null ? void 0 : _a2.icon;
    const iconButtonClasses = [((_b = this.contextManager) == null ? void 0 : _b.isRedlineOperatorActive()) ? "active" : ""].join(
      " "
    );
    return b`<hoops-dropdown position="right">
      <hoops-icon-button class="${iconButtonClasses}" size="sm" title="Redline markups"
        >${currentIcon}</hoops-icon-button
      >
      <div class="dropdown-content" slot="dropdown-popup">
        ${o(
      redlineButtons,
      (button) => b`
            <hoops-button
              iconSize="sm"
              @click=${() => {
        this.setRedlineMode(button[0]);
      }}
              title=${button[1].title}
            >
              <span slot="icon">${button[1].icon}</span>
              ${button[1].title}
            </hoops-button>
          `
    )}
      </div>
    </hoops-dropdown>`;
  }
};
HoopsRedlinesButtonElement.styles = [
  i$7`
      .dropdown-content {
        display: flex;
        flex-direction: column;
        width: max-content;
        padding: 0.2rem 0;
      }

      .active {
        background-color: var(--hoops-neutral-background-hover, #303030cc);
        border-radius: 50%;
      }
    `
];
__decorateClass$k([
  c$6({ context: contextManagerContext })
], HoopsRedlinesButtonElement.prototype, "contextManager", 2);
__decorateClass$k([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsRedlinesButtonElement.prototype, "webViewerState", 2);
HoopsRedlinesButtonElement = __decorateClass$k([
  t$2("hoops-toolbar-redlines")
], HoopsRedlinesButtonElement);
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
let HoopsToolsButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Open tools panel" .color=${this.color}
      >${toolsIcon}</hoops-icon-button
    >`;
  }
};
__decorateClass$j([
  n$4()
], HoopsToolsButtonElement.prototype, "color", 2);
HoopsToolsButtonElement = __decorateClass$j([
  t$2("hoops-toolbar-tools")
], HoopsToolsButtonElement);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
let HoopsSettingsButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle settings panel" .color=${this.color}
      >${settings}</hoops-icon-button
    >`;
  }
};
__decorateClass$i([
  n$4()
], HoopsSettingsButtonElement.prototype, "color", 2);
HoopsSettingsButtonElement = __decorateClass$i([
  t$2("hoops-toolbar-settings")
], HoopsSettingsButtonElement);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
let HoopsSheetsButtonElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.color = "default";
  }
  /** @internal */
  render() {
    return b`<hoops-icon-button size="sm" title="Toggle sheets" .color=${this.color}
      >${sheetsIcon}</hoops-icon-button
    >`;
  }
};
__decorateClass$h([
  n$4()
], HoopsSheetsButtonElement.prototype, "color", 2);
HoopsSheetsButtonElement = __decorateClass$h([
  t$2("hoops-toolbar-sheets")
], HoopsSheetsButtonElement);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
let HoopsToolsGroupElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  /** @internal */
  render() {
    return b`
      <hoops-accordion>
        <div class="label" slot="header">${this.label}</div>
        <div class="toolbar" slot="toolbar">
          <slot name="toolbar"></slot>
        </div>
        <div class="content" slot="content">
          <slot></slot>
        </div>
      </hoops-accordion>
    `;
  }
};
HoopsToolsGroupElement.styles = i$7`
    :host {
      display: block;
    }
  `;
__decorateClass$g([
  n$4({ type: String })
], HoopsToolsGroupElement.prototype, "label", 2);
HoopsToolsGroupElement = __decorateClass$g([
  t$2("hoops-tools-group")
], HoopsToolsGroupElement);
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
let HoopsToolsGroupMarkupElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.onMarkupsUpdated = () => {
      this.requestUpdate();
    };
  }
  setActiveTool(operator) {
    if (!this.contextManager) {
      console.error("Cannot set markup tool: WebViewer not initialized");
      return;
    }
    this.contextManager.activeToolOperator = operator;
  }
  /**
   * @internal
   */
  firstUpdated() {
    if (!this.contextManager) {
      console.error("Cannot initialize redline tools: WebViewer not initialized");
      return;
    }
    this.service = getService("NoteTextService");
    if (!this.service) {
      return;
    }
    this.service.addEventListener("hoops-note-text-created", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-note-text-deleted", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-note-text-updated", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-note-text-hidden", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-note-text-shown", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-note-text-manager-reset", this.onMarkupsUpdated);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.service) {
      return;
    }
    this.service.removeEventListener("hoops-note-text-created", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-note-text-deleted", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-note-text-updated", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-note-text-hidden", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-note-text-shown", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-note-text-manager-reset", this.onMarkupsUpdated);
  }
  selectMarkup(id) {
    if (!this.service) {
      console.error("Cannot select markup: NoteTextService not initialized");
      return;
    }
    this.service.setActiveNoteText(id);
  }
  /** @internal */
  render() {
    var _a2;
    const service = getService("NoteTextService");
    const markups = (service == null ? void 0 : service.getNoteTexts()) || [];
    const selectedMarkupId = service == null ? void 0 : service.getActiveNoteTextKey();
    return b`
      <hoops-tools-group label="Markup">
        <div class="content">
          <div class="tools">
            <hoops-icon-button
              color=${((_a2 = this.webViewerState) == null ? void 0 : _a2.toolOperator) === OperatorId.Note ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(OperatorId.Note);
    }}
              title="Note"
            >
              ${note}
            </hoops-icon-button>
          </div>
          <div class="markups">
            ${markups.length ? markups.map(
      (markup) => b`
                    <div
                      class=${["markup", markup.id === selectedMarkupId ? "selected" : ""].join(
        " "
      )}
                      @click=${() => this.selectMarkup(markup.id)}
                    >
                      <div class="markupIcon">
                        <hoops-icon icon=${formatNoteTextIcon(markup.type)}></hoops-icon>
                      </div>
                      <div class="markupText">
                        ${markup.text || b`<div class="placeholder">No text</div>`}
                      </div>
                      <hoops-icon-button
                        class="remove"
                        @click=${(event) => {
        event.stopPropagation();
        service == null ? void 0 : service.removeNoteText(markup);
      }}
                        >${removeIcon}</hoops-icon-button
                      >
                    </div>
                  `
    ) : b`<div class="placeholder">No markups</div>`}
          </div>
        </div>
      </hoops-tools-group>
    `;
  }
};
HoopsToolsGroupMarkupElement.styles = i$7`
    :host {
      display: block;
    }

    .content {
      padding: 0.5rem;
    }

    .tools {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .markups {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;

      border-radius: 0.25rem;
      border: 1px solid var(--hoops-foreground, #303030);
      background-color: var(--hoops-neutral-background-20, #fafafa);
      max-height: 10rem;
      overflow-y: auto;
    }

    .markup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px dashed var(--hoops-foreground, #303030);
    }

    .markup.selected {
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-accent-foreground-active, var(--blue, #0078d4)) 10%
      );
    }

    .markupIcon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .markupText {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 5rem);
    }

    .markup:hover,
    .markup:hover .markupIcon {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-foreground, #303030) 5%
      );
    }

    .remove {
      justify-self: flex-end;
    }

    .markup.selected .markupIcon,
    .markup.selected .remove svg {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hoops-foreground, #303030);
      opacity: 0.5;
      font-size: 0.875rem;
      font-weight: 500;
    }
  `;
__decorateClass$f([
  c$6({ context: contextManagerContext })
], HoopsToolsGroupMarkupElement.prototype, "contextManager", 2);
__decorateClass$f([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsToolsGroupMarkupElement.prototype, "webViewerState", 2);
HoopsToolsGroupMarkupElement = __decorateClass$f([
  t$2("hoops-tools-markup-group")
], HoopsToolsGroupMarkupElement);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
let HoopsToolsMeasurementItemElement = class extends i$3 {
  getMeasureMarkupLabel(markup) {
    if (markup instanceof MeasurePointPointDistanceMarkup) {
      return "Point to Point";
    } else if (markup instanceof MeasureFaceFaceDistanceMarkup) {
      return "Face to Face";
    } else if (markup instanceof MeasureStraightEdgeLengthMarkup) {
      return "Edge Length";
    } else if (markup instanceof MeasureCircleEdgeLengthMarkup) {
      return "Circle Length";
    } else if (markup instanceof MeasureFaceFaceAngleMarkup) {
      return "Face Angle";
    }
    return "Measurement";
  }
  getMeasureMarkupIcon(markup) {
    if (markup instanceof MeasurePointPointDistanceMarkup) {
      return b`<hoops-icon title="Point to Point" icon="measurePoint"></hoops-icon>`;
    } else if (markup instanceof MeasureFaceFaceDistanceMarkup) {
      return b`<hoops-icon title="Face to Face" icon="measureDistance"></hoops-icon>`;
    } else if (markup instanceof MeasureStraightEdgeLengthMarkup) {
      return b`<hoops-icon title="Straight Edge Length" icon="measureEdge"></hoops-icon>`;
    } else if (markup instanceof MeasureCircleEdgeLengthMarkup) {
      return b`<hoops-icon title="Circle Edge Length" icon="measureEdge"></hoops-icon>`;
    } else if (markup instanceof MeasureFaceFaceAngleMarkup) {
      return b`<hoops-icon title="Face to Face Angle" icon="measureAngle"></hoops-icon>`;
    }
    return b``;
  }
  getMeasureMarkupValue(markup) {
    try {
      return markup.getMeasurementText();
    } catch (error) {
      console.error("Error getting measurement value:", error);
      return "N/A";
    }
  }
  dispatchRemoval(measurement) {
    this.dispatchEvent(
      new CustomEvent("hoops-measurement-remove-command", {
        detail: { measurement },
        composed: true,
        bubbles: true
      })
    );
  }
  /** @internal */
  render() {
    if (!this.measurement) {
      return A;
    }
    const measurementType = this.getMeasureMarkupLabel(this.measurement);
    const measurementValue = this.getMeasureMarkupValue(this.measurement);
    const tooltipText = `${measurementType}: ${measurementValue}`;
    return b`
      <div class="measure-container" title="${tooltipText}">
        ${this.getMeasureMarkupIcon(this.measurement)}
        <span class="measure-label">${measurementValue}</span>
      </div>
      <hoops-icon-button
        class="trash-button"
        color="default"
        title="Remove Measurement"
        @click=${() => {
      if (this.measurement) {
        this.dispatchRemoval(this.measurement);
      }
    }}
        style="--hoops-icon-color: var(--hoops-svg-stroke-color, #303030);"
      >
        ${removeIcon}
      </hoops-icon-button>
    `;
  }
};
HoopsToolsMeasurementItemElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem;
        width: 100%;
        transition: background-color 0.15s ease;
        border-radius: 0.25rem;
        min-height: 1.8rem;
        border-bottom: 1px dashed var(--hoops-foreground, #303030);
      }
      .measure-container {
        display: flex;
        align-items: center;
        flex-grow: 1;
        min-width: 0;
      }
      .measure-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        font-size: 0.875rem;
        color: var(--hoops-neutral-foreground, #303030);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
      }
      .trash-button {
        flex-shrink: 0;
      }
      hoops-icon {
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
        color: var(--hoops-svg-stroke-color, #303030);
      }
    `
];
__decorateClass$e([
  n$4({ attribute: false })
], HoopsToolsMeasurementItemElement.prototype, "measurement", 2);
HoopsToolsMeasurementItemElement = __decorateClass$e([
  t$2("hoops-tools-measurement-item")
], HoopsToolsMeasurementItemElement);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
let HoopsToolsMeasurementActionsElement = class extends i$3 {
  selectMeasurementTool(operator) {
    this.dispatchEvent(
      new CustomEvent("measurement-tool-selected", {
        detail: { operator }
      })
    );
  }
  /** @internal */
  render() {
    return b`
      <hoops-icon-button
        color=${this.activeToolOperator === OperatorId.MeasurePointPointDistance ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, OperatorId.MeasurePointPointDistance)}"
        title="Measure Point to Point"
      >
        ${measurePoint}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === OperatorId.MeasureFaceFaceDistance ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, OperatorId.MeasureFaceFaceDistance)}"
        title="Measure Distance Between Faces"
      >
        ${measureDistance}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === OperatorId.MeasureFaceFaceAngle ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, OperatorId.MeasureFaceFaceAngle)}"
        title="Measure Angle Between Faces"
      >
        ${measureAngle}
      </hoops-icon-button>
      <hoops-icon-button
        color=${this.activeToolOperator === OperatorId.MeasureEdgeLength ? "accent" : "default"}
        @click="${this.selectMeasurementTool.bind(this, OperatorId.MeasureEdgeLength)}"
        title="Measure Edges"
      >
        ${measureEdge}
      </hoops-icon-button>
    `;
  }
};
HoopsToolsMeasurementActionsElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        border: none;
      }
    `
];
__decorateClass$d([
  n$4({ type: Number })
], HoopsToolsMeasurementActionsElement.prototype, "activeToolOperator", 2);
HoopsToolsMeasurementActionsElement = __decorateClass$d([
  t$2("hoops-tools-measurement-actions")
], HoopsToolsMeasurementActionsElement);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let HoopsToolsMeasurementGroupElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.handleMeasurementUpdate = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback();
    this.service = getService("MeasurementService");
    this.service.addEventListener("hoops-measurement-updated", this.handleMeasurementUpdate);
  }
  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Cleans up event listeners to prevent memory leaks.
   *
   * @override
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.removeEventListener("hoops-measurement-updated", this.handleMeasurementUpdate);
  }
  /**
   * Handles measurement tool selection events.
   * Sets the active tool operator in the context manager when a measurement tool is selected.
   *
   * @param {MeasurementToolSelectedEvent} event - The measurement tool selection event
   * @returns {void}
   */
  handleMeasurementToolSelection(event) {
    var _a2;
    if (!((_a2 = this.contextManager) == null ? void 0 : _a2.webViewer)) {
      return;
    }
    const { operator } = event.detail;
    this.contextManager.activeToolOperator = operator;
  }
  /**
   * Handles measurement removal commands.
   * Removes the specified measurement from the measurement service.
   *
   * @param {MeasurementRemoveCommand} event - The measurement remove command event
   * @returns {void}
   */
  handleMeasurementRemoveCommand(event) {
    const { measurement } = event.detail;
    this.service.removeMeasurement(measurement);
  }
  /** @internal */
  render() {
    var _a2;
    const hasMeasurements = this.service.measurements.length > 0;
    return b`
      <hoops-tools-group label="Measurement">
        <hoops-tools-measurement-actions
          activeToolOperator=${(_a2 = this.webviewerState) == null ? void 0 : _a2.toolOperator}
          @measurement-tool-selected=${this.handleMeasurementToolSelection}
        ></hoops-tools-measurement-actions>
        <div class="measurement-list">
          ${hasMeasurements ? this.service.measurements.map(
      (m2) => b`<hoops-tools-measurement-item
                    @hoops-measurement-remove-command=${this.handleMeasurementRemoveCommand}
                    .measurement=${m2}
                  ></hoops-tools-measurement-item>`
    ) : b`<div class="empty-state">No measurements</div>`}
        </div>
      </hoops-tools-group>
    `;
  }
};
HoopsToolsMeasurementGroupElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        display: block;
      }

      .measurement-list {
        margin: 0.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        border: 1px solid var(--hoops-foreground, #303030);
        border-radius: 0.25rem;
        scrollbar-width: thin;
        scrollbar-color: var(--hoops-neutral-foreground-20, #aaaaaa) transparent;
        background-color: var(--hoops-neutral-background-20, #fafafa);
        padding: 0.5rem;
      }

      .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0.5;
        font-size: 0.875rem;
        font-weight: 500;
      }
    `
];
__decorateClass$c([
  c$6({
    context: contextManagerContext,
    subscribe: true
  })
], HoopsToolsMeasurementGroupElement.prototype, "contextManager", 2);
__decorateClass$c([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsToolsMeasurementGroupElement.prototype, "webviewerState", 2);
HoopsToolsMeasurementGroupElement = __decorateClass$c([
  t$2("hoops-tools-measurement-group")
], HoopsToolsMeasurementGroupElement);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let HoopsToolsSelectGroupElement = class extends i$3 {
  setActiveTool(operator) {
    if (this.contextManager) {
      this.contextManager.activeToolOperator = operator;
    } else {
      console.error("Cannot set select tool: WebViewer not initialized");
    }
  }
  /** @internal */
  render() {
    var _a2, _b;
    return b`
      <hoops-tools-group label="Selection">
        <div class="content">
          <hoops-icon-button
            color=${((_a2 = this.webViewerState) == null ? void 0 : _a2.toolOperator) === OperatorId.Select ? "accent" : "default"}
            @click=${() => {
      this.setActiveTool(OperatorId.Select);
    }}
            title="Select Parts"
          >
            ${select}
          </hoops-icon-button>
          <hoops-icon-button
            color=${((_b = this.webViewerState) == null ? void 0 : _b.toolOperator) === OperatorId.AreaSelect ? "accent" : "default"}
            @click=${() => {
      this.setActiveTool(OperatorId.AreaSelect);
    }}
            title="Select Area"
          >
            ${areaSelect}
          </hoops-icon-button>
        </div>
      </hoops-tools-group>
    `;
  }
};
HoopsToolsSelectGroupElement.styles = i$7`
    :host {
      display: block;
    }

    .content {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }
  `;
__decorateClass$b([
  c$6({ context: contextManagerContext })
], HoopsToolsSelectGroupElement.prototype, "contextManager", 2);
__decorateClass$b([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsToolsSelectGroupElement.prototype, "webViewerState", 2);
HoopsToolsSelectGroupElement = __decorateClass$b([
  t$2("hoops-tools-select-group")
], HoopsToolsSelectGroupElement);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let HoopsToolsRedlineGroupElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.onMarkupsUpdated = () => {
      this.requestUpdate();
    };
  }
  setActiveTool(operator) {
    if (this.contextManager) {
      this.contextManager.activeToolOperator = operator;
    } else {
      console.error("Cannot set redline tool: WebViewer not initialized");
    }
  }
  /**
   * @internal
   */
  firstUpdated() {
    if (!this.contextManager) {
      console.error("Cannot initialize redline tools: WebViewer not initialized");
      return;
    }
    this.service = getService("RedlineService");
    if (!this.service) {
      return;
    }
    this.service.addEventListener("hoops-redline-created", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-redline-deleted", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-redline-view-deleted", this.onMarkupsUpdated);
    this.service.addEventListener("hoops-markup-manager-reset", this.onMarkupsUpdated);
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.service) {
      return;
    }
    this.service.removeEventListener("hoops-redline-created", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-redline-deleted", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-redline-view-deleted", this.onMarkupsUpdated);
    this.service.removeEventListener("hoops-markup-manager-reset", this.onMarkupsUpdated);
  }
  /** @internal */
  render() {
    var _a2, _b, _c, _d, _e;
    return b`
      <hoops-tools-group label="Redline">
        <div class="content">
          <div class="tools">
            <hoops-icon-button
              color=${((_a2 = this.webViewerState) == null ? void 0 : _a2.toolOperator) === OperatorId.RedlineCircle ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(OperatorId.RedlineCircle);
    }}
              title="Redline Circle"
            >
              ${redlineCircle}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((_b = this.webViewerState) == null ? void 0 : _b.toolOperator) === OperatorId.RedlineText ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(OperatorId.RedlineText);
    }}
              title="Redline Note"
            >
              ${redlineNote}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((_c = this.webViewerState) == null ? void 0 : _c.toolOperator) === OperatorId.RedlineRectangle ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(OperatorId.RedlineRectangle);
    }}
              title="Redline Rectangle"
            >
              ${redlineRectangle}
            </hoops-icon-button>
            <hoops-icon-button
              color=${((_d = this.webViewerState) == null ? void 0 : _d.toolOperator) === OperatorId.RedlinePolyline ? "accent" : "default"}
              @click=${() => {
      this.setActiveTool(OperatorId.RedlinePolyline);
    }}
              title="Redline Freehand"
            >
              ${redlineFreehand}
            </hoops-icon-button>
          </div>
          <div class="markups">
            ${!((_e = this.service) == null ? void 0 : _e.getRedlineViewKeys().length) ? b`<div class="placeholder">No Redlines</div>` : b`<hoops-markup-tree .redlineService=${this.service}></hoops-markup-tree>`}
          </div>
        </div>
      </hoops-tools-group>
    `;
  }
};
HoopsToolsRedlineGroupElement.styles = i$7`
    :host {
      display: block;
    }

    .content {
      padding: 0.5rem;
    }

    .tools {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .markups {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;

      border-radius: 0.25rem;
      border: 1px solid var(--hoops-foreground, #303030);
      background-color: var(--hoops-neutral-background-20, #fafafa);
      max-height: 10rem;
      overflow-y: auto;
    }

    .markup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px dashed var(--hoops-foreground, #303030);
    }

    .markup.selected {
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-accent-foreground-active, var(--blue, #0078d4)) 10%
      );
    }

    .markupIcon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .markupText {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 5rem);
    }

    .markup:hover,
    .markup:hover .markupIcon {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-foreground, #303030) 5%
      );
    }

    .remove {
      justify-self: flex-end;
    }

    .markup.selected .markupIcon,
    .markup.selected .remove svg {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hoops-foreground, #303030);
      opacity: 0.5;
      font-size: 0.875rem;
      font-weight: 500;
    }

    hoops-markup-tree {
      overflow-y: auto;
      overflow-x: hidden;
    }
  `;
__decorateClass$a([
  c$6({ context: contextManagerContext })
], HoopsToolsRedlineGroupElement.prototype, "contextManager", 2);
__decorateClass$a([
  c$6({ context: webViewerStateContext, subscribe: true })
], HoopsToolsRedlineGroupElement.prototype, "webViewerState", 2);
HoopsToolsRedlineGroupElement = __decorateClass$a([
  t$2("hoops-tools-redline-group")
], HoopsToolsRedlineGroupElement);
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsToolsPanelElement = class extends i$3 {
  /** @internal */
  render() {
    return b`
      <div class="hoops-tools-panel">
        <hoops-tools-select-group></hoops-tools-select-group>
        <hoops-tools-measurement-group></hoops-tools-measurement-group>
        <hoops-tools-redline-group></hoops-tools-redline-group>
        <hoops-tools-markup-group></hoops-tools-markup-group>
        <slot></slot>
      </div>
    `;
  }
};
HoopsToolsPanelElement.styles = i$7`
    :host {
      display: block;
    }

    .hoops-tools-panel {
      display: flex;
      flex-direction: column;
    }

    .tools-group {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border: none;
      border-bottom: 1px solid var(--hoops-neutral-border, #303030);
    }
  `;
HoopsToolsPanelElement = __decorateClass$9([
  t$2("hoops-tools-panel")
], HoopsToolsPanelElement);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let ViewTreeNode = class extends i$3 {
  constructor() {
    super(...arguments);
    this.nodeId = Number.NaN;
    this.nodeName = "";
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.nodeId)) {
      return A;
    }
    return b`<div class="view-tree-node">
      <div class="content">
        <div class="title">${this.nodeName}</div>
      </div>
    </div>`;
  }
};
ViewTreeNode.styles = [
  componentBaseStyle,
  i$7`
      .view-tree-node,
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .view-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content,
      .type-icon svg {
        width: 100%;
        height: 100%;
      }

      .content .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .content:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .title {
        width: 100%;
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
__decorateClass$8([
  n$4({ type: Number })
], ViewTreeNode.prototype, "nodeId", 2);
__decorateClass$8([
  n$4({ type: String })
], ViewTreeNode.prototype, "nodeName", 2);
ViewTreeNode = __decorateClass$8([
  t$2("hoops-view-tree-node")
], ViewTreeNode);
function defaultNodeFactory$1(treeContext2, model, nodeId, selected, nodeData) {
  let visible = true;
  if ("getNodeVisibility" in model) {
    const hwvModel = model;
    visible = hwvModel.getNodeVisibility(nodeId);
  }
  const viewAdapter = treeContext2;
  const data = nodeData ?? {
    visible
  };
  if (!nodeData) {
    viewAdapter.nodesData[nodeId] = data;
  }
  return b`<hoops-view-tree-node
    nodeId=${nodeId}
    nodeName=${viewAdapter.getNodeName(nodeId) ?? "N/A"}
    ?selected=${selected}
  >
  </hoops-view-tree-node>`;
}
class ViewAdapter {
  constructor() {
    this.nodeFactory = defaultNodeFactory$1;
    this.nodesData = {};
    this.expandedIcon = b`${downIcon}`;
    this.collapsedIcon = b`${rightIcon}`;
    this.rootNodeName = "Views";
    this.combineStateViewsNodeName = "Combine state views";
    this.annotationViewsNodeName = "Annotation views";
    this.standardViewsNodeName = "Standard views";
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    return 0;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(nodeId) {
    var _a2;
    const allViews = (_a2 = this.model) == null ? void 0 : _a2.getCadViewMap();
    switch (nodeId) {
      case 0:
        return [
          1,
          2,
          3
          /* StandardViewsNode */
        ];
      case 1: {
        return Array.from((allViews == null ? void 0 : allViews.keys()) || []).filter(
          (cadViewId) => {
            var _a3, _b;
            return ((_a3 = this.model) == null ? void 0 : _a3.isCombineStateView(cadViewId)) && !((_b = this.model) == null ? void 0 : _b.isAnnotationView(cadViewId));
          }
        );
      }
      case 2: {
        return Array.from((allViews == null ? void 0 : allViews.keys()) || []).filter(
          (cadViewId) => {
            var _a3;
            return (_a3 = this.model) == null ? void 0 : _a3.isAnnotationView(cadViewId);
          }
        );
      }
      case 3: {
        return Array.from((allViews == null ? void 0 : allViews.keys()) || []).filter(
          (cadViewId) => {
            var _a3, _b;
            return !((_a3 = this.model) == null ? void 0 : _a3.isAnnotationView(cadViewId)) && !((_b = this.model) == null ? void 0 : _b.isCombineStateView(cadViewId));
          }
        );
      }
      default:
        return [];
    }
  }
  /**
   * Returns the name of a node in the view tree
   * @param nodeId The view tree-specific node id
   */
  getNodeName(nodeId) {
    switch (nodeId) {
      case 0:
        return this.rootNodeName;
      case 1:
        return this.combineStateViewsNodeName;
      case 2:
        return this.annotationViewsNodeName;
      case 3:
        return this.standardViewsNodeName;
      default:
        return this.getViewName(nodeId);
    }
  }
  /**
   * Return the CAD view name for a given CAD view id
   * @param cadViewId
   * @returns
   */
  getViewName(cadViewId) {
    var _a2, _b;
    const cadViewName = (_b = (_a2 = this.model) == null ? void 0 : _a2.getCadViewMap()) == null ? void 0 : _b.get(cadViewId);
    return (cadViewName == null ? void 0 : cadViewName.replace(/ # Annotation View$/, "")) ?? "Unnamed view";
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(_2, id, selected, nodeData) {
    if (!this.model) {
      return A;
    }
    return this.nodeFactory(this, this.model, id, selected, nodeData);
  }
}
var ViewTreeNodeId = /* @__PURE__ */ ((ViewTreeNodeId2) => {
  ViewTreeNodeId2[ViewTreeNodeId2["RootNode"] = 0] = "RootNode";
  ViewTreeNodeId2[ViewTreeNodeId2["CombineStateViewsNode"] = 1] = "CombineStateViewsNode";
  ViewTreeNodeId2[ViewTreeNodeId2["AnnotationViewsNode"] = 2] = "AnnotationViewsNode";
  ViewTreeNodeId2[ViewTreeNodeId2["StandardViewsNode"] = 3] = "StandardViewsNode";
  return ViewTreeNodeId2;
})(ViewTreeNodeId || {});
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsViewTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.treeRef = e2();
  }
  /**
   * Gets the internal tree component element.
   * Provides access to the underlying tree functionality.
   * @returns {Tree | undefined} The tree element instance or undefined if not initialized
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets the currently selected view nodes.
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var _a2;
    return ((_a2 = this.treeElement) == null ? void 0 : _a2.selected) ?? [];
  }
  /**
   * Sets the currently selected view nodes.
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When setting selected nodes before tree initialization
   */
  set selected(value) {
    if (!this.treeElement) {
      throw new Error(`HoopsViewTree.selected [set]: Tree element is not set.`);
    }
    this.treeElement.selected = value;
  }
  /**
   * The IModel interface that represents the Model.
   *
   * This is a syntactic sugar to access HoopsViewTree.viewAdapter.model.
   * If the ViewAdapter is not set it returns an undefined.
   *
   * Reassigning the model will trigger an update.
   *
   * Trying to set the model while the viewAdapter is not set would result in
   * an error being thrown.
   *
   * This should not happen in a normal use case since the viewAdapter is added
   * to the view tree at initialization.
   *
   * @return {(IModel | undefined)} The current model instance or undefined
   */
  get model() {
    var _a2;
    return (_a2 = this.viewAdapter) == null ? void 0 : _a2.model;
  }
  /**
   * Sets the model instance for view data.
   * Setting a new model will refresh the tree view.
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When setting model before view adapter initialization
   */
  set model(model) {
    const viewAdapter = this.viewAdapter;
    if (!viewAdapter) {
      throw new Error(`HoopsViewTree.model [set]: ViewAdapter is not set.`);
    }
    viewAdapter.model = model;
    this.viewAdapter = viewAdapter;
    this.resetTree();
  }
  /**
   * Gets the view adapter that manages tree data and operations.
   * @returns {ViewAdapter | undefined} The current view adapter or undefined
   */
  get viewAdapter() {
    var _a2;
    return (_a2 = this.treeElement) == null ? void 0 : _a2.tree.context;
  }
  /**
   * Sets the view adapter that manages tree data and operations.
   * The adapter handles communication between the tree component and the model.
   * @param value - The view adapter to set
   * @returns {void}
   * @throws {Error} When setting adapter before tree initialization
   */
  set viewAdapter(value) {
    if (!this.treeElement) {
      throw new Error(`HoopsViewTree.viewAdapter [set]: Tree element is not set.`);
    }
    this.treeElement.tree = { context: value };
  }
  /**
   * Selects or deselects view nodes in the tree.
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When tree element is not initialized
   */
  selectNodes(nodeIds, selected) {
    if (!this.treeElement) {
      throw new Error(`HoopsViewTree.selectNodes: Tree element is not set.`);
    }
    let selection = this.treeElement.selected;
    if (!selected) {
      selection = selection.filter((current) => !nodeIds.includes(current));
    } else {
      selection = nodeIds;
    }
    this.treeElement.selected = selection;
  }
  /**
   * Retrieves custom data associated with a view node.
   * @param nodeId - The ID of the node to get data from
   * @returns {T} The custom data stored for the node
   * @throws {Error} When view adapter is not initialized
   */
  getNodeData(nodeId) {
    const viewAdapter = this.viewAdapter;
    if (!viewAdapter) {
      throw new Error(`HoopsViewTree.setNodeData [set]: ViewAdapter is not set.`);
    }
    return viewAdapter.nodesData[nodeId];
  }
  /**
   * Sets custom data for a view node, replacing any existing data.
   * @param nodeId - The ID of the node to store data for
   * @param data - The data to store with the node
   * @returns {void}
   * @throws {Error} When view adapter or tree element is not initialized
   */
  setNodeData(nodeId, data) {
    const viewAdapter = this.viewAdapter;
    if (!viewAdapter) {
      throw new Error(`HoopsViewTree.setNodeData [set]: ViewAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`HoopsViewTree.setNodeData [set]: Tree element i
      s not set.`);
    }
    viewAdapter.nodesData[nodeId] = data;
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Merges custom data into a view node's existing data.
   * Arrays are concatenated, objects are merged, other types replace existing data.
   * @param nodeId - The ID of the node to update data for
   * @param data - The data to merge with existing node data
   * @returns {void}
   * @throws {Error} When view adapter or tree element is not initialized
   */
  updateNodeData(nodeId, data) {
    const viewAdapter = this.viewAdapter;
    if (!viewAdapter) {
      throw new Error(`HoopsViewTree.setNodeData [set]: ViewAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`HoopsViewTree.setNodeData [set]: Tree element is not set.`);
    }
    if (Array.isArray(data) && Array.isArray(viewAdapter.nodesData[nodeId])) {
      viewAdapter.nodesData[nodeId] = [...viewAdapter.nodesData[nodeId], ...data];
    } else if (typeof data === "object" && (!viewAdapter.nodesData[nodeId] || typeof viewAdapter.nodesData[nodeId] === "object")) {
      viewAdapter.nodesData[nodeId] = Object.assign(viewAdapter.nodesData[nodeId] ?? {}, data);
    } else {
      viewAdapter.nodesData[nodeId] = data;
    }
    viewAdapter.nodesData[nodeId] = Object.assign(viewAdapter.nodesData[nodeId] ?? {}, data);
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Resets the tree to its initial state and expands the root node.
   * @internal
   * @returns {void}
   */
  resetTree() {
    var _a2, _b;
    (_a2 = this.treeRef.value) == null ? void 0 : _a2.resetTree();
    (_b = this.treeRef.value) == null ? void 0 : _b.expandPath([ViewTreeNodeId.RootNode]);
  }
  /** @internal */
  render() {
    return b`<hoops-tree
      class="viewtree"
      .tree=${{ context: new ViewAdapter() }}
      @hoops-tree-node-click=${(event) => {
      event.stopPropagation();
      const { key, ...detail } = event.detail;
      if ([
        ViewTreeNodeId.RootNode,
        ViewTreeNodeId.AnnotationViewsNode,
        ViewTreeNodeId.CombineStateViewsNode,
        ViewTreeNodeId.StandardViewsNode
      ].includes(key)) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hoops-view-tree-node-click", {
          bubbles: true,
          composed: true,
          detail: {
            nodeId: key,
            ...detail
          }
        })
      );
    }}
      ${n2(this.treeRef)}
    ></hoops-tree>`;
  }
};
HoopsViewTreeElement.styles = [
  componentBaseStyle,
  i$7`
      .viewtree {
        height: 100%;
        overflow: auto;
      }
    `
];
HoopsViewTreeElement = __decorateClass$7([
  t$2("hoops-view-tree")
], HoopsViewTreeElement);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let WebViewerComponent = class extends i$3 {
  /**
   * Creates a new WebViewerComponent instance.
   * Initializes the component and binds event handlers.
   * @internal
   */
  constructor() {
    super();
    this.modelStructureReady = false;
    this.empty = false;
    this.usePointerEvents = false;
    this.disableAutomaticBackgroundSheets = false;
    this.disableAutomaticFloorplanOverlay = false;
    this.calculateDefaultViewAxes = false;
    this.disableAutomaticFitWorld = false;
    this.enableShatteredModelUiViews = false;
    this.hwv = null;
    this.handleResize = this.handleResize.bind(this);
  }
  /**
   * Handles window resize events by updating the viewer canvas dimensions.
   * @returns {void}
   * @internal
   */
  handleResize() {
    var _a2;
    if (this.modelStructureReady) {
      (_a2 = this.hwv) == null ? void 0 : _a2.resizeCanvas();
    }
  }
  /**
   * Handles viewer initialization completion.
   * Sets up context manager, dispatches ready event, and binds viewer events.
   * @returns {void}
   * @internal
   */
  handleReady() {
    if (!this.hwv) {
      return;
    }
    if (this.contextManager) {
      this.contextManager.webViewer = this.hwv;
    }
    const event = new CustomEvent("hwvReady", {
      bubbles: true,
      composed: true,
      detail: this.hwv
    });
    this.dispatchEvent(event);
    this.bindEvents(this.hwv);
  }
  /**
   * Lifecycle callback invoked after the component's first update.
   * Creates and initializes the WebViewer instance with configured properties.
   * @param _changedProperties - Map of changed properties (unused)
   * @returns {void}
   * @internal
   */
  firstUpdated(_changedProperties) {
    var _a2;
    super.firstUpdated(_changedProperties);
    this.container = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".web-viewer");
    this.hwv = new WebViewer({
      container: this.container,
      endpointUri: this.endpointUri,
      model: this.model,
      sessionToken: this.sessionToken,
      rendererType: this.rendererType,
      empty: this.empty,
      usePointerEvents: this.usePointerEvents,
      streamingMode: this.streamingMode,
      memoryLimit: this.memoryLimit,
      boundingPreviewMode: this.boundingPreviewMode,
      defaultMeshLevel: this.defaultMeshLevel,
      streamCutoffScale: this.streamCutoffScale,
      disableAutomaticBackgroundSheets: this.disableAutomaticBackgroundSheets,
      disableAutomaticFloorplanOverlay: this.disableAutomaticFloorplanOverlay,
      calculateDefaultViewAxes: this.calculateDefaultViewAxes,
      disableAutomaticFitWorld: this.disableAutomaticFitWorld,
      enableShatteredModelUiViews: this.enableShatteredModelUiViews,
      enginePath: this.enginePath,
      defaultMetallicFactor: this.defaultMetallicFactor,
      defaultRoughnessFactor: this.defaultRoughnessFactor
    });
    this.hwv.start();
    this.handleReady();
  }
  /**
   * Lifecycle callback invoked when the component is added to the DOM.
   * Sets up window resize event listeners for responsive canvas sizing.
   * @returns {void}
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }
  /**
   * Lifecycle callback invoked when the component is removed from the DOM.
   * Cleans up event listeners and shuts down the WebViewer instance.
   * @returns {void}
   * @internal
   */
  disconnectedCallback() {
    var _a2;
    window.removeEventListener("resize", this.handleResize);
    (_a2 = this.hwv) == null ? void 0 : _a2.shutdown();
    super.disconnectedCallback();
  }
  /**
   * Gets the underlying WebViewer instance.
   * Provides access to the full HOOPS Web Viewer API for advanced operations.
   * @returns {WebViewer | null} The WebViewer instance or null if not initialized
   */
  get viewer() {
    return this.hwv;
  }
  /**
   * Renders the component template.
   * Creates the container div that will host the WebViewer canvas and slots.
   * @returns {TemplateResult} The component's HTML template
   * @internal
   */
  render() {
    return b`<div class="web-viewer"></div>`;
  }
  /**
   * Binds WebViewer events to custom events for component communication.
   * Creates event listeners that forward viewer events as custom DOM events.
   * @param hwv - The WebViewer instance to bind events from
   * @returns {void}
   * @internal
   */
  bindEvents(hwv) {
    hwv.setCallbacks({
      addCuttingSection: (cuttingSection) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvAddCuttingSection",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                cuttingSection
              }
            }
          )
        );
      },
      assemblyTreeReady: () => {
        this.dispatchEvent(
          new CustomEvent("hwvAssemblyTreeReady", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      bcfLoaded: (id, filename) => {
        this.dispatchEvent(
          new CustomEvent("hwvBcfLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              id,
              filename
            }
          })
        );
      },
      bcfRemoved: (id) => {
        this.dispatchEvent(
          new CustomEvent("hwvBcfRemoved", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              id
            }
          })
        );
      },
      beginInteraction: () => {
        this.dispatchEvent(
          new CustomEvent("hwvBeginInteraction", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      // XXX: This should probably pass in a reference of the operator in question.
      cadViewCreated: (cadViewId, cadViewName) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvCadViewCreated",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                cadViewId,
                cadViewName
              }
            }
          )
        );
      },
      camera: (camera2) => {
        this.dispatchEvent(
          new CustomEvent("hwvCamera", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              camera: camera2
            }
          })
        );
      },
      cappingIdle: (isIdle, cappedInstanceCount) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvCappingIdle",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                isIdle,
                cappedInstanceCount
              }
            }
          )
        );
      },
      configurationActivated: (nodeId) => {
        this.dispatchEvent(
          new CustomEvent("hwvConfigurationActivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              nodeId
            }
          })
        );
      },
      contextMenu: (position, modifiers) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvContextMenu",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                position,
                modifiers
              }
            }
          )
        );
      },
      cuttingPlaneDragStart: (cuttingSection, planeIndex) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDragStart", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              cuttingSection,
              planeIndex
            }
          })
        );
      },
      cuttingPlaneDrag: (cuttingSection, planeIndex) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDrag", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              cuttingSection,
              planeIndex
            }
          })
        );
      },
      cuttingPlaneDragEnd: (cuttingSection, planeIndex) => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingPlaneDragEnd", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              cuttingSection,
              planeIndex
            }
          })
        );
      },
      cuttingSectionsLoaded: () => {
        this.dispatchEvent(
          new CustomEvent("hwvCuttingSectionsLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      endInteraction: () => {
        this.dispatchEvent(
          new CustomEvent("hwvEndInteraction", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      // XXX: This should probably pass in a reference of the operator in question.
      explode: (magnitude) => {
        this.dispatchEvent(
          new CustomEvent("hwvExplode", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              magnitude
            }
          })
        );
      },
      firstModelLoaded: (modelRootIds, isHwf) => {
        this.dispatchEvent(
          new CustomEvent("hwvFirstModelLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              modelRootIds,
              isHwf
            }
          })
        );
      },
      frameDrawn: (camera2, visiblePoints) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvFrameDrawn",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                camera: camera2,
                visiblePoints
              }
            }
          )
        );
      },
      handleEventStart: (eventType, nodeIds, initialMatrices) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEventStart", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              eventType,
              nodeIds,
              initialMatrices
            }
          })
        );
      },
      handleEvent: (eventType, nodeIds, initialMatrices, newMatrices) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEvent", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              eventType,
              nodeIds,
              initialMatrices,
              newMatrices
            }
          })
        );
      },
      handleEventEnd: (eventType, nodeIds, initialMatrices, newMatrices) => {
        this.dispatchEvent(
          new CustomEvent("hwvHandleEventEnd", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              eventType,
              nodeIds,
              initialMatrices,
              newMatrices
            }
          })
        );
      },
      hwfParseComplete: () => {
        this.dispatchEvent(
          new CustomEvent("hwvHwfParseComplete", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      incrementalSelectionBatchBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionBatchBegin", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      incrementalSelectionBatchEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionBatchEnd", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      incrementalSelectionEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvIncrementalSelectionEnd", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      info: (infoType, message) => {
        this.dispatchEvent(
          new CustomEvent("hwvInfo", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              infoType,
              message
            }
          })
        );
      },
      lineCreated: (line) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineCreated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              line
            }
          })
        );
      },
      lineDeleted: (line) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineDeleted", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              line
            }
          })
        );
      },
      lineLoaded: (line) => {
        this.dispatchEvent(
          new CustomEvent("hwvLineLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              line
            }
          })
        );
      },
      measurementBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementBegin", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      measurementCreated: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementCreated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      measurementDeleted: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementDeleted", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      measurementHidden: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementHidden", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      measurementLoaded: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      measurementShown: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementShown", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      measurementValueSet: (measurement) => {
        this.dispatchEvent(
          new CustomEvent("hwvMeasurementValueSet", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              measurement
            }
          })
        );
      },
      missingModel: (modelPath) => {
        this.dispatchEvent(
          new CustomEvent("hwvMissingModel", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              modelPath
            }
          })
        );
      },
      modelLoadBegin: () => {
        this.dispatchEvent(
          new CustomEvent("hwvModelLoadBegin", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      modelLoadFailure: (modelName, reason, error) => {
        this.dispatchEvent(
          new CustomEvent("hwvModelLoadFailure", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              modelName,
              reason,
              error
            }
          })
        );
      },
      modelStructureHeaderParsed: (filename, fileType) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvModelStructureHeaderParsed",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                filename,
                fileType
              }
            }
          )
        );
      },
      modelStructureReady: () => {
        this.modelStructureReady = true;
        this.dispatchEvent(
          new CustomEvent("hwvModelStructureReady", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      modelSwitched: (clearOnly, modelRootIds) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvModelSwitched",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                clearOnly,
                modelRootIds
              }
            }
          )
        );
      },
      modelSwitchStart: (clearOnly) => {
        this.dispatchEvent(
          new CustomEvent("hwvModelSwitchStart", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              clearOnly
            }
          })
        );
      },
      noteTextCreated: (noteText) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextCreated",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                noteText
              }
            }
          )
        );
      },
      noteTextDeleted: (noteText) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextDeleted",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                noteText
              }
            }
          )
        );
      },
      noteTextUpdated: (noteText) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextUpdated",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                noteText
              }
            }
          )
        );
      },
      noteTextHidden: (noteText) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextHidden",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                noteText
              }
            }
          )
        );
      },
      noteTextShown: (noteText) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvNoteTextShown",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                noteText
              }
            }
          )
        );
      },
      overlayViewportSet: (overlayIndex) => {
        this.dispatchEvent(
          new CustomEvent("hwvOverlayViewportSet", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              overlayIndex
            }
          })
        );
      },
      redlineCreated: (redlineMarkup) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineCreated",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                redlineMarkup
              }
            }
          )
        );
      },
      redlineDeleted: (redlineMarkup) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineDeleted",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                redlineMarkup
              }
            }
          )
        );
      },
      redlineUpdated: (redlineMarkup) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvRedlineUpdated",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                redlineMarkup
              }
            }
          )
        );
      },
      removeCuttingSection: () => {
        this.dispatchEvent(
          new CustomEvent("hwvRemoveCuttingSection", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      sceneReady: () => {
        this.dispatchEvent(
          new CustomEvent("hwvSceneReady", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      selectionArray: (selectionEvents, removed) => {
        this.dispatchEvent(
          new CustomEvent("hwvSelectionArray", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              selectionEvents,
              removed
            }
          })
        );
      },
      sheetActivated: (nodeId) => {
        this.dispatchEvent(
          new CustomEvent("hwvSheetActivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              nodeId
            }
          })
        );
      },
      sheetDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvSheetDeactivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      streamingActivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvStreamingActivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      streamingDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvStreamingDeactivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      subtreeDeleted: (modelRootIds) => {
        this.dispatchEvent(
          new CustomEvent("hwvSubtreeDeleted", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              modelRootIds
            }
          })
        );
      },
      subtreeLoaded: (modelRootIds, source) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvSubtreeLoaded",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                modelRootIds,
                source
              }
            }
          )
        );
      },
      timeout: () => {
        this.dispatchEvent(
          new CustomEvent("hwvTimeout", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      timeoutWarning: (minutesRemaining) => {
        this.dispatchEvent(
          new CustomEvent("hwvTimeoutWarning", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              minutesRemaining
            }
          })
        );
      },
      transitionBegin: (duration) => {
        this.dispatchEvent(
          new CustomEvent("hwvTransitionBegin", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              duration
            }
          })
        );
      },
      transitionEnd: () => {
        this.dispatchEvent(
          new CustomEvent("hwvTransitionEnd", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      viewAxes: (frontVector, upVector) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvViewAxes",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                frontVector,
                upVector
              }
            }
          )
        );
      },
      viewCreated: (view) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewCreated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              view
            }
          })
        );
      },
      viewDeactivated: (view) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewDeactivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              view
            }
          })
        );
      },
      viewDeleted: (view) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewDeleted", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              view
            }
          })
        );
      },
      viewLoaded: (view) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewLoaded", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              view
            }
          })
        );
      },
      viewOrientation: (orientation) => {
        this.dispatchEvent(
          new CustomEvent("hwvViewOrientation", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              orientation
            }
          })
        );
      },
      visibilityChanged: (shownBodyIds, hiddenBodyIds) => {
        this.dispatchEvent(
          new CustomEvent(
            "hwvVisibilityChanged",
            {
              bubbles: true,
              composed: true,
              detail: {
                hwv,
                shownBodyIds,
                hiddenBodyIds
              }
            }
          )
        );
      },
      walkOperatorActivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWalkOperatorActivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      walkOperatorDeactivated: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWalkOperatorDeactivated", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      webGlContextLost: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWebGlContextLost", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      websocketConnectionClosed: () => {
        this.dispatchEvent(
          new CustomEvent("hwvWebsocketConnectionClosed", {
            bubbles: true,
            composed: true,
            detail: {
              hwv
            }
          })
        );
      },
      XHRonerror: (errorEvent) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonerror", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              errorEvent
            }
          })
        );
      },
      XHRonloadend: (progressEvent, status, uri) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonloadend", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              progressEvent,
              status,
              uri
            }
          })
        );
      },
      XHRonprogress: (progressEvent) => {
        this.dispatchEvent(
          new CustomEvent("hwvXHRonprogress", {
            bubbles: true,
            composed: true,
            detail: {
              hwv,
              progressEvent
            }
          })
        );
      }
    });
  }
};
WebViewerComponent.styles = [
  i$7`
      :host {
        display: block;
      }
      .web-viewer {
        position: relative;
        min-width: 300px;
        min-height: 300px;
        height: 100%;
      }

      .webviewer-canvas:focus {
        outline: none;
      }

      .noteTextElement {
        position: absolute;
        width: 250px;
        height: 160px;
        z-index: 2;
        background: rgba(180, 180, 180, 0.8);
        border-radius: 5px;
        border: 1px solid black;
        pointer-events: auto;
      }

      .noteTextElement:after,
      .noteTextElement:before {
        border: solid rgba(224, 24, 24, 0);
        content: ' ';
        height: 0;
        left: -20px;
        position: absolute;
        width: 0;
      }

      .noteTextElement:after {
        border-width: 11px;
        border-right-color: rgba(190, 190, 190, 1);
        top: 13px;
        left: -21px;
      }

      .noteTextElement:before {
        border-width: 12px;
        border-right-color: #000;
        top: 12px;
        left: -24px;
      }

      .noteTextElement textArea {
        margin: 5px;
        width: 200px;
        height: 142px;
        z-index: 2;
        resize: none;
      }

      .noteTextElement .noteButton {
        position: absolute;
        left: 220px;
        width: 20px;
        height: 20px;
        border: 1px solid black;
      }

      .noteTextElement .noteButton.color.blue {
        background-color: blue;
      }

      .noteTextElement .noteButton.color.red {
        background-color: red;
      }

      .noteTextElement .noteButton.color.green {
        background-color: rgba(0, 255, 0, 1);
      }

      .noteTextElement .noteButton.color.white {
        background-color: white;
      }

      .noteTextElement .noteButton.color.black {
        background-color: black;
      }

      .noteTextElement .noteButton.trash {
        background: url(images/ui-icons_444444_256x240.png) no-repeat top left;
        display: block;
        background-position: -176px -96px;
      }
    `
];
__decorateClass$6([
  c$6({ context: contextManagerContext })
], WebViewerComponent.prototype, "contextManager", 2);
__decorateClass$6([
  n$4({
    type: String
  })
], WebViewerComponent.prototype, "endpointUri", 2);
__decorateClass$6([
  n$4({
    type: String
  })
], WebViewerComponent.prototype, "model", 2);
__decorateClass$6([
  n$4({
    type: String
  })
], WebViewerComponent.prototype, "sessionToken", 2);
__decorateClass$6([
  n$4({
    type: String,
    converter: (value) => {
      return (value == null ? void 0 : value.toLowerCase()) === "server" ? RendererType.Server : RendererType.Client;
    }
  })
], WebViewerComponent.prototype, "rendererType", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "empty", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "usePointerEvents", 2);
__decorateClass$6([
  n$4({
    type: String,
    converter: (value) => {
      switch (value == null ? void 0 : value.toLowerCase()) {
        case "all":
          return StreamingMode.All;
        case "ondemand":
          return StreamingMode.OnDemand;
        case "interactive":
          return StreamingMode.Interactive;
        default:
          return StreamingMode.Default;
      }
    }
  })
], WebViewerComponent.prototype, "streamingMode", 2);
__decorateClass$6([
  n$4({
    type: Number
  })
], WebViewerComponent.prototype, "memoryLimit", 2);
__decorateClass$6([
  n$4({
    type: String,
    converter: (value) => {
      switch (value == null ? void 0 : value.toLowerCase()) {
        case "all":
          return StreamingMode.All;
        case "ondemand":
          return StreamingMode.OnDemand;
        case "interactive":
          return StreamingMode.Interactive;
        default:
          return StreamingMode.Default;
      }
    }
  })
], WebViewerComponent.prototype, "boundingPreviewMode", 2);
__decorateClass$6([
  n$4({
    type: Number
  })
], WebViewerComponent.prototype, "defaultMeshLevel", 2);
__decorateClass$6([
  n$4({
    type: Number
  })
], WebViewerComponent.prototype, "streamCutoffScale", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "disableAutomaticBackgroundSheets", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "disableAutomaticFloorplanOverlay", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "calculateDefaultViewAxes", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "disableAutomaticFitWorld", 2);
__decorateClass$6([
  n$4({
    type: Boolean
  })
], WebViewerComponent.prototype, "enableShatteredModelUiViews", 2);
__decorateClass$6([
  n$4({
    type: String
  })
], WebViewerComponent.prototype, "enginePath", 2);
__decorateClass$6([
  n$4({
    type: Number
  })
], WebViewerComponent.prototype, "defaultMetallicFactor", 2);
__decorateClass$6([
  n$4({
    type: Number
  })
], WebViewerComponent.prototype, "defaultRoughnessFactor", 2);
WebViewerComponent = __decorateClass$6([
  t$2("hoops-web-viewer")
], WebViewerComponent);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let HoopsBcfTopicElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.topicId = "";
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-clicked", {
        detail: { topicId: this.topicId },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleRemove(e3) {
    e3.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-removed", {
        detail: { topicId: this.topicId },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleScreenshotClick(e3) {
    e3.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-screenshot-clicked", {
        detail: { topicId: this.topicId },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleKeydown(e3) {
    if (e3.target === e3.currentTarget && (e3.key === "Enter" || e3.key === " ")) {
      e3.preventDefault();
      this._handleClick();
    }
  }
  /** @internal */
  render() {
    if (!this.topic) {
      return b``;
    }
    const markup = this.topic.getMarkup();
    const snapshotMap = this.topic.getSnapshotMap();
    const snapshot2 = this.topic.getSnapshot("snapshot.png") ?? snapshotMap.values().next().value ?? null;
    const snapshotUrl = snapshot2 == null ? void 0 : snapshot2.getUrl();
    const title = (markup == null ? void 0 : markup.getTopicTitle()) ?? "Untitled";
    const author = markup == null ? void 0 : markup.getTopicCreationAuthor();
    const creationDate = markup == null ? void 0 : markup.getTopicCreationDate();
    const description = markup == null ? void 0 : markup.getTopicDescription();
    const topicType = markup == null ? void 0 : markup.getTopicType();
    const priority = markup == null ? void 0 : markup.getTopicPriority();
    const stage = markup == null ? void 0 : markup.getTopicStage();
    return b`<div
      class="topic-card"
      role="button"
      tabindex="0"
      data-topic-id=${this.topicId}
      @click=${this._handleClick}
      @keydown=${this._handleKeydown}
    >
      <div class="topic-card-header">
        <span class="topic-card-title">${title}</span>
        <button
          class="topic-card-remove"
          @click=${this._handleRemove}
          title="Remove topic"
          aria-label="Remove topic"
        >
          ×
        </button>
      </div>
      ${snapshotUrl ? b`<img
            class="topic-card-screenshot"
            src=${snapshotUrl}
            alt="Topic screenshot"
            @click=${this._handleScreenshotClick}
          />` : b``}
      <div class="topic-card-meta">
        ${author ? b`<span>Author: ${author}</span>` : b``}
        ${description ? b`<span>Description: ${description}</span>` : b``}
        ${creationDate ? b`<span>Created: ${creationDate.toLocaleDateString()}</span>` : b``}
        ${topicType ? b`<span>Type: ${topicType}</span>` : b``}
        ${priority ? b`<span>Priority: ${priority}</span>` : b``}
        ${stage ? b`<span>Stage: ${stage}</span>` : b``}
        <span>ID: ${this.topicId}</span>
      </div>
    </div>`;
  }
};
HoopsBcfTopicElement.styles = i$7`
    :host {
      display: block;
    }

    .topic-card {
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      cursor: pointer;
    }

    .topic-card:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .topic-card-title {
      font-size: 0.9rem;
      font-weight: 500;
      word-break: break-word;
    }

    .topic-card-remove {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.6;
      padding: 0.1rem 0.3rem;
    }

    .topic-card-remove:hover {
      opacity: 1;
    }

    .topic-card-screenshot {
      width: 100%;
      max-height: 120px;
      object-fit: contain;
      cursor: pointer;
      border-radius: 2px;
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-card-meta {
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.7;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .topic-card-meta span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
__decorateClass$5([
  n$4({ attribute: false })
], HoopsBcfTopicElement.prototype, "topic", 2);
__decorateClass$5([
  n$4({ type: String })
], HoopsBcfTopicElement.prototype, "topicId", 2);
HoopsBcfTopicElement = __decorateClass$5([
  t$2("hoops-bcf-topic")
], HoopsBcfTopicElement);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let HoopsBcfCommentElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.commentId = "";
    this.topicId = "";
  }
  _handleRemove() {
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-comment-removed", {
        detail: { topicId: this.topicId, commentId: this.commentId },
        bubbles: true,
        composed: true
      })
    );
  }
  /** @internal */
  render() {
    if (!this.comment) {
      return b``;
    }
    const text = this.comment.getText();
    const author = this.comment.getAuthor();
    const date = this.comment.getDate();
    return b`<div class="comment-card">
      <div class="comment-card-header">
        <span class="comment-card-text">${text}</span>
        <button
          class="comment-card-remove"
          @click=${this._handleRemove}
          title="Remove comment"
          aria-label="Remove comment"
        >
          ×
        </button>
      </div>
      ${this.snapshotUrl ? b`<img class="comment-card-screenshot" src="${this.snapshotUrl}" alt="Comment screenshot" />` : void 0}
      <div class="comment-card-meta">
        ${author ? b`<span>${author}</span>` : b``}
        ${date ? b`<span>${date.toLocaleDateString()}</span>` : b``}
      </div>
    </div>`;
  }
};
HoopsBcfCommentElement.styles = i$7`
    :host {
      display: block;
    }

    .comment-card {
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .comment-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .comment-card-text {
      font-size: 0.85rem;
      word-break: break-word;
    }

    .comment-card-remove {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.6;
      padding: 0.1rem 0.3rem;
    }

    .comment-card-remove:hover {
      opacity: 1;
    }

    .comment-card-screenshot {
      width: 100%;
      max-height: 100px;
      object-fit: contain;
      border-radius: 2px;
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .comment-card-meta {
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.7;
      display: flex;
      gap: 0.5rem;
    }
  `;
__decorateClass$4([
  n$4({ attribute: false })
], HoopsBcfCommentElement.prototype, "comment", 2);
__decorateClass$4([
  n$4({ type: String })
], HoopsBcfCommentElement.prototype, "commentId", 2);
__decorateClass$4([
  n$4({ type: String })
], HoopsBcfCommentElement.prototype, "topicId", 2);
__decorateClass$4([
  n$4({ attribute: false })
], HoopsBcfCommentElement.prototype, "snapshotUrl", 2);
HoopsBcfCommentElement = __decorateClass$4([
  t$2("hoops-bcf-comment")
], HoopsBcfCommentElement);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let HoopsBcfPanelElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this._showCreateForm = false;
    this._createName = "";
    this._activeBcfId = null;
    this._showTopicCreateForm = false;
    this._topicCreateTitle = "";
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    this._topicMarkupViewMap = /* @__PURE__ */ new Map();
    this._topicNoteTextMap = /* @__PURE__ */ new Map();
  }
  /** @internal */
  connectedCallback() {
    super.connectedCallback();
    this._bcfService = tryGetService("BcfService");
    this._noteTextService = tryGetService("NoteTextService");
  }
  get _hasBcfData() {
    var _a2;
    return Boolean((_a2 = this._bcfService) == null ? void 0 : _a2.getBCFMap().size);
  }
  get _activeBcfData() {
    if (this._activeBcfId === null || !this._bcfService) {
      return null;
    }
    return this._bcfService.getBCFData(this._activeBcfId);
  }
  /** @internal */
  updated(_changedProperties) {
    var _a2;
    if (this._activeBcfId !== null) {
      return;
    }
    const bcfMap = (_a2 = this._bcfService) == null ? void 0 : _a2.getBCFMap();
    const firstId = bcfMap == null ? void 0 : bcfMap.keys().next().value;
    if (typeof firstId === "number") {
      this._activeBcfId = firstId;
    }
  }
  /** @internal */
  async disconnectedCallback() {
    var _a2;
    await this._clearTopicAnnotationVisibility();
    (_a2 = this._bcfService) == null ? void 0 : _a2.clearTopicMarkupAutoDeactivate();
    super.disconnectedCallback();
  }
  _handleCreateClick() {
    this._showCreateForm = true;
    this._createName = "";
  }
  _handleCreateCancel() {
    this._showCreateForm = false;
    this._createName = "";
  }
  _handleCreateConfirm() {
    const name = this._createName.trim();
    if (!name || !this._bcfService) {
      return;
    }
    const bcfData = this._bcfService.createBCFData(name);
    this._showCreateForm = false;
    this._createName = "";
    this._activeBcfId = bcfData.getId();
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    this._bcfService.clearTopicMarkupAutoDeactivate();
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-bcf-created", {
        detail: { id: bcfData.getId(), filename: bcfData.getFilename() },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  _handleImportClick() {
    var _a2;
    const fileInput = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector('input[type="file"]');
    fileInput == null ? void 0 : fileInput.click();
  }
  async _handleFileSelected(e3) {
    var _a2;
    const input = e3.target;
    const file = (_a2 = input.files) == null ? void 0 : _a2[0];
    if (!file || !this._bcfService) {
      return;
    }
    const buffer = await file.arrayBuffer();
    await this._bcfService.addBCFFromBuffer(buffer, file.name);
    const bcfMap = this._bcfService.getBCFMap();
    const lastId = [...bcfMap.keys()].pop();
    if (lastId === void 0) {
      input.value = "";
      this.requestUpdate();
      return;
    }
    this._activeBcfId = lastId;
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    this._bcfService.clearTopicMarkupAutoDeactivate();
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-bcf-imported", {
        detail: { id: lastId, filename: file.name },
        bubbles: true,
        composed: true
      })
    );
    input.value = "";
    this.requestUpdate();
  }
  _handleNameInput(e3) {
    this._createName = e3.target.value;
  }
  _handleNameKeydown(e3) {
    if (e3.key === "Enter") {
      this._handleCreateConfirm();
    } else if (e3.key === "Escape") {
      this._handleCreateCancel();
    }
  }
  async _handleBcfSelectionChange(e3) {
    var _a2;
    const select2 = e3.target;
    this._activeBcfId = parseInt(select2.value, 10);
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    await this._clearActiveTopicMarkup();
    await this._clearTopicAnnotationVisibility();
    (_a2 = this._bcfService) == null ? void 0 : _a2.clearTopicMarkupAutoDeactivate();
    this.requestUpdate();
  }
  async _handleCloseBcf() {
    if (this._activeBcfId === null || !this._bcfService) {
      return;
    }
    const closingBcfData = this._activeBcfData;
    this._bcfService.removeBCFData(this._activeBcfId);
    if (closingBcfData) {
      for (const topicId of closingBcfData.getTopics().keys()) {
        this._topicMarkupViewMap.delete(topicId);
        this._topicNoteTextMap.delete(topicId);
      }
    }
    await this._clearActiveTopicMarkup();
    await this._clearTopicAnnotationVisibility();
    this._bcfService.clearTopicMarkupAutoDeactivate();
    const bcfMap = this._bcfService.getBCFMap();
    if (bcfMap.size > 0) {
      this._activeBcfId = bcfMap.keys().next().value ?? null;
    } else {
      this._activeBcfId = null;
    }
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    this.requestUpdate();
  }
  _handleShowTopicCreate() {
    this._showTopicCreateForm = true;
    this._topicCreateTitle = "";
  }
  _handleTopicCreateCancel() {
    this._showTopicCreateForm = false;
    this._topicCreateTitle = "";
  }
  _handleTopicTitleInput(e3) {
    this._topicCreateTitle = e3.target.value;
  }
  async _handleTopicTitleKeydown(e3) {
    if (e3.key === "Enter") {
      await this._handleTopicCreateConfirm();
    } else if (e3.key === "Escape") {
      this._handleTopicCreateCancel();
    }
  }
  async _handleTopicCreateConfirm() {
    const title = this._topicCreateTitle.trim();
    const bcfData = this._activeBcfData;
    if (!title || !bcfData || !this._bcfService) {
      return;
    }
    const captureView = this._getActiveTopicCaptureView();
    const topic = await this._bcfService.setupTopic(bcfData, title, captureView);
    const topicId = topic.getTopicId();
    if (captureView !== null) {
      this._topicMarkupViewMap.set(topicId, captureView.getUniqueId());
    }
    this._captureTopicAnnotations(topicId);
    this._showTopicCreateForm = false;
    this._topicCreateTitle = "";
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-created", {
        detail: { topicId },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  _getActiveTopicCaptureView() {
    var _a2;
    const webViewer = (_a2 = this._bcfService) == null ? void 0 : _a2.webViewer;
    const captureView = webViewer == null ? void 0 : webViewer.markupManager.getActiveMarkupView(webViewer.view);
    if (!captureView) {
      return null;
    }
    const captureViewId = captureView.getUniqueId();
    if ([...this._topicMarkupViewMap.values()].includes(captureViewId)) {
      return null;
    }
    return captureView;
  }
  _handleRemoveTopic(topicId) {
    var _a2;
    const bcfData = this._activeBcfData;
    if (!bcfData) {
      return;
    }
    const topics = bcfData.getTopics();
    topics.delete(topicId);
    this._topicMarkupViewMap.delete(topicId);
    this._topicNoteTextMap.delete(topicId);
    if (this._selectedTopicId === topicId) {
      this._selectedTopicId = null;
      this._showCommentCreateForm = false;
      this._commentCreateText = "";
      void this._clearTopicAnnotationVisibility();
      (_a2 = this._bcfService) == null ? void 0 : _a2.clearTopicMarkupAutoDeactivate();
    }
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-removed", {
        detail: { topicId },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  async _handleTopicScreenshotClick(topicId) {
    await this._activateTopicAndRestoreMarkup(topicId);
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-clicked", {
        detail: { topicId },
        bubbles: true,
        composed: true
      })
    );
  }
  async _handleTopicSelect(topicId) {
    this._selectedTopicId = topicId;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    await this._activateTopicAndRestoreMarkup(topicId);
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-clicked", {
        detail: { topicId },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  async _handleBackToTopics() {
    var _a2;
    this._selectedTopicId = null;
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    await this._clearActiveTopicMarkup();
    await this._clearTopicAnnotationVisibility();
    (_a2 = this._bcfService) == null ? void 0 : _a2.clearTopicMarkupAutoDeactivate();
    this.requestUpdate();
  }
  async _activateTopicAndRestoreMarkup(topicId) {
    var _a2, _b;
    await this._clearActiveTopicMarkup();
    (_a2 = this._bcfService) == null ? void 0 : _a2.clearTopicMarkupAutoDeactivate();
    const bcfData = this._activeBcfData;
    if (bcfData) {
      const topic = bcfData.getTopics().get(topicId);
      if (topic) {
        const markupViewId = this._topicMarkupViewMap.get(topicId);
        await ((_b = this._bcfService) == null ? void 0 : _b.activateTopicAndRestoreMarkup(topic, markupViewId));
        await this._restoreTopicAnnotations(topicId);
      }
    }
  }
  async _clearActiveTopicMarkup() {
    var _a2;
    await ((_a2 = this._bcfService) == null ? void 0 : _a2.clearActiveTopicMarkup());
  }
  _handleShowCommentCreate() {
    this._showCommentCreateForm = true;
    this._commentCreateText = "";
  }
  _handleCommentTextInput(e3) {
    this._commentCreateText = e3.target.value;
  }
  async _handleCommentTextKeydown(e3) {
    if (e3.key === "Enter") {
      await this._handleCommentCreateConfirm();
    } else if (e3.key === "Escape") {
      this._showCommentCreateForm = false;
      this._commentCreateText = "";
    }
  }
  async _handleCommentCreateConfirm() {
    const text = this._commentCreateText.trim();
    if (!text || !this._selectedTopicId || !this._bcfService) {
      return;
    }
    const selectedTopicId = this._selectedTopicId;
    const bcfData = this._activeBcfData;
    if (!bcfData) {
      return;
    }
    const topic = bcfData.getTopics().get(selectedTopicId);
    if (!topic) {
      return;
    }
    const webViewer = this._bcfService.webViewer;
    const captureView = webViewer == null ? void 0 : webViewer.markupManager.getActiveMarkupView(webViewer.view);
    const { commentId } = await this._bcfService.addTopicComment(topic, text, captureView);
    this._captureTopicAnnotations(selectedTopicId);
    this._showCommentCreateForm = false;
    this._commentCreateText = "";
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-comment-created", {
        detail: { topicId: selectedTopicId, commentId },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  _captureTopicAnnotations(topicId) {
    if (!this._noteTextService) {
      return;
    }
    try {
      const noteIds = this._noteTextService.getVisibleNoteTextKeys();
      this._topicNoteTextMap.set(topicId, new Set(noteIds));
    } catch (e3) {
      console.warn("Failed to capture topic note annotation visibility", e3);
    }
  }
  async _clearTopicAnnotationVisibility() {
    if (!this._noteTextService) {
      return;
    }
    const allManagedNoteIds = /* @__PURE__ */ new Set();
    for (const noteIds of this._topicNoteTextMap.values()) {
      for (const noteId of noteIds) {
        allManagedNoteIds.add(noteId);
      }
    }
    if (allManagedNoteIds.size === 0) {
      return;
    }
    try {
      await this._noteTextService.setNoteTextsVisibility([...allManagedNoteIds], false);
    } catch (e3) {
      console.warn("Failed to clear topic note annotation visibility", e3);
    }
  }
  async _restoreTopicAnnotations(topicId) {
    if (!this._noteTextService) {
      return;
    }
    await this._clearTopicAnnotationVisibility();
    const selectedNoteIds = this._topicNoteTextMap.get(topicId);
    if (!selectedNoteIds || selectedNoteIds.size === 0) {
      return;
    }
    try {
      await this._noteTextService.setNoteTextsVisibility([...selectedNoteIds], true);
    } catch (e3) {
      console.warn("Failed to restore topic note annotation visibility", e3);
    }
  }
  _handleRemoveComment(commentId) {
    if (!this._selectedTopicId) {
      return;
    }
    const bcfData = this._activeBcfData;
    if (!bcfData) {
      return;
    }
    const topic = bcfData.getTopics().get(this._selectedTopicId);
    if (!topic) {
      return;
    }
    const markup = topic.getMarkup();
    if (!markup) {
      return;
    }
    markup.deleteComment(commentId);
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-comment-removed", {
        detail: { topicId: this._selectedTopicId, commentId },
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }
  async _handleTopicClickedEvent(e3) {
    await this._handleTopicSelect(e3.detail.topicId);
  }
  _handleTopicRemovedEvent(e3) {
    this._handleRemoveTopic(e3.detail.topicId);
  }
  async _handleTopicScreenshotClickedEvent(e3) {
    await this._handleTopicScreenshotClick(e3.detail.topicId);
  }
  _handleCommentRemovedEvent(e3) {
    this._handleRemoveComment(e3.detail.commentId);
  }
  /** @internal */
  render() {
    return b`<div
      @hoops-bcf-topic-clicked=${this._handleTopicClickedEvent}
      @hoops-bcf-topic-removed=${this._handleTopicRemovedEvent}
      @hoops-bcf-topic-screenshot-clicked=${this._handleTopicScreenshotClickedEvent}
      @hoops-bcf-comment-removed=${this._handleCommentRemovedEvent}
    >
      <h2 class="title">BCF</h2>
      ${this._hasBcfData ? this._renderBcfContent() : this._renderEmptyState()}
      <input type="file" accept=".bcf,.bcfzip" @change=${this._handleFileSelected} />
    </div>`;
  }
  _renderEmptyState() {
    return b`<div class="empty-state">
      <div class="empty-state-message">
        No BCF loaded. Create a new BCF or import an existing one.
      </div>
      ${this._showCreateForm ? this._renderCreateForm() : this._renderActions()}
    </div>`;
  }
  _renderActions() {
    return b`<div class="actions">
      <hoops-button @click=${this._handleCreateClick}>Create BCF</hoops-button>
      <hoops-button @click=${this._handleImportClick}>Import BCF</hoops-button>
    </div>`;
  }
  _renderCreateForm(inline = false) {
    return b`<div class=${inline ? "create-form create-form-inline" : "create-form"}>
      <input
        type="text"
        placeholder="BCF name"
        .value=${this._createName}
        @input=${this._handleNameInput}
        @keydown=${this._handleNameKeydown}
      />
      <div class="create-form-buttons">
        <hoops-button @click=${this._handleCreateCancel}>Cancel</hoops-button>
        <hoops-button @click=${this._handleCreateConfirm}>Create</hoops-button>
      </div>
    </div>`;
  }
  _renderBcfContent() {
    return b`
      ${this._renderBcfSelector()}
      ${this._activeBcfData ? this._selectedTopicId ? this._renderTopicDetail() : this._renderTopicSection() : b``}
    `;
  }
  _renderBcfSelector() {
    var _a2;
    const bcfMap = (_a2 = this._bcfService) == null ? void 0 : _a2.getBCFMap();
    if (!bcfMap) {
      return b``;
    }
    return b`<div class="bcf-selector">
      <select @change=${this._handleBcfSelectionChange}>
        ${[...bcfMap.entries()].map(
      ([id, data]) => b`<option value=${id} ?selected=${id === this._activeBcfId}>
              ${data.getFilename()}
            </option>`
    )}
      </select>
      <div class="bcf-selector-actions">
        <button @click=${this._handleCreateClick} title="Create BCF" aria-label="Create BCF">+</button>
        <button @click=${this._handleImportClick} title="Import BCF" aria-label="Import BCF">
          <hoops-icon icon="importIcon" class="import-icon"></hoops-icon>
        </button>
        <button @click=${this._handleCloseBcf} title="Close active BCF" aria-label="Close active BCF">&times;</button>
      </div>
    </div>
    ${this._showCreateForm ? this._renderCreateForm(true) : b``}`;
  }
  _renderTopicSection() {
    const bcfData = this._activeBcfData;
    if (!bcfData) {
      return b``;
    }
    const topics = bcfData.getTopics();
    return b`
      <div class="topic-toolbar">
        <span class="topic-toolbar-label">Topics (${topics.size})</span>
        <div class="topic-toolbar-actions">
          <button @click=${this._handleShowTopicCreate} title="Create topic">+ Topic</button>
        </div>
      </div>
      ${this._showTopicCreateForm ? this._renderTopicCreateForm() : b``}
      ${topics.size > 0 ? this._renderTopicList(topics) : this._renderTopicEmpty()}
    `;
  }
  _renderTopicCreateForm() {
    return b`<div class="topic-create-form">
      <input
        type="text"
        placeholder="Topic title"
        .value=${this._topicCreateTitle}
        @input=${this._handleTopicTitleInput}
        @keydown=${this._handleTopicTitleKeydown}
      />
      <button @click=${this._handleTopicCreateConfirm}>Create</button>
      <button @click=${this._handleTopicCreateCancel}>Cancel</button>
    </div>`;
  }
  _renderTopicEmpty() {
    return b`<div class="topic-empty">No topics yet. Create one to get started.</div>`;
  }
  _renderTopicList(topics) {
    return b`<div class="topic-list">
      ${[...topics.entries()].map(
      ([topicId, topic]) => b`<hoops-bcf-topic
            .topic=${topic}
            .topicId=${topicId}
          ></hoops-bcf-topic>`
    )}
    </div>`;
  }
  _renderTopicDetail() {
    const bcfData = this._activeBcfData;
    if (!bcfData || !this._selectedTopicId) {
      return b``;
    }
    const topic = bcfData.getTopics().get(this._selectedTopicId);
    if (!topic) {
      this._selectedTopicId = null;
      return b``;
    }
    const markup = topic.getMarkup();
    const title = (markup == null ? void 0 : markup.getTopicTitle()) ?? "Untitled";
    const comments = (markup == null ? void 0 : markup.getComments()) ?? /* @__PURE__ */ new Map();
    return b`<div class="topic-detail">
      <button class="topic-detail-back" @click=${this._handleBackToTopics}>← Topics</button>
      <div class="topic-detail-title">${title}</div>
      <div class="topic-toolbar">
        <span class="topic-toolbar-label">Comments (${comments.size})</span>
        <div class="topic-toolbar-actions">
          <button @click=${this._handleShowCommentCreate} title="Add comment">+ Comment</button>
        </div>
      </div>
      ${this._showCommentCreateForm ? this._renderCommentCreateForm() : b``}
      ${comments.size > 0 ? this._renderCommentList(comments) : this._renderCommentEmpty()}
    </div>`;
  }
  _renderCommentCreateForm() {
    return b`<div class="comment-create-form">
      <input
        type="text"
        placeholder="Comment text"
        .value=${this._commentCreateText}
        @input=${this._handleCommentTextInput}
        @keydown=${this._handleCommentTextKeydown}
      />
      <button @click=${this._handleCommentCreateConfirm}>Add</button>
      <button
        @click=${() => {
      this._showCommentCreateForm = false;
      this._commentCreateText = "";
    }}
      >
        Cancel
      </button>
    </div>`;
  }
  _renderCommentEmpty() {
    return b`<div class="comment-empty">No comments yet.</div>`;
  }
  _renderCommentList(comments) {
    return b`<div class="comment-list">
      ${[...comments.entries()].map(([commentId, comment]) => {
      const viewpointGuid = comment.getViewpointGuid();
      let snapshotUrl;
      if (viewpointGuid && this._selectedTopicId) {
        const bcfData = this._activeBcfData;
        if (bcfData) {
          const topic = bcfData.getTopics().get(this._selectedTopicId);
          if (topic) {
            const snapshot2 = topic.getSnapshot(`${viewpointGuid}.png`);
            snapshotUrl = snapshot2 == null ? void 0 : snapshot2.getUrl();
          }
        }
      }
      return b`<hoops-bcf-comment
          .comment=${comment}
          .commentId=${commentId}
          .topicId=${this._selectedTopicId}
          .snapshotUrl=${snapshotUrl}
        ></hoops-bcf-comment>`;
    })}
    </div>`;
  }
};
HoopsBcfPanelElement.styles = i$7`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
    }

    .title {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.5rem 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem 1rem;
      text-align: center;
    }

    .empty-state-message {
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 200px;
    }

    .actions hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }

    .create-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 200px;
    }

    .create-form-inline {
      padding: 0.5rem;
    }

    .create-form input {
      padding: 0.4rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .create-form-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    .create-form-buttons hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }

    input[type='file'] {
      display: none;
    }

    .bcf-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .bcf-selector select {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .bcf-selector-actions {
      display: flex;
      gap: 0.25rem;
    }

    .bcf-selector-actions button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .bcf-selector-actions button:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-toolbar-label {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .topic-toolbar-actions {
      display: flex;
      gap: 0.25rem;
    }

    .topic-toolbar-actions button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .topic-toolbar-actions button:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-create-form {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-create-form input {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .topic-create-form button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .topic-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .topic-empty {
      text-align: center;
      padding: 1rem;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    .topic-detail {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .topic-detail-back {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      align-self: flex-start;
    }

    .topic-detail-back:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .import-icon {
      width: 1rem;
      height: 1rem;
    }

    .topic-detail-title {
      font-size: 1rem;
      font-weight: 500;
    }

    .comment-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .comment-empty {
      text-align: center;
      padding: 1rem;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    .comment-create-form {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    .comment-create-form input {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .comment-create-form button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }
  `;
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_showCreateForm", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_createName", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_activeBcfId", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_showTopicCreateForm", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_topicCreateTitle", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_selectedTopicId", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_showCommentCreateForm", 2);
__decorateClass$3([
  r$4()
], HoopsBcfPanelElement.prototype, "_commentCreateText", 2);
HoopsBcfPanelElement = __decorateClass$3([
  t$2("hoops-bcf-panel")
], HoopsBcfPanelElement);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let TypeTreeNodeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.nodeId = Number.NaN;
    this.modelNodeId = Number.NaN;
    this.nodeName = "";
    this.modelNodes = [];
    this.visibility = "Shown";
    this.onNodeClicked = (nodeId, event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent(
          "hoops-types-tree-node-click",
          {
            bubbles: true,
            composed: true,
            detail: {
              nodeId,
              source: this,
              ...toBaseMouseEvent$1(event)
            }
          }
        )
      );
    };
    this.onTypeNodeClicked = (nodeIds, event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-type-node-click", {
          bubbles: true,
          composed: true,
          detail: {
            nodeIds,
            source: this,
            isTypeNode: true,
            ...toBaseMouseEvent$1(event)
          }
        })
      );
    };
    this.onVisibilityClicked = (event) => {
      event.stopPropagation();
      const nodeIds = this.isTypeNode() ? this.modelNodes : [this.modelNodeId];
      const isVisible = this.visibility === "Shown" ? false : true;
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-visibility-change", {
          bubbles: true,
          composed: true,
          detail: {
            nodeIds,
            source: this,
            visible: isVisible,
            isTypeNode: this.isTypeNode(),
            treeNodeId: this.nodeId,
            ...toBaseMouseEvent$1(event)
          }
        })
      );
    };
  }
  /** @internal */
  render() {
    const handleClick = (event) => {
      if (!Number.isNaN(this.modelNodeId)) {
        this.onNodeClicked(this.modelNodeId, event);
      } else if (this.isTypeNode() && this.modelNodes.length > 0) {
        this.onTypeNodeClicked(this.modelNodes, event);
      }
    };
    const handleVisibilityClick = (event) => {
      this.onVisibilityClicked(event);
    };
    return b`
      <div class="types-tree-node">
        <div class="content" @click=${handleClick} @auxclick=${handleClick}>
          <div class="title">${this.nodeName}</div>
        </div>
        <div class="visible-icon" @click=${handleVisibilityClick}>
          ${formatNodeVisibilityIcon(this.visibility)}
        </div>
      </div>
    `;
  }
  isTypeNode() {
    return !(typeof this.modelNodeId === "number" && !isNaN(this.modelNodeId));
  }
};
TypeTreeNodeElement.styles = [
  componentBaseStyle,
  i$7`
      :host {
        display: block;
        width: 100%;
        user-select: none;
      }
      .types-tree-node {
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 100%;
        user-select: none;
      }

      .expand-icon {
        flex-shrink: 0;
        margin-right: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .title {
        flex: 1 1 auto;
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 0;
        cursor: pointer;
        user-select: none;
      }

      .visible-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        margin-left: 0.4rem;
      }

      .types-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }
    `
];
__decorateClass$2([
  n$4({ type: Number })
], TypeTreeNodeElement.prototype, "nodeId", 2);
__decorateClass$2([
  n$4({ type: Number })
], TypeTreeNodeElement.prototype, "modelNodeId", 2);
__decorateClass$2([
  n$4({ type: String })
], TypeTreeNodeElement.prototype, "nodeName", 2);
__decorateClass$2([
  n$4({ type: Array })
], TypeTreeNodeElement.prototype, "modelNodes", 2);
__decorateClass$2([
  n$4({ type: String })
], TypeTreeNodeElement.prototype, "visibility", 2);
TypeTreeNodeElement = __decorateClass$2([
  t$2("hoops-types-tree-node")
], TypeTreeNodeElement);
function defaultNodeFactory(treeContext2, model, nodeId, selected, nodeData) {
  let visibility = "Shown";
  const typesAdapter = treeContext2;
  const existingData = typesAdapter.nodesData[nodeId];
  const data = nodeData ?? existingData ?? {
    visibility: "Shown"
  };
  if (!nodeData && !existingData) {
    typesAdapter.nodesData[nodeId] = data;
  }
  const modelNodeId = () => {
    if (Object.prototype.hasOwnProperty.call(data, "modelNodeId")) {
      return data.modelNodeId;
    }
    return Number.NaN;
  };
  const modelNodes = () => {
    if (Number.isNaN(modelNodeId()) && typeof data.nodeName === "string" && model.getGenericTypeIdMap().has(data.nodeName)) {
      return Array.from(model.getGenericTypeIdMap().get(data.nodeName) ?? /* @__PURE__ */ new Set());
    }
    return [];
  };
  if ("getBranchVisibility" in model && Object.prototype.hasOwnProperty.call(data, "modelNodeId")) {
    const hwvModel = model;
    visibility = branchVisibilityFromComBranchVisibility(
      hwvModel.getBranchVisibility(data.modelNodeId)
    );
  } else if (Object.prototype.hasOwnProperty.call(data, "visibility")) {
    visibility = data.visibility;
  }
  return b`<hoops-types-tree-node
    nodeId=${nodeId}
    visibility=${visibility}
    modelNodeId=${modelNodeId()}
    .modelNodes=${modelNodes()}
    nodeName=${typesAdapter.getNodeName(nodeId) ?? "N/A"}
    ?selected=${selected}
  >
  </hoops-types-tree-node>`;
}
class TypesTreeAdapter {
  constructor() {
    this.nodeFactory = defaultNodeFactory;
    this.nodesData = {};
    this.expandedIcon = b`${downIcon}`;
    this.collapsedIcon = b`${rightIcon}`;
    this.rootNodeName = "Types";
    this.allTypes = void 0;
    this.treeNodes = /* @__PURE__ */ new Map();
    this.indexCounter = 0;
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    return -1;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(nodeId) {
    var _a2;
    switch (nodeId) {
      case -1:
        if (!this.allTypes) {
          this.allTypes = (_a2 = this.model) == null ? void 0 : _a2.getGenericTypeIdMap();
        }
        if (this.allTypes) {
          this.indexCounter = 0;
          this.treeNodes.clear();
          this.allTypes.forEach((_nodesWithType, name) => {
            this.treeNodes.set(this.indexCounter, []);
            this.nodesData[this.indexCounter] = {
              nodeName: name
            };
            this.indexCounter++;
          });
          return Array.from(this.treeNodes.keys());
        }
        return [];
      default:
        if (this.treeNodes.has(nodeId)) {
          const children = this.treeNodes.get(nodeId);
          if (children && children.length > 0) return children;
          const typeName = this.getNodeName(nodeId);
          if (typeName && this.allTypes) {
            const nodesWithType = this.allTypes.get(typeName);
            if (nodesWithType) {
              const childrenTreeNodeIds = [];
              nodesWithType.forEach((modelNodeId) => {
                var _a3;
                childrenTreeNodeIds.push(this.indexCounter);
                this.nodesData[this.indexCounter] = {
                  nodeName: ((_a3 = this.model) == null ? void 0 : _a3.getNodeName(modelNodeId)) ?? "Unnamed Node",
                  modelNodeId
                };
                this.indexCounter++;
              });
              this.treeNodes.set(nodeId, childrenTreeNodeIds);
              return childrenTreeNodeIds;
            }
          }
          return [];
        }
        return [];
    }
  }
  /**
   * Returns the name of a node in the types tree
   * @param nodeId The types tree-specific node id
   */
  getNodeName(nodeId) {
    switch (nodeId) {
      case -1:
        return this.rootNodeName;
      default: {
        const data = this.nodesData[nodeId];
        return (data == null ? void 0 : data.nodeName) ?? "unnamed";
      }
    }
  }
  /**
   * Return the CAD type name for a given CAD type id
   * @param cadViewId
   * @returns
   */
  getTypeName(cadViewId) {
    var _a2, _b;
    const cadTypeName = (_b = (_a2 = this.model) == null ? void 0 : _a2.getCadViewMap()) == null ? void 0 : _b.get(cadViewId);
    return (cadTypeName == null ? void 0 : cadTypeName.replace(/ # Annotation View$/, "")) ?? "Unnamed type";
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(_2, id, selected, nodeData) {
    if (!this.model) {
      return A;
    }
    return this.nodeFactory(this, this.model, id, selected, nodeData);
  }
}
var TypesTreeNodeId = /* @__PURE__ */ ((TypesTreeNodeId2) => {
  TypesTreeNodeId2[TypesTreeNodeId2["RootNode"] = -1] = "RootNode";
  return TypesTreeNodeId2;
})(TypesTreeNodeId || {});
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = decorator(result) || result;
  return result;
};
let HoopsTypesTreeElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.treeRef = e2();
    this.handleNodeClick = (event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-click", {
          bubbles: true,
          composed: true,
          detail: {
            ...event.detail
          }
        })
      );
    };
    this.handleTypeNodeClick = (event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-type-node-click", {
          bubbles: true,
          composed: true,
          detail: {
            ...event.detail
          }
        })
      );
    };
    this.handleVisibilityChange = (event) => {
      event.stopPropagation();
      if (event.detail.isTypeNode && event.detail.treeNodeId !== void 0) {
        this.updateNodeData(event.detail.treeNodeId, {
          visibility: event.detail.visible ? "Shown" : "Hidden"
        });
      }
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-visibility-change", {
          bubbles: true,
          composed: true,
          detail: {
            ...event.detail
          }
        })
      );
    };
  }
  /**
   * Gets the underlying Tree element.
   *
   * @returns {Tree | undefined} The tree element instance or undefined if not available
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets or sets the selected nodes in the tree.
   *
   * This is a syntactic sugar to access the underlying Tree's selected property.
   * If the Tree element is not set, getter returns an empty array.
   * Reassigning the selected array will trigger a reactive update.
   *
   * Note: Trying to set selected nodes while the tree element is not available will throw an error.
   * This should not happen in normal use cases since the tree is added at initialization.
   *
   * @returns {number[]} Array of selected node IDs
   * @defaultValue []
   * @throws Error - Thrown when attempting to set while tree element is not available
   */
  get selected() {
    var _a2;
    return ((_a2 = this.treeElement) == null ? void 0 : _a2.selected) ?? [];
  }
  set selected(value) {
    if (!this.treeElement) {
      throw new Error(`HoopsTypesTree.selected [set]: Tree element is not set.`);
    }
    this.treeElement.selected = value;
  }
  /**
   * Gets or sets the IModel interface that represents the Model being displayed.
   *
   * This is syntactic sugar to access the TypesTreeAdapter's model property.
   * If the TypesTreeAdapter is not set, getter returns undefined.
   * Reassigning the model will trigger a tree reset and update automatically.
   *
   * Note: Trying to set the model while the TypesTreeAdapter is not available will throw an error.
   * This should not happen in normal use cases since the TypesTreeAdapter is added at initialization.
   *
   * @returns {IModel | undefined} The model instance or undefined if not available
   * @throws Error - Thrown when attempting to set while TypesTreeAdapter is not available
   */
  get model() {
    var _a2;
    return (_a2 = this.typesTreeAdapter) == null ? void 0 : _a2.model;
  }
  set model(model) {
    const typesTreeAdapter = this.typesTreeAdapter;
    if (!typesTreeAdapter) {
      throw new Error(`HoopsTypesTree.model [set]: TypesTreeAdapter is not set.`);
    }
    typesTreeAdapter.model = model;
    this.typesTreeAdapter = typesTreeAdapter;
    this.resetTree();
  }
  /**
   * Gets or sets the TypesTreeAdapter that manages tree data and operations.
   *
   * This provides syntactic sugar to access the underlying tree's context adapter.
   * If the Tree element is not set, getter returns undefined.
   * Reassigning the TypesTreeAdapter will trigger a reactive update.
   *
   * Note: Trying to set the TypesTreeAdapter while the tree element is not available will throw an error.
   * This should not happen in normal use cases since the tree is added at initialization.
   *
   * @returns {TypesTreeAdapter | undefined} The TypesTreeAdapter instance or undefined if not available
   * @throws Error - Thrown when attempting to set while tree element is not available
   */
  get typesTreeAdapter() {
    var _a2;
    return (_a2 = this.treeElement) == null ? void 0 : _a2.tree.context;
  }
  set typesTreeAdapter(value) {
    if (!this.treeElement) {
      throw new Error(`HoopsTypesTree.typesTreeAdapter [set]: Tree element is not set.`);
    }
    this.treeElement.tree = { context: value };
  }
  /**
   * Selects or deselects nodes in the tree.
   *
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws Error - Thrown when tree element is not available
   */
  selectNodes(nodeIds, selected) {
    if (!this.treeElement) {
      throw new Error(`HoopsTypesTree.selectNodes: Tree element is not set.`);
    }
    let selection = this.treeElement.selected;
    if (!selected) {
      selection = selection.filter((current) => !nodeIds.includes(current));
    } else {
      selection = nodeIds;
    }
    this.treeElement.selected = selection;
  }
  /**
   * Retrieves custom data attached to a specific node.
   *
   * This allows users to attach reactive data to tree nodes. If the TypesTreeAdapter
   * does not exist, it will throw an Error. Otherwise it will return the stored data
   * for the specified node, if any.
   *
   * @param nodeId - The ID of the node to get data for
   * @returns {T} The custom data stored for the node
   * @throws Error - Thrown when TypesTreeAdapter is not available
   */
  getNodeData(nodeId) {
    const typesTreeAdapter = this.typesTreeAdapter;
    if (!typesTreeAdapter) {
      throw new Error(`HoopsTypesTree.getNodeData: TypesTreeAdapter is not set.`);
    }
    return typesTreeAdapter.nodesData[nodeId];
  }
  /**
   * Sets custom data for a specific node, replacing any existing data.
   *
   * If the node already has a value, it will be erased and replaced with the new data.
   * Setting node data will trigger a reactive update of the tree component.
   *
   * @param nodeId - The ID of the node to set data for
   * @param data - The data to store for the node
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
   */
  setNodeData(nodeId, data) {
    const typesTreeAdapter = this.typesTreeAdapter;
    if (!typesTreeAdapter) {
      throw new Error(`HoopsTypesTree.setNodeData [set]: TypesTreeAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`HoopsTypesTree.setNodeData [set]: Tree element is not set.`);
    }
    typesTreeAdapter.nodesData[nodeId] = data;
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Merges custom data into a node's existing data instead of replacing it.
   *
   * If the node does not have existing data, the new data is added to the context.
   * The merge behavior depends on data types:
   * - If both existing and new data are arrays: new data is appended to the existing array
   * - If both are objects: objects are merged using Object.assign, with new data taking precedence
   * - Otherwise: equivalent to calling setNodeData (replaces existing data)
   *
   * Updating node data will trigger a reactive update of the tree component.
   *
   * @param nodeId - The ID of the node to update data for
   * @param data - The data to merge with existing node data
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
   */
  updateNodeData(nodeId, data) {
    const typesTreeAdapter = this.typesTreeAdapter;
    if (!typesTreeAdapter) {
      throw new Error(`HoopsTypesTree.updateNodeData: TypesTreeAdapter is not set.`);
    }
    const treeElm = this.treeElement;
    if (!treeElm) {
      throw new Error(`HoopsTypesTree.updateNodeData: Tree element is not set.`);
    }
    if (Array.isArray(data) && Array.isArray(typesTreeAdapter.nodesData[nodeId])) {
      typesTreeAdapter.nodesData[nodeId] = [
        ...typesTreeAdapter.nodesData[nodeId],
        ...data
      ];
    } else if (typeof data === "object" && (!typesTreeAdapter.nodesData[nodeId] || typeof typesTreeAdapter.nodesData[nodeId] === "object")) {
      typesTreeAdapter.nodesData[nodeId] = Object.assign(
        typesTreeAdapter.nodesData[nodeId] ?? {},
        data
      );
    } else {
      typesTreeAdapter.nodesData[nodeId] = data;
    }
    typesTreeAdapter.nodesData[nodeId] = Object.assign(
      typesTreeAdapter.nodesData[nodeId] ?? {},
      data
    );
    treeElm.tree = { ...treeElm.tree };
  }
  /**
   * Retrieves all type tree node elements from the shadow DOM.
   *
   * @internal
   * @returns {TypeTreeNodeElement[]} Array of TypeTreeNodeElement instances found in the tree
   */
  getNodeElements() {
    var _a2, _b;
    const ll = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".typestree");
    const dl = (_b = ll == null ? void 0 : ll.shadowRoot) == null ? void 0 : _b.querySelector("div.tree");
    const treeElements = dl == null ? void 0 : dl.querySelectorAll("hoops-tree-node");
    const typesTreeNodes = new Array();
    treeElements == null ? void 0 : treeElements.forEach((treeElement) => {
      var _a3;
      const tte = (_a3 = treeElement.shadowRoot) == null ? void 0 : _a3.querySelector(
        "div.node div.header hoops-types-tree-node"
      );
      if (tte) {
        typesTreeNodes.push(tte);
      }
    });
    return typesTreeNodes;
  }
  /**
   * Updates the visibility state of all nodes in the tree.
   *
   * This method refreshes the visibility for all node elements by:
   * - For individual model nodes: retrieving visibility from the model's getBranchVisibility method
   * - For type nodes: using stored visibility data from nodesData or defaulting to 'Shown'
   *
   * Note: The parameters are currently unused in the implementation but maintained for API compatibility.
   *
   * @param _shownBodyIds - Array of node IDs to mark as visible (currently unused)
   * @param _hiddenBodyIds - Array of node IDs to mark as hidden (currently unused)
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter is not available
   */
  updateVisibility(_shownBodyIds, _hiddenBodyIds) {
    const typesTreeAdapter = this.typesTreeAdapter;
    if (!typesTreeAdapter) {
      throw new Error("HoopsTypesTree.updateVisibility: TypesTreeAdapter is not set.");
    }
    this.getNodeElements().forEach((node) => {
      var _a2;
      if (!node.isTypeNode()) {
        const branchVisibility = (_a2 = typesTreeAdapter.model) == null ? void 0 : _a2.getBranchVisibility(node.modelNodeId);
        if (branchVisibility !== void 0) {
          node.visibility = branchVisibilityFromComBranchVisibility(branchVisibility);
        }
      } else {
        const storedData = typesTreeAdapter.nodesData[node.nodeId];
        node.visibility = (storedData == null ? void 0 : storedData.visibility) || "Shown";
      }
    });
  }
  /**
   * Resets the tree to its initial state and expands the root node.
   *
   * @internal
   * @returns {void}
   */
  resetTree() {
    var _a2, _b;
    (_a2 = this.treeRef.value) == null ? void 0 : _a2.resetTree();
    (_b = this.treeRef.value) == null ? void 0 : _b.expandPath([TypesTreeNodeId.RootNode]);
  }
  /** @internal */
  render() {
    return b`<hoops-tree
      class="typestree"
      .tree=${{ context: new TypesTreeAdapter() }}
      @hoops-types-tree-node-click=${this.handleNodeClick}
      @hoops-types-tree-type-node-click=${this.handleTypeNodeClick}
      @hoops-types-tree-node-visibility-change=${this.handleVisibilityChange}
      ${n2(this.treeRef)}
    ></hoops-tree>`;
  }
};
HoopsTypesTreeElement.styles = [
  componentBaseStyle,
  i$7`
      .typestree {
        height: 100%;
        overflow: auto;
      }
    `
];
HoopsTypesTreeElement = __decorateClass$1([
  t$2("hoops-types-tree")
], HoopsTypesTreeElement);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let HoopsIFCRelationshipElement = class extends i$3 {
  constructor() {
    super(...arguments);
    this.noAnim = false;
    this.expandedRelationships = {};
    this.relationshipsChangedHandler = ((event) => {
      this.selectionRelationships = event.detail;
    });
    this.renderRelationshipIcon = (type) => {
      return {
        relating: b`<i class="icon icon-arrow-right">←</i>`,
        related: b`<i class="icon icon-arrow-left">→</i>`
      }[type] || A;
    };
    this.renderRelationships = (relationship) => {
      if (!relationship) {
        return A;
      }
      return b`<li class="relationship-item">
      <hoops-button
        ?disabled="${!(relationship.nodeId && relationship.bimId)}"
        @click="${(e3) => this.handleButtonClick(e3, relationship)}"
      >
        ${this.renderRelationshipIcon(relationship.role)} ${relationship.name}
        #${relationship.bimId}
      </hoops-button>
    </li>`;
    };
    this.renderRelationshipData = (relationshipData) => {
      var _a2, _b;
      if (!((_a2 = relationshipData == null ? void 0 : relationshipData.elements) == null ? void 0 : _a2.length)) {
        return A;
      }
      const isExpanded = this.isRelationshipExpanded(relationshipData.typeName);
      return b`<div class="relationship-item" aria-expanded="${isExpanded}">
      <div class="relationship-type">
        <div
          class="relationship-header"
          @click="${() => this.toggleRelationship(relationshipData.typeName)}"
        >
          <div class="relationship-toggle">
            <hoops-icon
              icon=${isExpanded ? "downIcon" : "rightIcon"}
              style="width:1rem;"
            ></hoops-icon>
          </div>
          <div class="relationship-label">
            ${relationshipData.typeName} (${relationshipData.elements.length})
          </div>
        </div>
        <div
          class="relationship-content ${isExpanded ? "expanded" : "collapsed"} ${this.noAnim ? "no-anim" : ""}"
        >
          <div class="relationships">
            <ul>
              ${(_b = relationshipData.elements) == null ? void 0 : _b.map((rel) => this.renderRelationships(rel))}
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
    this.service = getService("IFCRelationshipsService");
    this.service.addEventListener(
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
    super.disconnectedCallback();
    if (this.service) {
      this.service.removeEventListener(
        "hoops-selection-ifc-relationships-changed",
        this.relationshipsChangedHandler
      );
    }
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
  handleButtonClick(event, relationship) {
    event.preventDefault();
    event.stopPropagation();
    if (!relationship.nodeId) {
      return;
    }
    this.service.selectNode(relationship.nodeId);
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
  toggleRelationship(relationshipType) {
    this.expandedRelationships = {
      ...this.expandedRelationships,
      [relationshipType]: !this.expandedRelationships[relationshipType]
    };
  }
  /**
   * Checks whether a relationship group is currently expanded.
   *
   * @param relationshipType - The type name of the relationship to check
   * @returns {boolean} True if the relationship group is expanded, false otherwise
   */
  isRelationshipExpanded(relationshipType) {
    return !!this.expandedRelationships[relationshipType];
  }
  /** @internal */
  render() {
    const selectionRelationships = this.selectionRelationships ?? [];
    return b`
      <div data-testid="ifc-relationships-panel">
        <div class="section-title">Relationships</div>
        <div data-testid="relationships-tree">
          ${selectionRelationships.map(this.renderRelationshipData)}
        </div>
      </div>
    `;
  }
};
HoopsIFCRelationshipElement.styles = [
  i$7`
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
__decorateClass([
  n$4({ type: Boolean, attribute: "no-anim" })
], HoopsIFCRelationshipElement.prototype, "noAnim", 2);
__decorateClass([
  r$4()
], HoopsIFCRelationshipElement.prototype, "selectionRelationships", 2);
__decorateClass([
  r$4()
], HoopsIFCRelationshipElement.prototype, "expandedRelationships", 2);
HoopsIFCRelationshipElement = __decorateClass([
  t$2("hoops-ifc-relationship")
], HoopsIFCRelationshipElement);
export {
  A,
  E$1 as E,
  MaterialService as M,
  T,
  i$3 as a,
  b,
  registerService as c,
  i$2 as d,
  e$4 as e,
  t$1 as f,
  getService as g,
  e$2 as h,
  i$7 as i,
  h$2 as j,
  n$4 as n,
  o$3 as o,
  r$4 as r,
  t$2 as t
};
