import{D as dt,S as lt,i as nt,s as rt,e as p,k as A,E as V,t as M,c as h,a as u,d as n,n as L,F as z,g as j,G as pt,b as s,H as N,f as B,I as l,J as ot,K as ht,L as it,j as _t,m as mt,o as gt,M as ct,N as ft,O as ut,x as Z,u as J,v as bt}from"../chunks/vendor-9696d423.js";const wt=()=>{const o=dt("__svelte__");return{page:{subscribe:o.page.subscribe},navigating:{subscribe:o.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:o.navigating.subscribe}},session:o.session}},$t={subscribe(o){return wt().page.subscribe(o)}};var Et="/_app/assets/svelte-logo-87df40b8.svg";function qt(o){let t,v,r,i,c,e,f,m,E,k,b,g,w,_,a,d,q,I,C,x,S,F,G,H,D,R,O;return{c(){t=p("header"),v=p("div"),r=p("a"),i=p("img"),e=A(),f=p("nav"),m=V("svg"),E=V("path"),k=A(),b=p("ul"),g=p("li"),w=p("a"),_=M("Home"),a=A(),d=p("li"),q=p("a"),I=M("About"),C=A(),x=p("li"),S=p("a"),F=M("Todos"),G=A(),H=V("svg"),D=V("path"),R=A(),O=p("div"),this.h()},l(y){t=h(y,"HEADER",{class:!0});var $=u(t);v=h($,"DIV",{class:!0});var P=u(v);r=h(P,"A",{href:!0,class:!0});var U=u(r);i=h(U,"IMG",{src:!0,alt:!0,class:!0}),U.forEach(n),P.forEach(n),e=L($),f=h($,"NAV",{class:!0});var K=u(f);m=z(K,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var Y=u(m);E=z(Y,"path",{d:!0,class:!0}),u(E).forEach(n),Y.forEach(n),k=L(K),b=h(K,"UL",{class:!0});var T=u(b);g=h(T,"LI",{class:!0});var Q=u(g);w=h(Q,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var W=u(w);_=j(W,"Home"),W.forEach(n),Q.forEach(n),a=L(T),d=h(T,"LI",{class:!0});var X=u(d);q=h(X,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var tt=u(q);I=j(tt,"About"),tt.forEach(n),X.forEach(n),C=L(T),x=h(T,"LI",{class:!0});var et=u(x);S=h(et,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var st=u(S);F=j(st,"Todos"),st.forEach(n),et.forEach(n),T.forEach(n),G=L(K),H=z(K,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var at=u(H);D=z(at,"path",{d:!0,class:!0}),u(D).forEach(n),at.forEach(n),K.forEach(n),R=L($),O=h($,"DIV",{class:!0});var vt=u(O);vt.forEach(n),$.forEach(n),this.h()},h(){pt(i.src,c=Et)||s(i,"src",c),s(i,"alt","SvelteKit"),s(i,"class","svelte-t2wq17"),s(r,"href","https://kit.svelte.dev"),s(r,"class","svelte-t2wq17"),s(v,"class","corner svelte-t2wq17"),s(E,"d","M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"),s(E,"class","svelte-t2wq17"),s(m,"viewBox","0 0 2 3"),s(m,"aria-hidden","true"),s(m,"class","svelte-t2wq17"),s(w,"sveltekit:prefetch",""),s(w,"href","/"),s(w,"class","svelte-t2wq17"),s(g,"class","svelte-t2wq17"),N(g,"active",o[0].path==="/"),s(q,"sveltekit:prefetch",""),s(q,"href","/about"),s(q,"class","svelte-t2wq17"),s(d,"class","svelte-t2wq17"),N(d,"active",o[0].path==="/about"),s(S,"sveltekit:prefetch",""),s(S,"href","/todos"),s(S,"class","svelte-t2wq17"),s(x,"class","svelte-t2wq17"),N(x,"active",o[0].path==="/todos"),s(b,"class","svelte-t2wq17"),s(D,"d","M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"),s(D,"class","svelte-t2wq17"),s(H,"viewBox","0 0 2 3"),s(H,"aria-hidden","true"),s(H,"class","svelte-t2wq17"),s(f,"class","svelte-t2wq17"),s(O,"class","corner svelte-t2wq17"),s(t,"class","svelte-t2wq17")},m(y,$){B(y,t,$),l(t,v),l(v,r),l(r,i),l(t,e),l(t,f),l(f,m),l(m,E),l(f,k),l(f,b),l(b,g),l(g,w),l(w,_),l(b,a),l(b,d),l(d,q),l(q,I),l(b,C),l(b,x),l(x,S),l(S,F),l(f,G),l(f,H),l(H,D),l(t,R),l(t,O)},p(y,[$]){$&1&&N(g,"active",y[0].path==="/"),$&1&&N(d,"active",y[0].path==="/about"),$&1&&N(x,"active",y[0].path==="/todos")},i:ot,o:ot,d(y){y&&n(t)}}}function xt(o,t,v){let r;return ht(o,$t,i=>v(0,r=i)),[r]}class kt extends lt{constructor(t){super();nt(this,t,xt,qt,rt,{})}}function yt(o){let t,v,r,i,c,e,f,m,E,k,b,g;const w=o[0].default,_=it(w,o,o[1],null);return{c(){t=p("main"),_&&_.c(),v=A(),r=p("footer"),i=p("p"),c=M("visit "),e=p("a"),f=M("kit.svelte.dev"),m=M(" to learn SvelteKit"),E=A(),k=p("style"),b=M(`main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}`),this.h()},l(a){t=h(a,"MAIN",{});var d=u(t);_&&_.l(d),d.forEach(n),v=L(a),r=h(a,"FOOTER",{});var q=u(r);i=h(q,"P",{});var I=u(i);c=j(I,"visit "),e=h(I,"A",{href:!0});var C=u(e);f=j(C,"kit.svelte.dev"),C.forEach(n),m=j(I," to learn SvelteKit"),I.forEach(n),q.forEach(n),E=L(a),k=h(a,"STYLE",{});var x=u(k);b=j(x,`main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}`),x.forEach(n),this.h()},h(){s(e,"href","https://kit.svelte.dev")},m(a,d){B(a,t,d),_&&_.m(t,null),B(a,v,d),B(a,r,d),l(r,i),l(i,c),l(i,e),l(e,f),l(i,m),B(a,E,d),B(a,k,d),l(k,b),g=!0},p(a,d){_&&_.p&&(!g||d&2)&&ct(_,w,a,a[1],g?ut(w,a[1],d,null):ft(a[1]),null)},i(a){g||(Z(_,a),g=!0)},o(a){J(_,a),g=!1},d(a){a&&n(t),_&&_.d(a),a&&n(v),a&&n(r),a&&n(E),a&&n(k)}}}function At(o){let t,v,r;t=new kt({props:{$$slots:{default:[yt]},$$scope:{ctx:o}}});const i=o[0].default,c=it(i,o,o[1],null);return{c(){_t(t.$$.fragment),v=A(),c&&c.c()},l(e){mt(t.$$.fragment,e),v=L(e),c&&c.l(e)},m(e,f){gt(t,e,f),B(e,v,f),c&&c.m(e,f),r=!0},p(e,[f]){const m={};f&2&&(m.$$scope={dirty:f,ctx:e}),t.$set(m),c&&c.p&&(!r||f&2)&&ct(c,i,e,e[1],r?ut(i,e[1],f,null):ft(e[1]),null)},i(e){r||(Z(t.$$.fragment,e),Z(c,e),r=!0)},o(e){J(t.$$.fragment,e),J(c,e),r=!1},d(e){bt(t,e),e&&n(v),c&&c.d(e)}}}function Lt(o,t,v){let{$$slots:r={},$$scope:i}=t;return o.$$set=c=>{"$$scope"in c&&v(1,i=c.$$scope)},[r,i]}class St extends lt{constructor(t){super();nt(this,t,Lt,At,rt,{})}}export{St as default};
