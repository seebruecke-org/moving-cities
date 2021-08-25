import { createClient, defaultExchanges } from 'urql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  exchanges: defaultExchanges
});

export function fetchAPI(query, vars) {
  return client
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
}

export function buildCMSUrl(path) {
  return `${process.env.NEXT_PUBLIC_ASSET_URL}${path}`;
}
