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
	import {msgCheck} from '../store';

	let errorOccured = false;
	let notes;
	let inputNote;
	let authorInput;
	let textInput;
	let XBtnDisable = false;
	let showSpinner = false;
	let showCurrentSpinner = false;
	let date = new Date(Date.now());

	function resetStatus() {
		XBtnDisable = showSpinner = showCurrentSpinner = false;
	}

	function errorHandle(errors) {
		if (errors?.message === 'hasura cloud limit of 60 requests/minute exceeded') {
			$msgCheck = 'You make a lot of requests. Try later';
			resetStatus();
			return true;
		}

		$msgCheck = `Server Error / No internet connection ${errors?.message ?? ''}`;
		resetStatus();
		return true;
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
		console.log([...data.notes]);
		notes = data.notes;
		resetStatus();
		return [data.notes, ...messages];
	};

	subscription(messages, handleSubscription);

	async function startExecuteDeleteCurrentNote(_eq) {
		showCurrentSpinner = true;
		XBtnDisable = true;
		const { errors, data } = await doQuery('deleteCurrentNote', { _eq: _eq });
		console.log(data);
		if (errors) {
			errorHandle();
		}
		startFetchMyQuery()
			.then(() => {
				resetStatus();
			})
			.catch(() => errorHandle());
	}

	async function startExecuteMyMutation() {
		showSpinner = true;
		XBtnDisable = true;
		const { errors, data } = await doQuery('MyMutation');
		console.log(data);
		if (errors) {
			errorHandle();
		}
		startFetchMyQuery()
			.then(() => {
				resetStatus();
			})
			.catch(() => errorHandle());
	}

	async function deleteAll() {
		startExecuteMyMutation().catch(() => errorHandle());
	}

	async function startFetchMyQuery() {
		const { errors, data } = await doQuery('MyQuery');
		errorOccured = false;
		if (errors) {
			errorOccured = true;
			errorHandle();
		}
		notes = data.notes;
	}

	async function startExecuteAddNote(author, date, text) {
		showSpinner = true;
		XBtnDisable = true;
		const { errors, data } = await doQuery('AddNote', { author: author, date: date, text: text });
		console.log(data);
		if (errors) {
			errorHandle();
		}
		startFetchMyQuery()
			.then(() => {
				resetStatus();
			})
			.catch(() => errorHandle());
	}

	function addNote() {
		if (authorInput.value.length >= 3 && textInput.value.length >= 3) {
			startExecuteAddNote(authorInput.value, date, textInput.value).catch(() => errorHandle());
			inputNote.reset();
		} else {
			$msgCheck = 'Input data into poles! At least 3 symbols.';
			resetStatus();
			inputNote.reset();
		}
	}

	function deleteCurrent(event) {
		let id = event.target.dataset.id;
		startExecuteDeleteCurrentNote(id).catch(() => errorHandle());
	}

	onMount(async () => {
		startFetchMyQuery()
			.then(() => {
				resetStatus();
			})
			.catch(() => {
				errorHandle();
				errorOccured = true;
			});
	});
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>
<body>
	{#if $msgCheck}
		<Content/>
	{/if}
	<div class="wrapper">
		<div class="controlPanel">
			<h1>Notes list:</h1>
			{#if showSpinner}
				<div class="mainSpinner">
					<Circle3 size="40" unit="px" duration="1s" />
				</div>
			{:else}
				<form class="inputForm" bind:this={inputNote}>
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
					<button class="buttonDeleteAll" disabled={XBtnDisable} on:click={deleteAll}
						>Delete all</button
					>
					<button class="buttonAddNote" disabled={XBtnDisable} on:click={addNote}>Add note</button>
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
				{#if showCurrentSpinner}
					<Circle3 size="30" unit="px" duration="1s" />
				{:else}
					<ul>
						{#each notes as { author, date, text, id } (id)}
							<li>
								<p>
									<strong>{author}</strong> <br /> <strong>Text:</strong>
									{text} <br />
									{date}
									<br />
									<button
										class="deleteCurrent"
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
			{/if}
		</div>
	</div>
</body>

<style>
	.mainSpinner {
		display: flex;
		justify-content: center;
	}
	textarea {
		resize: none;
	}
	.inputForm {
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
	.controlPanel {
		min-height: 320px;
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
	.deleteCurrent {
		position: absolute;
		top: 0;
		right: 0;
		border: 0;
		cursor: pointer;
		background-color: rgba(230, 77, 77, 0.514);
		border-radius: 10px;
	}
	li p:hover {
		background-color: rgba(104, 107, 107, 0.425);
	}
	li {
		list-style-type: none;
	}
	li p {
		position: relative;
		background-color: #8ddde9;
		min-height: 50px;
		max-width: 300px;
		border-radius: 15px;
		text-align: center;
		word-wrap: break-word;
		padding: 15px 15px;
	}
	.buttonAddNote {
		cursor: pointer;
		background-color: rgb(27, 185, 27);
		border: 0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display: inline-block;
		border-radius: 15px;
	}
	.buttonDeleteAll {
		cursor: pointer;
		background-color: red;
		border: 0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display: inline-block;
		border-radius: 15px;
	}
	.buttonDeleteAll:hover,
	.buttonAddNote:hover {
		background-color: rgb(190, 179, 179);
	}
	h1 {
		width: 100%;
	}
</style>
