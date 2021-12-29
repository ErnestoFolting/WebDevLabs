<script context="module">
	export const prerender = true;
</script>

<script>
	import { Circle3 } from 'svelte-loading-spinners';
	let textInError = '';
	let showSpinner = false;
	let showSuccess = false;
	let showError = false;
	let disableButton = false;
	let form = {
    reset: () => {},
  };
  let mainFormHandler = async e => {
	  showSuccess = false;
	  showError = false;
	  disableButton = true;
	  showSpinner = true;
	  let formData = Object.fromEntries(
		  Array.from(form.elements)
		  	.filter(element => element.tagName != 'BUTTON')
			.map(el => [el.name,el.value])
	  );
	  formData['referrer'] = document.referrer;
	  try{
		let response = await fetch('/api/sendmail', {
        	method: 'POST',
        	headers: {
          	'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
	  if(!response.ok){
		  throw response;
	  }
	  form.reset();
	  showSuccess = true;
	  return response;
  	} catch (e) {
		if (e.status >= 500) {
		textInError = 'The error on server';
      } else if (e.status === 400) {
        textInError = 'Null message';
      } else if (e.status === 429) {
        textInError = 'You sent the form too many times';
      }
	  showError = true;
	  }finally{
		  showSpinner = false;
		  disableButton = false;
	  }
  }
</script>

<svelte:head>
	<title>Sender</title>
</svelte:head>


<section>
	<h1>Hi, please, input the data and send the form</h1>
	<form class = "mainForm" bind:this = {form} on:submit|preventDefault={mainFormHandler}>
		<input class = 'formInput' type="text" name = 'userName'placeholder="Enter your name" required >
		<input class = 'formInput' type="email" name = 'userEmail'placeholder="Enter your email" required >
		<textarea class = 'formText' name="userText"  cols="30" rows="10" placeholder="Input text" required />
		<button class = "submitButton" type="submit" disabled = {disableButton}>
			{#if showSpinner}
				<Circle3 size="40" unit="px" duration="1s" />
			{/if}
			<h4>SEND</h4>
		</button>
		{#if showSuccess}
			<p class = 'successMessage'>
				Successfully sent!
			</p>
		{:else if showError}
			<p class = 'errorMessage'>
				Unfortunately, was not send. {textInError}
			</p>
		{/if}
	</form>
</section>
