var Zepto = function() {
function e(e) {
return e == null ? String(e) : $[J.call(e)] || "object";
}
function t(t) {
return e(t) == "function";
}
function n(e) {
return e != null && e == e.window;
}
function r(e) {
return e != null && e.nodeType == e.DOCUMENT_NODE;
}
function i(t) {
return e(t) == "object";
}
function s(e) {
return i(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype;
}
function o(e) {
return e instanceof Array;
}
function u(e) {
return typeof e.length == "number";
}
function a(e) {
return L.call(e, function(e) {
return e != null;
});
}
function f(e) {
return e.length > 0 ? T.fn.concat.apply([], e) : e;
}
function l(e) {
return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
}
function c(e) {
return e in M ? M[e] : M[e] = new RegExp("(^|\\s)" + e + "(\\s|$)");
}
function h(e, t) {
return typeof t == "number" && !_[l(e)] ? t + "px" : t;
}
function p(e) {
var t, n;
return O[e] || (t = A.createElement(e), A.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), O[e] = n), O[e];
}
function d(e) {
return "children" in e ? k.call(e.children) : T.map(e.childNodes, function(e) {
if (e.nodeType == 1) return e;
});
}
function v(e, t, n) {
for (x in t) n && (s(t[x]) || o(t[x])) ? (s(t[x]) && !s(e[x]) && (e[x] = {}), o(t[x]) && !o(e[x]) && (e[x] = []), v(e[x], t[x], n)) : t[x] !== S && (e[x] = t[x]);
}
function m(e, t) {
return t == null ? T(e) : T(e).filter(t);
}
function g(e, n, r, i) {
return t(n) ? n.call(e, r, i) : n;
}
function y(e, t, n) {
n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function b(e, t) {
var n = e.className, r = n && n.baseVal !== S;
if (t === S) return r ? n.baseVal : n;
r ? n.baseVal = t : e.className = t;
}
function w(e) {
var t;
try {
return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : !/^0/.test(e) && !isNaN(t = Number(e)) ? t : /^[\[\{]/.test(e) ? T.parseJSON(e) : e) : e;
} catch (n) {
return e;
}
}
function E(e, t) {
t(e);
for (var n in e.childNodes) E(e.childNodes[n], t);
}
var S, x, T, N, C = [], k = C.slice, L = C.filter, A = window.document, O = {}, M = {}, _ = {
"column-count": 1,
columns: 1,
"font-weight": 1,
"line-height": 1,
opacity: 1,
"z-index": 1,
zoom: 1
}, D = /^\s*<(\w+|!)[^>]*>/, P = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, H = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, B = /^(?:body|html)$/i, j = /([A-Z])/g, F = [ "val", "css", "html", "text", "data", "width", "height", "offset" ], I = [ "after", "prepend", "before", "append" ], q = A.createElement("table"), R = A.createElement("tr"), U = {
tr: A.createElement("tbody"),
tbody: q,
thead: q,
tfoot: q,
td: R,
th: R,
"*": A.createElement("div")
}, z = /complete|loaded|interactive/, W = /^\.([\w-]+)$/, X = /^#([\w-]*)$/, V = /^[\w-]*$/, $ = {}, J = $.toString, K = {}, Q, G, Y = A.createElement("div"), Z = {
tabindex: "tabIndex",
readonly: "readOnly",
"for": "htmlFor",
"class": "className",
maxlength: "maxLength",
cellspacing: "cellSpacing",
cellpadding: "cellPadding",
rowspan: "rowSpan",
colspan: "colSpan",
usemap: "useMap",
frameborder: "frameBorder",
contenteditable: "contentEditable"
};
return K.matches = function(e, t) {
if (!t || !e || e.nodeType !== 1) return !1;
var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
if (n) return n.call(e, t);
var r, i = e.parentNode, s = !i;
return s && (i = Y).appendChild(e), r = ~K.qsa(i, t).indexOf(e), s && Y.removeChild(e), r;
}, Q = function(e) {
return e.replace(/-+(.)?/g, function(e, t) {
return t ? t.toUpperCase() : "";
});
}, G = function(e) {
return L.call(e, function(t, n) {
return e.indexOf(t) == n;
});
}, K.fragment = function(e, t, n) {
var r, i, o;
return P.test(e) && (r = T(A.createElement(RegExp.$1))), r || (e.replace && (e = e.replace(H, "<$1></$2>")), t === S && (t = D.test(e) && RegExp.$1), t in U || (t = "*"), o = U[t], o.innerHTML = "" + e, r = T.each(k.call(o.childNodes), function() {
o.removeChild(this);
})), s(n) && (i = T(r), T.each(n, function(e, t) {
F.indexOf(e) > -1 ? i[e](t) : i.attr(e, t);
})), r;
}, K.Z = function(e, t) {
e = e || [];
if (window.attachEvent) for (var n in T.fn) e[n] = T.fn[n]; else e.__proto__ = T.fn;
return e.selector = t || "", e;
}, K.isZ = function(e) {
return e instanceof K.Z;
}, K.init = function(e, n) {
var r;
if (!e) return K.Z();
if (typeof e == "string") {
e = e.trim();
if (e[0] == "<" && D.test(e)) r = K.fragment(e, RegExp.$1, n), e = null; else {
if (n !== S) return T(n).find(e);
r = K.qsa(A, e);
}
} else {
if (t(e)) return T(A).ready(e);
if (K.isZ(e)) return e;
if (o(e)) r = a(e); else if (i(e)) r = [ e ], e = null; else if (D.test(e)) r = K.fragment(e.trim(), RegExp.$1, n), e = null; else {
if (n !== S) return T(n).find(e);
r = K.qsa(A, e);
}
}
return K.Z(r, e);
}, T = function(e, t) {
return K.init(e, t);
}, T.extend = function(e) {
var t, n = k.call(arguments, 1);
return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function(n) {
v(e, n, t);
}), e;
}, K.qsa = function(e, t) {
var n, i = t[0] == "#", s = !i && t[0] == ".", o = i || s ? t.slice(1) : t, u = V.test(o);
return r(e) && u && i ? (n = e.getElementById(o)) ? [ n ] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : k.call(u && !i ? s ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t));
}, T.contains = function(e, t) {
return e !== t && e.contains(t);
}, T.type = e, T.isFunction = t, T.isWindow = n, T.isArray = o, T.isPlainObject = s, T.isEmptyObject = function(e) {
var t;
for (t in e) return !1;
return !0;
}, T.inArray = function(e, t, n) {
return C.indexOf.call(t, e, n);
}, T.camelCase = Q, T.trim = function(e) {
return e == null ? "" : String.prototype.trim.call(e);
}, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function(e, t) {
var n, r = [], i, s;
if (u(e)) for (i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n); else for (s in e) n = t(e[s], s), n != null && r.push(n);
return f(r);
}, T.each = function(e, t) {
var n, r;
if (u(e)) {
for (n = 0; n < e.length; n++) if (t.call(e[n], n, e[n]) === !1) return e;
} else for (r in e) if (t.call(e[r], r, e[r]) === !1) return e;
return e;
}, T.grep = function(e, t) {
return L.call(e, t);
}, window.JSON && (T.parseJSON = JSON.parse), T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
$["[object " + t + "]"] = t.toLowerCase();
}), T.fn = {
forEach: C.forEach,
reduce: C.reduce,
push: C.push,
sort: C.sort,
indexOf: C.indexOf,
concat: C.concat,
map: function(e) {
return T(T.map(this, function(t, n) {
return e.call(t, n, t);
}));
},
slice: function() {
return T(k.apply(this, arguments));
},
ready: function(e) {
return z.test(A.readyState) && A.body ? e(T) : A.addEventListener("DOMContentLoaded", function() {
e(T);
}, !1), this;
},
get: function(e) {
return e === S ? k.call(this) : this[e >= 0 ? e : e + this.length];
},
toArray: function() {
return this.get();
},
size: function() {
return this.length;
},
remove: function() {
return this.each(function() {
this.parentNode != null && this.parentNode.removeChild(this);
});
},
each: function(e) {
return C.every.call(this, function(t, n) {
return e.call(t, n, t) !== !1;
}), this;
},
filter: function(e) {
return t(e) ? this.not(this.not(e)) : T(L.call(this, function(t) {
return K.matches(t, e);
}));
},
add: function(e, t) {
return T(G(this.concat(T(e, t))));
},
is: function(e) {
return this.length > 0 && K.matches(this[0], e);
},
not: function(e) {
var n = [];
if (t(e) && e.call !== S) this.each(function(t) {
e.call(this, t) || n.push(this);
}); else {
var r = typeof e == "string" ? this.filter(e) : u(e) && t(e.item) ? k.call(e) : T(e);
this.forEach(function(e) {
r.indexOf(e) < 0 && n.push(e);
});
}
return T(n);
},
has: function(e) {
return this.filter(function() {
return i(e) ? T.contains(this, e) : T(this).find(e).size();
});
},
eq: function(e) {
return e === -1 ? this.slice(e) : this.slice(e, +e + 1);
},
first: function() {
var e = this[0];
return e && !i(e) ? e : T(e);
},
last: function() {
var e = this[this.length - 1];
return e && !i(e) ? e : T(e);
},
find: function(e) {
var t, n = this;
return typeof e == "object" ? t = T(e).filter(function() {
var e = this;
return C.some.call(n, function(t) {
return T.contains(t, e);
});
}) : this.length == 1 ? t = T(K.qsa(this[0], e)) : t = this.map(function() {
return K.qsa(this, e);
}), t;
},
closest: function(e, t) {
var n = this[0], i = !1;
typeof e == "object" && (i = T(e));
while (n && !(i ? i.indexOf(n) >= 0 : K.matches(n, e))) n = n !== t && !r(n) && n.parentNode;
return T(n);
},
parents: function(e) {
var t = [], n = this;
while (n.length > 0) n = T.map(n, function(e) {
if ((e = e.parentNode) && !r(e) && t.indexOf(e) < 0) return t.push(e), e;
});
return m(t, e);
},
parent: function(e) {
return m(G(this.pluck("parentNode")), e);
},
children: function(e) {
return m(this.map(function() {
return d(this);
}), e);
},
contents: function() {
return this.map(function() {
return k.call(this.childNodes);
});
},
siblings: function(e) {
return m(this.map(function(e, t) {
return L.call(d(t.parentNode), function(e) {
return e !== t;
});
}), e);
},
empty: function() {
return this.each(function() {
this.innerHTML = "";
});
},
pluck: function(e) {
return T.map(this, function(t) {
return t[e];
});
},
show: function() {
return this.each(function() {
this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = p(this.nodeName));
});
},
replaceWith: function(e) {
return this.before(e).remove();
},
wrap: function(e) {
var n = t(e);
if (this[0] && !n) var r = T(e).get(0), i = r.parentNode || this.length > 1;
return this.each(function(t) {
T(this).wrapAll(n ? e.call(this, t) : i ? r.cloneNode(!0) : r);
});
},
wrapAll: function(e) {
if (this[0]) {
T(this[0]).before(e = T(e));
var t;
while ((t = e.children()).length) e = t.first();
T(e).append(this);
}
return this;
},
wrapInner: function(e) {
var n = t(e);
return this.each(function(t) {
var r = T(this), i = r.contents(), s = n ? e.call(this, t) : e;
i.length ? i.wrapAll(s) : r.append(s);
});
},
unwrap: function() {
return this.parent().each(function() {
T(this).replaceWith(T(this).children());
}), this;
},
clone: function() {
return this.map(function() {
return this.cloneNode(!0);
});
},
hide: function() {
return this.css("display", "none");
},
toggle: function(e) {
return this.each(function() {
var t = T(this);
(e === S ? t.css("display") == "none" : e) ? t.show() : t.hide();
});
},
prev: function(e) {
return T(this.pluck("previousElementSibling")).filter(e || "*");
},
next: function(e) {
return T(this.pluck("nextElementSibling")).filter(e || "*");
},
html: function(e) {
return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
var n = this.innerHTML;
T(this).empty().append(g(this, e, t, n));
});
},
text: function(e) {
return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function() {
this.textContent = e === S ? "" : "" + e;
});
},
attr: function(e, t) {
var n;
return typeof e == "string" && t === S ? this.length == 0 || this[0].nodeType !== 1 ? S : e == "value" && this[0].nodeName == "INPUT" ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function(n) {
if (this.nodeType !== 1) return;
if (i(e)) for (x in e) y(this, x, e[x]); else y(this, e, g(this, t, n, this.getAttribute(e)));
});
},
removeAttr: function(e) {
return this.each(function() {
this.nodeType === 1 && y(this, e);
});
},
prop: function(e, t) {
return e = Z[e] || e, t === S ? this[0] && this[0][e] : this.each(function(n) {
this[e] = g(this, t, n, this[e]);
});
},
data: function(e, t) {
var n = this.attr("data-" + e.replace(j, "-$1").toLowerCase(), t);
return n !== null ? w(n) : S;
},
val: function(e) {
return arguments.length === 0 ? this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function() {
return this.selected;
}).pluck("value") : this[0].value) : this.each(function(t) {
this.value = g(this, e, t, this.value);
});
},
offset: function(e) {
if (e) return this.each(function(t) {
var n = T(this), r = g(this, e, t, n.offset()), i = n.offsetParent().offset(), s = {
top: r.top - i.top,
left: r.left - i.left
};
n.css("position") == "static" && (s.position = "relative"), n.css(s);
});
if (this.length == 0) return null;
var t = this[0].getBoundingClientRect();
return {
left: t.left + window.pageXOffset,
top: t.top + window.pageYOffset,
width: Math.round(t.width),
height: Math.round(t.height)
};
},
css: function(t, n) {
if (arguments.length < 2) {
var r = this[0], i = getComputedStyle(r, "");
if (!r) return;
if (typeof t == "string") return r.style[Q(t)] || i.getPropertyValue(t);
if (o(t)) {
var s = {};
return T.each(o(t) ? t : [ t ], function(e, t) {
s[t] = r.style[Q(t)] || i.getPropertyValue(t);
}), s;
}
}
var u = "";
if (e(t) == "string") !n && n !== 0 ? this.each(function() {
this.style.removeProperty(l(t));
}) : u = l(t) + ":" + h(t, n); else for (x in t) !t[x] && t[x] !== 0 ? this.each(function() {
this.style.removeProperty(l(x));
}) : u += l(x) + ":" + h(x, t[x]) + ";";
return this.each(function() {
this.style.cssText += ";" + u;
});
},
index: function(e) {
return e ? this.indexOf(T(e)[0]) : this.parent().children().indexOf(this[0]);
},
hasClass: function(e) {
return e ? C.some.call(this, function(e) {
return this.test(b(e));
}, c(e)) : !1;
},
addClass: function(e) {
return e ? this.each(function(t) {
N = [];
var n = b(this), r = g(this, e, t, n);
r.split(/\s+/g).forEach(function(e) {
T(this).hasClass(e) || N.push(e);
}, this), N.length && b(this, n + (n ? " " : "") + N.join(" "));
}) : this;
},
removeClass: function(e) {
return this.each(function(t) {
if (e === S) return b(this, "");
N = b(this), g(this, e, t, N).split(/\s+/g).forEach(function(e) {
N = N.replace(c(e), " ");
}), b(this, N.trim());
});
},
toggleClass: function(e, t) {
return e ? this.each(function(n) {
var r = T(this), i = g(this, e, n, b(this));
i.split(/\s+/g).forEach(function(e) {
(t === S ? !r.hasClass(e) : t) ? r.addClass(e) : r.removeClass(e);
});
}) : this;
},
scrollTop: function(e) {
if (!this.length) return;
var t = "scrollTop" in this[0];
return e === S ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function() {
this.scrollTop = e;
} : function() {
this.scrollTo(this.scrollX, e);
});
},
scrollLeft: function(e) {
if (!this.length) return;
var t = "scrollLeft" in this[0];
return e === S ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function() {
this.scrollLeft = e;
} : function() {
this.scrollTo(e, this.scrollY);
});
},
position: function() {
if (!this.length) return;
var e = this[0], t = this.offsetParent(), n = this.offset(), r = B.test(t[0].nodeName) ? {
top: 0,
left: 0
} : t.offset();
return n.top -= parseFloat(T(e).css("margin-top")) || 0, n.left -= parseFloat(T(e).css("margin-left")) || 0, r.top += parseFloat(T(t[0]).css("border-top-width")) || 0, r.left += parseFloat(T(t[0]).css("border-left-width")) || 0, {
top: n.top - r.top,
left: n.left - r.left
};
},
offsetParent: function() {
return this.map(function() {
var e = this.offsetParent || A.body;
while (e && !B.test(e.nodeName) && T(e).css("position") == "static") e = e.offsetParent;
return e;
});
}
}, T.fn.detach = T.fn.remove, [ "width", "height" ].forEach(function(e) {
var t = e.replace(/./, function(e) {
return e[0].toUpperCase();
});
T.fn[e] = function(i) {
var s, o = this[0];
return i === S ? n(o) ? o["inner" + t] : r(o) ? o.documentElement["scroll" + t] : (s = this.offset()) && s[e] : this.each(function(t) {
o = T(this), o.css(e, g(this, i, t, o[e]()));
});
};
}), I.forEach(function(t, n) {
var r = n % 2;
T.fn[t] = function() {
var t, i = T.map(arguments, function(n) {
return t = e(n), t == "object" || t == "array" || n == null ? n : K.fragment(n);
}), s, o = this.length > 1;
return i.length < 1 ? this : this.each(function(e, t) {
s = r ? t : t.parentNode, t = n == 0 ? t.nextSibling : n == 1 ? t.firstChild : n == 2 ? t : null, i.forEach(function(e) {
if (o) e = e.cloneNode(!0); else if (!s) return T(e).remove();
E(s.insertBefore(e, t), function(e) {
e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML);
});
});
});
}, T.fn[r ? t + "To" : "insert" + (n ? "Before" : "After")] = function(e) {
return T(e)[t](this), this;
};
}), K.Z.prototype = T.fn, K.uniq = G, K.deserializeValue = w, T.zepto = K, T;
}();

