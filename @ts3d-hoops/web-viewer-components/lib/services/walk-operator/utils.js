import { WalkMode as r } from "@ts3d-hoops/web-viewer";
function u(e) {
  switch (e) {
    case r.Mouse:
      return "Mouse";
    case r.Keyboard:
      return "Keyboard";
    default:
      return "Mouse";
  }
}
function n(e) {
  switch (e) {
    case "Mouse":
      return r.Mouse;
    case "Keyboard":
      return r.Keyboard;
    default:
      return r.Mouse;
  }
}
function a(e) {
  switch (!0) {
    case e < 1:
      return "µm";
    case e < 10:
      return "mm";
    case e < 1e3:
      return "cm";
    default:
      return "m";
  }
}
function o(e) {
  switch (e) {
    case "µm":
      return 1e-3;
    case "mm":
      return 1;
    case "cm":
      return 10;
    case "m":
      return 1e3;
    default:
      return -1;
  }
}
function c(e) {
  return e < 0 ? -1 : Math.pow(10, Math.floor(Math.log10(e)));
}
export {
  c as calculateWalkSpeedUnitFactor,
  o as getWalkSpeedUnitFactor,
  a as getWalkSpeedUnitName,
  n as stringToWalkMode,
  u as walkModeToString
};
