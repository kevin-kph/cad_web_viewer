function r(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const o = e;
  return typeof o.color == "string" && typeof o.isColorOverride == "boolean";
}
export {
  r as isPmiServiceConfiguration
};
