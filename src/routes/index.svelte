<script>

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
`;

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
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

startFetchMyQuery();

</script>

<svelte:head>
	<title>To-Dos</title>
</svelte:head>
<section>

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
