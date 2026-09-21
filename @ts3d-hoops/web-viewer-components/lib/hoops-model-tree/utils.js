import { NodeType as e } from "@ts3d-hoops/web-viewer";
import { html as n, nothing as s } from "lit";
import { rootModel as a, bodyNode as c, assemblyNode as t, halfVisibleIcon as d, hiddenIcon as i, visibleIcon as u } from "@ts3d-hoops/ui-kit/icons";
function w(r) {
  switch (r) {
    case "Assembly Node":
      return e.AssemblyNode;
    case "Part Instance":
      return e.PartInstance;
    case "Part":
      return e.Part;
    case "Body Instance":
      return e.BodyInstance;
    case "Pmi Body":
      return e.PmiBody;
    case "View Frame":
      return e.ViewFrame;
    case "Body":
      return e.Body;
    case "Brep Body":
      return e.BrepBody;
    case "Tess Body":
      return e.TessBody;
    case "Wire Body":
      return e.WireBody;
    case "Points Body":
      return e.PointsBody;
    case "Pmi":
      return e.Pmi;
    case "Cad View":
      return e.CadView;
    case "Drawing Sheet":
      return e.DrawingSheet;
    case "Unknown":
      return e.Unknown;
    default:
      return e.Unknown;
  }
}
function P(r) {
  switch (r) {
    case e.AssemblyNode:
      return "Assembly Node";
    case e.PartInstance:
      return "Part Instance";
    case e.Part:
      return "Part";
    case e.BodyInstance:
      return "Body Instance";
    case e.PmiBody:
      return "Pmi Body";
    case e.ViewFrame:
      return "View Frame";
    case e.Body:
      return "Body";
    case e.BrepBody:
      return "Brep Body";
    case e.TessBody:
      return "Tess Body";
    case e.WireBody:
      return "Wire Body";
    case e.PointsBody:
      return "Points Body";
    case e.Pmi:
      return "Pmi";
    case e.CadView:
      return "Cad View";
    case e.DrawingSheet:
      return "Drawing Sheet";
    case e.Unknown:
      return "Unknown";
  }
}
function f(r, o) {
  if (r)
    return n`${a}`;
  switch (o) {
    case e.PartInstance:
      return n`${t}`;
    case e.AssemblyNode:
      return n`${t}`;
    case e.BodyInstance:
      return n`${c}`;
    default:
      return s;
  }
}
function l(r) {
  switch (r) {
    case "Shown":
      return n`${u}`;
    case "Hidden":
      return n`${i}`;
    case "Mixed":
      return n`${d}`;
    default:
      return s;
  }
}
export {
  P as formatNodeType,
  f as formatNodeTypeIcon,
  l as formatNodeVisibilityIcon,
  w as toNodeType
};
