import { createClient, defaultExchanges } from 'urql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  exchanges: defaultExchanges
});

export const fetchAPI = (query, vars) =>
  client
    .query(query, vars)
    .toPromise()
    .then(({ data, error }) => {
      if (error) {
        console.error({
          error,
          query
        });
      }

      return data;
    });
