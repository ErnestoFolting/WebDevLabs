// eslint-disable-next-line no-unused-vars
import {
	S as ae,
	i as oe,
	s as ne,
	e as j,
	k as R,
	c as T,
	a as y,
	n as D,
	d as k,
	b as n,
	H as K,
	f as Q,
	I as f,
	Q as V,
	R as W,
	T as le,
	U as se,
	V as re,
	W as ie,
	X as x,
	Y as de,
	t as ue,
	P as ce,
	g as _e,
	Z as fe,
	w as he,
	x as me,
	u as pe,
	_ as ve,
	$,
	r as be,
	a0 as ge,
	J as ke
} from '../../chunks/vendor-9696d423.js';
function C(d, { pending: t, error: e, result: a }) {
	let h;
	async function E(m) {
		const c = (h = {});
		m.preventDefault();
		const v = new FormData(d);
		t && t(v, d);
		try {
			const r = await fetch(d.action, {
				method: d.method,
				headers: { accept: 'application/json' },
				body: v
			});
			if (c !== h) return;
			r.ok ? a(r, d) : e ? e(r, null, d) : console.error(await r.text());
		} catch (r) {
			if (e) e(null, r, d);
			else throw r;
		}
	}
	return (
		d.addEventListener('submit', E),
		{
			destroy() {
				d.removeEventListener('submit', E);
			}
		}
	);
}
function ee(d, t, e) {
	const a = d.slice();
	return (a[6] = t[e]), (a[7] = t), (a[8] = e), a;
}
function te(d, t) {
	let e,
		a,
		h,
		E,
		m,
		c,
		v,
		r,
		o,
		p,
		_,
		b,
		U,
		M,
		O,
		s,
		i,
		l,
		w,
		F,
		I,
		B,
		H,
		N,
		L,
		A = ke,
		q,
		J,
		X;
	function Y(...g) {
		return t[3](t[6], t[7], t[8], ...g);
	}
	function Z() {
		return t[4](t[6], t[7], t[8]);
	}
	function z() {
		return t[5](t[6]);
	}
	return {
		key: d,
		first: null,
		c() {
			(e = j('div')),
				(a = j('form')),
				(h = j('input')),
				(m = R()),
				(c = j('button')),
				(p = R()),
				(_ = j('form')),
				(b = j('input')),
				(M = R()),
				(O = j('button')),
				(i = R()),
				(l = j('form')),
				(w = j('button')),
				(H = R()),
				this.h();
		},
		l(g) {
			e = T(g, 'DIV', { class: !0 });
			var u = y(e);
			a = T(u, 'FORM', { action: !0, method: !0 });
			var P = y(a);
			(h = T(P, 'INPUT', { type: !0, name: !0, class: !0 })),
				(m = D(P)),
				(c = T(P, 'BUTTON', { class: !0, 'aria-label': !0 })),
				y(c).forEach(k),
				P.forEach(k),
				(p = D(u)),
				(_ = T(u, 'FORM', { class: !0, action: !0, method: !0 }));
			var S = y(_);
			(b = T(S, 'INPUT', { 'aria-label': !0, type: !0, name: !0, class: !0 })),
				(M = D(S)),
				(O = T(S, 'BUTTON', { class: !0, 'aria-label': !0 })),
				y(O).forEach(k),
				S.forEach(k),
				(i = D(u)),
				(l = T(u, 'FORM', { action: !0, method: !0 }));
			var G = y(l);
			(w = T(G, 'BUTTON', { class: !0, 'aria-label': !0 })),
				y(w).forEach(k),
				G.forEach(k),
				(H = D(u)),
				u.forEach(k),
				this.h();
		},
		h() {
			n(h, 'type', 'hidden'),
				n(h, 'name', 'done'),
				(h.value = E = t[6].done ? '' : 'true'),
				n(h, 'class', 'svelte-dmxqmd'),
				n(c, 'class', 'toggle svelte-dmxqmd'),
				n(c, 'aria-label', (v = 'Mark todo as ' + (t[6].done ? 'not done' : 'done'))),
				n(a, 'action', (r = '/todos/' + t[6].uid + '.json?_method=patch')),
				n(a, 'method', 'post'),
				n(b, 'aria-label', 'Edit todo'),
				n(b, 'type', 'text'),
				n(b, 'name', 'text'),
				(b.value = U = t[6].text),
				n(b, 'class', 'svelte-dmxqmd'),
				n(O, 'class', 'save svelte-dmxqmd'),
				n(O, 'aria-label', 'Save todo'),
				n(_, 'class', 'text svelte-dmxqmd'),
				n(_, 'action', (s = '/todos/' + t[6].uid + '.json?_method=patch')),
				n(_, 'method', 'post'),
				n(w, 'class', 'delete svelte-dmxqmd'),
				n(w, 'aria-label', 'Delete todo'),
				(w.disabled = F = t[6].pending_delete),
				n(l, 'action', (I = '/todos/' + t[6].uid + '.json?_method=delete')),
				n(l, 'method', 'post'),
				n(e, 'class', 'todo svelte-dmxqmd'),
				K(e, 'done', t[6].done),
				(this.first = e);
		},
		m(g, u) {
			Q(g, e, u),
				f(e, a),
				f(a, h),
				f(a, m),
				f(a, c),
				f(e, p),
				f(e, _),
				f(_, b),
				f(_, M),
				f(_, O),
				f(e, i),
				f(e, l),
				f(l, w),
				f(e, H),
				(q = !0),
				J ||
					((X = [
						V((o = C.call(null, a, { pending: Y, result: t[1] }))),
						V(C.call(null, _, { result: t[1] })),
						V((B = C.call(null, l, { pending: Z, result: z })))
					]),
					(J = !0));
		},
		p(g, u) {
			(t = g),
				(!q || (u & 1 && E !== (E = t[6].done ? '' : 'true'))) && (h.value = E),
				(!q || (u & 1 && v !== (v = 'Mark todo as ' + (t[6].done ? 'not done' : 'done')))) &&
					n(c, 'aria-label', v),
				(!q || (u & 1 && r !== (r = '/todos/' + t[6].uid + '.json?_method=patch'))) &&
					n(a, 'action', r),
				o && W(o.update) && u & 1 && o.update.call(null, { pending: Y, result: t[1] }),
				(!q || (u & 1 && U !== (U = t[6].text) && b.value !== U)) && (b.value = U),
				(!q || (u & 1 && s !== (s = '/todos/' + t[6].uid + '.json?_method=patch'))) &&
					n(_, 'action', s),
				(!q || (u & 1 && F !== (F = t[6].pending_delete))) && (w.disabled = F),
				(!q || (u & 1 && I !== (I = '/todos/' + t[6].uid + '.json?_method=delete'))) &&
					n(l, 'action', I),
				B && W(B.update) && u & 1 && B.update.call(null, { pending: Z, result: z }),
				u & 1 && K(e, 'done', t[6].done);
		},
		r() {
			L = e.getBoundingClientRect();
		},
		f() {
			le(e), A(), se(e, L);
		},
		a() {
			A(), (A = re(e, L, ve, { duration: 200 }));
		},
		i(g) {
			q ||
				(g &&
					ie(() => {
						N || (N = x(e, $, { start: 0.7 }, !0)), N.run(1);
					}),
				(q = !0));
		},
		o(g) {
			g && (N || (N = x(e, $, { start: 0.7 }, !1)), N.run(0)), (q = !1);
		},
		d(g) {
			g && k(e), g && N && N.end(), (J = !1), de(X);
		}
	};
}
function Ee(d) {
	let t,
		e,
		a,
		h,
		E,
		m,
		c,
		v,
		r,
		o = [],
		p = new Map(),
		_,
		b,
		U,
		M = d[0];
	const O = (s) => s[6].uid;
	for (let s = 0; s < M.length; s += 1) {
		let i = ee(d, M, s),
			l = O(i);
		p.set(l, (o[s] = te(l, i)));
	}
	return {
		c() {
			(t = R()),
				(e = j('div')),
				(a = j('h1')),
				(h = ue('Todos')),
				(E = R()),
				(m = j('form')),
				(c = j('input')),
				(r = R());
			for (let s = 0; s < o.length; s += 1) o[s].c();
			this.h();
		},
		l(s) {
			ce('[data-svelte="svelte-181o7gf"]', document.head).forEach(k),
				(t = D(s)),
				(e = T(s, 'DIV', { class: !0 }));
			var l = y(e);
			a = T(l, 'H1', {});
			var w = y(a);
			(h = _e(w, 'Todos')),
				w.forEach(k),
				(E = D(l)),
				(m = T(l, 'FORM', { class: !0, action: !0, method: !0 }));
			var F = y(m);
			(c = T(F, 'INPUT', { name: !0, 'aria-label': !0, placeholder: !0, class: !0 })),
				F.forEach(k),
				(r = D(l));
			for (let I = 0; I < o.length; I += 1) o[I].l(l);
			l.forEach(k), this.h();
		},
		h() {
			(document.title = 'Todos'),
				n(c, 'name', 'text'),
				n(c, 'aria-label', 'Add todo'),
				n(c, 'placeholder', '+ tap to add a todo'),
				n(c, 'class', 'svelte-dmxqmd'),
				n(m, 'class', 'new svelte-dmxqmd'),
				n(m, 'action', '/todos.json'),
				n(m, 'method', 'post'),
				n(e, 'class', 'todos svelte-dmxqmd');
		},
		m(s, i) {
			Q(s, t, i), Q(s, e, i), f(e, a), f(a, h), f(e, E), f(e, m), f(m, c), f(e, r);
			for (let l = 0; l < o.length; l += 1) o[l].m(e, null);
			(_ = !0), b || ((U = V((v = C.call(null, m, { result: d[2] })))), (b = !0));
		},
		p(s, [i]) {
			if ((v && W(v.update) && i & 1 && v.update.call(null, { result: s[2] }), i & 3)) {
				(M = s[0]), be();
				for (let l = 0; l < o.length; l += 1) o[l].r();
				o = fe(o, i, O, 1, s, M, p, e, ge, te, null, ee);
				for (let l = 0; l < o.length; l += 1) o[l].a();
				he();
			}
		},
		i() {
			if (!_) {
				for (let i = 0; i < M.length; i += 1) me(o[i]);
				_ = !0;
			}
		},
		o() {
			for (let i = 0; i < o.length; i += 1) pe(o[i]);
			_ = !1;
		},
		d(s) {
			s && k(t), s && k(e);
			for (let i = 0; i < o.length; i += 1) o[i].d();
			(b = !1), U();
		}
	};
}
const we = async ({ fetch: d }) => {
	const t = await d('/todos.json');
	if (t.ok) return { props: { todos: await t.json() } };
	const { message: e } = await t.json();
	return { error: new Error(e) };
};
function je(d, t, e) {
	let { todos: a } = t;
	async function h(r) {
		const o = await r.json();
		e(0, (a = a.map((p) => (p.uid === o.uid ? o : p))));
	}
	const E = async (r, o) => {
			const p = await r.json();
			e(0, (a = [...a, p])), o.reset();
		},
		m = (r, o, p, _) => {
			e(0, (o[p].done = !!_.get('done')), a);
		},
		c = (r, o, p) => e(0, (o[p].pending_delete = !0), a),
		v = (r) => {
			e(0, (a = a.filter((o) => o.uid !== r.uid)));
		};
	return (
		(d.$$set = (r) => {
			'todos' in r && e(0, (a = r.todos));
		}),
		[a, h, E, m, c, v]
	);
}
class qe extends ae {
	constructor(t) {
		super();
		oe(this, t, je, Ee, ne, { todos: 0 });
	}
}
export { qe as default, we as load };
