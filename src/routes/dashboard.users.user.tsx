import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { fetchUserById } from '../utils/mockTodos';

export const Route = createFileRoute('/dashboard/users/user')({
  component: UserComponent,
  loaderDeps: ({ search: { userId } }) => {
    return { userId };
  },
  validateSearch: z.object({
    userId: z.number(),
  }),

  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ deps: { userId } }) => {
    return fetchUserById(userId);
  },
});

function UserComponent() {
  const user = Route.useLoaderData();

  return (
    <>
      <h4 className="p-2 font-bold">{user?.name}</h4>
      <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
