import{S as xt,i as Rt,s as At,k as l,e as n,t as c,P as Nt,d as r,n as i,c as s,a as o,g as u,b as e,f as qt,I as t,J as vt}from"../chunks/vendor-9696d423.js";function Gt(Vt){let q,m,V,G,F,H,x,C,J,Y,v,a,R,$,X,E,B,z,K,S,Q,h,I,W,Z,O,tt,g,w,et,nt,p,rt,d,A,st,ot,L,_,at,y,lt,it,dt,mt,D,ct,ut,P,ft;return{c(){q=l(),m=n("section"),V=n("div"),G=n("h4"),F=c("Your form was successfuly sent!"),H=l(),x=n("div"),C=n("h4"),J=c("Unfortunately, your form was not sent"),Y=l(),v=n("div"),a=n("form"),R=n("h1"),$=c("Form sender to mail"),X=l(),E=n("div"),B=n("label"),z=c("\u0406\u043C'\u044F*"),K=l(),S=n("input"),Q=l(),h=n("div"),I=n("label"),W=c("\u041F\u043E\u0448\u0442\u0430*"),Z=l(),O=n("input"),tt=l(),g=n("div"),w=n("label"),et=c("\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F*"),nt=l(),p=n("textarea"),rt=l(),d=n("div"),A=n("div"),st=c("\u0421\u0442\u0430\u0442\u044C*"),ot=l(),L=n("select"),_=n("option"),at=c("\u0427\u043E\u043B\u043E\u0432\u0456\u0447\u0430"),y=n("option"),lt=c("\u0416\u0456\u043D\u043E\u0447\u0430"),it=l(),dt=n("br"),mt=l(),D=n("button"),ct=c("\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438"),ut=l(),P=n("script"),ft=c(`'use strict';
			const debounce = (fn, delay) => {
				let timeOut;
				return function (...args) {
					if (timeOut) {
						clearTimeout(timeOut);
					}
					timeOut = setTimeout(() => {
						fn(...args);
					}, delay);
				};
			};
			document.addEventListener('DOMContentLoaded', function () {
				const form = document.getElementById('form');
				const responseGood = document.getElementById('responseGood');
				const responseBad = document.getElementById('responseBad');
				form.addEventListener('submit', preSend);
				form.addEventListener('submit', debounce(formSend, 1000));
				async function preSend(e) {
					form.classList.add('_sending');
					e.preventDefault();
				}
				async function formSend() {
					responseBad.classList.remove('_sending');
					responseGood.classList.remove('_sending');
					const referrerValue = document.referrer;
					let formData = {
						Name: form.elements.name.value,
						Email: form.elements.email.value,
						Message: form.elements.message.value,
						Sex: form.elements.sex.value,
						referrer: referrerValue
					};
					console.log(formData);
					let error = formValidate();
					if (error === 0) {
						let response = await fetch('/api/sendmail', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json;charset=utf-8'
							},
							body: JSON.stringify(formData)
						});
						console.log(response.status);
						if (response.ok) {
							responseGood.classList.add('_sending');
							responseBad.classList.remove('_sending');
							form.reset();
							form.classList.remove('_sending');
						} else {
							responseBad.classList.add('_sending');
							responseGood.classList.remove('_sending');
							alert('\u041F\u043E\u043C\u0438\u043B\u043A\u0430');
							alert(response.status);
							form.reset();
							form.classList.remove('_sending');
						}
					} else {
						alert("\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F \u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email");
						form.classList.remove('_sending');
					}
				}
				function formValidate() {
					let error = 0;
					let formReq = document.querySelectorAll('._req');
					for (let i = 0; i < formReq.length; i++) {
						const input = formReq[i];
						formRemoveError(input);

						if (input.classList.contains('_email')) {
							if (emailTest(input)) {
								formAddError(input);
								error++;
							}
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}
				function formAddError(input) {
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
				function formRemoveError(input) {
					input.parentElement.classList.remove('_error');
					input.classList.remove('_error');
				}
				function emailTest(input) {
					return !/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(input.value);
				}
			});`),this.h()},l(b){Nt('[data-svelte="svelte-r87bl5"]',document.head).forEach(r),q=i(b),m=s(b,"SECTION",{class:!0});var N=o(m);V=s(N,"DIV",{id:!0});var Et=o(V);G=s(Et,"H4",{});var ht=o(G);F=u(ht,"Your form was successfuly sent!"),ht.forEach(r),Et.forEach(r),H=i(N),x=s(N,"DIV",{id:!0});var gt=o(x);C=s(gt,"H4",{});var Lt=o(C);J=u(Lt,"Unfortunately, your form was not sent"),Lt.forEach(r),gt.forEach(r),Y=i(N),v=s(N,"DIV",{class:!0});var M=o(v);a=s(M,"FORM",{action:!0,id:!0,class:!0});var f=o(a);R=s(f,"H1",{class:!0});var yt=o(R);$=u(yt,"Form sender to mail"),yt.forEach(r),X=i(f),E=s(f,"DIV",{class:!0});var U=o(E);B=s(U,"LABEL",{for:!0,class:!0});var bt=o(B);z=u(bt,"\u0406\u043C'\u044F*"),bt.forEach(r),K=i(U),S=s(U,"INPUT",{id:!0,type:!0,name:!0,class:!0}),U.forEach(r),Q=i(f),h=s(f,"DIV",{class:!0});var k=o(h);I=s(k,"LABEL",{for:!0,class:!0});var Tt=o(I);W=u(Tt,"\u041F\u043E\u0448\u0442\u0430*"),Tt.forEach(r),Z=i(k),O=s(k,"INPUT",{id:!0,type:!0,name:!0,class:!0}),k.forEach(r),tt=i(f),g=s(f,"DIV",{class:!0});var j=o(g);w=s(j,"LABEL",{for:!0,class:!0});var Bt=o(w);et=u(Bt,"\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F*"),Bt.forEach(r),nt=i(j),p=s(j,"TEXTAREA",{name:!0,id:!0,class:!0,cols:!0,rows:!0}),o(p).forEach(r),j.forEach(r),rt=i(f),d=s(f,"DIV",{class:!0});var T=o(d);A=s(T,"DIV",{class:!0});var St=o(A);st=u(St,"\u0421\u0442\u0430\u0442\u044C*"),St.forEach(r),ot=i(T),L=s(T,"SELECT",{name:!0,class:!0});var _t=o(L);_=s(_t,"OPTION",{});var It=o(_);at=u(It,"\u0427\u043E\u043B\u043E\u0432\u0456\u0447\u0430"),It.forEach(r),y=s(_t,"OPTION",{});var Ot=o(y);lt=u(Ot,"\u0416\u0456\u043D\u043E\u0447\u0430"),Ot.forEach(r),_t.forEach(r),it=i(T),dt=s(T,"BR",{}),mt=i(T),D=s(T,"BUTTON",{type:!0,class:!0});var wt=o(D);ct=u(wt,"\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438"),wt.forEach(r),T.forEach(r),f.forEach(r),ut=i(M),P=s(M,"SCRIPT",{});var Dt=o(P);ft=u(Dt,`'use strict';
			const debounce = (fn, delay) => {
				let timeOut;
				return function (...args) {
					if (timeOut) {
						clearTimeout(timeOut);
					}
					timeOut = setTimeout(() => {
						fn(...args);
					}, delay);
				};
			};
			document.addEventListener('DOMContentLoaded', function () {
				const form = document.getElementById('form');
				const responseGood = document.getElementById('responseGood');
				const responseBad = document.getElementById('responseBad');
				form.addEventListener('submit', preSend);
				form.addEventListener('submit', debounce(formSend, 1000));
				async function preSend(e) {
					form.classList.add('_sending');
					e.preventDefault();
				}
				async function formSend() {
					responseBad.classList.remove('_sending');
					responseGood.classList.remove('_sending');
					const referrerValue = document.referrer;
					let formData = {
						Name: form.elements.name.value,
						Email: form.elements.email.value,
						Message: form.elements.message.value,
						Sex: form.elements.sex.value,
						referrer: referrerValue
					};
					console.log(formData);
					let error = formValidate();
					if (error === 0) {
						let response = await fetch('/api/sendmail', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json;charset=utf-8'
							},
							body: JSON.stringify(formData)
						});
						console.log(response.status);
						if (response.ok) {
							responseGood.classList.add('_sending');
							responseBad.classList.remove('_sending');
							form.reset();
							form.classList.remove('_sending');
						} else {
							responseBad.classList.add('_sending');
							responseGood.classList.remove('_sending');
							alert('\u041F\u043E\u043C\u0438\u043B\u043A\u0430');
							alert(response.status);
							form.reset();
							form.classList.remove('_sending');
						}
					} else {
						alert("\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F \u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email");
						form.classList.remove('_sending');
					}
				}
				function formValidate() {
					let error = 0;
					let formReq = document.querySelectorAll('._req');
					for (let i = 0; i < formReq.length; i++) {
						const input = formReq[i];
						formRemoveError(input);

						if (input.classList.contains('_email')) {
							if (emailTest(input)) {
								formAddError(input);
								error++;
							}
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}
				function formAddError(input) {
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
				function formRemoveError(input) {
					input.parentElement.classList.remove('_error');
					input.classList.remove('_error');
				}
				function emailTest(input) {
					return !/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(input.value);
				}
			});`),Dt.forEach(r),M.forEach(r),N.forEach(r),this.h()},h(){document.title="Sender",e(V,"id","responseGood"),e(x,"id","responseBad"),e(R,"class","form__title svelte-1bgohwt"),e(B,"for","formName"),e(B,"class","form__label"),e(S,"id","formName"),e(S,"type","text"),e(S,"name","name"),e(S,"class","form__input _req"),e(E,"class","form__item"),e(I,"for","formEmail"),e(I,"class","form__label"),e(O,"id","formEmail"),e(O,"type","text"),e(O,"name","email"),e(O,"class","form__input _req _email"),e(h,"class","form__item"),e(w,"for","formMessage"),e(w,"class","form__label"),e(p,"name","message"),e(p,"id","formMessage"),e(p,"class","form__input _req"),e(p,"cols","30"),e(p,"rows","6"),e(g,"class","form__item"),e(A,"class","form__label"),_.__value="\u0447\u043E\u043B\u043E\u0432\u0456\u043A",_.value=_.__value,_.selected=!0,y.__value="\u0436\u0456\u043D\u043A\u0430",y.value=y.__value,e(L,"name","sex"),e(L,"class","select _req"),e(D,"type","submit"),e(D,"class","form__button"),e(d,"class","form__item"),e(a,"action","#"),e(a,"id","form"),e(a,"class","form__body"),e(v,"class","form"),e(m,"class","svelte-1bgohwt")},m(b,pt){qt(b,q,pt),qt(b,m,pt),t(m,V),t(V,G),t(G,F),t(m,H),t(m,x),t(x,C),t(C,J),t(m,Y),t(m,v),t(v,a),t(a,R),t(R,$),t(a,X),t(a,E),t(E,B),t(B,z),t(E,K),t(E,S),t(a,Q),t(a,h),t(h,I),t(I,W),t(h,Z),t(h,O),t(a,tt),t(a,g),t(g,w),t(w,et),t(g,nt),t(g,p),t(a,rt),t(a,d),t(d,A),t(A,st),t(d,ot),t(d,L),t(L,_),t(_,at),t(L,y),t(y,lt),t(d,it),t(d,dt),t(d,mt),t(d,D),t(D,ct),t(v,ut),t(v,P),t(P,ft)},p:vt,i:vt,o:vt,d(b){b&&r(q),b&&r(m)}}}const Pt=!0;class Mt extends xt{constructor(q){super();Rt(this,q,null,Gt,At,{})}}export{Mt as default,Pt as prerender};
