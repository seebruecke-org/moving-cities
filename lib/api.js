import { createClient as createUrqlClient, defaultExchanges } from 'urql';

export function createClient() {
  return createUrqlClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    exchanges: defaultExchanges
  });
}

export function fetchAPI(client, query, vars) {
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
