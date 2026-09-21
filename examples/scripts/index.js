import { n as EmptyModelName, af as RendererType, ah as WebViewer, C as Color } from "./WebViewer.js";
var ServiceClass = /* @__PURE__ */ ((ServiceClass2) => {
  ServiceClass2[ServiceClass2["CSR_Session"] = 0] = "CSR_Session";
  ServiceClass2[ServiceClass2["SSR_Session"] = 1] = "SSR_Session";
  return ServiceClass2;
})(ServiceClass || {});
class ServiceRequest {
  constructor(serviceClass = 0) {
    this._serviceClass = 0;
    this._modelSearchDirectories = [];
    this._model = null;
    this._readyEndpoint = null;
    this._statusEndpoint = null;
    this._disconnectEndpoint = null;
    this._statusUpdateFrequency = 0;
    this._sessionToken = null;
    this._serviceClass = serviceClass;
  }
  setServiceClass(serviceClass) {
    this._serviceClass = serviceClass;
  }
  getServiceClass() {
    return this._serviceClass;
  }
  addModelSearchDirectory(modelSearchDirectory) {
    this._modelSearchDirectories.push(modelSearchDirectory);
  }
  getModelSearchDirectories() {
    return this._modelSearchDirectories.slice();
  }
  getModel() {
    return this._model;
  }
  setModel(model) {
    this._model = model;
  }
  getReadyEndpoint() {
    return this._readyEndpoint;
  }
  setReadyEndpoint(readyEndpoint) {
    this._readyEndpoint = readyEndpoint;
  }
  getStatusEndpoint() {
    return this._statusEndpoint;
  }
  setStatusEndpoint(statusEndpoint) {
    this._statusEndpoint = statusEndpoint;
  }
  getDisconnectEndpoint() {
    return this._disconnectEndpoint;
  }
  setDisconnectEndpoint(disconnectEndpoint) {
    this._disconnectEndpoint = disconnectEndpoint;
  }
  getStatusUpdateFrequency() {
    return this._statusUpdateFrequency;
  }
  setStatusUpdateFrequency(statusUpdateFrequency) {
    this._statusUpdateFrequency = statusUpdateFrequency;
  }
  getSessionToken() {
    return this._sessionToken;
  }
  setSessionToken(sessionToken) {
    this._sessionToken = sessionToken;
  }
}
var ServiceProtocol = /* @__PURE__ */ ((ServiceProtocol2) => {
  ServiceProtocol2[ServiceProtocol2["WS"] = 0] = "WS";
  ServiceProtocol2[ServiceProtocol2["WSS"] = 1] = "WSS";
  ServiceProtocol2[ServiceProtocol2["HTTP"] = 2] = "HTTP";
  ServiceProtocol2[ServiceProtocol2["HTTPS"] = 3] = "HTTPS";
  return ServiceProtocol2;
})(ServiceProtocol || {});
class ServiceResponse {
  constructor() {
    this._isOk = false;
    this._reason = null;
    this._serviceId = null;
    this._endpoints = {};
  }
  getIsOk() {
    return this._isOk;
  }
  getReason() {
    return this._reason;
  }
  getServiceId() {
    return this._serviceId;
  }
  getEndpoints() {
    return this._endpoints;
  }
  /** @hidden */
  _setIsOk(isOk) {
    this._isOk = isOk;
  }
  /** @hidden */
  _setReason(reason) {
    this._reason = reason;
  }
  /** @hidden */
  _setServiceId(serviceId) {
    this._serviceId = serviceId;
  }
  /** @hidden */
  _addEndpoint(protocol, endpoint) {
    this._endpoints[protocol] = endpoint;
  }
}
class ServiceBroker {
  constructor(endpoint) {
    this._endpoint = endpoint;
  }
  request(serviceRequest) {
    const request = new XMLHttpRequest();
    request.open("POST", `${this._endpoint}/service`);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.setRequestHeader("Access-Control-Allow-Methods", "POST");
    request.setRequestHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"
    );
    request.overrideMimeType("application/json");
    request.setRequestHeader("Content-Type", "application/json");
    request.timeout = 6e4;
    const promise = new Promise((resolve, reject) => {
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(this._parseServerSuccessResponse(request.responseText));
          } else {
            reject(this._parseServerError(request));
          }
        }
      };
      request.send(this._encodeServiceRequest(serviceRequest));
    });
    return promise;
  }
  _encodeServiceRequest(serviceRequest) {
    const requestObject = {};
    switch (serviceRequest.getServiceClass()) {
      case ServiceClass.CSR_Session:
        requestObject["class"] = "csr_session";
        break;
      case ServiceClass.SSR_Session:
        requestObject["class"] = "ssr_session";
        break;
    }
    requestObject["params"] = {};
    const modelSearchDirectories = serviceRequest.getModelSearchDirectories();
    if (modelSearchDirectories.length > 0) {
      requestObject["params"]["modelSearchDirectories"] = modelSearchDirectories;
    }
    const model = serviceRequest.getModel();
    if (model !== null) {
      requestObject["params"]["model"] = model;
    }
    const readyEndpoint = serviceRequest.getReadyEndpoint();
    if (readyEndpoint !== null) {
      requestObject["params"]["readyEndpoint"] = readyEndpoint;
    }
    const statusEndpoint = serviceRequest.getStatusEndpoint();
    if (statusEndpoint !== null) {
      requestObject["params"]["statusEndpoint"] = statusEndpoint;
    }
    const disconnectEndpoint = serviceRequest.getDisconnectEndpoint();
    if (disconnectEndpoint !== null) {
      requestObject["params"]["disconnectEndpoint"] = disconnectEndpoint;
    }
    const statusUpdateFrequency = serviceRequest.getStatusUpdateFrequency();
    if (statusUpdateFrequency !== 0) {
      requestObject["params"]["statusUpdateFrequency"] = statusUpdateFrequency.toString();
    }
    const sessionToken = serviceRequest.getSessionToken();
    if (sessionToken !== null) {
      requestObject["params"]["sessionToken"] = sessionToken;
    }
    return JSON.stringify(requestObject);
  }
  _parseServerSuccessResponse(responseText) {
    const serviceResponse = new ServiceResponse();
    const jsonResponse = JSON.parse(responseText);
    serviceResponse._setIsOk(jsonResponse.result === "ok");
    if (serviceResponse.getIsOk()) {
      serviceResponse._setServiceId(jsonResponse.serviceId);
      const protocols = Object.keys(jsonResponse.endpoints);
      const endpoints = serviceResponse.getEndpoints();
      for (let i = 0; i < protocols.length; i++) {
        endpoints[ServiceProtocol[protocols[i].toUpperCase()]] = jsonResponse.endpoints[protocols[i]];
      }
    } else {
      serviceResponse._setReason(jsonResponse.reason);
    }
    return serviceResponse;
  }
  _parseServerError(request) {
    const serviceResponse = new ServiceResponse();
    serviceResponse._setIsOk(false);
    serviceResponse._setReason(
      `Server error encountered when trying to connect to: ${this._endpoint}`
    );
    return serviceResponse;
  }
}
function createViewer(options) {
  if (useScs()) {
    const newConfig = {
      containerId: options.containerId,
      enginePath: WebViewer.defaultEnginePath
    };
    if (options.model && options.model !== EmptyModelName) {
      newConfig.endpointUri = `${options.model}.scs`;
    } else {
      newConfig.empty = true;
    }
    return Promise.resolve(makeSCSViewer(newConfig));
  }
  const serviceBrokerEndpoint = `${window.location.protocol}//${window.location.hostname}:11182`;
  const rendererType = getRendererType();
  const serviceClass = rendererType === RendererType.Client ? ServiceClass.CSR_Session : ServiceClass.SSR_Session;
  const serviceBroker = new ServiceBroker(serviceBrokerEndpoint);
  const serviceRequest = new ServiceRequest(serviceClass);
  return serviceBroker.request(serviceRequest).then((serviceResponse) => {
    const endpoints = serviceResponse.getEndpoints();
    const serviceProtocol = endpoints.hasOwnProperty(ServiceProtocol.WS.toString()) ? ServiceProtocol.WS : ServiceProtocol.WSS;
    const clientEndpoint = endpoints[serviceProtocol];
    return makeSCViewer(clientEndpoint, options);
  }).catch(() => {
    const defaultServiceEndpoint = "ws://localhost:9999";
    return makeSCViewer(defaultServiceEndpoint, options);
  });
}
function requestEndpoint(rendererType) {
  const serviceBrokerEndpoint = `${window.location.protocol}//${window.location.hostname}:11182`;
  const serviceClass = rendererType === RendererType.Client ? ServiceClass.CSR_Session : ServiceClass.SSR_Session;
  const serviceBroker = new ServiceBroker(serviceBrokerEndpoint);
  const serviceRequest = new ServiceRequest(serviceClass);
  return serviceBroker.request(serviceRequest).then((serviceResponse) => {
    const endpoints = serviceResponse.getEndpoints();
    const serviceProtocol = endpoints.hasOwnProperty(ServiceProtocol.WS.toString()) ? ServiceProtocol.WS : ServiceProtocol.WSS;
    const clientEndpoint = endpoints[serviceProtocol];
    return clientEndpoint;
  }).catch(() => {
    const defaultServiceEndpoint = "ws://localhost:9999";
    return defaultServiceEndpoint;
  });
}
class OperatorInfo {
  constructor(name, id, operator) {
    this.name = name;
    this.id = id;
    this.operator = operator;
  }
}
function removeAllChildren(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}
function getRendererType() {
  const val = getParameterByName("viewer");
  if (val === "ssr") return RendererType.Server;
  else return RendererType.Client;
}
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(window.location.search);
  if (results === null) return null;
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function useScs() {
  const val = getParameterByName("viewer");
  return val === "scs";
}
function makeSCViewer(clientEndpoint, options) {
  const viewerOptions = {
    ...options,
    endpointUri: clientEndpoint,
    rendererType: getRendererType(),
    enginePath: WebViewer.defaultEnginePath
  };
  return makeViewer(viewerOptions);
}
function makeSCSViewer(options) {
  return makeViewer(options);
}
function makeViewer(options) {
  const viewer = new WebViewer(options);
  viewer.setCallbacks({
    sceneReady: () => {
      viewer.view.setBackgroundColor(Color.white(), Color.white());
    }
  });
  window.onresize = () => {
    viewer.resizeCanvas();
  };
  return viewer;
}
export {
  OperatorInfo as O,
  requestEndpoint as a,
  createViewer as c,
  getRendererType as g,
  removeAllChildren as r
};
