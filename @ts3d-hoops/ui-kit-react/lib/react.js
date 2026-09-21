import o from "react";
import { createComponent as e } from "@lit/react";
import { layout as a, toolbar as n, common as t, button as p, iconButton as c, nodeProperties as r, dropdown as l, icons as m, hoopsSwitch as h, accordion as i, tabs as s } from "@ts3d-hoops/ui-kit";
const d = e({
  tagName: "hoops-layout",
  elementClass: a.HoopsLayout,
  react: o
}), u = e({
  tagName: "hoops-toolbar",
  elementClass: n.Toolbar,
  react: o
}), N = e({
  tagName: "hoops-separator",
  elementClass: t.Separator,
  react: o
}), b = e({
  tagName: "hoops-button",
  elementClass: p.HoopsButton,
  react: o
}), w = e({
  tagName: "hoops-icon-button",
  elementClass: c.HoopsIconButton,
  react: o
}), B = e({
  tagName: "hoops-node-properties",
  elementClass: r.NodeProperties,
  react: o
}), I = e({
  tagName: "hoops-dropdown",
  elementClass: l.DropdownMenu,
  react: o
}), T = e({
  tagName: "hoops-icon",
  elementClass: m.HoopsIcon,
  react: o
}), E = e({
  tagName: "hoops-switch",
  elementClass: h.HoopsSwitchElement,
  react: o,
  events: {
    onChange: "change"
  }
}), S = e({
  tagName: "hoops-accordion",
  elementClass: i.HoopsAccordion,
  react: o,
  events: {
    onChange: "change"
  }
}), v = e({
  tagName: "hoops-coordinate-input",
  elementClass: t.HoopsCoordinateInputElement,
  react: o,
  events: {
    onHoopsCoordinateChanged: "hoops-coordinate-changed"
  }
}), y = e({
  tagName: "hoops-color-button",
  elementClass: t.HoopsColorButtonElement,
  react: o,
  events: {
    onChange: "change"
  }
}), f = e({
  tagName: "hoops-tabs",
  elementClass: s.HoopsTabsElement,
  react: o
}), P = e({
  tagName: "hoops-tab",
  elementClass: s.HoopsTabElement,
  react: o
});
export {
  S as HoopsAccordion,
  b as HoopsButton,
  y as HoopsColorButton,
  v as HoopsCoordinateInput,
  I as HoopsDropdown,
  T as HoopsIcon,
  w as HoopsIconButton,
  d as HoopsLayout,
  B as HoopsNodeProperties,
  N as HoopsSeparator,
  E as HoopsSwitch,
  P as HoopsTab,
  f as HoopsTabs,
  u as HoopsToolbar
};
