async function fetchGraphQL(operationsDoc, operationName, variables) {
	const result = await fetch(import.meta.env.VITE_API_HTTPS_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN
		},
		method: 'POST',
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName
		})
	});

	return result.json();
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

export function fetchMyQuery() {
	return fetchGraphQL(operationsDoc, 'MyQuery', {});
}

export function executeMyMutation() {
	return fetchGraphQL(operationsDoc, 'MyMutation', {});
}
export function executeAddNote(author, date, text) {
	return fetchGraphQL(operationsDoc, 'AddNote', { author: author, date: date, text: text });
}

export function executeDeleteCurrentNote(_eq) {
	return fetchGraphQL(operationsDoc, 'deleteCurrentNote', { _eq: _eq });
}
