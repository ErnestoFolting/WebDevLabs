// eslint-disable-next-line no-unused-vars
import {
	S as F,
	i as G,
	s as N,
	k as _,
	e as l,
	t as o,
	P as Q,
	d as a,
	n as m,
	c as r,
	a as d,
	g as s,
	b as I,
	f as V,
	I as t,
	J as L
} from '../chunks/vendor-9696d423.js';
const U = !0,
	W = !1;
function X(z) {
	let h, e, f, b, E, p, S, u, k, x, A, g, J, P, y, K, O, c, D, v, H, q;
	return {
		c() {
			(h = _()),
				(e = l('div')),
				(f = l('h1')),
				(b = o('About this app')),
				(E = _()),
				(p = l('p')),
				(S = o('This is a ')),
				(u = l('a')),
				(k = o('SvelteKit')),
				(x = o(` app. You can make your own by typing the
		following into your command line and following the prompts:`)),
				(A = _()),
				(g = l('pre')),
				(J = o('npm init svelte@next')),
				(P = _()),
				(y = l('p')),
				(K =
					o(`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`)),
				(O = _()),
				(c = l('p')),
				(D = o('The ')),
				(v = l('a')),
				(H = o('TODOs')),
				(q = o(` page illustrates SvelteKit's data loading and form handling. Try using
		it with JavaScript disabled!`)),
				this.h();
		},
		l(i) {
			Q('[data-svelte="svelte-1ine71f"]', document.head).forEach(a),
				(h = m(i)),
				(e = r(i, 'DIV', { class: !0 }));
			var n = d(e);
			f = r(n, 'H1', {});
			var M = d(f);
			(b = s(M, 'About this app')), M.forEach(a), (E = m(n)), (p = r(n, 'P', {}));
			var w = d(p);
			(S = s(w, 'This is a ')), (u = r(w, 'A', { href: !0 }));
			var Y = d(u);
			(k = s(Y, 'SvelteKit')),
				Y.forEach(a),
				(x = s(
					w,
					` app. You can make your own by typing the
		following into your command line and following the prompts:`
				)),
				w.forEach(a),
				(A = m(n)),
				(g = r(n, 'PRE', {}));
			var j = d(g);
			(J = s(j, 'npm init svelte@next')), j.forEach(a), (P = m(n)), (y = r(n, 'P', {}));
			var C = d(y);
			(K = s(
				C,
				`The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.`
			)),
				C.forEach(a),
				(O = m(n)),
				(c = r(n, 'P', {}));
			var T = d(c);
			(D = s(T, 'The ')), (v = r(T, 'A', { href: !0 }));
			var R = d(v);
			(H = s(R, 'TODOs')),
				R.forEach(a),
				(q = s(
					T,
					` page illustrates SvelteKit's data loading and form handling. Try using
		it with JavaScript disabled!`
				)),
				T.forEach(a),
				n.forEach(a),
				this.h();
		},
		h() {
			(document.title = 'About'),
				I(u, 'href', 'https://kit.svelte.dev'),
				I(v, 'href', '/todos'),
				I(e, 'class', 'content svelte-cf77e8');
		},
		m(i, B) {
			V(i, h, B),
				V(i, e, B),
				t(e, f),
				t(f, b),
				t(e, E),
				t(e, p),
				t(p, S),
				t(p, u),
				t(u, k),
				t(p, x),
				t(e, A),
				t(e, g),
				t(g, J),
				t(e, P),
				t(e, y),
				t(y, K),
				t(e, O),
				t(e, c),
				t(c, D),
				t(c, v),
				t(v, H),
				t(c, q);
		},
		p: L,
		i: L,
		o: L,
		d(i) {
			i && a(h), i && a(e);
		}
	};
}
const $ = W,
	tt = U,
	et = !0;
class at extends F {
	constructor(h) {
		super();
		G(this, h, null, X, N, {});
	}
}
export { at as default, $ as hydrate, et as prerender, tt as router };