window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto), function(e) {
function t(e) {
return e._zid || (e._zid = h++);
}
function n(e, n, s, o) {
n = r(n);
if (n.ns) var u = i(n.ns);
return (g[t(e)] || []).filter(function(e) {
return e && (!n.e || e.e == n.e) && (!n.ns || u.test(e.ns)) && (!s || t(e.fn) === t(s)) && (!o || e.sel == o);
});
}
function r(e) {
var t = ("" + e).split(".");
return {
e: t[0],
ns: t.slice(1).sort().join(" ")
};
}
function i(e) {
return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)");
}
function s(e, t) {
return e.del && !b && e.e in w || !!t;
}
function o(e) {
return E[e] || b && w[e] || e;
}
function u(n, i, u, a, l, c, h) {
var d = t(n), v = g[d] || (g[d] = []);
i.split(/\s/).forEach(function(t) {
if (t == "ready") return e(document).ready(u);
var i = r(t);
i.fn = u, i.sel = l, i.e in E && (u = function(t) {
var n = t.relatedTarget;
if (!n || n !== this && !e.contains(this, n)) return i.fn.apply(this, arguments);
}), i.del = c;
var d = c || u;
i.proxy = function(e) {
e = f(e);
if (e.isImmediatePropagationStopped()) return;
e.data = a;
var t = d.apply(n, e._args == p ? [ e ] : [ e ].concat(e._args));
return t === !1 && (e.preventDefault(), e.stopPropagation()), t;
}, i.i = v.length, v.push(i), "addEventListener" in n && n.addEventListener(o(i.e), i.proxy, s(i, h));
});
}
function a(e, r, i, u, a) {
var f = t(e);
(r || "").split(/\s/).forEach(function(t) {
n(e, t, i, u).forEach(function(t) {
delete g[f][t.i], "removeEventListener" in e && e.removeEventListener(o(t.e), t.proxy, s(t, a));
});
});
}
function f(t, n) {
if (n || !t.isDefaultPrevented) {
n || (n = t), e.each(N, function(e, r) {
var i = n[e];
t[e] = function() {
return this[r] = S, i && i.apply(n, arguments);
}, t[r] = x;
});
if (n.defaultPrevented !== p ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) t.isDefaultPrevented = S;
}
return t;
}
function l(e) {
var t, n = {
originalEvent: e
};
for (t in e) !T.test(t) && e[t] !== p && (n[t] = e[t]);
return f(n, e);
}
var c = e.zepto.qsa, h = 1, p, d = Array.prototype.slice, v = e.isFunction, m = function(e) {
return typeof e == "string";
}, g = {}, y = {}, b = "onfocusin" in window, w = {
focus: "focusin",
blur: "focusout"
}, E = {
mouseenter: "mouseover",
mouseleave: "mouseout"
};
y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents", e.event = {
add: u,
remove: a
}, e.proxy = function(n, r) {
if (v(n)) {
var i = function() {
return n.apply(r, arguments);
};
return i._zid = t(n), i;
}
if (m(r)) return e.proxy(n[r], n);
throw new TypeError("expected function");
}, e.fn.bind = function(e, t, n) {
return this.on(e, t, n);
}, e.fn.unbind = function(e, t) {
return this.off(e, t);
}, e.fn.one = function(e, t, n, r) {
return this.on(e, t, n, r, 1);
};
var S = function() {
return !0;
}, x = function() {
return !1;
}, T = /^([A-Z]|returnValue$|layer[XY]$)/, N = {
preventDefault: "isDefaultPrevented",
stopImmediatePropagation: "isImmediatePropagationStopped",
stopPropagation: "isPropagationStopped"
};
e.fn.delegate = function(e, t, n) {
return this.on(t, e, n);
}, e.fn.undelegate = function(e, t, n) {
return this.off(t, e, n);
}, e.fn.live = function(t, n) {
return e(document.body).delegate(this.selector, t, n), this;
}, e.fn.die = function(t, n) {
return e(document.body).undelegate(this.selector, t, n), this;
}, e.fn.on = function(t, n, r, i, s) {
var o, f, c = this;
if (t && !m(t)) return e.each(t, function(e, t) {
c.on(e, n, r, t, s);
}), c;
!m(n) && !v(i) && i !== !1 && (i = r, r = n, n = p);
if (v(r) || r === !1) i = r, r = p;
return i === !1 && (i = x), c.each(function(c, h) {
s && (o = function(e) {
return a(h, e.type, i), i.apply(this, arguments);
}), n && (f = function(t) {
var r, s = e(t.target).closest(n, h).get(0);
if (s && s !== h) return r = e.extend(l(t), {
currentTarget: s,
liveFired: h
}), (o || i).apply(s, [ r ].concat(d.call(arguments, 1)));
}), u(h, t, i, r, n, f || o);
});
}, e.fn.off = function(t, n, r) {
var i = this;
return t && !m(t) ? (e.each(t, function(e, t) {
i.off(e, n, t);
}), i) : (!m(n) && !v(r) && r !== !1 && (r = n, n = p), r === !1 && (r = x), i.each(function() {
a(this, t, r, n);
}));
}, e.fn.trigger = function(t, n) {
return t = m(t) || e.isPlainObject(t) ? e.Event(t) : f(t), t._args = n, this.each(function() {
"dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n);
});
}, e.fn.triggerHandler = function(t, r) {
var i, s;
return this.each(function(o, u) {
i = l(m(t) ? e.Event(t) : t), i._args = r, i.target = u, e.each(n(u, t.type || t), function(e, t) {
s = t.proxy(i);
if (i.isImmediatePropagationStopped()) return !1;
});
}), s;
}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
e.fn[t] = function(e) {
return e ? this.bind(t, e) : this.trigger(t);
};
}), [ "focus", "blur" ].forEach(function(t) {
e.fn[t] = function(e) {
return e ? this.bind(t, e) : this.each(function() {
try {
this[t]();
} catch (e) {}
}), this;
};
}), e.Event = function(e, t) {
m(e) || (t = e, e = t.type);
var n = document.createEvent(y[e] || "Events"), r = !0;
if (t) for (var i in t) i == "bubbles" ? r = !!t[i] : n[i] = t[i];
return n.initEvent(e, r, !0), f(n);
};
}(Zepto), function($) {
function triggerAndReturn(e, t, n) {
var r = $.Event(t);
return $(e).trigger(r, n), !r.isDefaultPrevented();
}
function triggerGlobal(e, t, n, r) {
if (e.global) return triggerAndReturn(t || document, n, r);
}
function ajaxStart(e) {
e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart");
}
function ajaxStop(e) {
e.global && !--$.active && triggerGlobal(e, null, "ajaxStop");
}
function ajaxBeforeSend(e, t) {
var n = t.context;
if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [ e, t ]) === !1) return !1;
triggerGlobal(t, n, "ajaxSend", [ e, t ]);
}
function ajaxSuccess(e, t, n, r) {
var i = n.context, s = "success";
n.success.call(i, e, s, t), r && r.resolveWith(i, [ e, s, t ]), triggerGlobal(n, i, "ajaxSuccess", [ t, n, e ]), ajaxComplete(s, t, n);
}
function ajaxError(e, t, n, r, i) {
var s = r.context;
r.error.call(s, n, t, e), i && i.rejectWith(s, [ n, t, e ]), triggerGlobal(r, s, "ajaxError", [ n, r, e || t ]), ajaxComplete(t, n, r);
}
function ajaxComplete(e, t, n) {
var r = n.context;
n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [ t, n ]), ajaxStop(n);
}
function empty() {}
function mimeToDataType(e) {
return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text";
}
function appendQuery(e, t) {
return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?");
}
function serializeData(e) {
e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined);
}
function parseArguments(e, t, n, r) {
var i = !$.isFunction(t);
return {
url: e,
data: i ? t : undefined,
success: i ? $.isFunction(n) ? n : undefined : t,
dataType: i ? r || n : n
};
}
function serialize(e, t, n, r) {
var i, s = $.isArray(t), o = $.isPlainObject(t);
$.each(t, function(t, u) {
i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u);
});
}
var jsonpID = 0, document = window.document, key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
$.active = 0, $.ajaxJSONP = function(e, t) {
if ("type" in e) {
var n = e.jsonpCallback, r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID, i = document.createElement("script"), s = window[r], o, u = function(e) {
$(i).triggerHandler("error", e || "abort");
}, a = {
abort: u
}, f;
return t && t.promise(a), $(i).on("load error", function(n, u) {
clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined;
}), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function() {
o = arguments;
}, i.src = e.url.replace(/=\?/, "=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function() {
u("timeout");
}, e.timeout)), a);
}
return $.ajax(e);
}, $.ajaxSettings = {
type: "GET",
beforeSend: empty,
success: empty,
error: empty,
complete: empty,
context: null,
global: !0,
xhr: function() {
return new window.XMLHttpRequest;
},
accepts: {
script: "text/javascript, application/javascript, application/x-javascript",
json: jsonType,
xml: "application/xml, text/xml",
html: htmlType,
text: "text/plain"
},
crossDomain: !1,
timeout: 0,
processData: !0,
cache: !0
}, $.ajax = function(options) {
var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred();
for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url);
if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
var mime = settings.accepts[dataType], headers = {}, setHeader = function(e, t) {
headers[e.toLowerCase()] = [ e, t ];
}, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader, abortTimeout;
deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
if (mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
(settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
if (xhr.readyState == 4) {
xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
var result, error = !1;
if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
try {
dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result));
} catch (e) {
error = e;
}
error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred);
} else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred);
}
};
if (ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
var async = "async" in settings ? settings.async : !0;
xhr.open(settings.type, settings.url, async, settings.username, settings.password);
for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred);
}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr;
}, $.get = function(e, t, n, r) {
return $.ajax(parseArguments.apply(null, arguments));
}, $.post = function(e, t, n, r) {
var i = parseArguments.apply(null, arguments);
return i.type = "POST", $.ajax(i);
}, $.getJSON = function(e, t, n) {
var r = parseArguments.apply(null, arguments);
return r.dataType = "json", $.ajax(r);
}, $.fn.load = function(e, t, n) {
if (!this.length) return this;
var r = this, i = e.split(/\s/), s, o = parseArguments(e, t, n), u = o.success;
return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function(e) {
r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments);
}, $.ajax(o), this;
};
var escape = encodeURIComponent;
$.param = function(e, t) {
var n = [];
return n.add = function(e, t) {
this.push(escape(e) + "=" + escape(t));
}, serialize(n, e, t), n.join("&").replace(/%20/g, "+");
};
}(Zepto), function(e) {
e.fn.serializeArray = function() {
var t = [], n;
return e([].slice.call(this.get(0).elements)).each(function() {
n = e(this);
var r = n.attr("type");
this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
name: n.attr("name"),
value: n.val()
});
}), t;
}, e.fn.serialize = function() {
var e = [];
return this.serializeArray().forEach(function(t) {
e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value));
}), e.join("&");
}, e.fn.submit = function(t) {
if (t) this.bind("submit", t); else if (this.length) {
var n = e.Event("submit");
this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
}
return this;
};
}(Zepto), function(e) {
"__proto__" in {} || e.extend(e.zepto, {
Z: function(t, n) {
return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t;
},
isZ: function(t) {
return e.type(t) === "array" && "__Z" in t;
}
});
try {
getComputedStyle(undefined);
} catch (t) {
var n = getComputedStyle;
window.getComputedStyle = function(e) {
try {
return n(e);
} catch (t) {
return null;
}
};
}
}(Zepto);