import { request } from 'graphql-request';
import useSWR from 'swr';

export const fetcher = (query) => request(process.env.NEXT_GRAPHQL_API, query);

export default function useAPI(query) {
  return useSWR(query, fetcher);
}
