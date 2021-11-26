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
	startExecuteAddNote("Petro",date,"note3")
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
	<div class = "buttons">
		<button class = "buttonDeleteAll"  on:click =  {startExecuteMyMutation}>Delete all</button>
		<button class = "buttonAddNote"  on:click =  {addNote}>Add note</button>
	</div>
	
	<h1>Notes list:</h1>

	
	{#if !notes}
		<p>...waiting</p>
	{:else if errorOccured === false}
		<p>The number of notes: {notes.length}</p>
    <div class = "notes">
		{#each notes as {author,date,text}}
		<div class = "currentNote">
			{author} - {date} - {text}
    </div>
	{/each}
    </div>
	{:else}
		<p style="color: red">{error}</p>
	{/if}
	


</section>

<style>
  .currentNote{
    background-color: rgb(255, 255, 255);
  }
	.buttonAddNote{
		background-color: rgb(27, 185, 27);
		border:0px;
		width: 7em;
		height: 3em;
		text-align: center;
		display:inline-block;
		border-radius: 15px;
	}
	.buttonDeleteAll{
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
	.notes{
		background-color: rgba(0, 255, 255, 0.247);
		border-radius: 15px;
	}
	h1 {
		width: 100%;
	}
</style>
