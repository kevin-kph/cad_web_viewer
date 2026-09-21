import { BranchVisibility as i } from "@ts3d-hoops/web-viewer";
function e(n) {
  switch (n) {
    case i.Hidden:
      return "Hidden";
    case i.Shown:
      return "Shown";
    case i.Mixed:
      return "Mixed";
    default:
      return "Unknown";
  }
}
export {
  e as branchVisibilityFromComBranchVisibility
};
