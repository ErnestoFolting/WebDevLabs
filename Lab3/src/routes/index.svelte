<script context="module">
	export const ssr = false;
</script>

<script>
	import { onMount } from 'svelte';
	import { Circle3 } from 'svelte-loading-spinners';
	import Content from '../lib/header/Content.svelte';
	import { createClient, defaultExchanges, subscriptionExchange } from '@urql/core';
	import { createClient as createWSClient } from 'graphql-ws';
	import { setClient, operationStore, subscription } from '@urql/svelte';
	import { doQuery } from '$lib/hasura.js';
	import { msgCheck } from '../store';

	let errorOccured = false;
	let notes;
	let inputNote;
	let authorInput;
	let textInput;
	let XBtnDisable = false;
	let showSpinner = false;
	let date = new Date(Date.now());

	function resetStatus() {
		XBtnDisable = showSpinner = false;
	}

	function errorHandle(errors) {
		if (Array.isArray(errors)) {
			$msgCheck = `Error ${errors.map((error) => error?.message ?? '').join('.')}`;
			return;
		}
		if (errors?.message === 'hasura cloud limit of 60 requests/minute exceeded') {
			$msgCheck = 'You make a lot of requests. Try later';
			return;
		}
		$msgCheck = `Error / No internet connection ${errors?.message ?? ''}`;
	}

	const wsClient = createWSClient({
		url: import.meta.env.VITE_API_WSS_ENDPOINT,
		reconnect: true,
		connectionParams: {
			headers: {
				'content-type': 'application/json',
				'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN
			}
		}
	});

	const client = createClient({
		url: import.meta.env.VITE_API_HTTPS_ENDPOINT,
		exchanges: [
			...defaultExchanges,
			subscriptionExchange({
				forwardSubscription: (operation) => ({
					subscribe: (sink) => ({
						unsubscribe: wsClient.subscribe(operation, sink)
					})
				})
			})
		]
	});

	const messages = operationStore(`
    	subscription MySubscription {
    		notes {
      		author
      		date
      		id
      		text
    	}
 	}
  	`);

	setClient(client);

	const handleSubscription = (messages = [], data) => {
		notes = data.notes;
		resetStatus();
		return [data.notes, ...messages];
	};

	subscription(messages, handleSubscription);

	async function startExecuteDeleteCurrentNote(_eq) {
		showSpinner = XBtnDisable = true;

		const { errors, data } = await doQuery('deleteCurrentNote', { _eq: _eq });
		if (errors) {
			throw errors;
		}
		await startFetchMyQuery();
	}

	async function startExecuteMyMutation() {
		showSpinner = XBtnDisable = true;
		const { errors, data } = await doQuery('MyMutation');
		if (errors) {
			throw errors;
		}
		await startFetchMyQuery();
	}

	async function deleteAll() {
		startExecuteMyMutation().catch(errorHandle).finally(resetStatus);
	}

	async function startFetchMyQuery() {
		const { errors, data } = await doQuery('MyQuery');
		errorOccured = false;
		if (errors) {
			errorOccured = true;
			throw errors;
		}
		notes = data.notes;
	}

	async function startExecuteAddNote(author, date, text) {
		showSpinner = XBtnDisable = true;
		const { errors, data } = await doQuery('AddNote', { author: author, date: date, text: text });
		if (errors) {
			throw errors;
		}
		await startFetchMyQuery();
	}

	function addNote() {
		if (authorInput.value.length >= 3 && textInput.value.length >= 3) {
			startExecuteAddNote(authorInput.value, date, textInput.value)
				.catch(errorHandle)
				.finally(resetStatus);
			inputNote.reset();
			return;
		}
		$msgCheck = 'Input data into poles! At least 3 symbols.';
		inputNote.reset();
	}

	function deleteCurrent(event) {
		let id = event.target.dataset.id;
		startExecuteDeleteCurrentNote(id).catch(errorHandle).finally(resetStatus);
	}

	onMount(async () => {
		startFetchMyQuery()
			.catch((errors) => {
				errorHandle(errors);
				errorOccured = true;
			})
			.finally(resetStatus);
	});
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>
<body>
	{#if $msgCheck}
		<Content />
	{/if}
	<div class="wrapper">
		<div class="control-panel">
			<h1>Notes list:</h1>
			{#if showSpinner}
				<div class="main-spinner">
					<Circle3 size="40" unit="px" duration="1s" />
				</div>
			{:else}
				<form class="input-form" bind:this={inputNote}>
					<input
						type="text"
						bind:this={authorInput}
						name="authorInput"
						maxlength="25"
						placeholder="Input your name"
					/>
					<textarea
						name="text"
						bind:this={textInput}
						class="textInput"
						maxlength="96"
						placeholder="Input your note"
					/>
				</form>
				<div class="buttons">
					<button class="button-delete-all" disabled={XBtnDisable} on:click={deleteAll}
						>Delete all</button
					>
					<button class="button-add-note" disabled={XBtnDisable} on:click={addNote}>Add note</button
					>
				</div>
			{/if}
		</div>
		<div class="notes">
			{#if errorOccured === true}
				<p style="color:red">No internet connection.</p>
			{:else if !notes}
				<Circle3 size="40" unit="px" duration="1s" />
			{:else}
				<h3>The number of notes: {notes.length}</h3>
				<ul>
					{#each notes as { author, date, text, id } (id)}
						<li>
							<p>
								<strong>{author}</strong> <br /> <strong>Text:</strong>
								{text} <br />
								{date}
								<br />
								<button
									class="delete-current"
									data-id={id}
									disabled={XBtnDisable}
									on:click={(event) => deleteCurrent(event)}
								>
									X
								</button>
							</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</body>

<style>
	:root {
		--delete-color: red;
		--add-color: rgb(27, 185, 27);
		--p-hover-color: rgba(104, 107, 107, 0.425);
		--button-hover-color: rgb(190, 179, 179);
		--p-color: #8ddde9;
	}
	.main-spinner {
		display: flex;
		justify-content: center;
	}
	textarea {
		resize: none;
	}
	.input-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	body {
		max-width: 100%;
	}
	.wrapper {
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.control-panel {
		min-height: 330px;
		flex: 1;
		justify-content: center;
	}
	.notes {
		flex: 3;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	ul {
		padding-left: 0;
	}
	.delete-current {
		position: absolute;
		top: 0;
		right: 0;
		border: 0;
		cursor: pointer;
		background-color: var(--delete-color);
		border-radius: 10px;
	}
	li p:hover {
		background-color: var(--p-hover-color);
	}
	li {
		list-style-type: none;
	}
	li p {
		position: relative;
		background-color: var(--p-color);
		min-height: 50px;
		max-width: 300px;
		border-radius: 15px;
		text-align: center;
		word-wrap: break-word;
		padding: 15px 15px;
	}
	.button-add-note {
		cursor: pointer;
		background-color: var(--add-color);
		border: 0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display: inline-block;
		border-radius: 15px;
	}
	.button-delete-all {
		cursor: pointer;
		background-color: var(--delete-color);
		border: 0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display: inline-block;
		border-radius: 15px;
	}
	.button-delete-all:hover,
	.button-add-note:hover {
		background-color: var(--button-hover-color);
	}
	h1 {
		width: 100%;
	}
</style>
