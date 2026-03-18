import { jsxs as g, jsx as r, Fragment as Kt } from "react/jsx-runtime";
import { useState as Ce, useRef as we, useEffect as Ge } from "react";
const rt = (i) => {
  let t = 0, a = 0;
  return "touches" in i && i?.touches?.length ? (t = i?.touches?.[0]?.pageX, a = i?.touches?.[0]?.pageY) : "pageX" in i && (t = i?.pageX, a = i?.pageY), { x: t, y: a };
}, Pe = ({ condition: i, children: t }) => i ? /* @__PURE__ */ r(Kt, { children: t }) : null, Jt = (i, t) => i?.multi ? t?.images[i?.current]?.url ?? t?.images?.[i?.current] ?? "" : t?.image ?? "", vn = (i) => {
  const [t, a] = Ce({
    x: 0,
    y: 0,
    zoom: 1,
    rotate: 0,
    loading: !0,
    moving: !1,
    current: i?.imageIndex ?? 0,
    multi: Array.isArray(i?.images) && i?.images?.length > 1 && !i?.isOnlyOneImage
  }), c = 0.3, h = 4, C = we(0), z = we(0), ae = we(0), V = we(0), ne = we(null), he = (u, f, A, I) => `translate3d(${u}px,${f}px,0px) scale(${A}) rotate(${I}deg)`, ge = (u) => u.stopPropagation(), be = (u, f) => u?.multi ? f?.images[u?.current]?.title ?? "" : f?.title ?? "", Y = () => a({ ...t, x: 0, y: 0, zoom: 1 }), j = (u) => {
    const {
      zoomStep: f = c,
      allowZoom: A = !0,
      doubleClickZoom: I = h
    } = i;
    if (!A || !I) return !1;
    if (ge(u), t?.zoom > 1) return Y();
    const ee = (f < 1 ? Math.ceil(I / f) : f) * f, oe = rt(u), b = ne?.current?.getBoundingClientRect(), xe = b ? b?.x + b?.width / 2 : 0, y = b ? b?.y + b?.height / 2 : 0, Ne = (oe?.x - xe) * -1 * ee, E = (oe?.y - y) * -1 * ee;
    a({ ...t, x: Ne, y: E, zoom: ee });
  }, Te = (u, f) => {
    ge(f);
    let A = t?.current;
    const { images: I } = i, ee = (oe) => (I[oe]?.url ?? I[oe])?.toLowerCase().endsWith(".pdf");
    do
      u === "next" ? A = (A + 1) % I?.length : A = (A - 1 + I?.length) % I?.length;
    while (ee(A));
    a({
      ...t,
      current: A,
      x: 0,
      y: 0,
      zoom: 1,
      rotate: 0,
      loading: !0
    }), i?.onNavigateImage && i?.onNavigateImage(A);
  }, Ee = (u) => {
    if (t?.zoom <= 1) return;
    a({ ...t, moving: !0 });
    const f = rt(u);
    C.current = f?.x - t?.x, z.current = f?.y - t?.y;
  }, se = (u) => {
    if (!t?.moving) return;
    const f = rt(u);
    ae.current = f?.x - C?.current, V.current = f?.y - z?.current, a({
      ...t,
      x: f?.x - C?.current,
      y: f?.y - z?.current
    });
  }, ce = () => a({ ...t, moving: !1 }), ue = (u) => {
    const { zoomStep: f = c } = i;
    let A = t?.zoom;
    u === "in" ? A += f : u === "out" ? A -= f : Y(), a({
      ...t,
      zoom: A < 1 ? 1 : A,
      ...A === 1 && { x: 0, y: 0 }
    });
  }, v = (u) => {
    const f = u === "cw" ? 90 : -90;
    a({ ...t, rotate: t?.rotate + f });
  }, X = (u) => {
    ge(u), a({ ...t, x: 0, y: 0, zoom: 1, rotate: 0 });
  }, H = (u) => {
    i?.onClose ? i?.onClose(u) : console.error("No Exit function passed on prop: onClose.");
  }, me = () => t?.x || t?.y || t?.zoom !== 1 || t?.rotate !== 0, Z = (u) => {
    const { clickOutsideToExit: f = !0 } = i;
    f && t?.zoom <= 1 && H(u);
  };
  Ge(() => {
    document.body.classList.add("lb-open-lightbox");
    const { keyboardInteraction: u = !0 } = i, f = (A) => {
      u && A?.key === "Escape" && X(A);
    };
    return document.addEventListener("keyup", f), () => {
      document.body.classList.remove("lb-open-lightbox"), document.removeEventListener("keyup", f);
    };
  }, [i, t]);
  const ve = Jt(t, i), K = be(t, i);
  if (!ve)
    return console.warn("No image(s) supplied"), null;
  const { showTitle: R = !0, allowZoom: J = !0, allowRotate: Q = !0 } = i, Ae = me();
  return /* @__PURE__ */ g("div", { className: "lb-container", children: [
    /* @__PURE__ */ g("div", { className: "lb-header", children: [
      /* @__PURE__ */ r(Pe, { condition: R && K, children: /* @__PURE__ */ r("div", { className: "lb-title", children: /* @__PURE__ */ r("span", { title: K, className: "lb-title", children: K }) }) }),
      /* @__PURE__ */ r(Pe, { condition: X, children: /* @__PURE__ */ r(
        "div",
        {
          title: "Reset",
          className: `lb-button lb-icon-reset lb-hide-mobile reload ${Ae ? "" : "lb-disabled"}`,
          onClick: X
        }
      ) }),
      /* @__PURE__ */ g(Pe, { condition: t?.multi, children: [
        /* @__PURE__ */ r(
          "div",
          {
            title: "Previous",
            className: "lb-button lb-icon-arrow prev lb-hide-mobile",
            onClick: (u) => Te("prev", u)
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            title: "Next",
            className: "lb-button lb-icon-arrow next lb-hide-mobile",
            onClick: (u) => Te("next", u)
          }
        )
      ] }),
      /* @__PURE__ */ g(Pe, { condition: J, children: [
        /* @__PURE__ */ r(
          "div",
          {
            title: "Zoom In",
            className: "lb-button lb-icon-zoomin zoomin",
            onClick: () => ue("in")
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            title: "Zoom Out",
            className: `lb-button lb-icon-zoomout zoomout ${t?.zoom <= 1 ? "lb-disabled" : ""}`,
            onClick: () => ue("out")
          }
        )
      ] }),
      /* @__PURE__ */ g(Pe, { condition: Q, children: [
        /* @__PURE__ */ r(
          "div",
          {
            title: "Rotate left",
            className: "lb-button lb-icon-rotate rotatel",
            onClick: () => v("acw")
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            title: "Rotate right",
            className: "lb-button lb-icon-rotate rotater",
            onClick: () => v("cw")
          }
        )
      ] }),
      /* @__PURE__ */ r(
        "div",
        {
          title: "Close",
          className: "lb-button lb-icon-close close",
          onClick: (u) => H(u)
        }
      )
    ] }),
    /* @__PURE__ */ g(
      "div",
      {
        className: `lb-canvas${t?.loading ? " lb-loading" : ""}`,
        ref: ne,
        onClick: (u) => Z(u),
        children: [
          /* @__PURE__ */ r(
            "img",
            {
              draggable: "false",
              style: {
                transform: he(
                  t?.x,
                  t?.y,
                  t?.zoom,
                  t?.rotate
                ),
                cursor: t?.zoom > 1 ? "grab" : "unset",
                transition: t?.moving ? "none" : "all 0.1s"
              },
              onMouseDown: (u) => Ee(u),
              onTouchStart: (u) => Ee(u),
              onMouseMove: (u) => se(u),
              onTouchMove: (u) => se(u),
              onMouseUp: () => ce(),
              onMouseLeave: () => ce(),
              onTouchEnd: () => ce(),
              onClick: (u) => ge(u),
              onDoubleClick: (u) => j(u),
              onLoad: () => a({ ...t, loading: !1 }),
              className: `lb-img${t?.loading ? " lb-loading" : ""}`,
              title: K,
              src: ve,
              alt: K
            }
          ),
          /* @__PURE__ */ g("div", { className: "mobile-controls lb-show-mobile", children: [
            t?.multi ? /* @__PURE__ */ r(
              "div",
              {
                title: "Previous",
                className: "lb-button lb-icon-arrow prev",
                onClick: (u) => Te("prev", u)
              }
            ) : null,
            Ae ? /* @__PURE__ */ r(
              "div",
              {
                title: "Reset",
                className: "lb-button lb-icon-reset reload",
                onClick: X
              }
            ) : null,
            t?.multi ? /* @__PURE__ */ r(
              "div",
              {
                title: "Next",
                className: "lb-button lb-icon-arrow next",
                onClick: (u) => Te("next", u)
              }
            ) : null
          ] })
        ]
      }
    )
  ] });
}, Qt = ({
  isOpen: i,
  x: t,
  y: a,
  onAction: c
}) => i ? /* @__PURE__ */ g(
  "div",
  {
    className: "table-context-menu",
    style: {
      top: `${a}px`,
      left: `${t}px`
    },
    children: [
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("addRowAbove"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "6",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "11",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M8 1V5M6 3H10", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Row above" })
      ] }),
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("addRowBelow"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "2",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "7",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M8 11V15M6 13H10", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Row below" })
      ] }),
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("removeRow"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "2",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "11",
                  width: "12",
                  height: "3",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M5 8H11", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Remove row" })
      ] }),
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("addColLeft"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "6",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "11",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M1 8H5M3 6V10", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Column left" })
      ] }),
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("addColRight"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "7",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M11 8H15M13 6V10", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Column right" })
      ] }),
      /* @__PURE__ */ g("button", { type: "button", onClick: () => c("removeCol"), children: [
        /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "2",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r(
                "rect",
                {
                  x: "11",
                  y: "2",
                  width: "3",
                  height: "12",
                  rx: "0.6",
                  stroke: "currentColor"
                }
              ),
              /* @__PURE__ */ r("path", { d: "M6 8H10", stroke: "currentColor" })
            ]
          }
        ) }),
        /* @__PURE__ */ r("span", { children: "Remove column" })
      ] }),
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          className: "danger",
          onClick: () => c("removeTable"),
          children: [
            /* @__PURE__ */ r("span", { className: "menu-icon", "aria-hidden": "true", children: /* @__PURE__ */ g(
              "svg",
              {
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ r(
                    "rect",
                    {
                      x: "2",
                      y: "2",
                      width: "12",
                      height: "12",
                      rx: "1",
                      stroke: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ r("path", { d: "M5 5L11 11M11 5L5 11", stroke: "currentColor" })
                ]
              }
            ) }),
            /* @__PURE__ */ r("span", { children: "Remove table" })
          ]
        }
      )
    ]
  }
) : null, en = ({
  isOpen: i,
  rows: t,
  columns: a,
  error: c,
  onClose: h,
  onInsert: C,
  onRowsChange: z,
  onColumnsChange: ae
}) => i ? /* @__PURE__ */ r("div", { className: "table-dialog-overlay", onClick: h, children: /* @__PURE__ */ g(
  "div",
  {
    className: "table-dialog",
    onClick: (V) => V.stopPropagation(),
    children: [
      /* @__PURE__ */ r("h4", { children: "Insert table" }),
      /* @__PURE__ */ g("div", { className: "table-dialog-field", children: [
        /* @__PURE__ */ r("label", { htmlFor: "table-rows", children: "Rows" }),
        /* @__PURE__ */ r(
          "input",
          {
            id: "table-rows",
            type: "number",
            min: "1",
            max: "10",
            value: t,
            onChange: (V) => z(V.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ g("div", { className: "table-dialog-field", children: [
        /* @__PURE__ */ r("label", { htmlFor: "table-columns", children: "Columns" }),
        /* @__PURE__ */ r(
          "input",
          {
            id: "table-columns",
            type: "number",
            min: "1",
            max: "10",
            value: a,
            onChange: (V) => ae(V.target.value)
          }
        )
      ] }),
      c && /* @__PURE__ */ r("p", { className: "table-dialog-error", children: c }),
      /* @__PURE__ */ g("div", { className: "table-dialog-actions", children: [
        /* @__PURE__ */ r("button", { type: "button", onClick: h, children: "Cancel" }),
        /* @__PURE__ */ r("button", { type: "button", onClick: C, children: "Insert" })
      ] })
    ]
  }
) }) : null, xn = ({
  setHtmlContent: i,
  initialContent: t
}) => {
  const a = we(null), c = we(!1), [h, C] = Ce("Arial"), [z, ae] = Ce("2"), [V, ne] = Ce(/* @__PURE__ */ new Set()), [he, ge] = Ce(!1), be = we(null), [Y, j] = Ce({
    isOpen: !1,
    rows: "2",
    columns: "2"
  }), [Te, Ee] = Ce(""), [se, ce] = Ce({
    isOpen: !1,
    x: 0,
    y: 0,
    table: null,
    cell: null
  }), ue = [
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
  ], v = ["1", "2", "3", "4", "5", "6", "7", "8"], X = [
    { command: "bold", icon: "𝐁", title: "Bold" },
    { command: "italic", icon: "𝐼", title: "Italic" },
    { command: "underline", icon: "U̲", title: "Underline" },
    { command: "strikeThrough", icon: "S̶", title: "Strikethrough" },
    { command: "justifyLeft", icon: "≡", title: "Align Left" },
    { command: "justifyCenter", icon: "≡", title: "Align Center" },
    { command: "justifyRight", icon: "≡", title: "Align Right" },
    { command: "justifyFull", icon: "≡", title: "Justify" }
  ], H = () => {
    a?.current && i && i(a?.current?.innerHTML);
  }, me = () => {
    const n = ["bold", "italic", "underline", "strikeThrough"], l = /* @__PURE__ */ new Set();
    n.forEach((p) => {
      document.queryCommandState(p) && l.add(p);
    }), ne(l);
  }, Z = (n, l = void 0) => {
    document.execCommand(n, !1, l), a.current?.focus(), H(), me();
  }, ve = () => {
    const n = window.getSelection();
    if (!n || n.rangeCount === 0 || !a.current)
      return;
    const l = n.getRangeAt(0);
    a.current.contains(l.commonAncestorContainer) && (be.current = l.cloneRange());
  }, K = (n) => {
    const l = document.createRange(), p = window.getSelection();
    l.selectNodeContents(n), l.collapse(!1), p?.removeAllRanges(), p?.addRange(l);
  }, R = () => {
    const n = window.getSelection();
    return !n || !a.current ? !1 : be.current && a.current.contains(
      be.current.commonAncestorContainer
    ) ? (n.removeAllRanges(), n.addRange(be.current), !0) : (K(a.current), !0);
  }, J = () => {
    ce({
      isOpen: !1,
      x: 0,
      y: 0,
      table: null,
      cell: null
    });
  }, Q = (n) => {
    if (!n)
      return;
    n.innerHTML.trim() === "" && (n.innerHTML = "<br>");
    const l = document.createRange();
    l.selectNodeContents(n), l.collapse(!0);
    const p = window.getSelection();
    p?.removeAllRanges(), p?.addRange(l), a.current?.focus();
  }, Ae = (n) => {
    const l = n.parentElement, p = l?.parentElement;
    return !l || !p ? null : {
      rowIndex: Array.from(p.children).indexOf(l),
      columnIndex: Array.from(l.children).indexOf(n),
      row: l,
      section: p
    };
  }, u = (n) => {
    if (!n.tBodies.length && n.rows.length > 0) {
      const l = document.createElement("tbody");
      for (; n.firstChild; )
        l.appendChild(n.firstChild);
      n.appendChild(l);
    }
  }, f = (n) => {
    n.style.borderCollapse = "collapse", n.style.border = "1px solid #6b7280", n.style.width = "100%", Array.from(n.rows).forEach((l) => {
      Array.from(l.cells).forEach((p) => {
        p.style.border = "1px solid #6b7280", p.style.padding = "8px", p.style.verticalAlign = "top";
      });
    });
  }, A = (n, l) => {
    if (!a.current)
      return;
    R();
    const p = window.getSelection();
    if (!p || p.rangeCount === 0)
      return;
    const $ = p.getRangeAt(0), w = document.createElement("table"), x = document.createElement("tbody");
    w.className = "rte-table";
    for (let T = 0; T < n; T += 1) {
      const L = document.createElement("tr");
      for (let B = 0; B < l; B += 1) {
        const G = document.createElement("td");
        G.innerHTML = "<br>", L.appendChild(G);
      }
      x.appendChild(L);
    }
    w.appendChild(x), f(w);
    const S = document.createElement("p");
    S.innerHTML = "<br>", $.deleteContents(), $.insertNode(S), $.insertNode(w);
    const k = w.querySelector("td");
    k instanceof HTMLTableCellElement && Q(k), H(), J();
  }, I = () => {
    ve(), Ee(""), j((n) => ({ ...n, isOpen: !0 }));
  }, ee = () => {
    j((n) => ({ ...n, isOpen: !1 })), Ee("");
  }, oe = () => {
    const n = Number.parseInt(Y.rows, 10), l = Number.parseInt(Y.columns, 10);
    if (Number.isNaN(n) || Number.isNaN(l) || n < 1 || l < 1 || n > 10 || l > 10) {
      Ee("Rows and columns must be between 1 and 10.");
      return;
    }
    ee(), A(n, l);
  }, b = (n) => {
    const { table: l, cell: p } = se;
    if (!l || !p)
      return;
    u(l);
    const $ = Ae(p);
    if (!$)
      return;
    const { rowIndex: w, columnIndex: x, row: S, section: k } = $;
    if (n === "removeTable") {
      const T = l.nextElementSibling instanceof HTMLElement ? l.nextElementSibling : null;
      l.remove(), T && K(T), a.current?.focus(), H(), J();
      return;
    }
    if (n === "addRowAbove" || n === "addRowBelow") {
      const T = document.createElement("tr"), L = S.cells.length || 1;
      for (let B = 0; B < L; B += 1) {
        const G = document.createElement("td");
        G.innerHTML = "<br>", T.appendChild(G);
      }
      n === "addRowAbove" ? k.insertBefore(T, S) : k.insertBefore(T, S.nextSibling), Q(T.cells[x] ?? T.cells[0]);
    }
    if (n === "removeRow")
      if (k.children.length <= 1)
        l.remove(), a.current?.focus();
      else {
        const L = k.children[w + 1] ?? k.children[w - 1] ?? null;
        S.remove(), Q(L?.cells[x] ?? L?.cells[0] ?? null);
      }
    if (n === "addColLeft" || n === "addColRight") {
      const T = n === "addColLeft" ? x : x + 1;
      Array.from(l.rows).forEach((B) => {
        const G = B.insertCell(T);
        G.innerHTML = "<br>";
      });
      const L = l.rows[w];
      Q(L?.cells[T] ?? null);
    }
    if (n === "removeCol")
      if (S.cells.length <= 1)
        l.remove(), a.current?.focus();
      else {
        Array.from(l.rows).forEach((G) => {
          G.deleteCell(x);
        });
        const L = l.rows[w], B = Math.max(0, x - 1);
        Q(L?.cells[B] ?? L?.cells[0] ?? null);
      }
    f(l), H(), J();
  }, xe = () => {
    document.execCommand("insertOrderedList", !1);
    const n = window.getSelection();
    if (n && n.anchorNode) {
      let l = n.anchorNode;
      for (; l && l.nodeName !== "OL"; )
        l = l.parentNode;
      l && l instanceof HTMLElement && (l.style.listStyleType = "lower-alpha");
    }
    a.current?.focus(), H(), me();
  }, y = (n) => {
    const l = n.target.value;
    C(l), Z("fontName", l);
  }, Ne = (n) => {
    const l = n.target.value;
    ae(l), Z("fontSize", l);
  }, E = () => {
    H(), me();
  }, ye = (n) => {
    if (n.key !== "Enter" || n.shiftKey || !a.current)
      return;
    const p = window.getSelection()?.anchorNode;
    if (!p)
      return;
    const w = (p instanceof HTMLElement ? p : p.parentElement)?.closest(
      "li"
    );
    if (w && w.textContent?.trim() === "") {
      n.preventDefault();
      const x = w.closest("ul, ol");
      if (!x)
        return;
      const S = x.parentElement, k = S && S.tagName === "DIV" && S.parentElement === a.current ? S : x;
      w.remove(), x.children.length === 0 && x.remove();
      const T = document.createElement("div");
      T.style.margin = "0", T.style.padding = "0", k.isConnected ? k.insertAdjacentElement("afterend", T) : a.current.appendChild(T), K(T), H(), me();
    }
  }, De = () => {
    ge(!he);
  };
  Ge(() => {
    const n = () => {
      me();
    };
    return document.addEventListener("selectionchange", n), () => {
      document.removeEventListener("selectionchange", n);
    };
  }, []), Ge(() => {
    t && a?.current && !c.current && (a.current.innerHTML = t, c.current = !0);
  }, [t]), Ge(() => {
    const n = () => {
      ce(
        (l) => l.isOpen ? {
          isOpen: !1,
          x: 0,
          y: 0,
          table: null,
          cell: null
        } : l
      );
    };
    return document.addEventListener("click", n), document.addEventListener("scroll", n, !0), () => {
      document.removeEventListener("click", n), document.removeEventListener("scroll", n, !0);
    };
  }, []), Ge(() => {
    const n = (l) => {
      l.key === "Escape" && (J(), ee());
    };
    return document.addEventListener("keydown", n), () => {
      document.removeEventListener("keydown", n);
    };
  }, []);
  const _e = (n) => {
    const l = n.target;
    if (!l)
      return;
    const p = l.closest("td, th"), $ = l.closest("table");
    if (!p || !$) {
      J();
      return;
    }
    n.preventDefault(), ce({
      isOpen: !0,
      x: n.clientX,
      y: n.clientY,
      table: $,
      cell: p
    });
  };
  return /* @__PURE__ */ g("div", { className: `editor-wrapper ${he ? "dark-mode" : ""}`, children: [
    /* @__PURE__ */ g("div", { className: "toolbar", children: [
      /* @__PURE__ */ r("div", { className: "toolbar-group", children: X.slice(0, 4).map((n) => /* @__PURE__ */ r(
        "button",
        {
          className: `toolbar-btn ${V.has(n.command) ? "active" : ""}`,
          onClick: () => Z(n.command, n.value),
          title: n.title,
          type: "button",
          children: n.icon
        },
        n.command
      )) }),
      /* @__PURE__ */ g("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ r(
          "select",
          {
            className: "toolbar-select",
            value: h,
            onChange: y,
            title: "Font Family",
            children: ue.map((n) => /* @__PURE__ */ r(
              "option",
              {
                value: n.value,
                style: { fontFamily: n.value },
                children: n.label
              },
              n.label
            ))
          }
        ),
        /* @__PURE__ */ r(
          "select",
          {
            className: "toolbar-select size-select",
            value: z,
            onChange: Ne,
            title: "Font Size",
            children: v.map((n) => /* @__PURE__ */ r("option", { value: n, children: n }, n))
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "toolbar-group", children: X.slice(4).map((n) => /* @__PURE__ */ r(
        "button",
        {
          className: `toolbar-btn align-btn ${n.command}`,
          onClick: () => Z(n.command, n.value),
          title: n.title,
          type: "button",
          children: n.icon
        },
        n.command
      )) }),
      /* @__PURE__ */ g("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ r(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => Z("indent"),
            title: "Indent",
            type: "button",
            children: "⇥"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => Z("outdent"),
            title: "Outdent",
            type: "button",
            children: "⇤"
          }
        )
      ] }),
      /* @__PURE__ */ g("div", { className: "toolbar-group", children: [
        /* @__PURE__ */ r(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => Z("insertUnorderedList"),
            title: "Bullet List",
            type: "button",
            children: "•"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            className: "toolbar-btn",
            onClick: () => Z("insertOrderedList"),
            title: "Numbered List",
            type: "button",
            children: "1."
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            className: "toolbar-btn",
            onClick: xe,
            title: "Alphabetic List",
            type: "button",
            children: "a."
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "toolbar-group", children: /* @__PURE__ */ r(
        "button",
        {
          className: "toolbar-btn",
          onClick: I,
          title: "Table",
          type: "button",
          "aria-label": "Insert Table",
          children: /* @__PURE__ */ g(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ r(
                  "rect",
                  {
                    x: "1.5",
                    y: "1.5",
                    width: "13",
                    height: "13",
                    rx: "1.5",
                    stroke: "currentColor"
                  }
                ),
                /* @__PURE__ */ r("path", { d: "M1.5 8H14.5M8 1.5V14.5", stroke: "currentColor" })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "toolbar-group", children: /* @__PURE__ */ r(
        "button",
        {
          className: "toolbar-btn",
          onClick: De,
          title: he ? "Light Mode" : "Dark Mode",
          type: "button",
          children: he ? "☀️" : "🌙"
        }
      ) })
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: a,
        contentEditable: !0,
        onInput: E,
        onKeyDown: ye,
        onContextMenu: _e,
        className: "editor-area",
        suppressContentEditableWarning: !0
      }
    ),
    /* @__PURE__ */ r(
      en,
      {
        isOpen: Y.isOpen,
        rows: Y.rows,
        columns: Y.columns,
        error: Te,
        onClose: ee,
        onInsert: oe,
        onRowsChange: (n) => j((l) => ({
          ...l,
          rows: n
        })),
        onColumnsChange: (n) => j((l) => ({
          ...l,
          columns: n
        }))
      }
    ),
    /* @__PURE__ */ r(
      Qt,
      {
        isOpen: se.isOpen,
        x: se.x,
        y: se.y,
        onAction: b
      }
    )
  ] });
};
const {
  entries: zt,
  setPrototypeOf: Mt,
  isFrozen: tn,
  getPrototypeOf: nn,
  getOwnPropertyDescriptor: on
} = Object;
let {
  freeze: F,
  seal: q,
  create: mt
} = Object, {
  apply: dt,
  construct: ft
} = typeof Reflect < "u" && Reflect;
F || (F = function(t) {
  return t;
});
q || (q = function(t) {
  return t;
});
dt || (dt = function(t, a) {
  for (var c = arguments.length, h = new Array(c > 2 ? c - 2 : 0), C = 2; C < c; C++)
    h[C - 2] = arguments[C];
  return t.apply(a, h);
});
ft || (ft = function(t) {
  for (var a = arguments.length, c = new Array(a > 1 ? a - 1 : 0), h = 1; h < a; h++)
    c[h - 1] = arguments[h];
  return new t(...c);
});
const Ve = U(Array.prototype.forEach), rn = U(Array.prototype.lastIndexOf), Ot = U(Array.prototype.pop), Fe = U(Array.prototype.push), ln = U(Array.prototype.splice), Ze = U(String.prototype.toLowerCase), it = U(String.prototype.toString), lt = U(String.prototype.match), Ue = U(String.prototype.replace), an = U(String.prototype.indexOf), sn = U(String.prototype.trim), te = U(Object.prototype.hasOwnProperty), P = U(RegExp.prototype.test), ze = cn(TypeError);
function U(i) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var a = arguments.length, c = new Array(a > 1 ? a - 1 : 0), h = 1; h < a; h++)
      c[h - 1] = arguments[h];
    return dt(i, t, c);
  };
}
function cn(i) {
  return function() {
    for (var t = arguments.length, a = new Array(t), c = 0; c < t; c++)
      a[c] = arguments[c];
    return ft(i, a);
  };
}
function d(i, t) {
  let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ze;
  Mt && Mt(i, null);
  let c = t.length;
  for (; c--; ) {
    let h = t[c];
    if (typeof h == "string") {
      const C = a(h);
      C !== h && (tn(t) || (t[c] = C), h = C);
    }
    i[h] = !0;
  }
  return i;
}
function un(i) {
  for (let t = 0; t < i.length; t++)
    te(i, t) || (i[t] = null);
  return i;
}
function le(i) {
  const t = mt(null);
  for (const [a, c] of zt(i))
    te(i, a) && (Array.isArray(c) ? t[a] = un(c) : c && typeof c == "object" && c.constructor === Object ? t[a] = le(c) : t[a] = c);
  return t;
}
function He(i, t) {
  for (; i !== null; ) {
    const c = on(i, t);
    if (c) {
      if (c.get)
        return U(c.get);
      if (typeof c.value == "function")
        return U(c.value);
    }
    i = nn(i);
  }
  function a() {
    return null;
  }
  return a;
}
const Dt = F(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), at = F(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), st = F(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), mn = F(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ct = F(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), dn = F(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), It = F(["#text"]), kt = F(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), ut = F(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pt = F(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), je = F(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), fn = q(/\{\{[\w\W]*|[\w\W]*\}\}/gm), pn = q(/<%[\w\W]*|[\w\W]*%>/gm), hn = q(/\$\{[\w\W]*/gm), gn = q(/^data-[\-\w.\u00B7-\uFFFF]+$/), bn = q(/^aria-[\-\w]+$/), Ht = q(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Tn = q(/^(?:\w+script|data):/i), En = q(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Bt = q(/^html$/i), An = q(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ft = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: bn,
  ATTR_WHITESPACE: En,
  CUSTOM_ELEMENT: An,
  DATA_ATTR: gn,
  DOCTYPE_NAME: Bt,
  ERB_EXPR: pn,
  IS_ALLOWED_URI: Ht,
  IS_SCRIPT_OR_DATA: Tn,
  MUSTACHE_EXPR: fn,
  TMPLIT_EXPR: hn
});
const Be = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, _n = function() {
  return typeof window > "u" ? null : window;
}, Cn = function(t, a) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let c = null;
  const h = "data-tt-policy-suffix";
  a && a.hasAttribute(h) && (c = a.getAttribute(h));
  const C = "dompurify" + (c ? "#" + c : "");
  try {
    return t.createPolicy(C, {
      createHTML(z) {
        return z;
      },
      createScriptURL(z) {
        return z;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + C + " could not be created."), null;
  }
}, Ut = function() {
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
function Gt() {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _n();
  const t = (m) => Gt(m);
  if (t.version = "3.3.1", t.removed = [], !i || !i.document || i.document.nodeType !== Be.document || !i.Element)
    return t.isSupported = !1, t;
  let {
    document: a
  } = i;
  const c = a, h = c.currentScript, {
    DocumentFragment: C,
    HTMLTemplateElement: z,
    Node: ae,
    Element: V,
    NodeFilter: ne,
    NamedNodeMap: he = i.NamedNodeMap || i.MozNamedAttrMap,
    HTMLFormElement: ge,
    DOMParser: be,
    trustedTypes: Y
  } = i, j = V.prototype, Te = He(j, "cloneNode"), Ee = He(j, "remove"), se = He(j, "nextSibling"), ce = He(j, "childNodes"), ue = He(j, "parentNode");
  if (typeof z == "function") {
    const m = a.createElement("template");
    m.content && m.content.ownerDocument && (a = m.content.ownerDocument);
  }
  let v, X = "";
  const {
    implementation: H,
    createNodeIterator: me,
    createDocumentFragment: Z,
    getElementsByTagName: ve
  } = a, {
    importNode: K
  } = c;
  let R = Ut();
  t.isSupported = typeof zt == "function" && typeof ue == "function" && H && H.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: J,
    ERB_EXPR: Q,
    TMPLIT_EXPR: Ae,
    DATA_ATTR: u,
    ARIA_ATTR: f,
    IS_SCRIPT_OR_DATA: A,
    ATTR_WHITESPACE: I,
    CUSTOM_ELEMENT: ee
  } = Ft;
  let {
    IS_ALLOWED_URI: oe
  } = Ft, b = null;
  const xe = d({}, [...Dt, ...at, ...st, ...ct, ...It]);
  let y = null;
  const Ne = d({}, [...kt, ...ut, ...Pt, ...je]);
  let E = Object.seal(mt(null, {
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
  })), ye = null, De = null;
  const _e = Object.seal(mt(null, {
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
  let n = !0, l = !0, p = !1, $ = !0, w = !1, x = !0, S = !1, k = !1, T = !1, L = !1, B = !1, G = !1, pt = !0, ht = !1;
  const Wt = "user-content-";
  let qe = !0, Ie = !1, Re = {}, re = null;
  const Ke = d({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let gt = null;
  const bt = d({}, ["audio", "video", "img", "source", "image", "track"]);
  let Je = null;
  const Tt = d({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), We = "http://www.w3.org/1998/Math/MathML", Ye = "http://www.w3.org/2000/svg", de = "http://www.w3.org/1999/xhtml";
  let Le = de, Qe = !1, et = null;
  const Yt = d({}, [We, Ye, de], it);
  let Xe = d({}, ["mi", "mo", "mn", "ms", "mtext"]), $e = d({}, ["annotation-xml"]);
  const Xt = d({}, ["title", "style", "font", "a", "script"]);
  let ke = null;
  const $t = ["application/xhtml+xml", "text/html"], Vt = "text/html";
  let M = null, Me = null;
  const jt = a.createElement("form"), Et = function(e) {
    return e instanceof RegExp || e instanceof Function;
  }, tt = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Me && Me === e)) {
      if ((!e || typeof e != "object") && (e = {}), e = le(e), ke = // eslint-disable-next-line unicorn/prefer-includes
      $t.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? Vt : e.PARSER_MEDIA_TYPE, M = ke === "application/xhtml+xml" ? it : Ze, b = te(e, "ALLOWED_TAGS") ? d({}, e.ALLOWED_TAGS, M) : xe, y = te(e, "ALLOWED_ATTR") ? d({}, e.ALLOWED_ATTR, M) : Ne, et = te(e, "ALLOWED_NAMESPACES") ? d({}, e.ALLOWED_NAMESPACES, it) : Yt, Je = te(e, "ADD_URI_SAFE_ATTR") ? d(le(Tt), e.ADD_URI_SAFE_ATTR, M) : Tt, gt = te(e, "ADD_DATA_URI_TAGS") ? d(le(bt), e.ADD_DATA_URI_TAGS, M) : bt, re = te(e, "FORBID_CONTENTS") ? d({}, e.FORBID_CONTENTS, M) : Ke, ye = te(e, "FORBID_TAGS") ? d({}, e.FORBID_TAGS, M) : le({}), De = te(e, "FORBID_ATTR") ? d({}, e.FORBID_ATTR, M) : le({}), Re = te(e, "USE_PROFILES") ? e.USE_PROFILES : !1, n = e.ALLOW_ARIA_ATTR !== !1, l = e.ALLOW_DATA_ATTR !== !1, p = e.ALLOW_UNKNOWN_PROTOCOLS || !1, $ = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, w = e.SAFE_FOR_TEMPLATES || !1, x = e.SAFE_FOR_XML !== !1, S = e.WHOLE_DOCUMENT || !1, L = e.RETURN_DOM || !1, B = e.RETURN_DOM_FRAGMENT || !1, G = e.RETURN_TRUSTED_TYPE || !1, T = e.FORCE_BODY || !1, pt = e.SANITIZE_DOM !== !1, ht = e.SANITIZE_NAMED_PROPS || !1, qe = e.KEEP_CONTENT !== !1, Ie = e.IN_PLACE || !1, oe = e.ALLOWED_URI_REGEXP || Ht, Le = e.NAMESPACE || de, Xe = e.MATHML_TEXT_INTEGRATION_POINTS || Xe, $e = e.HTML_INTEGRATION_POINTS || $e, E = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && Et(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Et(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), w && (l = !1), B && (L = !0), Re && (b = d({}, It), y = [], Re.html === !0 && (d(b, Dt), d(y, kt)), Re.svg === !0 && (d(b, at), d(y, ut), d(y, je)), Re.svgFilters === !0 && (d(b, st), d(y, ut), d(y, je)), Re.mathMl === !0 && (d(b, ct), d(y, Pt), d(y, je))), e.ADD_TAGS && (typeof e.ADD_TAGS == "function" ? _e.tagCheck = e.ADD_TAGS : (b === xe && (b = le(b)), d(b, e.ADD_TAGS, M))), e.ADD_ATTR && (typeof e.ADD_ATTR == "function" ? _e.attributeCheck = e.ADD_ATTR : (y === Ne && (y = le(y)), d(y, e.ADD_ATTR, M))), e.ADD_URI_SAFE_ATTR && d(Je, e.ADD_URI_SAFE_ATTR, M), e.FORBID_CONTENTS && (re === Ke && (re = le(re)), d(re, e.FORBID_CONTENTS, M)), e.ADD_FORBID_CONTENTS && (re === Ke && (re = le(re)), d(re, e.ADD_FORBID_CONTENTS, M)), qe && (b["#text"] = !0), S && d(b, ["html", "head", "body"]), b.table && (d(b, ["tbody"]), delete ye.tbody), e.TRUSTED_TYPES_POLICY) {
        if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        v = e.TRUSTED_TYPES_POLICY, X = v.createHTML("");
      } else
        v === void 0 && (v = Cn(Y, h)), v !== null && typeof X == "string" && (X = v.createHTML(""));
      F && F(e), Me = e;
    }
  }, At = d({}, [...at, ...st, ...mn]), _t = d({}, [...ct, ...dn]), Zt = function(e) {
    let o = ue(e);
    (!o || !o.tagName) && (o = {
      namespaceURI: Le,
      tagName: "template"
    });
    const s = Ze(e.tagName), _ = Ze(o.tagName);
    return et[e.namespaceURI] ? e.namespaceURI === Ye ? o.namespaceURI === de ? s === "svg" : o.namespaceURI === We ? s === "svg" && (_ === "annotation-xml" || Xe[_]) : !!At[s] : e.namespaceURI === We ? o.namespaceURI === de ? s === "math" : o.namespaceURI === Ye ? s === "math" && $e[_] : !!_t[s] : e.namespaceURI === de ? o.namespaceURI === Ye && !$e[_] || o.namespaceURI === We && !Xe[_] ? !1 : !_t[s] && (Xt[s] || !At[s]) : !!(ke === "application/xhtml+xml" && et[e.namespaceURI]) : !1;
  }, ie = function(e) {
    Fe(t.removed, {
      element: e
    });
    try {
      ue(e).removeChild(e);
    } catch {
      Ee(e);
    }
  }, Se = function(e, o) {
    try {
      Fe(t.removed, {
        attribute: o.getAttributeNode(e),
        from: o
      });
    } catch {
      Fe(t.removed, {
        attribute: null,
        from: o
      });
    }
    if (o.removeAttribute(e), e === "is")
      if (L || B)
        try {
          ie(o);
        } catch {
        }
      else
        try {
          o.setAttribute(e, "");
        } catch {
        }
  }, Ct = function(e) {
    let o = null, s = null;
    if (T)
      e = "<remove></remove>" + e;
    else {
      const N = lt(e, /^[\r\n\t ]+/);
      s = N && N[0];
    }
    ke === "application/xhtml+xml" && Le === de && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
    const _ = v ? v.createHTML(e) : e;
    if (Le === de)
      try {
        o = new be().parseFromString(_, ke);
      } catch {
      }
    if (!o || !o.documentElement) {
      o = H.createDocument(Le, "template", null);
      try {
        o.documentElement.innerHTML = Qe ? X : _;
      } catch {
      }
    }
    const D = o.body || o.documentElement;
    return e && s && D.insertBefore(a.createTextNode(s), D.childNodes[0] || null), Le === de ? ve.call(o, S ? "html" : "body")[0] : S ? o.documentElement : D;
  }, wt = function(e) {
    return me.call(
      e.ownerDocument || e,
      e,
      // eslint-disable-next-line no-bitwise
      ne.SHOW_ELEMENT | ne.SHOW_COMMENT | ne.SHOW_TEXT | ne.SHOW_PROCESSING_INSTRUCTION | ne.SHOW_CDATA_SECTION,
      null
    );
  }, nt = function(e) {
    return e instanceof ge && (typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || !(e.attributes instanceof he) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function");
  }, yt = function(e) {
    return typeof ae == "function" && e instanceof ae;
  };
  function fe(m, e, o) {
    Ve(m, (s) => {
      s.call(t, e, o, Me);
    });
  }
  const St = function(e) {
    let o = null;
    if (fe(R.beforeSanitizeElements, e, null), nt(e))
      return ie(e), !0;
    const s = M(e.nodeName);
    if (fe(R.uponSanitizeElement, e, {
      tagName: s,
      allowedTags: b
    }), x && e.hasChildNodes() && !yt(e.firstElementChild) && P(/<[/\w!]/g, e.innerHTML) && P(/<[/\w!]/g, e.textContent) || e.nodeType === Be.progressingInstruction || x && e.nodeType === Be.comment && P(/<[/\w]/g, e.data))
      return ie(e), !0;
    if (!(_e.tagCheck instanceof Function && _e.tagCheck(s)) && (!b[s] || ye[s])) {
      if (!ye[s] && xt(s) && (E.tagNameCheck instanceof RegExp && P(E.tagNameCheck, s) || E.tagNameCheck instanceof Function && E.tagNameCheck(s)))
        return !1;
      if (qe && !re[s]) {
        const _ = ue(e) || e.parentNode, D = ce(e) || e.childNodes;
        if (D && _) {
          const N = D.length;
          for (let W = N - 1; W >= 0; --W) {
            const pe = Te(D[W], !0);
            pe.__removalCount = (e.__removalCount || 0) + 1, _.insertBefore(pe, se(e));
          }
        }
      }
      return ie(e), !0;
    }
    return e instanceof V && !Zt(e) || (s === "noscript" || s === "noembed" || s === "noframes") && P(/<\/no(script|embed|frames)/i, e.innerHTML) ? (ie(e), !0) : (w && e.nodeType === Be.text && (o = e.textContent, Ve([J, Q, Ae], (_) => {
      o = Ue(o, _, " ");
    }), e.textContent !== o && (Fe(t.removed, {
      element: e.cloneNode()
    }), e.textContent = o)), fe(R.afterSanitizeElements, e, null), !1);
  }, vt = function(e, o, s) {
    if (pt && (o === "id" || o === "name") && (s in a || s in jt))
      return !1;
    if (!(l && !De[o] && P(u, o))) {
      if (!(n && P(f, o))) {
        if (!(_e.attributeCheck instanceof Function && _e.attributeCheck(o, e))) {
          if (!y[o] || De[o]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(xt(e) && (E.tagNameCheck instanceof RegExp && P(E.tagNameCheck, e) || E.tagNameCheck instanceof Function && E.tagNameCheck(e)) && (E.attributeNameCheck instanceof RegExp && P(E.attributeNameCheck, o) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(o, e)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              o === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && P(E.tagNameCheck, s) || E.tagNameCheck instanceof Function && E.tagNameCheck(s)))
            ) return !1;
          } else if (!Je[o]) {
            if (!P(oe, Ue(s, I, ""))) {
              if (!((o === "src" || o === "xlink:href" || o === "href") && e !== "script" && an(s, "data:") === 0 && gt[e])) {
                if (!(p && !P(A, Ue(s, I, "")))) {
                  if (s)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, xt = function(e) {
    return e !== "annotation-xml" && lt(e, ee);
  }, Nt = function(e) {
    fe(R.beforeSanitizeAttributes, e, null);
    const {
      attributes: o
    } = e;
    if (!o || nt(e))
      return;
    const s = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: y,
      forceKeepAttr: void 0
    };
    let _ = o.length;
    for (; _--; ) {
      const D = o[_], {
        name: N,
        namespaceURI: W,
        value: pe
      } = D, Oe = M(N), ot = pe;
      let O = N === "value" ? ot : sn(ot);
      if (s.attrName = Oe, s.attrValue = O, s.keepAttr = !0, s.forceKeepAttr = void 0, fe(R.uponSanitizeAttribute, e, s), O = s.attrValue, ht && (Oe === "id" || Oe === "name") && (Se(N, e), O = Wt + O), x && P(/((--!?|])>)|<\/(style|title|textarea)/i, O)) {
        Se(N, e);
        continue;
      }
      if (Oe === "attributename" && lt(O, "href")) {
        Se(N, e);
        continue;
      }
      if (s.forceKeepAttr)
        continue;
      if (!s.keepAttr) {
        Se(N, e);
        continue;
      }
      if (!$ && P(/\/>/i, O)) {
        Se(N, e);
        continue;
      }
      w && Ve([J, Q, Ae], (Lt) => {
        O = Ue(O, Lt, " ");
      });
      const Rt = M(e.nodeName);
      if (!vt(Rt, Oe, O)) {
        Se(N, e);
        continue;
      }
      if (v && typeof Y == "object" && typeof Y.getAttributeType == "function" && !W)
        switch (Y.getAttributeType(Rt, Oe)) {
          case "TrustedHTML": {
            O = v.createHTML(O);
            break;
          }
          case "TrustedScriptURL": {
            O = v.createScriptURL(O);
            break;
          }
        }
      if (O !== ot)
        try {
          W ? e.setAttributeNS(W, N, O) : e.setAttribute(N, O), nt(e) ? ie(e) : Ot(t.removed);
        } catch {
          Se(N, e);
        }
    }
    fe(R.afterSanitizeAttributes, e, null);
  }, qt = function m(e) {
    let o = null;
    const s = wt(e);
    for (fe(R.beforeSanitizeShadowDOM, e, null); o = s.nextNode(); )
      fe(R.uponSanitizeShadowNode, o, null), St(o), Nt(o), o.content instanceof C && m(o.content);
    fe(R.afterSanitizeShadowDOM, e, null);
  };
  return t.sanitize = function(m) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = null, s = null, _ = null, D = null;
    if (Qe = !m, Qe && (m = "<!-->"), typeof m != "string" && !yt(m))
      if (typeof m.toString == "function") {
        if (m = m.toString(), typeof m != "string")
          throw ze("dirty is not a string, aborting");
      } else
        throw ze("toString is not a function");
    if (!t.isSupported)
      return m;
    if (k || tt(e), t.removed = [], typeof m == "string" && (Ie = !1), Ie) {
      if (m.nodeName) {
        const pe = M(m.nodeName);
        if (!b[pe] || ye[pe])
          throw ze("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (m instanceof ae)
      o = Ct("<!---->"), s = o.ownerDocument.importNode(m, !0), s.nodeType === Be.element && s.nodeName === "BODY" || s.nodeName === "HTML" ? o = s : o.appendChild(s);
    else {
      if (!L && !w && !S && // eslint-disable-next-line unicorn/prefer-includes
      m.indexOf("<") === -1)
        return v && G ? v.createHTML(m) : m;
      if (o = Ct(m), !o)
        return L ? null : G ? X : "";
    }
    o && T && ie(o.firstChild);
    const N = wt(Ie ? m : o);
    for (; _ = N.nextNode(); )
      St(_), Nt(_), _.content instanceof C && qt(_.content);
    if (Ie)
      return m;
    if (L) {
      if (B)
        for (D = Z.call(o.ownerDocument); o.firstChild; )
          D.appendChild(o.firstChild);
      else
        D = o;
      return (y.shadowroot || y.shadowrootmode) && (D = K.call(c, D, !0)), D;
    }
    let W = S ? o.outerHTML : o.innerHTML;
    return S && b["!doctype"] && o.ownerDocument && o.ownerDocument.doctype && o.ownerDocument.doctype.name && P(Bt, o.ownerDocument.doctype.name) && (W = "<!DOCTYPE " + o.ownerDocument.doctype.name + `>
` + W), w && Ve([J, Q, Ae], (pe) => {
      W = Ue(W, pe, " ");
    }), v && G ? v.createHTML(W) : W;
  }, t.setConfig = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    tt(m), k = !0;
  }, t.clearConfig = function() {
    Me = null, k = !1;
  }, t.isValidAttribute = function(m, e, o) {
    Me || tt({});
    const s = M(m), _ = M(e);
    return vt(s, _, o);
  }, t.addHook = function(m, e) {
    typeof e == "function" && Fe(R[m], e);
  }, t.removeHook = function(m, e) {
    if (e !== void 0) {
      const o = rn(R[m], e);
      return o === -1 ? void 0 : ln(R[m], o, 1)[0];
    }
    return Ot(R[m]);
  }, t.removeHooks = function(m) {
    R[m] = [];
  }, t.removeAllHooks = function() {
    R = Ut();
  }, t;
}
var wn = Gt();
const Nn = ({
  htmlContent: i
}) => {
  const t = wn.sanitize(i);
  return /* @__PURE__ */ r("div", { dangerouslySetInnerHTML: { __html: t } });
}, Rn = ({
  height: i,
  width: t,
  borderRadius: a,
  darkMode: c = !1
}) => /* @__PURE__ */ r(
  "div",
  {
    className: `shimmer ${c ? "dark" : ""}`,
    style: {
      height: i,
      width: t,
      borderRadius: a
    }
  }
);
export {
  vn as LightBox,
  Nn as RenderHtmlView,
  xn as RichTextEditor,
  Rn as Shimmer
};
