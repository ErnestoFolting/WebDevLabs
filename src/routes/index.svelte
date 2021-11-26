<script>
import { now } from "svelte/internal";
import {onMount} from "svelte";


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

  await startFetchMyQuery();
  // do something great with this precious data
  console.log(data);
}

async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }
  await startFetchMyQuery();
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
	startExecuteAddNote("Petro",date,"I am fine, thank you.")
}

function deleteCurrent(event){
  let id = event.target.id;
  startExecuteDeleteCurrentNote(id);
}

let errorOccured =false;
let error;
let notes;

onMount(async()=>{
    await startFetchMyQuery()
  })

let date = new Date(Date.now());


</script>

<svelte:head>
	<title>To-Dos</title>
</svelte:head>
<section>
  <h1>Notes list:</h1>
	<div class = "buttons">
		<button class = "buttonDeleteAll"  on:click =  {startExecuteMyMutation}>Delete all</button>
		<button class = "buttonAddNote"  on:click =  {addNote}>Add note</button>
	</div>
	
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
	


</section>

<style>
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
    background-color: rgb(186, 222, 224)
  }
  li {
    list-style-type: none; 
   }
  li p{
    position:relative;
    background-color:#b0e9f1;
    min-height: 40px;
    border-radius: 15px;
    text-align: center;
    transition: 2s;
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
	section{
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items:center;
		flex: 1;
	}
	h1 {
		width: 100%;
	}
</style>
