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

    if (!response.ok || data.errors) {
      throw new Error(
        data.errors?.[0]?.message || 'GraphQL query failed'
      );
    }

    return data.data;
  }

  return { query };
}
