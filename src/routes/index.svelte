<script context="module">
  export const ssr = false;
</script>
<script>
import { now } from "svelte/internal";
import {onMount} from "svelte";

import { createClient, defaultExchanges, subscriptionExchange } from '@urql/core';
  import { createClient as createWSClient } from 'graphql-ws';
  import { setClient, operationStore, subscription } from '@urql/svelte';

  const wsClient = createWSClient({
    url: 'wss://kpilab3.herokuapp.com/v1/graphql',
    reconnect: true
  });

  const client = createClient({
    url: 'https://kpilab3.herokuapp.com/v1/graphql',
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
    return [data.notes, ...messages];
  };

  subscription(messages, handleSubscription);

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://kpilab3.herokuapp.com/v1/graphql",
    {
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
    notes(order_by: {id: desc_nulls_first}) {
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
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  errorOccured = false;
  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    error = errors;
    errorOccured = true;
  }
  notes = data.notes;
  // do something great with this precious data
  console.log(data);
}

async function startExecuteAddNote(author, date, text) {
  const { errors, data } = await executeAddNote(author, date, text);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }
  await startFetchMyQuery();
  // do something great with this precious data
  console.log(data);
}

function addNote(){
	
  let name = document.getElementById("nameInput").value;
  let text = document.getElementById("textInput").value;
  let form = document.getElementById("form");
  if(name.length >= 3 && text.length >= 3){
    startExecuteAddNote(name,date,text);
    form.reset();
  }else{
    alert("Input data into poles! At least 3 symbols.");
    form.reset();
  }
}

function deleteCurrent(event){
  let id = event.target.id;
  startExecuteDeleteCurrentNote(id);
}

let errorOccured =false;
let error;
let notes;
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
        <form id = "form" class = "inputForm">
          <input type="text" id = "nameInput" name = "authorInput" maxlength="25" placeholder="Input your name">
          <textarea name="text"  id = "textInput" class="textInput" maxlength="96" placeholder="Input your note"></textarea>
        </form>
        <div class = "buttons">
          <button class = "buttonDeleteAll"  on:click =  {startExecuteMyMutation}>Delete all</button>
          <button class = "buttonAddNote"  on:click =  {addNote}>Add note</button>
        </div>
      </div>
      <div class = "notes">
        {#if !notes}
        <p>...waiting</p>
      {:else if errorOccured === false}
        <h3>The number of notes: {notes.length}</h3>
        <ul>
          {#each notes as {author,date,text,id}}
          <li>
            <p>
              <strong>{author}</strong>  <br> <strong>Text:</strong> {text} <br>   {date}  
              <br>
              <button class = "deleteCurrent" id = "{id}" on:click={event => deleteCurrent(event)}> X </button>
            </p>
          </li>
        {/each}
        </ul>
        
      {:else}
        <p style="color: red">{error}</p>
      {/if}
      </div>
    </div>  
</body>

<style>
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
    overflow-x: hidden;
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
