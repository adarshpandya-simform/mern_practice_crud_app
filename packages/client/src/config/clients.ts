import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';

import { trpc } from '../trpc';
import { ENDPOINT_URL } from './constants';
import { QueryClient } from '@tanstack/react-query';

export const trpcClient = trpc.createClient({
  links: [
    loggerLink(),
    httpBatchLink({
      url: ENDPOINT_URL,
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
          credentials: 'include',
        });
      },
    }),
  ],
});

const MS_IN_SECONDS = 1000;
const STALE_TIME = 5 * MS_IN_SECONDS;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
});
