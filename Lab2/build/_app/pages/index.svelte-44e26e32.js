// eslint-disable-next-line no-unused-vars
import {
	S as xe,
	i as Re,
	s as Ae,
	k as l,
	e as t,
	t as c,
	P as Ne,
	d as r,
	n as i,
	c as s,
	a as o,
	g as u,
	b as n,
	f as qe,
	I as e,
	J as ve
} from '../chunks/vendor-9696d423.js';
function Ge() {
	let q,
		m,
		V,
		G,
		F,
		H,
		x,
		C,
		J,
		Y,
		v,
		a,
		R,
		$,
		X,
		E,
		B,
		z,
		K,
		S,
		Q,
		h,
		I,
		W,
		Z,
		O,
		ee,
		g,
		w,
		ne,
		te,
		p,
		re,
		d,
		A,
		se,
		oe,
		L,
		_,
		ae,
		y,
		le,
		ie,
		de,
		me,
		D,
		ce,
		ue,
		P,
		fe;
	return {
		c() {
			(q = l()),
				(m = t('section')),
				(V = t('div')),
				(G = t('h4')),
				(F = c('Your form was successfuly sent!')),
				(H = l()),
				(x = t('div')),
				(C = t('h4')),
				(J = c('Unfortunately, your form was not sent')),
				(Y = l()),
				(v = t('div')),
				(a = t('form')),
				(R = t('h1')),
				($ = c('Form sender to mail')),
				(X = l()),
				(E = t('div')),
				(B = t('label')),
				(z = c("\u0406\u043C'\u044F*")),
				(K = l()),
				(S = t('input')),
				(Q = l()),
				(h = t('div')),
				(I = t('label')),
				(W = c('\u041F\u043E\u0448\u0442\u0430*')),
				(Z = l()),
				(O = t('input')),
				(ee = l()),
				(g = t('div')),
				(w = t('label')),
				(ne = c('\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F*')),
				(te = l()),
				(p = t('textarea')),
				(re = l()),
				(d = t('div')),
				(A = t('div')),
				(se = c('\u0421\u0442\u0430\u0442\u044C*')),
				(oe = l()),
				(L = t('select')),
				(_ = t('option')),
				(ae = c('\u0427\u043E\u043B\u043E\u0432\u0456\u0447\u0430')),
				(y = t('option')),
				(le = c('\u0416\u0456\u043D\u043E\u0447\u0430')),
				(ie = l()),
				(de = t('br')),
				(me = l()),
				(D = t('button')),
				(ce = c('\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438')),
				(ue = l()),
				(P = t('script')),
				(fe = c(`"use strict"
const debounce = (fn,delay)=>{
    let timeOut;
    return function(...args){
        if(timeOut){
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(()=>{
            fn(...args)
        },delay);
    };
};
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const responseGood = document.getElementById('responseGood');
    const responseBad = document.getElementById('responseBad');
    form.addEventListener("submit", preSend);
    form.addEventListener("submit", debounce(formSend,1000));
    async function preSend(e){
        form.classList.add('_sending');
        e.preventDefault();
    }
    async function formSend(){
        responseBad.classList.remove('_sending');
        responseGood.classList.remove('_sending');
        const referrerValue = document.referrer;
        let formData = {
            Name :form.elements.name.value,
            Email :form.elements.email.value,
            Message : form.elements.message.value,
            Sex :form.elements.sex.value,
            referrer: referrerValue
        }
        console.log(formData);
        let error = formValidate();
        if(error === 0){

            let response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
              });
            console.log(response.status);
            if(response.ok){
                responseGood.classList.add('_sending'); 
                responseBad.classList.remove('_sending');
                form.reset();
                form.classList.remove('_sending');
            }else{
                responseBad.classList.add('_sending'); 
                responseGood.classList.remove('_sending');
                alert("\u041F\u043E\u043C\u0438\u043B\u043A\u0430");
                alert(response.status);
                form.reset();
                form.classList.remove('_sending');
            }
        }else{
            alert("\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F \u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email");
            form.classList.remove('_sending')
        }
    }
    function formValidate () {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for( let i = 0; i<formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(input.value);
    }
});`)),
				this.h();
		},
		l(b) {
			Ne('[data-svelte="svelte-r87bl5"]', document.head).forEach(r),
				(q = i(b)),
				(m = s(b, 'SECTION', { class: !0 }));
			var N = o(m);
			V = s(N, 'DIV', { id: !0 });
			var Ee = o(V);
			G = s(Ee, 'H4', {});
			var he = o(G);
			(F = u(he, 'Your form was successfuly sent!')),
				he.forEach(r),
				Ee.forEach(r),
				(H = i(N)),
				(x = s(N, 'DIV', { id: !0 }));
			var ge = o(x);
			C = s(ge, 'H4', {});
			var Le = o(C);
			(J = u(Le, 'Unfortunately, your form was not sent')),
				Le.forEach(r),
				ge.forEach(r),
				(Y = i(N)),
				(v = s(N, 'DIV', { class: !0 }));
			var M = o(v);
			a = s(M, 'FORM', { action: !0, id: !0, class: !0 });
			var f = o(a);
			R = s(f, 'H1', { class: !0 });
			var ye = o(R);
			($ = u(ye, 'Form sender to mail')),
				ye.forEach(r),
				(X = i(f)),
				(E = s(f, 'DIV', { class: !0 }));
			var U = o(E);
			B = s(U, 'LABEL', { for: !0, class: !0 });
			var be = o(B);
			(z = u(be, "\u0406\u043C'\u044F*")),
				be.forEach(r),
				(K = i(U)),
				(S = s(U, 'INPUT', { id: !0, type: !0, name: !0, class: !0 })),
				U.forEach(r),
				(Q = i(f)),
				(h = s(f, 'DIV', { class: !0 }));
			var k = o(h);
			I = s(k, 'LABEL', { for: !0, class: !0 });
			var Te = o(I);
			(W = u(Te, '\u041F\u043E\u0448\u0442\u0430*')),
				Te.forEach(r),
				(Z = i(k)),
				(O = s(k, 'INPUT', { id: !0, type: !0, name: !0, class: !0 })),
				k.forEach(r),
				(ee = i(f)),
				(g = s(f, 'DIV', { class: !0 }));
			var j = o(g);
			w = s(j, 'LABEL', { for: !0, class: !0 });
			var Be = o(w);
			(ne = u(Be, '\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F*')),
				Be.forEach(r),
				(te = i(j)),
				(p = s(j, 'TEXTAREA', { name: !0, id: !0, class: !0, cols: !0, rows: !0 })),
				o(p).forEach(r),
				j.forEach(r),
				(re = i(f)),
				(d = s(f, 'DIV', { class: !0 }));
			var T = o(d);
			A = s(T, 'DIV', { class: !0 });
			var Se = o(A);
			(se = u(Se, '\u0421\u0442\u0430\u0442\u044C*')),
				Se.forEach(r),
				(oe = i(T)),
				(L = s(T, 'SELECT', { name: !0, class: !0 }));
			var _e = o(L);
			_ = s(_e, 'OPTION', {});
			var Ie = o(_);
			(ae = u(Ie, '\u0427\u043E\u043B\u043E\u0432\u0456\u0447\u0430')),
				Ie.forEach(r),
				(y = s(_e, 'OPTION', {}));
			var Oe = o(y);
			(le = u(Oe, '\u0416\u0456\u043D\u043E\u0447\u0430')),
				Oe.forEach(r),
				_e.forEach(r),
				(ie = i(T)),
				(de = s(T, 'BR', {})),
				(me = i(T)),
				(D = s(T, 'BUTTON', { type: !0, class: !0 }));
			var we = o(D);
			(ce = u(we, '\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438')),
				we.forEach(r),
				T.forEach(r),
				f.forEach(r),
				(ue = i(M)),
				(P = s(M, 'SCRIPT', {}));
			var De = o(P);
			(fe = u(
				De,
				`"use strict"
const debounce = (fn,delay)=>{
    let timeOut;
    return function(...args){
        if(timeOut){
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(()=>{
            fn(...args)
        },delay);
    };
};
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const responseGood = document.getElementById('responseGood');
    const responseBad = document.getElementById('responseBad');
    form.addEventListener("submit", preSend);
    form.addEventListener("submit", debounce(formSend,1000));
    async function preSend(e){
        form.classList.add('_sending');
        e.preventDefault();
    }
    async function formSend(){
        responseBad.classList.remove('_sending');
        responseGood.classList.remove('_sending');
        const referrerValue = document.referrer;
        let formData = {
            Name :form.elements.name.value,
            Email :form.elements.email.value,
            Message : form.elements.message.value,
            Sex :form.elements.sex.value,
            referrer: referrerValue
        }
        console.log(formData);
        let error = formValidate();
        if(error === 0){

            let response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
              });
            console.log(response.status);
            if(response.ok){
                responseGood.classList.add('_sending'); 
                responseBad.classList.remove('_sending');
                form.reset();
                form.classList.remove('_sending');
            }else{
                responseBad.classList.add('_sending'); 
                responseGood.classList.remove('_sending');
                alert("\u041F\u043E\u043C\u0438\u043B\u043A\u0430");
                alert(response.status);
                form.reset();
                form.classList.remove('_sending');
            }
        }else{
            alert("\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F \u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email");
            form.classList.remove('_sending')
        }
    }
    function formValidate () {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for( let i = 0; i<formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(input.value);
    }
});`
			)),
				De.forEach(r),
				M.forEach(r),
				N.forEach(r),
				this.h();
		},
		h() {
			(document.title = 'Sender'),
				n(V, 'id', 'responseGood'),
				n(x, 'id', 'responseBad'),
				n(R, 'class', 'form__title svelte-1bgohwt'),
				n(B, 'for', 'formName'),
				n(B, 'class', 'form__label'),
				n(S, 'id', 'formName'),
				n(S, 'type', 'text'),
				n(S, 'name', 'name'),
				n(S, 'class', 'form__input _req'),
				n(E, 'class', 'form__item'),
				n(I, 'for', 'formEmail'),
				n(I, 'class', 'form__label'),
				n(O, 'id', 'formEmail'),
				n(O, 'type', 'text'),
				n(O, 'name', 'email'),
				n(O, 'class', 'form__input _req _email'),
				n(h, 'class', 'form__item'),
				n(w, 'for', 'formMessage'),
				n(w, 'class', 'form__label'),
				n(p, 'name', 'message'),
				n(p, 'id', 'formMessage'),
				n(p, 'class', 'form__input _req'),
				n(p, 'cols', '30'),
				n(p, 'rows', '6'),
				n(g, 'class', 'form__item'),
				n(A, 'class', 'form__label'),
				(_.__value = '\u0447\u043E\u043B\u043E\u0432\u0456\u043A'),
				(_.value = _.__value),
				(_.selected = !0),
				(y.__value = '\u0436\u0456\u043D\u043A\u0430'),
				(y.value = y.__value),
				n(L, 'name', 'sex'),
				n(L, 'class', 'select _req'),
				n(D, 'type', 'submit'),
				n(D, 'class', 'form__button'),
				n(d, 'class', 'form__item'),
				n(a, 'action', '#'),
				n(a, 'id', 'form'),
				n(a, 'class', 'form__body'),
				n(v, 'class', 'form'),
				n(m, 'class', 'svelte-1bgohwt');
		},
		m(b, pe) {
			qe(b, q, pe),
				qe(b, m, pe),
				e(m, V),
				e(V, G),
				e(G, F),
				e(m, H),
				e(m, x),
				e(x, C),
				e(C, J),
				e(m, Y),
				e(m, v),
				e(v, a),
				e(a, R),
				e(R, $),
				e(a, X),
				e(a, E),
				e(E, B),
				e(B, z),
				e(E, K),
				e(E, S),
				e(a, Q),
				e(a, h),
				e(h, I),
				e(I, W),
				e(h, Z),
				e(h, O),
				e(a, ee),
				e(a, g),
				e(g, w),
				e(w, ne),
				e(g, te),
				e(g, p),
				e(a, re),
				e(a, d),
				e(d, A),
				e(A, se),
				e(d, oe),
				e(d, L),
				e(L, _),
				e(_, ae),
				e(L, y),
				e(y, le),
				e(d, ie),
				e(d, de),
				e(d, me),
				e(d, D),
				e(D, ce),
				e(v, ue),
				e(v, P),
				e(P, fe);
		},
		p: ve,
		i: ve,
		o: ve,
		d(b) {
			b && r(q), b && r(m);
		}
	};
}
const Pe = !0;
class Me extends xe {
	constructor(q) {
		super();
		Re(this, q, null, Ge, Ae, {});
	}
}
export { Me as default, Pe as prerender };
