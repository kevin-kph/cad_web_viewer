const n = ["Mouse", "Keyboard"];
function t(o) {
  return typeof o == "string" && n.includes(o);
}
const i = ["µm", "mm", "cm", "m"];
function d(o) {
  return typeof o == "string" && i.includes(o);
}
function a(o) {
  if (typeof o != "object" || o === null)
    return !1;
  const e = o;
  return t(e.walkMode) && (typeof e.rotationSpeed == "number" || e.rotationSpeed === void 0) && (typeof e.walkSpeed == "number" || e.walkSpeed === void 0) && (typeof e.elevationSpeed == "number" || e.elevationSpeed === void 0) && (typeof e.fieldOfView == "number" || e.fieldOfView === void 0) && typeof e.mouseLookEnabled == "boolean" && (typeof e.mouseLookSpeed == "number" || e.mouseLookSpeed === void 0) && typeof e.collisionDetectionEnabled == "boolean";
}
export {
  n as WalkModeNames,
  i as WalkSpeedUnitNames,
  t as isWalkModeName,
  a as isWalkOperatorServiceConfiguration,
  d as isWalkSpeedUnitName
};
