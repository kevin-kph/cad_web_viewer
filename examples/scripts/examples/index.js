import "../WebViewer.js";
/* empty css        */
import { d as i, E, f as t$1, T, h as e$1, i as i$1, a as i$2, b, t as t$2, n, A, j as h, o as o$1 } from "../hoops-ifc-relationship.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i {
  constructor(i2) {
    if (super(i2), this.it = E, i2.type !== t$1.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === E || null == r) return this._t = void 0, this.it = r;
    if (r === T) return r;
    if ("string" != typeof r) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it) return this._t;
    this.it = r;
    const s = [r];
    return s.raw = s, this._t = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class t extends e {
}
t.directiveName = "unsafeSVG", t.resultType = 2;
const o = e$1(t);
const logo = '<?xml version="1.0" encoding="UTF-8"?>\n<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6260 1715.45">\n  <defs>\n    <style>\n      .cls-1 {\n        fill: #55565a;\n      }\n\n      .cls-2 {\n        fill: #1099d6;\n      }\n    </style>\n  </defs>\n  <path class="cls-1" d="M2263.02,139.54h112.59v788.11h-112.59V139.54ZM2441.52,589.9v-112.6h241.78v112.6h-241.78ZM2863.49,139.54v788.11h-112.6v-337.75h0v-112.6h0V139.54h112.6Z"/>\n  <path class="cls-1" d="M3410.54,131.54v112.96c-146.47,15.76-258.74,138.1-258.74,289.08s112.3,273.34,258.74,289.11v112.95c-207.8-16.38-371.32-190.04-371.32-402.06-.01-211.99,163.53-385.66,371.32-402.04ZM3846.08,533.58c0,212.01-163.52,385.68-371.3,402.06v-112.95c146.45-15.77,258.72-138.13,258.72-289.11s-112.27-273.33-258.72-289.08v-112.96c207.79,16.38,371.3,190.04,371.3,402.04Z"/>\n  <path class="cls-1" d="M4330.61,131.54v112.96c-146.47,15.76-258.74,138.1-258.74,289.08s112.3,273.34,258.74,289.11v112.95c-207.8-16.38-371.32-190.04-371.32-402.06-.01-211.99,163.53-385.66,371.32-402.04ZM4766.15,533.58c0,212.01-163.52,385.68-371.3,402.06v-112.95c146.45-15.77,258.72-138.13,258.72-289.11s-112.27-273.33-258.72-289.08v-112.96c207.79,16.38,371.3,190.04,371.3,402.04Z"/>\n  <path class="cls-2" d="M730.71,115.37C327.15,115.37,0,442.52,0,846.08s327.15,730.71,730.71,730.71,730.71-327.15,730.71-730.71S1134.27,115.37,730.71,115.37ZM730.71,315.07c144.44,0,279.34,57.42,379.84,161.68,1.45,1.45,2.61,2.68,3.79,3.92l.59.63c58.94,62.52,102.04,138.94,124.75,221.17-57.17,111.04-150.04,201.29-262.4,255.18-17.1-162.16-99.76-313.32-227.78-415.93-.49-.43-1.45-1.2-2.42-1.97l-1.2-.96c-92.07-72.63-201.2-116.99-316.65-128.9,88-61.26,194.36-94.82,301.47-94.82ZM378.25,450.32c115.92,2.61,226.44,39.68,320.33,107.41-226.29,191.08-279.25,543.61-117.75,791.46-388.88-105.63-509.39-636.3-202.58-898.87ZM867.18,1352.95c-2.4.72-4.26,1.19-6.15,1.66-8.13,2.07-15.53,3.77-22.65,5.23l-6.76,1.37c-33.05,6.43-67.02,9.7-100.9,9.7-29.17,0-58.46-2.42-87.08-7.2-7.33-9.81-14.41-19.95-21.06-30.19l-3.53-5.46c-57.88-91.03-88.6-196.29-88.88-304.45,64.37,22.26,131.8,33.54,200.55,33.54,80.44,0,158.69-15.35,232.57-45.61-.01,0-.02,0-.02,0-.03,0,3.94-1.63,4.91-2.05,116.87-48.94,217.49-134.72,284.99-242.59,3.65,25.17,5.49,50.69,5.49,76.06,0,238.62-160.98,448.34-391.48,509.99Z"/>\n  <path class="cls-1" d="M5525.13,391.69c0,147.78-98.54,263.88-265.05,263.88h-166.56v272.08h-112.55v-384.66h280.3c82.08,0,151.28-42.22,151.28-144.27s-76.22-146.59-158.32-146.59h-273.26v-112.58h243.93c205.25,0,300.24,103.21,300.24,252.15Z"/>\n  <path class="cls-1" d="M6260,696.6c0,137.21-113.76,240.43-297.89,240.43s-290.86-113.76-302.59-127.86l56.29-100.84c65.67,72.71,156,116.11,248.64,116.11,118.45,0,182.97-48.09,182.97-123.15,0-63.34-71.54-102.02-179.44-120.78-219.31-37.55-281.46-116.12-281.46-221.67,0-127.85,99.68-228.69,283.82-228.69,32.83,0,157.14,3.52,254.48,93.82l-53.95,102.02c-41.05-39.87-104.36-83.25-202.88-83.25-107.88,0-168.88,41.05-168.88,111.43,0,60.98,53.95,89.12,178.26,113.75,187.65,36.37,282.65,96.18,282.65,228.69Z"/>\n  <g>\n    <path class="cls-2" d="M2542.46,1162.53l-146.44,383.21h-31.53l-139.76-383.21h37.95l109.03,306.79c1.96,5.7,3.7,11.54,5.21,17.5,1.51,5.97,2.81,11.89,3.88,17.77h.8c.89-4.81,2.23-10.24,4.01-16.3,1.78-6.05,3.92-12.56,6.41-19.51l113.84-306.25h36.61Z"/>\n    <path class="cls-2" d="M2639.47,1545.75h-33.67v-383.21h33.67v383.21Z"/>\n    <path class="cls-2" d="M2716.7,1514.75l17.9-25.39c14.79,11.05,29.97,19.2,45.56,24.45,15.59,5.26,33.09,7.88,52.51,7.88,24.59,0,44.8-6.72,60.66-20.18,15.85-13.45,23.78-32.02,23.78-55.72,0-19.24-6.33-35.05-18.97-47.43-12.65-12.38-33.23-23.47-61.73-33.27-36.34-12.47-62.85-26.95-79.5-43.43-16.66-16.48-24.99-37.55-24.99-63.2,0-31,10.6-55.81,31.8-74.42,21.2-18.62,49.35-27.93,84.45-27.93,15.67,0,31.09,2.1,46.23,6.28,15.14,4.19,30.37,10.82,45.7,19.91l-16.3,26.19c-12.47-7.48-25.03-13-37.68-16.57-12.65-3.56-26.46-5.34-41.42-5.34-23.34,0-42.36,6.1-57.05,18.31-14.7,12.21-22.05,28.91-22.05,50.11,0,18.17,6.59,33.18,19.78,45.03,13.18,11.85,34.74,23.03,64.67,33.54,35.81,12.12,61.55,26.55,77.23,43.29,15.67,16.75,23.52,38.48,23.52,65.21,0,32.96-10.65,59.59-31.93,79.9-21.29,20.31-50.55,30.46-87.79,30.46-21.91,0-42.14-3.03-60.66-9.09-18.53-6.05-36.44-15.59-53.71-28.59Z"/>\n    <path class="cls-2" d="M3299.81,1396.9c0,51.31-11.67,90.06-35.01,116.25-23.34,26.19-57.63,39.28-102.88,39.28s-77.81-12.56-100.88-37.68c-23.07-25.12-34.61-62.35-34.61-111.7v-240.51h33.4v237.04c0,40.26,8.99,70.64,26.99,91.13,17.99,20.49,44,30.73,78.03,30.73s58.35-9.89,75.63-29.66c17.28-19.78,25.92-49.26,25.92-88.46v-240.78h33.4v234.37Z"/>\n    <path class="cls-2" d="M3348.44,1545.75l145.38-383.21h33.94l144.84,383.21h-37.95l-41.69-112.51h-166.22l-40.89,112.51h-37.41ZM3438.5,1402.51h143.24l-63.6-173.44c-1.6-4.1-2.94-8.46-4.01-13.09-1.07-4.63-2.32-9.53-3.74-14.7h-1.07c-1.25,5.52-2.54,10.6-3.88,15.23-1.34,4.63-2.63,8.64-3.88,12.03l-63.07,173.97Z"/>\n    <path class="cls-2" d="M3926.74,1545.75h-187.33v-383.21h33.67v352.48h153.66v30.73Z"/>\n    <path class="cls-2" d="M4031.76,1545.75h-33.67v-383.21h33.67v383.21Z"/>\n    <path class="cls-2" d="M4376.76,1545.75h-275.79v-9.89l228.22-342.6h-210.05v-30.73h262.16v8.55l-229.55,343.93h225.01v30.73Z"/>\n    <path class="cls-2" d="M4647.47,1545.75h-193.75v-383.21h185.19v30.73h-151.52v143.24h140.57v30.73h-140.57v147.78h160.07v30.73Z"/>\n  </g>\n  <rect class="cls-2" x="1782" width="14.69" height="1715.45" transform="translate(3578.68 1715.45) rotate(180)"/>\n</svg>';
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(result) || result;
  return result;
};
let HomeHeader = class extends i$2 {
  render() {
    return b`
      <header>
        <div class="images">
          <a
            href="http://www.techsoft3d.com/products/hoops-toolkits/hoops-communicator/"
            target="_blank"
            title="http://www.techsoft3d.com/products/hoops-toolkits/hoops-communicator/"
          >
            ${o(logo)}
          </a>
        </div>
      </header>
    `;
  }
};
HomeHeader.styles = [
  i$1`
      header {
        height: 5.5rem;
        border-bottom: solid 1px rgb(225, 225, 225);
        width: 100%;
      }

      .images {
        display: flex;
        height: 100%;
        padding: 0.25rem 0.25rem;
        overflow: hidden;
        align-items: center;
      }

      .images a {
        display: block;
      }

      .images a svg {
        height: 4rem;
      }
    `
];
HomeHeader = __decorateClass$4([
  t$2("home-header")
], HomeHeader);
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(result) || result;
  return result;
};
let HomeFooter = class extends i$2 {
  render() {
    return b`
      <footer>
        <a href="http://developer.techsoft3d.com" target="_blank">developer.techsoft3d.com</a>
      </footer>
    `;
  }
};
HomeFooter.styles = [
  i$1`
      footer {
        padding: 10px;
        font-weight: bold;
        font-size: smaller;
        background-color: rgb(0, 144, 208);
        color: white;
        margin: 0;
        text-align: center;
      }

      footer a {
        color: white;
      }
    `
];
HomeFooter = __decorateClass$3([
  t$2("home-footer")
], HomeFooter);
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "VITE_CJS_IGNORE_WARNING": "true", "VITE_DEMO_APP_SERVER_ADDR": "/demo-app/", "VITE_IMAGES_SERVER_ADDR": "/", "VITE_MODEL_SERVER_ADDR": "/", "VITE_SAMPLES_SERVER_ADDR": "/" };
function extractEnvVariable(variableName) {
  const env = __vite_import_meta_env__;
  return env[variableName];
}
function normalizeBaseUrl(base) {
  if (!base) {
    return "http://127.0.0.1:11180/";
  }
  return base.endsWith("/") ? base : `${base}/`;
}
function urlFactory(url) {
  return `${normalizeBaseUrl(extractEnvVariable("VITE_SAMPLES_SERVER_ADDR"))}${url}`;
}
function demoUrlFactory(url) {
  return `${normalizeBaseUrl(extractEnvVariable("VITE_DEMO_APP_SERVER_ADDR"))}${url}`;
}
function scsModelUrlFactory(model) {
  return `${normalizeBaseUrl(extractEnvVariable("VITE_MODEL_SERVER_ADDR"))}${model}.scs`;
}
function imageUrlFactory(url) {
  return `${normalizeBaseUrl(extractEnvVariable("VITE_IMAGES_SERVER_ADDR"))}${url}`;
}
function buildUrl(url, params) {
  if (!params) {
    return url;
  }
  return `${url}?${params}`;
}
function modelDemoUrlFactory(url, conf) {
  let params = "";
  if (conf.mode === "scs") {
    if (conf.model) {
      params += `model=${scsModelUrlFactory(conf.model)}`;
    }
  } else {
    params += `viewer=${conf.mode}`;
    if (conf.model) {
      params += `&model=${conf.model}`;
    }
  }
  return buildUrl(demoUrlFactory(url), params);
}
function sampleUrlFactory(url, conf) {
  let params = "";
  if (conf.mode === "scs") {
    params += `scs=${conf.model}.scs`;
  } else {
    params += `viewer=${conf.mode}`;
    if (conf.model) {
      params += `&model=${conf.model}`;
    }
  }
  return buildUrl(urlFactory(url), params);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let ModelCard = class extends i$2 {
  render() {
    return b`
      <div class="sample-item">
        <div class="model-name">${this.name}</div>
        <div><img src=${imageUrlFactory(this.image)} /></div>
        <div class="model-description">${this.description}</div>
        ${this.csrUrl ? b`<div>
              <a
                class="view-link"
                target="_blank"
                href=${modelDemoUrlFactory(this.csrUrl, { mode: "csr", model: this.name })}
                >Client Side Rendering (Streaming)</a
              >
            </div>` : A}
        ${this.scsUrl ? b`<div>
              <a
                class="view-link"
                target="_blank"
                href=${modelDemoUrlFactory(this.scsUrl, { mode: "scs", model: this.name })}
                >Client Side Rendering (SCS)</a
              >
            </div>` : A}
        ${this.ssrUrl ? b`<div>
              <a
                class="view-link"
                target="_blank"
                href=${modelDemoUrlFactory(this.ssrUrl, { mode: "ssr", model: this.name })}
                >Server Side Rendering</a
              >
            </div>` : A}
      </div>
    `;
  }
};
ModelCard.styles = [
  i$1`
      .sample-item {
        display: inline-block;
        text-align: center;
        margin: 15px 5px;
        vertical-align: top;
      }

      .sample-item .model-name {
        font-weight: bold;
        font-size: 16px;
      }

      .sample-item .model-description {
        font-style: italic;
        font-size: 16px;
      }

      .view-link {
        color: rgb(100, 100, 100);

        font-weight: bold;
        font-size: 15px;
        text-decoration: none;
      }
    `
];
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "name", 2);
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "image", 2);
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "description", 2);
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "csrUrl", 2);
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "ssrUrl", 2);
__decorateClass$2([
  n({ type: String })
], ModelCard.prototype, "scsUrl", 2);
ModelCard = __decorateClass$2([
  t$2("home-model-card")
], ModelCard);
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(result) || result;
  return result;
};
let SamplesList = class extends i$2 {
  constructor() {
    super(...arguments);
    this.fetchSamples = new h(this, {
      task: async ([,], { signal }) => {
        const response = await fetch(urlFactory("assets/dev-samples.json"), { signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch sample list: ${response.status} - ${response.body}`);
        }
        return response.json();
      },
      args: () => []
    });
  }
  render() {
    return b`
      <div class="developer-examples">
        ${this.fetchSamples.render({
      pending: () => A,
      complete: (devSamples) => devSamples.map((current) => {
        return b`
                <div>${current.name}</div>
                <div>
                  ${current.csr ? b`<a
                        class="view-link"
                        target="_blank"
                        href=${sampleUrlFactory(current.csr, { mode: "csr" })}
                        >View CSR</a
                      >` : "N/A"}
                </div>
                <div>
                  ${current.ssr ? b`<a
                        class="view-link"
                        target="_blank"
                        href=${sampleUrlFactory(current.ssr, { mode: "ssr" })}
                        >View SSR</a
                      >` : "N/A"}
                </div>
                <div>${current.description}</div>
                <hr />
              `;
      }),
      error: () => A
    })}
      </div>
    `;
  }
};
SamplesList.styles = [
  i$1`
      :host {
        width: 100%;
      }
      a {
        color: rgb(100, 100, 100);
      }

      .view-link {
        font-weight: bold;
        font-size: 15px;
        text-decoration: none;
      }

      .developer-examples {
        width: 100%;
        margin-bottom: 2rem;
        font-size: 15px;
        border-collapse: collapse;
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 7fr;
      }

      .developer-examples > div {
        padding: 0 0.5rem;
      }

      .developer-examples > hr {
        width: 100%;
        grid-column: 1 / 12;

        padding: 0;
      }

      .container {
        display: flex;
      }

      .name {
        flex-grow: 3;
      }

      .csr,
      .ssr {
        flex-grow: 1;
      }

      .description {
        flex-grow: 7;
      }
    `
];
SamplesList = __decorateClass$1([
  t$2("home-samples-list")
], SamplesList);
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(result) || result;
  return result;
};
let HomePage = class extends i$2 {
  constructor() {
    super(...arguments);
    this.fetchSamples = new h(this, {
      task: async ([,], { signal }) => {
        const response = await fetch(urlFactory("assets/sample-models.json"), { signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch sample list: ${response.status} - ${response.body}`);
        }
        return response.json();
      },
      args: () => []
    });
  }
  render() {
    const renderSample = (sample) => b`<home-model-card
      name=${sample.name}
      image=${sample.image}
      description=${sample.description}
      scsUrl=${o$1(sample.scs)}
      csrUrl=${o$1(sample.csr)}
      ssrUrl=${o$1(sample.ssr)}
    ></home-model-card>`;
    return b`
      <home-header></home-header>
      <main>
        <p>You must run the <strong>node server</strong> before viewing the samples.</p>

        <h3>Sample Models</h3>
        <div class="sample-models">
          ${this.fetchSamples.render({
      pending: () => A,
      complete: (samples) => samples.map((sample) => renderSample(sample)),
      error: () => A
    })}
        </div>

        <h3>Developer Examples</h3>
        <home-samples-list class="dev-samples"></home-samples-list>
      </main>
      <home-footer></home-footer>
    `;
  }
};
HomePage.styles = [
  i$1`
      .sample-models {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        max-width: 80%;
        margin: auto;
      }

      .sample-models > * {
        width: 30%;
        min-width: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      main {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
      }

      .dev-samples {
        max-width: 80%;
      }
    `
];
HomePage = __decorateClass([
  t$2("home-page")
], HomePage);
