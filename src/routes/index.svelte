<script context="module">
  export const ssr = false;
</script>
<script>
import { now } from "svelte/internal";
import {onMount} from "svelte";
import { Circle3 } from 'svelte-loading-spinners'

function errorHandle(errors) {
  showSpinner = false;
  XBtnDisable = false;
  showCurrentSpinner = false;
  if (errors?.message === 'hasura cloud limit of 60 requests/minute exceeded') {
    alert('You make a lot of requests. Try later');
    return true;
  }
  alert('Server Error/ No internet connection');
  return true;
}


import { createClient, defaultExchanges, subscriptionExchange } from '@urql/core';
  import { createClient as createWSClient } from 'graphql-ws';
  import { setClient, operationStore, subscription } from '@urql/svelte';

  const wsClient = createWSClient({
    url: import.meta.env.VITE_API_WSS_ENDPOINT,
    reconnect: true,
    connectionParams:{
      headers:{
        'content-type' : 'application/json',
        'x-hasura-admin-secret' : import.meta.env.VITE_HASURA_ADMIN,
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
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
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
    notes=data.notes;
    showSpinner = false;
    XBtnDisable = false;
    showCurrentSpinner = false;
    console.log("sub");
    return [data.notes, ...messages];
  };

  subscription(messages, handleSubscription);

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    import.meta.env.VITE_API_HTTPS_ENDPOINT,
    {
      headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret' : import.meta.env.VITE_HASURA_ADMIN,
      },
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const operationsDoc = `
query MyQuery {
    notes {
      author
      date
      text
      id
    }
  }
mutation MyMutation {
    delete_notes(where: {}) {
      affected_rows
    }
  }
  mutation AddNote($author: String = "", $date: date = "", $text: String = "") {
    insert_notes(objects: {date: $date, author: $author, text: $text}) {
      affected_rows
    }
  }
  mutation deleteCurrentNote($_eq: uuid = "") {
    delete_notes(where: {id: {_eq: $_eq}}) {
      affected_rows
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

function executeMyMutation() {
  return fetchGraphQL(
    operationsDoc,
    "MyMutation",
    {}
  );
}
function executeAddNote(author, date, text) {
  return fetchGraphQL(
    operationsDoc,
    "AddNote",
    {"author": author, "date": date, "text": text}
  );
}

function executeDeleteCurrentNote(_eq) {
  return fetchGraphQL(
    operationsDoc,
    "deleteCurrentNote",
    {"_eq": _eq}
  );
}

async function startExecuteDeleteCurrentNote(_eq) {
  const { errors, data } = await executeDeleteCurrentNote(_eq);

  if (errors) {
    errorHandle();
  }

  // do something great with this precious data
  console.log(data);
  await startFetchMyQuery();
  showCurrentSpinner = false;
  XBtnDisable = false;
}

async function startExecuteMyMutation() {
  showSpinner = true;
  XBtnDisable = true;
  const { errors, data } = await executeMyMutation();

  if (errors) {
    errorHandle()
  }
  await startFetchMyQuery();
  showSpinner = false;
  XBtnDisable = false;
}

async function deleteAll(){
  startExecuteMyMutation().catch(()=>errorHandle());
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  errorOccured = false;
  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    error = errors;
    errorOccured = true;
    return errors;
  }
  notes = data.notes;
  // do something great with this precious data
  return data;
}

async function startExecuteAddNote(author, date, text) {
  const { errors, data } = await executeAddNote(author, date, text);

  if (errors) {
    errorHandle()
  }
  // do something great with this precious data
  console.log(data);
  await startFetchMyQuery()
}


function addNote(){
  console.log(authorInput.value);
  if(authorInput.value.length >= 3 && textInput.value.length >= 3){
    showSpinner = true;
    XBtnDisable = true;
    startExecuteAddNote(authorInput.value,date,textInput.value).catch(()=>errorHandle());
    inputNote.reset();
  }else{
    alert("Input data into poles! At least 3 symbols.");
    inputNote.reset();
  }
}

function deleteCurrent(event){
  let id = event.target.id;
  showCurrentSpinner = true;
  XBtnDisable = true;
  startExecuteDeleteCurrentNote(id).catch(()=>errorHandle());;
}

let errorOccured = false;
let error;
let notes;
let inputNote;
let authorInput;
let textInput;
let XBtnDisable = false;
let showSpinner = false;
let showCurrentSpinner = false;
let date = new Date(Date.now());

onMount(async()=>{
    await startFetchMyQuery()
})

</script>
<svelte:head>
    <title>Notes</title>
  </svelte:head>
<body>
    <div class="wrapper">
      <div class = "controlPanel">
        <h1>Notes list:</h1>
        {#if showSpinner}
          <div class = "mainSpinner">
          <Circle3 size="40" unit="px" duration="1s"/>
          </div>
        {:else}
        <form id = "form" class = "inputForm" bind:this={inputNote}>
          <input type="text" bind:this={authorInput} name = "authorInput" maxlength="25" placeholder="Input your name">
          <textarea name="text"  bind:this={textInput} class="textInput" maxlength="96" placeholder="Input your note"></textarea>
        </form>
        <div class = "buttons">
          <button class = "buttonDeleteAll" disabled={XBtnDisable} on:click =  {deleteAll}>Delete all</button>
          <button class = "buttonAddNote" disabled={XBtnDisable} on:click =  {addNote}>Add note</button>
        </div>
        {/if}
      </div>
      <div class = "notes">
        {#if !notes}
        <p>...waiting</p>
      {:else if errorOccured === false}
        <h3>The number of notes: {notes.length}</h3>
        {#if showCurrentSpinner}
        <Circle3 size="30" unit="px" duration="1s"/>
        {:else}
        <ul>
          {#each notes as {author,date,text,id}}
          <li>
            <p>
              <strong>{author}</strong>  <br> <strong>Text:</strong> {text} <br>   {date}  
              <br>
              <button class = "deleteCurrent" id = "{id}" disabled={XBtnDisable} on:click={event => deleteCurrent(event)}> X </button>
            </p>
          </li>
        {/each}
        </ul>
        {/if}
      {:else}
        <p style="color: red">{error}</p>
      {/if}
      </div>
    </div>  
</body>

<style>
  .mainSpinner{
    display: flex;
    justify-content: center;
  }
  textarea{
    resize: none;
  }
  .inputForm{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  body {
    max-width: 100%;
  }
  .wrapper{
    text-align: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .controlPanel{
    min-height: 320px;
    flex:1;
    justify-content: center;
  }
  .notes{
    flex:3;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  ul{
    padding-left: 0;
  }
  .deleteCurrent{
    position:absolute;
    top:0;
    right:0;
    border:0;
    cursor:pointer;
    background-color: rgba(230, 77, 77, 0.514);
    border-radius: 10px;
  }
  li p:hover{
    background-color: rgba(104, 107, 107, 0.425)
  }
  li {
    list-style-type: none; 
   }
  li p{
    position:relative;
    background-color:#8ddde9;
    min-height: 50px;
    border-radius: 15px;
    text-align: center;
  }
	.buttonAddNote{
    cursor:pointer;
		background-color: rgb(27, 185, 27);
		border:0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display:inline-block;
		border-radius: 15px;
	}
	.buttonDeleteAll{
    cursor:pointer;
		background-color: red;
		border:0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display:inline-block;
		border-radius: 15px;
	}
	.buttonDeleteAll:hover, .buttonAddNote:hover{
		background-color:rgb(190, 179, 179)
	}
	h1 {
		width: 100%;
	}
</style>
