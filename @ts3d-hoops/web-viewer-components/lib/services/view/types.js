function n(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const i = e;
  return typeof i.axisTriadVisible == "boolean" && typeof i.navCubeVisible == "boolean";
}
export {
  n as isViewServiceConfiguration
};
