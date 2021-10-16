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
		<h4>
			Unfortunately, your form was not sent 
		</h4>
	</div>
	<div class="form">
		<form action="#" id="form" class="form__body">
			<h1 class="form__title">
				Form sender to mail
			</h1>
			<div class="form__item">
				<label for="formName" class="form__label">Ім'я*</label>
				<input id="formName" type="text" name ="name" class = "form__input _req">
			</div>
			<div class="form__item">
				<label for="formEmail" class="form__label">Пошта*</label>
				<input id="formEmail" type="text" name ="email" class = "form__input _req _email">
			</div>
			<div class="form__item">
				<label for="formMessage" class="form__label">Повідомлення*</label>
				<textarea name="message" id="formMessage" class = "form__input _req" cols="30" rows="6"></textarea>
			</div>
			<div class="form__item">	
				<div class="form__label">
					Стать*
				</div>
				<select name="sex" class="select _req">
					<option value="чоловік" selected>Чоловіча</option>
					<option value="жінка">Жіноча</option>
				</select>
				<br>
				<button type="submit" class="form__button">Відправити</button>
			</div>
		</form>
		<script src="../../build/_app/script.js"></script>
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
