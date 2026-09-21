import { css as f, LitElement as h, nothing as p, html as d } from "lit";
import { property as s, state as u, customElement as b } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import "../icons/hoops-icon.js";
var v = Object.defineProperty, g = Object.getOwnPropertyDescriptor, r = (e, i, a, n) => {
  for (var o = n > 1 ? void 0 : n ? g(i, a) : i, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (o = (n ? c(i, a, o) : c(o)) || o);
  return n && o && v(i, a, o), o;
};
let t = class extends h {
  constructor() {
    super(), this.expanded = !1, this.selected = !1, this.leaf = !1, this.noAnim = !1, this.hidden = !0, this.hidden = !this.expanded, this.addEventListener("hoops-tree-item-expand", (e) => {
      e.target === this && (this.expanded = e.detail.expanded);
    });
  }
  willUpdate(e) {
    this.expanded ? this.hidden = !1 : setTimeout(() => {
      this.hidden = !0;
    }, 250);
  }
  /** @internal */
  render() {
    return d`
      <div
        class=${m({
      "tree-item": !0,
      selected: this.selected
    })}
        @click=${(e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent("hoops-tree-item-select", {
          bubbles: !0,
          composed: !0,
          detail: {
            selected: !this.selected
          }
        })
      );
    }}
      >
        <div
          class="expand-icon"
          @click=${(e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent("hoops-tree-item-expand", {
          bubbles: !0,
          composed: !0,
          detail: {
            expanded: !this.expanded
          }
        })
      );
    }}
        >
          <slot name="icon">
            ${this.leaf ? p : d` <hoops-icon
                  icon=${this.expanded ? "downIcon" : "rightIcon"}
                  style="width:1rem;"
                ></hoops-icon>`}
          </slot>
        </div>
        <slot></slot>
      </div>
      ${this.leaf ? p : d`<div
            ?hidden=${this.hidden}
            class=${m({
      children: !0,
      "no-anim": this.noAnim,
      expanded: this.expanded,
      collapsed: !this.hidden && !this.expanded
    })}
          >
            <slot name="children"></slot>
          </div>`}
    `;
  }
};
t.styles = [
  f`
      :host {
        display: block;
        --scale-in-anim: scale-in-ver-top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        --scale-out-anim: scale-out-ver-top 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          --scale-in-anim: none;
          --scale-out-anim: none;
        }
      }

      .tree-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
      }

      .tree-item::before {
        content: '';
        display: inline-block;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }

      .tree-item:hover::before {
        background-color: color-mix(
          in srgb,
          var(--hoops-neutral-foreground-20, #1181d7) 15%,
          transparent
        );
      }

      .tree-item.selected {
        font-weight: bold;
        color: var(--hoops-neutral-foreground-20, #1181d7);
        stroke: var(--hoops-neutral-foreground-20, #1181d7);
        fill: var(--hoops-neutral-foreground-20, #1181d7);
      }

      .expand-icon {
        color: var(--hoops-foreground, #303030);
        stroke: var(--hoops-svg-stroke-color, #303030);
        fill: var(--hoops-svg-fill-color, #f0f0f0);
      }

      .children {
        padding-left: 1.5rem;
        height: min-content;
      }

      .children.expanded:not(.no-anim) {
        -webkit-animation: var(--scale-in-anim);
        animation: var(--scale-in-anim);
      }

      .children.collapsed:not(.no-anim) {
        -webkit-animation: var(--scale-out-anim);
        animation: var(--scale-out-anim);
      }

      @-webkit-keyframes scale-in-ver-top {
        0% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @keyframes scale-in-ver-top {
        0% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }

      @-webkit-keyframes scale-out-ver-top {
        0% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @keyframes scale-out-ver-top {
        0% {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          -webkit-transform-origin: 100% 0%;
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
    `
];
r([
  s({ type: Boolean })
], t.prototype, "expanded", 2);
r([
  s({ type: Boolean })
], t.prototype, "selected", 2);
r([
  s({ type: Boolean })
], t.prototype, "leaf", 2);
r([
  s({ type: Boolean, attribute: "no-anim" })
], t.prototype, "noAnim", 2);
r([
  u()
], t.prototype, "hidden", 2);
t = r([
  b("hoops-tree-item")
], t);
const Y = t;
export {
  t as HoopsTreeItemElement,
  Y as default
};
