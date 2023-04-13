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

      return transformResponse(data);
    });
}

export function buildCMSUrl(path) {
  return `${process.env.NEXT_PUBLIC_ASSET_URL}${path}`;
}

const transformResponse = (responseData) => {
  if (Array.isArray(responseData)) {
    // If the data is an array, map over each item and transform it
    return responseData.map((item) => transformResponse(item));
  } else if (typeof responseData === 'object' && responseData !== null) {
    // If the data is an object, create a new object and transform each property
    const transformedData = {};

    Object.entries(responseData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && 'attributes' in value) {
        transformedData[key] = transformResponse(value.attributes);
      } else {
        transformedData[key] = transformResponse(value);
      }
    });

    if ('attributes' in transformedData) {
      const { attributes, ...other } = transformedData;
      return {
        ...attributes,
        ...other
      };
    }

    if ('data' in transformedData) {
      return transformedData.data;
    }

    return transformedData;
  } else {
    // If the data is a scalar value, return it unmodified
    return responseData;
  }
};
