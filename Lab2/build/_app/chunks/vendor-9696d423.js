function b() {}
const X = (t) => t;
function mt(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function Y(t) {
	return t();
}
function Z() {
	return Object.create(null);
}
function S(t) {
	t.forEach(Y);
}
function q(t) {
	return typeof t == 'function';
}
function pt(t, e) {
	return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let R;
function Jt(t, e) {
	return R || (R = document.createElement('a')), (R.href = e), t === R.href;
}
function yt(t) {
	return Object.keys(t).length === 0;
}
function gt(t, ...e) {
	if (t == null) return b;
	const n = t.subscribe(...e);
	return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Kt(t, e, n) {
	t.$$.on_destroy.push(gt(e, n));
}
function Qt(t, e, n, r) {
	if (t) {
		const s = tt(t, e, n, r);
		return t[0](s);
	}
}
function tt(t, e, n, r) {
	return t[1] && r ? mt(n.ctx.slice(), t[1](r(e))) : n.ctx;
}
function Ut(t, e, n, r) {
	if (t[2] && r) {
		const s = t[2](r(n));
		if (e.dirty === void 0) return s;
		if (typeof s == 'object') {
			const u = [],
				i = Math.max(e.dirty.length, s.length);
			for (let c = 0; c < i; c += 1) u[c] = e.dirty[c] | s[c];
			return u;
		}
		return e.dirty | s;
	}
	return e.dirty;
}
function Vt(t, e, n, r, s, u) {
	if (s) {
		const i = tt(e, n, r, u);
		t.p(i, s);
	}
}
function Xt(t) {
	if (t.ctx.length > 32) {
		const e = [],
			n = t.ctx.length / 32;
		for (let r = 0; r < n; r++) e[r] = -1;
		return e;
	}
	return -1;
}
function Yt(t) {
	return t && q(t.destroy) ? t.destroy : b;
}
const et = typeof window != 'undefined';
let nt = et ? () => window.performance.now() : () => Date.now(),
	I = et ? (t) => requestAnimationFrame(t) : b;
const C = new Set();
function it(t) {
	C.forEach((e) => {
		e.c(t) || (C.delete(e), e.f());
	}),
		C.size !== 0 && I(it);
}
function st(t) {
	let e;
	return (
		C.size === 0 && I(it),
		{
			promise: new Promise((n) => {
				C.add((e = { c: t, f: n }));
			}),
			abort() {
				C.delete(e);
			}
		}
	);
}
let O = !1;
function bt() {
	O = !0;
}
function xt() {
	O = !1;
}
function wt(t, e, n, r) {
	for (; t < e; ) {
		const s = t + ((e - t) >> 1);
		n(s) <= r ? (t = s + 1) : (e = s);
	}
	return t;
}
function $t(t) {
	if (t.hydrate_init) return;
	t.hydrate_init = !0;
	let e = t.childNodes;
	if (t.nodeName === 'HEAD') {
		const o = [];
		for (let l = 0; l < e.length; l++) {
			const h = e[l];
			h.claim_order !== void 0 && o.push(h);
		}
		e = o;
	}
	const n = new Int32Array(e.length + 1),
		r = new Int32Array(e.length);
	n[0] = -1;
	let s = 0;
	for (let o = 0; o < e.length; o++) {
		const l = e[o].claim_order,
			h = (s > 0 && e[n[s]].claim_order <= l ? s + 1 : wt(1, s, (a) => e[n[a]].claim_order, l)) - 1;
		r[o] = n[h] + 1;
		const f = h + 1;
		(n[f] = o), (s = Math.max(f, s));
	}
	const u = [],
		i = [];
	let c = e.length - 1;
	for (let o = n[s] + 1; o != 0; o = r[o - 1]) {
		for (u.push(e[o - 1]); c >= o; c--) i.push(e[c]);
		c--;
	}
	for (; c >= 0; c--) i.push(e[c]);
	u.reverse(), i.sort((o, l) => o.claim_order - l.claim_order);
	for (let o = 0, l = 0; o < i.length; o++) {
		for (; l < u.length && i[o].claim_order >= u[l].claim_order; ) l++;
		const h = l < u.length ? u[l] : null;
		t.insertBefore(i[o], h);
	}
}
function vt(t, e) {
	t.appendChild(e);
}
function rt(t) {
	if (!t) return document;
	const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
	return e && e.host ? e : t.ownerDocument;
}
function kt(t) {
	const e = ot('style');
	return St(rt(t), e), e;
}
function St(t, e) {
	vt(t.head || t, e);
}
function Ct(t, e) {
	if (O) {
		for (
			$t(t),
				(t.actual_end_child === void 0 ||
					(t.actual_end_child !== null && t.actual_end_child.parentElement !== t)) &&
					(t.actual_end_child = t.firstChild);
			t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		e !== t.actual_end_child
			? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
			: (t.actual_end_child = e.nextSibling);
	} else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function Zt(t, e, n) {
	O && !n ? Ct(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function Et(t) {
	t.parentNode.removeChild(t);
}
function ot(t) {
	return document.createElement(t);
}
function At(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function W(t) {
	return document.createTextNode(t);
}
function te() {
	return W(' ');
}
function ee() {
	return W('');
}
function ne(t, e, n) {
	n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Nt(t) {
	return Array.from(t.childNodes);
}
function Mt(t) {
	t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function ct(t, e, n, r, s = !1) {
	Mt(t);
	const u = (() => {
		for (let i = t.claim_info.last_index; i < t.length; i++) {
			const c = t[i];
			if (e(c)) {
				const o = n(c);
				return o === void 0 ? t.splice(i, 1) : (t[i] = o), s || (t.claim_info.last_index = i), c;
			}
		}
		for (let i = t.claim_info.last_index - 1; i >= 0; i--) {
			const c = t[i];
			if (e(c)) {
				const o = n(c);
				return (
					o === void 0 ? t.splice(i, 1) : (t[i] = o),
					s ? o === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = i),
					c
				);
			}
		}
		return r();
	})();
	return (u.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), u;
}
function lt(t, e, n, r) {
	return ct(
		t,
		(s) => s.nodeName === e,
		(s) => {
			const u = [];
			for (let i = 0; i < s.attributes.length; i++) {
				const c = s.attributes[i];
				n[c.name] || u.push(c.name);
			}
			u.forEach((i) => s.removeAttribute(i));
		},
		() => r(e)
	);
}
function ie(t, e, n) {
	return lt(t, e, n, ot);
}
function se(t, e, n) {
	return lt(t, e, n, At);
}
function jt(t, e) {
	return ct(
		t,
		(n) => n.nodeType === 3,
		(n) => {
			const r = '' + e;
			if (n.data.startsWith(r)) {
				if (n.data.length !== r.length) return n.splitText(r.length);
			} else n.data = r;
		},
		() => W(e),
		!0
	);
}
function re(t) {
	return jt(t, ' ');
}
function oe(t, e) {
	(e = '' + e), t.wholeText !== e && (t.data = e);
}
function ce(t, e, n) {
	t.classList[n ? 'add' : 'remove'](e);
}
function qt(t, e, n = !1) {
	const r = document.createEvent('CustomEvent');
	return r.initCustomEvent(t, n, !1, e), r;
}
function le(t, e = document.body) {
	return Array.from(e.querySelectorAll(t));
}
const G = new Set();
let B = 0;
function Rt(t) {
	let e = 5381,
		n = t.length;
	for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
	return e >>> 0;
}
function J(t, e, n, r, s, u, i, c = 0) {
	const o = 16.666 / r;
	let l = `{
`;
	for (let m = 0; m <= 1; m += o) {
		const y = e + (n - e) * u(m);
		l +=
			m * 100 +
			`%{${i(y, 1 - y)}}
`;
	}
	const h =
			l +
			`100% {${i(n, 1 - n)}}
}`,
		f = `__svelte_${Rt(h)}_${c}`,
		a = rt(t);
	G.add(a);
	const _ = a.__svelte_stylesheet || (a.__svelte_stylesheet = kt(t).sheet),
		d = a.__svelte_rules || (a.__svelte_rules = {});
	d[f] || ((d[f] = !0), _.insertRule(`@keyframes ${f} ${h}`, _.cssRules.length));
	const g = t.style.animation || '';
	return (t.style.animation = `${g ? `${g}, ` : ''}${f} ${r}ms linear ${s}ms 1 both`), (B += 1), f;
}
function ut(t, e) {
	const n = (t.style.animation || '').split(', '),
		r = n.filter(e ? (u) => u.indexOf(e) < 0 : (u) => u.indexOf('__svelte') === -1),
		s = n.length - r.length;
	s && ((t.style.animation = r.join(', ')), (B -= s), B || Ot());
}
function Ot() {
	I(() => {
		B ||
			(G.forEach((t) => {
				const e = t.__svelte_stylesheet;
				let n = e.cssRules.length;
				for (; n--; ) e.deleteRule(n);
				t.__svelte_rules = {};
			}),
			G.clear());
	});
}
function ue(t, e, n, r) {
	if (!e) return b;
	const s = t.getBoundingClientRect();
	if (e.left === s.left && e.right === s.right && e.top === s.top && e.bottom === s.bottom)
		return b;
	const {
		delay: u = 0,
		duration: i = 300,
		easing: c = X,
		start: o = nt() + u,
		end: l = o + i,
		tick: h = b,
		css: f
	} = n(t, { from: e, to: s }, r);
	let a = !0,
		_ = !1,
		d;
	function g() {
		f && (d = J(t, 0, 1, i, u, c, f)), u || (_ = !0);
	}
	function m() {
		f && ut(t, d), (a = !1);
	}
	return (
		st((y) => {
			if ((!_ && y >= o && (_ = !0), _ && y >= l && (h(1, 0), m()), !a)) return !1;
			if (_) {
				const x = y - o,
					w = 0 + 1 * c(x / i);
				h(w, 1 - w);
			}
			return !0;
		}),
		g(),
		h(0, 1),
		m
	);
}
function ae(t) {
	const e = getComputedStyle(t);
	if (e.position !== 'absolute' && e.position !== 'fixed') {
		const { width: n, height: r } = e,
			s = t.getBoundingClientRect();
		(t.style.position = 'absolute'), (t.style.width = n), (t.style.height = r), Bt(t, s);
	}
}
function Bt(t, e) {
	const n = t.getBoundingClientRect();
	if (e.left !== n.left || e.top !== n.top) {
		const r = getComputedStyle(t),
			s = r.transform === 'none' ? '' : r.transform;
		t.style.transform = `${s} translate(${e.left - n.left}px, ${e.top - n.top}px)`;
	}
}
let z;
function D(t) {
	z = t;
}
function T() {
	if (!z) throw new Error('Function called outside component initialization');
	return z;
}
function fe(t) {
	T().$$.on_mount.push(t);
}
function _e(t) {
	T().$$.after_update.push(t);
}
function de(t, e) {
	T().$$.context.set(t, e);
}
function he(t) {
	return T().$$.context.get(t);
}
const A = [],
	at = [],
	F = [],
	ft = [],
	zt = Promise.resolve();
let K = !1;
function Dt() {
	K || ((K = !0), zt.then(_t));
}
function P(t) {
	F.push(t);
}
let Q = !1;
const U = new Set();
function _t() {
	if (!Q) {
		Q = !0;
		do {
			for (let t = 0; t < A.length; t += 1) {
				const e = A[t];
				D(e), Tt(e.$$);
			}
			for (D(null), A.length = 0; at.length; ) at.pop()();
			for (let t = 0; t < F.length; t += 1) {
				const e = F[t];
				U.has(e) || (U.add(e), e());
			}
			F.length = 0;
		} while (A.length);
		for (; ft.length; ) ft.pop()();
		(K = !1), (Q = !1), U.clear();
	}
}
function Tt(t) {
	if (t.fragment !== null) {
		t.update(), S(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(P);
	}
}
let N;
function Ft() {
	return (
		N ||
			((N = Promise.resolve()),
			N.then(() => {
				N = null;
			})),
		N
	);
}
function V(t, e, n) {
	t.dispatchEvent(qt(`${e ? 'intro' : 'outro'}${n}`));
}
const L = new Set();
let k;
function me() {
	k = { r: 0, c: [], p: k };
}
function pe() {
	k.r || S(k.c), (k = k.p);
}
function dt(t, e) {
	t && t.i && (L.delete(t), t.i(e));
}
function Pt(t, e, n, r) {
	if (t && t.o) {
		if (L.has(t)) return;
		L.add(t),
			k.c.push(() => {
				L.delete(t), r && (n && t.d(1), r());
			}),
			t.o(e);
	}
}
const Lt = { duration: 0 };
function ye(t, e, n, r) {
	let s = e(t, n),
		u = r ? 0 : 1,
		i = null,
		c = null,
		o = null;
	function l() {
		o && ut(t, o);
	}
	function h(a, _) {
		const d = a.b - u;
		return (
			(_ *= Math.abs(d)),
			{ a: u, b: a.b, d, duration: _, start: a.start, end: a.start + _, group: a.group }
		);
	}
	function f(a) {
		const { delay: _ = 0, duration: d = 300, easing: g = X, tick: m = b, css: y } = s || Lt,
			x = { start: nt() + _, b: a };
		a || ((x.group = k), (k.r += 1)),
			i || c
				? (c = x)
				: (y && (l(), (o = J(t, u, a, d, _, g, y))),
				  a && m(0, 1),
				  (i = h(x, d)),
				  P(() => V(t, a, 'start')),
				  st((w) => {
						if (
							(c &&
								w > c.start &&
								((i = h(c, d)),
								(c = null),
								V(t, i.b, 'start'),
								y && (l(), (o = J(t, u, i.b, i.duration, 0, g, s.css)))),
							i)
						) {
							if (w >= i.end)
								m((u = i.b), 1 - u),
									V(t, i.b, 'end'),
									c || (i.b ? l() : --i.group.r || S(i.group.c)),
									(i = null);
							else if (w >= i.start) {
								const M = w - i.start;
								(u = i.a + i.d * g(M / i.duration)), m(u, 1 - u);
							}
						}
						return !!(i || c);
				  }));
	}
	return {
		run(a) {
			q(s)
				? Ft().then(() => {
						(s = s()), f(a);
				  })
				: f(a);
		},
		end() {
			l(), (i = c = null);
		}
	};
}
function Ht(t, e) {
	Pt(t, 1, 1, () => {
		e.delete(t.key);
	});
}
function ge(t, e) {
	t.f(), Ht(t, e);
}
function be(t, e, n, r, s, u, i, c, o, l, h, f) {
	let a = t.length,
		_ = u.length,
		d = a;
	const g = {};
	for (; d--; ) g[t[d].key] = d;
	const m = [],
		y = new Map(),
		x = new Map();
	for (d = _; d--; ) {
		const p = f(s, u, d),
			$ = n(p);
		let v = i.get($);
		v ? r && v.p(p, e) : ((v = l($, p)), v.c()),
			y.set($, (m[d] = v)),
			$ in g && x.set($, Math.abs(d - g[$]));
	}
	const w = new Set(),
		M = new Set();
	function H(p) {
		dt(p, 1), p.m(c, h), i.set(p.key, p), (h = p.first), _--;
	}
	for (; a && _; ) {
		const p = m[_ - 1],
			$ = t[a - 1],
			v = p.key,
			j = $.key;
		p === $
			? ((h = p.first), a--, _--)
			: y.has(j)
			? !i.has(v) || w.has(v)
				? H(p)
				: M.has(j)
				? a--
				: x.get(v) > x.get(j)
				? (M.add(v), H(p))
				: (w.add(j), a--)
			: (o($, i), a--);
	}
	for (; a--; ) {
		const p = t[a];
		y.has(p.key) || o(p, i);
	}
	for (; _; ) H(m[_ - 1]);
	return m;
}
function xe(t, e) {
	const n = {},
		r = {},
		s = { $$scope: 1 };
	let u = t.length;
	for (; u--; ) {
		const i = t[u],
			c = e[u];
		if (c) {
			for (const o in i) o in c || (r[o] = 1);
			for (const o in c) s[o] || ((n[o] = c[o]), (s[o] = 1));
			t[u] = c;
		} else for (const o in i) s[o] = 1;
	}
	for (const i in r) i in n || (n[i] = void 0);
	return n;
}
function we(t) {
	return typeof t == 'object' && t !== null ? t : {};
}
function $e(t) {
	t && t.c();
}
function ve(t, e) {
	t && t.l(e);
}
function It(t, e, n, r) {
	const { fragment: s, on_mount: u, on_destroy: i, after_update: c } = t.$$;
	s && s.m(e, n),
		r ||
			P(() => {
				const o = u.map(Y).filter(q);
				i ? i.push(...o) : S(o), (t.$$.on_mount = []);
			}),
		c.forEach(P);
}
function Wt(t, e) {
	const n = t.$$;
	n.fragment !== null &&
		(S(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function Gt(t, e) {
	t.$$.dirty[0] === -1 && (A.push(t), Dt(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function ke(t, e, n, r, s, u, i, c = [-1]) {
	const o = z;
	D(t);
	const l = (t.$$ = {
		fragment: null,
		ctx: null,
		props: u,
		update: b,
		not_equal: s,
		bound: Z(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(e.context || (o ? o.$$.context : [])),
		callbacks: Z(),
		dirty: c,
		skip_bound: !1,
		root: e.target || o.$$.root
	});
	i && i(l.root);
	let h = !1;
	if (
		((l.ctx = n
			? n(t, e.props || {}, (f, a, ..._) => {
					const d = _.length ? _[0] : a;
					return (
						l.ctx &&
							s(l.ctx[f], (l.ctx[f] = d)) &&
							(!l.skip_bound && l.bound[f] && l.bound[f](d), h && Gt(t, f)),
						a
					);
			  })
			: []),
		l.update(),
		(h = !0),
		S(l.before_update),
		(l.fragment = r ? r(l.ctx) : !1),
		e.target)
	) {
		if (e.hydrate) {
			bt();
			const f = Nt(e.target);
			l.fragment && l.fragment.l(f), f.forEach(Et);
		} else l.fragment && l.fragment.c();
		e.intro && dt(t.$$.fragment), It(t, e.target, e.anchor, e.customElement), xt(), _t();
	}
	D(o);
}
class Se {
	$destroy() {
		Wt(this, 1), (this.$destroy = b);
	}
	$on(e, n) {
		const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			r.push(n),
			() => {
				const s = r.indexOf(n);
				s !== -1 && r.splice(s, 1);
			}
		);
	}
	$set(e) {
		this.$$set && !yt(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
	}
}
const E = [];
function Ce(t, e = b) {
	let n;
	const r = new Set();
	function s(c) {
		if (pt(t, c) && ((t = c), n)) {
			const o = !E.length;
			for (const l of r) l[1](), E.push(l, t);
			if (o) {
				for (let l = 0; l < E.length; l += 2) E[l][0](E[l + 1]);
				E.length = 0;
			}
		}
	}
	function u(c) {
		s(c(t));
	}
	function i(c, o = b) {
		const l = [c, o];
		return (
			r.add(l),
			r.size === 1 && (n = e(s) || b),
			c(t),
			() => {
				r.delete(l), r.size === 0 && (n(), (n = null));
			}
		);
	}
	return { set: s, update: u, subscribe: i };
}
function ht(t) {
	const e = t - 1;
	return e * e * e + 1;
}
function Ee(
	t,
	{ delay: e = 0, duration: n = 400, easing: r = ht, start: s = 0, opacity: u = 0 } = {}
) {
	const i = getComputedStyle(t),
		c = +i.opacity,
		o = i.transform === 'none' ? '' : i.transform,
		l = 1 - s,
		h = c * (1 - u);
	return {
		delay: e,
		duration: n,
		easing: r,
		css: (f, a) => `
			transform: ${o} scale(${1 - l * a});
			opacity: ${c - h * a}
		`
	};
}
function Ae(t, { from: e, to: n }, r = {}) {
	const s = getComputedStyle(t),
		u = s.transform === 'none' ? '' : s.transform,
		[i, c] = s.transformOrigin.split(' ').map(parseFloat),
		o = e.left + (e.width * i) / n.width - (n.left + i),
		l = e.top + (e.height * c) / n.height - (n.top + c),
		{ delay: h = 0, duration: f = (_) => Math.sqrt(_) * 120, easing: a = ht } = r;
	return {
		delay: h,
		duration: q(f) ? f(Math.sqrt(o * o + l * l)) : f,
		easing: a,
		css: (_, d) => {
			const g = d * o,
				m = d * l,
				y = _ + (d * e.width) / n.width,
				x = _ + (d * e.height) / n.height;
			return `transform: ${u} translate(${g}px, ${m}px) scale(${y}, ${x});`;
		}
	};
}
export {
	Ee as $,
	fe as A,
	mt as B,
	Ce as C,
	he as D,
	At as E,
	se as F,
	Jt as G,
	ce as H,
	Ct as I,
	b as J,
	Kt as K,
	Qt as L,
	Vt as M,
	Xt as N,
	Ut as O,
	le as P,
	Yt as Q,
	q as R,
	Se as S,
	ae as T,
	Bt as U,
	ue as V,
	P as W,
	ye as X,
	S as Y,
	be as Z,
	Ae as _,
	Nt as a,
	ge as a0,
	ne as b,
	ie as c,
	Et as d,
	ot as e,
	Zt as f,
	jt as g,
	oe as h,
	ke as i,
	$e as j,
	te as k,
	ee as l,
	ve as m,
	re as n,
	It as o,
	xe as p,
	we as q,
	me as r,
	pt as s,
	W as t,
	Pt as u,
	Wt as v,
	pe as w,
	dt as x,
	de as y,
	_e as z
};
