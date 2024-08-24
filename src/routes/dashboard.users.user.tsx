import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { queryClient } from '../App.tsx';
import { userQueryOptions } from '../utils/queryOptions.ts';

export const Route = createFileRoute('/dashboard/users/user')({
  component: UserComponent,
  validateSearch: z.object({
    userId: z.number(),
  }),
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loaderDeps: ({ search: { userId } }) => {
    return { userId };
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ deps: { userId } }) => {
    console.log(userId);
    return queryClient.ensureQueryData(userQueryOptions(userId));
  },
});

function UserComponent() {
  const { userId } = Route.useLoaderDeps();
  const { data: user } = useSuspenseQuery(userQueryOptions(userId));

  return (
    <>
      <h4 className="p-2 font-bold">{user?.name}</h4>
      <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
