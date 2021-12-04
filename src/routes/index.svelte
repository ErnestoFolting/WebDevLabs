<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>Sender</title>
</svelte:head>

<section>
	<div id="responseGood">
		<h4>Your form was successfuly sent!</h4>
	</div>
	<div id="responseBad">
		<h4>Unfortunately, your form was not sent</h4>
	</div>
	<div class="form">
		<form action="#" id="form" class="form__body">
			<h1 class="form__title">Form sender to mail</h1>
			<div class="form__item">
				<label for="formName" class="form__label">Ім'я*</label>
				<input id="formName" type="text" name="name" class="form__input _req" />
			</div>
			<div class="form__item">
				<label for="formEmail" class="form__label">Пошта*</label>
				<input id="formEmail" type="text" name="email" class="form__input _req _email" />
			</div>
			<div class="form__item">
				<label for="formMessage" class="form__label">Повідомлення*</label>
				<textarea name="message" id="formMessage" class="form__input _req" cols="30" rows="6" />
			</div>
			<div class="form__item">
				<div class="form__label">Стать*</div>
				<select name="sex" class="select _req">
					<option value="чоловік" selected>Чоловіча</option>
					<option value="жінка">Жіноча</option>
				</select>
				<br />
				<button type="submit" class="form__button">Відправити</button>
			</div>
		</form>
		<script>
			'use strict';
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
					let formData = {};
					Array.from(form.elements)
					.filter(el=>el.tagName !== 'BUTTON')
					.forEach(element => {
						formData[element.name] = element.value
						
					});
					formData['referrer'] = referrerValue;
					
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
							alert('Помилка');
							alert(response.status);
							form.reset();
							form.classList.remove('_sending');
						}
					} else {
						alert("Заповніть обов'язкові поля та перевірте email");
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
					return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
				}
			});
		</script>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
