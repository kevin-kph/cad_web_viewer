function o(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = t;
  return typeof e.backgroundColor == "string" && typeof e.sheetColor == "string" && typeof e.sheetShadowColor == "string" && typeof e.backgroundSheetEnabled == "boolean";
}
export {
  o as isSheetServiceConfiguration
};
