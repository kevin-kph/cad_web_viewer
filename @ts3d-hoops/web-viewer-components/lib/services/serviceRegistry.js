const r = {};
function t(e) {
  if (!e || !e.serviceName)
    throw new Error("Service must have a serviceName property.");
  const n = r[e.serviceName];
  n != e && (n && console.info(`Service with name ${e.serviceName} is already registered. Overwriting.`), r[e.serviceName] = e);
}
function i(e) {
  if (!e || !r[e])
    throw new Error(`Service with name ${e} is not registered.`);
  delete r[e], console.info(`Service with name ${e} has been unregistered.`);
}
function o(e) {
  return r[e];
}
function c(e) {
  if (!r[e])
    throw new Error(`Service with name ${e} is not registered.`);
  return r[e];
}
function s() {
  return { ...r };
}
function f(e) {
  return !!r[e];
}
function u() {
  Object.keys(r).forEach((e) => {
    delete r[e];
  }), console.info("All services have been cleared.");
}
export {
  u as clearServices,
  s as getAllServices,
  c as getService,
  f as hasService,
  t as registerService,
  r as serviceRegistry,
  o as tryGetService,
  i as unregisterService
};
