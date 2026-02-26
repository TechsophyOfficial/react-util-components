import { jsxs as k, jsx as m, Fragment as Kt } from "react/jsx-runtime";
import { useState as Oe, useRef as le, useEffect as lt } from "react";
const et = (o) => {
  let t = 0, a = 0;
  return "touches" in o && o?.touches?.length ? (t = o?.touches?.[0]?.pageX, a = o?.touches?.[0]?.pageY) : "pageX" in o && (t = o?.pageX, a = o?.pageY), { x: t, y: a };
}, ye = ({ condition: o, children: t }) => o ? /* @__PURE__ */ m(Kt, { children: t }) : null, Jt = (o, t) => o?.multi ? t?.images[o?.current]?.url ?? t?.images?.[o?.current] ?? "" : t?.image ?? "", Nn = (o) => {
  const [t, a] = Oe({
    x: 0,
    y: 0,
    zoom: 1,
    rotate: 0,
    loading: !0,
    moving: !1,
    current: o?.imageIndex ?? 0,
    multi: Array.isArray(o?.images) && o?.images?.length > 1 && !o?.isOnlyOneImage
  }), s = 0.3, d = 4, _ = le(0), w = le(0), ee = le(0), se = le(0), F = le(null), q = (l, f, E, M) => `translate3d(${l}px,${f}px,0px) scale(${E}) rotate(${M}deg)`, K = (l) => l.stopPropagation(), Te = (l, f) => l?.multi ? f?.images[l?.current]?.title ?? "" : f?.title ?? "", Y = () => a({ ...t, x: 0, y: 0, zoom: 1 }), z = (l) => {
    const {
      zoomStep: f = s,
      allowZoom: E = !0,
      doubleClickZoom: M = d
    } = o;
    if (!E || !M) return !1;
    if (K(l), t?.zoom > 1) return Y();
    const ie = (f < 1 ? Math.ceil(M / f) : f) * f, Q = et(l), p = F?.current?.getBoundingClientRect(), De = p ? p?.x + p?.width / 2 : 0, S = p ? p?.y + p?.height / 2 : 0, Ie = (Q?.x - De) * -1 * ie, g = (Q?.y - S) * -1 * ie;
    a({ ...t, x: Ie, y: g, zoom: ie });
  }, H = (l, f) => {
    K(f);
    let E = t?.current;
    const { images: M } = o, ie = (Q) => (M[Q]?.url ?? M[Q])?.toLowerCase().endsWith(".pdf");
    do
      l === "next" ? E = (E + 1) % M?.length : E = (E - 1 + M?.length) % M?.length;
    while (ie(E));
    a({
      ...t,
      current: E,
      x: 0,
      y: 0,
      zoom: 1,
      rotate: 0,
      loading: !0
    }), o?.onNavigateImage && o?.onNavigateImage(E);
  }, X = (l) => {
    if (t?.zoom <= 1) return;
    a({ ...t, moving: !0 });
    const f = et(l);
    _.current = f?.x - t?.x, w.current = f?.y - t?.y;
  }, I = (l) => {
    if (!t?.moving) return;
    const f = et(l);
    ee.current = f?.x - _?.current, se.current = f?.y - w?.current, a({
      ...t,
      x: f?.x - _?.current,
      y: f?.y - w?.current
    });
  }, te = () => a({ ...t, moving: !1 }), $ = (l) => {
    const { zoomStep: f = s } = o;
    let E = t?.zoom;
    l === "in" ? E += f : l === "out" ? E -= f : Y(), a({
      ...t,
      zoom: E < 1 ? 1 : E,
      ...E === 1 && { x: 0, y: 0 }
    });
  }, b = (l) => {
    const f = l === "cw" ? 90 : -90;
    a({ ...t, rotate: t?.rotate + f });
  }, x = (l) => {
    K(l), a({ ...t, x: 0, y: 0, zoom: 1, rotate: 0 });
  }, J = (l) => {
    o?.onClose ? o?.onClose(l) : console.error("No Exit function passed on prop: onClose.");
  }, c = () => t?.x || t?.y || t?.zoom !== 1 || t?.rotate !== 0, T = (l) => {
    const { clickOutsideToExit: f = !0 } = o;
    f && t?.zoom <= 1 && J(l);
  };
  lt(() => {
    document.body.classList.add("lb-open-lightbox");
    const { keyboardInteraction: l = !0 } = o, f = (E) => {
      l && E?.key === "Escape" && x(E);
    };
    return document.addEventListener("keyup", f), () => {
      document.body.classList.remove("lb-open-lightbox"), document.removeEventListener("keyup", f);
    };
  }, [o, t]);
  const ne = Jt(t, o), oe = Te(t, o);
  if (!ne)
    return console.warn("No image(s) supplied"), null;
  const { showTitle: N = !0, allowZoom: Ee = !0, allowRotate: _e = !0 } = o, ce = c();
  return /* @__PURE__ */ k("div", { className: "lb-container", children: [
    /* @__PURE__ */ k("div", { className: "lb-header", children: [
      /* @__PURE__ */ m(ye, { condition: N && oe, children: /* @__PURE__ */ m("div", { className: "lb-title", children: /* @__PURE__ */ m("span", { title: oe, className: "lb-title", children: oe }) }) }),
      /* @__PURE__ */ m(ye, { condition: x, children: /* @__PURE__ */ m(
        "div",
        {
          title: "Reset",
          className: `lb-button lb-icon-reset lb-hide-mobile reload ${ce ? "" : "lb-disabled"}`,
          onClick: x
        }
      ) }),
      /* @__PURE__ */ k(ye, { condition: t?.multi, children: [
        /* @__PURE__ */ m(
          "div",
          {
            title: "Previous",
            className: "lb-button lb-icon-arrow prev lb-hide-mobile",
            onClick: (l) => H("prev", l)
          }
        ),
        /* @__PURE__ */ m(
          "div",
          {
            title: "Next",
            className: "lb-button lb-icon-arrow next lb-hide-mobile",
            onClick: (l) => H("next", l)
          }
        )
      ] }),
      /* @__PURE__ */ k(ye, { condition: Ee, children: [
        /* @__PURE__ */ m(
          "div",
          {
            title: "Zoom In",
            className: "lb-button lb-icon-zoomin zoomin",
            onClick: () => $("in")
          }
        ),
        /* @__PURE__ */ m(
          "div",
          {
            title: "Zoom Out",
            className: `lb-button lb-icon-zoomout zoomout ${t?.zoom <= 1 ? "lb-disabled" : ""}`,
            onClick: () => $("out")
          }
        )
      ] }),
      /* @__PURE__ */ k(ye, { condition: _e, children: [
        /* @__PURE__ */ m(
          "div",
          {
            title: "Rotate left",
            className: "lb-button lb-icon-rotate rotatel",
            onClick: () => b("acw")
          }
        ),
        /* @__PURE__ */ m(
          "div",
          {
            title: "Rotate right",
            className: "lb-button lb-icon-rotate rotater",
            onClick: () => b("cw")
          }
        )
      ] }),
      /* @__PURE__ */ m(
        "div",
        {
          title: "Close",
          className: "lb-button lb-icon-close close",
          onClick: (l) => J(l)
        }
      )
    ] }),
    /* @__PURE__ */ k(
      "div",
      {
        className: `lb-canvas${t?.loading ? " lb-loading" : ""}`,
        ref: F,
        onClick: (l) => T(l),
        children: [
          /* @__PURE__ */ m(
            "img",
            {
              draggable: "false",
              style: {
                transform: q(
                  t?.x,
                  t?.y,
                  t?.zoom,
                  t?.rotate
                ),
                cursor: t?.zoom > 1 ? "grab" : "unset",
                transition: t?.moving ? "none" : "all 0.1s"
              },
              onMouseDown: (l) => X(l),
              onTouchStart: (l) => X(l),
              onMouseMove: (l) => I(l),
              onTouchMove: (l) => I(l),
              onMouseUp: () => te(),
              onMouseLeave: () => te(),
              onTouchEnd: () => te(),
              onClick: (l) => K(l),
              onDoubleClick: (l) => z(l),
              onLoad: () => a({ ...t, loading: !1 }),
              className: `lb-img${t?.loading ? " lb-loading" : ""}`,
              title: oe,
              src: ne,
              alt: oe
            }
          ),
          /* @__PURE__ */ k("div", { className: "mobile-controls lb-show-mobile", children: [
            t?.multi ? /* @__PURE__ */ m(
              "div",
              {
                title: "Previous",
                className: "lb-button lb-icon-arrow prev",
                onClick: (l) => H("prev", l)
              }
            ) : null,
            ce ? /* @__PURE__ */ m(
              "div",
              {
                title: "Reset",
                className: "lb-button lb-icon-reset reload",
                onClick: x
              }
            ) : null,
            t?.multi ? /* @__PURE__ */ m(
              "div",
              {
                title: "Next",
                className: "lb-button lb-icon-arrow next",
                onClick: (l) => H("next", l)
              }
            ) : null
          ] })
        ]
      }
    )
  ] });
}, Cn = ({
  setHtmlContent: o,
  initialContent: t
}) => {
  const a = le(null), s = le(!1), [d, _] = Oe("Arial"), [w, ee] = Oe("2"), [se, F] = Oe(/* @__PURE__ */ new Set()), [q, K] = Oe(!1), Te = [
    {
      label: "Default Sans",
      value: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif"
    },
    { label: "Arial", value: "Arial, Helvetica, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
    { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { label: "Courier New", value: '"Courier New", Courier, monospace' },
    { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
    { label: "Trebuchet MS", value: '"Trebuchet MS", Helvetica, sans-serif' },
    { label: "Impact", value: "Impact, Charcoal, sans-serif" },
    { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans", cursive' }
  ], Y = ["1", "2", "3", "4", "5", "6", "7", "8"], z = [
    { command: "bold", icon: "𝐁", title: "Bold" },
    { command: "italic", icon: "𝐼", title: "Italic" },
    { command: "underline", icon: "U̲", title: "Underline" },
    { command: "strikeThrough", icon: "S̶", title: "Strikethrough" },
    { command: "justifyLeft", icon: "≡", title: "Align Left" },
    { command: "justifyCenter", icon: "≡", title: "Align Center" },
    { command: "justifyRight", icon: "≡", title: "Align Right" },
    { command: "justifyFull", icon: "≡", title: "Justify" }
  ], H = () => {
    a?.current && o && o(a?.current?.innerHTML);
  }, X = () => {
    const c = ["bold", "italic", "underline", "strikeThrough"], T = /* @__PURE__ */ new Set();
    c.forEach((ne) => {
      document.queryCommandState(ne) && T.add(ne);
    }), F(T);
  }, I = (c, T = void 0) => {
    document.execCommand(c, !1, T), a.current?.focus(), H(), X();
  }, te = () => {
    document.execCommand("insertOrderedList", !1);
    const c = window.getSelection();
    if (c && c.anchorNode) {
      let T = c.anchorNode;
      for (; T && T.nodeName !== "OL"; )
        T = T.parentNode;
      T && T instanceof HTMLElement && (T.style.listStyleType = "lower-alpha");
    }
    a.current?.focus(), H(), X();
  }, $ = (c) => {
    const T = c.target.value;
    _(T), I("fontName", T);
  }, b = (c) => {
    const T = c.target.value;
    ee(T), I("fontSize", T);
  }, x = () => {
    H(), X();
  }, J = () => {
    K(!q);
  };
  return lt(() => {
    a.current?.focus();
    const c = () => {
      X();
    };
    return document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("selectionchange", c);
    };
  }, []), lt(() => {
    t && a?.current && !s.current && (a.current.innerHTML = t, s.current = !0);
  }, [t]), /* @__PURE__ */ k("div", { className: `editor-wrapper ${q ? "dark-mode" : ""}`, children: [
    /* @__PURE__ */ k("div", { className: "toolbar", children: [
      /* @__PURE__ */ m("div", { className: "toolbar-group", children: z.slice(0, 4).map((c) => /* @__PURE__ */ m(
        "button",
        {
          className: `toolbar-btn ${se.has(c.command) ? "active" : ""}`,
          onClick: () => I(c.command, c.value),
          title: c.title,
          type: "button",
          children: c.icon
        },
        c.command
      )) }),
      /* @__PURE__ */ k("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ m(
          "select",
          {
            className: "toolbar-select",
            value: d,
            onChange: $,
            title: "Font Family",
            children: Te.map((c) => /* @__PURE__ */ m(
              "option",
              {
                value: c.value,
                style: { fontFamily: c.value },
                children: c.label
              },
              c.label
            ))
          }
        ),
        /* @__PURE__ */ m(
          "select",
          {
            className: "toolbar-select size-select",
            value: w,
            onChange: b,
            title: "Font Size",
            children: Y.map((c) => /* @__PURE__ */ m("option", { value: c, children: c }, c))
          }
        )
      ] }),
      /* @__PURE__ */ m("div", { className: "toolbar-group", children: z.slice(4).map((c) => /* @__PURE__ */ m(
        "button",
        {
          className: `toolbar-btn align-btn ${c.command}`,
          onClick: () => I(c.command, c.value),
          title: c.title,
          type: "button",
          children: c.icon
        },
        c.command
      )) }),
      /* @__PURE__ */ k("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ m(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => I("indent"),
            title: "Indent",
            type: "button",
            children: "⇥"
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => I("outdent"),
            title: "Outdent",
            type: "button",
            children: "⇤"
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ m(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => I("insertUnorderedList"),
            title: "Bullet List",
            type: "button",
            children: "•"
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => I("insertOrderedList"),
            title: "Numbered List",
            type: "button",
            children: "1."
          }
        ),
        /* @__PURE__ */ m(
          "button",
          {
            className: "toolbar-btn",
            onClick: te,
            title: "Alphabetic List",
            type: "button",
            children: "a."
          }
        )
      ] }),
      /* @__PURE__ */ m("div", { className: "toolbar-group", children: /* @__PURE__ */ m(
        "button",
        {
          className: "toolbar-btn",
          onClick: J,
          title: q ? "Light Mode" : "Dark Mode",
          type: "button",
          children: q ? "☀️" : "🌙"
        }
      ) })
    ] }),
    /* @__PURE__ */ m(
      "div",
      {
        ref: a,
        contentEditable: !0,
        onInput: x,
        className: "editor-area",
        suppressContentEditableWarning: !0
      }
    )
  ] });
};
const {
  entries: zt,
  setPrototypeOf: It,
  isFrozen: Qt,
  getPrototypeOf: en,
  getOwnPropertyDescriptor: tn
} = Object;
let {
  freeze: v,
  seal: P,
  create: st
} = Object, {
  apply: ct,
  construct: ut
} = typeof Reflect < "u" && Reflect;
v || (v = function(t) {
  return t;
});
P || (P = function(t) {
  return t;
});
ct || (ct = function(t, a) {
  for (var s = arguments.length, d = new Array(s > 2 ? s - 2 : 0), _ = 2; _ < s; _++)
    d[_ - 2] = arguments[_];
  return t.apply(a, d);
});
ut || (ut = function(t) {
  for (var a = arguments.length, s = new Array(a > 1 ? a - 1 : 0), d = 1; d < a; d++)
    s[d - 1] = arguments[d];
  return new t(...s);
});
const ze = O(Array.prototype.forEach), nn = O(Array.prototype.lastIndexOf), Mt = O(Array.prototype.pop), Ne = O(Array.prototype.push), on = O(Array.prototype.splice), Ge = O(String.prototype.toLowerCase), tt = O(String.prototype.toString), nt = O(String.prototype.match), Ce = O(String.prototype.replace), an = O(String.prototype.indexOf), rn = O(String.prototype.trim), U = O(Object.prototype.hasOwnProperty), L = O(RegExp.prototype.test), Re = ln(TypeError);
function O(o) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var a = arguments.length, s = new Array(a > 1 ? a - 1 : 0), d = 1; d < a; d++)
      s[d - 1] = arguments[d];
    return ct(o, t, s);
  };
}
function ln(o) {
  return function() {
    for (var t = arguments.length, a = new Array(t), s = 0; s < t; s++)
      a[s] = arguments[s];
    return ut(o, a);
  };
}
function u(o, t) {
  let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ge;
  It && It(o, null);
  let s = t.length;
  for (; s--; ) {
    let d = t[s];
    if (typeof d == "string") {
      const _ = a(d);
      _ !== d && (Qt(t) || (t[s] = _), d = _);
    }
    o[d] = !0;
  }
  return o;
}
function sn(o) {
  for (let t = 0; t < o.length; t++)
    U(o, t) || (o[t] = null);
  return o;
}
function B(o) {
  const t = st(null);
  for (const [a, s] of zt(o))
    U(o, a) && (Array.isArray(s) ? t[a] = sn(s) : s && typeof s == "object" && s.constructor === Object ? t[a] = B(s) : t[a] = s);
  return t;
}
function Le(o, t) {
  for (; o !== null; ) {
    const s = tn(o, t);
    if (s) {
      if (s.get)
        return O(s.get);
      if (typeof s.value == "function")
        return O(s.value);
    }
    o = en(o);
  }
  function a() {
    return null;
  }
  return a;
}
const wt = v(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), ot = v(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), it = v(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), cn = v(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), at = v(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), un = v(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), xt = v(["#text"]), kt = v(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), rt = v(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pt = v(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), He = v(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), mn = P(/\{\{[\w\W]*|[\w\W]*\}\}/gm), fn = P(/<%[\w\W]*|[\w\W]*%>/gm), dn = P(/\$\{[\w\W]*/gm), pn = P(/^data-[\-\w.\u00B7-\uFFFF]+$/), hn = P(/^aria-[\-\w]+$/), Ht = P(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), gn = P(/^(?:\w+script|data):/i), Tn = P(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Gt = P(/^html$/i), En = P(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ut = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: hn,
  ATTR_WHITESPACE: Tn,
  CUSTOM_ELEMENT: En,
  DATA_ATTR: pn,
  DOCTYPE_NAME: Gt,
  ERB_EXPR: fn,
  IS_ALLOWED_URI: Ht,
  IS_SCRIPT_OR_DATA: gn,
  MUSTACHE_EXPR: mn,
  TMPLIT_EXPR: dn
});
const ve = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, _n = function() {
  return typeof window > "u" ? null : window;
}, bn = function(t, a) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let s = null;
  const d = "data-tt-policy-suffix";
  a && a.hasAttribute(d) && (s = a.getAttribute(d));
  const _ = "dompurify" + (s ? "#" + s : "");
  try {
    return t.createPolicy(_, {
      createHTML(w) {
        return w;
      },
      createScriptURL(w) {
        return w;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + _ + " could not be created."), null;
  }
}, Ft = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Wt() {
  let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _n();
  const t = (r) => Wt(r);
  if (t.version = "3.3.1", t.removed = [], !o || !o.document || o.document.nodeType !== ve.document || !o.Element)
    return t.isSupported = !1, t;
  let {
    document: a
  } = o;
  const s = a, d = s.currentScript, {
    DocumentFragment: _,
    HTMLTemplateElement: w,
    Node: ee,
    Element: se,
    NodeFilter: F,
    NamedNodeMap: q = o.NamedNodeMap || o.MozNamedAttrMap,
    HTMLFormElement: K,
    DOMParser: Te,
    trustedTypes: Y
  } = o, z = se.prototype, H = Le(z, "cloneNode"), X = Le(z, "remove"), I = Le(z, "nextSibling"), te = Le(z, "childNodes"), $ = Le(z, "parentNode");
  if (typeof w == "function") {
    const r = a.createElement("template");
    r.content && r.content.ownerDocument && (a = r.content.ownerDocument);
  }
  let b, x = "";
  const {
    implementation: J,
    createNodeIterator: c,
    createDocumentFragment: T,
    getElementsByTagName: ne
  } = a, {
    importNode: oe
  } = s;
  let N = Ft();
  t.isSupported = typeof zt == "function" && typeof $ == "function" && J && J.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Ee,
    ERB_EXPR: _e,
    TMPLIT_EXPR: ce,
    DATA_ATTR: l,
    ARIA_ATTR: f,
    IS_SCRIPT_OR_DATA: E,
    ATTR_WHITESPACE: M,
    CUSTOM_ELEMENT: ie
  } = Ut;
  let {
    IS_ALLOWED_URI: Q
  } = Ut, p = null;
  const De = u({}, [...wt, ...ot, ...it, ...at, ...xt]);
  let S = null;
  const Ie = u({}, [...kt, ...rt, ...Pt, ...He]);
  let g = Object.seal(st(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), be = null, We = null;
  const ue = Object.seal(st(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let mt = !0, Be = !0, ft = !1, dt = !0, me = !1, Me = !0, ae = !1, Ye = !1, Xe = !1, fe = !1, we = !1, xe = !1, pt = !0, ht = !1;
  const Bt = "user-content-";
  let $e = !0, Ae = !1, de = {}, G = null;
  const je = u({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let gt = null;
  const Tt = u({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ze = null;
  const Et = u({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ke = "http://www.w3.org/1998/Math/MathML", Pe = "http://www.w3.org/2000/svg", j = "http://www.w3.org/1999/xhtml";
  let pe = j, Ve = !1, qe = null;
  const Yt = u({}, [ke, Pe, j], tt);
  let Ue = u({}, ["mi", "mo", "mn", "ms", "mtext"]), Fe = u({}, ["annotation-xml"]);
  const Xt = u({}, ["title", "style", "font", "a", "script"]);
  let Se = null;
  const $t = ["application/xhtml+xml", "text/html"], jt = "text/html";
  let y = null, he = null;
  const Zt = a.createElement("form"), _t = function(e) {
    return e instanceof RegExp || e instanceof Function;
  }, Ke = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(he && he === e)) {
      if ((!e || typeof e != "object") && (e = {}), e = B(e), Se = // eslint-disable-next-line unicorn/prefer-includes
      $t.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? jt : e.PARSER_MEDIA_TYPE, y = Se === "application/xhtml+xml" ? tt : Ge, p = U(e, "ALLOWED_TAGS") ? u({}, e.ALLOWED_TAGS, y) : De, S = U(e, "ALLOWED_ATTR") ? u({}, e.ALLOWED_ATTR, y) : Ie, qe = U(e, "ALLOWED_NAMESPACES") ? u({}, e.ALLOWED_NAMESPACES, tt) : Yt, Ze = U(e, "ADD_URI_SAFE_ATTR") ? u(B(Et), e.ADD_URI_SAFE_ATTR, y) : Et, gt = U(e, "ADD_DATA_URI_TAGS") ? u(B(Tt), e.ADD_DATA_URI_TAGS, y) : Tt, G = U(e, "FORBID_CONTENTS") ? u({}, e.FORBID_CONTENTS, y) : je, be = U(e, "FORBID_TAGS") ? u({}, e.FORBID_TAGS, y) : B({}), We = U(e, "FORBID_ATTR") ? u({}, e.FORBID_ATTR, y) : B({}), de = U(e, "USE_PROFILES") ? e.USE_PROFILES : !1, mt = e.ALLOW_ARIA_ATTR !== !1, Be = e.ALLOW_DATA_ATTR !== !1, ft = e.ALLOW_UNKNOWN_PROTOCOLS || !1, dt = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, me = e.SAFE_FOR_TEMPLATES || !1, Me = e.SAFE_FOR_XML !== !1, ae = e.WHOLE_DOCUMENT || !1, fe = e.RETURN_DOM || !1, we = e.RETURN_DOM_FRAGMENT || !1, xe = e.RETURN_TRUSTED_TYPE || !1, Xe = e.FORCE_BODY || !1, pt = e.SANITIZE_DOM !== !1, ht = e.SANITIZE_NAMED_PROPS || !1, $e = e.KEEP_CONTENT !== !1, Ae = e.IN_PLACE || !1, Q = e.ALLOWED_URI_REGEXP || Ht, pe = e.NAMESPACE || j, Ue = e.MATHML_TEXT_INTEGRATION_POINTS || Ue, Fe = e.HTML_INTEGRATION_POINTS || Fe, g = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && _t(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (g.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && _t(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (g.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (g.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), me && (Be = !1), we && (fe = !0), de && (p = u({}, xt), S = [], de.html === !0 && (u(p, wt), u(S, kt)), de.svg === !0 && (u(p, ot), u(S, rt), u(S, He)), de.svgFilters === !0 && (u(p, it), u(S, rt), u(S, He)), de.mathMl === !0 && (u(p, at), u(S, Pt), u(S, He))), e.ADD_TAGS && (typeof e.ADD_TAGS == "function" ? ue.tagCheck = e.ADD_TAGS : (p === De && (p = B(p)), u(p, e.ADD_TAGS, y))), e.ADD_ATTR && (typeof e.ADD_ATTR == "function" ? ue.attributeCheck = e.ADD_ATTR : (S === Ie && (S = B(S)), u(S, e.ADD_ATTR, y))), e.ADD_URI_SAFE_ATTR && u(Ze, e.ADD_URI_SAFE_ATTR, y), e.FORBID_CONTENTS && (G === je && (G = B(G)), u(G, e.FORBID_CONTENTS, y)), e.ADD_FORBID_CONTENTS && (G === je && (G = B(G)), u(G, e.ADD_FORBID_CONTENTS, y)), $e && (p["#text"] = !0), ae && u(p, ["html", "head", "body"]), p.table && (u(p, ["tbody"]), delete be.tbody), e.TRUSTED_TYPES_POLICY) {
        if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        b = e.TRUSTED_TYPES_POLICY, x = b.createHTML("");
      } else
        b === void 0 && (b = bn(Y, d)), b !== null && typeof x == "string" && (x = b.createHTML(""));
      v && v(e), he = e;
    }
  }, bt = u({}, [...ot, ...it, ...cn]), At = u({}, [...at, ...un]), Vt = function(e) {
    let n = $(e);
    (!n || !n.tagName) && (n = {
      namespaceURI: pe,
      tagName: "template"
    });
    const i = Ge(e.tagName), h = Ge(n.tagName);
    return qe[e.namespaceURI] ? e.namespaceURI === Pe ? n.namespaceURI === j ? i === "svg" : n.namespaceURI === ke ? i === "svg" && (h === "annotation-xml" || Ue[h]) : !!bt[i] : e.namespaceURI === ke ? n.namespaceURI === j ? i === "math" : n.namespaceURI === Pe ? i === "math" && Fe[h] : !!At[i] : e.namespaceURI === j ? n.namespaceURI === Pe && !Fe[h] || n.namespaceURI === ke && !Ue[h] ? !1 : !At[i] && (Xt[i] || !bt[i]) : !!(Se === "application/xhtml+xml" && qe[e.namespaceURI]) : !1;
  }, W = function(e) {
    Ne(t.removed, {
      element: e
    });
    try {
      $(e).removeChild(e);
    } catch {
      X(e);
    }
  }, re = function(e, n) {
    try {
      Ne(t.removed, {
        attribute: n.getAttributeNode(e),
        from: n
      });
    } catch {
      Ne(t.removed, {
        attribute: null,
        from: n
      });
    }
    if (n.removeAttribute(e), e === "is")
      if (fe || we)
        try {
          W(n);
        } catch {
        }
      else
        try {
          n.setAttribute(e, "");
        } catch {
        }
  }, St = function(e) {
    let n = null, i = null;
    if (Xe)
      e = "<remove></remove>" + e;
    else {
      const A = nt(e, /^[\r\n\t ]+/);
      i = A && A[0];
    }
    Se === "application/xhtml+xml" && pe === j && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
    const h = b ? b.createHTML(e) : e;
    if (pe === j)
      try {
        n = new Te().parseFromString(h, Se);
      } catch {
      }
    if (!n || !n.documentElement) {
      n = J.createDocument(pe, "template", null);
      try {
        n.documentElement.innerHTML = Ve ? x : h;
      } catch {
      }
    }
    const R = n.body || n.documentElement;
    return e && i && R.insertBefore(a.createTextNode(i), R.childNodes[0] || null), pe === j ? ne.call(n, ae ? "html" : "body")[0] : ae ? n.documentElement : R;
  }, yt = function(e) {
    return c.call(
      e.ownerDocument || e,
      e,
      // eslint-disable-next-line no-bitwise
      F.SHOW_ELEMENT | F.SHOW_COMMENT | F.SHOW_TEXT | F.SHOW_PROCESSING_INSTRUCTION | F.SHOW_CDATA_SECTION,
      null
    );
  }, Je = function(e) {
    return e instanceof K && (typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || !(e.attributes instanceof q) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function");
  }, Nt = function(e) {
    return typeof ee == "function" && e instanceof ee;
  };
  function Z(r, e, n) {
    ze(r, (i) => {
      i.call(t, e, n, he);
    });
  }
  const Ct = function(e) {
    let n = null;
    if (Z(N.beforeSanitizeElements, e, null), Je(e))
      return W(e), !0;
    const i = y(e.nodeName);
    if (Z(N.uponSanitizeElement, e, {
      tagName: i,
      allowedTags: p
    }), Me && e.hasChildNodes() && !Nt(e.firstElementChild) && L(/<[/\w!]/g, e.innerHTML) && L(/<[/\w!]/g, e.textContent) || e.nodeType === ve.progressingInstruction || Me && e.nodeType === ve.comment && L(/<[/\w]/g, e.data))
      return W(e), !0;
    if (!(ue.tagCheck instanceof Function && ue.tagCheck(i)) && (!p[i] || be[i])) {
      if (!be[i] && Lt(i) && (g.tagNameCheck instanceof RegExp && L(g.tagNameCheck, i) || g.tagNameCheck instanceof Function && g.tagNameCheck(i)))
        return !1;
      if ($e && !G[i]) {
        const h = $(e) || e.parentNode, R = te(e) || e.childNodes;
        if (R && h) {
          const A = R.length;
          for (let D = A - 1; D >= 0; --D) {
            const V = H(R[D], !0);
            V.__removalCount = (e.__removalCount || 0) + 1, h.insertBefore(V, I(e));
          }
        }
      }
      return W(e), !0;
    }
    return e instanceof se && !Vt(e) || (i === "noscript" || i === "noembed" || i === "noframes") && L(/<\/no(script|embed|frames)/i, e.innerHTML) ? (W(e), !0) : (me && e.nodeType === ve.text && (n = e.textContent, ze([Ee, _e, ce], (h) => {
      n = Ce(n, h, " ");
    }), e.textContent !== n && (Ne(t.removed, {
      element: e.cloneNode()
    }), e.textContent = n)), Z(N.afterSanitizeElements, e, null), !1);
  }, Rt = function(e, n, i) {
    if (pt && (n === "id" || n === "name") && (i in a || i in Zt))
      return !1;
    if (!(Be && !We[n] && L(l, n))) {
      if (!(mt && L(f, n))) {
        if (!(ue.attributeCheck instanceof Function && ue.attributeCheck(n, e))) {
          if (!S[n] || We[n]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Lt(e) && (g.tagNameCheck instanceof RegExp && L(g.tagNameCheck, e) || g.tagNameCheck instanceof Function && g.tagNameCheck(e)) && (g.attributeNameCheck instanceof RegExp && L(g.attributeNameCheck, n) || g.attributeNameCheck instanceof Function && g.attributeNameCheck(n, e)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              n === "is" && g.allowCustomizedBuiltInElements && (g.tagNameCheck instanceof RegExp && L(g.tagNameCheck, i) || g.tagNameCheck instanceof Function && g.tagNameCheck(i)))
            ) return !1;
          } else if (!Ze[n]) {
            if (!L(Q, Ce(i, M, ""))) {
              if (!((n === "src" || n === "xlink:href" || n === "href") && e !== "script" && an(i, "data:") === 0 && gt[e])) {
                if (!(ft && !L(E, Ce(i, M, "")))) {
                  if (i)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Lt = function(e) {
    return e !== "annotation-xml" && nt(e, ie);
  }, vt = function(e) {
    Z(N.beforeSanitizeAttributes, e, null);
    const {
      attributes: n
    } = e;
    if (!n || Je(e))
      return;
    const i = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: S,
      forceKeepAttr: void 0
    };
    let h = n.length;
    for (; h--; ) {
      const R = n[h], {
        name: A,
        namespaceURI: D,
        value: V
      } = R, ge = y(A), Qe = V;
      let C = A === "value" ? Qe : rn(Qe);
      if (i.attrName = ge, i.attrValue = C, i.keepAttr = !0, i.forceKeepAttr = void 0, Z(N.uponSanitizeAttribute, e, i), C = i.attrValue, ht && (ge === "id" || ge === "name") && (re(A, e), C = Bt + C), Me && L(/((--!?|])>)|<\/(style|title|textarea)/i, C)) {
        re(A, e);
        continue;
      }
      if (ge === "attributename" && nt(C, "href")) {
        re(A, e);
        continue;
      }
      if (i.forceKeepAttr)
        continue;
      if (!i.keepAttr) {
        re(A, e);
        continue;
      }
      if (!dt && L(/\/>/i, C)) {
        re(A, e);
        continue;
      }
      me && ze([Ee, _e, ce], (Dt) => {
        C = Ce(C, Dt, " ");
      });
      const Ot = y(e.nodeName);
      if (!Rt(Ot, ge, C)) {
        re(A, e);
        continue;
      }
      if (b && typeof Y == "object" && typeof Y.getAttributeType == "function" && !D)
        switch (Y.getAttributeType(Ot, ge)) {
          case "TrustedHTML": {
            C = b.createHTML(C);
            break;
          }
          case "TrustedScriptURL": {
            C = b.createScriptURL(C);
            break;
          }
        }
      if (C !== Qe)
        try {
          D ? e.setAttributeNS(D, A, C) : e.setAttribute(A, C), Je(e) ? W(e) : Mt(t.removed);
        } catch {
          re(A, e);
        }
    }
    Z(N.afterSanitizeAttributes, e, null);
  }, qt = function r(e) {
    let n = null;
    const i = yt(e);
    for (Z(N.beforeSanitizeShadowDOM, e, null); n = i.nextNode(); )
      Z(N.uponSanitizeShadowNode, n, null), Ct(n), vt(n), n.content instanceof _ && r(n.content);
    Z(N.afterSanitizeShadowDOM, e, null);
  };
  return t.sanitize = function(r) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = null, i = null, h = null, R = null;
    if (Ve = !r, Ve && (r = "<!-->"), typeof r != "string" && !Nt(r))
      if (typeof r.toString == "function") {
        if (r = r.toString(), typeof r != "string")
          throw Re("dirty is not a string, aborting");
      } else
        throw Re("toString is not a function");
    if (!t.isSupported)
      return r;
    if (Ye || Ke(e), t.removed = [], typeof r == "string" && (Ae = !1), Ae) {
      if (r.nodeName) {
        const V = y(r.nodeName);
        if (!p[V] || be[V])
          throw Re("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (r instanceof ee)
      n = St("<!---->"), i = n.ownerDocument.importNode(r, !0), i.nodeType === ve.element && i.nodeName === "BODY" || i.nodeName === "HTML" ? n = i : n.appendChild(i);
    else {
      if (!fe && !me && !ae && // eslint-disable-next-line unicorn/prefer-includes
      r.indexOf("<") === -1)
        return b && xe ? b.createHTML(r) : r;
      if (n = St(r), !n)
        return fe ? null : xe ? x : "";
    }
    n && Xe && W(n.firstChild);
    const A = yt(Ae ? r : n);
    for (; h = A.nextNode(); )
      Ct(h), vt(h), h.content instanceof _ && qt(h.content);
    if (Ae)
      return r;
    if (fe) {
      if (we)
        for (R = T.call(n.ownerDocument); n.firstChild; )
          R.appendChild(n.firstChild);
      else
        R = n;
      return (S.shadowroot || S.shadowrootmode) && (R = oe.call(s, R, !0)), R;
    }
    let D = ae ? n.outerHTML : n.innerHTML;
    return ae && p["!doctype"] && n.ownerDocument && n.ownerDocument.doctype && n.ownerDocument.doctype.name && L(Gt, n.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + n.ownerDocument.doctype.name + `>
` + D), me && ze([Ee, _e, ce], (V) => {
      D = Ce(D, V, " ");
    }), b && xe ? b.createHTML(D) : D;
  }, t.setConfig = function() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ke(r), Ye = !0;
  }, t.clearConfig = function() {
    he = null, Ye = !1;
  }, t.isValidAttribute = function(r, e, n) {
    he || Ke({});
    const i = y(r), h = y(e);
    return Rt(i, h, n);
  }, t.addHook = function(r, e) {
    typeof e == "function" && Ne(N[r], e);
  }, t.removeHook = function(r, e) {
    if (e !== void 0) {
      const n = nn(N[r], e);
      return n === -1 ? void 0 : on(N[r], n, 1)[0];
    }
    return Mt(N[r]);
  }, t.removeHooks = function(r) {
    N[r] = [];
  }, t.removeAllHooks = function() {
    N = Ft();
  }, t;
}
var An = Wt();
const Rn = ({
  htmlContent: o
}) => {
  const t = An.sanitize(o);
  return /* @__PURE__ */ m("div", { dangerouslySetInnerHTML: { __html: t } });
}, Ln = ({
  height: o,
  width: t,
  borderRadius: a,
  darkMode: s = !1
}) => /* @__PURE__ */ m(
  "div",
  {
    className: `shimmer ${s ? "dark" : ""}`,
    style: {
      height: o,
      width: t,
      borderRadius: a
    }
  }
);
export {
  Nn as LightBox,
  Rn as RenderHtmlView,
  Cn as RichTextEditor,
  Ln as Shimmer
};
