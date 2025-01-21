import { createServerFn } from '@tanstack/start';
import { getAuth } from '@clerk/tanstack-start/server';
import { getWebRequest } from 'vinxi/http';
import { redirect } from '@tanstack/react-router';

export const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    // This might error if you're redirecting to a path that doesn't exist yet
    // You can create a sign-in route to handle this
    throw redirect({
      to: '/sign-in/$',
    });
  }

  return { userId };
});
