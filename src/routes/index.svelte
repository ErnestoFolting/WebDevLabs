<script>
import { now } from "svelte/internal";



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
  console.log("Test");
  // do something great with this precious data
  console.log(data);
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

async function startExecuteAddNote(author, date, text) {
  const { errors, data } = await executeAddNote(author, date, text);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startFetchMyQuery();
let date = new Date(Date.now());

</script>

<svelte:head>
	<title>To-Dos</title>
</svelte:head>
<section>
	<div class = "buttons">
		<button class = "buttonDeleteAll"  on:click =  {startExecuteMyMutation}>Delete all</button>
		<button class = "buttonAddNote"  on:click =  {startExecuteAddNote("Petro",date,"note3")}>Add note</button>
	</div>
	
	<h1>To-Dos list:</h1>

	<div class = "notes">
	{#await fetchMyQuery()}
		<p>...waiting</p>
	{:then data}
		<p>The number is {data.data.notes.length}</p>
		{#each data.data.notes as {author,date,text}}
		<p>
			{author} - {date} - {text}
		</p>
	{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
	
	</div>

</section>

<style>
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
