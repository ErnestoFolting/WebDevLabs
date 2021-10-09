<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from '$lib/Counter.svelte';

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>
	</h1>
	<div class="form">
		<form action="#" id="form" class="form__body">
			<h1 class="form__title">
				Form sender to mail
			</h1>
			<div class="form__item">
				<label for="formName" class="form__label">Ім'я*</label>
				<input id="formName" type="text" name ="name" class = "form__input">
			</div>
			<div class="form__item">
				<label for="formEmail" class="form__label">Пошта*</label>
				<input id="formEmail" type="text" name ="email" class = "form__input">
			</div>
			<div class="form__item">
				<label for="formMessage" class="form__label">Повідомлення*</label>
				<textarea name="message" id="formMessage" class = "form__input" cols="30" rows="6"></textarea>
			</div>
			<div class="form__item">	
				<div class="form__label">
					Стать*
				</div>
				<select name="age" class="select">
					<option value="чоловік" selected>Чоловіча</option>
					<option value="жінка">Жіноча</option>
				</select>
				<br>
				<button type="submit" class="form__button">Відправити</button>
			</div>
		</form>
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

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
