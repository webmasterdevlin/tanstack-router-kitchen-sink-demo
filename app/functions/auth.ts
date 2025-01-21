import { createServerFn } from '@tanstack/start';
import { getAuth } from '@clerk/tanstack-start/server';
import { getWebRequest } from 'vinxi/http';

export const fetchClerkAuthFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  return {
    userId,
  };
});
