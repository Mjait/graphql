export function CreateGraphQLClient(token) {
  const endpoint =
    'https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql';

  if (!token || token.split('.').length !== 3) {
    throw new Error('Invalid or missing JWT');
  }

  async function query(query, variables = {}) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    console.log('GraphQL response:', data);

    if (data?.errors) {
      if (data?.errors[0]?.extensions?.code === "invalid-jwt") {
        localStorage.removeItem('jwt');
        window.location.href = './index.html';
      } else {
        console.error("GraphQL errors:", data.errors);
        window.location.reload();
      }
      return null;
    }

    return data.data;
  }

  return { query };
}
