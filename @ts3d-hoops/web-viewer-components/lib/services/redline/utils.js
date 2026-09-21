function n(e) {
  return {
    id: e.uniqueId,
    type: e.getClassName()
  };
}
function r(e) {
  return {
    id: e.getUniqueId(),
    items: e.getMarkup().map(n)
  };
}
function i(e) {
  switch (e) {
    case "Communicator.Markup.Redline.RedlineCircle":
      return "redlineCircle";
    case "Communicator.Markup.Redline.RedlineRectangle":
      return "redlineRectangle";
    case "Communicator.Markup.Redline.RedlinePolyline":
      return "redlineFreehand";
    case "Communicator.Markup.Redline.RedlineText":
      return "redlineNote";
    default:
      return console.warn(`Unknown redline class name: ${e}`), "undefined";
  }
}
export {
  i as formatRedlineIcon,
  n as formatRedlineItem,
  r as formatRedlineView
};
