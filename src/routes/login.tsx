import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useLayoutEffect, useState } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();
  const { auth, status } = Route.useRouteContext({
    select: ({ auth }: any) => {
      return { auth, status: auth.status };
    },
  });
  const search = Route.useSearch();
  const [username, setUsername] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.login(username);
    router.invalidate();
  };

  useLayoutEffect(() => {
    if (status === 'loggedIn' && search.redirect) {
      router.history.push(search.redirect);
    }
  }, [status, search.redirect]);

  return status === 'loggedIn' ? (
    <div>
      Logged in as <strong>{auth.username}</strong>
      <div className="h-2" />
      <button
        onClick={() => {
          auth.logout();
          router.invalidate();
        }}
        className="inline-block rounded border bg-blue-500 px-2 py-1 text-sm text-white"
      >
        Log out
      </button>
      <div className="h-2" />
    </div>
  ) : (
    <div className="p-2">
      <div>You must log in!</div>
      <div className="h-2" />
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={username}
          onChange={e => {
            return setUsername(e.target.value);
          }}
          placeholder="Username"
          className="rounded border p-1 px-2"
        />
        <button type="submit" className="inline-block rounded border bg-blue-500 px-2 py-1 text-sm text-white">
          Login
        </button>
      </form>
    </div>
  );
}
